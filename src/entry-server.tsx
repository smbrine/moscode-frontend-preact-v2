import App from "./app.tsx";
import render from "preact-render-to-string";


export default function serverRenderToString(path: string) {
    return render(
        <App path={path}/>
    )
}