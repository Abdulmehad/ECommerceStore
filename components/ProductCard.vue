<template>
  <div class="card" @click="goToProduct(product.id)">
    <div class="second-content">
      <img :src="product.image" :alt="product.title" />
    </div>
    <div class="first-content">
      <h1>{{ product.title }}</h1>
      <p><span>Price: $</span>{{ product.price }}</p>
      <button
        v-if="!itemInCart"
        class="addtocart"
        @click.stop="addToCart"
      >
        Add to Cart
      </button>
      <button
        v-else
        class="addtocart"
        style="background-color: #e74c3c"
        @click.stop="removeFromCart"
      >
        Remove Item
      </button>
    </div>
  </div>
</template>

<script>
import { useCartStore } from '~/store/cart'

export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  setup() {
    const cartStore = useCartStore()
    return { cartStore }
  },
  computed: {
    itemInCart() {
      return this.cartStore.cart.some(item => item.id === this.product.id)
    }
  },
  methods: {
    goToProduct(id) {
      this.$router.push({ name: 'product', query: { q: id } });
    },
    addToCart() {
      this.cartStore.addToCart(this.product)
    },
    removeFromCart() {
      this.cartStore.removeFromCart(this.product.id)
    }
  }
}
</script>

