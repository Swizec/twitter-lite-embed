export class TwitterLiteEmbed extends HTMLElement {
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

    private setupDom() {
        const shadowDom = this.attachShadow({ mode: "open" });

        if (this.oembed) {
            shadowDom.innerHTML = `${this.oembed}`;
        } else {
            shadowDom.innerHTML = `<p>Loading <a href="${this.url}" target="_blank">${this.url}</a> ...</p>`;
        }
    }

    private async fetchTweet() {
        if (!this.url) {
            // no-op without a url
            return;
        }

        console.log(
            `https://publish.twitter.com/oembed?url=${this.url}&dnt=true&omit_script=true`
        );
    }
}

customElements.define("twitter-lite", TwitterLiteEmbed);
