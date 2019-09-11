<template>
  <div class="chat">
    <div class="chat__menu">
      <div class="chat__info">
        ID: {{ contact.id }}
      </div>
      <div class="chat__status">
        <slot name="status"></slot>
      </div>
    </div>



    <div class="chat__messages">
      <messages :messages="messages" v-if="hasMessages"></messages>
    </div>

    <form @submit.prevent="submit" class="chat__form">
      <div class="field">
          <textarea cols="30"
                    rows="1"
                    class="chat__form-textarea"
                    v-model="msg"
                    v-autosize>
          </textarea>
      </div>

      <div class="field">
        <button class="button" type="submit">
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import Message from './models/Message'
import Messages from './Messages.vue'
import autosize from '../mixins/autosize'

export default {
  components: { Messages },

  directives: {
    autosize
  },

  props: {
    contact: {},
    message: {},
    messages: {}
  },

  computed: {
    msg: {
      get () {
        return this.message
      },
      set (value) {
        this.$emit('input', value)
      }
    },

    form () {
      return new Message({ text: this.msg, updatedAt: new Date(), createdAt: new Date() })
    },

    hasMessages () {
      return this.messages && this.messages.length
    }
  },

  mounted () {
    this.scrollEnd()
  },

  methods: {
    submit () {
      this.$emit('submit', this.form)
      this.msg = null
    },

    scrollEnd () {
      this.$nextTick(() => {
        this.$el.scrollTop = this.$el.scrollHeight
      })
    }
  }
}
</script>

<style lang="scss">
  @import "common";

  .chat {
    overflow: auto;
    height: 100%;
    font-size: 16px;
    font-family: sans-serif;
    border: 1px solid $color-gray-light;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .chat__menu {
    position: sticky;
    top: 0;
    background: #fff;
    padding: $padding-size 55px $padding-size $padding-size;
    z-index: 1;
    box-shadow: 0 2px 10px rgba(#000, 0.05);
    margin-bottom: $padding-size;
  }

  .chat__status {
    position: absolute;
    right: 20px;
    top: 15px;
  }

  .chat__messages {
    flex: 1 1 auto;
  }

  .chat__form {
    background: #fff;
    position: sticky;
    bottom: 0;
    padding: $padding-size;
  }

  .chat__form-textarea {
    display: block;
    width: 100%;
    resize: none;
  }
</style>
