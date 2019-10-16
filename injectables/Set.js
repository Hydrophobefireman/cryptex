const { minify } = require("terser");
module.exports = minify(
  `(${function() {
    function patchGlobalThis() {
      if (typeof globalThis !== "undefined") return globalThis;
      Object.defineProperty(Object.prototype, "___this", {
        get: function get() {
          return this;
        },
        configurable: true
      });
      ___this.globalThis = ___this;
      var r = ___this;
      delete Object.prototype.___this;
      return r;
    }

    var global = patchGlobalThis();

    var _Sym = global.Symbol || {};
    function _instanceof(left, right) {
      if (
        right != null &&
        typeof Symbol !== "undefined" &&
        right[_Sym.hasInstance]
      ) {
        return !!right[_Sym.hasInstance](left);
      } else {
        return left instanceof right;
      }
    }

    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true
        });
      } else {
        obj[key] = value;
      }
      return obj;
    }

    function has(a, b) {
      return a in b;
    }

    var emptyObj = {};

    function isIterable(k) {
      return k && !!k[_Sym.iterator];
    }

    var _Object = emptyObj.constructor;
    var hasOwnProp = emptyObj.hasOwnProperty;
    var HAS_SET = has("Set", global);
    var s = "__@@set";

    function _isNaN(k) {
      return k !== k;
    }

    function _EqCheck(x, y) {
      return x === y || (_isNaN(x) && _isNaN(y));
    }

    function normalizeNegativeZero(k) {
      return k === 0 ? 0 : k;
    }

    var entries, values, keys;

    if (typeof Symbol !== "undefined") {
      function setKeyValIterator(set, isDup) {
        var _obj;

        var _ = set[s];
        var i = 0;
        var len = _.length;
        var obj =
          ((_obj = {}),
          _defineProperty(_obj, _Sym.iterator, function() {
            return this;
          }),
          _defineProperty(_obj, "next", function next() {
            if (i < len) {
              var v = _[i++];
              return {
                value: isDup ? [v, v] : v,
                done: false
              };
            }

            return {
              value: void 0,
              done: true
            };
          }),
          _obj);
        return obj;
      }

      entries = function entries() {
        return setKeyValIterator(this, true);
      };

      values = function values() {
        return setKeyValIterator(this, false);
      };

      keys = function keys() {
        return setKeyValIterator(this, false);
      };
    } else {
      entries = keys = values = function values() {
        console.warn("no symbol support");
      };
    }

    var symbolProps = {
      keys: keys,
      values: values,
      entries: entries
    };
    var assign =
      "assign" in _Object
        ? _Object.assign
        : function Object_assign(target) {
            for (var i = 1; i < arguments.length; i++) {
              var source = arguments[i];

              for (var key in source) {
                if (hasOwnProp.call(source, key)) {
                  target[key] = source[key];
                }
              }
            }

            return target;
          };

    function setPrototypeProps(FakeSet) {
      FakeSet.prototype.add = function set(k) {
        if (!this.has(k)) this[s].push(normalizeNegativeZero(k));
        return this;
      };

      FakeSet.prototype.has = function has(key) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (
            var _iterator = this[s][_Sym.iterator](), _step;
            !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
            _iteratorNormalCompletion = true
          ) {
            var i = _step.value;
            if (_EqCheck(i, key)) return true;
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        return false;
      };

      FakeSet.prototype.delete = function del(k) {
        var had = false;
        this[s] = this[s].filter(function(x) {
          var c = !_EqCheck(x, k);
          if (!c) had = true;
          return c;
        });
        return had;
      };

      FakeSet.prototype.forEach = function forEach(cb, that) {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (
            var _iterator2 = this[s][_Sym.iterator](), _step2;
            !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done);
            _iteratorNormalCompletion2 = true
          ) {
            var arr = _step2.value;
            var a = arr,
              c = this;
            that ? cb.call(that, a, a, c) : cb(a, a, c);
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      };

      FakeSet.prototype.clear = function clear() {
        return void (this[s].length = 0);
      };

      Object.defineProperty(FakeSet.prototype, "size", {
        enumerable: false,
        configurable: true,
        get: function get() {
          return this[s].length;
        }
      });
      FakeSet.prototype[_Sym.iterator] = symbolProps.values;
      FakeSet.prototype[_Sym.toStringTag] = "Set";
      assign(FakeSet.prototype, symbolProps);
    }

    function _classCallCheck(instance, Constructor) {
      if (!_instanceof(instance, Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    function generateSet(fs, it) {
      if (it == null) return;
      if (!isIterable(it))
        throw new Error("value:" + String(it) + " is not iterable");
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (
          var _iterator3 = it[_Sym.iterator](), _step3;
          !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done);
          _iteratorNormalCompletion3 = true
        ) {
          var k = _step3.value;
          fs.add(k);
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    }

    var FakeSet = function FakeSet(iterable, forceUseCustomImplementation) {
      _classCallCheck(this, FakeSet);

      if (!forceUseCustomImplementation && HAS_SET) return new Set(iterable);
      this[s] = [];
      generateSet(this, iterable);
    };

    setPrototypeProps(FakeSet);
    FakeSet[_Sym.species] = FakeSet;
    window.__fshare = window.__fshare || {};
    window.__fshare._Set = FakeSet;
  }})()`
).code;
