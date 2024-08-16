// store/cart.js
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: [],
    totalPrice: 0
  }),
  actions: {
    setCart(newCart) {
      this.cart = newCart
    },
    setTotalPrice(newTotalPrice) {
      this.totalPrice = newTotalPrice
    },
    addToCart(product) {
      const existingItem = this.cart.find(item => item.id === product.id)
      if (existingItem) {
        existingItem.quantity++
      } else {
        this.cart.push({ ...product, quantity: 1 })
      }
      this.updateTotalPrice()
    },
    removeFromCart(itemId) {
      this.cart = this.cart.filter(item => item.id !== itemId)
      this.updateTotalPrice()
    },
    updateQuantity(product, amount) {
      const cartItem = this.cart.find(item => item.id === product.id)
      if (cartItem) {
        cartItem.quantity += amount
        if (cartItem.quantity <= 0) {
          this.removeFromCart(product.id)
        } else {
          this.updateCartItem(cartItem)
        }
        this.updateTotalPrice()
      }
    },
    updateCartItem(updatedItem) {
      const index = this.cart.findIndex(item => item.id === updatedItem.id)
      if (index !== -1) {
        this.cart[index] = updatedItem
      }
    },
    updateTotalPrice() {
      this.totalPrice = this.cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)
    },
    clearCart() {
      this.cart = []
      this.totalPrice = 0
    }
  },
  getters: {
    getCart: (state) => state.cart,
    getTotalPrice: (state) => state.totalPrice
  }
})