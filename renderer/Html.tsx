export default function(props: any) {
    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="device-width, initial-scale=1.0" />
            </head>
            <body>
                <div id="root">{props.children}</div>
            </body>
        </html>
    )
}