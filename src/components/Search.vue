<template>
  <div class="search">
    <searchbar v-model="query" class="search__searchbar"></searchbar>
    <ul class="search__filters">
      <li class="search__filters-item" :key="filter.id" v-for="filter in search.filters">
        <label>
          <input type="radio" name="filter" v-model="filterValue" :value="filter.id">
          <span>{{ filter.label }}</span>
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
import Searchbar from './Searchbar.vue'

export default {
  components: { Searchbar },

  model: {
    prop: 'search',
    event: 'input'
  },

  props: {
    search: {}
  },

  computed: {
    query: {
      get () {
        return this.search.query
      },
      set (value) {
        this.input({ query: value })
      }
    },
    filterValue: {
      get () {
        return this.search.filter
      },
      set (value) {
        this.input({ filter: value })
      }
    }
  },

  methods: {
    input (value) {
      this.$emit('input', Object.assign({}, this.search, value))
    }
  }
}
</script>

<style lang="scss">
  @import "common";

  .search {
    padding: $padding-size;
  }

  .search__searchbar {
    display: block;
    width: 100%;
  }

  .search__filters {
    display: flex;
    flex-wrap: wrap;
    margin-left: -20px;

    .search__searchbar + & {
      margin-top: 10px;
    }
  }

  .search__filters-item {
    margin-left: 20px;

    label {
      cursor: pointer;
    }

    span {
      margin-left: 5px;
    }
  }
</style>
