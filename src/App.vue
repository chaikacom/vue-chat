<template>
  <div id="app">
    <contacts :contacts="contacts" ref="contacts" v-model="contact"></contacts>
    <chat :messages="messages"
          :message="message"
          ref="chat"
          @input="message = $event"
          @submit="submit">
    </chat>
  </div>
</template>

<script>
import Contacts from './components/Contacts.vue'
import Chat from './components/Chat.vue'

import messages from './data/messages'
import contacts from './data/users'

export default {
  name: 'app',
  components: { Chat, Contacts },
  data () {
    return {
      messages: messages,
      message: null,
      contacts: contacts,
      contact: null
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
