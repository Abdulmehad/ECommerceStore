<template>
    <div class="filter-section">
      <h3>Rating</h3>
      <input 
        type="range" 
        :value="value"
        @input="$emit('input', Number($event.target.value))"
        min="1" 
        max="5" 
        step="0.1"
      />
      <p>Min Rating: {{ value }}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      value: Number
    },
    emits: ['input']
  }
  </script>