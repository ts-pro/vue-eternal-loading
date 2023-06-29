# Loading states

The **vue-eternal-loading** component has four different states that can render different templates and influence the behavior of the component:

- **loading**: This is the default state when we are trying to load new content. In this state, the `load` prop triggers automatically when needed. Default template: `<div class="loading">Loading...</div>`


- **no-more**: This state indicates that we have reached the end of the available content. It occurs when the server responds with empty content or content that is less than a full page. In this state, the `load` prop is not called anymore. Default template: `<div class="no-more">No more.</div>`


- **no-results**: This state means that we have no content at all. It can occur when we attempt to load content from the server, but the initial request returns zero items. In such cases, we may want to display a "No results" message. In this state, the `load` prop is not called anymore. Default template: `<div class="no-results">No results.</div>`


- **error** - This state indicates that we encountered an error from the server or any other source. In this state, the `load` prop is not called anymore. Default template: `<div class="error">Error.</div>`

We can automatically switch between states by using the `loaded` callback within the `load` prop method, which will be described below. Alternatively, we can manually set any state, and we will explain this in a later section.

---

In some cases, we may not want to have a state other than **loading**. For example, when implementing a loading feature that should never stop, such as loading logs, real-time news, or continuously attempting to load something. To achieve this behavior, we can call the `loaded` callback without any parameters.

```js
function load({ loaded }) {
  // Load data from server
  // ...
  loaded();
}
```
<iframe width="100%" height="300" src="//jsfiddle.net/gavrashenko/0ak1f69t/10/embedded/result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

---

If we use the `loaded` callback with one parameter (items count), we can reach two states: **no-more** and **no-results**. We might want to have these states in order to render the corresponding templates. If we call `loaded(0)` during our first load, we will enter the **no-results** state.
```js
function load({ loaded }) {
  // Load data from server
  // ...
  // And items.length === 0 
  loaded(items.length);
}
```
<iframe width="100%" height="300" src="//jsfiddle.net/gavrashenko/4gdht3ap/7/embedded/result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

If we call `loaded(0)` during our second or subsequent load, we will enter the **no-more** state. This indicates that we have previously loaded content, but we have now reached the end and there is no more content available to load.
```js
function load({ loaded }) {
  // Load data from server
  // ...
  // items.length === 0 and this is 2+ try
  loaded(items.length);
}
```
<iframe width="100%" height="300" src="//jsfiddle.net/gavrashenko/uwapjzk8/7/embedded/result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

In the example mentioned above, we encountered an extra request before reaching the **no-more** state. This occurs because we don't know the exact page size, and we can only set the **no-more** state if we receive an empty response. This situation is acceptable when the page size is unknown or when the number of items per request may vary. However, if you expect a specific item count per page, it is good practice to pass a second parameter to the `loaded` callback, where you can specify your page size. This helps prevent unnecessary extra requests to the server and allows us to set the **no-more** state when we receive an items count less than the page size.
```js
const PAGE_SIZE = 5;

function load({ loaded }) {
  // Load data from server
  // ...
  loaded(items.length, PAGE_SIZE);
}
```
<iframe width="100%" height="300" src="//jsfiddle.net/gavrashenko/pe58wszL/98/embedded/result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

---

We have one more state called **error**, but it cannot be reached automatically just by using the `loaded` callback. This is because **vue-eternal-loading** is not aware of loading errors, and it switches states based on the information you pass to the `loaded` callback. The information provided is not sufficient to set the **error** state. In the upcoming sections, we will learn how to manually set the **error** state.

---

If you want to know the current state inside the `load` function, the `loaded()` callback can return it for you.
```js
function load({ loaded }) {
  // Load data from server
  // ...
  const state = loaded();
  if (state === 'no-more') {
    alert('Boom! You have reached the end.')
  }
}
```
