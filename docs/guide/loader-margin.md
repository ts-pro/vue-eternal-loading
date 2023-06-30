# Loader margin

In the previous examples, the `load` prop was triggered when the loader became visible on the screen or within the specified container element (depending on the `container` prop). However, there may be situations where you want to start the loading process a bit earlier to provide a more seamless experience for the user. This can be achieved using the `margin` prop, which accepts parameters in pixels or percentages as a string.

The `margin` prop is passed as the `rootMargin` parameter to the underlying `IntersectionObserver`. You can refer to the [Mozilla Developer Network (MDN) documentation](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/rootMargin) for more information on the different formats and options for `rootMargin`.

In most cases, specifying the `margin` as a single value in pixels (e.g., `200px`) will cover the most common scenarios, so there is no need to delve into the details of other format options unless required for specific use cases.

```html
<VueEternalLoading :load="load" margin="200px">
</VueEternalLoading>
```

<iframe width="100%" height="300" src="//jsfiddle.net/gavrashenko/omf723ve/52/embedded/result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

In the example mentioned above, we created an invisible bounding box with a margin of `200px` around our `VueEternalLoading` component markup. This means that the load prop will be triggered `200px` earlier, as if the bounding box were `200px` larger in all directions.

The significant aspect to note is that the `margin` prop does not affect your layout in any way, unlike the **css margin** property, which pushes content if specified. The `margin` prop purely influences the triggering of the `load` prop and the timing of when the loading process starts, ensuring a smoother user experience.
