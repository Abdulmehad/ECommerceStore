<template>
    <div class="filters">
      <h2>Filters</h2>
      <PriceFilter 
        :value="priceFilter"
        @input="$emit('update:price-filter', $event)"
      />
      <CategoryFilter 
        :value="categoryFilter"
        :categories="categories"
        @input="$emit('update:category-filter', $event)"
      />
      <RatingFilter 
        :value="ratingFilter"
        @input="$emit('update:rating-filter', $event)"
      />
      <button @click="$emit('apply-filters')">Search</button>
      <button @click="$emit('remove-filters')">Remove Filters</button>
    </div>
  </template>
  
  <script>
  import PriceFilter from './PriceFilter.vue'
  import CategoryFilter from './CategoryFilter.vue'
  import RatingFilter from './RatingFilter.vue'
  
  export default {
    components: {
      PriceFilter,
      CategoryFilter,
      RatingFilter
    },
    props: {
      priceFilter: Array,
      categoryFilter: Array,
      ratingFilter: Number,
      categories: Array
    },
    emits: ['update:price-filter', 'update:category-filter', 'update:rating-filter', 'apply-filters', 'remove-filters']
  }
  </script>
  
