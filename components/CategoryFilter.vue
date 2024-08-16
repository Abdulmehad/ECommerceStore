<template>
    <div class="filter-section">
      <h3>Category</h3>
      <div v-for="category in categories" :key="category">
        <label>
          <input 
            type="checkbox" 
            :value="category" 
            :checked="value.includes(category)"
            @change="updateCategory(category)"
          />
          {{ category }}
        </label>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      value: Array,
      categories: Array
    },
    emits: ['input'],
    methods: {
      updateCategory(category) {
        const updatedCategories = this.value.includes(category)
          ? this.value.filter(c => c !== category)
          : [...this.value, category];
        this.$emit('input', updatedCategories);
      }
    }
  }
  </script>