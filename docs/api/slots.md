# Slots

## #loading
- Default: `<div class="loading">Loading...</div>`

Renders normal loading state when try to load more content.

- Available scoped slot data:
  - `isFirstLoad` - indicates whether it was first load `<template #loading="{ isFirstLoad }"> ... </template>`

## #noMore
- Default: `<div class="no-more">No more.</div>`

Renders state when we don't have more new content and there is no need to make further loading.

- Available scoped slot data (added in `v1.1.0`):
    - `retry` - activates `loading` state again 
      `<template #noMore="{ retry }"> ... <button @click="retry">Retry</button> </template>`

## #noResults
- Default: `<div class="no-results">No results.</div>`

Renders case when we don't have even 1 item loaded. 

- Available scoped slot data (added in `v1.1.0`):
    - `retry` - activates `loading` state again
      `<template #noResults="{ retry }"> ... <button @click="retry">Retry</button> </template>`

## #error
- Default: `<div class="error">Error.</div>`

Renders case when we caught an error.

- Available scoped slot data (added in `v1.1.0`):
    - `retry` - activates `loading` state again
      `<template #error="{ retry }"> ... <button @click="retry">Retry</button> </template>`

