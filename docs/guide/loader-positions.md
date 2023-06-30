# Loader positions

**vue-eternal-loading** offers four loader positions: `top`, `left`, `right`, and `bottom`. In the examples provided earlier, we used the `bottom` position, which means that the **vue-eternal-loading** component was positioned below the loaded items. In such cases, we do not need to pass any specific props to indicate the component's position.

However, for the `top` and `left` positions, special props need to be passed. This is because when loading new content that is appended to the top or left of a container, it does not affect the scroll position towards our content. In other words, if you have scrolled down by 100 pixels and then load 200 pixels of new content at the top, it will be fine because the top content and scroll position remain in the same position. The same principle applies to the `right` loader position.

By providing the necessary props for the `top` and `left` positions, you can ensure that the loading behavior and positioning work correctly, maintaining the desired scroll and content alignment.

<iframe width="100%" height="300" src="//jsfiddle.net/gavrashenko/8u150Lpk/59/embedded/result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

As you can see, we simply position the loader to the right using CSS without requiring any additional steps, and the functionality works seamlessly.

If we simply position the loader at the top or left, it won't function in the same manner. This is because when new content is added to the top or left, the browser retains the scroll position. However, the content displayed at that scroll position will be different. As a result, we need to adjust the scroll position by the difference between the sizes of the old and new content.

Fortunately, **vue-eternal-loading** takes care of these calculations for us. It automatically handles the necessary adjustments to the scroll position, accounting for the changes in content size. With **vue-eternal-loading**, we don't have to manually manage these complex calculations; the component handles them seamlessly behind the scenes.

To specify the loader's position, we need to provide the `position` prop with one of the following values:
- **default**: This is the default value for the bottom or right positions, and it does not need to be specified manually.
- **top**: Use this value if the loader is positioned above the items.
- **left**: Use this value if the loader is positioned to the left of the items.

If your scroll area encompasses the entire document, specifying the `container` prop is not necessary. However, if your scroll area is a custom element, you must pass this element as a `ref` value to the `container` prop. It's required because we need to change scroll position and it's important to know where the scroll is:

```html
<!-- Make container scrollable -->
<div ref="containerRef" style="height: 500px; overflow-y:auto">
    
    <!-- Pass `position` and `container` props -->
    <VueEternalLoading :load="load" position="top" :container="containerRef"></VueEternalLoading>
    
    <!-- Render items here -->
</div>
```

```js
setup() {
    // Other props
    // ...
    const containerRef = ref();
    
    // Other methods
    // ...
    function load({ loaded }) {
      // Load logic
    }
    
    return {
      load,
      containerRef,
      // Other data
    };
}
```

Top scroll example:

<iframe width="100%" height="300" src="//jsfiddle.net/gavrashenko/j2ystkcf/20/embedded/result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

Left scroll example:

<iframe width="100%" height="300" src="//jsfiddle.net/gavrashenko/eLoqnbaz/30/embedded/result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
