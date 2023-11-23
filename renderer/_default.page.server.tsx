import ReactDOMServer from "react-dom/server";
import { escapeInject, dangerouslySkipEscape } from "vike/server";
import { PageShell } from "./PageShell";
import type { PageContextServer } from "./types";


async function render(pageContext: PageContextServer) {
    const { Page, pageProps } = pageContext;
    if (!Page) {
        throw new Error("pageContext.Page is not present");
    }

    const pageHTML = ReactDOMServer.renderToString(
        <PageShell pageContext={pageContext}>
            <Page {...pageProps} />
        </PageShell>
    )

    const { documentProps } = pageContext.exports;
    const title = (documentProps && documentProps.title) || "title";
    const desc = (documentProps && documentProps.description) || "description";

    const documentHtml = escapeInject`
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="device-width, initial-scale=1.0" />
            <meta name="description" content=${desc} />
            <title>${title}</title>
            <style>
                #root {
                    height: 100%;
                }
            </style> 
        </head>
        <body>
                <div id="root">${dangerouslySkipEscape(pageHTML)}</div>
        </body>
    </html>
    `

    return {
        documentHtml,
    }
}

export {render}
export const passToClient = ["pageProps"]