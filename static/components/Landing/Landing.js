import { h, Router, loadURL, Fragment } from "../../@ui/ui-lib";
import PrefetchLinkModules from "../../perf/PrefetchResourcesWhenFree.js";
import { FileEncryptorLazy, FileDecryptorLazy } from "../../perf/lazyLoader.js";
import svg from "../../key.svg";
import { displayName, startAppAction, flex } from "../../css-data";
export function LandingComponent() {
  const params = new URLSearchParams(Router.getQs);
  let c;
  if ((c = params.get("__loader"))) {
    return loadURL(c);
  }
  return h(
    Fragment,
    null,
    h("div", null, "Encrypt or decrpt files in your browser"),
    h(
      PrefetchLinkModules,
      { href: "/encrypt", fetchPromise: FileEncryptorLazy.promise },
      h(LoadButton, null, "Encrypt")
    ),
    h(
      PrefetchLinkModules,
      { href: "/decrypt", fetchPromise: FileDecryptorLazy.promise },
      h(LoadButton, null, "Decrypt")
    ),
    h(FeatList)
  );
}

function LoadButton({ children }) {
  return h("button", { class: `${startAppAction} hoverable` }, children);
}
const cfg = window.__fshare.cfg;
function FeatList() {
  return h(
    Fragment,
    null,
    h("div", null, "Encrypt and decrypt files locally in"),
    cfg.supports.map(x =>
      h(
        "div",
        { "data-cx": JSON.stringify(x) },
        h(
          "div",
          { class: flex },
          h("div", {
            class: "revs-h",
            style: { backgroundImage: `url(${svg})` }
          }),
          h("div", { class: displayName }, x.displayName)
        ),
        h("div", { description: "" }, x.description)
      )
    )
  );
}
