import ReactDOM from "react-dom/client";
import { PageShell } from "./PageShell";
import type { PageContextClient } from "./types";

let root: ReactDOM.Root | undefined;

async function render(pageContext: PageContextClient) {
    const { Page, pageProps } = pageContext;
    if (!Page) {
        throw new Error("pageContext.Page is not present");
    }

    const page = (
        <PageShell pageContext={pageContext}>
            <Page {...pageProps} />
        </PageShell>
    )

    const container = document.getElementById("root") as HTMLElement;

    if (container.innerHTML === "" || !pageContext.isHydration) {
        if (!root) {
            root = ReactDOM.createRoot(container);
        }
        root.render(page);
    } else {
        root = ReactDOM.hydrateRoot(container, page);
    }
}

export const clientRouting = true;
export const hydrationCanBeAborted = true;
export { render }