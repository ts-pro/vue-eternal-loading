# Reset state

Sometimes it's important to reset **vue-eternal-loading** state and `isFirstLoad` to their defaults. For example, when you try to implement filters on your site, and you want to reset pagination if some of your filters has been changed. You can reset component whenever you want, but let's write special reset button to see how it can be implemented.

To be able to reset component you must pass `isInitial` prop via `v-model` initialized with `true`. When `load` prop will be called, `isInitial` prop will be changed to `false` automatically. If you change this prop to `true` again, it will reset your component to the initial state.

```html
<button @click="reset">Reset</button>

<VueEternalLoading :load="load" v-model:is-initial="isInitial">
</VueEternalLoading>
```

```js
setup() {
    // Other props
    // ...
    const isInitial = ref(true);

    // Other methods
    // ...
    async function load({ loaded }) {
      // Process response logic
    }

    function reset() {
      // Reset all data
      // ...
      // This will reset `vue-eternal-loading`
      isInitial.value = true;
    }

    return {
      load,
      reset,
      isInitial,
      // Other data...
    };
}
```

<iframe width="100%" height="300" src="//jsfiddle.net/gavrashenko/pe58wszL/94/embedded/result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
