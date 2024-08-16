<template>
  <div>
  <div v-if="error" class="error">
    {{ error }}
  </div>
  <div v-else-if="loading" class="loading">
    Loading...
  </div>
  <div v-else-if="product" class="product-page">
    <div class="product-image">
      <img :src="product.image" :alt="product.title">
    </div>
    <div class="product-details">
      <h1>{{ product.title }}</h1>
      <p class="price">${{ product.price.toFixed(2) }}</p>
      <p class="description">{{ product.description }}</p>
      <p class="category">Category: {{ product.category }}</p>
      <div class="rating">
        <span>Rating: {{ product.rating.rate }} / 5</span>
        <span>({{ product.rating.count }} reviews)</span>
      </div>
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
  <div v-if="suggestedProducts.length > 0" class="suggested-products">
      <h2>You might also like:</h2>
      <div class="suggested-products-list">
        <div v-for="suggestedProduct in suggestedProducts" :key="suggestedProduct.id" class="suggested-product" @click="goToProduct(suggestedProduct.id)">
          <img :src="suggestedProduct.image" :alt="suggestedProduct.title">
          <h3>{{ suggestedProduct.title }}</h3>
          <p>${{ suggestedProduct.price.toFixed(2) }}</p>
        </div>
      </div>
    </div>
  <cart-button @click="showCart = true" />
    <cart-modal 
      v-if="showCart" 
      :show="showCart" 
      @close="showCart = false"
      :cart-items="carts"
      :total-price="totalprices"
      @update-quantity="updateQuantity"
      @go-to-checkout="goToCheckout"
    />
</div>
  
</template>

<script>
import { useCartStore } from '~/store/cart'
import CartButton from '../components/CartButton.vue'
import CartModal from '../components/CartModal.vue'

export default {
   name: 'product',
  components: {
    CartButton,
    CartModal
  },
  setup() {
    const cartStore = useCartStore()

    return {
      cartStore,
    }
  },
  data() {
    return {
      product: null,
      loading: true,
      error: null,
      cartStore: useCartStore(),
      showCart: false,
      suggestedProducts: [],
    }
  },
  computed: {
    carts() {
      return this.cartStore.cart
    },
    totalprices() {
      return this.cartStore.totalPrice
    },
    itemInCart() {
      return this.cartStore.cart.some(item => item.id === this.product.id)
    }
  },
  watch: {
    '$route.query.q': {
      immediate: true,
      handler(newId) {
        if (newId) {
          this.fetchProduct(newId)
        }
      }
    },
    product: {
      immediate: true,
      handler(newProduct) {
        if (newProduct) {
          this.fetchSuggestedProducts()
        }
      }
    }
  },

  methods: {
    
    updateQuantity(product, amount) {
      this.cartStore.updateQuantity(product, amount)
    },
    async fetchProduct(id) {
      this.loading = true
      this.error = null
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`)
        if (!response.ok) throw new Error('Failed to fetch product')
        this.product = await response.json()
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },
    async fetchSuggestedProducts() {
      try {
        const url =`https://fakestoreapi.com/products/category/${this.product.category}`
        const response = await fetch(url)
        const pr = await response.json()
        this.suggestedProducts = pr.filter(p => p.id !== this.product.id)
      } catch (err) {
        console.error('Error fetching suggested products:', err)
      }
    },

    addToCart() {
      this.cartStore.addToCart(this.product)
    },
    removeFromCart() {
      this.cartStore.removeFromCart(this.product.id)
    },
    goToProduct(id) {
      this.$router.push({ path: '/productpage', query: { q: id} });
    },
    goToCheckout() {
      this.$router.push("/checkout")
    },
  }
}
</script>




  <style scoped>
  .error, .loading {
  text-align: center;
  padding: 20px;
  font-size: 18px;
}

.error {
  color: red;
}
  .product-page {
    display: flex;
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
    height: 100vh;
  }
  
  .product-image {
    flex: 1;
    padding: 20px;
  }
  
  .product-image img {
    max-width: 100%;
    height: 60%;
  }
  
  .product-details {
    flex: 1;
    padding: 20px;
  }
  
  h1 {
    font-size: 24px;
    margin-bottom: 10px;
  }
  
  .price {
    font-size: 20px;
    font-weight: bold;
    color: #e44d26;
    margin-bottom: 10px;
  }
  
  .description {
    margin-bottom: 15px;
  }
  
  .category {
    font-style: italic;
    margin-bottom: 10px;
  }
  
  .rating {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  



.suggested-products {
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 20px;
}

.suggested-products h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

.suggested-products-list {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding-bottom: 20px;
}

.suggested-product {
  flex: 0 0 auto;
  width: 200px;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.suggested-product:hover {
  transform: scale(1.05);
}

.suggested-product img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
}

.suggested-product h3 {
  font-size: 16px;
  margin: 10px 0 5px;
}

.suggested-product p {
  font-weight: bold;
  color: #e44d26;
}

  </style>