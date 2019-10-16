import "./App.css";
import {
  h,
  render,
  AsyncComponent,
  absolutePath,
  Router
} from "./@ui/ui-lib.js";
import { LandingComponent } from "./components/Landing/Landing.js";
import { FileEncryptorLazy, FileDecryptorLazy } from "./perf/lazyLoader.js";
const root = document.getElementById("app-root");
root.removeAttribute("style");

const App = h(
  "main",
  { data: "app" },
  h("header", { class: "title-header" }, "Cryptex"),
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

function LoaderDescription({ children }) {
  return h("div", { class: "loader-desc" }, "Loading Chunk:", children);
}
