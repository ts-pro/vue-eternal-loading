<template>
  <div class="box" ref="boxRef">
    <button @click="reset">Reset list</button>
    <div v-for="(item, index) in items" :key="index" class="item">
      page {{ parseInt(index / 10) + 1 }} | {{ item }}
    </div>
    <VueEternalLoading
      v-model:is-initial="isInitial"
      :load="load"
      :container="boxRef"
    >
    </VueEternalLoading>
  </div>
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
    const boxRef = ref<HTMLElement | null>(null);
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
      boxRef,
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
.box {
  width: 500px;
  height: 500px;
  outline: 1px solid black;
  overflow: scroll;
}
</style>
