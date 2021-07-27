# Styling with slots

**vue-eternal-loading** has 4 slots for each state, and you can set custom template for each of them. Default templates are described in the previous section. You can style them as you want using normal css. In case when you need different markup, text, or something more complex, you need to pass your own template to the proper slot:

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

<iframe width="100%" height="300" src="//jsfiddle.net/gavrashenko/ucxt3qog/4/embedded/result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

---

Or we can put fancy boostrap spinner:

<iframe width="100%" height="300" src="//jsfiddle.net/gavrashenko/ajfky3se/19/embedded/result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>

---

In the loading slot we have access to isFirstLoad data via scoped slot. This data can be used when we want to show different loader for the fist time ( e.g. skeleton loading ).

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

<iframe width="100%" height="300" src="//jsfiddle.net/gavrashenko/x4rn37bj/21/embedded/result/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>




