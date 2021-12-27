/* eslint-disable @typescript-eslint/ban-ts-comment */
import { shallowMount } from '@vue/test-utils';
import { nextTick } from 'vue';
import {
  getScrollHeightFromEl,
  getScrollWidthFromEl,
  restoreScrollHorizontalPosition,
  restoreScrollVerticalPosition,
} from '../helpers/scroll/scroll';
import { LoadAction, LoadPayload } from '../helpers/type/type';
import VueEternalLoading from '../VueEternalLoading.vue';

jest.mock('../helpers/scroll/scroll');

describe('VueEternalLoading', () => {
  let callback: IntersectionObserverCallback;
  let observe: (target: Element) => void;
  let unobserve: (target: Element) => void;
  let action: LoadAction;
  let payload: LoadPayload;

  function getComponent(isInitial = true, container?: HTMLElement | null) {
    return shallowMount(VueEternalLoading, {
      props: {
        load(a: LoadAction, p: LoadPayload) {
          action = a;
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          payload = p;
        },
        isInitial,
        container,
      },
      slots: {
        loading: 'STATE_LOADING',
        'no-more': 'STATE_NO_MORE',
        'no-results': 'STATE_NO_RESULTS',
        error: 'STATE_ERROR',
      },
    });
  }

  // Trigger IntersectionObserver hit.
  function runCallback(isIntersecting: boolean) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    callback([
      {
        isIntersecting,
      },
    ]);
  }

  beforeEach(() => {
    jest.resetAllMocks();

    observe = jest.fn();
    unobserve = jest.fn();
    // Mocked version of IntersectionObserver.
    class IntersectionObserver {
      readonly root = null;
      readonly rootMargin = '';
      readonly thresholds = [0];

      constructor(cb: IntersectionObserverCallback) {
        callback = cb;
      }

      observe = observe;
      unobserve = unobserve;
      disconnect = jest.fn();
      takeRecords = jest.fn();
    }
    window.IntersectionObserver = IntersectionObserver;
  });

  test('common flow', async () => {
    const wrapper = getComponent();

    expect(observe).toHaveBeenCalledTimes(1);
    expect(unobserve).not.toHaveBeenCalled();
    expect(wrapper.html()).toContain('STATE_LOADING');

    runCallback(false);
    expect(observe).toHaveBeenCalledTimes(1);
    expect(unobserve).not.toHaveBeenCalled();
    // @ts-ignore
    expect(action).toBeUndefined();

    runCallback(true);
    expect(observe).toHaveBeenCalledTimes(1);
    expect(unobserve).toHaveBeenCalledTimes(1);
    // @ts-ignore
    expect(action.loaded).toBeDefined();
    // @ts-ignore
    action.loaded();
    expect(observe).toHaveBeenCalledTimes(2);
    expect(unobserve).toHaveBeenCalledTimes(1);

    runCallback(true);
    // @ts-ignore
    action.loaded();
    expect(observe).toHaveBeenCalledTimes(3);
    expect(unobserve).toHaveBeenCalledTimes(2);

    runCallback(true);
    // @ts-ignore
    action.loaded(0);
    expect(observe).toHaveBeenCalledTimes(3);
    expect(unobserve).toHaveBeenCalledTimes(3);
    await nextTick();
    expect(wrapper.html()).toContain('STATE_NO_MORE');
  });

  test('loaded with pageSize param', async () => {
    const wrapper = getComponent();
    runCallback(true);
    expect(observe).toHaveBeenCalledTimes(1);
    expect(unobserve).toHaveBeenCalledTimes(1);
    // @ts-ignore
    let state = action.loaded(5, 5);
    expect(state).toBe('loading');
    expect(observe).toHaveBeenCalledTimes(2);
    expect(unobserve).toHaveBeenCalledTimes(1);
    await nextTick();
    expect(wrapper.html()).toContain('STATE_LOADING');
    // @ts-ignore
    state = action.loaded(4, 5);
    expect(state).toBe('no-more');
    await nextTick();
    expect(wrapper.html()).toContain('STATE_NO_MORE');
  });

  test('loaded sets no-results', async () => {
    const wrapper = getComponent();
    runCallback(true);
    // @ts-ignore
    const state = action.loaded(0, 5);
    expect(state).toBe('no-results');
    expect(observe).toHaveBeenCalledTimes(1);
    expect(unobserve).toHaveBeenCalledTimes(1);
    await nextTick();
    expect(wrapper.html()).toContain('STATE_NO_RESULTS');
  });

  test('noMore / noResults / error', async () => {
    const wrapper = getComponent();
    runCallback(true);
    // @ts-ignore
    action.noMore();
    expect(observe).toHaveBeenCalledTimes(1);
    expect(unobserve).toHaveBeenCalledTimes(1);
    await nextTick();
    expect(wrapper.html()).toContain('STATE_NO_MORE');
    // @ts-ignore
    action.noResults();
    expect(observe).toHaveBeenCalledTimes(1);
    expect(unobserve).toHaveBeenCalledTimes(1);
    await nextTick();
    expect(wrapper.html()).toContain('STATE_NO_RESULTS');
    // @ts-ignore
    action.error();
    expect(observe).toHaveBeenCalledTimes(1);
    expect(unobserve).toHaveBeenCalledTimes(1);
    await nextTick();
    expect(wrapper.html()).toContain('STATE_ERROR');
  });

  test('v-model:is-initial', async () => {
    const wrapper = getComponent();
    runCallback(true);
    // @ts-ignore
    action.noResults();
    await nextTick();
    expect(wrapper.html()).toContain('STATE_NO_RESULTS');
    expect(wrapper.emitted()).toEqual({ 'update:isInitial': [[false]] });
    await wrapper.setProps({ isInitial: false });
    await wrapper.setProps({ isInitial: true });
    await nextTick();
    expect(wrapper.html()).toContain('STATE_LOADING');
  });

  test('initialization with falsy isInitial', async () => {
    const wrapper = getComponent(false);
    runCallback(true);
    // @ts-ignore
    action.loaded(0);
    await nextTick();
    expect(wrapper.html()).toContain('STATE_NO_MORE');
  });

  test('top / left positions without container', async () => {
    const wrapper = getComponent(false);
    await wrapper.setProps({ position: 'top' });
    runCallback(true);
    expect(getScrollHeightFromEl).toHaveBeenCalledWith(
      window.document.documentElement
    );
    // @ts-ignore
    action.loaded();
    await nextTick();
    expect(restoreScrollVerticalPosition).toHaveBeenCalledWith(
      window.document.documentElement,
      undefined
    );

    await wrapper.setProps({ position: 'left' });
    runCallback(true);
    expect(getScrollWidthFromEl).toHaveBeenCalledWith(
      window.document.documentElement
    );
    // @ts-ignore
    action.loaded();
    await nextTick();
    expect(restoreScrollHorizontalPosition).toHaveBeenCalledWith(
      window.document.documentElement,
      undefined
    );
  });

  test('top / left positions with container', async () => {
    const container = document.createElement('div');
    const wrapper = getComponent(false);
    await wrapper.setProps({ position: 'top' });
    await wrapper.setProps({ container });
    runCallback(true);
    expect(getScrollHeightFromEl).toHaveBeenCalledWith(container);
    // @ts-ignore
    action.loaded();
    await nextTick();
    expect(restoreScrollVerticalPosition).toHaveBeenCalledWith(
      container,
      undefined
    );

    await wrapper.setProps({ position: 'left' });
    runCallback(true);
    expect(getScrollWidthFromEl).toHaveBeenCalledWith(container);
    // @ts-ignore
    action.loaded();
    await nextTick();
    expect(restoreScrollHorizontalPosition).toHaveBeenCalledWith(
      container,
      undefined
    );
  });

  test('container is null', async () => {
    const wrapper = getComponent(true, null);
    expect(observe).toHaveBeenCalled();
    expect(unobserve).not.toHaveBeenCalled();

    await wrapper.setProps({ container: document.documentElement });
    expect(observe).toHaveBeenCalledTimes(2);
    expect(unobserve).toHaveBeenCalledTimes(1);

    await wrapper.setProps({ container: document.body });
    expect(observe).toHaveBeenCalledTimes(3);
    expect(unobserve).toHaveBeenCalledTimes(2);
  });
});
