# Loading states

vue-eternal-loading component has 4 different states which can render different templates and have influence on component's behaviour:

- **loading** - it's a default state when we try to load some new content. In this state `load` prop triggers automatically when it needed. Default template: `<div class="loading">Loading...</div>`


- **no-more** - this state means than have no more content ( server replied with empty content or content less than full page ). In this state `load` is not calling anymore. Default template: `<div class="no-more">No more.</div>`


- **no-results** - this state means that we have no content at all. Maybe we have tried to load something from a server, but we got 0 items in our first request, and in this case we may want to show 'No results message'. In this state `load` is not calling anymore.  Default template: `<div class="no-results">No results.</div>`


- **error** - this state indicates than we got an error from the server or anywhere else. In this state `load` is not calling anymore. Default template: `<div class="error">Error.</div>`

We can switch between states automatically, just using `loaded` callback inside `load` prop method, and we'll describe it below. Or we can set any state manually, and we will explain it in the further section.

---

In some cases we may not want to have state different from **loading**. For example, when we want to implement loading which shouldn't stop ever. It can be logs loading, realtime news loading or just trying to load something forever. To have this behaviour we have to call `loaded` callback without params:

```js
function load({ loaded }) {
  // Load data from server
  // ...
  loaded();
}
```
<iframe width="100%" height="300" src="//jsfiddle.net/gavrashenko/0ak1f69t/5/embedded/result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

---

If we use `loading` callback with 1 param ( items count ) we can rich 2 states now: no-more, no-results. We may want to have this states to render corresponding templates. If we call `loading(0)` on our first load - we will get **no-results** state.
```js
function load({ loaded }) {
  // Load data from server
  // ...
  // And items.length === 0 
  loaded(items.length);
}
```
<iframe width="100%" height="300" src="//jsfiddle.net/gavrashenko/4gdht3ap/3/embedded/result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

If we call `loading(0)` on our second+ load - we will get **no-more** state. Which means that we have loaded content before, but we reached the end now.
```js
function load({ loaded }) {
  // Load data from server
  // ...
  // items.length === 0 and this is 2+ try
  loaded(items.length);
}
```
<iframe width="100%" height="300" src="//jsfiddle.net/gavrashenko/uwapjzk8/6/embedded/result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

You can admit in example above than we have 1 extra request, before we riched state `no-more`. It happens because we do not know exact page size and we can set state `no-more` only if we reach empty response. It's okay if you don't know for sure what's your page size or you may have floating items count per request. But in case when you expect exact items count per page it's good practise to pass second param to `loading` callback, where you should specify your page size. It prevents unnecessary extra request to server and set state `no-more` when we will get items count less than page size:
```js
const PAGE_SIZE = 5;

function load({ loaded }) {
  // Load data from server
  // ...
  loaded(items.length, PAGE_SIZE);
}
```
<iframe width="100%" height="300" src="//jsfiddle.net/gavrashenko/pe58wszL/78/embedded/result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

---

We have one more state `error` but we can't rich it automatically just using `loading` callback. It's because **vue-eternal-loading** have no idea about loading errors, and it can switch states based on information which you pass to `loading` callback and it's not enought information to set `error` state. How to set `error` state manually we will explain further in next sections.
