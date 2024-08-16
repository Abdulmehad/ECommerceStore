<template>
    <div class="container">
      <h1 class="t">Category: "{{ searchedcategory }}"</h1>
      <ProductList :products="products" />
      <CartButton @click="showCart = true" />
      <CartModal 
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
  import { useCategoryStore } from '~/store/category'
  import CartButton from '../components/CartButton.vue'
  import CartModal from '../components/CartModal.vue'
  import ProductList from '../components/ProductList.vue'
  
  export default {
    components: {
      ProductList,
      CartButton,
      CartModal
    },
    setup() {
      const cartStore = useCartStore()
      const categoryStore = useCategoryStore()
      return {
        cartStore,
        categoryStore
      }
    },
    data() {
      return {
        products: [],
        showCart: false,
        searchedcategory: '' // Declare searchedcategory in data
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
    methods: {
      updateQuantity(product, amount) {
      this.cartStore.updateQuantity(product, amount)
    },
        async fetchProducts() {
    let url = 'https://fakestoreapi.com/products';
    if (this.searchedcategory) {
      url += `/category/${this.searchedcategory}`;
    }
    try {
      const response = await fetch(url);
      const data = await response.json();
      this.products = data;
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  },
      updateQuantity(product, amount) {
        this.cartStore.updateQuantity(product, amount)
      },
      goToCheckout() {
        this.$router.push("/checkout")
      },
    },
    watch: {
  '$route.query.q': {
    handler(newVal) {
      this.searchedcategory = newVal ? newVal.replace(/^category\//, '') : '';
      this.fetchProducts();
    },
    immediate: true,
  },
},
mounted() {
  this.searchedcategory = this.$route.query.q ? this.$route.query.q.replace(/^category\//, '') : '';
  this.fetchProducts();
},
  }
  </script>
  