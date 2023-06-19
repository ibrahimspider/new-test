<template>
  <nav class="bg-[#1e1e1e] text-white p-5">
    <div class="flex justify-between">
      <div>
        <nuxt-link to="/">RUSHBRUSH</nuxt-link>
      </div>
      <div>
        <ul class="flex">
          <li class="mr-3"><nuxt-link to="/">Home</nuxt-link></li>
          <li class="mr-3 relative">
            <nuxt-link to="/cart"
              >Cart <span class=" absolute text-[10px] top-0 right-[-15px] bg-white text-black w-4 h-4 text-center font-semibold rounded-full">{{ totalQuantity }}</span></nuxt-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import { useProductStore } from "../stores/product";
export default {
  data() {
    return {};
  },
  methods: {},
  computed: {
    totalQuantity() {
      const productStore = useProductStore();
      return productStore.totalQuantity;
    },
  },
};
</script>
