<template>
  <div class="px-4">
    <div class="border-b pb-4 mt-5 max-w-6xl m-auto font-semibold">
      <h2 class="text-2xl">Check Out</h2>
    </div>
  </div>
  <section class="max-w-5xl m-auto pt-8 overflow-hidden px-4 mt-10 mb-6">
    <div class="shadow-xl bg-white px-4 border-b py-4 rounded-sm">
      <div class="grid md:grid-cols-3 gap-4">
        <div class="md:col-span-2 mb-4">
          <!-- Payment Method -->
          <h3 class="mb-4">Payment Method:</h3>
          <div
            class="flex justify-between p-2 border rounded-sm mb-2"
            v-for="(method, index) in paymentsList"
            :key="index"
          >
            <input
              type="radio"
              :id="index"
              v-model="paymentMethodSelected"
              :value="index"
            />
            <label :for="index">{{ method.name }}</label>
            <img :src="method.icon" class="w-12" />
          </div>
          <!-- Payment address -->
          <h3 class="my-6">Ship to new address:</h3>
          <form>
            <div class="mb-2 flex justify-between">
              <input
                class="p-2 border rounded-md w-[90%] mr-2"
                type="text"
                placeholder="First Name"
              />
              <input
                class="p-2 border rounded-md w-[90%]"
                type="text"
                placeholder="Last Name"
              />
            </div>
            <div class="mb-2 flex justify-between">
              <input
                class="p-2 border rounded-md w-[90%] mr-2"
                type="email"
                placeholder="Email"
              />
              <input
                class="p-2 border rounded-md w-[90%]"
                type="number"
                placeholder="Telephone"
              />
            </div>
            <div class="mb-2 flex justify-between">
              <select name="Country" class="p-2 border rounded-md w-[90%] mr-2">
                <option disabled="disabled" value="">
                  Please Select Country
                </option>
                <option value="EG">Egypt</option>
              </select>
              <select name="Country" class="p-2 border rounded-md w-[90%] mr-2">
                <option disabled="disabled" value="">Please Select City</option>
                <option value="1">Alexandria</option>
                <option value="6">Cairo</option>
              </select>
            </div>
            <div class="mb-2">
              <input
                class="p-2 border rounded-md w-full"
                type="text"
                placeholder="Street Address 1"
              />
            </div>
            <div class="mb-2">
              <input
                class="p-2 border rounded-md w-full"
                type="text"
                placeholder="Street Address 2"
              />
            </div>
            <div class="mb-2">
              <input
                class="p-2 border rounded-md w-full"
                type="text"
                placeholder="Zip/Postal Code"
              />
            </div>
            <button class="py-2 px-6 bg-slate-500 text-white rounded-md mt-4">Place Order</button>
          </form>
        </div>
        <!-- total price -->
        <div class="md:col-span-1">
          <div class="rounded-md overflow-hidden bg-slate-100">
            <p class="text-lg bg-slate-500 text-white p-2">Total Cart</p>
            <div class="flex justify-between p-2 py-8">
              <span>Grand Total </span>
              <span v-if="totalPrice" class="font-semibold"
                >{{ totalPrice }} EGP</span
              >
              <span v-else class="font-semibold">00</span>
            </div>
          </div>
        </div>
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
      paymentsList: null,
      paymentMethodSelected: "",
    };
  },
  computed: {
    cartResponse() {
      const productStore = useProductStore();
      return productStore.cartResponse;
    },
    totalPrice() {
      const productStore = useProductStore();
      return productStore.totalPrice;
    },
  },
  methods: {
    async fetchPayment() {
      await axios
        .get("https://api.rushbrush.dev/payments")
        .then((response) => {
          this.paymentsList = response.data.data.payments;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  mounted() {
    this.fetchPayment();
  },
};
</script>
