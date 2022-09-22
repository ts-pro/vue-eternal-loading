# Simple usage

There is a basic example of **vue-eternal-loading** usage.

When you work with **vue-eternal-loading** you should implement the only required prop - `load`. This callback method will be called automatically when it's time to load more data. `load` provides 2 arguments which will be described later, for now we only need the first one.
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

> **_NOTE:_**  You can find detailed explanation and other component possibilities in the next sections.

## Example

Here you can scroll down to get more content. When you reach the end, you will see "No more.". All texts in this example is on defaults.

<iframe width="100%" height="300" src="//jsfiddle.net/gavrashenko/pe58wszL/78/embedded/result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

## TypeScript
```vue
<template>
  <div>
    <div v-for="item in items" :key="item.id" class="card mb-3">
      <!-- Item content goes here-->
    </div>

    <VueEternalLoading :load="load"></VueEternalLoading>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { VueEternalLoading, LoadAction } from '@ts-pro/vue-eternal-loading';

const URL = 'https://reqres.in/api/users';
const PAGE_SIZE = 5;

type User = {
  id: string;
};

const users = ref<User[]>([]);
let page = 1;

function loadUsers(page: number): Promise<User[]> {
  return fetch(`${URL}?delay=1&per_page=${PAGE_SIZE}&page=${page}`)
      .then((res) => res.json())
      .then((res) => res.data);
}

async function load({ loaded }: LoadAction): Promise<void> {
  const loadedUsers = await loadUsers(page);
  users.value.push(...loadedUsers);
  page += 1;
  loaded(loadedUsers.length, PAGE_SIZE);
}
</script>
```

## JavaScript ( ES )
```vue
<template>
  <div>
    <div v-for="item in items" :key="item.id" class="card mb-3">
      <!-- Item content goes here-->
    </div>

    <VueEternalLoading :load="load"></VueEternalLoading>
  </div>
</template>

<script lang="js" setup>
import { ref } from 'vue';
import { VueEternalLoading } from '@ts-pro/vue-eternal-loading';

const URL = 'https://reqres.in/api/users';
const PAGE_SIZE = 5;

const users = ref([]);
let page = 1;

function loadUsers(page) {
  return fetch(`${URL}?delay=1&per_page=${PAGE_SIZE}&page=${page}`)
      .then((res) => res.json())
      .then((res) => res.data);
}

async function load({ loaded }) {
  const loadedUsers = await loadUsers(page);
  users.value.push(...loadedUsers);
  page += 1;
  loaded(loadedUsers.length, PAGE_SIZE);
}
</script>
```

## Browser
```html
<script src="https://unpkg.com/vue@3.1.5/dist/vue.global.js"></script>
<script src="https://cdn.jsdelivr.net/gh/ts-pro/vue-eternal-loading/dist/vue-eternal-loading.umd.js"></script>

<div id="app">
    <div v-for="user in users" :key="user.id">
        <!-- Item content goes here-->
    </div>

    <vue-eternal-loading :load="load"></vue-eternal-loading>
</div>

<script>
const URL = 'https://reqres.in/api/users';
const PAGE_SIZE = 5;

const App = {
    data() {
        return {
            page: 1,
            users: [],
        };
    },

    methods: {
        loadUsers(page) {
            return fetch(`${URL}?delay=1&per_page=${PAGE_SIZE}&page=${page}`)
                    .then((res) => res.json())
                    .then((res) => res.data);
        },

        load(action) {
            this.loadUsers(this.page).then((users) => {
                this.users.push(...users);
                this.page += 1;
                action.loaded(users.length, PAGE_SIZE);
            });
        },
    },
};

const app = Vue.createApp(App);
app.component('vue-eternal-loading', window.TSPro.VueEternalLoading);
app.mount('#app');
</script>
```

