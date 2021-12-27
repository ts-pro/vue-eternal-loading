<template>
  <div class="vue-eternal-loading" ref="rootRef">
    <slot v-if="state === 'loading'" v-bind="{ isFirstLoad }" name="loading">
      <div class="loading">Loading...</div>
    </slot>
    <slot v-else-if="state === 'no-more'" v-bind="{ retry }" name="no-more">
      <div class="no-more">No more.</div>
    </slot>
    <slot
      v-else-if="state === 'no-results'"
      v-bind="{ retry }"
      name="no-results"
    >
      <div class="no-results">No results.</div>
    </slot>
    <slot v-else-if="state === 'error'" v-bind="{ retry }" name="error">
      <div class="error">Error.</div>
    </slot>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  nextTick,
  PropType,
  ref,
  watch,
  watchEffect,
} from 'vue';
import {
  getScrollHeightFromEl,
  getScrollWidthFromEl,
  restoreScrollHorizontalPosition,
  restoreScrollVerticalPosition,
} from './helpers/scroll/scroll';
import { LoadAction, LoadPayload, Position, State } from './helpers/type/type';

export default defineComponent({
  name: 'VueEternalLoading',

  props: {
    load: {
      required: true,
      type: Function as PropType<
        (action: LoadAction, payload: LoadPayload) => void
      >,
    },
    isInitial: {
      required: false,
      type: Boolean,
      default: true,
    },
    position: {
      required: false,
      type: String as PropType<Position>,
      default: 'default',
    },
    container: {
      required: false,
      type: Object as PropType<HTMLElement | null>,
      default: null,
    },
    margin: {
      required: false,
      type: String,
      default: undefined,
    },
  },

  setup(props, context) {
    const rootRef = ref<HTMLDivElement>();
    let state = ref<State>('loading');
    let isFirstLoad = ref(props.isInitial);

    // Height or width of the scroll ( depends on loader position ).
    let scrollSize = 0;

    function restoreScroll() {
      nextTick(() => {
        if (props.position === 'top') {
          restoreScrollVerticalPosition(
            props.container ?? document.documentElement,
            scrollSize
          );
        } else if (props.position === 'left') {
          restoreScrollHorizontalPosition(
            props.container ?? document.documentElement,
            scrollSize
          );
        }
      });
    }

    function loaded(count?: number, pageSize?: number): State {
      if (count === 0) {
        if (isFirstLoad.value) {
          noResults();
          return 'no-results';
        } else {
          noMore();
          return 'no-more';
        }
      } else if (
        count !== undefined &&
        pageSize !== undefined &&
        count < pageSize
      ) {
        noMore();
        return 'no-more';
      } else {
        isFirstLoad.value = false;
        restoreScroll();
        observe();
        return 'loading';
      }
    }

    function noMore() {
      isFirstLoad.value = false;
      setState('no-more');
      restoreScroll();
    }

    function noResults() {
      isFirstLoad.value = false;
      setState('no-results');
      restoreScroll();
    }

    function error() {
      isFirstLoad.value = false;
      setState('error');
      restoreScroll();
    }

    function reset() {
      isFirstLoad.value = true;
      setState('loading');
      observe();
    }

    function retry() {
      setState('loading');
      observe();
    }

    function setState(newState: State) {
      state.value = newState;
    }

    function unobserve() {
      if (rootRef.value) {
        observer.unobserve(rootRef.value);
      }
    }

    function observe() {
      if (rootRef.value) {
        observer.observe(rootRef.value);
      }
    }

    function createObserver() {
      return new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            if (props.position === 'top') {
              scrollSize = getScrollHeightFromEl(
                props.container ?? document.documentElement
              );
            } else if (props.position === 'left') {
              scrollSize = getScrollWidthFromEl(
                props.container ?? document.documentElement
              );
            }
            unobserve();
            props.load(
              {
                loaded,
                noMore,
                noResults,
                error,
              },
              {
                isFirstLoad: isFirstLoad.value,
              }
            );
          }
        },
        {
          root: props.container,
          threshold: 0,
          rootMargin: props.margin,
        }
      );
    }

    let observer: IntersectionObserver;
    watchEffect(
      () => {
        // Stop old observer if it exists
        if (observer) {
          unobserve();
        }

        observer = createObserver();
        observe();
      },
      {
        flush: 'post',
      }
    );

    watch(
      () => props.isInitial,
      (value) => {
        if (value) {
          reset();
        }
      }
    );

    watch(isFirstLoad, (value) => {
      if (!value) {
        context.emit('update:isInitial', false);
      }
    });

    return {
      rootRef,
      state,
      isFirstLoad,
      retry,
    };
  },
});
</script>
