<template>
  <input type="text"
         v-model="query"
         class="searchbar">
</template>

<script>
import debounce from '../utils/debounce'
export default {
  props: {
    value: {},
    delay: { type: Number, default: 500 }
  },

  computed: {
    query: {
      get () {
        return this.value
      },
      set (value) {
        this.input(value)
      }
    }
  },

  created () {
    this.input = debounce(this.input, this.delay)
  },

  methods: {
    input (value) {
      this.$emit('input', value)
    }
  }
}
</script>

<style lang="scss">
  @import "common";

  .searchbar {
    font-family: inherit;
    font-size: inherit;
  }
</style>
