import {hydrate} from "preact";
import App from "./app.tsx";

export default function clientHydrate() {
    return hydrate(<App/>, document.getElementById('app'))
}