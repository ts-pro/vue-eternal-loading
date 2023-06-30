# Manually Change States


In **vue-eternal-loading**, you can manually change the state, which can be useful when you have more complex or custom logic that goes beyond what the `loaded` callback offers.

Let's write a logic where we don't rely on the current page size, but instead, use another field in the response (e.g., **total_pages**). With this field, we can determine that if the current page number equals the total pages count, the state should be changed to **no-more**.

```js
function load({ loaded, noMore }) {
  // Load data from server
  // ...
  if (page < response.total_pages) {
    loaded();
  } else {
    noMore();
  }
}
```
<iframe width="100%" height="300" src="//jsfiddle.net/gavrashenko/mqsh4kbr/11/embedded/result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

---

To set the **no-results** state if we receive an empty response for the first loading, we can utilize the second argument in the `load` prop method. This argument is a payload that contains the `isFirstLoad` flag. By checking the value of the `isFirstLoad` flag, we can determine whether it is the first load or subsequent loads. In the case of the first load and an empty response, we can manually set the state to **no-results**.

```js
function load({ loaded, noMore, noResults }, { isFirstLoad }) {
  // Load data from server
  // ...
  if (items.length === 0) {
    if (isFirstLoad) {
      noResults();
    } else {
      noMore();
    }
  } else {
    loaded();
  }
}
```

<iframe width="100%" height="300" src="//jsfiddle.net/gavrashenko/hs5up20d/9/embedded/result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

---

It is indeed a good practice to handle errors in an application and provide clear feedback to the user. That's why the **error** state is offered in **vue-eternal-loading**. If something unfavorable occurs and you need to display an error message to the user, you can manually set the state to **error**. This can be done if you receive an error response from the server. Additionally, you can utilize the `#error` slot to show a custom error message to the user. This allows you to have more control over the error handling and display relevant information to the user when an error occurs.

```html
<VueEternalLoading :load="load">
    <template #error>
      <div class="error">
        Oops! Looks like we've got an error.
      </div>
    </template>
</VueEternalLoading>
```
```js
load({ loaded, error }) {
  // Load users from server
  this.loadUsers(this.page).then((users) => {
    // Add users to an array
    // ...
    loaded();
  }).catch(() => {
    error();
  })
}
```
<iframe width="100%" height="300" src="//jsfiddle.net/gavrashenko/kbvtjnc0/42/embedded/result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
