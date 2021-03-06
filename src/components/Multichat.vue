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
          :contact="contact"
          :messages="messages"
          :message="message"
          @input="message = $event"
          @submit="submit">
      <template slot="status">
        <spinner size="sm" v-if="busy"></spinner>
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
import Spinner from './Spinner.vue'

function storage (field, value, prefix = 'multichat') {
  const key = `${prefix}.${field}`
  if (!value) {
    return localStorage.getItem(key)
  } else {
    localStorage.setItem(key, value)
  }
}

export default {
  components: { Chat, Contacts, Preloader, Search, Spinner },

  props: {
    service: { type: Object, default: () => ({}) },
    allowRefresh: { type: Boolean, default: true },
    refreshInterval: { type: Number, default: 5000 }
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
      refresher: null,

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
      storage('channel', value)
    },

    contact (value) {
      this.messages = null
      this.message = null
      if (!value) return
      this.getMessages(value)
      storage('contact', value.id)
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
    this.channel = storage('channel')
  },

  mounted () {
    this.getChannels()

    if (this.allowRefresh) {
      this.refresher = setInterval(() => {
        this.refresh()
      }, this.refreshInterval)
    }
  },

  beforeDestroy () {
    clearInterval(this.refresher)
  },

  methods: {
    refresh () {
      if (!this.channel) return
      const id = this.contact ? this.contact.id : null
      const channel = this.channel

      this.service
        .refresh(this.channel, id)
        .then(response => {
          if (this.contact && (this.contact.id === id)) this.appendMessages(response.messages)
          if (this.channel === channel) this.refreshAlerts(response.alerts)
          this.contacts = this.contacts ? this.sortContactsByUnread(this.contacts) : this.contacts
        })
    },

    sortContactsByUnread (contacts) {
      return contacts.sort(contact => {
        return contact.counter > 0 ? -1 : 0
      })
    },

    appendMessages (messages) {
      this.messages = (this.messages || []).concat(messages)
      this.$refs.chat.scrollEnd()
    },

    refreshAlerts (alerts) {
      const ids = alerts.map(alert => alert.id)
      const contacts = this.contacts.filter(contact => (ids.indexOf(contact.id) > -1))
      contacts.forEach(contact => {
        const counter = alerts.find(alert => alert.id === contact.id)
        if (this.contact && contact.id === this.contact.id) return
        contact.counter = counter.counter
      })
    },

    getFilters () {
      this.service.getFilters().then(filters => (this.search.filters = filters))
    },

    find (options) {
      this.busy = true
      this.loading.search = true
      this.service.search(options, this.channel)
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
        .then(contacts => {
          this.contacts = contacts
          this.contact = contacts.find(c => (c.id === storage('contact')))
        })
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
          this.contact.counter = 0
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
