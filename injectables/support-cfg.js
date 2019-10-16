const { minify } = require("terser");
module.exports = minify(
  `(${function() {
    window.__fshare = window.__fshare || {};
    window.__fshare.setConfig = function(cfg) {
      cfg = JSON.parse(cfg);
      return (window.__fshare.cfg = cfg);
    };
  }})()`
).code;
