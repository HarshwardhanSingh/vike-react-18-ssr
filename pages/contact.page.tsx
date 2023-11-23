import type { PageContext } from "../renderer/types";

const func = () => {
    return new Promise((res) => {
        setTimeout(() => {
            res("async data")
        }, 2000)
    })
}

async function onBeforeRender(pageContext: PageContext) {
    // await func()

    return {
        pageContext: {
            pageProps: {
                data: func()
            }
        }
    }
}

function Page(props: any) {
    console.log(props);
    return <h1>Contact</h1>
}


export {Page}
export {onBeforeRender}