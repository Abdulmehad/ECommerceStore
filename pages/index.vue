<template>
  <div class="container">
    <title>Shopping Area</title>
    <h1 class="t">"Where Quality Meets Convenience"</h1>
    <searchbar @inputt="handleSearch" />
    <product-list :products="products" />
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
import { useCategoryStore } from '~/store/category'
import CartButton from '../components/CartButton.vue'
import CartModal from '../components/CartModal.vue'
import Searchbar from '../components/searchbar.vue'
import ProductList from '../components/ProductList.vue'

export default {
   name: 'home',
  components: {
    Searchbar,
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
    }
  },
  computed: {
    category() {
      return this.categoryStore.getCategory
    },
    carts() {
      return this.cartStore.cart
    },
    totalprices() {
      return this.cartStore.totalPrice
    },
  },
  methods: {
    handleSearch(query) {
      this.$router.push({ path: '/searchresult', query: { q: query } });
    },
    async fetchProducts() {
      const url = `https://fakestoreapi.com/products`
      const response = await fetch(url)
      const data = await response.json()
      this.products = data
    },
    updateQuantity(product, amount) {
      this.cartStore.updateQuantity(product, amount)
    },
    goToCheckout() {
      this.$router.push("/checkout")
    },
  },
  watch: {
    category: {
      handler() {
        this.fetchProducts()
      },
      immediate: true,
    },
  },
}
</script>
  
  
  
  
  
  <style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Arial', sans-serif;
  }
  
  body {
    background-color: #f0f0f0;
  }
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    padding: 40px 20px;
    min-height: 100vh;
  }
  
  .products {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 20px;
  }
  
  .t {
    color: #2c3e50;
    font-size: 48px;
    font-weight: 700;
    margin: 30px 0;
    text-align: center;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
  }
  
  .card {
    background: white;
    border-radius: 15px;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    margin: 20px;
    padding: 25px;
    width: 300px;
    height: 400px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    overflow: hidden;
  }
  
  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  }
  
  .second-content {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .second-content img {
    height: 200px;
    width: 200px;
    object-fit: contain;
    border-radius: 10px;
  }
  
  .first-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }
  
  .first-content h1 {
    font-weight: 600;
    color: #34495e;
    margin-bottom: 10px;
    text-align: center;
    font-size: calc(16px + (14 - 16) * ((100vw - 300px) / (1600 - 300)));
    line-height: 1;
  }
  
  .first-content p {
    font-size: 16px;
    font-weight: 500;
    color: #7f8c8d;
    margin-bottom: 15px;
    text-align: center;
  }
  
  .addtocart {
    background-color: #3498db;
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    transition: background-color 0.3s ease;
    width: 100%;
  }
  
  .addtocart:hover {
    background-color: #2980b9;
  }
  
  .cart {
    position: fixed;
    bottom: 30px;
    right: 30px;
    background-color: #2ecc71;
    color: white;
    padding: 15px 25px;
    border: none;
    border-radius: 50px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  .cart svg{
    height: 20px;
    width: 20px;
  }
  
  .cart:hover {
    background-color: #27ae60;
    transform: scale(1.05);
  }
  .cart-page{
    position: fixed;
    top: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.7);
  }
  .cartitems{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: auto;
    /* overflow-y: auto; */
    margin-top: 100px;
    margin-bottom: 120px;
    padding-top: 20px;
  }
  
  .cart-page2 {
    position: fixed;
    top: 0;
    right: 0;
    width: 30%;
    height: 100vh;
    background-color: white;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    align-items: center;
    color: #34495e;
    z-index: 1000;
    overflow-y: auto;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  }
  
  
  
  .cart-item {
    background-color: white;
    color: #34495e;
    padding: 15px;
    margin: 10px;
    border-radius: 10px;
    width: 300px;
    /* max-width: 400px; */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    /* min-width: 600px; */
  }
  
  .cart-item-image {
    height: 50px;
    width: 50px;
    object-fit: contain;
    margin-right: 10px;
  }
  
  .cart-item-details {
    flex: 1;
    display: flex;
    flex-direction: column;
    /* justify-content: space-between; */
  }
  
  .quantity-control {
    display: flex;
    align-items: center;
    /* justify-content: center; */
  }
  
  .quantity-control button {
    background-color: #3498db;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
  }
  
  .quantity-control button:hover {
    background-color: #2980b9;
  }
  .endcart{
    position: fixed;
    bottom: 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    width: 29%;
    padding: 20px;
    height: auto;
  
  }
  .total-price {
    /* position: fixed; */
    font-size: 20px;
    font-weight: 700;
    /* margin: 10px; */
    /* background-color: white */
  }
  .gotocheckout{
    /* position:fixed; */
    bottom: 30px;
    background-color: #e74c3c;
    color: white;
    padding: 15px 25px;
    border: none;
    border-radius: 50px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin: 10px;
    text-decoration: none;
  }
  .gotocheckout:hover{
    background-color: #c0392b;
    transform: scale(1.05);
  }
  .startcart{
    display: flex;
    justify-content: space-between;
    width: 28%;
    /* padding: 20px; */
    background-color: white;
    position: fixed;
  }
  .backtostore{
    background-color: #e74c3c;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 50px;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin: 0px;
    position: fixed;
    right: 15px;
    top: 28px;
  }
  .backtostore:hover{
    background-color: #c0392b;
    transform: scale(1.05);
  }
  .cart-page h1 {
    /* position: fixed; */
    /* top: 10px; */
    /* text-align: center; */
    /* z-index: 1001; */
    padding: 30px;
    background-color:white;
    color: black;
  }
  @media (max-width: 768px) {
    .container {
      padding: 20px;
    }
  
    .t {
      font-size: 36px;
      margin: 20px 0;
    }
  
    .card {
      /* width: 100%; */
      height: auto;
      /* margin: 10px 0; */
    }
  
    .second-content img {
      height: 150px;
      width: 150px;
    }
  
    .first-content h1 {
      font-size: 24px;
    }
  
    .first-content p {
      font-size: 14px;
    }
  
    .addtocart {
      font-size: 12px;
      padding: 10px 15px;
    }
  
    .cart {
      bottom: 20px;
      right: 20px;
      padding: 10px 20px;
      font-size: 14px;
    }
  
    .cart-page {
      margin-top: 80px;
      margin-bottom: 80px;
    }
  
    .cart-item {
      padding: 10px;
      margin: 5px;
      width: 300px;
    }
  
    .cart-item-image {
      height: 40px;
      width: 40px;
    }
  
    .quantity-control button {
      padding: 3px 8px;
      font-size: 12px;
    }
  
    .endcart {
      width: 100%;
      padding: 10px;
    }
  
    .total-price {
      font-size: 16px;
    }
  
    .gotocheckout {
      bottom: 20px;
      padding: 10px 20px;
      font-size: 14px;
    }
  
    .startcart {
      width: 100%;
    }
  
    .backtostore {
      padding: 8px 12px;
      font-size: 10px;
      right: 10px;
      top: 20px;
    }
  
    .cart-page h1 {
      padding: 20px;
    }
    .cart-page2 {
      width: 100%;
    }
    .t{
      font-size: 20px;
    }
  }


  </style>
  