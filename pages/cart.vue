<template>
  <div class="px-4">
    <div class="border-b pb-4 mt-5 max-w-6xl m-auto font-semibold">
      <h2 class="text-2xl">My Cart</h2>
    </div>
  </div>
  <section
    class="max-w-5xl m-auto pt-8 overflow-hidden px-4 mt-10 mb-6"
    v-for="item in selectedProducts"
    :key="item"
  >
    <div
      class="grid md:grid-cols-3 gap-4 shadow-xl bg-white px-4 border-b py-4 rounded-sm"
    >
      <div class="md:col-span-1">
        <div class="p-4">
          <img :src="item.image_featured_path" alt="" />
        </div>
      </div>
      <div class="md:col-span-2">
        <div class="border-b pb-4 mb-3">
          <h2 class="text-xl">{{ item.name }}</h2>
        </div>
        <div>
          <p class="text-sm text-teal-700 mb-3">{{ item.tagline }}</p>
          <p class="text-gray-500">{{ item.description }}</p>
          <div class="flex justify-between py-4 font-semibold">
            <p>{{ item.discount.discount_price }} EGP</p>
            <p>{{ item.discount.discountـpercentage }}% OFF</p>
            <p class="line-through text-gray-600">{{ item.price }} EGP</p>
          </div>
        </div>
        <!-- hr style -->
        <div class="w-[80%] m-auto border-b mb-8 mt-4"></div>
        {{ item.options[0].sku }}
        <div class="flex justify-between">
          <div class="flex justify-center items-center">
            <!-- add product -->
            <button
              @click="addProduct(item)"
              class="bg-green-600 py-[9px] w-9 rounded-sm mr-1 text-white"
            >
              +
            </button>
            <input
              type="number"
              disabled
              class="py-2 border-slate-600 border rounded-sm text-center"
              v-model="item.quantity"
            />
            <button
              @click="removeProduct(item.id)"
              class="bg-green-600 py-[9px] w-9 rounded-sm ml-1 text-white"
            >
              -
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div class="flex justify-end max-w-6xl px-[22px]">
    <div class="md:w-[300px] w-full bg-white p-4 mb-8 shadow-md">
      <div class="flex justify-between mb-6">
        <span class="text-lg">Total :</span>
        <span v-if="totalPrice" class="font-semibold"
          >{{ totalPrice }} EGP</span
        >
        <span v-else class="font-semibold">00</span>
      </div>
      <div>
        <nuxt-link
          @click="addToCart"
          class="w-full py-2 text-center inline-block bg-slate-500 text-white rounded-sm"
          to="/checkout"
          >check out</nuxt-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { useProductStore } from "../stores/product";
export default {
  data() {
    return {};
  },
  methods: {
    addProduct(product) {
      const productStore = useProductStore();
      productStore.addProduct(product);
    },
    removeProduct(productId) {
      const productStore = useProductStore();
      productStore.removeProduct(productId);
    },
    addToCart() {
      const productStore = useProductStore();
      productStore.addToCart();
    },
  },
  computed: {
    selectedProducts() {
      const productStore = useProductStore();
      return productStore.selectedProducts;
    },
    totalPrice() {
      const productStore = useProductStore();
      return productStore.totalPrice;
    },
    cartResponse() {
      const productStore = useProductStore();
      return productStore.cartResponse;
    },
  },
};
</script>
