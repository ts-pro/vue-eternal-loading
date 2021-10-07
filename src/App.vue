<template>
  <button @click="reset">Reset list</button>
  <div v-for="(item, index) in items" :key="index" class="item">
    page {{ parseInt(index / 10) + 1 }} | {{ item }}
  </div>
  <VueEternalLoading v-model:is-initial="isInitial" :load="load">
  </VueEternalLoading>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import VueEternalLoading from '@/components/VueEternalLoading/VueEternalLoading.vue';
import { LoadAction } from '@/components/VueEternalLoading/helpers/type/type';

export default defineComponent({
  name: 'App',
  components: {
    VueEternalLoading,
  },

  setup() {
    const items = ref<string[]>([]);
    const isInitial = ref(true);
    let page = 1;

    function load({ loaded, noMore }: LoadAction) {
      setTimeout(() => {
        if (page <= 5) {
          pushItems();
          loaded();
        } else {
          pushItems();
          noMore();
        }
        page += 1;
      }, 1000);
    }

    function pushItems() {
      items.value.unshift(
        'apple',
        'banana',
        'peach',
        'coconut',
        'orange',
        'plum',
        'apricot',
        'strawberry',
        'watermelon',
        'grape'
      );
    }

    function reset() {
      isInitial.value = true;
      items.value = [];
      page = 1;
    }

    return {
      load,
      items,
      isInitial,
      reset,
    };
  },
});
</script>

<style scoped>
button {
  padding: 10px;
  cursor: pointer;
}
.item {
  margin: 5px;
  padding: 5px;
  background-color: #ccc;
}
</style>
