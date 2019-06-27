<template>
  <ul class="messages-list">
    <li class="messages-list__item"
        :key="idx"
        v-for="(message, idx) in messages">
      <bubble :title="getTitle(message)"
              :highlighted="isHighlighted(idx)"
              :text="getText(message)"
              :document="getDocument(message)"
              :datetime="getDatetime(message)"></bubble>
    </li>
  </ul>
</template>

<script>
import Bubble from './Bubble.vue'
import moment from 'moment'
export default {
  components: { Bubble },

  props: {
    messages: { type: Array, default: () => ([]) },
    highlighted: {
      validator: prop => (prop === null) || (typeof prop === 'object'),
      default: () => ([])
    }
  },

  watch: {
    messages () {
      this.$nextTick(() => {
        this.scrollEnd()
      })
    }
  },

  methods: {
    scrollEnd () {
      this.$el.scrollTop = this.$el.scrollHeight
    },

    getTitle (message) {
      return message.username
    },
    getDatetime (message) {
      if (!message.updatedAt || !message.updatedAt.date) return null
      return moment(message.updatedAt.date).format('DD.MM.YY, HH:mm:s')
    },
    getText (message) {
      return message.text
    },
    getDocument (message) {
      return message.document
    },
    isHighlighted (index) {
      if (!this.highlighted) return false
      return this.highlighted.indexOf(index) > -1
    }
  }
}
</script>

<style lang="scss">
  .messages-list {

  }

  .messages-list__item {

    & + & {
      margin-top: 40px;
    }
  }
</style>
