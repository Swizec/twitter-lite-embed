import http from "http";
import URL from "url";
import Twitter from "twitter-lite";

/**
 * Example implementation of the backend portion
 *
 * You'll need to run this on the /api/ path of your site.
 * Both NextJs and Gatsby should support this natively
 */

/**
 *  the core logic
 */
// Memoized twitter client instance
let twitterClient = null;
async function getAppClient({ consumer_key, consumer_secret }) {
    if (twitterClient) {
        return twitterClient;
    }

    const user = new Twitter({
        consumer_key,
        consumer_secret,
    });

    const response = await user.getBearerToken();
    twitterClient = new Twitter({
        version: "2",
        extension: false,
        bearer_token: response.access_token,
    });

    return twitterClient;
}

// fetch tweet from API
async function getTweet(url, twitterCredentials) {
    const client = await getAppClient(twitterCredentials);

    const twitterUrl = url.replace("events", "moments");
    const tweetId = twitterUrl.split("/").pop().split("?")[0];

    try {
        const tweet = await client.get(`tweets/${tweetId}`, {
            "tweet.fields": "public_metrics,created_at",
            expansions: "author_id,attachments.media_keys",
            "user.fields": "name,username,url,profile_image_url",
            "media.fields": "preview_image_url,url",
        });

        return tweet;
    } catch (e) {
        console.error(e);
    }

    return null;
}

/**
 *  cloud function boilerplate
 */
async function cloudFunction(request, response) {
    const url = URL.parse(request.url, true);

    if (url.pathname === "/api/fetch-tweet" && url.query.url) {
        const tweet = await getTweet(url.query.url, {
            consumer_key: process.env.TWITTER_CONSUMER_KEY,
            consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
        });

        if (tweet) {
            response.writeHead(200);
            response.end(JSON.stringify(tweet));
        } else {
            response.writeHead(404);
            response.end(
                JSON.stringify({
                    error: "Tweet not found",
                })
            );
        }
    } else {
        response.writeHead(404);
        response.end();
    }
}

const server = http.createServer(cloudFunction);

server.listen(9000);
