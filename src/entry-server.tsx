import App from "./app.tsx";
import render from "preact-render-to-string";
import * as fs from "fs";
import { PurgeCSS } from 'purgecss';


export default async function serverRenderToString(path: string) {
    let css = '';
    const html = render(
        <App path={path}/>
    )

// Assuming you have a full Tailwind CSS file at a known path
    const tailwindCSS = fs.readFileSync('dist/server/assets/ssr.css', 'utf8');

    // Use PurgeCSS to extract the CSS needed for the rendered HTML
    const purgeCSSResult = await new PurgeCSS().purge({
        content: [{ raw: html, extension: 'html' }],
        css: [{ raw: tailwindCSS }],
    });

    // Extracted CSS
    css = purgeCSSResult[0].css;


    return [html, css]
}