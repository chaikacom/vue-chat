<template>
  <div class="multichat" :class="classList">
    <div class="multichat__aside">

      <search v-model="search"></search>

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
          v-if="contact"
          :messages="messages"
          :message="message"
          @input="message = $event"
          @submit="submit"></chat>
  </div>
</template>

<script>
import Chat from './Chat.vue'
import Contacts from './Contacts.vue'
import Preloader from './Preloader.vue'
import Search from './Search.vue'
import SearchModel from './models/Search'

export default {
  components: { Chat, Contacts, Preloader, Search },

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
      search: new SearchModel(),

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

  watch: {
    contact (value) {
      this.messages = null
      this.message = null
      if (!value) return
      this.getMessages(value)
    },

    search (options) {
      if (!options.query) {
        this.getContacts()
      } else {
        this.find(options)
      }
    }
  },

  mounted () {
    this.getContacts()
  },

  methods: {
    find (options) {
      this.busy = true
      this.service.search(options)
        .then(results => {
          this.contact = null
          this.contacts = results
        })
        .finally(() => (this.busy = false))
    },

    submit (model) {
      this.service.sendMessage().then(() => {
        this.messages.push(model)
        this.$refs.chat.scrollEnd()
      })
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

    getMessages (id) {
      this.busy = true
      return this.service.getMessages(id)
        .then(messages => {
          this.messages = messages
          this.$refs.chat.scrollEnd()
        })
        .catch(err => {
          console.warn(err)
          this.message = null
          this.messages = null
        })
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
    font-family: sans-serif;
  }

  .multichat__aside {
    flex: 0 0 $aside-width;
    overflow: auto;
    border-right: 1px solid $border-color;
  }

  .multichat__main {
    flex: 1 1 auto;
  }

  .multichat__aside-inner {
    padding: $padding-size;
  }

  .multichat__contacts {
    border: 0
  }

  .multichat__chat {
    border: 0;
  }
</style>
