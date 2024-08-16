<template>
  <div class="scontainer">
    <div class="filters">
      <h2>Filters</h2>
      <div class="filter-section">
        <h3>Price</h3>
        <client-only>
          <vue-slider v-model="priceFilter" :min="0" :max="1000" :range="true" />
        </client-only>
        <p>Price Range: {{ priceFilter[0] }} - {{ priceFilter[1] }}</p>
      </div>
      <div class="filter-section">
        <h3>Category</h3>
        <div v-for="category in categories" :key="category">
          <label>
            <input 
              type="checkbox" 
              :value="category" 
              v-model="categoryFilter" 
            />
            {{ category }}
          </label>
        </div>
      </div>
      <div class="filter-section">
        <h3>Rating</h3>
        <input 
          type="range" 
          v-model="ratingFilter" 
          min="1" 
          max="5" 
          step="0.1"
        />
        <p>Min Rating: {{ ratingFilter }}</p>
      </div>
      <button @click="applyFilters">Search</button>
      <button @click="removeFilters">Remove Filters</button>
    </div>
    <div class="products">
      <h1 class="t">Search Results for "{{ searchQuery }}"</h1>
      <product-list :products="filteredProducts" />
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
import Searchbar from '../components/searchbar.vue'
import ProductList from '../components/ProductList.vue'
import CartButton from '../components/CartButton.vue'
import CartModal from '../components/CartModal.vue'
import VueSlider from "vue-simple-range-slider"
import "vue-simple-range-slider/css"

export default {
  components: { 
    Searchbar,
    ProductList,
    VueSlider ,
    CartButton,
    CartModal
  },
  setup() {
    const cartStore = useCartStore()
    return {
      cartStore
    }
  },
  data() {
    return {
      searchQuery: '',
      products: [],
      filteredProducts: [],
      priceFilter: [0, 1000], // [minPrice, maxPrice]
      categoryFilter: [],
      ratingFilter: 1,
      showCart: false,
      categories: [
        'electronics', 
        'jewelery', 
        "men's clothing", 
        "women's clothing"
      ]
    }
  },
  computed: {
    carts() {
      return this.cartStore.cart
    },
    totalprices() {
      return this.cartStore.totalPrice
    },
  },
  async mounted() {
    this.searchQuery = this.$route.query.q || '';
    await this.fetchProducts();
    this.applyFilters();
  },
  methods: {
    updateQuantity(product, amount) {
      this.cartStore.updateQuantity(product, amount)
    },
    async fetchProducts() {
      const url = `https://fakestoreapi.com/products`
      const response = await fetch(url)
      const data = await response.json()
      this.products = data
    },
    applyFilters() {
      let filtered = this.products.filter((product) => {
        return product.title.toLowerCase().includes(this.searchQuery.toLowerCase());
      });

      filtered = filtered.filter((product) => {
        const matchesPrice = product.price >= this.priceFilter[0] && product.price <= this.priceFilter[1];
        const matchesCategory = this.categoryFilter.length 
          ? this.categoryFilter.includes(product.category) 
          : true;
        const matchesRating = product.rating.rate >= this.ratingFilter;
        return matchesPrice && matchesCategory && matchesRating;
      });

      this.filteredProducts = filtered;
    },
    removeFilters() {
      this.priceFilter = [0, 1000];
      this.categoryFilter = [];
      this.ratingFilter = 1;
      this.applyFilters();
    },
    itemInCart(id) {
      return this.carts.some((item) => item.id === id)
    },
    addToCart(product) {
      this.cartStore.addToCart(product)
    },
    removeFromCart(itemId) {
      this.cartStore.removeFromCart(itemId)
    },
    goToCheckout() {
      this.$router.push("/checkout")
    },
  }
}
</script>

<style scoped>
.scontainer {
  display: flex;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  min-height: 100vh;
  padding: 20px;
}

.filters {
  width: 20%;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 20px;
  align-self: flex-start;
  height: fit-content;
}

.products {
  width: 95%;
}

.filter-section {
  margin-bottom: 20px;
}

.filter-section h3 {
  margin-bottom: 10px;
  color: #2c3e50;
}

.filter-section input,
.filter-section select {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

/* Checkbox styles */
.filter-section label {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer;
  font-size: 16px;
  color: #2c3e50;
}

.filter-section input[type="checkbox"] {
  margin-right: 10px;
  width: 18px;
  height: 18px;
  accent-color: #3498db; /* Custom color for checkboxes */
  border: 2px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
}

.filter-section input[type="checkbox"]:checked {
  border-color: #3498db;
}

.filter-section p {
  text-align: center;
  color: #2c3e50;
  font-weight: bold;
}

button {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #2980b9;
}
.categoriescheckbox {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}


@media (max-width: 768px) {
  .scontainer {
    flex-direction: column;
  }

  .filters {
    width: 100%;
    margin-bottom: 20px;
    position: relative;
  }

  .products {
    width: 100%;
    padding-left: 0;
  }
}
</style>