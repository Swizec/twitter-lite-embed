import { buildTweetHTML, Tweet } from "./tweet-builder";
import { tweetCSS } from "./tweetCSS";

export class TwitterLiteEmbed extends HTMLElement {
    shadowRoot!: ShadowRoot;
    private tweet?: Tweet;
    private contentRef!: HTMLDivElement;
    private fetchingStatus: "canStart" | "fetching" | "fetched" | "error" =
        "canStart";

    constructor() {
        super();
        this.setupDom();
    }

    static get observedAttributes(): string[] {
        return ["url"];
    }

    get url(): string {
        return this.getAttribute("url") || "";
    }

    attributeChangedCallback(name: string, oldVal: unknown, newVal: unknown) {
        switch (name) {
            case "url":
                if (newVal !== oldVal) {
                    this.hydrateTweet();
                }
                break;
            default:
                break;
        }
    }

    private async hydrateTweet() {
        this.tweet = await this.fetchTweet();

        this.renderTweet();
    }

    private async fetchTweet() {
        if (!this.url || this.fetchingStatus !== "canStart") {
            // no-op without a url
            return;
        }
        this.fetchingStatus = "fetching";

        const res = await fetch(`/api/fetch-tweet?url=${this.url}`);

        if (res.ok) {
            const tweet = await res.json();
            this.fetchingStatus = "fetched";

            return tweet as Tweet;
        } else {
            this.fetchingStatus = "error";
            return undefined;
        }
    }

    private setupDom() {
        const prerender = this.children[0];

        const shadowDom = this.attachShadow({ mode: "open" });
        shadowDom.innerHTML = `<style>${tweetCSS}</style>`;

        this.contentRef = document.createElement("div");

        if (prerender) {
            const previewDiv = document.createElement("div");
            if (!prerender.className.includes("static-tweet-embed")) {
                previewDiv.className = "static-tweet-embed";
            }

            previewDiv.append(prerender);

            this.contentRef.append(previewDiv);
        }

        shadowDom.append(this.contentRef);
    }

    private renderTweet() {
        if (this.tweet) {
            this.contentRef.innerHTML = buildTweetHTML(this.tweet);
        }
    }
}

customElements.define("twitter-lite", TwitterLiteEmbed);
