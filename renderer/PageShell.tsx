import React from "react"
import { PageContextProvider } from "./usePageContext"
import type { PageContext } from "./types"
import {Link} from "./Link"

function PageShell({
    children,
    pageContext
}: {
    children: React.ReactNode,
    pageContext: PageContext
}) {
    return (
        <React.StrictMode>
            <PageContextProvider pageContext={pageContext}>
                <div>
                    <Link href="/">Home</Link>
                    <Link href="/about">About</Link>
                    <Link href="/contact">Contact</Link>
                </div>
                <div>{children}</div>
            </PageContextProvider>
        </React.StrictMode>
    )
}

export { PageShell }