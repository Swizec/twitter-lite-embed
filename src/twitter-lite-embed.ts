import { buildTweetHTML, Tweet } from "./tweet-builder";

export class TwitterLiteEmbed extends HTMLElement {
    shadowRoot!: ShadowRoot;
    private tweet: Tweet | null = null;

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

    get oembed(): string {
        let oembed = this.getAttribute("oembed") || "";

        if (oembed) {
            oembed = decodeURIComponent(oembed)
                .replace(/\?ref_src=twsrc.*?fw/g, "")
                .replace(/<br>/g, "<br />")
                .trim();
        }

        return oembed;
    }

    connectedCallback() {
        this.fetchTweet();
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
        const shadowDom = this.attachShadow({ mode: "open" });

        if (this.oembed) {
            shadowDom.innerHTML = `${this.oembed}`;
        } else {
            shadowDom.innerHTML = `<p>Loading <a href="${this.url}" target="_blank">${this.url}</a> ...</p>`;
        }
    }

    private renderTweet() {
        if (this.tweet) {
            const div = document.createElement("div");
            div.innerHTML = buildTweetHTML(this.tweet);

            this.shadowRoot.appendChild(div);
        }
    }
}

customElements.define("twitter-lite", TwitterLiteEmbed);
