import proxy from "koa-proxies";
import dotenv from "dotenv";

dotenv.config();

import "./api-server.mjs";

export default {
    port: 8000,
    middleware: [
        proxy("/api/", {
            target: "http://localhost:9000",
        }),
    ],
};
