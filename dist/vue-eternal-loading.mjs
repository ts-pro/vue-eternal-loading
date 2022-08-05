import { defineComponent as q, ref as h, watchEffect as O, watch as S, nextTick as V, openBlock as H, createElementBlock as N, renderSlot as f, normalizeProps as m, mergeProps as v, createCommentVNode as P, createElementVNode as g } from "vue";
function $(e) {
  return e.scrollHeight;
}
function w(e) {
  return e.scrollWidth;
}
function B(e, n) {
  e.scrollTop = e.scrollHeight - n + e.scrollTop;
}
function R(e, n) {
  e.scrollLeft = e.scrollWidth - n + e.scrollLeft;
}
const T = q({
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
    let l = h("loading"), o = h(e.isInitial), s = 0;
    function u() {
      V(() => {
        var t, i;
        e.position === "top" ? B(
          (t = e.container) != null ? t : document.documentElement,
          s
        ) : e.position === "left" && R(
          (i = e.container) != null ? i : document.documentElement,
          s
        );
      });
    }
    function k(t, i) {
      return t === 0 ? o.value ? (E(), "no-results") : (y(), "no-more") : t !== void 0 && i !== void 0 && t < i ? (y(), "no-more") : (o.value = !1, u(), c(), "loading");
    }
    function y() {
      o.value = !1, a("no-more"), u();
    }
    function E() {
      o.value = !1, a("no-results"), u();
    }
    function _() {
      o.value = !1, a("error"), u();
    }
    function p() {
      o.value = !0, a("loading"), c();
    }
    function F() {
      a("loading"), c();
    }
    function a(t) {
      l.value = t;
    }
    function b() {
      r.value && d.unobserve(r.value);
    }
    function c() {
      r.value && d.observe(r.value);
    }
    function I() {
      return new IntersectionObserver(
        ([t]) => {
          var i, L;
          t.isIntersecting && (e.position === "top" ? s = $(
            (i = e.container) != null ? i : document.documentElement
          ) : e.position === "left" && (s = w(
            (L = e.container) != null ? L : document.documentElement
          )), b(), e.load(
            {
              loaded: k,
              noMore: y,
              noResults: E,
              error: _
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
    return typeof IntersectionObserver < "u" && O(
      () => {
        d && b(), d = I(), c();
      },
      {
        flush: "post"
      }
    ), S(
      () => e.isInitial,
      (t) => {
        t && p();
      }
    ), S(o, (t) => {
      t || n.emit("update:isInitial", !1);
    }), {
      rootRef: r,
      state: l,
      isFirstLoad: o,
      retry: F
    };
  }
}), W = (e, n) => {
  const r = e.__vccOpts || e;
  for (const [l, o] of n)
    r[l] = o;
  return r;
}, z = {
  class: "vue-eternal-loading",
  ref: "rootRef"
}, C = /* @__PURE__ */ g("div", { class: "loading" }, "Loading...", -1), M = /* @__PURE__ */ g("div", { class: "no-more" }, "No more.", -1), j = /* @__PURE__ */ g("div", { class: "no-results" }, "No results.", -1), A = /* @__PURE__ */ g("div", { class: "error" }, "Error.", -1);
function D(e, n, r, l, o, s) {
  return H(), N("div", z, [
    e.state === "loading" ? f(e.$slots, "loading", m(v({ key: 0 }, { isFirstLoad: e.isFirstLoad })), () => [
      C
    ]) : e.state === "no-more" ? f(e.$slots, "no-more", m(v({ key: 1 }, { retry: e.retry })), () => [
      M
    ]) : e.state === "no-results" ? f(e.$slots, "no-results", m(v({ key: 2 }, { retry: e.retry })), () => [
      j
    ]) : e.state === "error" ? f(e.$slots, "error", m(v({ key: 3 }, { retry: e.retry })), () => [
      A
    ]) : P("", !0)
  ], 512);
}
const J = /* @__PURE__ */ W(T, [["render", D]]);
export {
  J as VueEternalLoading
};
