import { defineComponent as H, ref as _, watchEffect as P, watch as I, unref as i, openBlock as R, createElementBlock as w, renderSlot as p, normalizeProps as v, mergeProps as g, createCommentVNode as L, createElementVNode as h, nextTick as B } from "vue";
function T(o) {
  return o.scrollHeight;
}
function W(o) {
  return o.scrollWidth;
}
function z(o, s) {
  o.scrollTop = o.scrollHeight - s + o.scrollTop;
}
function C(o, s) {
  o.scrollLeft = o.scrollWidth - s + o.scrollLeft;
}
const M = /* @__PURE__ */ h("div", { class: "loading" }, "Loading...", -1), j = /* @__PURE__ */ h("div", { class: "no-more" }, "No more.", -1), D = /* @__PURE__ */ h("div", { class: "no-results" }, "No results.", -1), A = /* @__PURE__ */ h("div", { class: "error" }, "Error.", -1), J = /* @__PURE__ */ H({
  __name: "VueEternalLoading",
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
  emits: ["update:isInitial"],
  setup(o, { emit: s }) {
    const t = o, l = _();
    let a = _("loading"), r = _(t.isInitial);
    const F = typeof process < "u" && process.env !== void 0 && process.env.NODE_ENV !== "test";
    let c = 0;
    function d() {
      B(() => {
        var e, n;
        t.position === "top" ? z(
          (e = t.container) != null ? e : document.documentElement,
          c
        ) : t.position === "left" && C(
          (n = t.container) != null ? n : document.documentElement,
          c
        );
      });
    }
    function N(e, n) {
      return e === 0 ? r.value ? (S(), "no-results") : (y(), "no-more") : e !== void 0 && n !== void 0 && e < n ? (y(), "no-more") : (r.value = !1, d(), f(), "loading");
    }
    function y() {
      r.value = !1, u("no-more"), d();
    }
    function S() {
      r.value = !1, u("no-results"), d();
    }
    function V() {
      r.value = !1, u("error"), d();
    }
    function q() {
      r.value = !0, u("loading"), f();
    }
    function E() {
      u("loading"), f();
    }
    function u(e) {
      a.value = e;
    }
    function b() {
      l.value && m.unobserve(l.value);
    }
    function f() {
      l.value && m.observe(l.value);
    }
    function O() {
      return new IntersectionObserver(
        ([e]) => {
          var n, k;
          e.isIntersecting && (t.position === "top" ? c = T(
            (n = t.container) != null ? n : document.documentElement
          ) : t.position === "left" && (c = W(
            (k = t.container) != null ? k : document.documentElement
          )), b(), t.load(
            {
              loaded: N,
              noMore: y,
              noResults: S,
              error: V
            },
            {
              isFirstLoad: r.value
            }
          ));
        },
        {
          root: t.container,
          threshold: 0,
          rootMargin: t.margin
        }
      );
    }
    let m;
    return typeof IntersectionObserver < "u" && P(
      () => {
        m && b(), m = O(), f();
      },
      {
        flush: "post"
      }
    ), I(
      () => t.isInitial,
      (e) => {
        e && q();
      }
    ), I(r, (e) => {
      e || s("update:isInitial", !1);
    }), (e, n) => i(F) ? L("", !0) : (R(), w("div", {
      key: 0,
      class: "vue-eternal-loading",
      ref_key: "rootRef",
      ref: l
    }, [
      i(a) === "loading" ? p(e.$slots, "loading", v(g({ key: 0 }, { isFirstLoad: i(r) })), () => [
        M
      ]) : i(a) === "no-more" ? p(e.$slots, "no-more", v(g({ key: 1 }, { retry: E })), () => [
        j
      ]) : i(a) === "no-results" ? p(e.$slots, "no-results", v(g({ key: 2 }, { retry: E })), () => [
        D
      ]) : i(a) === "error" ? p(e.$slots, "error", v(g({ key: 3 }, { retry: E })), () => [
        A
      ]) : L("", !0)
    ], 512));
  }
});
export {
  J as VueEternalLoading
};
