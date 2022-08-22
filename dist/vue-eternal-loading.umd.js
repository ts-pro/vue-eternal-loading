(function (l, t) {
  typeof exports == 'object' && typeof module < 'u'
    ? t(exports, require('vue'))
    : typeof define == 'function' && define.amd
    ? define(['exports', 'vue'], t)
    : ((l = typeof globalThis < 'u' ? globalThis : l || self),
      t((l.TSPro = {}), l.Vue));
})(this, function (l, t) {
  'use strict';
  function E(e) {
    return e.scrollHeight;
  }
  function P(e) {
    return e.scrollWidth;
  }
  function b(e, i) {
    e.scrollTop = e.scrollHeight - i + e.scrollTop;
  }
  function V(e, i) {
    e.scrollLeft = e.scrollWidth - i + e.scrollLeft;
  }
  const v = t.defineComponent({
      name: 'VueEternalLoading',
      props: {
        load: { required: !0, type: Function },
        isInitial: { required: !1, type: Boolean, default: !0 },
        position: { required: !1, type: String, default: 'default' },
        container: { required: !1, type: Object, default: null },
        margin: { required: !1, type: String, default: void 0 },
      },
      setup(e, i) {
        const n = t.ref();
        let a = t.ref('loading'),
          r = t.ref(e.isInitial);
        const y = typeof process < 'u' && process.env !== void 0;
        let c = 0;
        function f() {
          t.nextTick(() => {
            var o, s;
            e.position === 'top'
              ? b((o = e.container) != null ? o : document.documentElement, c)
              : e.position === 'left' &&
                V((s = e.container) != null ? s : document.documentElement, c);
          });
        }
        function O(o, s) {
          return o === 0
            ? r.value
              ? (h(), 'no-results')
              : (g(), 'no-more')
            : o !== void 0 && s !== void 0 && o < s
            ? (g(), 'no-more')
            : ((r.value = !1), f(), u(), 'loading');
        }
        function g() {
          (r.value = !1), d('no-more'), f();
        }
        function h() {
          (r.value = !1), d('no-results'), f();
        }
        function z() {
          (r.value = !1), d('error'), f();
        }
        function R() {
          (r.value = !0), d('loading'), u();
        }
        function w() {
          d('loading'), u();
        }
        function d(o) {
          a.value = o;
        }
        function p() {
          n.value && m.unobserve(n.value);
        }
        function u() {
          n.value && m.observe(n.value);
        }
        function H() {
          return new IntersectionObserver(
            ([o]) => {
              var s, S;
              o.isIntersecting &&
                (e.position === 'top'
                  ? (c = E(
                      (s = e.container) != null ? s : document.documentElement
                    ))
                  : e.position === 'left' &&
                    (c = P(
                      (S = e.container) != null ? S : document.documentElement
                    )),
                p(),
                e.load(
                  { loaded: O, noMore: g, noResults: h, error: z },
                  { isFirstLoad: r.value }
                ));
            },
            { root: e.container, threshold: 0, rootMargin: e.margin }
          );
        }
        let m;
        return (
          typeof IntersectionObserver < 'u' &&
            t.watchEffect(
              () => {
                m && p(), (m = H()), u();
              },
              { flush: 'post' }
            ),
          t.watch(
            () => e.isInitial,
            (o) => {
              o && R();
            }
          ),
          t.watch(r, (o) => {
            o || i.emit('update:isInitial', !1);
          }),
          { rootRef: n, state: a, isFirstLoad: r, retry: w, isSSR: y }
        );
      },
    }),
    L = (e, i) => {
      const n = e.__vccOpts || e;
      for (const [a, r] of i) n[a] = r;
      return n;
    },
    k = { key: 0, class: 'vue-eternal-loading', ref: 'rootRef' },
    _ = t.createElementVNode('div', { class: 'loading' }, 'Loading...', -1),
    N = t.createElementVNode('div', { class: 'no-more' }, 'No more.', -1),
    F = t.createElementVNode('div', { class: 'no-results' }, 'No results.', -1),
    I = t.createElementVNode('div', { class: 'error' }, 'Error.', -1);
  function T(e, i, n, a, r, y) {
    return e.isSSR
      ? t.createCommentVNode('', !0)
      : (t.openBlock(),
        t.createElementBlock(
          'div',
          k,
          [
            e.state === 'loading'
              ? t.renderSlot(
                  e.$slots,
                  'loading',
                  t.normalizeProps(
                    t.mergeProps({ key: 0 }, { isFirstLoad: e.isFirstLoad })
                  ),
                  () => [_]
                )
              : e.state === 'no-more'
              ? t.renderSlot(
                  e.$slots,
                  'no-more',
                  t.normalizeProps(
                    t.mergeProps({ key: 1 }, { retry: e.retry })
                  ),
                  () => [N]
                )
              : e.state === 'no-results'
              ? t.renderSlot(
                  e.$slots,
                  'no-results',
                  t.normalizeProps(
                    t.mergeProps({ key: 2 }, { retry: e.retry })
                  ),
                  () => [F]
                )
              : e.state === 'error'
              ? t.renderSlot(
                  e.$slots,
                  'error',
                  t.normalizeProps(
                    t.mergeProps({ key: 3 }, { retry: e.retry })
                  ),
                  () => [I]
                )
              : t.createCommentVNode('', !0),
          ],
          512
        ));
  }
  const q = L(v, [['render', T]]);
  (l.VueEternalLoading = q),
    Object.defineProperties(l, {
      __esModule: { value: !0 },
      [Symbol.toStringTag]: { value: 'Module' },
    });
});
