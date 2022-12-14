export const tweetCSS = `
div.static-tweet-embed {
    display: flex;
    flex-direction: column;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    max-width: 550px;
    width: 100%;
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid rgb(196, 207, 214);
    border-radius: 12px;
    padding: 12px 16px;
    background-color: rgb(255, 255, 255);
}
div.static-tweet-embed:hover {
    background-color: rgb(247, 249, 250);
}

div.static-tweet-embed blockquote {
    margin: 0;
    font-size: 20px;
    padding: 0px;
    border: 0px;
    color: rgb(15, 20, 25);
    line-height: 24px;
}

div.static-tweet-embed blockquote a {
    color: rgb(22, 123, 185);
    cursor: pointer;
    text-decoration: none;
}

div.static-tweet-embed blockquote a:hover {
    color: rgb(27, 149, 224);
    cursor: pointer;
    text-decoration: underline;
}

div.static-tweet-embed .author {
    color: rgb(91, 112, 131);
    font-size: 15px;
    line-height: 20px;
    text-decoration: none;
    padding-bottom: 12px;
}

div.static-tweet-embed .author b {
    display: block;
    font-weight: 700;
    color: rgb(15, 20, 25);
}

div.static-tweet-embed .author b:hover {
    text-decoration: underline;
}

div.static-tweet-embed .author img {
    float: left;
    width: 48px;
    height: 48px;
    border-radius: 100%;
    margin-right: 4px;
    margin-bottom: 0px;
}

div.static-tweet-embed .media {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-content: center;
    align-items: center;
    width: 100%;
    max-height: 366px;
    margin-top: 12px;
    border-radius: 12px;
    overflow: hidden;
}

div.static-tweet-embed .media img {
    margin-bottom: 0px;
}

div.static-tweet-embed .time a {
    color: rgb(91, 112, 131);
    font-size: 15px;
    line-height: 32px;
    height: 32px;
    text-decoration: none;
}

div.static-tweet-embed .time a:hover {
    color: rgb(91, 112, 131);
    font-size: 15px;
    line-height: 32px;
    height: 32px;
    text-decoration: underline;
}

div.static-tweet-embed .stats {
    display: flex;
    align-items: center;
    color: rgb(91, 112, 131);
    font-size: 15px;
}

div.static-tweet-embed .stats svg {
    height: 20px;
    width: 20px;
    margin-right: 10px;
}

div.static-tweet-embed .stats svg path {
    fill: rgb(91, 112, 131)
}

div.static-tweet-embed .stats svg:first-child {
    padding-left: 0px;
}

div.static-tweet-embed .stats a {
    display: flex;
    align-items: center;
    margin-right: 20px;
    color: inherit;
    text-decoration: none;
}

div.static-tweet-embed .stats a.like:hover  {
    color: rgb(224, 36, 94);
    text-decoration: underline;
}

div.static-tweet-embed .stats a.like:hover svg path {
    fill: rgb(224, 36, 94);
}

div.static-tweet-embed .stats a.reply:hover  {
    color: rgb(29, 161, 242);
    text-decoration: underline;
}

div.static-tweet-embed .stats a.reply:hover svg path {
    fill: rgb(29, 161, 242);
}
`;
