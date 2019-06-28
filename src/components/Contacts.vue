<template>
    <div class="contacts">
        <ul class="contacts__list" v-if="contacts">
            <li class="contacts__list-item"
                :key="idx"
                :class="{ 'is-active': isActiveContact(contact) }"
                v-for="(contact, idx) in contacts"
                @click="select(contact)">
                <slot name="contact" :item="contact">
                    {{ contact.fullname }}
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

        @include is-mobile {
            border-bottom: 1px solid $border-color;
            &:last-child {
                border-bottom: 0;
            }
        }

        &:hover {
            background: $color-gray-light;
            color: $color-green
        }

        &.is-active {
            color: #fff;
            background: $color-green;
        }
    }
</style>
