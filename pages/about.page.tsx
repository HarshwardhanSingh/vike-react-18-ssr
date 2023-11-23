import { Suspense } from "react";
import type { PageContext } from "../renderer/types";

const func = () => {
    return new Promise((res) => {
        setTimeout(() => {
            res("async about data")
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

const Card = (props: any) => {
    console.log(props);
    return <h3>Card</h3>
}

function Page(props: any) {
    return (
        <>
            <h1>About</h1>
            <Suspense fallback="loading">
                <Card data={props.data}/>
            </Suspense>
        </>
    );
}


export {Page}
export {onBeforeRender}