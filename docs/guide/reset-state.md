# Reset state

Sometimes it is important to reset the state of **vue-eternal-loading** and the `isFirstLoad` flag to their defaults. For instance, when implementing filters on your website, you may want to reset the pagination if any of the filters have been changed. You have the flexibility to reset the component whenever needed, and we can implement a special reset button to demonstrate how it can be done.

To enable the reset functionality, you need to pass an `isInitial` prop via `v-model` and initialize it with a value of `true`. When the `load` prop is called, the `isInitial` prop will be automatically changed to `false`. If you set the isInitial prop back to true, it will reset the component to its initial state.

By managing the value of the `isInitial` prop, you can control the reset behavior of the component and trigger a reset whenever necessary.

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

<iframe width="100%" height="300" src="//jsfiddle.net/gavrashenko/gz3t4q9s/3/embedded/result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
