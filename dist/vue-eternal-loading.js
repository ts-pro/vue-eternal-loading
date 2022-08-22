'use strict';
Object.defineProperties(exports, {
  __esModule: { value: !0 },
  [Symbol.toStringTag]: { value: 'Module' },
});
const t = require('vue');
function L(e) {
  return e.scrollHeight;
}
function V(e) {
  return e.scrollWidth;
}
function k(e, i) {
  e.scrollTop = e.scrollHeight - i + e.scrollTop;
}
function _(e, i) {
  e.scrollLeft = e.scrollWidth - i + e.scrollLeft;
}
const N = t.defineComponent({
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
      let l = t.ref('loading'),
        r = t.ref(e.isInitial);
      const v = typeof process < 'u' && process.env !== void 0;
      let u = 0;
      function c() {
        t.nextTick(() => {
          var o, s;
          e.position === 'top'
            ? k((o = e.container) != null ? o : document.documentElement, u)
            : e.position === 'left' &&
              _((s = e.container) != null ? s : document.documentElement, u);
        });
      }
      function S(o, s) {
        return o === 0
          ? r.value
            ? (g(), 'no-results')
            : (m(), 'no-more')
          : o !== void 0 && s !== void 0 && o < s
          ? (m(), 'no-more')
          : ((r.value = !1), c(), d(), 'loading');
      }
      function m() {
        (r.value = !1), a('no-more'), c();
      }
      function g() {
        (r.value = !1), a('no-results'), c();
      }
      function E() {
        (r.value = !1), a('error'), c();
      }
      function p() {
        (r.value = !0), a('loading'), d();
      }
      function b() {
        a('loading'), d();
      }
      function a(o) {
        l.value = o;
      }
      function y() {
        n.value && f.unobserve(n.value);
      }
      function d() {
        n.value && f.observe(n.value);
      }
      function P() {
        return new IntersectionObserver(
          ([o]) => {
            var s, h;
            o.isIntersecting &&
              (e.position === 'top'
                ? (u = L(
                    (s = e.container) != null ? s : document.documentElement
                  ))
                : e.position === 'left' &&
                  (u = V(
                    (h = e.container) != null ? h : document.documentElement
                  )),
              y(),
              e.load(
                { loaded: S, noMore: m, noResults: g, error: E },
                { isFirstLoad: r.value }
              ));
          },
          { root: e.container, threshold: 0, rootMargin: e.margin }
        );
      }
      let f;
      return (
        typeof IntersectionObserver < 'u' &&
          t.watchEffect(
            () => {
              f && y(), (f = P()), d();
            },
            { flush: 'post' }
          ),
        t.watch(
          () => e.isInitial,
          (o) => {
            o && p();
          }
        ),
        t.watch(r, (o) => {
          o || i.emit('update:isInitial', !1);
        }),
        { rootRef: n, state: l, isFirstLoad: r, retry: b, isSSR: v }
      );
    },
  }),
  F = (e, i) => {
    const n = e.__vccOpts || e;
    for (const [l, r] of i) n[l] = r;
    return n;
  },
  I = { key: 0, class: 'vue-eternal-loading', ref: 'rootRef' },
  q = t.createElementVNode('div', { class: 'loading' }, 'Loading...', -1),
  O = t.createElementVNode('div', { class: 'no-more' }, 'No more.', -1),
  z = t.createElementVNode('div', { class: 'no-results' }, 'No results.', -1),
  R = t.createElementVNode('div', { class: 'error' }, 'Error.', -1);
function w(e, i, n, l, r, v) {
  return e.isSSR
    ? t.createCommentVNode('', !0)
    : (t.openBlock(),
      t.createElementBlock(
        'div',
        I,
        [
          e.state === 'loading'
            ? t.renderSlot(
                e.$slots,
                'loading',
                t.normalizeProps(
                  t.mergeProps({ key: 0 }, { isFirstLoad: e.isFirstLoad })
                ),
                () => [q]
              )
            : e.state === 'no-more'
            ? t.renderSlot(
                e.$slots,
                'no-more',
                t.normalizeProps(t.mergeProps({ key: 1 }, { retry: e.retry })),
                () => [O]
              )
            : e.state === 'no-results'
            ? t.renderSlot(
                e.$slots,
                'no-results',
                t.normalizeProps(t.mergeProps({ key: 2 }, { retry: e.retry })),
                () => [z]
              )
            : e.state === 'error'
            ? t.renderSlot(
                e.$slots,
                'error',
                t.normalizeProps(t.mergeProps({ key: 3 }, { retry: e.retry })),
                () => [R]
              )
            : t.createCommentVNode('', !0),
        ],
        512
      ));
}
const H = F(N, [['render', w]]);
exports.VueEternalLoading = H;
