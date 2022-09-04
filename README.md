# 🇺🇦 vue-eternal-loading [![Build Status](https://travis-ci.com/ts-pro/vue-eternal-loading.svg?branch=main)](https://travis-ci.com/ts-pro/vue-eternal-loading)

Infinity loading component written on [TypeScript](https://www.typescriptlang.org/) for [Vue 3](https://v3.vuejs.org/). No dependencies.

### Features:
- 4 directional ( top / left / right / bottom)
- 4 loading states ( loading / no-more / no-results / error )
- Custom markup & styles
- Works in browsers & bundlers
- SSR friendly

### Installation:
**Yarn**
```
yarn add @ts-pro/vue-eternal-loading
```

**Npm**
```
npm install @ts-pro/vue-eternal-loading
```

**Browser**
```html
<head>
    <!-- Vue 3 must be loaded before `vue-eternal-loading` -->
    <script src="https://cdn.jsdelivr.net/gh/ts-pro/vue-eternal-loading/dist/vue-eternal-loading.umd.js"></script>
</head>
```

### Simple usage:
```html
<VueEternalLoading :load="load"></VueEternalLoading>
```
```ts
const PAGE_SIZE = 5;

// We must pass this method to the component 
// and it will be call automatically when needed
async function load({ loaded }) {
  // Load your data from server or anywhere
  const loadedItems = await loadItems(page);
  items.value.push(...loadedItems);
  page += 1;
  // Call `loaded` callback with 2 arguments:
  // 1. How many items we have loaded
  // 2. Our page size to know when we riched the end
  loaded(loadedItems.length, PAGE_SIZE);
}
```

### Guide & demo:
Check out our [vue-eternal-loading docs](https://ts-pro.github.io/vue-eternal-loading/)

### Releases
List releases [vue-eternal-loading releases](https://github.com/ts-pro/vue-eternal-loading/releases)

### Vue2 support
Our component is for Vue 3, if you are looking solution for Vue 2 - check this lib out [vue-infinite-loading](https://github.com//PeachScript/vue-infinite-loading).

### Issue
Feel free to write an issue or feature request [vue-eternal-loading issues](https://github.com/ts-pro/vue-eternal-loading/issues)

### License
MIT License
