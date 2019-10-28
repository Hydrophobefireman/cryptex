import "./_App.css";
import {
  h,
  render,
  AsyncComponent,
  absolutePath,
  Router
} from "./@ui/ui-lib.js";
import { LandingComponent } from "./components/Landing/Landing.js";
import { FileEncryptorLazy, FileDecryptorLazy } from "./perf/lazyLoader.js";
import { appRoot, titleHeader } from "./css-data.js";
import loadCSS from "@hydrophobefireman/j-utils/@build-modern/src/modules/loadCSS/index.js";
const root = document.getElementById("app-root");
root.removeAttribute("style");
root.id = appRoot;
const App = h(
  "main",
  { data: "app" },
  h("header", { class: titleHeader }, "Cryptex"),
  h(
    "div",
    { style: { marginTop: "50px" } },
    h(
      Router,
      null,
      h(LandingComponent, { path: absolutePath("/") }),
      h(AsyncComponent, {
        path: absolutePath("/encrypt"),
        componentPromise: FileEncryptorLazy.promise,
        fallbackComponent: () =>
          h(LoaderDescription, null, FileEncryptorLazy.name)
      }),
      h(AsyncComponent, {
        path: absolutePath("/decrypt"),
        componentPromise: FileDecryptorLazy.promise,
        fallbackComponent: () =>
          h(LoaderDescription, null, FileDecryptorLazy.name)
      })
    )
  )
);

render(App, root);
document.addEventListener("DOMContentLoaded", () =>
  loadCSS("https://fonts.pycode.tk/open-sans.css")
);
function LoaderDescription({ children }) {
  return h("div", null, "Loading Chunk:", children);
}
