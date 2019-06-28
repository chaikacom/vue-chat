<template>
  <div class="preloader">
    <spinner class="preloader__spinner" size="md" speed="normal"></spinner>
    <div class="preloader__text" v-if="hasSlot('default')">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import Spinner from './Spinner.vue'

  export default {
    components: { Spinner },

    methods: {
      hasSlot (name) {
        return !!this.$slots[name]
      }
    }
  }
</script>

<style lang="scss">
  .preloader {
    font-family: sans-serif;
    text-align: center;
    padding: 20px;
  }

  .preloader__text {
    font-size: 14px;

    .preloader__spinner + & {
      margin-top: 10px;
    }
  }
</style>
