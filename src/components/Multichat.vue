<template>
  <div class="multichat" :class="classList">
    <div class="multichat__aside">
      <contacts
        class="multichat__contacts"
        ref="contacts"
        :contacts="contacts"
        v-model="contact">
      </contacts>
      <preloader v-if="loading.contacts">Загрузка...</preloader>
    </div>

    <chat class="multichat__main multichat__chat"
          ref="chat"
          :messages="messages"
          :message="message"
          @submit="submit"></chat>
  </div>
</template>

<script>
import Chat from './Chat.vue'
import Contacts from './Contacts.vue'
import Spinner from './Spinner.vue'
import Preloader from './Preloader.vue'

export default {
  components: { Chat, Contacts, Spinner, Preloader },

  props: {
    service: { type: Object, default: () => ({}) }
  },

  data () {
    return {
      busy: false,
      contacts: null,
      contact: null,
      messages: null,
      message: null,

      loading: {
        contacts: false,
        messages: false
      }
    }
  },

  computed: {
    classList () {
      return {
        'multichat--disabled': this.busy
      }
    }
  },

  mounted () {
    this.getContacts().then(() => {
      this.contact = this.contacts[0]
      this.getMessages()
    })
  },

  methods: {
    submit (model) {
      this.messages.push(model)
      this.$refs.chat.scrollEnd()
    },

    getContacts () {
      this.loading.contacts = true
      this.busy = true
      return this.service.getContacts()
        .then(contacts => (this.contacts = contacts))
        .finally(() => {
          this.busy = false
          this.loading.contacts = false
        })
    },

    getMessages () {
      this.busy = true
      return this.service.getMessages(this.contact)
        .then(messages => (this.messages = messages))
        .finally(() => (this.busy = false))
    }
  }
}
</script>

<style lang="scss">
  @import "common";

  .multichat {
    display: flex;
    height: 100%;
    border: 1px solid $border-color;
    border-radius: 5px;
    overflow: hidden;
  }

  .multichat__aside {
    flex: 0 0 $aside-width;
    overflow: auto;
    border-right: 1px solid $border-color;
  }

  .multichat__contacts {
    border: 0
  }

  .multichat__chat {
    border: 0;
  }
</style>
