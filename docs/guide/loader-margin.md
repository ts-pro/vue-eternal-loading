# Loader margin

In previous examples `load` prop was triggered when loader was visible on screen or in your container element ( depends on `container` prop ). Sometimes you may want to start loading a little earlier to make loading process more seamless for a user. It is possible with prop `margin` which can accept params in pixels or percents as string ( it will be passed to `IntersectionObserver` as `rootMargin` param under the hood, so you can find all formats [here](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/rootMargin)  ). Specifying `margin` as one value ( e.g. `200px` ) in pixels may cover the most common cases, so it's not important to learn other formats:

```html
<VueEternalLoading :load="load" margin="200px">
</VueEternalLoading>
```

<iframe width="100%" height="300" src="//jsfiddle.net/gavrashenko/omf723ve/1/embedded/result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

In the example above we are created `200px` invisible bounding box around our `VueEternalLoading` component markup. Now `load` prop will be triggered on `200px` earlier  ( like if it was `200px` bigger in all directions ).

The important thing is that `margin` prop won't affect your layout anyhow unlike `css margin` which pushes content if you will specify it.
