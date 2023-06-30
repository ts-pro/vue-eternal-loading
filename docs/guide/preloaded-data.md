# Preloaded data

Normally, **vue-eternal-loading** calls the `load` prop when you need to fetch data from the server. However, there may be cases where you already have preloaded data from cache or other requests. In such cases, if you render your preloaded data and place **vue-eternal-loading** next to it as usual, the component is unaware of the preloaded data and behaves as if it's the first loading. This can lead to undesired results, such as getting the **no-results** state even when you have data, or having an incorrect value for the `isFirstLoad` prop in the `#loading` slot.

To prevent this behavior, you can pass a `false` to the `isInitial` prop. This informs **vue-eternal-loading** that it is not the initial loading, and it will adjust its behavior accordingly.

```html
<VueEternalLoading :load="load" :is-initial="false"></VueEternalLoading>
```

Or you can pass it using v-model.

```html
<!-- isIntial should be false -->
<VueEternalLoading :load="load" v-model:is-initial="isInitial"></VueEternalLoading>
```

<iframe width="100%" height="300" src="//jsfiddle.net/gavrashenko/tms5g870/21/embedded/result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
