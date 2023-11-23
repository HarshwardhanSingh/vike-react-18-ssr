export {Page};

function Page({ is404 }: {is404: boolean}) {
    if (is404) {
        return <h1>Page not found</h1>
    } else {
        return <h1>Something went wrong</h1>
    }
}