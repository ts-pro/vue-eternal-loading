# Manually Change States

**vue-eternal-loading** allows changing state manually. It can be useful if we have more complex or custom logic than offers `loaded` callback.

Let's write logic where we don't rely on current page size, but we can use other field in the response ( e.g. **total_pages** ). Using those field we know that if current page number equals total pages count - there should be **no-more**.

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
<iframe width="100%" height="300" src="//jsfiddle.net/gavrashenko/mqsh4kbr/9/embedded/result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

---

Let's set **no-results** state if we got empty response for the first loading. For this case we need to use second argument in `load` prop method. It's a payload which contains `isFirstLoad` flag.

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

<iframe width="100%" height="300" src="//jsfiddle.net/gavrashenko/hs5up20d/8/embedded/result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

---

It's a good practice to handle errors in the app, and show clear feedback to a user. That's why we offer **error** state. You should set this state manually if something bad have happened in your opinion, and we need to show error message to a user. Let's set error state if we get error response from a server, and show custom error message to a user, using `#error` slot.

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
<iframe width="100%" height="300" src="//jsfiddle.net/gavrashenko/kbvtjnc0/41/embedded/result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
