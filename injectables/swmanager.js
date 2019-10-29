const { minify } = require("terser");

module.exports = minify(
  `(${function() {
    function nextEvent(obj, type) {
      return new Promise(function(resolve) {
        obj.addEventListener(type, resolve);
      });
    }
    window.__fshare = window.__fshare || {};
    window.__fshare.swLoaded = false;
    function waitUntilInstalled(registration) {
      var LS = "check-sw";
      if (navigator.onLine)
        fetch("/" + LS).then(function(resp) {
          return resp.text().then(function(text) {
            var item = localStorage.getItem(LS);
            if (item !== text) {
              var channel = new MessageChannel();
              console.log("[SW-Manager]Updating Service Worker");
              localStorage.setItem(LS, text);
              var controller = navigator.serviceWorker.controller;
              if (!controller) return;
              nextEvent(channel.port1, "message").then(function(e) {
                console.log("[SW-Manager]SW Said:", e.data);
                if (e.data.type === "updated-shell") {
                  channel.port1.close()
                  registration.update();
                }
              });
              channel.port1.start();
              controller.postMessage({ type: "update-shell" }, [channel.port2]);
            }
            return;
          });
        });

      return new Promise(function(resolve, reject) {
        // let refreshing;
        // navigator.serviceWorker.addEventListener(
        //   "controllerchange",
        //   function() {
        //     if (refreshing) return;
        //     window.location.reload();
        //     refreshing = true;
        //   }
        // );
        if (registration.installing) {
          registration.installing.addEventListener("statechange", function(e) {
            if (e.target.state == "installed") {
              window.__fshare.swLoaded = true;
              resolve();
            } else if (e.target.state == "redundant") {
              reject();
            }
          });
        } else {
          window.__fshare.swLoaded = true;
          resolve();
        }
      });
    }
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("./sw-stream.js", { scope: "/" })
        .then(waitUntilInstalled);
    }
  }})()`
).code;
