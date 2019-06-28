<template>
  <div id="app">
    <chat :messages="messages"
          :message="message"
          ref="chat"
          @input="message = $event"
          @submit="submit">
    </chat>
  </div>
</template>

<script>
import Chat from './components/Chat.vue'
import messages from './data/messages'

export default {
  name: 'app',
  components: {
    Chat
  },
  data () {
    return {
      messages: messages,
      message: null
    }
  },

  methods: {
    submit (model) {
      this.messages.push(model)
      this.$refs.chat.scrollEnd()
    }
  }
}
</script>

<style>
  #app {
    height: 100vh;
    width: 960px;
    margin: auto;
  }
</style>
