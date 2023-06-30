# Styling with slots

**vue-eternal-loading** provides 4 slots for each state, allowing you to set custom templates for each of them. The default templates for each state were described in the previous section. You can style the templates using regular CSS. If you require different markup, text, or more complex customization, you can pass your own template to the appropriate slot.

```html
<template>
    <div>
        <div v-for="item in items" :key="item.id" class="card mb-3">
            <!-- Item content goes here-->
        </div>

        <VueEternalLoading :load="load">
            <template #loading>
                <div class="my-loading">
                    Trying to load content...
                </div>
            </template>

            <template #no-more>
                <div class="my-no-more">
                    There is no more content.
                </div>
            </template>


            <template #no-results>
                <div class="my-no-results">
                    It's empty here.
                </div>
            </template>
            
            <template #error>
                <div class="my-error">
                    Oops. We've got an error.
                </div>
            </template>
        </VueEternalLoading>
    </div>
</template>
```

<iframe width="100%" height="300" src="//jsfiddle.net/gavrashenko/ucxt3qog/5/embedded/result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

---

Alternatively, you can use a fancy Bootstrap spinner or any other spinner component by providing your own custom template in the loading slot:

<iframe width="100%" height="300" src="//jsfiddle.net/gavrashenko/ajfky3se/20/embedded/result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

---

In the loading slot, you have access to the `isFirstLoad` data through the scoped slot. This data can be utilized when you want to display a different loader for the first time, such as a skeleton loading animation or any other specific design or content.

```html
<template>
    <div>
        <div v-for="item in items" :key="item.id" class="card mb-3">
            <!-- Item content goes here-->
        </div>

        <VueEternalLoading :load="load">
            <template #loading="{ isFirstLoad }">
                
                <!-- There can be any component, e.g. skeleton loader -->
                <div v-if="isFirstLoad">
                    First loading attempt
                </div>

                <!-- Show normal loader for 2+ loadings -->
                <div v-else class="text-center">
                    <div class="spinner-border text-success" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>

            </template>
        </VueEternalLoading>
    </div>
</template>
```

<iframe width="100%" height="300" src="//jsfiddle.net/gavrashenko/x4rn37bj/22/embedded/result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>




