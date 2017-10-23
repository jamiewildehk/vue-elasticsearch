<template>
  <div class="ve-autocomplete">
    <div class="ve-autocomplete-input-box">
      <slot name="input-box-header"></slot>

      <input
        placeholder="Search..."
        v-model="keyword"
        :class="[inputClass]"
        @input="debouncedInput"
        @keyup.esc="isTriggered = false"
        @blur="isTriggered = false"
        @keydown.down="moveDown"
        @keydown.up="moveUp"
        @keydown.enter="select"
      >

      <slot name="input-box-footer"></slot>

    </div>

    <ul v-show="isOpen" class="ve-suggestions-list">
      <li v-for="(suggestion, index) in suggestions"
        :key="index"
        :class="{[suggestionClass]: true, 'active': index === activeSuggestion}"
        @mouseenter="activeSuggestion = index"
        @mousedown="select">
        <slot name="suggestion" :suggestion="suggestion">
          {{ suggestion.text }} {{ suggestion.score }}
        </slot>
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from 'vue'
import _ from 'lodash'

export default {
  name: 'VueElasticAutocomplete',
  store: Vue.vueElasticStore,
  props: {
    suggestions: {
      type: Array,
      default: () => [],
    },
    inputClass: {
      type: String,
      default: 've-autocomplete-input',
    },
    suggestionClass: {
      type: String,
      default: 've-autocomplete-suggestion',
    },
  },
  data () {
    return {
      keyword: '',
      isTriggered: false,
      activeSuggestion: 0,
    }
  },
  computed: {
    isOpen () {
      return this.isTriggered && this.suggestions.length > 0
    },
  },
  methods: {
    debouncedInput: _.debounce(function (e) {
      const value = e.target.value

      this.activeSuggestion = 0
      this.isTriggered = !!value

      if (value) {
        this.$emit('changed', value)
      }
    }, 1000),
    moveDown () {
      if (!this.isOpen) {
        return
      }
      this.activeSuggestion = (this.activeSuggestion + 1) % this.suggestions.length
    },
    moveUp () {
      if (!this.isOpen) {
        return
      }
      this.activeSuggestion = (this.activeSuggestion - 1 + this.suggestions.length) % this.suggestions.length
    },
    select () {
      const selectedOption = this.suggestions[this.activeSuggestion]
      this.keyword = selectedOption.text
      this.isTriggered = false

      this.$emit('selected', this.keyword)
    },
  },
}
</script>

<style lang="scss" scoped>
  .ve-autocomplete {
    position: relative;
    height: 300px;

    .ve-autocomplete-box {
      input {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
      }
    }

    .ve-suggestions-list {
      list-style-type: none;
      display: flex;
      flex-direction: column;
      margin-top: 0;
      padding: 0;
      border: 1px solid #dbdbdb;
      border-radius: 0 0 3px 3px;
      width: 100%;
      overflow: hidden;

      li {
        display: inline-block;
        width: 100%;
        flex-wrap: wrap;
        background: white;
        margin: 0;
        border-bottom: 1px solid #eee;
        color: #363636;
        padding: 7px;
        cursor: pointer;

        &.active {
          background: #f8f8f8
        }
      }
    }
  }

</style>
