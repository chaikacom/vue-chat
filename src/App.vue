<template>
  <div id="app">
    <chat :messages="messages" :message="message"></chat>
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
