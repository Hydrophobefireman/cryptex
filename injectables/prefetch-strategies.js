const { minify } = require("terser");
const str = `(${function() {
  window.__fshare = window.__fshare || {};
  var hasPrefetch = (function hasPrefetch() {
    var link = document.createElement("link");
    return (
      link.relList && link.relList.supports && link.relList.supports("prefetch")
    );
  })();
  var fetchFn = window.fetch;
  var hasFetch = typeof fetchFn === "function";
  if (!hasPrefetch && !hasFetch) {
    var fetchFn = function XHRPromise(url) {
      return new Promise(function(res, rej) {
        var req = new XMLHttpRequest();
        req.open("GET", url);
        req.withCredentials = true;
        req.onload = function() {
          req.status === 200 ? res() : rej();
        };
        req.send();
      });
    };
  }
  var __preloader = {
    stratMap: {
      link: function(obj) {
        var link = document.createElement("link");
        link.href = obj.href;
        link.rel = obj.rel;
        document.head.appendChild(link);
      },
      fetch: function(obj) {
        return fetchFn(obj.href, { credentials: "include" });
      }
    }
  };
  var prefetchMethod;
  var map = __preloader.stratMap;
  if (hasPrefetch) {
    prefetchMethod = map.link;
  } else {
    prefetchMethod = map.fetch;
  }
  __preloader.getPrefetchStrategy = function(data) {
    return function() {
      prefetchMethod(data);
    };
  };
  window.__fshare.__preloader = __preloader;
  dispatchEvent(new Event("begin-prefetch"));
}})()`;

module.exports = minify(str).code;
