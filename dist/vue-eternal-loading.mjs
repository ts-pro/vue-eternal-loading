import { defineComponent as H, ref as _, watchEffect as N, watch as I, openBlock as O, createElementBlock as P, unref as u, renderSlot as v, normalizeProps as p, mergeProps as g, createCommentVNode as w, createElementVNode as h, nextTick as B } from "vue";
function R(o) {
  return o.scrollHeight;
}
function T(o) {
  return o.scrollWidth;
}
function W(o, i) {
  o.scrollTop = o.scrollHeight - i + o.scrollTop;
}
function z(o, i) {
  o.scrollLeft = o.scrollWidth - i + o.scrollLeft;
}
const C = /* @__PURE__ */ h("div", { class: "loading" }, "Loading...", -1), M = /* @__PURE__ */ h("div", { class: "no-more" }, "No more.", -1), j = /* @__PURE__ */ h("div", { class: "no-results" }, "No results.", -1), A = /* @__PURE__ */ h("div", { class: "error" }, "Error.", -1), G = /* @__PURE__ */ H({
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
  setup(o, { emit: i }) {
    const t = o, l = _();
    let s = _("loading"), r = _(t.isInitial), c = 0;
    function f() {
      B(() => {
        var e, n;
        t.position === "top" ? W(
          (e = t.container) != null ? e : document.documentElement,
          c
        ) : t.position === "left" && z(
          (n = t.container) != null ? n : document.documentElement,
          c
        );
      });
    }
    function L(e, n) {
      return e === 0 ? r.value ? (b(), "no-results") : (y(), "no-more") : e !== void 0 && n !== void 0 && e < n ? (y(), "no-more") : (r.value = !1, f(), d(), "loading");
    }
    function y() {
      r.value = !1, a("no-more"), f();
    }
    function b() {
      r.value = !1, a("no-results"), f();
    }
    function F() {
      r.value = !1, a("error"), f();
    }
    function q() {
      r.value = !0, a("loading"), d();
    }
    function E() {
      a("loading"), d();
    }
    function a(e) {
      s.value = e;
    }
    function S() {
      l.value && m.unobserve(l.value);
    }
    function d() {
      l.value && m.observe(l.value);
    }
    function V() {
      return new IntersectionObserver(
        ([e]) => {
          var n, k;
          e.isIntersecting && (t.position === "top" ? c = R(
            (n = t.container) != null ? n : document.documentElement
          ) : t.position === "left" && (c = T(
            (k = t.container) != null ? k : document.documentElement
          )), S(), t.load(
            {
              loaded: L,
              noMore: y,
              noResults: b,
              error: F
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
    return typeof IntersectionObserver < "u" && N(
      () => {
        m && S(), m = V(), d();
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
      e || i("update:isInitial", !1);
    }), (e, n) => (O(), P("div", {
      class: "vue-eternal-loading",
      ref_key: "rootRef",
      ref: l
    }, [
      u(s) === "loading" ? v(e.$slots, "loading", p(g({ key: 0 }, { isFirstLoad: u(r) })), () => [
        C
      ]) : u(s) === "no-more" ? v(e.$slots, "no-more", p(g({ key: 1 }, { retry: E })), () => [
        M
      ]) : u(s) === "no-results" ? v(e.$slots, "no-results", p(g({ key: 2 }, { retry: E })), () => [
        j
      ]) : u(s) === "error" ? v(e.$slots, "error", p(g({ key: 3 }, { retry: E })), () => [
        A
      ]) : w("", !0)
    ], 512));
  }
});
export {
  G as VueEternalLoading
};
