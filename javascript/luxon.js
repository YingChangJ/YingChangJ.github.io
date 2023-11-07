var luxon = (function (t) {
  "use strict";
  function z(t, e) {
    for (var n = 0; n < e.length; n++) {
      var r = e[n];
      (r.enumerable = r.enumerable || !1),
        (r.configurable = !0),
        "value" in r && (r.writable = !0),
        Object.defineProperty(
          t,
          (function (t) {
            t = (function (t, e) {
              if ("object" != typeof t || null === t) return t;
              var n = t[Symbol.toPrimitive];
              if (void 0 === n) return ("string" === e ? String : Number)(t);
              n = n.call(t, e || "default");
              if ("object" != typeof n) return n;
              throw new TypeError(
                "@@toPrimitive must return a primitive value."
              );
            })(t, "string");
            return "symbol" == typeof t ? t : String(t);
          })(r.key),
          r
        );
    }
  }
  function o(t, e, n) {
    e && z(t.prototype, e),
      n && z(t, n),
      Object.defineProperty(t, "prototype", { writable: !1 });
  }
  function s() {
    return (s = Object.assign
      ? Object.assign.bind()
      : function (t) {
          for (var e = 1; e < arguments.length; e++) {
            var n,
              r = arguments[e];
            for (n in r)
              Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
          }
          return t;
        }).apply(this, arguments);
  }
  function i(t, e) {
    (t.prototype = Object.create(e.prototype)),
      A((t.prototype.constructor = t), e);
  }
  function j(t) {
    return (j = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        })(t);
  }
  function A(t, e) {
    return (A = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (t, e) {
          return (t.__proto__ = e), t;
        })(t, e);
  }
  function q(t, e, n) {
    return (q = (function () {
      if (
        "undefined" != typeof Reflect &&
        Reflect.construct &&
        !Reflect.construct.sham
      ) {
        if ("function" == typeof Proxy) return 1;
        try {
          return (
            Boolean.prototype.valueOf.call(
              Reflect.construct(Boolean, [], function () {})
            ),
            1
          );
        } catch (t) {}
      }
    })()
      ? Reflect.construct.bind()
      : function (t, e, n) {
          var r = [null];
          r.push.apply(r, e);
          e = new (Function.bind.apply(t, r))();
          return n && A(e, n.prototype), e;
        }).apply(null, arguments);
  }
  function _(t) {
    var n = "function" == typeof Map ? new Map() : void 0;
    return (function (t) {
      if (
        null === t ||
        -1 === Function.toString.call(t).indexOf("[native code]")
      )
        return t;
      if ("function" != typeof t)
        throw new TypeError(
          "Super expression must either be null or a function"
        );
      if (void 0 !== n) {
        if (n.has(t)) return n.get(t);
        n.set(t, e);
      }
      function e() {
        return q(t, arguments, j(this).constructor);
      }
      return (
        (e.prototype = Object.create(t.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0,
          },
        })),
        A(e, t)
      );
    })(t);
  }
  function U(t, e) {
    if (null == t) return {};
    for (var n, r = {}, i = Object.keys(t), o = 0; o < i.length; o++)
      (n = i[o]), 0 <= e.indexOf(n) || (r[n] = t[n]);
    return r;
  }
  function P(t, e) {
    (null == e || e > t.length) && (e = t.length);
    for (var n = 0, r = new Array(e); n < e; n++) r[n] = t[n];
    return r;
  }
  function H(t, e) {
    var n,
      r =
        ("undefined" != typeof Symbol && t[Symbol.iterator]) || t["@@iterator"];
    if (r) return (r = r.call(t)).next.bind(r);
    if (
      Array.isArray(t) ||
      (r = (function (t, e) {
        var n;
        if (t)
          return "string" == typeof t
            ? P(t, e)
            : "Map" ===
                (n =
                  "Object" ===
                    (n = Object.prototype.toString.call(t).slice(8, -1)) &&
                  t.constructor
                    ? t.constructor.name
                    : n) || "Set" === n
            ? Array.from(t)
            : "Arguments" === n ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            ? P(t, e)
            : void 0;
      })(t)) ||
      (e && t && "number" == typeof t.length)
    )
      return (
        r && (t = r),
        (n = 0),
        function () {
          return n >= t.length ? { done: !0 } : { done: !1, value: t[n++] };
        }
      );
    throw new TypeError(
      "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
    );
  }
  var e = (function (t) {
      function e() {
        return t.apply(this, arguments) || this;
      }
      return i(e, t), e;
    })(_(Error)),
    R = (function (e) {
      function t(t) {
        return e.call(this, "Invalid DateTime: " + t.toMessage()) || this;
      }
      return i(t, e), t;
    })(e),
    W = (function (e) {
      function t(t) {
        return e.call(this, "Invalid Interval: " + t.toMessage()) || this;
      }
      return i(t, e), t;
    })(e),
    J = (function (e) {
      function t(t) {
        return e.call(this, "Invalid Duration: " + t.toMessage()) || this;
      }
      return i(t, e), t;
    })(e),
    Y = (function (t) {
      function e() {
        return t.apply(this, arguments) || this;
      }
      return i(e, t), e;
    })(e),
    G = (function (e) {
      function t(t) {
        return e.call(this, "Invalid unit " + t) || this;
      }
      return i(t, e), t;
    })(e),
    u = (function (t) {
      function e() {
        return t.apply(this, arguments) || this;
      }
      return i(e, t), e;
    })(e),
    n = (function (t) {
      function e() {
        return t.call(this, "Zone is an abstract class") || this;
      }
      return i(e, t), e;
    })(e),
    e = "numeric",
    r = "short",
    a = "long",
    $ = { year: e, month: e, day: e },
    B = { year: e, month: r, day: e },
    Q = { year: e, month: r, day: e, weekday: r },
    K = { year: e, month: a, day: e },
    X = { year: e, month: a, day: e, weekday: a },
    tt = { hour: e, minute: e },
    et = { hour: e, minute: e, second: e },
    nt = { hour: e, minute: e, second: e, timeZoneName: r },
    rt = { hour: e, minute: e, second: e, timeZoneName: a },
    it = { hour: e, minute: e, hourCycle: "h23" },
    ot = { hour: e, minute: e, second: e, hourCycle: "h23" },
    at = { hour: e, minute: e, second: e, hourCycle: "h23", timeZoneName: r },
    ut = { hour: e, minute: e, second: e, hourCycle: "h23", timeZoneName: a },
    st = { year: e, month: e, day: e, hour: e, minute: e },
    ct = { year: e, month: e, day: e, hour: e, minute: e, second: e },
    lt = { year: e, month: r, day: e, hour: e, minute: e },
    ft = { year: e, month: r, day: e, hour: e, minute: e, second: e },
    dt = { year: e, month: r, day: e, weekday: r, hour: e, minute: e },
    ht = { year: e, month: a, day: e, hour: e, minute: e, timeZoneName: r },
    mt = {
      year: e,
      month: a,
      day: e,
      hour: e,
      minute: e,
      second: e,
      timeZoneName: r,
    },
    yt = {
      year: e,
      month: a,
      day: e,
      weekday: a,
      hour: e,
      minute: e,
      timeZoneName: a,
    },
    vt = {
      year: e,
      month: a,
      day: e,
      weekday: a,
      hour: e,
      minute: e,
      second: e,
      timeZoneName: a,
    },
    c = (function () {
      function t() {}
      var e = t.prototype;
      return (
        (e.offsetName = function (t, e) {
          throw new n();
        }),
        (e.formatOffset = function (t, e) {
          throw new n();
        }),
        (e.offset = function (t) {
          throw new n();
        }),
        (e.equals = function (t) {
          throw new n();
        }),
        o(t, [
          {
            key: "type",
            get: function () {
              throw new n();
            },
          },
          {
            key: "name",
            get: function () {
              throw new n();
            },
          },
          {
            key: "ianaName",
            get: function () {
              return this.name;
            },
          },
          {
            key: "isUniversal",
            get: function () {
              throw new n();
            },
          },
          {
            key: "isValid",
            get: function () {
              throw new n();
            },
          },
        ]),
        t
      );
    })(),
    pt = null,
    gt = (function (t) {
      function e() {
        return t.apply(this, arguments) || this;
      }
      i(e, t);
      var n = e.prototype;
      return (
        (n.offsetName = function (t, e) {
          return te(t, e.format, e.locale);
        }),
        (n.formatOffset = function (t, e) {
          return ie(this.offset(t), e);
        }),
        (n.offset = function (t) {
          return -new Date(t).getTimezoneOffset();
        }),
        (n.equals = function (t) {
          return "system" === t.type;
        }),
        o(
          e,
          [
            {
              key: "type",
              get: function () {
                return "system";
              },
            },
            {
              key: "name",
              get: function () {
                return new Intl.DateTimeFormat().resolvedOptions().timeZone;
              },
            },
            {
              key: "isUniversal",
              get: function () {
                return !1;
              },
            },
            {
              key: "isValid",
              get: function () {
                return !0;
              },
            },
          ],
          [
            {
              key: "instance",
              get: function () {
                return (pt = null === pt ? new e() : pt);
              },
            },
          ]
        ),
        e
      );
    })(c),
    wt = {};
  var kt = { year: 0, month: 1, day: 2, era: 3, hour: 4, minute: 5, second: 6 };
  var bt = {},
    f = (function (n) {
      function r(t) {
        var e = n.call(this) || this;
        return (e.zoneName = t), (e.valid = r.isValidZone(t)), e;
      }
      i(r, n),
        (r.create = function (t) {
          return bt[t] || (bt[t] = new r(t)), bt[t];
        }),
        (r.resetCache = function () {
          (bt = {}), (wt = {});
        }),
        (r.isValidSpecifier = function (t) {
          return this.isValidZone(t);
        }),
        (r.isValidZone = function (t) {
          if (!t) return !1;
          try {
            return (
              new Intl.DateTimeFormat("en-US", { timeZone: t }).format(), !0
            );
          } catch (t) {
            return !1;
          }
        });
      var t = r.prototype;
      return (
        (t.offsetName = function (t, e) {
          return te(t, e.format, e.locale, this.name);
        }),
        (t.formatOffset = function (t, e) {
          return ie(this.offset(t), e);
        }),
        (t.offset = function (t) {
          var e,
            n,
            r,
            i,
            o,
            a,
            u,
            s,
            t = new Date(t);
          return isNaN(t)
            ? NaN
            : ((i = this.name),
              wt[i] ||
                (wt[i] = new Intl.DateTimeFormat("en-US", {
                  hour12: !1,
                  timeZone: i,
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  era: "short",
                })),
              (a = (i = (i = wt[i]).formatToParts
                ? (function (t, e) {
                    for (
                      var n = t.formatToParts(e), r = [], i = 0;
                      i < n.length;
                      i++
                    ) {
                      var o = n[i],
                        a = o.type,
                        o = o.value,
                        u = kt[a];
                      "era" === a
                        ? (r[u] = o)
                        : b(u) || (r[u] = parseInt(o, 10));
                    }
                    return r;
                  })(i, t)
                : ((o = t),
                  (i = (i = i).format(o).replace(/\u200E/g, "")),
                  (i = (o =
                    /(\d+)\/(\d+)\/(\d+) (AD|BC),? (\d+):(\d+):(\d+)/.exec(
                      i
                    ))[1]),
                  (a = o[2]),
                  [o[3], i, a, o[4], o[5], o[6], o[7]]))[0]),
              (o = i[1]),
              (e = i[2]),
              (n = i[3]),
              (u = i[4]),
              (r = i[5]),
              (i = i[6]),
              (u = 24 === u ? 0 : u),
              (s = (t = +t) % 1e3),
              (Qt({
                year: (a = "BC" === n ? 1 - Math.abs(a) : a),
                month: o,
                day: e,
                hour: u,
                minute: r,
                second: i,
                millisecond: 0,
              }) -
                (t -= 0 <= s ? s : 1e3 + s)) /
                6e4);
        }),
        (t.equals = function (t) {
          return "iana" === t.type && t.name === this.name;
        }),
        o(r, [
          {
            key: "type",
            get: function () {
              return "iana";
            },
          },
          {
            key: "name",
            get: function () {
              return this.zoneName;
            },
          },
          {
            key: "isUniversal",
            get: function () {
              return !1;
            },
          },
          {
            key: "isValid",
            get: function () {
              return this.valid;
            },
          },
        ]),
        r
      );
    })(c),
    Tt = ["base"],
    Ot = ["padTo", "floor"],
    St = {};
  var Nt = {};
  function Mt(t, e) {
    void 0 === e && (e = {});
    var n = JSON.stringify([t, e]),
      r = Nt[n];
    return r || ((r = new Intl.DateTimeFormat(t, e)), (Nt[n] = r)), r;
  }
  var Dt = {};
  var Et = {};
  var Vt = null;
  function It(t, e, n, r) {
    t = t.listingMode();
    return "error" === t ? null : ("en" === t ? n : r)(e);
  }
  var xt = (function () {
      function t(t, e, n) {
        (this.padTo = n.padTo || 0),
          (this.floor = n.floor || !1),
          n.padTo,
          n.floor;
        var r = U(n, Ot);
        (!e || 0 < Object.keys(r).length) &&
          ((e = s({ useGrouping: !1 }, n)),
          0 < n.padTo && (e.minimumIntegerDigits = n.padTo),
          (this.inf =
            ((r = t),
            void 0 === (n = e) && (n = {}),
            (t = JSON.stringify([r, n])),
            (e = Dt[t]) || ((e = new Intl.NumberFormat(r, n)), (Dt[t] = e)),
            e)));
      }
      return (
        (t.prototype.format = function (t) {
          var e;
          return this.inf
            ? ((e = this.floor ? Math.floor(t) : t), this.inf.format(e))
            : l(this.floor ? Math.floor(t) : Yt(t, 3), this.padTo);
        }),
        t
      );
    })(),
    Ct = (function () {
      function t(t, e, n) {
        this.opts = n;
        var n = (this.originalZone = void 0),
          r =
            (this.opts.timeZone
              ? (this.dt = t)
              : "fixed" === t.zone.type
              ? ((r =
                  0 <= (r = (t.offset / 60) * -1)
                    ? "Etc/GMT+" + r
                    : "Etc/GMT" + r),
                0 !== t.offset && f.create(r).valid
                  ? ((n = r), (this.dt = t))
                  : ((n = "UTC"),
                    (this.dt =
                      0 === t.offset
                        ? t
                        : t.setZone("UTC").plus({ minutes: t.offset })),
                    (this.originalZone = t.zone)))
              : "system" === t.zone.type
              ? (this.dt = t)
              : "iana" === t.zone.type
              ? (n = (this.dt = t).zone.name)
              : ((this.dt = t.setZone((n = "UTC")).plus({ minutes: t.offset })),
                (this.originalZone = t.zone)),
            s({}, this.opts));
        (r.timeZone = r.timeZone || n), (this.dtf = Mt(e, r));
      }
      var e = t.prototype;
      return (
        (e.format = function () {
          return this.originalZone
            ? this.formatToParts()
                .map(function (t) {
                  return t.value;
                })
                .join("")
            : this.dtf.format(this.dt.toJSDate());
        }),
        (e.formatToParts = function () {
          var e = this,
            t = this.dtf.formatToParts(this.dt.toJSDate());
          return this.originalZone
            ? t.map(function (t) {
                return "timeZoneName" === t.type
                  ? s({}, t, {
                      value: e.originalZone.offsetName(e.dt.ts, {
                        locale: e.dt.locale,
                        format: e.opts.timeZoneName,
                      }),
                    })
                  : t;
              })
            : t;
        }),
        (e.resolvedOptions = function () {
          return this.dtf.resolvedOptions();
        }),
        t
      );
    })(),
    Zt = (function () {
      function t(t, e, n) {
        var r;
        (this.opts = s({ style: "long" }, n)),
          !e &&
            Rt() &&
            (this.rtf =
              ((e = t),
              (n = t = void 0 === (t = n) ? {} : t).base,
              (n = U((n = t), Tt)),
              (n = JSON.stringify([e, n])),
              (r = Et[n]) ||
                ((r = new Intl.RelativeTimeFormat(e, t)), (Et[n] = r)),
              r));
      }
      var e = t.prototype;
      return (
        (e.format = function (t, e) {
          if (this.rtf) return this.rtf.format(t, e);
          var n = e,
            e = t,
            t = this.opts.numeric,
            r = "long" !== this.opts.style,
            i =
              (void 0 === t && (t = "always"),
              void 0 === r && (r = !1),
              {
                years: ["year", "yr."],
                quarters: ["quarter", "qtr."],
                months: ["month", "mo."],
                weeks: ["week", "wk."],
                days: ["day", "day", "days"],
                hours: ["hour", "hr."],
                minutes: ["minute", "min."],
                seconds: ["second", "sec."],
              }),
            o = -1 === ["hours", "minutes", "seconds"].indexOf(n);
          if ("auto" === t && o) {
            var a = "days" === n;
            switch (e) {
              case 1:
                return a ? "tomorrow" : "next " + i[n][0];
              case -1:
                return a ? "yesterday" : "last " + i[n][0];
              case 0:
                return a ? "today" : "this " + i[n][0];
            }
          }
          var t = Object.is(e, -0) || e < 0,
            e = 1 === (o = Math.abs(e)),
            u = i[n],
            r = r ? (!e && u[2]) || u[1] : e ? i[n][0] : n;
          return t ? o + " " + r + " ago" : "in " + o + " " + r;
        }),
        (e.formatToParts = function (t, e) {
          return this.rtf ? this.rtf.formatToParts(t, e) : [];
        }),
        t
      );
    })(),
    g = (function () {
      function i(t, e, n, r) {
        var t = (function (e) {
            var n = e.indexOf("-x-");
            if (
              -1 === (n = (e = -1 !== n ? e.substring(0, n) : e).indexOf("-u-"))
            )
              return [e];
            try {
              (r = Mt(e).resolvedOptions()), (i = e);
            } catch (t) {
              var e = e.substring(0, n),
                r = Mt(e).resolvedOptions(),
                i = e;
            }
            return [i, (n = r).numberingSystem, n.calendar];
          })(t),
          i = t[0],
          o = t[1],
          t = t[2];
        (this.locale = i),
          (this.numberingSystem = e || o || null),
          (this.outputCalendar = n || t || null),
          (this.intl =
            ((i = this.locale),
            (e = this.numberingSystem),
            ((o = this.outputCalendar) || e) &&
              (i.includes("-u-") || (i += "-u"), o && (i += "-ca-" + o), e) &&
              (i += "-nu-" + e),
            i)),
          (this.weekdaysCache = { format: {}, standalone: {} }),
          (this.monthsCache = { format: {}, standalone: {} }),
          (this.meridiemCache = null),
          (this.eraCache = {}),
          (this.specifiedLocale = r),
          (this.fastNumbersCached = null);
      }
      (i.fromOpts = function (t) {
        return i.create(
          t.locale,
          t.numberingSystem,
          t.outputCalendar,
          t.defaultToEN
        );
      }),
        (i.create = function (t, e, n, r) {
          void 0 === r && (r = !1);
          t = t || k.defaultLocale;
          return new i(
            t ||
              (r
                ? "en-US"
                : (Vt =
                    Vt || new Intl.DateTimeFormat().resolvedOptions().locale)),
            e || k.defaultNumberingSystem,
            n || k.defaultOutputCalendar,
            t
          );
        }),
        (i.resetCache = function () {
          (Vt = null), (Nt = {}), (Dt = {}), (Et = {});
        }),
        (i.fromObject = function (t) {
          var t = void 0 === t ? {} : t,
            e = t.locale,
            n = t.numberingSystem,
            t = t.outputCalendar;
          return i.create(e, n, t);
        });
      var t = i.prototype;
      return (
        (t.listingMode = function () {
          var t = this.isEnglish(),
            e = !(
              (null !== this.numberingSystem &&
                "latn" !== this.numberingSystem) ||
              (null !== this.outputCalendar &&
                "gregory" !== this.outputCalendar)
            );
          return t && e ? "en" : "intl";
        }),
        (t.clone = function (t) {
          return t && 0 !== Object.getOwnPropertyNames(t).length
            ? i.create(
                t.locale || this.specifiedLocale,
                t.numberingSystem || this.numberingSystem,
                t.outputCalendar || this.outputCalendar,
                t.defaultToEN || !1
              )
            : this;
        }),
        (t.redefaultToEN = function (t) {
          return this.clone(
            s({}, (t = void 0 === t ? {} : t), { defaultToEN: !0 })
          );
        }),
        (t.redefaultToSystem = function (t) {
          return this.clone(
            s({}, (t = void 0 === t ? {} : t), { defaultToEN: !1 })
          );
        }),
        (t.months = function (n, r) {
          var i = this;
          return (
            void 0 === r && (r = !1),
            It(this, n, ce, function () {
              var e = r ? { month: n, day: "numeric" } : { month: n },
                t = r ? "format" : "standalone";
              return (
                i.monthsCache[t][n] ||
                  (i.monthsCache[t][n] = (function (t) {
                    for (var e = [], n = 1; n <= 12; n++) {
                      var r = L.utc(2009, n, 1);
                      e.push(t(r));
                    }
                    return e;
                  })(function (t) {
                    return i.extract(t, e, "month");
                  })),
                i.monthsCache[t][n]
              );
            })
          );
        }),
        (t.weekdays = function (n, r) {
          var i = this;
          return (
            void 0 === r && (r = !1),
            It(this, n, he, function () {
              var e = r
                  ? {
                      weekday: n,
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  : { weekday: n },
                t = r ? "format" : "standalone";
              return (
                i.weekdaysCache[t][n] ||
                  (i.weekdaysCache[t][n] = (function (t) {
                    for (var e = [], n = 1; n <= 7; n++) {
                      var r = L.utc(2016, 11, 13 + n);
                      e.push(t(r));
                    }
                    return e;
                  })(function (t) {
                    return i.extract(t, e, "weekday");
                  })),
                i.weekdaysCache[t][n]
              );
            })
          );
        }),
        (t.meridiems = function () {
          var n = this;
          return It(
            this,
            void 0,
            function () {
              return me;
            },
            function () {
              var e;
              return (
                n.meridiemCache ||
                  ((e = { hour: "numeric", hourCycle: "h12" }),
                  (n.meridiemCache = [
                    L.utc(2016, 11, 13, 9),
                    L.utc(2016, 11, 13, 19),
                  ].map(function (t) {
                    return n.extract(t, e, "dayperiod");
                  }))),
                n.meridiemCache
              );
            }
          );
        }),
        (t.eras = function (t) {
          var n = this;
          return It(this, t, ge, function () {
            var e = { era: t };
            return (
              n.eraCache[t] ||
                (n.eraCache[t] = [L.utc(-40, 1, 1), L.utc(2017, 1, 1)].map(
                  function (t) {
                    return n.extract(t, e, "era");
                  }
                )),
              n.eraCache[t]
            );
          });
        }),
        (t.extract = function (t, e, n) {
          t = this.dtFormatter(t, e)
            .formatToParts()
            .find(function (t) {
              return t.type.toLowerCase() === n;
            });
          return t ? t.value : null;
        }),
        (t.numberFormatter = function (t) {
          return new xt(
            this.intl,
            (t = void 0 === t ? {} : t).forceSimple || this.fastNumbers,
            t
          );
        }),
        (t.dtFormatter = function (t, e) {
          return new Ct(t, this.intl, (e = void 0 === e ? {} : e));
        }),
        (t.relFormatter = function (t) {
          return (
            void 0 === t && (t = {}), new Zt(this.intl, this.isEnglish(), t)
          );
        }),
        (t.listFormatter = function (t) {
          return (
            void 0 === t && (t = {}),
            (e = this.intl),
            void 0 === (t = t) && (t = {}),
            (n = JSON.stringify([e, t])),
            (r = St[n]) || ((r = new Intl.ListFormat(e, t)), (St[n] = r)),
            r
          );
          var e, n, r;
        }),
        (t.isEnglish = function () {
          return (
            "en" === this.locale ||
            "en-us" === this.locale.toLowerCase() ||
            new Intl.DateTimeFormat(this.intl)
              .resolvedOptions()
              .locale.startsWith("en-us")
          );
        }),
        (t.equals = function (t) {
          return (
            this.locale === t.locale &&
            this.numberingSystem === t.numberingSystem &&
            this.outputCalendar === t.outputCalendar
          );
        }),
        o(i, [
          {
            key: "fastNumbers",
            get: function () {
              var t;
              return (
                null == this.fastNumbersCached &&
                  (this.fastNumbersCached =
                    (!(t = this).numberingSystem ||
                      "latn" === t.numberingSystem) &&
                    ("latn" === t.numberingSystem ||
                      !t.locale ||
                      t.locale.startsWith("en") ||
                      "latn" ===
                        new Intl.DateTimeFormat(t.intl).resolvedOptions()
                          .numberingSystem)),
                this.fastNumbersCached
              );
            },
          },
        ]),
        i
      );
    })(),
    Ft = null,
    d = (function (n) {
      function e(t) {
        var e = n.call(this) || this;
        return (e.fixed = t), e;
      }
      i(e, n),
        (e.instance = function (t) {
          return 0 === t ? e.utcInstance : new e(t);
        }),
        (e.parseSpecifier = function (t) {
          if (t) {
            t = t.match(/^utc(?:([+-]\d{1,2})(?::(\d{2}))?)?$/i);
            if (t) return new e(ee(t[1], t[2]));
          }
          return null;
        });
      var t = e.prototype;
      return (
        (t.offsetName = function () {
          return this.name;
        }),
        (t.formatOffset = function (t, e) {
          return ie(this.fixed, e);
        }),
        (t.offset = function () {
          return this.fixed;
        }),
        (t.equals = function (t) {
          return "fixed" === t.type && t.fixed === this.fixed;
        }),
        o(
          e,
          [
            {
              key: "type",
              get: function () {
                return "fixed";
              },
            },
            {
              key: "name",
              get: function () {
                return 0 === this.fixed
                  ? "UTC"
                  : "UTC" + ie(this.fixed, "narrow");
              },
            },
            {
              key: "ianaName",
              get: function () {
                return 0 === this.fixed
                  ? "Etc/UTC"
                  : "Etc/GMT" + ie(-this.fixed, "narrow");
              },
            },
            {
              key: "isUniversal",
              get: function () {
                return !0;
              },
            },
            {
              key: "isValid",
              get: function () {
                return !0;
              },
            },
          ],
          [
            {
              key: "utcInstance",
              get: function () {
                return (Ft = null === Ft ? new e(0) : Ft);
              },
            },
          ]
        ),
        e
      );
    })(c),
    Lt = (function (n) {
      function t(t) {
        var e = n.call(this) || this;
        return (e.zoneName = t), e;
      }
      i(t, n);
      var e = t.prototype;
      return (
        (e.offsetName = function () {
          return null;
        }),
        (e.formatOffset = function () {
          return "";
        }),
        (e.offset = function () {
          return NaN;
        }),
        (e.equals = function () {
          return !1;
        }),
        o(t, [
          {
            key: "type",
            get: function () {
              return "invalid";
            },
          },
          {
            key: "name",
            get: function () {
              return this.zoneName;
            },
          },
          {
            key: "isUniversal",
            get: function () {
              return !1;
            },
          },
          {
            key: "isValid",
            get: function () {
              return !1;
            },
          },
        ]),
        t
      );
    })(c);
  function w(t, e) {
    var n;
    return b(t) || null === t
      ? e
      : t instanceof c
      ? t
      : "string" == typeof t
      ? "default" === (n = t.toLowerCase())
        ? e
        : "local" === n || "system" === n
        ? gt.instance
        : "utc" === n || "gmt" === n
        ? d.utcInstance
        : d.parseSpecifier(n) || f.create(t)
      : y(t)
      ? d.instance(t)
      : "object" == typeof t && "offset" in t && "function" == typeof t.offset
      ? t
      : new Lt(t);
  }
  var zt,
    jt = function () {
      return Date.now();
    },
    At = "system",
    qt = null,
    _t = null,
    Ut = null,
    Pt = 60,
    k = (function () {
      function t() {}
      return (
        (t.resetCaches = function () {
          g.resetCache(), f.resetCache();
        }),
        o(t, null, [
          {
            key: "now",
            get: function () {
              return jt;
            },
            set: function (t) {
              jt = t;
            },
          },
          {
            key: "defaultZone",
            get: function () {
              return w(At, gt.instance);
            },
            set: function (t) {
              At = t;
            },
          },
          {
            key: "defaultLocale",
            get: function () {
              return qt;
            },
            set: function (t) {
              qt = t;
            },
          },
          {
            key: "defaultNumberingSystem",
            get: function () {
              return _t;
            },
            set: function (t) {
              _t = t;
            },
          },
          {
            key: "defaultOutputCalendar",
            get: function () {
              return Ut;
            },
            set: function (t) {
              Ut = t;
            },
          },
          {
            key: "twoDigitCutoffYear",
            get: function () {
              return Pt;
            },
            set: function (t) {
              Pt = t % 100;
            },
          },
          {
            key: "throwOnInvalid",
            get: function () {
              return zt;
            },
            set: function (t) {
              zt = t;
            },
          },
        ]),
        t
      );
    })();
  function b(t) {
    return void 0 === t;
  }
  function y(t) {
    return "number" == typeof t;
  }
  function Ht(t) {
    return "number" == typeof t && t % 1 == 0;
  }
  function Rt() {
    try {
      return "undefined" != typeof Intl && !!Intl.RelativeTimeFormat;
    } catch (t) {
      return !1;
    }
  }
  function Wt(t, n, r) {
    if (0 !== t.length)
      return t.reduce(function (t, e) {
        e = [n(e), e];
        return t && r(t[0], e[0]) === t[0] ? t : e;
      }, null)[1];
  }
  function h(t, e) {
    return Object.prototype.hasOwnProperty.call(t, e);
  }
  function T(t, e, n) {
    return Ht(t) && e <= t && t <= n;
  }
  function l(t, e) {
    void 0 === e && (e = 2);
    t = t < 0 ? "-" + ("" + -t).padStart(e, "0") : ("" + t).padStart(e, "0");
    return t;
  }
  function m(t) {
    if (!b(t) && null !== t && "" !== t) return parseInt(t, 10);
  }
  function v(t) {
    if (!b(t) && null !== t && "" !== t) return parseFloat(t);
  }
  function Jt(t) {
    if (!b(t) && null !== t && "" !== t)
      return (t = 1e3 * parseFloat("0." + t)), Math.floor(t);
  }
  function Yt(t, e, n) {
    void 0 === n && (n = !1);
    e = Math.pow(10, e);
    return (n ? Math.trunc : Math.round)(t * e) / e;
  }
  function Gt(t) {
    return t % 4 == 0 && (t % 100 != 0 || t % 400 == 0);
  }
  function $t(t) {
    return Gt(t) ? 366 : 365;
  }
  function Bt(t, e) {
    var n,
      r = (r = e - 1) - (n = 12) * Math.floor(r / n) + 1;
    return 2 == r
      ? Gt(t + (e - r) / 12)
        ? 29
        : 28
      : [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][r - 1];
  }
  function Qt(t) {
    var e = Date.UTC(
      t.year,
      t.month - 1,
      t.day,
      t.hour,
      t.minute,
      t.second,
      t.millisecond
    );
    return (
      t.year < 100 &&
        0 <= t.year &&
        (e = new Date(e)).setUTCFullYear(t.year, t.month - 1, t.day),
      +e
    );
  }
  function Kt(t) {
    var e =
        (t + Math.floor(t / 4) - Math.floor(t / 100) + Math.floor(t / 400)) % 7,
      t = t - 1,
      t =
        (t + Math.floor(t / 4) - Math.floor(t / 100) + Math.floor(t / 400)) % 7;
    return 4 == e || 3 == t ? 53 : 52;
  }
  function Xt(t) {
    return 99 < t ? t : t > k.twoDigitCutoffYear ? 1900 + t : 2e3 + t;
  }
  function te(t, e, n, r) {
    void 0 === r && (r = null);
    var t = new Date(t),
      i = {
        hourCycle: "h23",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      },
      r = (r && (i.timeZone = r), s({ timeZoneName: e }, i)),
      e = new Intl.DateTimeFormat(n, r).formatToParts(t).find(function (t) {
        return "timezonename" === t.type.toLowerCase();
      });
    return e ? e.value : null;
  }
  function ee(t, e) {
    (t = parseInt(t, 10)),
      Number.isNaN(t) && (t = 0),
      (e = parseInt(e, 10) || 0);
    return 60 * t + (t < 0 || Object.is(t, -0) ? -e : e);
  }
  function ne(t) {
    var e = Number(t);
    if ("boolean" == typeof t || "" === t || Number.isNaN(e))
      throw new u("Invalid unit value " + t);
    return e;
  }
  function re(t, e) {
    var n,
      r,
      i = {};
    for (n in t) h(t, n) && null != (r = t[n]) && (i[e(n)] = ne(r));
    return i;
  }
  function ie(t, e) {
    var n = Math.trunc(Math.abs(t / 60)),
      r = Math.trunc(Math.abs(t % 60)),
      i = 0 <= t ? "+" : "-";
    switch (e) {
      case "short":
        return i + l(n, 2) + ":" + l(r, 2);
      case "narrow":
        return i + n + (0 < r ? ":" + r : "");
      case "techie":
        return i + l(n, 2) + l(r, 2);
      default:
        throw new RangeError(
          "Value format " + e + " is out of range for property format"
        );
    }
  }
  function oe(t) {
    return (
      (n = t),
      ["hour", "minute", "second", "millisecond"].reduce(function (t, e) {
        return (t[e] = n[e]), t;
      }, {})
    );
    var n;
  }
  var ae = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    ue = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    se = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
  function ce(t) {
    switch (t) {
      case "narrow":
        return [].concat(se);
      case "short":
        return [].concat(ue);
      case "long":
        return [].concat(ae);
      case "numeric":
        return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
      case "2-digit":
        return [
          "01",
          "02",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "11",
          "12",
        ];
      default:
        return null;
    }
  }
  var le = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    fe = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    de = ["M", "T", "W", "T", "F", "S", "S"];
  function he(t) {
    switch (t) {
      case "narrow":
        return [].concat(de);
      case "short":
        return [].concat(fe);
      case "long":
        return [].concat(le);
      case "numeric":
        return ["1", "2", "3", "4", "5", "6", "7"];
      default:
        return null;
    }
  }
  var me = ["AM", "PM"],
    ye = ["Before Christ", "Anno Domini"],
    ve = ["BC", "AD"],
    pe = ["B", "A"];
  function ge(t) {
    switch (t) {
      case "narrow":
        return [].concat(pe);
      case "short":
        return [].concat(ve);
      case "long":
        return [].concat(ye);
      default:
        return null;
    }
  }
  function we(t, e) {
    for (var n = "", r = H(t); !(i = r()).done; ) {
      var i = i.value;
      i.literal ? (n += i.val) : (n += e(i.val));
    }
    return n;
  }
  var ke = {
      D: $,
      DD: B,
      DDD: K,
      DDDD: X,
      t: tt,
      tt: et,
      ttt: nt,
      tttt: rt,
      T: it,
      TT: ot,
      TTT: at,
      TTTT: ut,
      f: st,
      ff: lt,
      fff: ht,
      ffff: yt,
      F: ct,
      FF: ft,
      FFF: mt,
      FFFF: vt,
    },
    O = (function () {
      function d(t, e) {
        (this.opts = e), (this.loc = t), (this.systemLoc = null);
      }
      (d.create = function (t, e) {
        return new d(t, (e = void 0 === e ? {} : e));
      }),
        (d.parseFormat = function (t) {
          for (var e = null, n = "", r = !1, i = [], o = 0; o < t.length; o++) {
            var a = t.charAt(o);
            "'" === a
              ? (0 < n.length &&
                  i.push({ literal: r || /^\s+$/.test(n), val: n }),
                (e = null),
                (n = ""),
                (r = !r))
              : r || a === e
              ? (n += a)
              : (0 < n.length && i.push({ literal: /^\s+$/.test(n), val: n }),
                (e = n = a));
          }
          return (
            0 < n.length && i.push({ literal: r || /^\s+$/.test(n), val: n }), i
          );
        }),
        (d.macroTokenToFormatOpts = function (t) {
          return ke[t];
        });
      var t = d.prototype;
      return (
        (t.formatWithSystemDefault = function (t, e) {
          return (
            null === this.systemLoc &&
              (this.systemLoc = this.loc.redefaultToSystem()),
            this.systemLoc.dtFormatter(t, s({}, this.opts, e)).format()
          );
        }),
        (t.dtFormatter = function (t, e) {
          return this.loc.dtFormatter(
            t,
            s({}, this.opts, (e = void 0 === e ? {} : e))
          );
        }),
        (t.formatDateTime = function (t, e) {
          return this.dtFormatter(t, e).format();
        }),
        (t.formatDateTimeParts = function (t, e) {
          return this.dtFormatter(t, e).formatToParts();
        }),
        (t.formatInterval = function (t, e) {
          return this.dtFormatter(t.start, e).dtf.formatRange(
            t.start.toJSDate(),
            t.end.toJSDate()
          );
        }),
        (t.resolvedOptions = function (t, e) {
          return this.dtFormatter(t, e).resolvedOptions();
        }),
        (t.num = function (t, e) {
          var n;
          return (
            void 0 === e && (e = 0),
            this.opts.forceSimple
              ? l(t, e)
              : ((n = s({}, this.opts)),
                0 < e && (n.padTo = e),
                this.loc.numberFormatter(n).format(t))
          );
        }),
        (t.formatDateTimeFromString = function (r, t) {
          var n = this,
            i = "en" === this.loc.listingMode(),
            e =
              this.loc.outputCalendar && "gregory" !== this.loc.outputCalendar,
            o = function (t, e) {
              return n.loc.extract(r, t, e);
            },
            a = function (t) {
              return r.isOffsetFixed && 0 === r.offset && t.allowZ
                ? "Z"
                : r.isValid
                ? r.zone.formatOffset(r.ts, t.format)
                : "";
            },
            u = function () {
              return i
                ? me[r.hour < 12 ? 0 : 1]
                : o({ hour: "numeric", hourCycle: "h12" }, "dayperiod");
            },
            s = function (t, e) {
              return i
                ? ((n = r), ce(t)[n.month - 1])
                : o(e ? { month: t } : { month: t, day: "numeric" }, "month");
              var n;
            },
            c = function (t, e) {
              return i
                ? ((n = r), he(t)[n.weekday - 1])
                : o(
                    e
                      ? { weekday: t }
                      : { weekday: t, month: "long", day: "numeric" },
                    "weekday"
                  );
              var n;
            },
            l = function (t) {
              var e = d.macroTokenToFormatOpts(t);
              return e ? n.formatWithSystemDefault(r, e) : t;
            },
            f = function (t) {
              return i
                ? ((e = r), ge(t)[e.year < 0 ? 0 : 1])
                : o({ era: t }, "era");
              var e;
            };
          return we(d.parseFormat(t), function (t) {
            switch (t) {
              case "S":
                return n.num(r.millisecond);
              case "u":
              case "SSS":
                return n.num(r.millisecond, 3);
              case "s":
                return n.num(r.second);
              case "ss":
                return n.num(r.second, 2);
              case "uu":
                return n.num(Math.floor(r.millisecond / 10), 2);
              case "uuu":
                return n.num(Math.floor(r.millisecond / 100));
              case "m":
                return n.num(r.minute);
              case "mm":
                return n.num(r.minute, 2);
              case "h":
                return n.num(r.hour % 12 == 0 ? 12 : r.hour % 12);
              case "hh":
                return n.num(r.hour % 12 == 0 ? 12 : r.hour % 12, 2);
              case "H":
                return n.num(r.hour);
              case "HH":
                return n.num(r.hour, 2);
              case "Z":
                return a({ format: "narrow", allowZ: n.opts.allowZ });
              case "ZZ":
                return a({ format: "short", allowZ: n.opts.allowZ });
              case "ZZZ":
                return a({ format: "techie", allowZ: n.opts.allowZ });
              case "ZZZZ":
                return r.zone.offsetName(r.ts, {
                  format: "short",
                  locale: n.loc.locale,
                });
              case "ZZZZZ":
                return r.zone.offsetName(r.ts, {
                  format: "long",
                  locale: n.loc.locale,
                });
              case "z":
                return r.zoneName;
              case "a":
                return u();
              case "d":
                return e ? o({ day: "numeric" }, "day") : n.num(r.day);
              case "dd":
                return e ? o({ day: "2-digit" }, "day") : n.num(r.day, 2);
              case "c":
                return n.num(r.weekday);
              case "ccc":
                return c("short", !0);
              case "cccc":
                return c("long", !0);
              case "ccccc":
                return c("narrow", !0);
              case "E":
                return n.num(r.weekday);
              case "EEE":
                return c("short", !1);
              case "EEEE":
                return c("long", !1);
              case "EEEEE":
                return c("narrow", !1);
              case "L":
                return e
                  ? o({ month: "numeric", day: "numeric" }, "month")
                  : n.num(r.month);
              case "LL":
                return e
                  ? o({ month: "2-digit", day: "numeric" }, "month")
                  : n.num(r.month, 2);
              case "LLL":
                return s("short", !0);
              case "LLLL":
                return s("long", !0);
              case "LLLLL":
                return s("narrow", !0);
              case "M":
                return e ? o({ month: "numeric" }, "month") : n.num(r.month);
              case "MM":
                return e ? o({ month: "2-digit" }, "month") : n.num(r.month, 2);
              case "MMM":
                return s("short", !1);
              case "MMMM":
                return s("long", !1);
              case "MMMMM":
                return s("narrow", !1);
              case "y":
                return e ? o({ year: "numeric" }, "year") : n.num(r.year);
              case "yy":
                return e
                  ? o({ year: "2-digit" }, "year")
                  : n.num(r.year.toString().slice(-2), 2);
              case "yyyy":
                return e ? o({ year: "numeric" }, "year") : n.num(r.year, 4);
              case "yyyyyy":
                return e ? o({ year: "numeric" }, "year") : n.num(r.year, 6);
              case "G":
                return f("short");
              case "GG":
                return f("long");
              case "GGGGG":
                return f("narrow");
              case "kk":
                return n.num(r.weekYear.toString().slice(-2), 2);
              case "kkkk":
                return n.num(r.weekYear, 4);
              case "W":
                return n.num(r.weekNumber);
              case "WW":
                return n.num(r.weekNumber, 2);
              case "o":
                return n.num(r.ordinal);
              case "ooo":
                return n.num(r.ordinal, 3);
              case "q":
                return n.num(r.quarter);
              case "qq":
                return n.num(r.quarter, 2);
              case "X":
                return n.num(Math.floor(r.ts / 1e3));
              case "x":
                return n.num(r.ts);
              default:
                return l(t);
            }
          });
        }),
        (t.formatDurationFromString = function (t, e) {
          var n,
            r = this,
            i = function (t) {
              switch (t[0]) {
                case "S":
                  return "millisecond";
                case "s":
                  return "second";
                case "m":
                  return "minute";
                case "h":
                  return "hour";
                case "d":
                  return "day";
                case "w":
                  return "week";
                case "M":
                  return "month";
                case "y":
                  return "year";
                default:
                  return null;
              }
            },
            e = d.parseFormat(e),
            o = e.reduce(function (t, e) {
              var n = e.literal,
                e = e.val;
              return n ? t : t.concat(e);
            }, []),
            t = t.shiftTo.apply(
              t,
              o.map(i).filter(function (t) {
                return t;
              })
            );
          return we(
            e,
            ((n = t),
            function (t) {
              var e = i(t);
              return e ? r.num(n.get(e), t.length) : t;
            })
          );
        }),
        d
      );
    })(),
    S = (function () {
      function t(t, e) {
        (this.reason = t), (this.explanation = e);
      }
      return (
        (t.prototype.toMessage = function () {
          return this.explanation
            ? this.reason + ": " + this.explanation
            : this.reason;
        }),
        t
      );
    })(),
    r =
      /[A-Za-z_+-]{1,256}(?::?\/[A-Za-z0-9_+-]{1,256}(?:\/[A-Za-z0-9_+-]{1,256})?)?/;
  function p() {
    for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
      e[n] = arguments[n];
    var r = e.reduce(function (t, e) {
      return t + e.source;
    }, "");
    return RegExp("^" + r + "$");
  }
  function N() {
    for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
      e[n] = arguments[n];
    return function (o) {
      return e
        .reduce(
          function (t, e) {
            var n = t[0],
              r = t[1],
              t = t[2],
              e = e(o, t),
              t = e[0],
              i = e[1],
              e = e[2];
            return [s({}, n, t), i || r, e];
          },
          [{}, null, 1]
        )
        .slice(0, 2);
    };
  }
  function be(t) {
    if (null != t) {
      for (
        var e = arguments.length, n = new Array(1 < e ? e - 1 : 0), r = 1;
        r < e;
        r++
      )
        n[r - 1] = arguments[r];
      for (var i = 0, o = n; i < o.length; i++) {
        var a = o[i],
          u = a[0],
          a = a[1],
          u = u.exec(t);
        if (u) return a(u);
      }
    }
    return [null, null];
  }
  function Te() {
    for (var t = arguments.length, i = new Array(t), e = 0; e < t; e++)
      i[e] = arguments[e];
    return function (t, e) {
      for (var n = {}, r = 0; r < i.length; r++) n[i[r]] = m(t[e + r]);
      return [n, null, e + r];
    };
  }
  var e = /(?:(Z)|([+-]\d\d)(?::?(\d\d))?)/,
    a = /(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?/,
    Oe = RegExp(
      a.source + ("(?:" + e.source + "?(?:\\[(" + r.source + ")\\])?)?")
    ),
    M = RegExp("(?:T" + Oe.source + ")?"),
    Se = Te("weekYear", "weekNumber", "weekDay"),
    Ne = Te("year", "ordinal"),
    e = RegExp(a.source + " ?(?:" + e.source + "|(" + r.source + "))?"),
    r = RegExp("(?: " + e.source + ")?");
  function Me(t, e, n) {
    t = t[e];
    return b(t) ? n : m(t);
  }
  function De(t, e) {
    return [
      {
        hours: Me(t, e, 0),
        minutes: Me(t, e + 1, 0),
        seconds: Me(t, e + 2, 0),
        milliseconds: Jt(t[e + 3]),
      },
      null,
      e + 4,
    ];
  }
  function Ee(t, e) {
    var n = !t[e] && !t[e + 1],
      t = ee(t[e + 1], t[e + 2]);
    return [{}, n ? null : d.instance(t), e + 3];
  }
  function Ve(t, e) {
    return [{}, t[e] ? f.create(t[e]) : null, e + 1];
  }
  var Ie = RegExp("^T?" + a.source + "$"),
    xe =
      /^-?P(?:(?:(-?\d{1,20}(?:\.\d{1,20})?)Y)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20}(?:\.\d{1,20})?)W)?(?:(-?\d{1,20}(?:\.\d{1,20})?)D)?(?:T(?:(-?\d{1,20}(?:\.\d{1,20})?)H)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20})(?:[.,](-?\d{1,20}))?S)?)?)$/;
  function Ce(t) {
    function e(t, e) {
      return void 0 === e && (e = !1), void 0 !== t && (e || (t && l)) ? -t : t;
    }
    var n = t[0],
      r = t[1],
      i = t[2],
      o = t[3],
      a = t[4],
      u = t[5],
      s = t[6],
      c = t[7],
      t = t[8],
      l = "-" === n[0],
      n = c && "-" === c[0];
    return [
      {
        years: e(v(r)),
        months: e(v(i)),
        weeks: e(v(o)),
        days: e(v(a)),
        hours: e(v(u)),
        minutes: e(v(s)),
        seconds: e(v(c), "-0" === c),
        milliseconds: e(Jt(t), n),
      },
    ];
  }
  var Ze = {
    GMT: 0,
    EDT: -240,
    EST: -300,
    CDT: -300,
    CST: -360,
    MDT: -360,
    MST: -420,
    PDT: -420,
    PST: -480,
  };
  function Fe(t, e, n, r, i, o, a) {
    e = {
      year: 2 === e.length ? Xt(m(e)) : m(e),
      month: ue.indexOf(n) + 1,
      day: m(r),
      hour: m(i),
      minute: m(o),
    };
    return (
      a && (e.second = m(a)),
      t && (e.weekday = 3 < t.length ? le.indexOf(t) + 1 : fe.indexOf(t) + 1),
      e
    );
  }
  var Le =
    /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|(?:([+-]\d\d)(\d\d)))$/;
  function ze(t) {
    var e = t[1],
      n = t[2],
      r = t[3],
      i = t[4],
      o = t[5],
      a = t[6],
      u = t[7],
      s = t[8],
      c = t[9],
      l = t[10],
      t = t[11],
      e = Fe(e, i, r, n, o, a, u),
      i = s ? Ze[s] : c ? 0 : ee(l, t);
    return [e, new d(i)];
  }
  var je =
      /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d\d) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d\d):(\d\d):(\d\d) GMT$/,
    Ae =
      /^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d\d)-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d\d) (\d\d):(\d\d):(\d\d) GMT$/,
    qe =
      /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( \d|\d\d) (\d\d):(\d\d):(\d\d) (\d{4})$/;
  function _e(t) {
    var e = t[1],
      n = t[2],
      r = t[3];
    return [Fe(e, t[4], r, n, t[5], t[6], t[7]), d.utcInstance];
  }
  function Ue(t) {
    var e = t[1],
      n = t[2],
      r = t[3],
      i = t[4],
      o = t[5],
      a = t[6];
    return [Fe(e, t[7], n, r, i, o, a), d.utcInstance];
  }
  var Pe = p(/([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?/, M),
    He = p(/(\d{4})-?W(\d\d)(?:-?(\d))?/, M),
    Re = p(/(\d{4})-?(\d{3})/, M),
    We = p(Oe),
    Je = N(
      function (t, e) {
        return [
          { year: Me(t, e), month: Me(t, e + 1, 1), day: Me(t, e + 2, 1) },
          null,
          e + 3,
        ];
      },
      De,
      Ee,
      Ve
    ),
    Ye = N(Se, De, Ee, Ve),
    Ge = N(Ne, De, Ee, Ve),
    $e = N(De, Ee, Ve);
  var Be = N(De);
  var Qe = p(/(\d{4})-(\d\d)-(\d\d)/, r),
    Ke = p(e),
    Xe = N(De, Ee, Ve);
  var tn = "Invalid Duration",
    a = {
      weeks: {
        days: 7,
        hours: 168,
        minutes: 10080,
        seconds: 604800,
        milliseconds: 6048e5,
      },
      days: { hours: 24, minutes: 1440, seconds: 86400, milliseconds: 864e5 },
      hours: { minutes: 60, seconds: 3600, milliseconds: 36e5 },
      minutes: { seconds: 60, milliseconds: 6e4 },
      seconds: { milliseconds: 1e3 },
    },
    en = s(
      {
        years: {
          quarters: 4,
          months: 12,
          weeks: 52,
          days: 365,
          hours: 8760,
          minutes: 525600,
          seconds: 31536e3,
          milliseconds: 31536e6,
        },
        quarters: {
          months: 3,
          weeks: 13,
          days: 91,
          hours: 2184,
          minutes: 131040,
          seconds: 7862400,
          milliseconds: 78624e5,
        },
        months: {
          weeks: 4,
          days: 30,
          hours: 720,
          minutes: 43200,
          seconds: 2592e3,
          milliseconds: 2592e6,
        },
      },
      a
    ),
    M = 365.2425,
    Oe = 30.436875,
    nn = s(
      {
        years: {
          quarters: 4,
          months: 12,
          weeks: M / 7,
          days: M,
          hours: 24 * M,
          minutes: 525949.2,
          seconds: 525949.2 * 60,
          milliseconds: 525949.2 * 60 * 1e3,
        },
        quarters: {
          months: 3,
          weeks: M / 28,
          days: M / 4,
          hours: (24 * M) / 4,
          minutes: 131487.3,
          seconds: (525949.2 * 60) / 4,
          milliseconds: 7889237999.999999,
        },
        months: {
          weeks: Oe / 7,
          days: Oe,
          hours: 24 * Oe,
          minutes: 43829.1,
          seconds: 2629746,
          milliseconds: 2629746e3,
        },
      },
      a
    ),
    D = [
      "years",
      "quarters",
      "months",
      "weeks",
      "days",
      "hours",
      "minutes",
      "seconds",
      "milliseconds",
    ],
    rn = D.slice(0).reverse();
  function E(t, e, n) {
    n = {
      values: (n = void 0 === n ? !1 : n)
        ? e.values
        : s({}, t.values, e.values || {}),
      loc: t.loc.clone(e.loc),
      conversionAccuracy: e.conversionAccuracy || t.conversionAccuracy,
      matrix: e.matrix || t.matrix,
    };
    return new V(n);
  }
  function on(t, e) {
    for (
      var n, r = null != (n = e.milliseconds) ? n : 0, i = H(rn.slice(1));
      !(o = i()).done;

    ) {
      var o = o.value;
      e[o] && (r += e[o] * t[o].milliseconds);
    }
    return r;
  }
  function an(i, o) {
    var a = on(i, o) < 0 ? -1 : 1;
    D.reduceRight(function (t, e) {
      var n, r;
      return b(o[e])
        ? t
        : (t &&
            ((r = o[t] * a),
            (n = i[e][t]),
            (r = Math.floor(r / n)),
            (o[e] += r * a),
            (o[t] -= r * n * a)),
          e);
    }, null),
      D.reduce(function (t, e) {
        var n;
        return b(o[e])
          ? t
          : (t && ((n = o[t] % 1), (o[t] -= n), (o[e] += n * i[t][e])), e);
      }, null);
  }
  var V = (function () {
      function m(t) {
        var e = "longterm" === t.conversionAccuracy || !1,
          n = e ? nn : en;
        t.matrix && (n = t.matrix),
          (this.values = t.values),
          (this.loc = t.loc || g.create()),
          (this.conversionAccuracy = e ? "longterm" : "casual"),
          (this.invalid = t.invalid || null),
          (this.matrix = n),
          (this.isLuxonDuration = !0);
      }
      (m.fromMillis = function (t, e) {
        return m.fromObject({ milliseconds: t }, e);
      }),
        (m.fromObject = function (t, e) {
          if ((void 0 === e && (e = {}), null == t || "object" != typeof t))
            throw new u(
              "Duration.fromObject: argument expected to be an object, got " +
                (null === t ? "null" : typeof t)
            );
          return new m({
            values: re(t, m.normalizeUnit),
            loc: g.fromObject(e),
            conversionAccuracy: e.conversionAccuracy,
            matrix: e.matrix,
          });
        }),
        (m.fromDurationLike = function (t) {
          if (y(t)) return m.fromMillis(t);
          if (m.isDuration(t)) return t;
          if ("object" == typeof t) return m.fromObject(t);
          throw new u(
            "Unknown duration argument " + t + " of type " + typeof t
          );
        }),
        (m.fromISO = function (t, e) {
          var n = be(t, [xe, Ce])[0];
          return n
            ? m.fromObject(n, e)
            : m.invalid(
                "unparsable",
                'the input "' + t + "\" can't be parsed as ISO 8601"
              );
        }),
        (m.fromISOTime = function (t, e) {
          var n = be(t, [Ie, Be])[0];
          return n
            ? m.fromObject(n, e)
            : m.invalid(
                "unparsable",
                'the input "' + t + "\" can't be parsed as ISO 8601"
              );
        }),
        (m.invalid = function (t, e) {
          if ((void 0 === e && (e = null), !t))
            throw new u("need to specify a reason the Duration is invalid");
          t = t instanceof S ? t : new S(t, e);
          if (k.throwOnInvalid) throw new J(t);
          return new m({ invalid: t });
        }),
        (m.normalizeUnit = function (t) {
          var e = {
            year: "years",
            years: "years",
            quarter: "quarters",
            quarters: "quarters",
            month: "months",
            months: "months",
            week: "weeks",
            weeks: "weeks",
            day: "days",
            days: "days",
            hour: "hours",
            hours: "hours",
            minute: "minutes",
            minutes: "minutes",
            second: "seconds",
            seconds: "seconds",
            millisecond: "milliseconds",
            milliseconds: "milliseconds",
          }[t && t.toLowerCase()];
          if (e) return e;
          throw new G(t);
        }),
        (m.isDuration = function (t) {
          return (t && t.isLuxonDuration) || !1;
        });
      var t = m.prototype;
      return (
        (t.toFormat = function (t, e) {
          e = s({}, (e = void 0 === e ? {} : e), {
            floor: !1 !== e.round && !1 !== e.floor,
          });
          return this.isValid
            ? O.create(this.loc, e).formatDurationFromString(this, t)
            : tn;
        }),
        (t.toHuman = function (n) {
          var t,
            r = this;
          return (
            void 0 === n && (n = {}),
            this.isValid
              ? ((t = D.map(function (t) {
                  var e = r.values[t];
                  return b(e)
                    ? null
                    : r.loc
                        .numberFormatter(
                          s({ style: "unit", unitDisplay: "long" }, n, {
                            unit: t.slice(0, -1),
                          })
                        )
                        .format(e);
                }).filter(function (t) {
                  return t;
                })),
                this.loc
                  .listFormatter(
                    s(
                      { type: "conjunction", style: n.listStyle || "narrow" },
                      n
                    )
                  )
                  .format(t))
              : tn
          );
        }),
        (t.toObject = function () {
          return this.isValid ? s({}, this.values) : {};
        }),
        (t.toISO = function () {
          var t;
          return this.isValid
            ? ((t = "P"),
              0 !== this.years && (t += this.years + "Y"),
              (0 === this.months && 0 === this.quarters) ||
                (t += this.months + 3 * this.quarters + "M"),
              0 !== this.weeks && (t += this.weeks + "W"),
              0 !== this.days && (t += this.days + "D"),
              (0 === this.hours &&
                0 === this.minutes &&
                0 === this.seconds &&
                0 === this.milliseconds) ||
                (t += "T"),
              0 !== this.hours && (t += this.hours + "H"),
              0 !== this.minutes && (t += this.minutes + "M"),
              (0 === this.seconds && 0 === this.milliseconds) ||
                (t += Yt(this.seconds + this.milliseconds / 1e3, 3) + "S"),
              "P" === t && (t += "T0S"),
              t)
            : null;
        }),
        (t.toISOTime = function (t) {
          var e;
          return (
            void 0 === t && (t = {}),
            !this.isValid || (e = this.toMillis()) < 0 || 864e5 <= e
              ? null
              : ((t = s(
                  {
                    suppressMilliseconds: !1,
                    suppressSeconds: !1,
                    includePrefix: !1,
                    format: "extended",
                  },
                  t,
                  { includeOffset: !1 }
                )),
                L.fromMillis(e, { zone: "UTC" }).toISOTime(t))
          );
        }),
        (t.toJSON = function () {
          return this.toISO();
        }),
        (t.toString = function () {
          return this.toISO();
        }),
        (t.toMillis = function () {
          return this.isValid ? on(this.matrix, this.values) : NaN;
        }),
        (t.valueOf = function () {
          return this.toMillis();
        }),
        (t.plus = function (t) {
          if (!this.isValid) return this;
          for (
            var e = m.fromDurationLike(t), n = {}, r = 0, i = D;
            r < i.length;
            r++
          ) {
            var o = i[r];
            (h(e.values, o) || h(this.values, o)) &&
              (n[o] = e.get(o) + this.get(o));
          }
          return E(this, { values: n }, !0);
        }),
        (t.minus = function (t) {
          return this.isValid
            ? ((t = m.fromDurationLike(t)), this.plus(t.negate()))
            : this;
        }),
        (t.mapUnits = function (t) {
          if (!this.isValid) return this;
          for (
            var e = {}, n = 0, r = Object.keys(this.values);
            n < r.length;
            n++
          ) {
            var i = r[n];
            e[i] = ne(t(this.values[i], i));
          }
          return E(this, { values: e }, !0);
        }),
        (t.get = function (t) {
          return this[m.normalizeUnit(t)];
        }),
        (t.set = function (t) {
          return this.isValid
            ? E(this, { values: s({}, this.values, re(t, m.normalizeUnit)) })
            : this;
        }),
        (t.reconfigure = function (t) {
          var t = void 0 === t ? {} : t,
            e = t.locale,
            n = t.numberingSystem,
            r = t.conversionAccuracy,
            t = t.matrix,
            e = this.loc.clone({ locale: e, numberingSystem: n });
          return E(this, { loc: e, matrix: t, conversionAccuracy: r });
        }),
        (t.as = function (t) {
          return this.isValid ? this.shiftTo(t).get(t) : NaN;
        }),
        (t.normalize = function () {
          var t;
          return this.isValid
            ? ((t = this.toObject()),
              an(this.matrix, t),
              E(this, { values: t }, !0))
            : this;
        }),
        (t.rescale = function () {
          var t;
          return this.isValid
            ? ((t = (function (t) {
                for (
                  var e = {}, n = 0, r = Object.entries(t);
                  n < r.length;
                  n++
                ) {
                  var i = r[n],
                    o = i[0],
                    i = i[1];
                  0 !== i && (e[o] = i);
                }
                return e;
              })(this.normalize().shiftToAll().toObject())),
              E(this, { values: t }, !0))
            : this;
        }),
        (t.shiftTo = function () {
          for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
            e[n] = arguments[n];
          if (!this.isValid) return this;
          if (0 === e.length) return this;
          for (
            var r,
              e = e.map(function (t) {
                return m.normalizeUnit(t);
              }),
              i = {},
              o = {},
              a = this.toObject(),
              u = 0,
              s = D;
            u < s.length;
            u++
          ) {
            var c = s[u];
            if (0 <= e.indexOf(c)) {
              var l,
                f = c,
                d = 0;
              for (l in o) (d += this.matrix[l][c] * o[l]), (o[l] = 0);
              y(a[c]) && (d += a[c]);
              var h = Math.trunc(d);
              o[c] = (1e3 * d - 1e3 * (i[c] = h)) / 1e3;
            } else y(a[c]) && (o[c] = a[c]);
          }
          for (r in o)
            0 !== o[r] && (i[f] += r === f ? o[r] : o[r] / this.matrix[f][r]);
          return an(this.matrix, i), E(this, { values: i }, !0);
        }),
        (t.shiftToAll = function () {
          return this.isValid
            ? this.shiftTo(
                "years",
                "months",
                "weeks",
                "days",
                "hours",
                "minutes",
                "seconds",
                "milliseconds"
              )
            : this;
        }),
        (t.negate = function () {
          if (!this.isValid) return this;
          for (
            var t = {}, e = 0, n = Object.keys(this.values);
            e < n.length;
            e++
          ) {
            var r = n[e];
            t[r] = 0 === this.values[r] ? 0 : -this.values[r];
          }
          return E(this, { values: t }, !0);
        }),
        (t.equals = function (t) {
          if (!this.isValid || !t.isValid) return !1;
          if (!this.loc.equals(t.loc)) return !1;
          for (var e, n = 0, r = D; n < r.length; n++) {
            var i = r[n];
            if (
              ((e = this.values[i]),
              (i = t.values[i]),
              !(void 0 === e || 0 === e ? void 0 === i || 0 === i : e === i))
            )
              return !1;
          }
          return !0;
        }),
        o(m, [
          {
            key: "locale",
            get: function () {
              return this.isValid ? this.loc.locale : null;
            },
          },
          {
            key: "numberingSystem",
            get: function () {
              return this.isValid ? this.loc.numberingSystem : null;
            },
          },
          {
            key: "years",
            get: function () {
              return this.isValid ? this.values.years || 0 : NaN;
            },
          },
          {
            key: "quarters",
            get: function () {
              return this.isValid ? this.values.quarters || 0 : NaN;
            },
          },
          {
            key: "months",
            get: function () {
              return this.isValid ? this.values.months || 0 : NaN;
            },
          },
          {
            key: "weeks",
            get: function () {
              return this.isValid ? this.values.weeks || 0 : NaN;
            },
          },
          {
            key: "days",
            get: function () {
              return this.isValid ? this.values.days || 0 : NaN;
            },
          },
          {
            key: "hours",
            get: function () {
              return this.isValid ? this.values.hours || 0 : NaN;
            },
          },
          {
            key: "minutes",
            get: function () {
              return this.isValid ? this.values.minutes || 0 : NaN;
            },
          },
          {
            key: "seconds",
            get: function () {
              return this.isValid ? this.values.seconds || 0 : NaN;
            },
          },
          {
            key: "milliseconds",
            get: function () {
              return this.isValid ? this.values.milliseconds || 0 : NaN;
            },
          },
          {
            key: "isValid",
            get: function () {
              return null === this.invalid;
            },
          },
          {
            key: "invalidReason",
            get: function () {
              return this.invalid ? this.invalid.reason : null;
            },
          },
          {
            key: "invalidExplanation",
            get: function () {
              return this.invalid ? this.invalid.explanation : null;
            },
          },
        ]),
        m
      );
    })(),
    un = "Invalid Interval";
  var sn = (function () {
      function c(t) {
        (this.s = t.start),
          (this.e = t.end),
          (this.invalid = t.invalid || null),
          (this.isLuxonInterval = !0);
      }
      (c.invalid = function (t, e) {
        if ((void 0 === e && (e = null), !t))
          throw new u("need to specify a reason the Interval is invalid");
        t = t instanceof S ? t : new S(t, e);
        if (k.throwOnInvalid) throw new W(t);
        return new c({ invalid: t });
      }),
        (c.fromDateTimes = function (t, e) {
          var n,
            t = ar(t),
            e = ar(e),
            r =
              ((n = e),
              (r = t) && r.isValid
                ? n && n.isValid
                  ? n < r
                    ? sn.invalid(
                        "end before start",
                        "The end of an interval must be after its start, but you had start=" +
                          r.toISO() +
                          " and end=" +
                          n.toISO()
                      )
                    : null
                  : sn.invalid("missing or invalid end")
                : sn.invalid("missing or invalid start"));
          return null == r ? new c({ start: t, end: e }) : r;
        }),
        (c.after = function (t, e) {
          (e = V.fromDurationLike(e)), (t = ar(t));
          return c.fromDateTimes(t, t.plus(e));
        }),
        (c.before = function (t, e) {
          (e = V.fromDurationLike(e)), (t = ar(t));
          return c.fromDateTimes(t.minus(e), t);
        }),
        (c.fromISO = function (t, e) {
          var n,
            r,
            i,
            o = (t || "").split("/", 2),
            a = o[0],
            u = o[1];
          if (a && u) {
            try {
              s = (n = L.fromISO(a, e)).isValid;
            } catch (u) {
              s = !1;
            }
            try {
              i = (r = L.fromISO(u, e)).isValid;
            } catch (u) {
              i = !1;
            }
            if (s && i) return c.fromDateTimes(n, r);
            if (s) {
              o = V.fromISO(u, e);
              if (o.isValid) return c.after(n, o);
            } else if (i) {
              var s = V.fromISO(a, e);
              if (s.isValid) return c.before(r, s);
            }
          }
          return c.invalid(
            "unparsable",
            'the input "' + t + "\" can't be parsed as ISO 8601"
          );
        }),
        (c.isInterval = function (t) {
          return (t && t.isLuxonInterval) || !1;
        });
      var t = c.prototype;
      return (
        (t.length = function (t) {
          return (
            void 0 === t && (t = "milliseconds"),
            this.isValid ? this.toDuration.apply(this, [t]).get(t) : NaN
          );
        }),
        (t.count = function (t) {
          var e, n;
          return (
            void 0 === t && (t = "milliseconds"),
            this.isValid
              ? ((e = this.start.startOf(t)),
                (n = this.end.startOf(t)),
                Math.floor(n.diff(e, t).get(t)) +
                  (n.valueOf() !== this.end.valueOf()))
              : NaN
          );
        }),
        (t.hasSame = function (t) {
          return (
            !!this.isValid &&
            (this.isEmpty() || this.e.minus(1).hasSame(this.s, t))
          );
        }),
        (t.isEmpty = function () {
          return this.s.valueOf() === this.e.valueOf();
        }),
        (t.isAfter = function (t) {
          return !!this.isValid && this.s > t;
        }),
        (t.isBefore = function (t) {
          return !!this.isValid && this.e <= t;
        }),
        (t.contains = function (t) {
          return !!this.isValid && this.s <= t && this.e > t;
        }),
        (t.set = function (t) {
          var t = void 0 === t ? {} : t,
            e = t.start,
            t = t.end;
          return this.isValid
            ? c.fromDateTimes(e || this.s, t || this.e)
            : this;
        }),
        (t.splitAt = function () {
          var e = this;
          if (!this.isValid) return [];
          for (var t = arguments.length, n = new Array(t), r = 0; r < t; r++)
            n[r] = arguments[r];
          for (
            var i = n
                .map(ar)
                .filter(function (t) {
                  return e.contains(t);
                })
                .sort(),
              o = [],
              a = this.s,
              u = 0;
            a < this.e;

          ) {
            var s = i[u] || this.e,
              s = +s > +this.e ? this.e : s;
            o.push(c.fromDateTimes(a, s)), (a = s), (u += 1);
          }
          return o;
        }),
        (t.splitBy = function (t) {
          var e = V.fromDurationLike(t);
          if (!this.isValid || !e.isValid || 0 === e.as("milliseconds"))
            return [];
          for (var n = this.s, r = 1, i = []; n < this.e; ) {
            var o = this.start.plus(
                e.mapUnits(function (t) {
                  return t * r;
                })
              ),
              o = +o > +this.e ? this.e : o;
            i.push(c.fromDateTimes(n, o)), (n = o), (r += 1);
          }
          return i;
        }),
        (t.divideEqually = function (t) {
          return this.isValid
            ? this.splitBy(this.length() / t).slice(0, t)
            : [];
        }),
        (t.overlaps = function (t) {
          return this.e > t.s && this.s < t.e;
        }),
        (t.abutsStart = function (t) {
          return !!this.isValid && +this.e == +t.s;
        }),
        (t.abutsEnd = function (t) {
          return !!this.isValid && +t.e == +this.s;
        }),
        (t.engulfs = function (t) {
          return !!this.isValid && this.s <= t.s && this.e >= t.e;
        }),
        (t.equals = function (t) {
          return (
            !(!this.isValid || !t.isValid) &&
            this.s.equals(t.s) &&
            this.e.equals(t.e)
          );
        }),
        (t.intersection = function (t) {
          var e;
          return this.isValid
            ? ((e = (this.s > t.s ? this : t).s),
              (t = (this.e < t.e ? this : t).e) <= e
                ? null
                : c.fromDateTimes(e, t))
            : this;
        }),
        (t.union = function (t) {
          var e;
          return this.isValid
            ? ((e = (this.s < t.s ? this : t).s),
              (t = (this.e > t.e ? this : t).e),
              c.fromDateTimes(e, t))
            : this;
        }),
        (c.merge = function (t) {
          var t = t
              .sort(function (t, e) {
                return t.s - e.s;
              })
              .reduce(
                function (t, e) {
                  var n = t[0],
                    t = t[1];
                  return t
                    ? t.overlaps(e) || t.abutsStart(e)
                      ? [n, t.union(e)]
                      : [n.concat([t]), e]
                    : [n, e];
                },
                [[], null]
              ),
            e = t[0],
            t = t[1];
          return t && e.push(t), e;
        }),
        (c.xor = function (t) {
          for (
            var e,
              n = null,
              r = 0,
              i = [],
              t = t.map(function (t) {
                return [
                  { time: t.s, type: "s" },
                  { time: t.e, type: "e" },
                ];
              }),
              o = H(
                (e = Array.prototype).concat.apply(e, t).sort(function (t, e) {
                  return t.time - e.time;
                })
              );
            !(a = o()).done;

          )
            var a = a.value,
              n =
                1 === (r += "s" === a.type ? 1 : -1)
                  ? a.time
                  : (n && +n != +a.time && i.push(c.fromDateTimes(n, a.time)),
                    null);
          return c.merge(i);
        }),
        (t.difference = function () {
          for (
            var e = this, t = arguments.length, n = new Array(t), r = 0;
            r < t;
            r++
          )
            n[r] = arguments[r];
          return c
            .xor([this].concat(n))
            .map(function (t) {
              return e.intersection(t);
            })
            .filter(function (t) {
              return t && !t.isEmpty();
            });
        }),
        (t.toString = function () {
          return this.isValid
            ? "[" + this.s.toISO() + " – " + this.e.toISO() + ")"
            : un;
        }),
        (t.toLocaleString = function (t, e) {
          return (
            void 0 === t && (t = $),
            void 0 === e && (e = {}),
            this.isValid
              ? O.create(this.s.loc.clone(e), t).formatInterval(this)
              : un
          );
        }),
        (t.toISO = function (t) {
          return this.isValid ? this.s.toISO(t) + "/" + this.e.toISO(t) : un;
        }),
        (t.toISODate = function () {
          return this.isValid
            ? this.s.toISODate() + "/" + this.e.toISODate()
            : un;
        }),
        (t.toISOTime = function (t) {
          return this.isValid
            ? this.s.toISOTime(t) + "/" + this.e.toISOTime(t)
            : un;
        }),
        (t.toFormat = function (t, e) {
          (e = (void 0 === e ? {} : e).separator),
            (e = void 0 === e ? " – " : e);
          return this.isValid
            ? "" + this.s.toFormat(t) + e + this.e.toFormat(t)
            : un;
        }),
        (t.toDuration = function (t, e) {
          return this.isValid
            ? this.e.diff(this.s, t, e)
            : V.invalid(this.invalidReason);
        }),
        (t.mapEndpoints = function (t) {
          return c.fromDateTimes(t(this.s), t(this.e));
        }),
        o(c, [
          {
            key: "start",
            get: function () {
              return this.isValid ? this.s : null;
            },
          },
          {
            key: "end",
            get: function () {
              return this.isValid ? this.e : null;
            },
          },
          {
            key: "isValid",
            get: function () {
              return null === this.invalidReason;
            },
          },
          {
            key: "invalidReason",
            get: function () {
              return this.invalid ? this.invalid.reason : null;
            },
          },
          {
            key: "invalidExplanation",
            get: function () {
              return this.invalid ? this.invalid.explanation : null;
            },
          },
        ]),
        c
      );
    })(),
    cn = (function () {
      function t() {}
      return (
        (t.hasDST = function (t) {
          void 0 === t && (t = k.defaultZone);
          var e = L.now().setZone(t).set({ month: 12 });
          return !t.isUniversal && e.offset !== e.set({ month: 6 }).offset;
        }),
        (t.isValidIANAZone = function (t) {
          return f.isValidZone(t);
        }),
        (t.normalizeZone = function (t) {
          return w(t, k.defaultZone);
        }),
        (t.months = function (t, e) {
          void 0 === t && (t = "long");
          var e = void 0 === e ? {} : e,
            n = e.locale,
            r = e.numberingSystem,
            i = e.locObj,
            i = void 0 === i ? null : i,
            e = e.outputCalendar;
          return (
            i ||
            g.create(
              void 0 === n ? null : n,
              void 0 === r ? null : r,
              void 0 === e ? "gregory" : e
            )
          ).months(t);
        }),
        (t.monthsFormat = function (t, e) {
          void 0 === t && (t = "long");
          var e = void 0 === e ? {} : e,
            n = e.locale,
            r = e.numberingSystem,
            i = e.locObj,
            i = void 0 === i ? null : i,
            e = e.outputCalendar;
          return (
            i ||
            g.create(
              void 0 === n ? null : n,
              void 0 === r ? null : r,
              void 0 === e ? "gregory" : e
            )
          ).months(t, !0);
        }),
        (t.weekdays = function (t, e) {
          void 0 === t && (t = "long");
          var e = void 0 === e ? {} : e,
            n = e.locale,
            r = e.numberingSystem,
            e = e.locObj;
          return (
            (void 0 === e ? null : e) ||
            g.create(void 0 === n ? null : n, void 0 === r ? null : r, null)
          ).weekdays(t);
        }),
        (t.weekdaysFormat = function (t, e) {
          void 0 === t && (t = "long");
          var e = void 0 === e ? {} : e,
            n = e.locale,
            r = e.numberingSystem,
            e = e.locObj;
          return (
            (void 0 === e ? null : e) ||
            g.create(void 0 === n ? null : n, void 0 === r ? null : r, null)
          ).weekdays(t, !0);
        }),
        (t.meridiems = function (t) {
          t = (void 0 === t ? {} : t).locale;
          return g.create(void 0 === t ? null : t).meridiems();
        }),
        (t.eras = function (t, e) {
          void 0 === t && (t = "short");
          e = (void 0 === e ? {} : e).locale;
          return g.create(void 0 === e ? null : e, null, "gregory").eras(t);
        }),
        (t.features = function () {
          return { relative: Rt() };
        }),
        t
      );
    })();
  function ln(t, e) {
    function n(t) {
      return t.toUTC(0, { keepLocalTime: !0 }).startOf("day").valueOf();
    }
    e = n(e) - n(t);
    return Math.floor(V.fromMillis(e).as("days"));
  }
  function fn(t, e, n, r) {
    var t = (function (t, e, n) {
        for (
          var r,
            i,
            o = {},
            a = t,
            u = 0,
            s = [
              [
                "years",
                function (t, e) {
                  return e.year - t.year;
                },
              ],
              [
                "quarters",
                function (t, e) {
                  return e.quarter - t.quarter + 4 * (e.year - t.year);
                },
              ],
              [
                "months",
                function (t, e) {
                  return e.month - t.month + 12 * (e.year - t.year);
                },
              ],
              [
                "weeks",
                function (t, e) {
                  t = ln(t, e);
                  return (t - (t % 7)) / 7;
                },
              ],
              ["days", ln],
            ];
          u < s.length;
          u++
        ) {
          var c = s[u],
            l = c[0],
            c = c[1];
          0 <= n.indexOf(l) &&
            ((o[(r = l)] = c(t, e)),
            e < (i = a.plus(o))
              ? (o[l]--,
                e < (t = a.plus(o)) && ((i = t), o[l]--, (t = a.plus(o))))
              : (t = i));
        }
        return [t, o, i, r];
      })(t, e, n),
      i = t[0],
      o = t[1],
      a = t[2],
      t = t[3],
      u = e - i,
      n = n.filter(function (t) {
        return 0 <= ["hours", "minutes", "seconds", "milliseconds"].indexOf(t);
      }),
      e =
        (0 === n.length &&
          (a = a < e ? i.plus((((e = {})[t] = 1), e)) : a) !== i &&
          (o[t] = (o[t] || 0) + u / (a - i)),
        V.fromObject(o, r));
    return 0 < n.length
      ? (t = V.fromMillis(u, r)).shiftTo.apply(t, n).plus(e)
      : e;
  }
  var dn = {
      arab: "[٠-٩]",
      arabext: "[۰-۹]",
      bali: "[᭐-᭙]",
      beng: "[০-৯]",
      deva: "[०-९]",
      fullwide: "[０-９]",
      gujr: "[૦-૯]",
      hanidec: "[〇|一|二|三|四|五|六|七|八|九]",
      khmr: "[០-៩]",
      knda: "[೦-೯]",
      laoo: "[໐-໙]",
      limb: "[᥆-᥏]",
      mlym: "[൦-൯]",
      mong: "[᠐-᠙]",
      mymr: "[၀-၉]",
      orya: "[୦-୯]",
      tamldec: "[௦-௯]",
      telu: "[౦-౯]",
      thai: "[๐-๙]",
      tibt: "[༠-༩]",
      latn: "\\d",
    },
    hn = {
      arab: [1632, 1641],
      arabext: [1776, 1785],
      bali: [6992, 7001],
      beng: [2534, 2543],
      deva: [2406, 2415],
      fullwide: [65296, 65303],
      gujr: [2790, 2799],
      khmr: [6112, 6121],
      knda: [3302, 3311],
      laoo: [3792, 3801],
      limb: [6470, 6479],
      mlym: [3430, 3439],
      mong: [6160, 6169],
      mymr: [4160, 4169],
      orya: [2918, 2927],
      tamldec: [3046, 3055],
      telu: [3174, 3183],
      thai: [3664, 3673],
      tibt: [3872, 3881],
    },
    mn = dn.hanidec.replace(/[\[|\]]/g, "").split("");
  function I(t, e) {
    t = t.numberingSystem;
    return void 0 === e && (e = ""), new RegExp("" + dn[t || "latn"] + e);
  }
  var yn = "missing Intl.DateTimeFormat.formatToParts support";
  function x(t, e) {
    return (
      void 0 === e &&
        (e = function (t) {
          return t;
        }),
      {
        regex: t,
        deser: function (t) {
          t = t[0];
          return e(
            (function (t) {
              var e = parseInt(t, 10);
              if (isNaN(e)) {
                for (var e = "", n = 0; n < t.length; n++) {
                  var r = t.charCodeAt(n);
                  if (-1 !== t[n].search(dn.hanidec)) e += mn.indexOf(t[n]);
                  else
                    for (var i in hn) {
                      var i = hn[i],
                        o = i[0],
                        i = i[1];
                      o <= r && r <= i && (e += r - o);
                    }
                }
                return parseInt(e, 10);
              }
              return e;
            })(t)
          );
        },
      }
    );
  }
  var vn = "[ " + String.fromCharCode(160) + "]",
    pn = new RegExp(vn, "g");
  function gn(t) {
    return t.replace(/\./g, "\\.?").replace(pn, vn);
  }
  function wn(t) {
    return t.replace(/\./g, "").replace(pn, " ").toLowerCase();
  }
  function C(n, r) {
    return null === n
      ? null
      : {
          regex: RegExp(n.map(gn).join("|")),
          deser: function (t) {
            var e = t[0];
            return (
              n.findIndex(function (t) {
                return wn(e) === wn(t);
              }) + r
            );
          },
        };
  }
  function kn(t, e) {
    return {
      regex: t,
      deser: function (t) {
        return ee(t[1], t[2]);
      },
      groups: e,
    };
  }
  function bn(t) {
    return {
      regex: t,
      deser: function (t) {
        return t[0];
      },
    };
  }
  function Tn(e, n) {
    function r(t) {
      return {
        regex: RegExp(t.val.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")),
        deser: function (t) {
          return t[0];
        },
        literal: !0,
      };
    }
    var i = I(n),
      o = I(n, "{2}"),
      a = I(n, "{3}"),
      u = I(n, "{4}"),
      s = I(n, "{6}"),
      c = I(n, "{1,2}"),
      l = I(n, "{1,3}"),
      f = I(n, "{1,6}"),
      d = I(n, "{1,9}"),
      h = I(n, "{2,4}"),
      m = I(n, "{4,6}"),
      t = (function (t) {
        if (e.literal) return r(t);
        switch (t.val) {
          case "G":
            return C(n.eras("short"), 0);
          case "GG":
            return C(n.eras("long"), 0);
          case "y":
            return x(f);
          case "yy":
            return x(h, Xt);
          case "yyyy":
            return x(u);
          case "yyyyy":
            return x(m);
          case "yyyyyy":
            return x(s);
          case "M":
            return x(c);
          case "MM":
            return x(o);
          case "MMM":
            return C(n.months("short", !0), 1);
          case "MMMM":
            return C(n.months("long", !0), 1);
          case "L":
            return x(c);
          case "LL":
            return x(o);
          case "LLL":
            return C(n.months("short", !1), 1);
          case "LLLL":
            return C(n.months("long", !1), 1);
          case "d":
            return x(c);
          case "dd":
            return x(o);
          case "o":
            return x(l);
          case "ooo":
            return x(a);
          case "HH":
            return x(o);
          case "H":
            return x(c);
          case "hh":
            return x(o);
          case "h":
            return x(c);
          case "mm":
            return x(o);
          case "m":
          case "q":
            return x(c);
          case "qq":
            return x(o);
          case "s":
            return x(c);
          case "ss":
            return x(o);
          case "S":
            return x(l);
          case "SSS":
            return x(a);
          case "u":
            return bn(d);
          case "uu":
            return bn(c);
          case "uuu":
            return x(i);
          case "a":
            return C(n.meridiems(), 0);
          case "kkkk":
            return x(u);
          case "kk":
            return x(h, Xt);
          case "W":
            return x(c);
          case "WW":
            return x(o);
          case "E":
          case "c":
            return x(i);
          case "EEE":
            return C(n.weekdays("short", !1), 1);
          case "EEEE":
            return C(n.weekdays("long", !1), 1);
          case "ccc":
            return C(n.weekdays("short", !0), 1);
          case "cccc":
            return C(n.weekdays("long", !0), 1);
          case "Z":
          case "ZZ":
            return kn(
              new RegExp("([+-]" + c.source + ")(?::(" + o.source + "))?"),
              2
            );
          case "ZZZ":
            return kn(
              new RegExp("([+-]" + c.source + ")(" + o.source + ")?"),
              2
            );
          case "z":
            return bn(/[a-z_+-/]{1,256}?/i);
          case " ":
            return bn(/[^\S\n\r]/);
          default:
            return r(t);
        }
      })(e) || { invalidReason: yn };
    return (t.token = e), t;
  }
  var On = {
    year: { "2-digit": "yy", numeric: "yyyyy" },
    month: { numeric: "M", "2-digit": "MM", short: "MMM", long: "MMMM" },
    day: { numeric: "d", "2-digit": "dd" },
    weekday: { short: "EEE", long: "EEEE" },
    dayperiod: "a",
    dayPeriod: "a",
    hour12: { numeric: "h", "2-digit": "hh" },
    hour24: { numeric: "H", "2-digit": "HH" },
    minute: { numeric: "m", "2-digit": "mm" },
    second: { numeric: "s", "2-digit": "ss" },
    timeZoneName: { long: "ZZZZZ", short: "ZZZ" },
  };
  var Sn = null;
  function Nn(t, n) {
    var e;
    return (e = Array.prototype).concat.apply(
      e,
      t.map(function (t) {
        return (
          (e = n),
          (t = t).literal ||
          null == (e = Dn(O.macroTokenToFormatOpts(t.val), e)) ||
          e.includes(void 0)
            ? t
            : e
        );
        var e;
      })
    );
  }
  function Mn(e, t, n) {
    var n = Nn(O.parseFormat(n), e),
      r = n.map(function (t) {
        return Tn(t, e);
      }),
      i = r.find(function (t) {
        return t.invalidReason;
      });
    if (i) return { input: t, tokens: n, invalidReason: i.invalidReason };
    var o,
      r = [
        "^" +
          (i = r)
            .map(function (t) {
              return t.regex;
            })
            .reduce(function (t, e) {
              return t + "(" + e.source + ")";
            }, "") +
          "$",
        i,
      ],
      i = r[1],
      r = RegExp(r[0], "i"),
      i = (function (t, e, n) {
        var r = t.match(e);
        if (r) {
          var i,
            o,
            a,
            u = {},
            s = 1;
          for (i in n)
            h(n, i) &&
              ((a = (o = n[i]).groups ? o.groups + 1 : 1),
              !o.literal &&
                o.token &&
                (u[o.token.val[0]] = o.deser(r.slice(s, s + a))),
              (s += a));
          return [r, u];
        }
        return [r, {}];
      })(t, r, i),
      a = i[0],
      i = i[1],
      u = i
        ? ((u = null),
          b((o = i).z) || (u = f.create(o.z)),
          b(o.Z) || ((u = u || new d(o.Z)), (s = o.Z)),
          b(o.q) || (o.M = 3 * (o.q - 1) + 1),
          b(o.h) ||
            (o.h < 12 && 1 === o.a
              ? (o.h += 12)
              : 12 === o.h && 0 === o.a && (o.h = 0)),
          0 === o.G && o.y && (o.y = -o.y),
          b(o.u) || (o.S = Jt(o.u)),
          [
            Object.keys(o).reduce(function (t, e) {
              var n = (function (t) {
                switch (t) {
                  case "S":
                    return "millisecond";
                  case "s":
                    return "second";
                  case "m":
                    return "minute";
                  case "h":
                  case "H":
                    return "hour";
                  case "d":
                    return "day";
                  case "o":
                    return "ordinal";
                  case "L":
                  case "M":
                    return "month";
                  case "y":
                    return "year";
                  case "E":
                  case "c":
                    return "weekday";
                  case "W":
                    return "weekNumber";
                  case "k":
                    return "weekYear";
                  case "q":
                    return "quarter";
                  default:
                    return null;
                }
              })(e);
              return n && (t[n] = o[e]), t;
            }, {}),
            u,
            s,
          ])
        : [null, null, void 0],
      s = u[0],
      c = u[1],
      l = u[2];
    if (h(i, "a") && h(i, "H"))
      throw new Y("Can't include meridiem when specifying 24-hour format");
    return {
      input: t,
      tokens: n,
      regex: r,
      rawMatches: a,
      matches: i,
      result: s,
      zone: c,
      specificOffset: l,
    };
  }
  function Dn(o, t) {
    var e, a;
    return o
      ? ((e = (t = O.create(t, o).dtFormatter(
          (Sn = Sn || L.fromMillis(1555555555555))
        )).formatToParts()),
        (a = t.resolvedOptions()),
        e.map(function (t) {
          return (
            (e = o),
            (n = a),
            (i = (t = t).type),
            (t = t.value),
            "literal" === i
              ? { literal: !(r = /^\s+$/.test(t)), val: r ? " " : t }
              : ((r = e[i]),
                "hour" === (t = i) &&
                  (t =
                    null != e.hour12
                      ? e.hour12
                        ? "hour12"
                        : "hour24"
                      : null != e.hourCycle
                      ? "h11" === e.hourCycle || "h12" === e.hourCycle
                        ? "hour12"
                        : "hour24"
                      : n.hour12
                      ? "hour12"
                      : "hour24"),
                (i = "object" == typeof (i = On[t]) ? i[r] : i)
                  ? { literal: !1, val: i }
                  : void 0)
          );
          var e, n, r, i;
        }))
      : null;
  }
  var En = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
    Vn = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
  function Z(t, e) {
    return new S(
      "unit out of range",
      "you specified " +
        e +
        " (of type " +
        typeof e +
        ") as a " +
        t +
        ", which is invalid"
    );
  }
  function In(t, e, n) {
    (e = new Date(Date.UTC(t, e - 1, n))),
      t < 100 && 0 <= t && e.setUTCFullYear(e.getUTCFullYear() - 1900),
      (n = e.getUTCDay());
    return 0 === n ? 7 : n;
  }
  function xn(t, e, n) {
    return n + (Gt(t) ? Vn : En)[e - 1];
  }
  function Cn(t, e) {
    var t = Gt(t) ? Vn : En,
      n = t.findIndex(function (t) {
        return t < e;
      });
    return { month: n + 1, day: e - t[n] };
  }
  function Zn(t) {
    var e,
      n = t.year,
      r = t.month,
      i = t.day,
      o = xn(n, r, i),
      r = In(n, r, i),
      i = Math.floor((o - r + 10) / 7);
    return (
      i < 1
        ? (i = Kt((e = n - 1)))
        : i > Kt(n)
        ? ((e = n + 1), (i = 1))
        : (e = n),
      s({ weekYear: e, weekNumber: i, weekday: r }, oe(t))
    );
  }
  function Fn(t) {
    var e,
      n = t.weekYear,
      r = t.weekNumber,
      i = t.weekday,
      o = In(n, 1, 4),
      a = $t(n),
      r = 7 * r + i - o - 3,
      i =
        (r < 1
          ? (r += $t((e = n - 1)))
          : a < r
          ? ((e = n + 1), (r -= $t(n)))
          : (e = n),
        Cn(e, r));
    return s({ year: e, month: i.month, day: i.day }, oe(t));
  }
  function Ln(t) {
    var e = t.year;
    return s({ year: e, ordinal: xn(e, t.month, t.day) }, oe(t));
  }
  function zn(t) {
    var e = t.year,
      n = Cn(e, t.ordinal);
    return s({ year: e, month: n.month, day: n.day }, oe(t));
  }
  function jn(t) {
    var e = Ht(t.year),
      n = T(t.month, 1, 12),
      r = T(t.day, 1, Bt(t.year, t.month));
    return e
      ? n
        ? !r && Z("day", t.day)
        : Z("month", t.month)
      : Z("year", t.year);
  }
  function An(t) {
    var e = t.hour,
      n = t.minute,
      r = t.second,
      t = t.millisecond,
      i = T(e, 0, 23) || (24 === e && 0 === n && 0 === r && 0 === t),
      o = T(n, 0, 59),
      a = T(r, 0, 59),
      u = T(t, 0, 999);
    return i
      ? o
        ? a
          ? !u && Z("millisecond", t)
          : Z("second", r)
        : Z("minute", n)
      : Z("hour", e);
  }
  var qn = "Invalid DateTime";
  function _n(t) {
    return new S(
      "unsupported zone",
      'the zone "' + t.name + '" is not supported'
    );
  }
  function Un(t) {
    return null === t.weekData && (t.weekData = Zn(t.c)), t.weekData;
  }
  function F(t, e) {
    t = {
      ts: t.ts,
      zone: t.zone,
      c: t.c,
      o: t.o,
      loc: t.loc,
      invalid: t.invalid,
    };
    return new L(s({}, t, e, { old: t }));
  }
  function Pn(t, e, n) {
    var r = t - 60 * e * 1e3,
      i = n.offset(r);
    return e === i
      ? [r, e]
      : i === (n = n.offset((r -= 60 * (i - e) * 1e3)))
      ? [r, i]
      : [t - 60 * Math.min(i, n) * 1e3, Math.max(i, n)];
  }
  function Hn(t, e) {
    t += 60 * e * 1e3;
    e = new Date(t);
    return {
      year: e.getUTCFullYear(),
      month: e.getUTCMonth() + 1,
      day: e.getUTCDate(),
      hour: e.getUTCHours(),
      minute: e.getUTCMinutes(),
      second: e.getUTCSeconds(),
      millisecond: e.getUTCMilliseconds(),
    };
  }
  function Rn(t, e, n) {
    return Pn(Qt(t), e, n);
  }
  function Wn(t, e) {
    var n = t.o,
      r = t.c.year + Math.trunc(e.years),
      i = t.c.month + Math.trunc(e.months) + 3 * Math.trunc(e.quarters),
      r = s({}, t.c, {
        year: r,
        month: i,
        day:
          Math.min(t.c.day, Bt(r, i)) +
          Math.trunc(e.days) +
          7 * Math.trunc(e.weeks),
      }),
      i = V.fromObject({
        years: e.years - Math.trunc(e.years),
        quarters: e.quarters - Math.trunc(e.quarters),
        months: e.months - Math.trunc(e.months),
        weeks: e.weeks - Math.trunc(e.weeks),
        days: e.days - Math.trunc(e.days),
        hours: e.hours,
        minutes: e.minutes,
        seconds: e.seconds,
        milliseconds: e.milliseconds,
      }).as("milliseconds"),
      e = Pn(Qt(r), n, t.zone),
      r = e[0],
      n = e[1];
    return 0 !== i && (n = t.zone.offset((r += i))), { ts: r, o: n };
  }
  function Jn(t, e, n, r, i, o) {
    var a = n.setZone,
      u = n.zone;
    return (t && 0 !== Object.keys(t).length) || e
      ? ((t = L.fromObject(t, s({}, n, { zone: e || u, specificOffset: o }))),
        a ? t : t.setZone(u))
      : L.invalid(
          new S("unparsable", 'the input "' + i + "\" can't be parsed as " + r)
        );
  }
  function Yn(t, e, n) {
    return (
      void 0 === n && (n = !0),
      t.isValid
        ? O.create(g.create("en-US"), {
            allowZ: n,
            forceSimple: !0,
          }).formatDateTimeFromString(t, e)
        : null
    );
  }
  function Gn(t, e) {
    var n = 9999 < t.c.year || t.c.year < 0,
      r = "";
    return (
      n && 0 <= t.c.year && (r += "+"),
      (r += l(t.c.year, n ? 6 : 4)),
      (r = e
        ? (r = (r += "-") + l(t.c.month) + "-") + l(t.c.day)
        : (r += l(t.c.month)) + l(t.c.day))
    );
  }
  function $n(t, e, n, r, i, o) {
    var a = l(t.c.hour);
    return (
      e
        ? ((a = (a += ":") + l(t.c.minute)),
          (0 === t.c.millisecond && 0 === t.c.second && n) || (a += ":"))
        : (a += l(t.c.minute)),
      (0 === t.c.millisecond && 0 === t.c.second && n) ||
        ((a += l(t.c.second)), 0 === t.c.millisecond && r) ||
        (a = (a += ".") + l(t.c.millisecond, 3)),
      i &&
        (t.isOffsetFixed && 0 === t.offset && !o
          ? (a += "Z")
          : (a =
              t.o < 0
                ? (a = (a += "-") + l(Math.trunc(-t.o / 60)) + ":") +
                  l(Math.trunc(-t.o % 60))
                : (a = (a += "+") + l(Math.trunc(t.o / 60)) + ":") +
                  l(Math.trunc(t.o % 60)))),
      o && (a += "[" + t.zone.ianaName + "]"),
      a
    );
  }
  var Bn = { month: 1, day: 1, hour: 0, minute: 0, second: 0, millisecond: 0 },
    Qn = {
      weekNumber: 1,
      weekday: 1,
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0,
    },
    Kn = { ordinal: 1, hour: 0, minute: 0, second: 0, millisecond: 0 },
    Xn = ["year", "month", "day", "hour", "minute", "second", "millisecond"],
    tr = [
      "weekYear",
      "weekNumber",
      "weekday",
      "hour",
      "minute",
      "second",
      "millisecond",
    ],
    er = ["year", "ordinal", "hour", "minute", "second", "millisecond"];
  function nr(t) {
    var e = {
      year: "year",
      years: "year",
      month: "month",
      months: "month",
      day: "day",
      days: "day",
      hour: "hour",
      hours: "hour",
      minute: "minute",
      minutes: "minute",
      quarter: "quarter",
      quarters: "quarter",
      second: "second",
      seconds: "second",
      millisecond: "millisecond",
      milliseconds: "millisecond",
      weekday: "weekday",
      weekdays: "weekday",
      weeknumber: "weekNumber",
      weeksnumber: "weekNumber",
      weeknumbers: "weekNumber",
      weekyear: "weekYear",
      weekyears: "weekYear",
      ordinal: "ordinal",
    }[t.toLowerCase()];
    if (e) return e;
    throw new G(t);
  }
  function rr(t, e) {
    var n = w(e.zone, k.defaultZone),
      e = g.fromObject(e),
      r = k.now();
    if (b(t.year)) s = r;
    else {
      for (var i = 0, o = Xn; i < o.length; i++) {
        var a = o[i];
        b(t[a]) && (t[a] = Bn[a]);
      }
      var u = jn(t) || An(t);
      if (u) return L.invalid(u);
      var u = Rn(t, n.offset(r), n),
        s = u[0],
        u = u[1];
    }
    return new L({ ts: s, zone: n, loc: e, o: u });
  }
  function ir(e, n, r) {
    function t(t, e) {
      return (
        (t = Yt(t, o || r.calendary ? 0 : 2, !0)),
        n.loc.clone(r).relFormatter(r).format(t, e)
      );
    }
    function i(t) {
      return r.calendary
        ? n.hasSame(e, t)
          ? 0
          : n.startOf(t).diff(e.startOf(t), t).get(t)
        : n.diff(e, t).get(t);
    }
    var o = !!b(r.round) || r.round;
    if (r.unit) return t(i(r.unit), r.unit);
    for (var a = H(r.units); !(u = a()).done; ) {
      var u = u.value,
        s = i(u);
      if (1 <= Math.abs(s)) return t(s, u);
    }
    return t(n < e ? -0 : 0, r.units[r.units.length - 1]);
  }
  function or(t) {
    var e = {},
      t =
        0 < t.length && "object" == typeof t[t.length - 1]
          ? ((e = t[t.length - 1]), Array.from(t).slice(0, t.length - 1))
          : Array.from(t);
    return [e, t];
  }
  var L = (function () {
    function p(t) {
      var e,
        n = t.zone || k.defaultZone,
        r =
          t.invalid ||
          (Number.isNaN(t.ts) ? new S("invalid input") : null) ||
          (n.isValid ? null : _n(n)),
        i = ((this.ts = b(t.ts) ? k.now() : t.ts), null),
        o = null;
      r ||
        (o =
          t.old && t.old.ts === this.ts && t.old.zone.equals(n)
            ? ((i = (e = [t.old.c, t.old.o])[0]), e[1])
            : ((e = n.offset(this.ts)),
              (i = Hn(this.ts, e)),
              (i = (r = Number.isNaN(i.year) ? new S("invalid input") : null)
                ? null
                : i),
              r ? null : e)),
        (this._zone = n),
        (this.loc = t.loc || g.create()),
        (this.invalid = r),
        (this.weekData = null),
        (this.c = i),
        (this.o = o),
        (this.isLuxonDateTime = !0);
    }
    (p.now = function () {
      return new p({});
    }),
      (p.local = function () {
        var t = or(arguments),
          e = t[0],
          t = t[1];
        return rr(
          {
            year: t[0],
            month: t[1],
            day: t[2],
            hour: t[3],
            minute: t[4],
            second: t[5],
            millisecond: t[6],
          },
          e
        );
      }),
      (p.utc = function () {
        var t = or(arguments),
          e = t[0],
          t = t[1],
          n = t[0],
          r = t[1],
          i = t[2],
          o = t[3],
          a = t[4],
          u = t[5],
          t = t[6];
        return (
          (e.zone = d.utcInstance),
          rr(
            {
              year: n,
              month: r,
              day: i,
              hour: o,
              minute: a,
              second: u,
              millisecond: t,
            },
            e
          )
        );
      }),
      (p.fromJSDate = function (t, e) {
        void 0 === e && (e = {});
        var n,
          t =
            "[object Date]" === Object.prototype.toString.call(t)
              ? t.valueOf()
              : NaN;
        return Number.isNaN(t)
          ? p.invalid("invalid input")
          : (n = w(e.zone, k.defaultZone)).isValid
          ? new p({ ts: t, zone: n, loc: g.fromObject(e) })
          : p.invalid(_n(n));
      }),
      (p.fromMillis = function (t, e) {
        if ((void 0 === e && (e = {}), y(t)))
          return t < -864e13 || 864e13 < t
            ? p.invalid("Timestamp out of range")
            : new p({
                ts: t,
                zone: w(e.zone, k.defaultZone),
                loc: g.fromObject(e),
              });
        throw new u(
          "fromMillis requires a numerical input, but received a " +
            typeof t +
            " with value " +
            t
        );
      }),
      (p.fromSeconds = function (t, e) {
        if ((void 0 === e && (e = {}), y(t)))
          return new p({
            ts: 1e3 * t,
            zone: w(e.zone, k.defaultZone),
            loc: g.fromObject(e),
          });
        throw new u("fromSeconds requires a numerical input");
      }),
      (p.fromObject = function (t, e) {
        t = t || {};
        var n = w((e = void 0 === e ? {} : e).zone, k.defaultZone);
        if (!n.isValid) return p.invalid(_n(n));
        var r = k.now(),
          i = b(e.specificOffset) ? n.offset(r) : e.specificOffset,
          o = re(t, nr),
          a = !b(o.ordinal),
          u = !b(o.year),
          s = !b(o.month) || !b(o.day),
          u = u || s,
          c = o.weekYear || o.weekNumber,
          e = g.fromObject(e);
        if ((u || a) && c)
          throw new Y(
            "Can't mix weekYear/weekNumber units with year/month/day or ordinals"
          );
        if (s && a) throw new Y("Can't mix ordinal dates with month/day");
        for (
          var l,
            s = c || (o.weekday && !u),
            f = Hn(r, i),
            d =
              (s
                ? ((v = tr), (l = Qn), (f = Zn(f)))
                : a
                ? ((v = er), (l = Kn), (f = Ln(f)))
                : ((v = Xn), (l = Bn)),
              !1),
            h = H(v);
          !(m = h()).done;

        ) {
          var m = m.value;
          b(o[m]) ? (o[m] = (d ? l : f)[m]) : (d = !0);
        }
        var y,
          v,
          c =
            (s
              ? ((r = Ht((c = o).weekYear)),
                (v = T(c.weekNumber, 1, Kt(c.weekYear))),
                (y = T(c.weekday, 1, 7)),
                r
                  ? v
                    ? !y && Z("weekday", c.weekday)
                    : Z("week", c.week)
                  : Z("weekYear", c.weekYear))
              : a
              ? ((v = Ht((r = o).year)),
                (y = T(r.ordinal, 1, $t(r.year))),
                v ? !y && Z("ordinal", r.ordinal) : Z("year", r.year))
              : jn(o)) || An(o);
        return c
          ? p.invalid(c)
          : ((r = new p({
              ts: (v = Rn(s ? Fn(o) : a ? zn(o) : o, i, n))[0],
              zone: n,
              o: v[1],
              loc: e,
            })),
            o.weekday && u && t.weekday !== r.weekday
              ? p.invalid(
                  "mismatched weekday",
                  "you can't specify both a weekday of " +
                    o.weekday +
                    " and a date of " +
                    r.toISO()
                )
              : r);
      }),
      (p.fromISO = function (t, e) {
        void 0 === e && (e = {});
        var n = be(t, [Pe, Je], [He, Ye], [Re, Ge], [We, $e]);
        return Jn(n[0], n[1], e, "ISO 8601", t);
      }),
      (p.fromRFC2822 = function (t, e) {
        void 0 === e && (e = {});
        var n = be(
          t
            .replace(/\([^()]*\)|[\n\t]/g, " ")
            .replace(/(\s\s+)/g, " ")
            .trim(),
          [Le, ze]
        );
        return Jn(n[0], n[1], e, "RFC 2822", t);
      }),
      (p.fromHTTP = function (t, e) {
        void 0 === e && (e = {});
        t = be(t, [je, _e], [Ae, _e], [qe, Ue]);
        return Jn(t[0], t[1], e, "HTTP", e);
      }),
      (p.fromFormat = function (t, e, n) {
        if ((void 0 === n && (n = {}), b(t) || b(e)))
          throw new u("fromFormat requires an input string and a format");
        var r = n,
          i = r.locale,
          r = r.numberingSystem,
          i = g.fromOpts({
            locale: void 0 === i ? null : i,
            numberingSystem: void 0 === r ? null : r,
            defaultToEN: !0,
          }),
          i = [
            (r = Mn((r = i), t, e)).result,
            r.zone,
            r.specificOffset,
            r.invalidReason,
          ],
          r = i[0],
          o = i[1],
          a = i[2],
          i = i[3];
        return i ? p.invalid(i) : Jn(r, o, n, "format " + e, t, a);
      }),
      (p.fromString = function (t, e, n) {
        return p.fromFormat(t, e, (n = void 0 === n ? {} : n));
      }),
      (p.fromSQL = function (t, e) {
        void 0 === e && (e = {});
        var n = be(t, [Qe, Je], [Ke, Xe]);
        return Jn(n[0], n[1], e, "SQL", t);
      }),
      (p.invalid = function (t, e) {
        if ((void 0 === e && (e = null), !t))
          throw new u("need to specify a reason the DateTime is invalid");
        t = t instanceof S ? t : new S(t, e);
        if (k.throwOnInvalid) throw new R(t);
        return new p({ invalid: t });
      }),
      (p.isDateTime = function (t) {
        return (t && t.isLuxonDateTime) || !1;
      }),
      (p.parseFormatForOpts = function (t, e) {
        t = Dn(t, g.fromObject((e = void 0 === e ? {} : e)));
        return t
          ? t
              .map(function (t) {
                return t ? t.val : null;
              })
              .join("")
          : null;
      }),
      (p.expandFormat = function (t, e) {
        return (
          void 0 === e && (e = {}),
          Nn(O.parseFormat(t), g.fromObject(e))
            .map(function (t) {
              return t.val;
            })
            .join("")
        );
      });
    var t = p.prototype;
    return (
      (t.get = function (t) {
        return this[t];
      }),
      (t.getPossibleOffsets = function () {
        var t, e, n, r;
        return this.isValid &&
          !this.isOffsetFixed &&
          ((t = Qt(this.c)),
          (n = this.zone.offset(t - 864e5)),
          (r = this.zone.offset(t + 864e5)),
          (n = this.zone.offset(t - 6e4 * n)) !==
            (r = this.zone.offset(t - 6e4 * r))) &&
          ((e = t - 6e4 * r),
          (n = Hn((t = t - 6e4 * n), n)),
          (r = Hn(e, r)),
          n.hour === r.hour) &&
          n.minute === r.minute &&
          n.second === r.second &&
          n.millisecond === r.millisecond
          ? [F(this, { ts: t }), F(this, { ts: e })]
          : [this];
      }),
      (t.resolvedLocaleOptions = function (t) {
        t = O.create(
          this.loc.clone((t = void 0 === t ? {} : t)),
          t
        ).resolvedOptions(this);
        return {
          locale: t.locale,
          numberingSystem: t.numberingSystem,
          outputCalendar: t.calendar,
        };
      }),
      (t.toUTC = function (t, e) {
        return (
          void 0 === e && (e = {}),
          this.setZone(d.instance((t = void 0 === t ? 0 : t)), e)
        );
      }),
      (t.toLocal = function () {
        return this.setZone(k.defaultZone);
      }),
      (t.setZone = function (t, e) {
        var n,
          e = void 0 === e ? {} : e,
          r = e.keepLocalTime,
          r = void 0 !== r && r,
          e = e.keepCalendarTime,
          e = void 0 !== e && e;
        return (t = w(t, k.defaultZone)).equals(this.zone)
          ? this
          : t.isValid
          ? ((n = this.ts),
            (r || e) &&
              ((r = t.offset(this.ts)), (n = Rn(this.toObject(), r, t)[0])),
            F(this, { ts: n, zone: t }))
          : p.invalid(_n(t));
      }),
      (t.reconfigure = function (t) {
        var t = void 0 === t ? {} : t,
          e = t.locale,
          n = t.numberingSystem,
          t = t.outputCalendar,
          e = this.loc.clone({
            locale: e,
            numberingSystem: n,
            outputCalendar: t,
          });
        return F(this, { loc: e });
      }),
      (t.setLocale = function (t) {
        return this.reconfigure({ locale: t });
      }),
      (t.set = function (t) {
        if (!this.isValid) return this;
        var e,
          t = re(t, nr),
          n = !b(t.weekYear) || !b(t.weekNumber) || !b(t.weekday),
          r = !b(t.ordinal),
          i = !b(t.year),
          o = !b(t.month) || !b(t.day),
          a = t.weekYear || t.weekNumber;
        if ((i || o || r) && a)
          throw new Y(
            "Can't mix weekYear/weekNumber units with year/month/day or ordinals"
          );
        if (o && r) throw new Y("Can't mix ordinal dates with month/day");
        n
          ? (e = Fn(s({}, Zn(this.c), t)))
          : b(t.ordinal)
          ? ((e = s({}, this.toObject(), t)),
            b(t.day) && (e.day = Math.min(Bt(e.year, e.month), e.day)))
          : (e = zn(s({}, Ln(this.c), t)));
        i = Rn(e, this.o, this.zone);
        return F(this, { ts: i[0], o: i[1] });
      }),
      (t.plus = function (t) {
        return this.isValid ? F(this, Wn(this, V.fromDurationLike(t))) : this;
      }),
      (t.minus = function (t) {
        return this.isValid
          ? F(this, Wn(this, V.fromDurationLike(t).negate()))
          : this;
      }),
      (t.startOf = function (t) {
        if (!this.isValid) return this;
        var e = {},
          t = V.normalizeUnit(t);
        switch (t) {
          case "years":
            e.month = 1;
          case "quarters":
          case "months":
            e.day = 1;
          case "weeks":
          case "days":
            e.hour = 0;
          case "hours":
            e.minute = 0;
          case "minutes":
            e.second = 0;
          case "seconds":
            e.millisecond = 0;
        }
        return (
          "weeks" === t && (e.weekday = 1),
          "quarters" === t &&
            ((t = Math.ceil(this.month / 3)), (e.month = 3 * (t - 1) + 1)),
          this.set(e)
        );
      }),
      (t.endOf = function (t) {
        var e;
        return this.isValid
          ? this.plus((((e = {})[t] = 1), e))
              .startOf(t)
              .minus(1)
          : this;
      }),
      (t.toFormat = function (t, e) {
        return (
          void 0 === e && (e = {}),
          this.isValid
            ? O.create(this.loc.redefaultToEN(e)).formatDateTimeFromString(
                this,
                t
              )
            : qn
        );
      }),
      (t.toLocaleString = function (t, e) {
        return (
          void 0 === t && (t = $),
          void 0 === e && (e = {}),
          this.isValid
            ? O.create(this.loc.clone(e), t).formatDateTime(this)
            : qn
        );
      }),
      (t.toLocaleParts = function (t) {
        return (
          void 0 === t && (t = {}),
          this.isValid
            ? O.create(this.loc.clone(t), t).formatDateTimeParts(this)
            : []
        );
      }),
      (t.toISO = function (t) {
        var e,
          t = void 0 === t ? {} : t,
          n = t.format,
          r = t.suppressSeconds,
          r = void 0 !== r && r,
          i = t.suppressMilliseconds,
          i = void 0 !== i && i,
          o = t.includeOffset,
          o = void 0 === o || o,
          t = t.extendedZone,
          t = void 0 !== t && t;
        return this.isValid
          ? ((e = Gn(
              this,
              (n = "extended" === (void 0 === n ? "extended" : n))
            )),
            (e += "T") + $n(this, n, r, i, o, t))
          : null;
      }),
      (t.toISODate = function (t) {
        t = (void 0 === t ? {} : t).format;
        return this.isValid
          ? Gn(this, "extended" === (void 0 === t ? "extended" : t))
          : null;
      }),
      (t.toISOWeekDate = function () {
        return Yn(this, "kkkk-'W'WW-c");
      }),
      (t.toISOTime = function (t) {
        var t = void 0 === t ? {} : t,
          e = t.suppressMilliseconds,
          n = t.suppressSeconds,
          r = t.includeOffset,
          i = t.includePrefix,
          o = t.extendedZone,
          t = t.format;
        return this.isValid
          ? (void 0 !== i && i ? "T" : "") +
              $n(
                this,
                "extended" === (void 0 === t ? "extended" : t),
                void 0 !== n && n,
                void 0 !== e && e,
                void 0 === r || r,
                void 0 !== o && o
              )
          : null;
      }),
      (t.toRFC2822 = function () {
        return Yn(this, "EEE, dd LLL yyyy HH:mm:ss ZZZ", !1);
      }),
      (t.toHTTP = function () {
        return Yn(this.toUTC(), "EEE, dd LLL yyyy HH:mm:ss 'GMT'");
      }),
      (t.toSQLDate = function () {
        return this.isValid ? Gn(this, !0) : null;
      }),
      (t.toSQLTime = function (t) {
        var t = void 0 === t ? {} : t,
          e = t.includeOffset,
          e = void 0 === e || e,
          n = t.includeZone,
          n = void 0 !== n && n,
          t = t.includeOffsetSpace,
          r = "HH:mm:ss.SSS";
        return (
          (n || e) &&
            ((void 0 === t || t) && (r += " "),
            n ? (r += "z") : e && (r += "ZZ")),
          Yn(this, r, !0)
        );
      }),
      (t.toSQL = function (t) {
        return (
          void 0 === t && (t = {}),
          this.isValid ? this.toSQLDate() + " " + this.toSQLTime(t) : null
        );
      }),
      (t.toString = function () {
        return this.isValid ? this.toISO() : qn;
      }),
      (t.valueOf = function () {
        return this.toMillis();
      }),
      (t.toMillis = function () {
        return this.isValid ? this.ts : NaN;
      }),
      (t.toSeconds = function () {
        return this.isValid ? this.ts / 1e3 : NaN;
      }),
      (t.toUnixInteger = function () {
        return this.isValid ? Math.floor(this.ts / 1e3) : NaN;
      }),
      (t.toJSON = function () {
        return this.toISO();
      }),
      (t.toBSON = function () {
        return this.toJSDate();
      }),
      (t.toObject = function (t) {
        var e;
        return (
          void 0 === t && (t = {}),
          this.isValid
            ? ((e = s({}, this.c)),
              t.includeConfig &&
                ((e.outputCalendar = this.outputCalendar),
                (e.numberingSystem = this.loc.numberingSystem),
                (e.locale = this.loc.locale)),
              e)
            : {}
        );
      }),
      (t.toJSDate = function () {
        return new Date(this.isValid ? this.ts : NaN);
      }),
      (t.diff = function (t, e, n) {
        var r;
        return (
          void 0 === e && (e = "milliseconds"),
          void 0 === n && (n = {}),
          this.isValid && t.isValid
            ? ((n = s(
                { locale: this.locale, numberingSystem: this.numberingSystem },
                n
              )),
              (e = e),
              (e = (Array.isArray(e) ? e : [e]).map(V.normalizeUnit)),
              (t = fn(
                (r = t.valueOf() > this.valueOf()) ? this : t,
                r ? t : this,
                e,
                n
              )),
              r ? t.negate() : t)
            : V.invalid("created by diffing an invalid DateTime")
        );
      }),
      (t.diffNow = function (t, e) {
        return (
          void 0 === t && (t = "milliseconds"),
          void 0 === e && (e = {}),
          this.diff(p.now(), t, e)
        );
      }),
      (t.until = function (t) {
        return this.isValid ? sn.fromDateTimes(this, t) : this;
      }),
      (t.hasSame = function (t, e) {
        var n;
        return (
          !!this.isValid &&
          ((n = t.valueOf()),
          (t = this.setZone(t.zone, { keepLocalTime: !0 })).startOf(e) <= n) &&
          n <= t.endOf(e)
        );
      }),
      (t.equals = function (t) {
        return (
          this.isValid &&
          t.isValid &&
          this.valueOf() === t.valueOf() &&
          this.zone.equals(t.zone) &&
          this.loc.equals(t.loc)
        );
      }),
      (t.toRelative = function (t) {
        var e, n, r, i;
        return this.isValid
          ? ((e =
              (t = void 0 === t ? {} : t).base ||
              p.fromObject({}, { zone: this.zone })),
            (n = t.padding ? (this < e ? -t.padding : t.padding) : 0),
            (r = ["years", "months", "days", "hours", "minutes", "seconds"]),
            (i = t.unit),
            Array.isArray(t.unit) && ((r = t.unit), (i = void 0)),
            ir(
              e,
              this.plus(n),
              s({}, t, { numeric: "always", units: r, unit: i })
            ))
          : null;
      }),
      (t.toRelativeCalendar = function (t) {
        return (
          void 0 === t && (t = {}),
          this.isValid
            ? ir(
                t.base || p.fromObject({}, { zone: this.zone }),
                this,
                s({}, t, {
                  numeric: "auto",
                  units: ["years", "months", "days"],
                  calendary: !0,
                })
              )
            : null
        );
      }),
      (p.min = function () {
        for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
          e[n] = arguments[n];
        if (e.every(p.isDateTime))
          return Wt(
            e,
            function (t) {
              return t.valueOf();
            },
            Math.min
          );
        throw new u("min requires all arguments be DateTimes");
      }),
      (p.max = function () {
        for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
          e[n] = arguments[n];
        if (e.every(p.isDateTime))
          return Wt(
            e,
            function (t) {
              return t.valueOf();
            },
            Math.max
          );
        throw new u("max requires all arguments be DateTimes");
      }),
      (p.fromFormatExplain = function (t, e, n) {
        var n = (n = void 0 === n ? {} : n),
          r = n.locale,
          n = n.numberingSystem;
        return Mn(
          g.fromOpts({
            locale: void 0 === r ? null : r,
            numberingSystem: void 0 === n ? null : n,
            defaultToEN: !0,
          }),
          t,
          e
        );
      }),
      (p.fromStringExplain = function (t, e, n) {
        return p.fromFormatExplain(t, e, (n = void 0 === n ? {} : n));
      }),
      o(
        p,
        [
          {
            key: "isValid",
            get: function () {
              return null === this.invalid;
            },
          },
          {
            key: "invalidReason",
            get: function () {
              return this.invalid ? this.invalid.reason : null;
            },
          },
          {
            key: "invalidExplanation",
            get: function () {
              return this.invalid ? this.invalid.explanation : null;
            },
          },
          {
            key: "locale",
            get: function () {
              return this.isValid ? this.loc.locale : null;
            },
          },
          {
            key: "numberingSystem",
            get: function () {
              return this.isValid ? this.loc.numberingSystem : null;
            },
          },
          {
            key: "outputCalendar",
            get: function () {
              return this.isValid ? this.loc.outputCalendar : null;
            },
          },
          {
            key: "zone",
            get: function () {
              return this._zone;
            },
          },
          {
            key: "zoneName",
            get: function () {
              return this.isValid ? this.zone.name : null;
            },
          },
          {
            key: "year",
            get: function () {
              return this.isValid ? this.c.year : NaN;
            },
          },
          {
            key: "quarter",
            get: function () {
              return this.isValid ? Math.ceil(this.c.month / 3) : NaN;
            },
          },
          {
            key: "month",
            get: function () {
              return this.isValid ? this.c.month : NaN;
            },
          },
          {
            key: "day",
            get: function () {
              return this.isValid ? this.c.day : NaN;
            },
          },
          {
            key: "hour",
            get: function () {
              return this.isValid ? this.c.hour : NaN;
            },
          },
          {
            key: "minute",
            get: function () {
              return this.isValid ? this.c.minute : NaN;
            },
          },
          {
            key: "second",
            get: function () {
              return this.isValid ? this.c.second : NaN;
            },
          },
          {
            key: "millisecond",
            get: function () {
              return this.isValid ? this.c.millisecond : NaN;
            },
          },
          {
            key: "weekYear",
            get: function () {
              return this.isValid ? Un(this).weekYear : NaN;
            },
          },
          {
            key: "weekNumber",
            get: function () {
              return this.isValid ? Un(this).weekNumber : NaN;
            },
          },
          {
            key: "weekday",
            get: function () {
              return this.isValid ? Un(this).weekday : NaN;
            },
          },
          {
            key: "ordinal",
            get: function () {
              return this.isValid ? Ln(this.c).ordinal : NaN;
            },
          },
          {
            key: "monthShort",
            get: function () {
              return this.isValid
                ? cn.months("short", { locObj: this.loc })[this.month - 1]
                : null;
            },
          },
          {
            key: "monthLong",
            get: function () {
              return this.isValid
                ? cn.months("long", { locObj: this.loc })[this.month - 1]
                : null;
            },
          },
          {
            key: "weekdayShort",
            get: function () {
              return this.isValid
                ? cn.weekdays("short", { locObj: this.loc })[this.weekday - 1]
                : null;
            },
          },
          {
            key: "weekdayLong",
            get: function () {
              return this.isValid
                ? cn.weekdays("long", { locObj: this.loc })[this.weekday - 1]
                : null;
            },
          },
          {
            key: "offset",
            get: function () {
              return this.isValid ? +this.o : NaN;
            },
          },
          {
            key: "offsetNameShort",
            get: function () {
              return this.isValid
                ? this.zone.offsetName(this.ts, {
                    format: "short",
                    locale: this.locale,
                  })
                : null;
            },
          },
          {
            key: "offsetNameLong",
            get: function () {
              return this.isValid
                ? this.zone.offsetName(this.ts, {
                    format: "long",
                    locale: this.locale,
                  })
                : null;
            },
          },
          {
            key: "isOffsetFixed",
            get: function () {
              return this.isValid ? this.zone.isUniversal : null;
            },
          },
          {
            key: "isInDST",
            get: function () {
              return (
                !this.isOffsetFixed &&
                (this.offset > this.set({ month: 1, day: 1 }).offset ||
                  this.offset > this.set({ month: 5 }).offset)
              );
            },
          },
          {
            key: "isInLeapYear",
            get: function () {
              return Gt(this.year);
            },
          },
          {
            key: "daysInMonth",
            get: function () {
              return Bt(this.year, this.month);
            },
          },
          {
            key: "daysInYear",
            get: function () {
              return this.isValid ? $t(this.year) : NaN;
            },
          },
          {
            key: "weeksInWeekYear",
            get: function () {
              return this.isValid ? Kt(this.weekYear) : NaN;
            },
          },
        ],
        [
          {
            key: "DATE_SHORT",
            get: function () {
              return $;
            },
          },
          {
            key: "DATE_MED",
            get: function () {
              return B;
            },
          },
          {
            key: "DATE_MED_WITH_WEEKDAY",
            get: function () {
              return Q;
            },
          },
          {
            key: "DATE_FULL",
            get: function () {
              return K;
            },
          },
          {
            key: "DATE_HUGE",
            get: function () {
              return X;
            },
          },
          {
            key: "TIME_SIMPLE",
            get: function () {
              return tt;
            },
          },
          {
            key: "TIME_WITH_SECONDS",
            get: function () {
              return et;
            },
          },
          {
            key: "TIME_WITH_SHORT_OFFSET",
            get: function () {
              return nt;
            },
          },
          {
            key: "TIME_WITH_LONG_OFFSET",
            get: function () {
              return rt;
            },
          },
          {
            key: "TIME_24_SIMPLE",
            get: function () {
              return it;
            },
          },
          {
            key: "TIME_24_WITH_SECONDS",
            get: function () {
              return ot;
            },
          },
          {
            key: "TIME_24_WITH_SHORT_OFFSET",
            get: function () {
              return at;
            },
          },
          {
            key: "TIME_24_WITH_LONG_OFFSET",
            get: function () {
              return ut;
            },
          },
          {
            key: "DATETIME_SHORT",
            get: function () {
              return st;
            },
          },
          {
            key: "DATETIME_SHORT_WITH_SECONDS",
            get: function () {
              return ct;
            },
          },
          {
            key: "DATETIME_MED",
            get: function () {
              return lt;
            },
          },
          {
            key: "DATETIME_MED_WITH_SECONDS",
            get: function () {
              return ft;
            },
          },
          {
            key: "DATETIME_MED_WITH_WEEKDAY",
            get: function () {
              return dt;
            },
          },
          {
            key: "DATETIME_FULL",
            get: function () {
              return ht;
            },
          },
          {
            key: "DATETIME_FULL_WITH_SECONDS",
            get: function () {
              return mt;
            },
          },
          {
            key: "DATETIME_HUGE",
            get: function () {
              return yt;
            },
          },
          {
            key: "DATETIME_HUGE_WITH_SECONDS",
            get: function () {
              return vt;
            },
          },
        ]
      ),
      p
    );
  })();
  function ar(t) {
    if (L.isDateTime(t)) return t;
    if (t && t.valueOf && y(t.valueOf())) return L.fromJSDate(t);
    if (t && "object" == typeof t) return L.fromObject(t);
    throw new u("Unknown datetime argument: " + t + ", of type " + typeof t);
  }
  return (
    (t.DateTime = L),
    (t.Duration = V),
    (t.FixedOffsetZone = d),
    (t.IANAZone = f),
    (t.Info = cn),
    (t.Interval = sn),
    (t.InvalidZone = Lt),
    (t.Settings = k),
    (t.SystemZone = gt),
    (t.VERSION = "3.4.3"),
    (t.Zone = c),
    Object.defineProperty(t, "__esModule", { value: !0 }),
    t
  );
})({});
