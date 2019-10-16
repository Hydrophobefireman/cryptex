const { minify } = require("terser");
module.exports = minify(
  `(${function() {
    window.__fshare = window.__fshare || {};
    var timeoutFn =
      window.requestIdleCallback ||
      window.requestAnimationFrame ||
      (typeof Promise == "function"
        ? Promise.prototype.then.bind(Promise.resolve())
        : setTimeout);
    window.__fshare.__timeOutFn = timeoutFn;
    var doFetch = function doFetch(obj) {
      return timeoutFn(window.__preloader.getPrefetchStrategy(obj));
    };
    /**@type {Set<{href:string,rel:string}>} */
    var _prefetchables = (window.__fshare._prefetchables = new window.__fshare._Set());
    var __eventFired = false;
    window.__fshare.__getLink = function(href, rel) {
      if (!href.includes("main") && !href.includes("vendor")) {
        var ob = { href: href, rel: rel };
        if (__eventFired) return doFetch(ob);
        _prefetchables.add(ob);
      }
    };
    window.addEventListener("begin-prefetch", function() {
      __eventFired = true;
      _prefetchables.forEach(doFetch);
    });
  }})()`
).code;
