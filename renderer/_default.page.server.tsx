import ReactDOMServer from "react-dom/server";
import { escapeInject, dangerouslySkipEscape } from "vike/server";
import { PageShell } from "./PageShell";
import type { PageContextServer } from "./types";
import Html from "./Html";


async function render(pageContext: any) {
    const { Page, pageProps, res } = pageContext;

    if (!Page) {
        throw new Error("pageContext.Page is not present");
    }

    const { pipe } = ReactDOMServer.renderToPipeableStream(
        <Html>
            <PageShell pageContext={pageContext}>
                <Page {...pageProps} />
            </PageShell>
        </Html>, {
            bootstrapModules: [], // how to discover these maybe pageContext._pageAssets()
            bootstrapScripts: [], // how to discover these maybe pageContext._pageAssets
            bootstrapScriptContent: `console.log("inline")`,
            onShellReady() {
                res.setHeader('content-type', 'text/html');
                pipe(res);
            }
        }
    )

    // const pageHTML = ReactDOMServer.renderToString(
    //     <PageShell pageContext={pageContext}>
    //         <Page {...pageProps} />
    //     </PageShell>
    // )

    const { documentProps } = pageContext.exports;
    const title = (documentProps && documentProps.title) || "title";
    const desc = (documentProps && documentProps.description) || "description";


    return {}
    // return {
    //     documentHtml,
    // }
}

export {render}
export const passToClient = ["pageProps"]