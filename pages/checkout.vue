<template>
  <div class="px-4">
    <div class="border-b pb-4 mt-5 max-w-6xl m-auto font-semibold">
      <h2 class="text-2xl">Check Out</h2>
    </div>
  </div>
  <section class="max-w-5xl m-auto pt-8 overflow-hidden px-4 mt-10 mb-6">
    <div class="shadow-xl bg-white px-4 border-b py-4 rounded-sm">
      <div v-if="cartResponse" class="text-xl font-semibold">
        <h2>Cart Response:</h2>
        <p>{{ cartResponse }}</p>
      </div>
    </div>
  </section>
</template>

<script>
import { useProductStore } from "../stores/product";
export default {
  computed: {
    cartResponse() {
      const productStore = useProductStore();
      return productStore.cartResponse;
    },
  },
};
</script>
