<template>
  <div class="spinner" :class="classList"></div>
</template>

<script>
export default {
  props: {
    speed: { type: String, default: 'normal' },
    size: { type: String, default: 'md' }
  },

  computed: {
    classList () {
      const speed = `spinner--${this.speed}`
      const size = `spinner--${this.size}`
      return {
        [speed]: true,
        [size]: true
      }
    }
  }
}
</script>

<style lang="scss">
  @import "common";

  @keyframes spin {
    0% {
      transform: rotate(0deg)
    }
    100% {
      transform: rotate(360deg)
    }
  }

  .spinner {
    display: inline-block;
    transform-origin: 50% 50%;
    font-size: 90px;
    border: 0.08em solid $color-green;
    border-color: $color-green transparent;
    border-radius: 50%;
    width: 1em;
    height: 1em;
    animation: 1s spin infinite linear;
  }

  .spinner--normal {
    animation-duration: 1s;
  }
  .spinner--fast {
    animation-duration: 0.5s;
  }
  .spinner--slow {
    animation-duration: 2s;
  }

  .spinner--sm {
    font-size: 30px;
  }
  .spinner--md {
    font-size: 50px;
  }
  .spinner--lg {
    font-size: 90px;
  }
</style>
