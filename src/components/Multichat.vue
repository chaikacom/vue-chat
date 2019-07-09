<template>
  <div class="multichat" :class="classList">
    <div class="multichat__aside">

      <ul class="multichat__channels" v-if="channels && channels.length">
        <li class="multichat__channel" v-for="item in channels" :key="item.id">
          <button type="button" class="multichat__channel-button" :class="{ 'is-active': channel === item.id  }" @click="channel = item.id">
            {{ item.label }}
          </button>
        </li>
      </ul>

      <search v-model="search"></search>

      <contacts
        class="multichat__contacts"
        ref="contacts"
        :contacts="contacts"
        v-model="contact">
      </contacts>
      <preloader v-if="loading.contacts">Загрузка...</preloader>
      <preloader v-if="loading.search">Загрузка...</preloader>

      <div v-if="notFound" class="multichat__aside-inner">
        Ничего не найдено
      </div>

    </div>

    <chat class="multichat__main multichat__chat"
          ref="chat"
          v-if="contact"
          :messages="messages"
          :message="message"
          @input="message = $event"
          @submit="submit">
      <template slot="top">
        <preloader v-if="this.busy">Загрузка...</preloader>
      </template>
    </chat>
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
      channels: null,
      channel: null,

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
    },

    notFound () {
      return this.search.query && !this.hasContacts && !this.busy
    },

    hasContacts () {
      return this.contacts && this.contacts.length
    }
  },

  watch: {
    channel (value) {
      this.contacts = null
      this.contact = null
      this.getContacts()
    },

    contact (value) {
      this.messages = null
      this.message = null
      if (!value) return
      this.getMessages(value)
    },

    search (options) {
      this.contact = null
      this.contacts = null
      if (!options.query) {
        this.getContacts()
      } else {
        this.find(options)
      }
    }
  },

  created () {
    this.getFilters()
  },

  mounted () {
    this.getChannels()
  },

  methods: {
    getFilters () {
      this.service.getFilters().then(filters => (this.search.filters = filters))
    },

    find (options) {
      this.busy = true
      this.loading.search = true
      this.service.search(options)
        .then(results => {
          this.contact = null
          this.contacts = results
        })
        .finally(() => {
          this.busy = false
          this.loading.search = false
        })
    },

    getChannels () {
      this.busy = true
      this.service.getChannels()
        .then(channels => (this.channels = channels))
        .finally(() => (this.busy = false))
    },

    submit (model) {
      this.service.sendMessage(this.contact, this.channel, model).then(() => {
        this.messages.push(model)
        this.$refs.chat.scrollEnd()
      })
    },

    getContacts () {
      this.loading.contacts = true
      this.busy = true
      return this.service.getContacts(this.channel)
        .then(contacts => (this.contacts = contacts))
        .finally(() => {
          this.busy = false
          this.loading.contacts = false
        })
    },

    getMessages () {
      this.busy = true
      return this.service.getMessages(this.channel, this.contact)
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

  .multichat__channels {
    display: flex;
    border-bottom: 1px solid $border-color;
    & > * {
      border-left: 1px solid $border-color;
      flex: 1 1 auto;
      display: block;
      &:first-child {
        border-left: 0;
      }
    }
  }

  .multichat__channel-button {
    @include button-reset;
    display: block;
    width: 100%;
    padding: 10px;
    outline: none;

    &:hover {
      color: $color-green;
    }

    &.is-active {
      color: #fff;
      background: $color-green;
    }

    &:focus {
      color: inherit;
      background: rgba($color-green, 0.5);
    }
  }
</style>
