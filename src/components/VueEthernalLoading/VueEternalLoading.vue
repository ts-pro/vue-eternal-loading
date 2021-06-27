<template>
  <div class="vue-eternal-loading" ref="rootRef">
    <slot v-if="state === 'loading'" v-bind="{ isFirstLoad }" name="loading">
      <div class="loading">Loading...</div>
    </slot>
    <slot v-if="state === 'no-more'" name="no-more">
      <div class="no-more">No more.</div>
    </slot>
    <slot v-if="state === 'no-results'" name="no-results">
      <div class="no-results">No results.</div>
    </slot>
    <slot v-if="state === 'error'" name="error">
      <div class="error">Error.</div>
    </slot>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  nextTick,
  onMounted,
  PropType,
  ref,
  watch,
} from 'vue';
import {
  getScrollHeightFromEl,
  getScrollWidthFromEl,
  restoreScrollHorizontalPosition,
  restoreScrollVerticalPosition,
} from './helpers/scroll/scroll';
import { LoadAction, LoadPayload, Position, State } from './helpers/type/type';

console.log('VueEternalLoading imported');

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
    container: {
      required: false,
      type: Object as PropType<HTMLElement>,
      default: document.documentElement,
    },
    position: {
      required: false,
      type: String as PropType<Position>,
      default: 'default',
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
          restoreScrollVerticalPosition(props.container, scrollSize);
        } else if (props.position === 'left') {
          restoreScrollHorizontalPosition(props.container, scrollSize);
        }
      });
    }

    function loaded(count?: number, pageSize?: number) {
      if (count === 0) {
        if (isFirstLoad.value) {
          noResults();
        } else {
          noMore();
        }
      } else if (
        count !== undefined &&
        pageSize !== undefined &&
        count < pageSize
      ) {
        noMore();
      } else {
        isFirstLoad.value = false;
        restoreScroll();
        observe();
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

    const observer = new IntersectionObserver(
      ([entry]) => {
        // console.log("entry.isIntersecting", entry.isIntersecting);
        if (entry.isIntersecting) {
          if (props.position === 'top') {
            scrollSize = getScrollHeightFromEl(props.container);
          } else if (props.position === 'left') {
            scrollSize = getScrollWidthFromEl(props.container);
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
        threshold: 0,
      }
    );

    onMounted(() => {
      observe();
    });

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
    };
  },
});
</script>
