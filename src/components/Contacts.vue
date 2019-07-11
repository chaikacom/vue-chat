<template>
    <div class="contacts">
        <ul class="contacts__list" v-if="contacts">
            <li class="contacts__list-item"
                :key="idx"
                :class="{ 'is-active': isActiveContact(contact) }"
                v-for="(contact, idx) in contacts"
                @click="select(contact)">
                <slot name="contact" :item="contact">
                  <div class="contacts__list-item-head">
                    <div class="contacts__list-item-name">
                      {{ contact.fullname }}
                    </div>
                    <!--<div class="contacts__list-item-datetime">-->
                      <!--01/12/18-->
                    <!--</div>-->
                  </div>
                  <!--<div class="contacts__list-item-message">-->
                    <!--<div class="contacts__list-item-message-text">-->
                      <!--Самое свежее сообщение в этом чатике-->
                    <!--</div>-->
                    <!--<div class="contacts__list-item-message-counter">-->
                      <!--7-->
                    <!--</div>-->
                  <!--</div>-->
                </slot>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  props: {
    contacts: {
      default: () => ([]),
      type: Array
    },
    value: {
      default: null,
      validator: prop => {
        return prop === null || typeof prop === 'object'
      }
    }
  },

  methods: {
    select (contact) {
      this.$emit('input', contact)
    },
    isActiveContact (contact) {
      if (!this.value) return false
      return this.value.id === contact.id
    },
    reset () {
      this.select(null)
    }
  }
}
</script>

<style lang="scss">
    @import "common";

    .contacts {
      font-family: sans-serif;
      border: 1px solid $border-color;
    }

    .contacts__list {
        @include is-mobile {
            border-top: 1px solid $border-color;
            border-bottom: 1px solid $border-color;
        }
    }

    .contacts__list-item {
        cursor: pointer;
        padding: 10px 20px;
        line-height: 1.25em;
        font-size: 14px;

        @include is-mobile {
            border-bottom: 1px solid $border-color;
            &:last-child {
                border-bottom: 0;
            }
        }

        &:hover {
            background: $color-gray-light;
        }

        &.is-active {
            color: #fff;
            background: $color-green;
        }
    }

    .contacts__list-item-head {
        display: flex;
      justify-content: space-between;
    }

    .contacts__list-item-name {
      font-weight: bold;
    }

    .contacts__list-item-message {
      display: flex;
      justify-content: space-between;
      margin-top: 0.5em;
    }

    .contacts__list-item-message-counter {
      display: inline-block;
      background: $color-green;
      width: 25px;
      height: 25px;
      text-align: center;
      line-height: 25px;
      border-radius: 50%;
      transform: translateY(-5px);
      margin-left: 10px;
      color: #fff;

      .contacts__list-item.is-active & {
        background: #fff;
        color: $color-green;
      }
    }

    .contacts__list-item-message-text {
      font-size: 0.9em;
      opacity: 0.5;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;

      .contacts__list-item.is-active & {
        opacity: 1;
      }
    }

    .contacts__list-item-datetime {
      opacity: 0.5;
      padding-left: 15px;

      .contacts__list-item.is-active & {
        opacity: 1;
      }
    }
</style>
