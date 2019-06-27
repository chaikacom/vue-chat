<template>
  <div class="bubble" :class="classList">
    <div class="bubble__header">
      <div class="bubble__title">
        {{ title }}
      </div>
      <div class="bubble__date-time">
        {{ datetime }}
      </div>
    </div>
    <div class="bubble__text">
      {{ text }}
    </div>

    <div class="bubble__document" v-if="document">
      <i class="fa fa-file" style="font-size: 20px; color: #00d1b2"></i>
      <span>{{ document }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: { default: '', type: String },
    datetime: { default: '', type: String },
    text: { default: '', validator: prop => typeof prop === 'string' || prop === null },
    document: {},
    highlighted: { type: Boolean, default: false }
  },

  computed: {
    classList () {
      return {
        'bubble--highlight': this.highlighted
      }
    }
  }
}
</script>

<style lang="scss">
  @import "common";

  .bubble {
    padding-left: $padding-size;
    padding-right: $padding-size;
  }

  .bubble--highlight {
    background: #eee;
  }

  .bubble__header {
    @include mq(desktop) {
      display: flex;
      margin-bottom: 10px;
    }
  }

  .bubble__title {
    font-weight: bold;
    @include mq(desktop) {
      flex: 1 1 auto;
    }
  }

  .bubble__date-time {
    opacity: 0.55;
    @include mq(desktop) {
      text-align: right;
    }
  }

  .bubble__text {

  }

  .bubble__image {
    display: block;
    width: 200px;
    height: 100px;
    background: #eee;
  }

  .bubble__document {
    margin: 20px 0;
  }

</style>
