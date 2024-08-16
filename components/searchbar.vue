<template>
  <div class="searchbar-container" :class="{ 'focused': isFocused }">
    <input
      type="text"
      v-model="internalQuery"
      @focus="isFocused = true"
      @blur="handleBlur"
      placeholder="Search products..."
      @keypress="handleKeyPress"
    />
    <div class="searchicon" @click="performSearch">
      <svg class="h-6 w-6 text-white" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z"/>
        <circle cx="10" cy="10" r="7" />
        <line x1="21" y1="21" x2="15" y2="15" />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      internalQuery: '',
      isFocused: false
    };
  },
  methods: {
    handleKeyPress(event) {
      if (event.key === 'Enter') {
        this.performSearch();
      }
    },
    performSearch() {
      if (this.internalQuery.trim()) {
        this.$emit('inputt', this.internalQuery);
      }
    },
    handleBlur() {
      this.isFocused = false;
    }
  }
};
</script>

<style scoped>
.searchbar-container {
  width: 100%;
  max-width: 600px;
  margin: 20px auto;
  position: relative;
  display: flex;
  align-items: center;
  border-radius: 30px;
  transition: all 0.3s ease;
}

.searchbar-container input {
  width: 100%;
  padding: 15px 60px 15px 20px;
  font-size: 16px;
  border: none;
  border-radius: 30px;
  background-color: white;
  transition: all 0.3s ease;
}

.searchbar-container input:focus {
  outline: none;
}

.searchbar-container input::placeholder {
  color: #95a5a6;
}

.searchicon {
  position: absolute;
  right: 0;
  width: 50px;
  height: 100%;
  background-color: #1476D1;
  border-radius: 0 30px 30px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.searchbar-container.focused {
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.searchbar-container.focused .searchicon {
  background-color: #0d5ca1;
}

@media (max-width: 768px) {
  .searchbar-container {
    max-width: 90%;
  }
  
  .searchbar-container input {
    font-size: 14px;
    padding: 12px 50px 12px 16px;
  }

  .searchicon {
    width: 40px;
  }
}

@media (max-width: 480px) {
  .searchbar-container input {
    font-size: 13px;
    padding: 10px 45px 10px 14px;
  }

  .searchicon {
    width: 35px;
  }

  .searchicon svg {
    width: 20px;
    height: 20px;
  }
}
</style>