import { defineStore } from "pinia";

export const useProductStore = defineStore({
  id: "product",
  state: () => ({
    selectedProducts: [],
  }),
  getters: {
    totalQuantity() {
      return this.selectedProducts.reduce(
        (total, product) => total + product.quantity,
        0
      )
    },
    totalPrice() {
      return this.selectedProducts.reduce(
        (total, product) => total + product.price * product.quantity,
        0
      )
    }
  },
  actions: {
    addProduct(product) {
      const existingProduct = this.selectedProducts.find(
        p => p.id === product.id
      )
      if (existingProduct) {
        existingProduct.quantity++
      } else {
        this.selectedProducts.push({
          ...product,
          quantity: 1
        })
      }
    },
    removeProduct(productId) {
      const index = this.selectedProducts.findIndex(p => p.id === productId)
      if (index !== -1) {
        const product = this.selectedProducts[index]
        if (product.quantity > 1) {
          product.quantity--
        } else {
          this.selectedProducts.splice(index, 1)
        }
      }
    },
    async addToCart() {
      const cartResponses = []
      for (const product of this.selectedProducts) {
        const response = await fetch(
          'https://api.rushbrush.dev/cart/add-item',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              sku: product.sku,
              quantity: product.quantity
            })
          }
        )

        if (!response.ok) {
          console.error(
            `Failed to add item to cart: SKU ${product.sku}, Quantity ${product.quantity}, Status ${response.status}`
          )
        } else {
          const cartResponse = await response.json()
          cartResponses.push(cartResponse)
        }
      }
      this.cartResponse = cartResponses
    }
  },
  persist: {
    storage: persistedState.localStorage,
  },
});
