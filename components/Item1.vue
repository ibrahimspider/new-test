<template>
  <section
    class="max-w-5xl m-auto pt-8 overflow-hidden px-4 mt-10 mb-6"
    v-if="product"
  >
    <div
      class="grid grid-cols-3 gap-4 shadow-xl bg-white px-4 border-b py-4 rounded-sm"
    >
      <div class="col-span-1">
        <div class="p-4">
          <img :src="product.image_featured_path" alt="" />
        </div>
      </div>
      <div class="col-span-2">
        <div class="border-b pb-4 mb-3">
          <h2 class="text-xl">{{ product.name }}</h2>
        </div>
        <div>
          <p class="text-sm text-teal-700 mb-3">{{ product.tagline }}</p>
          <p class="text-gray-500">{{ product.description }}</p>
          <div class="flex justify-between py-4 font-semibold">
            <p>{{ product.discount.discount_price }} EGP</p>
            <p>{{ product.discount.discountـpercentage }}% OFF</p>
            <p class="line-through text-gray-600">{{ product.price }} EGP</p>
          </div>
        </div>
        <button
          class="py-2 px-8 bg-slate-600 text-white rounded-sm"
          @click="addProduct(product)"
        >
          Add To Cart
        </button>
      </div>
    </div>
  </section>
</template>
<script>
import axios from "axios";
import { useProductStore } from "../stores/product";
export default {
  data() {
    return {
      product: null,
    };
  },
  methods: {
    async fetchData() {
      const headers = {
        "X-rushbrush-website": "eg-en",
      };
      await axios
        .get("https://api.rushbrush.dev/catalog/products/c1-pentium", {
          headers,
        })
        .then((response) => {
          this.product = response.data.data.product;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    addProduct(product) {
      const productStore = useProductStore();
      productStore.addProduct(product);
      navigateTo("/cart");
    },
  },
  computed: {
    selectedProducts() {
      const productStore = useProductStore();
      return productStore.selectedProducts;
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
