# Retry loading

Normally if you reached states `no-more`, `no-results` or `error` you have the only choice to restart `vue-eternal-loading` - use `isInitial` prop. It will reset `isFirstLoad` state also, which might be not what you want. If you caught an error, or reached the end and want to retry loading - you can use `retry` method which is available in `no-more`, `no-results` and `error` slots. There is an example of how you can implement `retry` button if you caught an error:

```html
<VueEternalLoading :load="load">
    <template #error="{ retry }">
        Oops. We've got an error.
        <button @click="retry">Try again</button>
    </template>
</VueEternalLoading>
```

[comment]: <> (<iframe width="100%" height="300" src="//jsfiddle.net/gavrashenko/xhtg6L92/1/embedded/result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>)
