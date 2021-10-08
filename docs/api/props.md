# Props

## load
- Type: `(action: LoadAction, payload: LoadPayload) => void`
- **Required**

Callback prop which is called when it's time to load new items ( loader is visible to user ).
Accepts 2 arguments:
```js
load(
  {
    // Call when you finished loading data
    // Optional params:
    //   - count - how many items has been loaded
    //   - pageSize - items per page count
    loaded,
    
    // Call when you have no more item
    noMore,
    
    // Call if you have no items at all
    noResults,
    
    // Call if you caught an error
    error,
  },
  {
    // Indicates is it was first load
    isFirstLoad,
  }
)
```

## isInitial
- Type: `boolean` 
- Default: `true`

Tells component is it first loading or not. Can be used with v-model to reset component if set it to true after component creation.

Using prop:
```html
<VueEternalLoading :load="load" :is-initial="isInitial">
</VueEternalLoading>
```

Using v-model ( can be reset ):
```html
<VueEternalLoading :load="load" v-model:is-initial="isInitial">
</VueEternalLoading>
```

## position
- Type: `Position`
- Default: `default`
- Values: `'top'` | `'left'` | `'default'`

Tells where **vue-eternal-loader** is. It is required for `top` / `left` positions for correct scroll calculations.

## container
- Type: `HTMLElement`
- Default: `document.documentElement`

Required if your scroll area is not the whole document ( `document.documentElement` ) and your position `top` or `left`. This prop tells where the scroll is, to scroll right container.

## margin
Added in `v1.1.0`
- Type: `string`
- Default: `undefined`

Creates invisible bounding box around `vue-eternal-loading` which trigger `load` prop. Normally it may be specified in pixels ( e.g. `200px` ). All formats available [here](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/rootMargin).
