import express from "express";
import compression from "compression";
import {renderPage} from "vike/server";
import {root} from "./root.ts"
const isProduction = process.env.NODE_ENV === "production";

startServer();

async function startServer() {
    const app = express();
    app.use(compression());
    if (isProduction) {
        const sirv = (await import("sirv")).default;
        app.use(sirv(`${root}/dist/client`))
    } else {
        const vite = await import("vite");
        const viteMiddleware = (await vite.createServer({
            root,
            server: {middlewareMode: true}
        })).middlewares;
        app.use(viteMiddleware)
    }

    app.get("*", async (req, res, next) => {
        const pageContxtInit = {
            urlOriginal: req.originalUrl,
            res,
        }
        const pageContext = await renderPage(pageContxtInit);
        const {httpResponse} = pageContext;

        if (!httpResponse) {
            return next();
        } else {
            // const { body, statusCode, headers, earlyHints } = httpResponse;
            // if (res.writeEarlyHints) {
            //     res.writeEarlyHints({ link: earlyHints.map((e) => e.earlyHintLink)})
            // }

            // headers.forEach(([name, value]) => res.setHeader(name, value))
            // res.status(statusCode);
            // res.send()
        }
    })

    const port = process.env.PORT || 3000;
    app.listen(port);
    console.log(`Server running at port ${port}`)
}