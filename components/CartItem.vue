<template>
    <div class="cart-item">
      <img :src="item.image" :alt="item.title" class="cart-item-image" />
      <div class="cart-item-details">
        <p>{{ item.title }}</p>
        <p>Price: ${{ item.price }}</p>
        <div class="quantity-control">
          <button @click="updateQuantity(-1)">-</button>
          <span>{{ item.quantity }}</span>
          <button @click="updateQuantity(1)">+</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      item: Object
    },
    methods: {
      updateQuantity(amount) {
        this.$emit('update-quantity', this.item, amount)
      }
    }
  }
  </script>
  
  <style scoped>
  /* Your cart item styles */
  </style>