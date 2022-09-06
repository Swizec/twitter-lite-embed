import { buildTweetHTML, Tweet } from "./tweet-builder";
import { tweetCSS } from "./tweetCSS";

export class TwitterLiteEmbed extends HTMLElement {
    shadowRoot!: ShadowRoot;
    private tweet: Tweet | null = null;
    private contentRef!: HTMLDivElement;

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

    async attributeChangedCallback(
        name: string,
        oldVal: unknown,
        newVal: unknown
    ) {
        switch (name) {
            case "url":
                if (newVal !== oldVal) {
                    await this.fetchTweet();
                    this.renderTweet();
                }
                break;
            default:
                break;
        }
    }

    private async fetchTweet() {
        if (!this.url) {
            // no-op without a url
            return;
        }

        const res = await fetch(`/api/fetch-tweet?url=${this.url}`);
        const tweet = await res.json();

        this.tweet = tweet as Tweet;
        this.renderTweet();
    }

    private setupDom() {
        const children = this.childNodes[0];

        const shadowDom = this.attachShadow({ mode: "open" });
        shadowDom.innerHTML = `<style>${tweetCSS}</style>`;

        this.contentRef = document.createElement("div");
        if (children) {
            const previewDiv = document.createElement("div");
            previewDiv.className = "static-tweet-embed";
            previewDiv.append(children);
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
