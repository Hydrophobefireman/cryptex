const { minify } = require("terser");
module.exports = minify(
  `(${function() {
    function t() {
      if ("object" == typeof globalThis) return globalThis;
      Object.defineProperty(Object.prototype, "___this", {
        get: function() {
          return this;
        },
        configurable: !0
      }),
        (___this.globalThis = ___this);
      var t = ___this;
      return delete Object.prototype.___this, t;
    }

    var e,
      n,
      r,
      o = t().Symbol || {},
      i = {},
      s = i.constructor,
      u = i.hasOwnProperty,
      a =
        ("function" == typeof Promise
          ? Promise.prototype.then.bind(Promise.resolve())
          : setTimeout,
        (function(t, e) {
          return "Set" in e;
        })(0, t())),
      l = "__@@set",
      f = function(t) {
        return t != t;
      },
      h = function(t, e) {
        return t === e || (f(t) && f(e));
      };

    if ("undefined" != typeof Symbol) {
      function c(t, e) {
        var n = t[l],
          r = 0,
          o = n.length;
        return {
          [Symbol.iterator]: function() {
            return this;
          },
          next: function() {
            if (r < o) {
              var t = n[r++];
              return {
                value: e ? [t, t] : t,
                done: !1
              };
            }

            return {
              value: void 0,
              done: !0
            };
          }
        };
      }

      (e = function() {
        return c(this, !0);
      }),
        (n = function() {
          return c(this, !1);
        }),
        (r = function() {
          return c(this, !1);
        });
    } else
      e = r = n = function() {
        console.warn("no symbol support");
      };

    var p = {
        keys: r,
        values: n,
        entries: e
      },
      y =
        "assign" in s
          ? s.assign
          : function(t) {
              for (var e = 1; e < arguments.length; e++) {
                var n = arguments[e];

                for (var r in n) u.call(n, r) && (t[r] = n[r]);
              }

              return t;
            },
      b = function t(e, n) {
        if (
          ((function(t, e) {
            if (
              ((n = t),
              !(null != (r = e) &&
              "undefined" != typeof Symbol &&
              r[Symbol.hasInstance]
                ? r[Symbol.hasInstance](n)
                : n instanceof r))
            )
              throw new TypeError("Cannot call a class as a function");
            var n, r;
          })(this, t),
          !n && a)
        )
          return new Set(e);
        (this[l] = []),
          (function(t, e) {
            if (null != e) {
              if (
                !(function(t) {
                  return t && !!t[o.iterator];
                })(e)
              )
                throw new Error("value:" + String(e) + " is not iterable");

              for (var n = e.length, r = 0; r < n; r++) t.add(e[r]);
            }
          })(this, e);
      };

    !(function(t) {
      (t.prototype.add = function(t) {
        return (
          this.has(t) ||
            this[l].push(
              (function(t) {
                return 0 === t ? 0 : t;
              })(t)
            ),
          this
        );
      }),
        (t.prototype.has = function(t) {
          for (var e = this[l], n = e.length, r = 0; r < n; r++)
            if (h(e[r], t)) return !0;

          return !1;
        }),
        (t.prototype.delete = function(t) {
          var e = !1;
          return (
            (this[l] = this[l].filter(function(n) {
              var r = !h(n, t);
              return r || (e = !0), r;
            })),
            e
          );
        }),
        (t.prototype.forEach = function(t, e) {
          for (var n = this[l], r = n.length, o = 0; o < r; o++) {
            var i = n[o];
            e ? t.call(e, i, i, this) : t(i, i, this);
          }
        }),
        (t.prototype.clear = function() {
          this[l].length = 0;
        }),
        Object.defineProperty(t.prototype, "size", {
          enumerable: !1,
          configurable: !0,
          get: function() {
            return this[l].length;
          }
        }),
        "undefined" != typeof Symbol &&
          ((t.prototype[Symbol.iterator] = p.values),
          (t.prototype[Symbol.toStringTag] = "Set")),
        y(t.prototype, p);
    })(b),
      (b[Symbol.species] = b);
  }})()`
).code;
