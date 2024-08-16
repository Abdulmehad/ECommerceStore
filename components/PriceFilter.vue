<template>
    <div class="filter-section">
      <h3>Price</h3>
      <client-only>
        <vue-slider
          v-model="localValue"
          :min="0"
          :max="1000"
          :interval="1"
          :process="true"
          :tooltip="'always'"
          :tooltipFormatter="formatter"
          @change="updateValue"
        />
      </client-only>
      <p>Price Range: ${{ localValue[0] }} - ${{ localValue[1] }}</p>
    </div>
  </template>
  
  <script>
  import VueSlider from 'vue-slider-component'
  import 'vue-slider-component/theme/default.css'
  
  export default {
    components: { VueSlider },
    props: {
      modelValue: {
        type: Array,
        default: () => [0, 1000]
      }
    },
    emits: ['update:modelValue'],
    data() {
      return {
        localValue: this.modelValue
      }
    },
    methods: {
      updateValue(newValue) {
        this.$emit('update:modelValue', newValue)
      },
      formatter(value) {
        return `$${value}`
      }
    },
    watch: {
      modelValue(newValue) {
        this.localValue = newValue
      }
    }
  }
  </script>