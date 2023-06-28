# Preloaded data

Normally **vue-eternal-loading** call `load` prop when you need to get data from server. But there can be a case when we already have preloaded data ( e.g. from cache, from other request, etc... ). In this case if we render our preloaded data and put **vue-eternal-loader** next to it as usual, it doesn't know about your data, and will behave like it's your first loading. It can lead to unwanted results, when you can get **no-results** state even if you have data. Or we will have wrong `isFirstLoad` prop in `#loading` slot.

To prevent this behaviour you need to pass falsy `isInitial` prop.

```html
<VueEternalLoading :load="load" :is-initial="false"></VueEternalLoading>
```

Or you can pass it using v-model if you want to implement reset logics from the previous section as well.
```html
<!-- isIntial should be false -->
<VueEternalLoading :load="load" :is-initial="isInitial"></VueEternalLoading>
```

<iframe width="100%" height="300" src="//jsfiddle.net/gavrashenko/tms5g870/21/embedded/result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
