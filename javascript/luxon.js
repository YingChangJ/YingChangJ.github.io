class e extends Error {}
class L extends e {
  constructor(e) {
    super("Invalid DateTime: " + e.toMessage());
  }
}
class z extends e {
  constructor(e) {
    super("Invalid Interval: " + e.toMessage());
  }
}
class j extends e {
  constructor(e) {
    super("Invalid Duration: " + e.toMessage());
  }
}
class w extends e {}
class A extends e {
  constructor(e) {
    super("Invalid unit " + e);
  }
}
class o extends e {}
class r extends e {
  constructor() {
    super("Zone is an abstract class");
  }
}
var t = "numeric",
  n = "short",
  s = "long";
const q = { year: t, month: t, day: t },
  $ = { year: t, month: n, day: t },
  U = { year: t, month: n, day: t, weekday: n },
  _ = { year: t, month: s, day: t },
  Y = { year: t, month: s, day: t, weekday: s },
  H = { hour: t, minute: t },
  R = { hour: t, minute: t, second: t },
  J = { hour: t, minute: t, second: t, timeZoneName: n },
  P = { hour: t, minute: t, second: t, timeZoneName: s },
  G = { hour: t, minute: t, hourCycle: "h23" },
  B = { hour: t, minute: t, second: t, hourCycle: "h23" },
  Q = { hour: t, minute: t, second: t, hourCycle: "h23", timeZoneName: n },
  K = { hour: t, minute: t, second: t, hourCycle: "h23", timeZoneName: s },
  X = { year: t, month: t, day: t, hour: t, minute: t },
  ee = { year: t, month: t, day: t, hour: t, minute: t, second: t },
  te = { year: t, month: n, day: t, hour: t, minute: t },
  re = { year: t, month: n, day: t, hour: t, minute: t, second: t },
  ne = { year: t, month: n, day: t, weekday: n, hour: t, minute: t },
  se = { year: t, month: s, day: t, hour: t, minute: t, timeZoneName: n },
  ie = {
    year: t,
    month: s,
    day: t,
    hour: t,
    minute: t,
    second: t,
    timeZoneName: n,
  },
  ae = {
    year: t,
    month: s,
    day: t,
    weekday: s,
    hour: t,
    minute: t,
    timeZoneName: s,
  },
  oe = {
    year: t,
    month: s,
    day: t,
    weekday: s,
    hour: t,
    minute: t,
    second: t,
    timeZoneName: s,
  };
class i {
  get type() {
    throw new r();
  }
  get name() {
    throw new r();
  }
  get ianaName() {
    return this.name;
  }
  get isUniversal() {
    throw new r();
  }
  offsetName(e, t) {
    throw new r();
  }
  formatOffset(e, t) {
    throw new r();
  }
  offset(e) {
    throw new r();
  }
  equals(e) {
    throw new r();
  }
  get isValid() {
    throw new r();
  }
}
let ue = null;
class le extends i {
  static get instance() {
    return (ue = null === ue ? new le() : ue);
  }
  get type() {
    return "system";
  }
  get name() {
    return new Intl.DateTimeFormat().resolvedOptions().timeZone;
  }
  get isUniversal() {
    return !1;
  }
  offsetName(e, { format: t, locale: r }) {
    return bt(e, t, r);
  }
  formatOffset(e, t) {
    return It(this.offset(e), t);
  }
  offset(e) {
    return -new Date(e).getTimezoneOffset();
  }
  equals(e) {
    return "system" === e.type;
  }
  get isValid() {
    return !0;
  }
}
let ce = {};
function he(e) {
  return (
    ce[e] ||
      (ce[e] = new Intl.DateTimeFormat("en-US", {
        hour12: !1,
        timeZone: e,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        era: "short",
      })),
    ce[e]
  );
}
const de = { year: 0, month: 1, day: 2, era: 3, hour: 4, minute: 5, second: 6 };
function me(e, t) {
  var e = e.format(t).replace(/\u200E/g, ""),
    [, t, e, r, n, s, i, a] =
      /(\d+)\/(\d+)\/(\d+) (AD|BC),? (\d+):(\d+):(\d+)/.exec(e);
  return [r, t, e, n, s, i, a];
}
function fe(e, t) {
  var r = e.formatToParts(t),
    n = [];
  for (let e = 0; e < r.length; e++) {
    var { type: s, value: i } = r[e],
      a = de[s];
    "era" === s ? (n[a] = i) : S(a) || (n[a] = parseInt(i, 10));
  }
  return n;
}
let ye = {};
class u extends i {
  static create(e) {
    return ye[e] || (ye[e] = new u(e)), ye[e];
  }
  static resetCache() {
    (ye = {}), (ce = {});
  }
  static isValidSpecifier(e) {
    return this.isValidZone(e);
  }
  static isValidZone(e) {
    if (!e) return !1;
    try {
      return new Intl.DateTimeFormat("en-US", { timeZone: e }).format(), !0;
    } catch (e) {
      return !1;
    }
  }
  constructor(e) {
    super(), (this.zoneName = e), (this.valid = u.isValidZone(e));
  }
  get type() {
    return "iana";
  }
  get name() {
    return this.zoneName;
  }
  get isUniversal() {
    return !1;
  }
  offsetName(e, { format: t, locale: r }) {
    return bt(e, t, r, this.name);
  }
  formatOffset(e, t) {
    return It(this.offset(e), t);
  }
  offset(e) {
    e = new Date(e);
    if (isNaN(e)) return NaN;
    var t = he(this.name);
    let [r, n, s, i, a, o, u] = (t.formatToParts ? fe : me)(t, e);
    (t = +e), (e = t % 1e3);
    return (
      (kt({
        year: (r = "BC" === i ? 1 - Math.abs(r) : r),
        month: n,
        day: s,
        hour: 24 === a ? 0 : a,
        minute: o,
        second: u,
        millisecond: 0,
      }) -
        (t -= 0 <= e ? e : 1e3 + e)) /
      6e4
    );
  }
  equals(e) {
    return "iana" === e.type && e.name === this.name;
  }
  get isValid() {
    return this.valid;
  }
}
let ge = {};
function we(e, t = {}) {
  var r = JSON.stringify([e, t]);
  let n = ge[r];
  return n || ((n = new Intl.ListFormat(e, t)), (ge[r] = n)), n;
}
let ve = {};
function pe(e, t = {}) {
  var r = JSON.stringify([e, t]);
  let n = ve[r];
  return n || ((n = new Intl.DateTimeFormat(e, t)), (ve[r] = n)), n;
}
let ke = {};
function Se(e, t = {}) {
  var r = JSON.stringify([e, t]);
  let n = ke[r];
  return n || ((n = new Intl.NumberFormat(e, t)), (ke[r] = n)), n;
}
let Te = {};
function Oe(e, t = {}) {
  const { base: r, ...n } = t;
  var s = JSON.stringify([e, n]);
  let i = Te[s];
  return i || ((i = new Intl.RelativeTimeFormat(e, t)), (Te[s] = i)), i;
}
let be = null;
function Ne() {
  return (be = be || new Intl.DateTimeFormat().resolvedOptions().locale);
}
let De = {};
function Me(e) {
  let t = De[e];
  var r;
  return (
    t ||
      ((r = new Intl.Locale(e)),
      (t = "getWeekInfo" in r ? r.getWeekInfo() : r.weekInfo),
      (De[e] = t)),
    t
  );
}
function Ie(n) {
  var s = n.indexOf("-x-"),
    s = (n = -1 !== s ? n.substring(0, s) : n).indexOf("-u-");
  if (-1 === s) return [n];
  {
    let t, r;
    try {
      (t = pe(n).resolvedOptions()), (r = n);
    } catch (e) {
      n = n.substring(0, s);
      (t = pe(n).resolvedOptions()), (r = n);
    }
    var { numberingSystem: s, calendar: n } = t;
    return [r, s, n];
  }
}
function Ve(e, t, r) {
  return (
    (r || t) &&
      (e.includes("-u-") || (e += "-u"), r && (e += "-ca-" + r), t) &&
      (e += "-nu-" + t),
    e
  );
}
function Ee(t) {
  var r = [];
  for (let e = 1; e <= 12; e++) {
    var n = W.utc(2009, e, 1);
    r.push(t(n));
  }
  return r;
}
function xe(t) {
  var r = [];
  for (let e = 1; e <= 7; e++) {
    var n = W.utc(2016, 11, 13 + e);
    r.push(t(n));
  }
  return r;
}
function Ce(e, t, r, n) {
  e = e.listingMode();
  return "error" === e ? null : ("en" === e ? r : n)(t);
}
function Fe(e) {
  return (
    (!e.numberingSystem || "latn" === e.numberingSystem) &&
    ("latn" === e.numberingSystem ||
      !e.locale ||
      e.locale.startsWith("en") ||
      "latn" ===
        new Intl.DateTimeFormat(e.intl).resolvedOptions().numberingSystem)
  );
}
class Ze {
  constructor(e, t, r) {
    (this.padTo = r.padTo || 0), (this.floor = r.floor || !1);
    const { padTo: n, floor: s, ...i } = r;
    (!t || 0 < Object.keys(i).length) &&
      ((t = { useGrouping: !1, ...r }),
      0 < r.padTo && (t.minimumIntegerDigits = r.padTo),
      (this.inf = Se(e, t)));
  }
  format(e) {
    var t;
    return this.inf
      ? ((t = this.floor ? Math.floor(e) : e), this.inf.format(t))
      : y(this.floor ? Math.floor(e) : wt(e, 3), this.padTo);
  }
}
class We {
  constructor(e, t, r) {
    this.opts = r;
    let n = (this.originalZone = void 0);
    this.opts.timeZone
      ? (this.dt = e)
      : "fixed" === e.zone.type
      ? ((r = 0 <= (r = (e.offset / 60) * -1) ? "Etc/GMT+" + r : "Etc/GMT" + r),
        0 !== e.offset && u.create(r).valid
          ? ((n = r), (this.dt = e))
          : ((n = "UTC"),
            (this.dt =
              0 === e.offset
                ? e
                : e.setZone("UTC").plus({ minutes: e.offset })),
            (this.originalZone = e.zone)))
      : "system" === e.zone.type
      ? (this.dt = e)
      : "iana" === e.zone.type
      ? ((this.dt = e), (n = e.zone.name))
      : ((n = "UTC"),
        (this.dt = e.setZone("UTC").plus({ minutes: e.offset })),
        (this.originalZone = e.zone));
    r = { ...this.opts };
    (r.timeZone = r.timeZone || n), (this.dtf = pe(t, r));
  }
  format() {
    return this.originalZone
      ? this.formatToParts()
          .map(({ value: e }) => e)
          .join("")
      : this.dtf.format(this.dt.toJSDate());
  }
  formatToParts() {
    var e = this.dtf.formatToParts(this.dt.toJSDate());
    return this.originalZone
      ? e.map((e) => {
          var t;
          return "timeZoneName" === e.type
            ? ((t = this.originalZone.offsetName(this.dt.ts, {
                locale: this.dt.locale,
                format: this.opts.timeZoneName,
              })),
              { ...e, value: t })
            : e;
        })
      : e;
  }
  resolvedOptions() {
    return this.dtf.resolvedOptions();
  }
}
class Le {
  constructor(e, t, r) {
    (this.opts = { style: "long", ...r }), !t && ht() && (this.rtf = Oe(e, r));
  }
  format(e, t) {
    return this.rtf
      ? this.rtf.format(e, t)
      : Jt(t, e, this.opts.numeric, "long" !== this.opts.style);
  }
  formatToParts(e, t) {
    return this.rtf ? this.rtf.formatToParts(e, t) : [];
  }
}
const ze = { firstDay: 1, minimalDays: 4, weekend: [6, 7] };
class v {
  static fromOpts(e) {
    return v.create(
      e.locale,
      e.numberingSystem,
      e.outputCalendar,
      e.weekSettings,
      e.defaultToEN
    );
  }
  static create(e, t, r, n, s = !1) {
    (e = e || k.defaultLocale),
      (s = e || (s ? "en-US" : Ne())),
      (t = t || k.defaultNumberingSystem),
      (r = r || k.defaultOutputCalendar),
      (n = yt(n) || k.defaultWeekSettings);
    return new v(s, t, r, n, e);
  }
  static resetCache() {
    (be = null), (ve = {}), (ke = {}), (Te = {});
  }
  static fromObject({
    locale: e,
    numberingSystem: t,
    outputCalendar: r,
    weekSettings: n,
  } = {}) {
    return v.create(e, t, r, n);
  }
  constructor(e, t, r, n, s) {
    var [e, i, a] = Ie(e);
    (this.locale = e),
      (this.numberingSystem = t || i || null),
      (this.outputCalendar = r || a || null),
      (this.weekSettings = n),
      (this.intl = Ve(this.locale, this.numberingSystem, this.outputCalendar)),
      (this.weekdaysCache = { format: {}, standalone: {} }),
      (this.monthsCache = { format: {}, standalone: {} }),
      (this.meridiemCache = null),
      (this.eraCache = {}),
      (this.specifiedLocale = s),
      (this.fastNumbersCached = null);
  }
  get fastNumbers() {
    return (
      null == this.fastNumbersCached && (this.fastNumbersCached = Fe(this)),
      this.fastNumbersCached
    );
  }
  listingMode() {
    var e = this.isEnglish(),
      t = !(
        (null !== this.numberingSystem && "latn" !== this.numberingSystem) ||
        (null !== this.outputCalendar && "gregory" !== this.outputCalendar)
      );
    return e && t ? "en" : "intl";
  }
  clone(e) {
    return e && 0 !== Object.getOwnPropertyNames(e).length
      ? v.create(
          e.locale || this.specifiedLocale,
          e.numberingSystem || this.numberingSystem,
          e.outputCalendar || this.outputCalendar,
          yt(e.weekSettings) || this.weekSettings,
          e.defaultToEN || !1
        )
      : this;
  }
  redefaultToEN(e = {}) {
    return this.clone({ ...e, defaultToEN: !0 });
  }
  redefaultToSystem(e = {}) {
    return this.clone({ ...e, defaultToEN: !1 });
  }
  months(r, n = !1) {
    return Ce(this, r, Ft, () => {
      const t = n ? { month: r, day: "numeric" } : { month: r },
        e = n ? "format" : "standalone";
      return (
        this.monthsCache[e][r] ||
          (this.monthsCache[e][r] = Ee((e) => this.extract(e, t, "month"))),
        this.monthsCache[e][r]
      );
    });
  }
  weekdays(r, n = !1) {
    return Ce(this, r, zt, () => {
      const t = n
          ? { weekday: r, year: "numeric", month: "long", day: "numeric" }
          : { weekday: r },
        e = n ? "format" : "standalone";
      return (
        this.weekdaysCache[e][r] ||
          (this.weekdaysCache[e][r] = xe((e) => this.extract(e, t, "weekday"))),
        this.weekdaysCache[e][r]
      );
    });
  }
  meridiems() {
    return Ce(
      this,
      void 0,
      () => jt,
      () => {
        if (!this.meridiemCache) {
          const t = { hour: "numeric", hourCycle: "h12" };
          this.meridiemCache = [
            W.utc(2016, 11, 13, 9),
            W.utc(2016, 11, 13, 19),
          ].map((e) => this.extract(e, t, "dayperiod"));
        }
        return this.meridiemCache;
      }
    );
  }
  eras(e) {
    return Ce(this, e, Ut, () => {
      const t = { era: e };
      return (
        this.eraCache[e] ||
          (this.eraCache[e] = [W.utc(-40, 1, 1), W.utc(2017, 1, 1)].map((e) =>
            this.extract(e, t, "era")
          )),
        this.eraCache[e]
      );
    });
  }
  extract(e, t, r) {
    e = this.dtFormatter(e, t)
      .formatToParts()
      .find((e) => e.type.toLowerCase() === r);
    return e ? e.value : null;
  }
  numberFormatter(e = {}) {
    return new Ze(this.intl, e.forceSimple || this.fastNumbers, e);
  }
  dtFormatter(e, t = {}) {
    return new We(e, this.intl, t);
  }
  relFormatter(e = {}) {
    return new Le(this.intl, this.isEnglish(), e);
  }
  listFormatter(e = {}) {
    return we(this.intl, e);
  }
  isEnglish() {
    return (
      "en" === this.locale ||
      "en-us" === this.locale.toLowerCase() ||
      new Intl.DateTimeFormat(this.intl)
        .resolvedOptions()
        .locale.startsWith("en-us")
    );
  }
  getWeekSettings() {
    return this.weekSettings || (dt() ? Me(this.locale) : ze);
  }
  getStartOfWeek() {
    return this.getWeekSettings().firstDay;
  }
  getMinDaysInFirstWeek() {
    return this.getWeekSettings().minimalDays;
  }
  getWeekendDays() {
    return this.getWeekSettings().weekend;
  }
  equals(e) {
    return (
      this.locale === e.locale &&
      this.numberingSystem === e.numberingSystem &&
      this.outputCalendar === e.outputCalendar
    );
  }
}
let je = null;
class d extends i {
  static get utcInstance() {
    return (je = null === je ? new d(0) : je);
  }
  static instance(e) {
    return 0 === e ? d.utcInstance : new d(e);
  }
  static parseSpecifier(e) {
    if (e) {
      e = e.match(/^utc(?:([+-]\d{1,2})(?::(\d{2}))?)?$/i);
      if (e) return new d(Nt(e[1], e[2]));
    }
    return null;
  }
  constructor(e) {
    super(), (this.fixed = e);
  }
  get type() {
    return "fixed";
  }
  get name() {
    return 0 === this.fixed ? "UTC" : "UTC" + It(this.fixed, "narrow");
  }
  get ianaName() {
    return 0 === this.fixed ? "Etc/UTC" : "Etc/GMT" + It(-this.fixed, "narrow");
  }
  offsetName() {
    return this.name;
  }
  formatOffset(e, t) {
    return It(this.fixed, t);
  }
  get isUniversal() {
    return !0;
  }
  offset() {
    return this.fixed;
  }
  equals(e) {
    return "fixed" === e.type && e.fixed === this.fixed;
  }
  get isValid() {
    return !0;
  }
}
class Ae extends i {
  constructor(e) {
    super(), (this.zoneName = e);
  }
  get type() {
    return "invalid";
  }
  get name() {
    return this.zoneName;
  }
  get isUniversal() {
    return !1;
  }
  offsetName() {
    return null;
  }
  formatOffset() {
    return "";
  }
  offset() {
    return NaN;
  }
  equals() {
    return !1;
  }
  get isValid() {
    return !1;
  }
}
function p(e, t) {
  var r;
  return S(e) || null === e
    ? t
    : e instanceof i
    ? e
    : "string" == typeof e
    ? "default" === (r = e.toLowerCase())
      ? t
      : "local" === r || "system" === r
      ? le.instance
      : "utc" === r || "gmt" === r
      ? d.utcInstance
      : d.parseSpecifier(r) || u.create(e)
    : h(e)
    ? d.instance(e)
    : "object" == typeof e && "offset" in e && "function" == typeof e.offset
    ? e
    : new Ae(e);
}
let qe = () => Date.now(),
  $e = "system",
  Ue = null,
  _e = null,
  Ye = null,
  He = 60,
  Re,
  Je = null;
class k {
  static get now() {
    return qe;
  }
  static set now(e) {
    qe = e;
  }
  static set defaultZone(e) {
    $e = e;
  }
  static get defaultZone() {
    return p($e, le.instance);
  }
  static get defaultLocale() {
    return Ue;
  }
  static set defaultLocale(e) {
    Ue = e;
  }
  static get defaultNumberingSystem() {
    return _e;
  }
  static set defaultNumberingSystem(e) {
    _e = e;
  }
  static get defaultOutputCalendar() {
    return Ye;
  }
  static set defaultOutputCalendar(e) {
    Ye = e;
  }
  static get defaultWeekSettings() {
    return Je;
  }
  static set defaultWeekSettings(e) {
    Je = yt(e);
  }
  static get twoDigitCutoffYear() {
    return He;
  }
  static set twoDigitCutoffYear(e) {
    He = e % 100;
  }
  static get throwOnInvalid() {
    return Re;
  }
  static set throwOnInvalid(e) {
    Re = e;
  }
  static resetCaches() {
    v.resetCache(), u.resetCache();
  }
}
class l {
  constructor(e, t) {
    (this.reason = e), (this.explanation = t);
  }
  toMessage() {
    return this.explanation
      ? this.reason + ": " + this.explanation
      : this.reason;
  }
}
const Pe = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
  Ge = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
function c(e, t) {
  return new l(
    "unit out of range",
    `you specified ${t} (of type ${typeof t}) as a ${e}, which is invalid`
  );
}
function Be(e, t, r) {
  (t = new Date(Date.UTC(e, t - 1, r))),
    e < 100 && 0 <= e && t.setUTCFullYear(t.getUTCFullYear() - 1900),
    (r = t.getUTCDay());
  return 0 === r ? 7 : r;
}
function Qe(e, t, r) {
  return r + (vt(e) ? Ge : Pe)[t - 1];
}
function Ke(e, t) {
  var e = vt(e) ? Ge : Pe,
    r = e.findIndex((e) => e < t);
  return { month: r + 1, day: t - e[r] };
}
function Xe(e, t) {
  return ((e - t + 7) % 7) + 1;
}
function et(e, t = 4, r = 1) {
  var { year: n, month: s, day: i } = e,
    a = Qe(n, s, i),
    s = Xe(Be(n, s, i), r);
  let o = Math.floor((a - s + 14 - t) / 7),
    u;
  return (
    o < 1
      ? ((u = n - 1), (o = Tt(u, t, r)))
      : o > Tt(n, t, r)
      ? ((u = n + 1), (o = 1))
      : (u = n),
    { weekYear: u, weekNumber: o, weekday: s, ...Vt(e) }
  );
}
function tt(e, t = 4, r = 1) {
  var { weekYear: n, weekNumber: s, weekday: i } = e,
    r = Xe(Be(n, 1, t), r),
    a = O(n);
  let o = 7 * s + i - r - 7 + t,
    u;
  o < 1
    ? ((u = n - 1), (o += O(u)))
    : o > a
    ? ((u = n + 1), (o -= O(n)))
    : (u = n);
  var { month: s, day: i } = Ke(u, o);
  return { year: u, month: s, day: i, ...Vt(e) };
}
function rt(e) {
  var { year: t, month: r, day: n } = e;
  return { year: t, ordinal: Qe(t, r, n), ...Vt(e) };
}
function nt(e) {
  var { year: t, ordinal: r } = e,
    { month: r, day: n } = Ke(t, r);
  return { year: t, month: r, day: n, ...Vt(e) };
}
function st(e, t) {
  if (S(e.localWeekday) && S(e.localWeekNumber) && S(e.localWeekYear))
    return { minDaysInFirstWeek: 4, startOfWeek: 1 };
  if (S(e.weekday) && S(e.weekNumber) && S(e.weekYear))
    return (
      S(e.localWeekday) || (e.weekday = e.localWeekday),
      S(e.localWeekNumber) || (e.weekNumber = e.localWeekNumber),
      S(e.localWeekYear) || (e.weekYear = e.localWeekYear),
      delete e.localWeekday,
      delete e.localWeekNumber,
      delete e.localWeekYear,
      {
        minDaysInFirstWeek: t.getMinDaysInFirstWeek(),
        startOfWeek: t.getStartOfWeek(),
      }
    );
  throw new w("Cannot mix locale-based week fields with ISO-based week fields");
}
function it(e, t = 4, r = 1) {
  var n = lt(e.weekYear),
    t = f(e.weekNumber, 1, Tt(e.weekYear, t, r)),
    r = f(e.weekday, 1, 7);
  return n
    ? t
      ? !r && c("weekday", e.weekday)
      : c("week", e.weekNumber)
    : c("weekYear", e.weekYear);
}
function at(e) {
  var t = lt(e.year),
    r = f(e.ordinal, 1, O(e.year));
  return t ? !r && c("ordinal", e.ordinal) : c("year", e.year);
}
function ot(e) {
  var t = lt(e.year),
    r = f(e.month, 1, 12),
    n = f(e.day, 1, pt(e.year, e.month));
  return t
    ? r
      ? !n && c("day", e.day)
      : c("month", e.month)
    : c("year", e.year);
}
function ut(e) {
  var { hour: e, minute: t, second: r, millisecond: n } = e,
    s = f(e, 0, 23) || (24 === e && 0 === t && 0 === r && 0 === n),
    i = f(t, 0, 59),
    a = f(r, 0, 59),
    o = f(n, 0, 999);
  return s
    ? i
      ? a
        ? !o && c("millisecond", n)
        : c("second", r)
      : c("minute", t)
    : c("hour", e);
}
function S(e) {
  return void 0 === e;
}
function h(e) {
  return "number" == typeof e;
}
function lt(e) {
  return "number" == typeof e && e % 1 == 0;
}
function ct(e) {
  return "[object Date]" === Object.prototype.toString.call(e);
}
function ht() {
  try {
    return "undefined" != typeof Intl && !!Intl.RelativeTimeFormat;
  } catch (e) {
    return !1;
  }
}
function dt() {
  try {
    return (
      "undefined" != typeof Intl &&
      !!Intl.Locale &&
      ("weekInfo" in Intl.Locale.prototype ||
        "getWeekInfo" in Intl.Locale.prototype)
    );
  } catch (e) {
    return !1;
  }
}
function mt(e) {
  return Array.isArray(e) ? e : [e];
}
function ft(e, r, n) {
  if (0 !== e.length)
    return e.reduce((e, t) => {
      t = [r(t), t];
      return e && n(e[0], t[0]) === e[0] ? e : t;
    }, null)[1];
}
function m(e, t) {
  return Object.prototype.hasOwnProperty.call(e, t);
}
function yt(e) {
  if (null == e) return null;
  if ("object" != typeof e) throw new o("Week settings must be an object");
  if (
    f(e.firstDay, 1, 7) &&
    f(e.minimalDays, 1, 7) &&
    Array.isArray(e.weekend) &&
    !e.weekend.some((e) => !f(e, 1, 7))
  )
    return {
      firstDay: e.firstDay,
      minimalDays: e.minimalDays,
      weekend: Array.from(e.weekend),
    };
  throw new o("Invalid week settings");
}
function f(e, t, r) {
  return lt(e) && t <= e && e <= r;
}
function y(e, t = 2) {
  let r;
  return (r =
    e < 0 ? "-" + ("" + -e).padStart(t, "0") : ("" + e).padStart(t, "0"));
}
function g(e) {
  if (!S(e) && null !== e && "" !== e) return parseInt(e, 10);
}
function T(e) {
  if (!S(e) && null !== e && "" !== e) return parseFloat(e);
}
function gt(e) {
  if (!S(e) && null !== e && "" !== e)
    return (e = 1e3 * parseFloat("0." + e)), Math.floor(e);
}
function wt(e, t, r = !1) {
  t = 10 ** t;
  return (r ? Math.trunc : Math.round)(e * t) / t;
}
function vt(e) {
  return e % 4 == 0 && (e % 100 != 0 || e % 400 == 0);
}
function O(e) {
  return vt(e) ? 366 : 365;
}
function pt(e, t) {
  var r,
    n = (n = t - 1) - (r = 12) * Math.floor(n / r) + 1;
  return 2 == n
    ? vt(e + (t - n) / 12)
      ? 29
      : 28
    : [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][n - 1];
}
function kt(e) {
  let t = Date.UTC(
    e.year,
    e.month - 1,
    e.day,
    e.hour,
    e.minute,
    e.second,
    e.millisecond
  );
  return (
    e.year < 100 &&
      0 <= e.year &&
      (t = new Date(t)).setUTCFullYear(e.year, e.month - 1, e.day),
    +t
  );
}
function St(e, t, r) {
  return -Xe(Be(e, 1, t), r) + t - 1;
}
function Tt(e, t = 4, r = 1) {
  var n = St(e, t, r),
    t = St(e + 1, t, r);
  return (O(e) - n + t) / 7;
}
function Ot(e) {
  return 99 < e ? e : e > k.twoDigitCutoffYear ? 1900 + e : 2e3 + e;
}
function bt(e, t, r, n = null) {
  var e = new Date(e),
    s = {
      hourCycle: "h23",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    },
    n = (n && (s.timeZone = n), { timeZoneName: t, ...s }),
    t = new Intl.DateTimeFormat(r, n)
      .formatToParts(e)
      .find((e) => "timezonename" === e.type.toLowerCase());
  return t ? t.value : null;
}
function Nt(e, t) {
  let r = parseInt(e, 10);
  Number.isNaN(r) && (r = 0);
  (e = parseInt(t, 10) || 0), (t = r < 0 || Object.is(r, -0) ? -e : e);
  return 60 * r + t;
}
function Dt(e) {
  var t = Number(e);
  if ("boolean" == typeof e || "" === e || Number.isNaN(t))
    throw new o("Invalid unit value " + e);
  return t;
}
function Mt(e, t) {
  var r,
    n = {};
  for (const s in e) m(e, s) && null != (r = e[s]) && (n[t(s)] = Dt(r));
  return n;
}
function It(e, t) {
  var r = Math.trunc(Math.abs(e / 60)),
    n = Math.trunc(Math.abs(e % 60)),
    s = 0 <= e ? "+" : "-";
  switch (t) {
    case "short":
      return s + y(r, 2) + ":" + y(n, 2);
    case "narrow":
      return s + r + (0 < n ? ":" + n : "");
    case "techie":
      return s + y(r, 2) + y(n, 2);
    default:
      throw new RangeError(
        `Value format ${t} is out of range for property format`
      );
  }
}
function Vt(e) {
  return (
    (r = e),
    ["hour", "minute", "second", "millisecond"].reduce(
      (e, t) => ((e[t] = r[t]), e),
      {}
    )
  );
  var r;
}
const Et = [
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
  xt = [
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
  Ct = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
function Ft(e) {
  switch (e) {
    case "narrow":
      return [...Ct];
    case "short":
      return [...xt];
    case "long":
      return [...Et];
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
const Zt = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ],
  Wt = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  Lt = ["M", "T", "W", "T", "F", "S", "S"];
function zt(e) {
  switch (e) {
    case "narrow":
      return [...Lt];
    case "short":
      return [...Wt];
    case "long":
      return [...Zt];
    case "numeric":
      return ["1", "2", "3", "4", "5", "6", "7"];
    default:
      return null;
  }
}
const jt = ["AM", "PM"],
  At = ["Before Christ", "Anno Domini"],
  qt = ["BC", "AD"],
  $t = ["B", "A"];
function Ut(e) {
  switch (e) {
    case "narrow":
      return [...$t];
    case "short":
      return [...qt];
    case "long":
      return [...At];
    default:
      return null;
  }
}
function _t(e) {
  return jt[e.hour < 12 ? 0 : 1];
}
function Yt(e, t) {
  return zt(t)[e.weekday - 1];
}
function Ht(e, t) {
  return Ft(t)[e.month - 1];
}
function Rt(e, t) {
  return Ut(t)[e.year < 0 ? 0 : 1];
}
function Jt(e, t, r = "always", n = !1) {
  var s = {
      years: ["year", "yr."],
      quarters: ["quarter", "qtr."],
      months: ["month", "mo."],
      weeks: ["week", "wk."],
      days: ["day", "day", "days"],
      hours: ["hour", "hr."],
      minutes: ["minute", "min."],
      seconds: ["second", "sec."],
    },
    i = -1 === ["hours", "minutes", "seconds"].indexOf(e);
  if ("auto" === r && i) {
    var a = "days" === e;
    switch (t) {
      case 1:
        return a ? "tomorrow" : "next " + s[e][0];
      case -1:
        return a ? "yesterday" : "last " + s[e][0];
      case 0:
        return a ? "today" : "this " + s[e][0];
    }
  }
  var r = Object.is(t, -0) || t < 0,
    i = Math.abs(t),
    t = 1 === i,
    o = s[e],
    n = n ? (!t && o[2]) || o[1] : t ? s[e][0] : e;
  return r ? i + ` ${n} ago` : `in ${i} ` + n;
}
function Pt(e, t) {
  let r = "";
  for (const n of e) n.literal ? (r += n.val) : (r += t(n.val));
  return r;
}
const Gt = {
  D: q,
  DD: $,
  DDD: _,
  DDDD: Y,
  t: H,
  tt: R,
  ttt: J,
  tttt: P,
  T: G,
  TT: B,
  TTT: Q,
  TTTT: K,
  f: X,
  ff: te,
  fff: se,
  ffff: ae,
  F: ee,
  FF: re,
  FFF: ie,
  FFFF: oe,
};
class b {
  static create(e, t = {}) {
    return new b(e, t);
  }
  static parseFormat(t) {
    let r = null,
      n = "",
      s = !1;
    var i = [];
    for (let e = 0; e < t.length; e++) {
      var a = t.charAt(e);
      "'" === a
        ? (0 < n.length && i.push({ literal: s || /^\s+$/.test(n), val: n }),
          (r = null),
          (n = ""),
          (s = !s))
        : s || a === r
        ? (n += a)
        : (0 < n.length && i.push({ literal: /^\s+$/.test(n), val: n }),
          (n = a),
          (r = a));
    }
    return 0 < n.length && i.push({ literal: s || /^\s+$/.test(n), val: n }), i;
  }
  static macroTokenToFormatOpts(e) {
    return Gt[e];
  }
  constructor(e, t) {
    (this.opts = t), (this.loc = e), (this.systemLoc = null);
  }
  formatWithSystemDefault(e, t) {
    return (
      null === this.systemLoc &&
        (this.systemLoc = this.loc.redefaultToSystem()),
      this.systemLoc.dtFormatter(e, { ...this.opts, ...t }).format()
    );
  }
  dtFormatter(e, t = {}) {
    return this.loc.dtFormatter(e, { ...this.opts, ...t });
  }
  formatDateTime(e, t) {
    return this.dtFormatter(e, t).format();
  }
  formatDateTimeParts(e, t) {
    return this.dtFormatter(e, t).formatToParts();
  }
  formatInterval(e, t) {
    return this.dtFormatter(e.start, t).dtf.formatRange(
      e.start.toJSDate(),
      e.end.toJSDate()
    );
  }
  resolvedOptions(e, t) {
    return this.dtFormatter(e, t).resolvedOptions();
  }
  num(e, t = 0) {
    var r;
    return this.opts.forceSimple
      ? y(e, t)
      : ((r = { ...this.opts }),
        0 < t && (r.padTo = t),
        this.loc.numberFormatter(r).format(e));
  }
  formatDateTimeFromString(r, e) {
    const n = "en" === this.loc.listingMode(),
      t = this.loc.outputCalendar && "gregory" !== this.loc.outputCalendar,
      s = (e, t) => this.loc.extract(r, e, t),
      i = (e) =>
        r.isOffsetFixed && 0 === r.offset && e.allowZ
          ? "Z"
          : r.isValid
          ? r.zone.formatOffset(r.ts, e.format)
          : "",
      a = () =>
        n ? _t(r) : s({ hour: "numeric", hourCycle: "h12" }, "dayperiod"),
      o = (e, t) =>
        n
          ? Ht(r, e)
          : s(t ? { month: e } : { month: e, day: "numeric" }, "month"),
      u = (e, t) =>
        n
          ? Yt(r, e)
          : s(
              t
                ? { weekday: e }
                : { weekday: e, month: "long", day: "numeric" },
              "weekday"
            ),
      l = (e) => {
        var t = b.macroTokenToFormatOpts(e);
        return t ? this.formatWithSystemDefault(r, t) : e;
      },
      c = (e) => (n ? Rt(r, e) : s({ era: e }, "era"));
    return Pt(b.parseFormat(e), (e) => {
      switch (e) {
        case "S":
          return this.num(r.millisecond);
        case "u":
        case "SSS":
          return this.num(r.millisecond, 3);
        case "s":
          return this.num(r.second);
        case "ss":
          return this.num(r.second, 2);
        case "uu":
          return this.num(Math.floor(r.millisecond / 10), 2);
        case "uuu":
          return this.num(Math.floor(r.millisecond / 100));
        case "m":
          return this.num(r.minute);
        case "mm":
          return this.num(r.minute, 2);
        case "h":
          return this.num(r.hour % 12 == 0 ? 12 : r.hour % 12);
        case "hh":
          return this.num(r.hour % 12 == 0 ? 12 : r.hour % 12, 2);
        case "H":
          return this.num(r.hour);
        case "HH":
          return this.num(r.hour, 2);
        case "Z":
          return i({ format: "narrow", allowZ: this.opts.allowZ });
        case "ZZ":
          return i({ format: "short", allowZ: this.opts.allowZ });
        case "ZZZ":
          return i({ format: "techie", allowZ: this.opts.allowZ });
        case "ZZZZ":
          return r.zone.offsetName(r.ts, {
            format: "short",
            locale: this.loc.locale,
          });
        case "ZZZZZ":
          return r.zone.offsetName(r.ts, {
            format: "long",
            locale: this.loc.locale,
          });
        case "z":
          return r.zoneName;
        case "a":
          return a();
        case "d":
          return t ? s({ day: "numeric" }, "day") : this.num(r.day);
        case "dd":
          return t ? s({ day: "2-digit" }, "day") : this.num(r.day, 2);
        case "c":
          return this.num(r.weekday);
        case "ccc":
          return u("short", !0);
        case "cccc":
          return u("long", !0);
        case "ccccc":
          return u("narrow", !0);
        case "E":
          return this.num(r.weekday);
        case "EEE":
          return u("short", !1);
        case "EEEE":
          return u("long", !1);
        case "EEEEE":
          return u("narrow", !1);
        case "L":
          return t
            ? s({ month: "numeric", day: "numeric" }, "month")
            : this.num(r.month);
        case "LL":
          return t
            ? s({ month: "2-digit", day: "numeric" }, "month")
            : this.num(r.month, 2);
        case "LLL":
          return o("short", !0);
        case "LLLL":
          return o("long", !0);
        case "LLLLL":
          return o("narrow", !0);
        case "M":
          return t ? s({ month: "numeric" }, "month") : this.num(r.month);
        case "MM":
          return t ? s({ month: "2-digit" }, "month") : this.num(r.month, 2);
        case "MMM":
          return o("short", !1);
        case "MMMM":
          return o("long", !1);
        case "MMMMM":
          return o("narrow", !1);
        case "y":
          return t ? s({ year: "numeric" }, "year") : this.num(r.year);
        case "yy":
          return t
            ? s({ year: "2-digit" }, "year")
            : this.num(r.year.toString().slice(-2), 2);
        case "yyyy":
          return t ? s({ year: "numeric" }, "year") : this.num(r.year, 4);
        case "yyyyyy":
          return t ? s({ year: "numeric" }, "year") : this.num(r.year, 6);
        case "G":
          return c("short");
        case "GG":
          return c("long");
        case "GGGGG":
          return c("narrow");
        case "kk":
          return this.num(r.weekYear.toString().slice(-2), 2);
        case "kkkk":
          return this.num(r.weekYear, 4);
        case "W":
          return this.num(r.weekNumber);
        case "WW":
          return this.num(r.weekNumber, 2);
        case "n":
          return this.num(r.localWeekNumber);
        case "nn":
          return this.num(r.localWeekNumber, 2);
        case "ii":
          return this.num(r.localWeekYear.toString().slice(-2), 2);
        case "iiii":
          return this.num(r.localWeekYear, 4);
        case "o":
          return this.num(r.ordinal);
        case "ooo":
          return this.num(r.ordinal, 3);
        case "q":
          return this.num(r.quarter);
        case "qq":
          return this.num(r.quarter, 2);
        case "X":
          return this.num(Math.floor(r.ts / 1e3));
        case "x":
          return this.num(r.ts);
        default:
          return l(e);
      }
    });
  }
  formatDurationFromString(e, t) {
    const r = (e) => {
        switch (e[0]) {
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
      n = b.parseFormat(t),
      s = n.reduce((e, { literal: t, val: r }) => (t ? e : e.concat(r)), []),
      i = e.shiftTo(...s.map(r).filter((e) => e));
    return Pt(
      n,
      ((a = i),
      (e) => {
        var t = r(e);
        return t ? this.num(a.get(t), e.length) : e;
      })
    );
    var a;
  }
}
n =
  /[A-Za-z_+-]{1,256}(?::?\/[A-Za-z0-9_+-]{1,256}(?:\/[A-Za-z0-9_+-]{1,256})?)?/;
function a(...e) {
  e = e.reduce((e, t) => e + t.source, "");
  return RegExp(`^${e}$`);
}
function N(...e) {
  return (i) =>
    e
      .reduce(
        ([e, t, r], n) => {
          var [n, r, s] = n(i, r);
          return [{ ...e, ...n }, r || t, s];
        },
        [{}, null, 1]
      )
      .slice(0, 2);
}
function D(e, ...t) {
  if (null != e)
    for (var [r, n] of t) {
      r = r.exec(e);
      if (r) return n(r);
    }
  return [null, null];
}
function Bt(...s) {
  return (e, t) => {
    var r = {};
    let n;
    for (n = 0; n < s.length; n++) r[s[n]] = g(e[t + n]);
    return [r, null, t + n];
  };
}
var t = /(?:(Z)|([+-]\d\d)(?::?(\d\d))?)/,
  s = /(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?/,
  Qt = RegExp(s.source + `(?:${t.source}?(?:\\[(${n.source})\\])?)?`),
  Kt = RegExp(`(?:T${Qt.source})?`),
  Xt = Bt("weekYear", "weekNumber", "weekDay"),
  er = Bt("year", "ordinal"),
  t = RegExp(s.source + ` ?(?:${t.source}|(${n.source}))?`),
  n = RegExp(`(?: ${t.source})?`);
function tr(e, t, r) {
  e = e[t];
  return S(e) ? r : g(e);
}
function rr(e, t) {
  return [
    {
      hours: tr(e, t, 0),
      minutes: tr(e, t + 1, 0),
      seconds: tr(e, t + 2, 0),
      milliseconds: gt(e[t + 3]),
    },
    null,
    t + 4,
  ];
}
function nr(e, t) {
  var r = !e[t] && !e[t + 1],
    e = Nt(e[t + 1], e[t + 2]);
  return [{}, r ? null : d.instance(e), t + 3];
}
function sr(e, t) {
  return [{}, e[t] ? u.create(e[t]) : null, t + 1];
}
const ir = RegExp(`^T?${s.source}$`),
  ar =
    /^-?P(?:(?:(-?\d{1,20}(?:\.\d{1,20})?)Y)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20}(?:\.\d{1,20})?)W)?(?:(-?\d{1,20}(?:\.\d{1,20})?)D)?(?:T(?:(-?\d{1,20}(?:\.\d{1,20})?)H)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20})(?:[.,](-?\d{1,20}))?S)?)?)$/;
function or(e) {
  var [e, t, r, n, s, i, a, o, u] = e;
  const l = "-" === e[0];
  var e = o && "-" === o[0],
    c = (e, t = !1) => (void 0 !== e && (t || (e && l)) ? -e : e);
  return [
    {
      years: c(T(t)),
      months: c(T(r)),
      weeks: c(T(n)),
      days: c(T(s)),
      hours: c(T(i)),
      minutes: c(T(a)),
      seconds: c(T(o), "-0" === o),
      milliseconds: c(gt(u), e),
    },
  ];
}
const ur = {
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
function lr(e, t, r, n, s, i, a) {
  t = {
    year: 2 === t.length ? Ot(g(t)) : g(t),
    month: xt.indexOf(r) + 1,
    day: g(n),
    hour: g(s),
    minute: g(i),
  };
  return (
    a && (t.second = g(a)),
    e && (t.weekday = 3 < e.length ? Zt.indexOf(e) + 1 : Wt.indexOf(e) + 1),
    t
  );
}
const cr =
  /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|(?:([+-]\d\d)(\d\d)))$/;
function hr(e) {
  var [, e, t, r, n, s, i, a, o, u, l, c] = e,
    e = lr(e, n, r, t, s, i, a);
  let h;
  return (h = o ? ur[o] : u ? 0 : Nt(l, c)), [e, new d(h)];
}
const dr =
    /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d\d) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d\d):(\d\d):(\d\d) GMT$/,
  mr =
    /^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d\d)-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d\d) (\d\d):(\d\d):(\d\d) GMT$/,
  fr =
    /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( \d|\d\d) (\d\d):(\d\d):(\d\d) (\d{4})$/;
function yr(e) {
  var [, e, t, r, n, s, i, a] = e;
  return [lr(e, n, r, t, s, i, a), d.utcInstance];
}
function gr(e) {
  var [, e, t, r, n, s, i, a] = e;
  return [lr(e, a, t, r, n, s, i), d.utcInstance];
}
const wr = a(/([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?/, Kt),
  vr = a(/(\d{4})-?W(\d\d)(?:-?(\d))?/, Kt),
  pr = a(/(\d{4})-?(\d{3})/, Kt),
  kr = a(Qt),
  Sr = N(
    function (e, t) {
      return [
        { year: tr(e, t), month: tr(e, t + 1, 1), day: tr(e, t + 2, 1) },
        null,
        t + 3,
      ];
    },
    rr,
    nr,
    sr
  ),
  Tr = N(Xt, rr, nr, sr),
  Or = N(er, rr, nr, sr),
  br = N(rr, nr, sr);
function Nr(e) {
  return D(e, [wr, Sr], [vr, Tr], [pr, Or], [kr, br]);
}
function Dr(e) {
  return D(
    e
      .replace(/\([^()]*\)|[\n\t]/g, " ")
      .replace(/(\s\s+)/g, " ")
      .trim(),
    [cr, hr]
  );
}
function Mr(e) {
  return D(e, [dr, yr], [mr, yr], [fr, gr]);
}
function Ir(e) {
  return D(e, [ar, or]);
}
const Vr = N(rr);
function Er(e) {
  return D(e, [ir, Vr]);
}
const xr = a(/(\d{4})-(\d\d)-(\d\d)/, n),
  Cr = a(t),
  Fr = N(rr, nr, sr);
function Zr(e) {
  return D(e, [xr, Sr], [Cr, Fr]);
}
const Wr = "Invalid Duration",
  Lr = {
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
  zr = {
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
    ...Lr,
  },
  jr = 365.2425,
  Ar = 30.436875,
  qr = {
    years: {
      quarters: 4,
      months: 12,
      weeks: jr / 7,
      days: jr,
      hours: 24 * jr,
      minutes: 525949.2,
      seconds: 525949.2 * 60,
      milliseconds: 525949.2 * 60 * 1e3,
    },
    quarters: {
      months: 3,
      weeks: jr / 28,
      days: jr / 4,
      hours: (24 * jr) / 4,
      minutes: 131487.3,
      seconds: (525949.2 * 60) / 4,
      milliseconds: 7889237999.999999,
    },
    months: {
      weeks: Ar / 7,
      days: Ar,
      hours: 24 * Ar,
      minutes: 43829.1,
      seconds: 2629746,
      milliseconds: 2629746e3,
    },
    ...Lr,
  },
  M = [
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
  $r = M.slice(0).reverse();
function I(e, t, r = !1) {
  r = {
    values: r ? t.values : { ...e.values, ...(t.values || {}) },
    loc: e.loc.clone(t.loc),
    conversionAccuracy: t.conversionAccuracy || e.conversionAccuracy,
    matrix: t.matrix || e.matrix,
  };
  return new V(r);
}
function Ur(e, t) {
  let r = t.milliseconds ?? 0;
  for (const n of $r.slice(1)) t[n] && (r += t[n] * e[n].milliseconds);
  return r;
}
function _r(s, i) {
  const a = Ur(s, i) < 0 ? -1 : 1;
  M.reduceRight((e, t) => {
    var r, n;
    return S(i[t])
      ? e
      : (e &&
          ((n = i[e] * a),
          (r = s[t][e]),
          (n = Math.floor(n / r)),
          (i[t] += n * a),
          (i[e] -= n * r * a)),
        t);
  }, null),
    M.reduce((e, t) => {
      var r;
      return S(i[t])
        ? e
        : (e && ((r = i[e] % 1), (i[e] -= r), (i[t] += r * s[e][t])), t);
    }, null);
}
function Yr(e) {
  var t,
    r,
    n = {};
  for ([t, r] of Object.entries(e)) 0 !== r && (n[t] = r);
  return n;
}
class V {
  constructor(e) {
    var t = "longterm" === e.conversionAccuracy || !1;
    let r = t ? qr : zr;
    e.matrix && (r = e.matrix),
      (this.values = e.values),
      (this.loc = e.loc || v.create()),
      (this.conversionAccuracy = t ? "longterm" : "casual"),
      (this.invalid = e.invalid || null),
      (this.matrix = r),
      (this.isLuxonDuration = !0);
  }
  static fromMillis(e, t) {
    return V.fromObject({ milliseconds: e }, t);
  }
  static fromObject(e, t = {}) {
    if (null == e || "object" != typeof e)
      throw new o(
        "Duration.fromObject: argument expected to be an object, got " +
          (null === e ? "null" : typeof e)
      );
    return new V({
      values: Mt(e, V.normalizeUnit),
      loc: v.fromObject(t),
      conversionAccuracy: t.conversionAccuracy,
      matrix: t.matrix,
    });
  }
  static fromDurationLike(e) {
    if (h(e)) return V.fromMillis(e);
    if (V.isDuration(e)) return e;
    if ("object" == typeof e) return V.fromObject(e);
    throw new o(`Unknown duration argument ${e} of type ` + typeof e);
  }
  static fromISO(e, t) {
    var [r] = Ir(e);
    return r
      ? V.fromObject(r, t)
      : V.invalid("unparsable", `the input "${e}" can't be parsed as ISO 8601`);
  }
  static fromISOTime(e, t) {
    var [r] = Er(e);
    return r
      ? V.fromObject(r, t)
      : V.invalid("unparsable", `the input "${e}" can't be parsed as ISO 8601`);
  }
  static invalid(e, t = null) {
    if (!e) throw new o("need to specify a reason the Duration is invalid");
    e = e instanceof l ? e : new l(e, t);
    if (k.throwOnInvalid) throw new j(e);
    return new V({ invalid: e });
  }
  static normalizeUnit(e) {
    var t = {
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
    }[e && e.toLowerCase()];
    if (t) return t;
    throw new A(e);
  }
  static isDuration(e) {
    return (e && e.isLuxonDuration) || !1;
  }
  get locale() {
    return this.isValid ? this.loc.locale : null;
  }
  get numberingSystem() {
    return this.isValid ? this.loc.numberingSystem : null;
  }
  toFormat(e, t = {}) {
    t = { ...t, floor: !1 !== t.round && !1 !== t.floor };
    return this.isValid
      ? b.create(this.loc, t).formatDurationFromString(this, e)
      : Wr;
  }
  toHuman(r = {}) {
    var e;
    return this.isValid
      ? ((e = M.map((e) => {
          var t = this.values[e];
          return S(t)
            ? null
            : this.loc
                .numberFormatter({
                  style: "unit",
                  unitDisplay: "long",
                  ...r,
                  unit: e.slice(0, -1),
                })
                .format(t);
        }).filter((e) => e)),
        this.loc
          .listFormatter({
            type: "conjunction",
            style: r.listStyle || "narrow",
            ...r,
          })
          .format(e))
      : Wr;
  }
  toObject() {
    return this.isValid ? { ...this.values } : {};
  }
  toISO() {
    if (!this.isValid) return null;
    let e = "P";
    return (
      0 !== this.years && (e += this.years + "Y"),
      (0 === this.months && 0 === this.quarters) ||
        (e += this.months + 3 * this.quarters + "M"),
      0 !== this.weeks && (e += this.weeks + "W"),
      0 !== this.days && (e += this.days + "D"),
      (0 === this.hours &&
        0 === this.minutes &&
        0 === this.seconds &&
        0 === this.milliseconds) ||
        (e += "T"),
      0 !== this.hours && (e += this.hours + "H"),
      0 !== this.minutes && (e += this.minutes + "M"),
      (0 === this.seconds && 0 === this.milliseconds) ||
        (e += wt(this.seconds + this.milliseconds / 1e3, 3) + "S"),
      "P" === e && (e += "T0S"),
      e
    );
  }
  toISOTime(e = {}) {
    var t;
    return !this.isValid || (t = this.toMillis()) < 0 || 864e5 <= t
      ? null
      : ((e = {
          suppressMilliseconds: !1,
          suppressSeconds: !1,
          includePrefix: !1,
          format: "extended",
          ...e,
          includeOffset: !1,
        }),
        W.fromMillis(t, { zone: "UTC" }).toISOTime(e));
  }
  toJSON() {
    return this.toISO();
  }
  toString() {
    return this.toISO();
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.isValid
      ? `Duration { values: ${JSON.stringify(this.values)} }`
      : `Duration { Invalid, reason: ${this.invalidReason} }`;
  }
  toMillis() {
    return this.isValid ? Ur(this.matrix, this.values) : NaN;
  }
  valueOf() {
    return this.toMillis();
  }
  plus(e) {
    if (!this.isValid) return this;
    var t = V.fromDurationLike(e),
      r = {};
    for (const n of M)
      (m(t.values, n) || m(this.values, n)) && (r[n] = t.get(n) + this.get(n));
    return I(this, { values: r }, !0);
  }
  minus(e) {
    return this.isValid
      ? ((e = V.fromDurationLike(e)), this.plus(e.negate()))
      : this;
  }
  mapUnits(e) {
    if (!this.isValid) return this;
    var t = {};
    for (const r of Object.keys(this.values)) t[r] = Dt(e(this.values[r], r));
    return I(this, { values: t }, !0);
  }
  get(e) {
    return this[V.normalizeUnit(e)];
  }
  set(e) {
    return this.isValid
      ? I(this, { values: { ...this.values, ...Mt(e, V.normalizeUnit) } })
      : this;
  }
  reconfigure({
    locale: e,
    numberingSystem: t,
    conversionAccuracy: r,
    matrix: n,
  } = {}) {
    e = this.loc.clone({ locale: e, numberingSystem: t });
    return I(this, { loc: e, matrix: n, conversionAccuracy: r });
  }
  as(e) {
    return this.isValid ? this.shiftTo(e).get(e) : NaN;
  }
  normalize() {
    var e;
    return this.isValid
      ? ((e = this.toObject()), _r(this.matrix, e), I(this, { values: e }, !0))
      : this;
  }
  rescale() {
    var e;
    return this.isValid
      ? ((e = Yr(this.normalize().shiftToAll().toObject())),
        I(this, { values: e }, !0))
      : this;
  }
  shiftTo(...e) {
    if (!this.isValid) return this;
    if (0 === e.length) return this;
    e = e.map((e) => V.normalizeUnit(e));
    var t = {},
      r = {},
      n = this.toObject();
    let s;
    for (const a of M)
      if (0 <= e.indexOf(a)) {
        s = a;
        let e = 0;
        for (const o in r) (e += this.matrix[o][a] * r[o]), (r[o] = 0);
        h(n[a]) && (e += n[a]);
        var i = Math.trunc(e);
        (t[a] = i), (r[a] = (1e3 * e - 1e3 * i) / 1e3);
      } else h(n[a]) && (r[a] = n[a]);
    for (const u in r)
      0 !== r[u] && (t[s] += u === s ? r[u] : r[u] / this.matrix[s][u]);
    return _r(this.matrix, t), I(this, { values: t }, !0);
  }
  shiftToAll() {
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
  }
  negate() {
    if (!this.isValid) return this;
    var e = {};
    for (const t of Object.keys(this.values))
      e[t] = 0 === this.values[t] ? 0 : -this.values[t];
    return I(this, { values: e }, !0);
  }
  get years() {
    return this.isValid ? this.values.years || 0 : NaN;
  }
  get quarters() {
    return this.isValid ? this.values.quarters || 0 : NaN;
  }
  get months() {
    return this.isValid ? this.values.months || 0 : NaN;
  }
  get weeks() {
    return this.isValid ? this.values.weeks || 0 : NaN;
  }
  get days() {
    return this.isValid ? this.values.days || 0 : NaN;
  }
  get hours() {
    return this.isValid ? this.values.hours || 0 : NaN;
  }
  get minutes() {
    return this.isValid ? this.values.minutes || 0 : NaN;
  }
  get seconds() {
    return this.isValid ? this.values.seconds || 0 : NaN;
  }
  get milliseconds() {
    return this.isValid ? this.values.milliseconds || 0 : NaN;
  }
  get isValid() {
    return null === this.invalid;
  }
  get invalidReason() {
    return this.invalid ? this.invalid.reason : null;
  }
  get invalidExplanation() {
    return this.invalid ? this.invalid.explanation : null;
  }
  equals(e) {
    if (!this.isValid || !e.isValid) return !1;
    if (!this.loc.equals(e.loc)) return !1;
    for (const n of M)
      if (
        ((t = this.values[n]),
        (r = e.values[n]),
        !(void 0 === t || 0 === t ? void 0 === r || 0 === r : t === r))
      )
        return !1;
    var t, r;
    return !0;
  }
}
const Hr = "Invalid Interval";
function Rr(e, t) {
  return e && e.isValid
    ? t && t.isValid
      ? t < e
        ? E.invalid(
            "end before start",
            `The end of an interval must be after its start, but you had start=${e.toISO()} and end=` +
              t.toISO()
          )
        : null
      : E.invalid("missing or invalid end")
    : E.invalid("missing or invalid start");
}
class E {
  constructor(e) {
    (this.s = e.start),
      (this.e = e.end),
      (this.invalid = e.invalid || null),
      (this.isLuxonInterval = !0);
  }
  static invalid(e, t = null) {
    if (!e) throw new o("need to specify a reason the Interval is invalid");
    e = e instanceof l ? e : new l(e, t);
    if (k.throwOnInvalid) throw new z(e);
    return new E({ invalid: e });
  }
  static fromDateTimes(e, t) {
    var e = Wn(e),
      t = Wn(t),
      r = Rr(e, t);
    return null == r ? new E({ start: e, end: t }) : r;
  }
  static after(e, t) {
    (t = V.fromDurationLike(t)), (e = Wn(e));
    return E.fromDateTimes(e, e.plus(t));
  }
  static before(e, t) {
    (t = V.fromDurationLike(t)), (e = Wn(e));
    return E.fromDateTimes(e.minus(t), e);
  }
  static fromISO(e, s) {
    var [i, a] = (e || "").split("/", 2);
    if (i && a) {
      let e, t;
      try {
        (e = W.fromISO(i, s)), (t = e.isValid);
      } catch (a) {
        t = !1;
      }
      let r, n;
      try {
        (r = W.fromISO(a, s)), (n = r.isValid);
      } catch (a) {
        n = !1;
      }
      if (t && n) return E.fromDateTimes(e, r);
      if (t) {
        var o = V.fromISO(a, s);
        if (o.isValid) return E.after(e, o);
      } else if (n) {
        o = V.fromISO(i, s);
        if (o.isValid) return E.before(r, o);
      }
    }
    return E.invalid(
      "unparsable",
      `the input "${e}" can't be parsed as ISO 8601`
    );
  }
  static isInterval(e) {
    return (e && e.isLuxonInterval) || !1;
  }
  get start() {
    return this.isValid ? this.s : null;
  }
  get end() {
    return this.isValid ? this.e : null;
  }
  get isValid() {
    return null === this.invalidReason;
  }
  get invalidReason() {
    return this.invalid ? this.invalid.reason : null;
  }
  get invalidExplanation() {
    return this.invalid ? this.invalid.explanation : null;
  }
  length(e = "milliseconds") {
    return this.isValid ? this.toDuration(e).get(e) : NaN;
  }
  count(e = "milliseconds", t) {
    if (!this.isValid) return NaN;
    var r = this.start.startOf(e, t);
    let n;
    return (
      (n = (n = t?.useLocaleWeeks
        ? this.end.reconfigure({ locale: r.locale })
        : this.end).startOf(e, t)),
      Math.floor(n.diff(r, e).get(e)) + (n.valueOf() !== this.end.valueOf())
    );
  }
  hasSame(e) {
    return (
      !!this.isValid && (this.isEmpty() || this.e.minus(1).hasSame(this.s, e))
    );
  }
  isEmpty() {
    return this.s.valueOf() === this.e.valueOf();
  }
  isAfter(e) {
    return !!this.isValid && this.s > e;
  }
  isBefore(e) {
    return !!this.isValid && this.e <= e;
  }
  contains(e) {
    return !!this.isValid && this.s <= e && this.e > e;
  }
  set({ start: e, end: t } = {}) {
    return this.isValid ? E.fromDateTimes(e || this.s, t || this.e) : this;
  }
  splitAt(...e) {
    if (!this.isValid) return [];
    var t = e
        .map(Wn)
        .filter((e) => this.contains(e))
        .sort((e, t) => e.toMillis() - t.toMillis()),
      r = [];
    let n = this["s"],
      s = 0;
    for (; n < this.e; ) {
      var i = t[s] || this.e,
        i = +i > +this.e ? this.e : i;
      r.push(E.fromDateTimes(n, i)), (n = i), (s += 1);
    }
    return r;
  }
  splitBy(e) {
    var t = V.fromDurationLike(e);
    if (!this.isValid || !t.isValid || 0 === t.as("milliseconds")) return [];
    let r = this["s"],
      n = 1,
      s;
    for (var i = []; r < this.e; ) {
      var a = this.start.plus(t.mapUnits((e) => e * n));
      (s = +a > +this.e ? this.e : a),
        i.push(E.fromDateTimes(r, s)),
        (r = s),
        (n += 1);
    }
    return i;
  }
  divideEqually(e) {
    return this.isValid ? this.splitBy(this.length() / e).slice(0, e) : [];
  }
  overlaps(e) {
    return this.e > e.s && this.s < e.e;
  }
  abutsStart(e) {
    return !!this.isValid && +this.e == +e.s;
  }
  abutsEnd(e) {
    return !!this.isValid && +e.e == +this.s;
  }
  engulfs(e) {
    return !!this.isValid && this.s <= e.s && this.e >= e.e;
  }
  equals(e) {
    return (
      !(!this.isValid || !e.isValid) && this.s.equals(e.s) && this.e.equals(e.e)
    );
  }
  intersection(e) {
    var t;
    return this.isValid
      ? ((t = (this.s > e.s ? this : e).s),
        (e = (this.e < e.e ? this : e).e) <= t ? null : E.fromDateTimes(t, e))
      : this;
  }
  union(e) {
    var t;
    return this.isValid
      ? ((t = (this.s < e.s ? this : e).s),
        (e = (this.e > e.e ? this : e).e),
        E.fromDateTimes(t, e))
      : this;
  }
  static merge(e) {
    var [e, t] = e
      .sort((e, t) => e.s - t.s)
      .reduce(
        ([e, t], r) =>
          t
            ? t.overlaps(r) || t.abutsStart(r)
              ? [e, t.union(r)]
              : [e.concat([t]), r]
            : [e, r],
        [[], null]
      );
    return t && e.push(t), e;
  }
  static xor(e) {
    let t = null,
      r = 0;
    var n = [],
      e = e.map((e) => [
        { time: e.s, type: "s" },
        { time: e.e, type: "e" },
      ]);
    for (const s of Array.prototype
      .concat(...e)
      .sort((e, t) => e.time - t.time))
      (r += "s" === s.type ? 1 : -1),
        (t =
          1 === r
            ? s.time
            : (t && +t != +s.time && n.push(E.fromDateTimes(t, s.time)), null));
    return E.merge(n);
  }
  difference(...e) {
    return E.xor([this].concat(e))
      .map((e) => this.intersection(e))
      .filter((e) => e && !e.isEmpty());
  }
  toString() {
    return this.isValid ? `[${this.s.toISO()} – ${this.e.toISO()})` : Hr;
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.isValid
      ? `Interval { start: ${this.s.toISO()}, end: ${this.e.toISO()} }`
      : `Interval { Invalid, reason: ${this.invalidReason} }`;
  }
  toLocaleString(e = q, t = {}) {
    return this.isValid
      ? b.create(this.s.loc.clone(t), e).formatInterval(this)
      : Hr;
  }
  toISO(e) {
    return this.isValid ? this.s.toISO(e) + "/" + this.e.toISO(e) : Hr;
  }
  toISODate() {
    return this.isValid ? this.s.toISODate() + "/" + this.e.toISODate() : Hr;
  }
  toISOTime(e) {
    return this.isValid ? this.s.toISOTime(e) + "/" + this.e.toISOTime(e) : Hr;
  }
  toFormat(e, { separator: t = " – " } = {}) {
    return this.isValid ? "" + this.s.toFormat(e) + t + this.e.toFormat(e) : Hr;
  }
  toDuration(e, t) {
    return this.isValid
      ? this.e.diff(this.s, e, t)
      : V.invalid(this.invalidReason);
  }
  mapEndpoints(e) {
    return E.fromDateTimes(e(this.s), e(this.e));
  }
}
class Jr {
  static hasDST(e = k.defaultZone) {
    var t = W.now().setZone(e).set({ month: 12 });
    return !e.isUniversal && t.offset !== t.set({ month: 6 }).offset;
  }
  static isValidIANAZone(e) {
    return u.isValidZone(e);
  }
  static normalizeZone(e) {
    return p(e, k.defaultZone);
  }
  static getStartOfWeek({ locale: e = null, locObj: t = null } = {}) {
    return (t || v.create(e)).getStartOfWeek();
  }
  static getMinimumDaysInFirstWeek({
    locale: e = null,
    locObj: t = null,
  } = {}) {
    return (t || v.create(e)).getMinDaysInFirstWeek();
  }
  static getWeekendWeekdays({ locale: e = null, locObj: t = null } = {}) {
    return (t || v.create(e)).getWeekendDays().slice();
  }
  static months(
    e = "long",
    {
      locale: t = null,
      numberingSystem: r = null,
      locObj: n = null,
      outputCalendar: s = "gregory",
    } = {}
  ) {
    return (n || v.create(t, r, s)).months(e);
  }
  static monthsFormat(
    e = "long",
    {
      locale: t = null,
      numberingSystem: r = null,
      locObj: n = null,
      outputCalendar: s = "gregory",
    } = {}
  ) {
    return (n || v.create(t, r, s)).months(e, !0);
  }
  static weekdays(
    e = "long",
    { locale: t = null, numberingSystem: r = null, locObj: n = null } = {}
  ) {
    return (n || v.create(t, r, null)).weekdays(e);
  }
  static weekdaysFormat(
    e = "long",
    { locale: t = null, numberingSystem: r = null, locObj: n = null } = {}
  ) {
    return (n || v.create(t, r, null)).weekdays(e, !0);
  }
  static meridiems({ locale: e = null } = {}) {
    return v.create(e).meridiems();
  }
  static eras(e = "short", { locale: t = null } = {}) {
    return v.create(t, null, "gregory").eras(e);
  }
  static features() {
    return { relative: ht(), localeWeek: dt() };
  }
}
function Pr(e, t) {
  var r = (e) => e.toUTC(0, { keepLocalTime: !0 }).startOf("day").valueOf(),
    t = r(t) - r(e);
  return Math.floor(V.fromMillis(t).as("days"));
}
function Gr(e, t, r, n) {
  let [s, i, a, o] = (function (e, t, r) {
    var n,
      s,
      i = {},
      a = e;
    let o, u;
    for ([n, s] of [
      ["years", (e, t) => t.year - e.year],
      ["quarters", (e, t) => t.quarter - e.quarter + 4 * (t.year - e.year)],
      ["months", (e, t) => t.month - e.month + 12 * (t.year - e.year)],
      [
        "weeks",
        (e, t) => {
          e = Pr(e, t);
          return (e - (e % 7)) / 7;
        },
      ],
      ["days", Pr],
    ])
      0 <= r.indexOf(n) &&
        ((i[(o = n)] = s(e, t)),
        (u = a.plus(i)) > t
          ? (i[n]--, t < (e = a.plus(i)) && ((u = e), i[n]--, (e = a.plus(i))))
          : (e = u));
    return [e, i, u, o];
  })(e, t, r);
  (e = t - s),
    (r = r.filter(
      (e) => 0 <= ["hours", "minutes", "seconds", "milliseconds"].indexOf(e)
    )),
    0 === r.length &&
      (a = a < t ? s.plus({ [o]: 1 }) : a) !== s &&
      (i[o] = (i[o] || 0) + e / (a - s)),
    (t = V.fromObject(i, n));
  return 0 < r.length
    ? V.fromMillis(e, n)
        .shiftTo(...r)
        .plus(t)
    : t;
}
const Br = {
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
  Qr = {
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
  Kr = Br.hanidec.replace(/[\[|\]]/g, "").split("");
function x({ numberingSystem: e }, t = "") {
  return new RegExp("" + Br[e || "latn"] + t);
}
const Xr = "missing Intl.DateTimeFormat.formatToParts support";
function C(e, t = (e) => e) {
  return {
    regex: e,
    deser: ([e]) =>
      t(
        (function (t) {
          let r = parseInt(t, 10);
          if (isNaN(r)) {
            r = "";
            for (let e = 0; e < t.length; e++) {
              var n = t.charCodeAt(e);
              if (-1 !== t[e].search(Br.hanidec)) r += Kr.indexOf(t[e]);
              else
                for (const a in Qr) {
                  var [s, i] = Qr[a];
                  s <= n && n <= i && (r += n - s);
                }
            }
            return parseInt(r, 10);
          }
          return r;
        })(e)
      ),
  };
}
const en = `[ ${String.fromCharCode(160)}]`,
  tn = new RegExp(en, "g");
function rn(e) {
  return e.replace(/\./g, "\\.?").replace(tn, en);
}
function nn(e) {
  return e.replace(/\./g, "").replace(tn, " ").toLowerCase();
}
function F(e, r) {
  return null === e
    ? null
    : {
        regex: RegExp(e.map(rn).join("|")),
        deser: ([t]) => e.findIndex((e) => nn(t) === nn(e)) + r,
      };
}
function sn(e, t) {
  return { regex: e, deser: ([, e, t]) => Nt(e, t), groups: t };
}
function an(e) {
  return { regex: e, deser: ([e]) => e };
}
const on = {
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
let un = null;
function ln(e, r) {
  return Array.prototype.concat(
    ...e.map((e) => {
      return (
        (t = r),
        (e = e).literal ||
        null == (t = dn(b.macroTokenToFormatOpts(e.val), t)) ||
        t.includes(void 0)
          ? e
          : t
      );
      var t;
    })
  );
}
function cn(y, e, t) {
  var t = ln(b.parseFormat(t), y),
    r = t.map((e) => {
      {
        var t = e,
          r = y;
        const n = x(r),
          s = x(r, "{2}"),
          i = x(r, "{3}"),
          a = x(r, "{4}"),
          o = x(r, "{6}"),
          u = x(r, "{1,2}"),
          l = x(r, "{1,3}"),
          c = x(r, "{1,6}"),
          h = x(r, "{1,9}"),
          d = x(r, "{2,4}"),
          m = x(r, "{4,6}"),
          f = (e) => ({
            regex: RegExp(e.val.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")),
            deser: ([e]) => e,
            literal: !0,
          });
        return (
          ((e = ((e) => {
            if (t.literal) return f(e);
            switch (e.val) {
              case "G":
                return F(r.eras("short"), 0);
              case "GG":
                return F(r.eras("long"), 0);
              case "y":
                return C(c);
              case "yy":
                return C(d, Ot);
              case "yyyy":
                return C(a);
              case "yyyyy":
                return C(m);
              case "yyyyyy":
                return C(o);
              case "M":
                return C(u);
              case "MM":
                return C(s);
              case "MMM":
                return F(r.months("short", !0), 1);
              case "MMMM":
                return F(r.months("long", !0), 1);
              case "L":
                return C(u);
              case "LL":
                return C(s);
              case "LLL":
                return F(r.months("short", !1), 1);
              case "LLLL":
                return F(r.months("long", !1), 1);
              case "d":
                return C(u);
              case "dd":
                return C(s);
              case "o":
                return C(l);
              case "ooo":
                return C(i);
              case "HH":
                return C(s);
              case "H":
                return C(u);
              case "hh":
                return C(s);
              case "h":
                return C(u);
              case "mm":
                return C(s);
              case "m":
              case "q":
                return C(u);
              case "qq":
                return C(s);
              case "s":
                return C(u);
              case "ss":
                return C(s);
              case "S":
                return C(l);
              case "SSS":
                return C(i);
              case "u":
                return an(h);
              case "uu":
                return an(u);
              case "uuu":
                return C(n);
              case "a":
                return F(r.meridiems(), 0);
              case "kkkk":
                return C(a);
              case "kk":
                return C(d, Ot);
              case "W":
                return C(u);
              case "WW":
                return C(s);
              case "E":
              case "c":
                return C(n);
              case "EEE":
                return F(r.weekdays("short", !1), 1);
              case "EEEE":
                return F(r.weekdays("long", !1), 1);
              case "ccc":
                return F(r.weekdays("short", !0), 1);
              case "cccc":
                return F(r.weekdays("long", !0), 1);
              case "Z":
              case "ZZ":
                return sn(
                  new RegExp(`([+-]${u.source})(?::(${s.source}))?`),
                  2
                );
              case "ZZZ":
                return sn(new RegExp(`([+-]${u.source})(${s.source})?`), 2);
              case "z":
                return an(/[a-z_+-/]{1,256}?/i);
              case " ":
                return an(/[^\S\n\r]/);
              default:
                return f(e);
            }
          })(t) || { invalidReason: Xr }).token = t),
          e
        );
      }
    }),
    n = r.find((e) => e.invalidReason);
  if (n) return { input: e, tokens: t, invalidReason: n.invalidReason };
  var [r, n] = [
      `^${(n = r)
        .map((e) => e.regex)
        .reduce((e, t) => `${e}(${t.source})`, "")}$`,
      n,
    ],
    r = RegExp(r, "i"),
    [n, s] = (function (e, t, r) {
      var n = e.match(t);
      if (n) {
        var s,
          i,
          a = {};
        let e = 1;
        for (const o in r)
          m(r, o) &&
            ((i = (s = r[o]).groups ? s.groups + 1 : 1),
            !s.literal &&
              s.token &&
              (a[s.token.val[0]] = s.deser(n.slice(e, e + i))),
            (e += i));
        return [n, a];
      }
      return [n, {}];
    })(e, r, n),
    [i, a, o] = s
      ? (function (n) {
          let e = null,
            t;
          return (
            S(n.z) || (e = u.create(n.z)),
            S(n.Z) || ((e = e || new d(n.Z)), (t = n.Z)),
            S(n.q) || (n.M = 3 * (n.q - 1) + 1),
            S(n.h) ||
              (n.h < 12 && 1 === n.a
                ? (n.h += 12)
                : 12 === n.h && 0 === n.a && (n.h = 0)),
            0 === n.G && n.y && (n.y = -n.y),
            S(n.u) || (n.S = gt(n.u)),
            [
              Object.keys(n).reduce((e, t) => {
                var r = ((e) => {
                  switch (e) {
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
                })(t);
                return r && (e[r] = n[t]), e;
              }, {}),
              e,
              t,
            ]
          );
        })(s)
      : [null, null, void 0];
  if (m(s, "a") && m(s, "H"))
    throw new w("Can't include meridiem when specifying 24-hour format");
  return {
    input: e,
    tokens: t,
    regex: r,
    rawMatches: n,
    matches: s,
    result: i,
    zone: a,
    specificOffset: o,
  };
}
function hn(e, t, r) {
  var { result: e, zone: t, specificOffset: r, invalidReason: n } = cn(e, t, r);
  return [e, t, r, n];
}
function dn(o, e) {
  if (!o) return null;
  var e = b.create(e, o).dtFormatter((un = un || W.fromMillis(1555555555555))),
    t = e.formatToParts();
  const u = e.resolvedOptions();
  return t.map((r) => {
    {
      var n = o,
        s = u,
        { type: r, value: i } = r;
      if ("literal" === r)
        return { literal: !(a = /^\s+$/.test(i)), val: a ? " " : i };
      var a = n[r];
      let e = r,
        t =
          ("hour" === r &&
            (e =
              null != n.hour12
                ? n.hour12
                  ? "hour12"
                  : "hour24"
                : null != n.hourCycle
                ? "h11" === n.hourCycle || "h12" === n.hourCycle
                  ? "hour12"
                  : "hour24"
                : s.hour12
                ? "hour12"
                : "hour24"),
          on[e]);
      return (t = "object" == typeof t ? t[a] : t)
        ? { literal: !1, val: t }
        : void 0;
    }
  });
}
const mn = "Invalid DateTime";
function fn(e) {
  return new l("unsupported zone", `the zone "${e.name}" is not supported`);
}
function yn(e) {
  return null === e.weekData && (e.weekData = et(e.c)), e.weekData;
}
function gn(e) {
  return (
    null === e.localWeekData &&
      (e.localWeekData = et(
        e.c,
        e.loc.getMinDaysInFirstWeek(),
        e.loc.getStartOfWeek()
      )),
    e.localWeekData
  );
}
function Z(e, t) {
  e = {
    ts: e.ts,
    zone: e.zone,
    c: e.c,
    o: e.o,
    loc: e.loc,
    invalid: e.invalid,
  };
  return new W({ ...e, ...t, old: e });
}
function wn(e, t, r) {
  var n = e - 60 * t * 1e3,
    s = r.offset(n);
  return t === s
    ? [n, t]
    : s === (r = r.offset((n -= 60 * (s - t) * 1e3)))
    ? [n, s]
    : [e - 60 * Math.min(s, r) * 1e3, Math.max(s, r)];
}
function vn(e, t) {
  e += 60 * t * 1e3;
  t = new Date(e);
  return {
    year: t.getUTCFullYear(),
    month: t.getUTCMonth() + 1,
    day: t.getUTCDate(),
    hour: t.getUTCHours(),
    minute: t.getUTCMinutes(),
    second: t.getUTCSeconds(),
    millisecond: t.getUTCMilliseconds(),
  };
}
function pn(e, t, r) {
  return wn(kt(e), t, r);
}
function kn(e, t) {
  var r = e.o,
    n = e.c.year + Math.trunc(t.years),
    s = e.c.month + Math.trunc(t.months) + 3 * Math.trunc(t.quarters),
    n = {
      ...e.c,
      year: n,
      month: s,
      day:
        Math.min(e.c.day, pt(n, s)) +
        Math.trunc(t.days) +
        7 * Math.trunc(t.weeks),
    },
    s = V.fromObject({
      years: t.years - Math.trunc(t.years),
      quarters: t.quarters - Math.trunc(t.quarters),
      months: t.months - Math.trunc(t.months),
      weeks: t.weeks - Math.trunc(t.weeks),
      days: t.days - Math.trunc(t.days),
      hours: t.hours,
      minutes: t.minutes,
      seconds: t.seconds,
      milliseconds: t.milliseconds,
    }).as("milliseconds");
  let [i, a] = wn(kt(n), r, e.zone);
  return 0 !== s && ((i += s), (a = e.zone.offset(i))), { ts: i, o: a };
}
function Sn(e, t, r, n, s, i) {
  var { setZone: a, zone: o } = r;
  return (e && 0 !== Object.keys(e).length) || t
    ? ((t = t || o),
      (e = W.fromObject(e, { ...r, zone: t, specificOffset: i })),
      a ? e : e.setZone(o))
    : W.invalid(
        new l("unparsable", `the input "${s}" can't be parsed as ` + n)
      );
}
function Tn(e, t, r = !0) {
  return e.isValid
    ? b
        .create(v.create("en-US"), { allowZ: r, forceSimple: !0 })
        .formatDateTimeFromString(e, t)
    : null;
}
function On(e, t) {
  var r = 9999 < e.c.year || e.c.year < 0;
  let n = "";
  return (
    r && 0 <= e.c.year && (n += "+"),
    (n += y(e.c.year, r ? 6 : 4)),
    (n = t
      ? (n = (n += "-") + y(e.c.month) + "-") + y(e.c.day)
      : (n += y(e.c.month)) + y(e.c.day))
  );
}
function bn(e, t, r, n, s, i) {
  let a = y(e.c.hour);
  return (
    t
      ? ((a = (a += ":") + y(e.c.minute)),
        (0 === e.c.millisecond && 0 === e.c.second && r) || (a += ":"))
      : (a += y(e.c.minute)),
    (0 === e.c.millisecond && 0 === e.c.second && r) ||
      ((a += y(e.c.second)), 0 === e.c.millisecond && n) ||
      (a = (a += ".") + y(e.c.millisecond, 3)),
    s &&
      (e.isOffsetFixed && 0 === e.offset && !i
        ? (a += "Z")
        : (a =
            e.o < 0
              ? (a = (a += "-") + y(Math.trunc(-e.o / 60)) + ":") +
                y(Math.trunc(-e.o % 60))
              : (a = (a += "+") + y(Math.trunc(e.o / 60)) + ":") +
                y(Math.trunc(e.o % 60)))),
    i && (a += "[" + e.zone.ianaName + "]"),
    a
  );
}
const Nn = { month: 1, day: 1, hour: 0, minute: 0, second: 0, millisecond: 0 },
  Dn = {
    weekNumber: 1,
    weekday: 1,
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
  },
  Mn = { ordinal: 1, hour: 0, minute: 0, second: 0, millisecond: 0 },
  In = ["year", "month", "day", "hour", "minute", "second", "millisecond"],
  Vn = [
    "weekYear",
    "weekNumber",
    "weekday",
    "hour",
    "minute",
    "second",
    "millisecond",
  ],
  En = ["year", "ordinal", "hour", "minute", "second", "millisecond"];
function xn(e) {
  switch (e.toLowerCase()) {
    case "localweekday":
    case "localweekdays":
      return "localWeekday";
    case "localweeknumber":
    case "localweeknumbers":
      return "localWeekNumber";
    case "localweekyear":
    case "localweekyears":
      return "localWeekYear";
    default:
      var t = e,
        r = {
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
      if (r) return r;
      throw new A(t);
  }
}
function Cn(e, t) {
  var r = p(t.zone, k.defaultZone),
    t = v.fromObject(t),
    n = k.now();
  let s, i;
  if (S(e.year)) s = n;
  else {
    for (const o of In) S(e[o]) && (e[o] = Nn[o]);
    var a = ot(e) || ut(e);
    if (a) return W.invalid(a);
    a = r.offset(n);
    [s, i] = pn(e, a, r);
  }
  return new W({ ts: s, zone: r, loc: t, o: i });
}
function Fn(t, r, n) {
  const s = !!S(n.round) || n.round,
    e = (e, t) => {
      return (
        (e = wt(e, s || n.calendary ? 0 : 2, !0)),
        r.loc.clone(n).relFormatter(n).format(e, t)
      );
    },
    i = (e) =>
      n.calendary
        ? r.hasSame(t, e)
          ? 0
          : r.startOf(e).diff(t.startOf(e), e).get(e)
        : r.diff(t, e).get(e);
  if (n.unit) return e(i(n.unit), n.unit);
  for (const o of n.units) {
    var a = i(o);
    if (1 <= Math.abs(a)) return e(a, o);
  }
  return e(r < t ? -0 : 0, n.units[n.units.length - 1]);
}
function Zn(e) {
  let t = {},
    r;
  return (
    (r =
      0 < e.length && "object" == typeof e[e.length - 1]
        ? ((t = e[e.length - 1]), Array.from(e).slice(0, e.length - 1))
        : Array.from(e)),
    [t, r]
  );
}
class W {
  constructor(e) {
    var t,
      r = e.zone || k.defaultZone;
    let n =
        e.invalid ||
        (Number.isNaN(e.ts) ? new l("invalid input") : null) ||
        (r.isValid ? null : fn(r)),
      s = ((this.ts = S(e.ts) ? k.now() : e.ts), null),
      i = null;
    n ||
      (e.old && e.old.ts === this.ts && e.old.zone.equals(r)
        ? ([s, i] = [e.old.c, e.old.o])
        : ((t = r.offset(this.ts)),
          (s = vn(this.ts, t)),
          (n = Number.isNaN(s.year) ? new l("invalid input") : null),
          (s = n ? null : s),
          (i = n ? null : t))),
      (this._zone = r),
      (this.loc = e.loc || v.create()),
      (this.invalid = n),
      (this.weekData = null),
      (this.localWeekData = null),
      (this.c = s),
      (this.o = i),
      (this.isLuxonDateTime = !0);
  }
  static now() {
    return new W({});
  }
  static local() {
    var [e, t] = Zn(arguments),
      [t, r, n, s, i, a, o] = t;
    return Cn(
      {
        year: t,
        month: r,
        day: n,
        hour: s,
        minute: i,
        second: a,
        millisecond: o,
      },
      e
    );
  }
  static utc() {
    var [e, t] = Zn(arguments),
      [t, r, n, s, i, a, o] = t;
    return (
      (e.zone = d.utcInstance),
      Cn(
        {
          year: t,
          month: r,
          day: n,
          hour: s,
          minute: i,
          second: a,
          millisecond: o,
        },
        e
      )
    );
  }
  static fromJSDate(e, t = {}) {
    var r,
      e = ct(e) ? e.valueOf() : NaN;
    return Number.isNaN(e)
      ? W.invalid("invalid input")
      : (r = p(t.zone, k.defaultZone)).isValid
      ? new W({ ts: e, zone: r, loc: v.fromObject(t) })
      : W.invalid(fn(r));
  }
  static fromMillis(e, t = {}) {
    if (h(e))
      return e < -864e13 || 864e13 < e
        ? W.invalid("Timestamp out of range")
        : new W({
            ts: e,
            zone: p(t.zone, k.defaultZone),
            loc: v.fromObject(t),
          });
    throw new o(
      `fromMillis requires a numerical input, but received a ${typeof e} with value ` +
        e
    );
  }
  static fromSeconds(e, t = {}) {
    if (h(e))
      return new W({
        ts: 1e3 * e,
        zone: p(t.zone, k.defaultZone),
        loc: v.fromObject(t),
      });
    throw new o("fromSeconds requires a numerical input");
  }
  static fromObject(e, t = {}) {
    e = e || {};
    var r = p(t.zone, k.defaultZone);
    if (!r.isValid) return W.invalid(fn(r));
    var n = v.fromObject(t),
      s = Mt(e, xn),
      { minDaysInFirstWeek: i, startOfWeek: a } = st(s, n),
      o = k.now(),
      t = S(t.specificOffset) ? r.offset(o) : t.specificOffset,
      u = !S(s.ordinal),
      l = !S(s.year),
      c = !S(s.month) || !S(s.day),
      l = l || c,
      h = s.weekYear || s.weekNumber;
    if ((l || u) && h)
      throw new w(
        "Can't mix weekYear/weekNumber units with year/month/day or ordinals"
      );
    if (c && u) throw new w("Can't mix ordinal dates with month/day");
    c = h || (s.weekday && !l);
    let d,
      m,
      f = vn(o, t),
      y =
        (c
          ? ((d = Vn), (m = Dn), (f = et(f, i, a)))
          : u
          ? ((d = En), (m = Mn), (f = rt(f)))
          : ((d = In), (m = Nn)),
        !1);
    for (const g of d) S(s[g]) ? (y ? (s[g] = m[g]) : (s[g] = f[g])) : (y = !0);
    var h = (c ? it(s, i, a) : (u ? at : ot)(s)) || ut(s);
    return h
      ? W.invalid(h)
      : (([o, h] = pn(c ? tt(s, i, a) : u ? nt(s) : s, t, r)),
        (c = new W({ ts: o, zone: r, o: h, loc: n })),
        s.weekday && l && e.weekday !== c.weekday
          ? W.invalid(
              "mismatched weekday",
              `you can't specify both a weekday of ${s.weekday} and a date of ` +
                c.toISO()
            )
          : c);
  }
  static fromISO(e, t = {}) {
    var [r, n] = Nr(e);
    return Sn(r, n, t, "ISO 8601", e);
  }
  static fromRFC2822(e, t = {}) {
    var [r, n] = Dr(e);
    return Sn(r, n, t, "RFC 2822", e);
  }
  static fromHTTP(e, t = {}) {
    var [e, r] = Mr(e);
    return Sn(e, r, t, "HTTP", t);
  }
  static fromFormat(e, t, r = {}) {
    if (S(e) || S(t))
      throw new o("fromFormat requires an input string and a format");
    var { locale: n = null, numberingSystem: s = null } = r,
      [n, s, i, a] = hn(
        v.fromOpts({ locale: n, numberingSystem: s, defaultToEN: !0 }),
        e,
        t
      );
    return a ? W.invalid(a) : Sn(n, s, r, "format " + t, e, i);
  }
  static fromString(e, t, r = {}) {
    return W.fromFormat(e, t, r);
  }
  static fromSQL(e, t = {}) {
    var [r, n] = Zr(e);
    return Sn(r, n, t, "SQL", e);
  }
  static invalid(e, t = null) {
    if (!e) throw new o("need to specify a reason the DateTime is invalid");
    e = e instanceof l ? e : new l(e, t);
    if (k.throwOnInvalid) throw new L(e);
    return new W({ invalid: e });
  }
  static isDateTime(e) {
    return (e && e.isLuxonDateTime) || !1;
  }
  static parseFormatForOpts(e, t = {}) {
    e = dn(e, v.fromObject(t));
    return e ? e.map((e) => (e ? e.val : null)).join("") : null;
  }
  static expandFormat(e, t = {}) {
    return ln(b.parseFormat(e), v.fromObject(t))
      .map((e) => e.val)
      .join("");
  }
  get(e) {
    return this[e];
  }
  get isValid() {
    return null === this.invalid;
  }
  get invalidReason() {
    return this.invalid ? this.invalid.reason : null;
  }
  get invalidExplanation() {
    return this.invalid ? this.invalid.explanation : null;
  }
  get locale() {
    return this.isValid ? this.loc.locale : null;
  }
  get numberingSystem() {
    return this.isValid ? this.loc.numberingSystem : null;
  }
  get outputCalendar() {
    return this.isValid ? this.loc.outputCalendar : null;
  }
  get zone() {
    return this._zone;
  }
  get zoneName() {
    return this.isValid ? this.zone.name : null;
  }
  get year() {
    return this.isValid ? this.c.year : NaN;
  }
  get quarter() {
    return this.isValid ? Math.ceil(this.c.month / 3) : NaN;
  }
  get month() {
    return this.isValid ? this.c.month : NaN;
  }
  get day() {
    return this.isValid ? this.c.day : NaN;
  }
  get hour() {
    return this.isValid ? this.c.hour : NaN;
  }
  get minute() {
    return this.isValid ? this.c.minute : NaN;
  }
  get second() {
    return this.isValid ? this.c.second : NaN;
  }
  get millisecond() {
    return this.isValid ? this.c.millisecond : NaN;
  }
  get weekYear() {
    return this.isValid ? yn(this).weekYear : NaN;
  }
  get weekNumber() {
    return this.isValid ? yn(this).weekNumber : NaN;
  }
  get weekday() {
    return this.isValid ? yn(this).weekday : NaN;
  }
  get isWeekend() {
    return this.isValid && this.loc.getWeekendDays().includes(this.weekday);
  }
  get localWeekday() {
    return this.isValid ? gn(this).weekday : NaN;
  }
  get localWeekNumber() {
    return this.isValid ? gn(this).weekNumber : NaN;
  }
  get localWeekYear() {
    return this.isValid ? gn(this).weekYear : NaN;
  }
  get ordinal() {
    return this.isValid ? rt(this.c).ordinal : NaN;
  }
  get monthShort() {
    return this.isValid
      ? Jr.months("short", { locObj: this.loc })[this.month - 1]
      : null;
  }
  get monthLong() {
    return this.isValid
      ? Jr.months("long", { locObj: this.loc })[this.month - 1]
      : null;
  }
  get weekdayShort() {
    return this.isValid
      ? Jr.weekdays("short", { locObj: this.loc })[this.weekday - 1]
      : null;
  }
  get weekdayLong() {
    return this.isValid
      ? Jr.weekdays("long", { locObj: this.loc })[this.weekday - 1]
      : null;
  }
  get offset() {
    return this.isValid ? +this.o : NaN;
  }
  get offsetNameShort() {
    return this.isValid
      ? this.zone.offsetName(this.ts, { format: "short", locale: this.locale })
      : null;
  }
  get offsetNameLong() {
    return this.isValid
      ? this.zone.offsetName(this.ts, { format: "long", locale: this.locale })
      : null;
  }
  get isOffsetFixed() {
    return this.isValid ? this.zone.isUniversal : null;
  }
  get isInDST() {
    return (
      !this.isOffsetFixed &&
      (this.offset > this.set({ month: 1, day: 1 }).offset ||
        this.offset > this.set({ month: 5 }).offset)
    );
  }
  getPossibleOffsets() {
    var e, t, r, n;
    return this.isValid &&
      !this.isOffsetFixed &&
      ((e = kt(this.c)),
      (r = this.zone.offset(e - 864e5)),
      (n = this.zone.offset(e + 864e5)),
      (r = this.zone.offset(e - 6e4 * r)) !==
        (n = this.zone.offset(e - 6e4 * n))) &&
      ((t = e - 6e4 * n),
      (r = vn((e = e - 6e4 * r), r)),
      (n = vn(t, n)),
      r.hour === n.hour) &&
      r.minute === n.minute &&
      r.second === n.second &&
      r.millisecond === n.millisecond
      ? [Z(this, { ts: e }), Z(this, { ts: t })]
      : [this];
  }
  get isInLeapYear() {
    return vt(this.year);
  }
  get daysInMonth() {
    return pt(this.year, this.month);
  }
  get daysInYear() {
    return this.isValid ? O(this.year) : NaN;
  }
  get weeksInWeekYear() {
    return this.isValid ? Tt(this.weekYear) : NaN;
  }
  get weeksInLocalWeekYear() {
    return this.isValid
      ? Tt(
          this.localWeekYear,
          this.loc.getMinDaysInFirstWeek(),
          this.loc.getStartOfWeek()
        )
      : NaN;
  }
  resolvedLocaleOptions(e = {}) {
    var {
      locale: e,
      numberingSystem: t,
      calendar: r,
    } = b.create(this.loc.clone(e), e).resolvedOptions(this);
    return { locale: e, numberingSystem: t, outputCalendar: r };
  }
  toUTC(e = 0, t = {}) {
    return this.setZone(d.instance(e), t);
  }
  toLocal() {
    return this.setZone(k.defaultZone);
  }
  setZone(t, { keepLocalTime: r = !1, keepCalendarTime: n = !1 } = {}) {
    if ((t = p(t, k.defaultZone)).equals(this.zone)) return this;
    if (t.isValid) {
      let e = this.ts;
      return (
        (r || n) &&
          ((r = t.offset(this.ts)), (n = this.toObject()), ([e] = pn(n, r, t))),
        Z(this, { ts: e, zone: t })
      );
    }
    return W.invalid(fn(t));
  }
  reconfigure({ locale: e, numberingSystem: t, outputCalendar: r } = {}) {
    e = this.loc.clone({ locale: e, numberingSystem: t, outputCalendar: r });
    return Z(this, { loc: e });
  }
  setLocale(e) {
    return this.reconfigure({ locale: e });
  }
  set(e) {
    if (!this.isValid) return this;
    var e = Mt(e, xn),
      { minDaysInFirstWeek: t, startOfWeek: r } = st(e, this.loc),
      n = !S(e.weekYear) || !S(e.weekNumber) || !S(e.weekday),
      s = !S(e.ordinal),
      i = !S(e.year),
      a = !S(e.month) || !S(e.day),
      o = e.weekYear || e.weekNumber;
    if ((i || a || s) && o)
      throw new w(
        "Can't mix weekYear/weekNumber units with year/month/day or ordinals"
      );
    if (a && s) throw new w("Can't mix ordinal dates with month/day");
    let u;
    n
      ? (u = tt({ ...et(this.c, t, r), ...e }, t, r))
      : S(e.ordinal)
      ? ((u = { ...this.toObject(), ...e }),
        S(e.day) && (u.day = Math.min(pt(u.year, u.month), u.day)))
      : (u = nt({ ...rt(this.c), ...e }));
    var [i, o] = pn(u, this.o, this.zone);
    return Z(this, { ts: i, o: o });
  }
  plus(e) {
    return this.isValid ? Z(this, kn(this, V.fromDurationLike(e))) : this;
  }
  minus(e) {
    return this.isValid
      ? Z(this, kn(this, V.fromDurationLike(e).negate()))
      : this;
  }
  startOf(e, { useLocaleWeeks: t = !1 } = {}) {
    if (!this.isValid) return this;
    var r,
      n = {},
      e = V.normalizeUnit(e);
    switch (e) {
      case "years":
        n.month = 1;
      case "quarters":
      case "months":
        n.day = 1;
      case "weeks":
      case "days":
        n.hour = 0;
      case "hours":
        n.minute = 0;
      case "minutes":
        n.second = 0;
      case "seconds":
        n.millisecond = 0;
    }
    return (
      "weeks" === e &&
        (t
          ? ((t = this.loc.getStartOfWeek()),
            (r = this["weekday"]),
            r < t && (n.weekNumber = this.weekNumber - 1),
            (n.weekday = t))
          : (n.weekday = 1)),
      "quarters" === e &&
        ((r = Math.ceil(this.month / 3)), (n.month = 3 * (r - 1) + 1)),
      this.set(n)
    );
  }
  endOf(e, t) {
    return this.isValid
      ? this.plus({ [e]: 1 })
          .startOf(e, t)
          .minus(1)
      : this;
  }
  toFormat(e, t = {}) {
    return this.isValid
      ? b.create(this.loc.redefaultToEN(t)).formatDateTimeFromString(this, e)
      : mn;
  }
  toLocaleString(e = q, t = {}) {
    return this.isValid
      ? b.create(this.loc.clone(t), e).formatDateTime(this)
      : mn;
  }
  toLocaleParts(e = {}) {
    return this.isValid
      ? b.create(this.loc.clone(e), e).formatDateTimeParts(this)
      : [];
  }
  toISO({
    format: e = "extended",
    suppressSeconds: t = !1,
    suppressMilliseconds: r = !1,
    includeOffset: n = !0,
    extendedZone: s = !1,
  } = {}) {
    var i;
    return this.isValid
      ? ((i = On(this, (e = "extended" === e))),
        (i += "T") + bn(this, e, t, r, n, s))
      : null;
  }
  toISODate({ format: e = "extended" } = {}) {
    return this.isValid ? On(this, "extended" === e) : null;
  }
  toISOWeekDate() {
    return Tn(this, "kkkk-'W'WW-c");
  }
  toISOTime({
    suppressMilliseconds: e = !1,
    suppressSeconds: t = !1,
    includeOffset: r = !0,
    includePrefix: n = !1,
    extendedZone: s = !1,
    format: i = "extended",
  } = {}) {
    return this.isValid
      ? (n ? "T" : "") + bn(this, "extended" === i, t, e, r, s)
      : null;
  }
  toRFC2822() {
    return Tn(this, "EEE, dd LLL yyyy HH:mm:ss ZZZ", !1);
  }
  toHTTP() {
    return Tn(this.toUTC(), "EEE, dd LLL yyyy HH:mm:ss 'GMT'");
  }
  toSQLDate() {
    return this.isValid ? On(this, !0) : null;
  }
  toSQLTime({
    includeOffset: e = !0,
    includeZone: t = !1,
    includeOffsetSpace: r = !0,
  } = {}) {
    let n = "HH:mm:ss.SSS";
    return (
      (t || e) && (r && (n += " "), t ? (n += "z") : e && (n += "ZZ")),
      Tn(this, n, !0)
    );
  }
  toSQL(e = {}) {
    return this.isValid ? this.toSQLDate() + " " + this.toSQLTime(e) : null;
  }
  toString() {
    return this.isValid ? this.toISO() : mn;
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.isValid
      ? `DateTime { ts: ${this.toISO()}, zone: ${this.zone.name}, locale: ${
          this.locale
        } }`
      : `DateTime { Invalid, reason: ${this.invalidReason} }`;
  }
  valueOf() {
    return this.toMillis();
  }
  toMillis() {
    return this.isValid ? this.ts : NaN;
  }
  toSeconds() {
    return this.isValid ? this.ts / 1e3 : NaN;
  }
  toUnixInteger() {
    return this.isValid ? Math.floor(this.ts / 1e3) : NaN;
  }
  toJSON() {
    return this.toISO();
  }
  toBSON() {
    return this.toJSDate();
  }
  toObject(e = {}) {
    var t;
    return this.isValid
      ? ((t = { ...this.c }),
        e.includeConfig &&
          ((t.outputCalendar = this.outputCalendar),
          (t.numberingSystem = this.loc.numberingSystem),
          (t.locale = this.loc.locale)),
        t)
      : {};
  }
  toJSDate() {
    return new Date(this.isValid ? this.ts : NaN);
  }
  diff(e, t = "milliseconds", r = {}) {
    var n;
    return this.isValid && e.isValid
      ? ((r = {
          locale: this.locale,
          numberingSystem: this.numberingSystem,
          ...r,
        }),
        (t = mt(t).map(V.normalizeUnit)),
        (e = Gr(
          (n = e.valueOf() > this.valueOf()) ? this : e,
          n ? e : this,
          t,
          r
        )),
        n ? e.negate() : e)
      : V.invalid("created by diffing an invalid DateTime");
  }
  diffNow(e = "milliseconds", t = {}) {
    return this.diff(W.now(), e, t);
  }
  until(e) {
    return this.isValid ? E.fromDateTimes(this, e) : this;
  }
  hasSame(e, t, r) {
    var n;
    return (
      !!this.isValid &&
      ((n = e.valueOf()),
      (e = this.setZone(e.zone, { keepLocalTime: !0 })).startOf(t, r) <= n) &&
      n <= e.endOf(t, r)
    );
  }
  equals(e) {
    return (
      this.isValid &&
      e.isValid &&
      this.valueOf() === e.valueOf() &&
      this.zone.equals(e.zone) &&
      this.loc.equals(e.loc)
    );
  }
  toRelative(e = {}) {
    if (!this.isValid) return null;
    var t = e.base || W.fromObject({}, { zone: this.zone }),
      r = e.padding ? (this < t ? -e.padding : e.padding) : 0;
    let n = ["years", "months", "days", "hours", "minutes", "seconds"],
      s = e.unit;
    return (
      Array.isArray(e.unit) && ((n = e.unit), (s = void 0)),
      Fn(t, this.plus(r), { ...e, numeric: "always", units: n, unit: s })
    );
  }
  toRelativeCalendar(e = {}) {
    return this.isValid
      ? Fn(e.base || W.fromObject({}, { zone: this.zone }), this, {
          ...e,
          numeric: "auto",
          units: ["years", "months", "days"],
          calendary: !0,
        })
      : null;
  }
  static min(...e) {
    if (e.every(W.isDateTime)) return ft(e, (e) => e.valueOf(), Math.min);
    throw new o("min requires all arguments be DateTimes");
  }
  static max(...e) {
    if (e.every(W.isDateTime)) return ft(e, (e) => e.valueOf(), Math.max);
    throw new o("max requires all arguments be DateTimes");
  }
  static fromFormatExplain(e, t, r = {}) {
    var { locale: r = null, numberingSystem: n = null } = r;
    return cn(
      v.fromOpts({ locale: r, numberingSystem: n, defaultToEN: !0 }),
      e,
      t
    );
  }
  static fromStringExplain(e, t, r = {}) {
    return W.fromFormatExplain(e, t, r);
  }
  static get DATE_SHORT() {
    return q;
  }
  static get DATE_MED() {
    return $;
  }
  static get DATE_MED_WITH_WEEKDAY() {
    return U;
  }
  static get DATE_FULL() {
    return _;
  }
  static get DATE_HUGE() {
    return Y;
  }
  static get TIME_SIMPLE() {
    return H;
  }
  static get TIME_WITH_SECONDS() {
    return R;
  }
  static get TIME_WITH_SHORT_OFFSET() {
    return J;
  }
  static get TIME_WITH_LONG_OFFSET() {
    return P;
  }
  static get TIME_24_SIMPLE() {
    return G;
  }
  static get TIME_24_WITH_SECONDS() {
    return B;
  }
  static get TIME_24_WITH_SHORT_OFFSET() {
    return Q;
  }
  static get TIME_24_WITH_LONG_OFFSET() {
    return K;
  }
  static get DATETIME_SHORT() {
    return X;
  }
  static get DATETIME_SHORT_WITH_SECONDS() {
    return ee;
  }
  static get DATETIME_MED() {
    return te;
  }
  static get DATETIME_MED_WITH_SECONDS() {
    return re;
  }
  static get DATETIME_MED_WITH_WEEKDAY() {
    return ne;
  }
  static get DATETIME_FULL() {
    return se;
  }
  static get DATETIME_FULL_WITH_SECONDS() {
    return ie;
  }
  static get DATETIME_HUGE() {
    return ae;
  }
  static get DATETIME_HUGE_WITH_SECONDS() {
    return oe;
  }
}
function Wn(e) {
  if (W.isDateTime(e)) return e;
  if (e && e.valueOf && h(e.valueOf())) return W.fromJSDate(e);
  if (e && "object" == typeof e) return W.fromObject(e);
  throw new o(`Unknown datetime argument: ${e}, of type ` + typeof e);
}
s = "3.4.4";
export {
  W as DateTime,
  V as Duration,
  d as FixedOffsetZone,
  u as IANAZone,
  Jr as Info,
  E as Interval,
  Ae as InvalidZone,
  k as Settings,
  le as SystemZone,
  s as VERSION,
  i as Zone,
};
