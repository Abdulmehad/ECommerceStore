<template>
  <div>
    <header class="header1">
      <div class="left-section">
        <svg @click="backToHome" class="img1 h-32 w-32 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
        </svg>
        <h1 class="he" @click="backToHome">MY Store</h1>
      </div>
      <div class="right-section">
        <div class="dropdown">
          <button class="dropbtn">Categories</button>
          <div class="dropdown-content">
            <a href="#" @click.prevent="selectCategory('')">
              <img src="https://th.bing.com/th/id/OIP.u-1dWGTM7biu51ZxKpOIiAHaFL?w=239&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="Fashion"> All
            </a>
            <a href="#" @click.prevent="selectCategory('men\'s clothing')">
              <img src="https://th.bing.com/th/id/OIP.DLw5_Nc1QZX5WaejKuiP8QHaE8?w=269&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="Men's Clothing"> Men's Clothing
            </a>
            <a href="#" @click.prevent="selectCategory('electronics')">
              <img src="https://th.bing.com/th/id/OIP.XADlGa0yS4rkbmyRvTvezAHaFj?w=252&h=189&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="Electronics"> Electronics
            </a>
            <a href="#" @click.prevent="selectCategory('women\'s clothing')">
              <img src="https://th.bing.com/th/id/OIP.B_JL-zUDnkfFcQLaDcOvOAAAAA?w=193&h=192&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="Women's Clothing"> Women's Clothing
            </a>
            <a href="#" @click.prevent="selectCategory('jewelery')">
              <img src="https://th.bing.com/th/id/OIF.W98LtnZwz75i6ERc2qoihg?w=182&h=182&c=7&r=0&o=5&dpr=1.3&pid=1.7" alt="jewellery"> Jewellery
            </a>
          </div>
        </div>
        <button class="gotocheckout" @click="checkout">Checkout</button>
      </div>
    </header>
    <slot/>
  </div>
</template>

<script>
import { useCategoryStore } from '~/store/category'

export default {
  setup() {
    const categoryStore = useCategoryStore()
    return { categoryStore }
  },

  data() {
    return {
      selectedCategory: null,
    }
  },

  methods: {
    checkout() {
      this.$router.push('/checkout')
    },
    
    selectCategory(category) {
      console.log('Selected category:', category)  // Debug log
      if (category === '') {
        this.$router.push('/')
      } else {
        this.$router.push({ path: '/category', query: { q: category } })
      }
    },

    backToHome() {
      this.$router.push('/')
    }
  }
}
</script>
  
<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.header1 {
  width: 100%;
  height: 100px;
  background: #1476D1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.left-section {
  display: flex;
  align-items: center;
}

.right-section {
  display: flex;
  align-items: center;
}

.he {
  color: white;
  font-family: Poppins;
  margin-left: 10px;
}

.img1 {
  width: 40px;
  height: 44px;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropbtn {
  background-color: #1476D1;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  font-family: Poppins;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 200px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: flex;
  align-items: center;
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown-content img {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}

.shopping-cart {
  width: 40px;
  height: 40px;
  margin-left: 20px;
  cursor: pointer;
}@media (max-width: 768px) {
  .header1 {
    height: 60px;
    padding: 0 10px;
  }

  .left-section {
    gap: 8px;
  }

  .img1 {
    width: 30px;
    height: 34px;
  }

  .he {
    font-size: 14px;
    margin-left: 6px;
  }

  .dropbtn {
    font-size: 14px;
    padding: 8px 12px;
  }

  .dropdown-content {
    min-width: 180px;
  }

  .dropdown-content a {
    font-size: 14px;
    padding: 8px 12px;
  }

  .dropdown-content img {
    width: 24px;
    height: 24px;
    margin-right: 8px;
  }

  .shopping-cart {
    width: 28px;
    height: 28px;
    margin-left: 12px;
  }
}
    
</style>  