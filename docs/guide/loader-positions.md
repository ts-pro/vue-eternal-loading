# Loader positions

**vue-eternal-loading** offers 4 loader positions: `top`, `left`, `right`, `bottom`. We used bottom position  in examples before ( means that **vue-eternal-loading** component was below loaded items ). We shouldn't pass any prop to tell where our component is if we want to put it in the bottom or in the right. But we have to pass special props for top / left positions. Why that?

It's because if you load new content which you put to the bottom or to the right of container, it doesn't affect scroll position towards our content. 

In other words if you scroll 100 pixels down, and then put 200 pixels of new content to the end, it would be okay, because your top content and your scroll are in the same positions. Same rules can be applied to the right loader position:

<iframe width="100%" height="300" src="//jsfiddle.net/gavrashenko/8u150Lpk/54/embedded/result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

As you see, we just put loader to the right using css, nothing else, and everything works great!

It won't work the same way if we just put loader to the top or to the left. Because if put some new content to the top / left - browser will preserve our scroll, but the content in the same scroll position will be different, and we need to change scroll position to the difference between old & new scroll content sizes. 

Luckily, all this calculations make **vue-eternal-loading**.

We need to pass prop `position`, which can accept following values:
- **default** - it's a default value for bottom / right positions, you don't need to specify it manually
- **top** - if loader is above the items
- **left** - if loader is on the left of the items.

If your scroll area is the whole document it's enough. But if your scroll area is a custom element you need to pass this element via prop `container`. It's required because we need to change scroll position and it's important to know where the scroll is:

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

<iframe width="100%" height="300" src="//jsfiddle.net/gavrashenko/j2ystkcf/19/embedded/result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

Left scroll example:

<iframe width="100%" height="300" src="//jsfiddle.net/gavrashenko/eLoqnbaz/29/embedded/result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
