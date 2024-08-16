// store/category.js
import { defineStore } from 'pinia'

export const useCategoryStore = defineStore('category', {
  state: () => ({
    category: ''
  }),
  actions: {
    selectCategory(newCategory) {
      this.category = newCategory
    }
  },
  getters:{
    getCategory: (state) => state.category
  }
})