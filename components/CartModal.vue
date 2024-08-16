<template>
  <div v-if="show" class="cart-page">
    <div class="cart-page2">
      <div class="startcart">
        <h1>Your Cart</h1>
        <button @click="$emit('close')" class="backtostore">X</button>
      </div>
      <div class="cartitems">
        <cart-item 
          v-for="item in cartItems" 
          :key="item.id" 
          :item="item"
          @update-quantity="updateQuantity"
        />
      </div>
      <div class="endcart">
        <div class="total-price">
          <p>Total Price: ${{ totalPrice }}</p>
        </div>
        <button @click="$emit('go-to-checkout')" class="gotocheckout">
          Go to Checkout
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import CartItem from './CartItem.vue'

export default {
  components: {
    CartItem
  },
  props: {
    show: Boolean,
    cartItems: Array,
    totalPrice: Number
  },
  methods: {
    updateQuantity(item, amount) {
      this.$emit('update-quantity', item, amount)
    }
  }
}
</script>

<style scoped>
/* Your cart modal styles */
</style>