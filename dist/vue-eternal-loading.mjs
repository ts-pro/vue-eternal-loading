import { defineComponent as R, ref as h, watchEffect as V, watch as k, nextTick as H, openBlock as N, createElementBlock as P, renderSlot as f, normalizeProps as m, mergeProps as v, createCommentVNode as L, createElementVNode as g } from "vue";
function $(e) {
  return e.scrollHeight;
}
function w(e) {
  return e.scrollWidth;
}
function B(e, n) {
  e.scrollTop = e.scrollHeight - n + e.scrollTop;
}
function T(e, n) {
  e.scrollLeft = e.scrollWidth - n + e.scrollLeft;
}
const W = R({
  name: "VueEternalLoading",
  props: {
    load: {
      required: !0,
      type: Function
    },
    isInitial: {
      required: !1,
      type: Boolean,
      default: !0
    },
    position: {
      required: !1,
      type: String,
      default: "default"
    },
    container: {
      required: !1,
      type: Object,
      default: null
    },
    margin: {
      required: !1,
      type: String,
      default: void 0
    }
  },
  setup(e, n) {
    const r = h();
    let s = h("loading"), o = h(e.isInitial);
    const S = typeof process < "u" && process.env !== void 0;
    let a = 0;
    function u() {
      H(() => {
        var t, i;
        e.position === "top" ? B(
          (t = e.container) != null ? t : document.documentElement,
          a
        ) : e.position === "left" && T(
          (i = e.container) != null ? i : document.documentElement,
          a
        );
      });
    }
    function F(t, i) {
      return t === 0 ? o.value ? (E(), "no-results") : (y(), "no-more") : t !== void 0 && i !== void 0 && t < i ? (y(), "no-more") : (o.value = !1, u(), c(), "loading");
    }
    function y() {
      o.value = !1, l("no-more"), u();
    }
    function E() {
      o.value = !1, l("no-results"), u();
    }
    function I() {
      o.value = !1, l("error"), u();
    }
    function _() {
      o.value = !0, l("loading"), c();
    }
    function q() {
      l("loading"), c();
    }
    function l(t) {
      s.value = t;
    }
    function p() {
      r.value && d.unobserve(r.value);
    }
    function c() {
      r.value && d.observe(r.value);
    }
    function O() {
      return new IntersectionObserver(
        ([t]) => {
          var i, b;
          t.isIntersecting && (e.position === "top" ? a = $(
            (i = e.container) != null ? i : document.documentElement
          ) : e.position === "left" && (a = w(
            (b = e.container) != null ? b : document.documentElement
          )), p(), e.load(
            {
              loaded: F,
              noMore: y,
              noResults: E,
              error: I
            },
            {
              isFirstLoad: o.value
            }
          ));
        },
        {
          root: e.container,
          threshold: 0,
          rootMargin: e.margin
        }
      );
    }
    let d;
    return typeof IntersectionObserver < "u" && V(
      () => {
        d && p(), d = O(), c();
      },
      {
        flush: "post"
      }
    ), k(
      () => e.isInitial,
      (t) => {
        t && _();
      }
    ), k(o, (t) => {
      t || n.emit("update:isInitial", !1);
    }), {
      rootRef: r,
      state: s,
      isFirstLoad: o,
      retry: q,
      isSSR: S
    };
  }
}), z = (e, n) => {
  const r = e.__vccOpts || e;
  for (const [s, o] of n)
    r[s] = o;
  return r;
}, C = {
  key: 0,
  class: "vue-eternal-loading",
  ref: "rootRef"
}, M = /* @__PURE__ */ g("div", { class: "loading" }, "Loading...", -1), j = /* @__PURE__ */ g("div", { class: "no-more" }, "No more.", -1), A = /* @__PURE__ */ g("div", { class: "no-results" }, "No results.", -1), D = /* @__PURE__ */ g("div", { class: "error" }, "Error.", -1);
function G(e, n, r, s, o, S) {
  return e.isSSR ? L("", !0) : (N(), P("div", C, [
    e.state === "loading" ? f(e.$slots, "loading", m(v({ key: 0 }, { isFirstLoad: e.isFirstLoad })), () => [
      M
    ]) : e.state === "no-more" ? f(e.$slots, "no-more", m(v({ key: 1 }, { retry: e.retry })), () => [
      j
    ]) : e.state === "no-results" ? f(e.$slots, "no-results", m(v({ key: 2 }, { retry: e.retry })), () => [
      A
    ]) : e.state === "error" ? f(e.$slots, "error", m(v({ key: 3 }, { retry: e.retry })), () => [
      D
    ]) : L("", !0)
  ], 512));
}
const K = /* @__PURE__ */ z(W, [["render", G]]);
export {
  K as VueEternalLoading
};
