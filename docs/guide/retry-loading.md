# Retry loading

Typically, when you encounter the **no-more**, **no-results**, or **error** states in **vue-eternal-loading**, your only option to restart the component is by using the `isInitial` prop. However, it's important to note that using the `isInitial` prop will also reset the `isFirstLoad` state, which may not always be desired. In scenarios where you have caught an error or reached the end and want to retry the loading process, you can utilize the `retry` method available within the `#no-more`, `#no-results`, and `#error` slots.

Here's an example demonstrating how you can implement a retry button when an error is caught:

```html
<VueEternalLoading :load="load">
    <template #error="{ retry }">
        Oops. We've got an error.
        <button @click="retry">Try again</button>
    </template>
</VueEternalLoading>
```

<iframe width="100%" height="300" src="//jsfiddle.net/gavrashenko/xhtg6L92/8/embedded/result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
