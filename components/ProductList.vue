<template>
    <div class="products">
      <ProductCard
        v-for="product in products" 
        :key="product.id"
        :product="product"
      />
    </div>
  </template>
  
  <script>
  import ProductCard from './ProductCard.vue'
  
  export default {
    components: {
      ProductCard
    },
    props: {
      products: {
        type: Array,
        required: true
      }
    },
  }
  </script>
  
  <style scoped>
  /* Your product list styles */
  </style>