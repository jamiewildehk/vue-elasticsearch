<template>
  <div class="autocomplete-input">
    <p class="control has-icons-right">
      <input
        class="input is-large"
        placeholder="Search..."
        v-model="keyword"
        @input="input($event.target.value)"
        @keyup.esc="isOpen = false"
        @blur="isOpen = false"
        @keydown.down="moveDown"
        @keydown.up="moveUp"
        @keydown.enter="select"
      >
      <span class="icon is-large is-right">
        <i class="fa fa-search"></i>
      </span>
    </p>
    <ul v-show="isOpen" class="suggestions-list">
      <li v-for="(suggestion, index) in fSuggestions"
        :key="index"
        :class="{'highlighted': index === highlightedPosition}"
        @mouseenter="highlightedPosition = index"
        @mousedown="select">
        <slot name="item" :suggestion="suggestion"></slot>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'VueElasticAutocomplete',
  props: {
    suggestions: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      keyword: '',
      isOpen: false,
      highlightedPosition: 0
    }
  },
  computed: {
    fSuggestions () {
      const re = new RegExp(this.keyword, 'i')
      return this.suggestions.filter(o => o.title.match(re))
    }
  },
  methods: {
    input (value) {
      this.isOpen = !!value
    },
    moveDown () {
      if (!this.isOpen) {
        return
      }
      this.highlightedPosition = (this.highlightedPosition + 1) % this.fSuggestions.length
    },
    moveUp () {
      if (!this.isOpen) {
        return
      }
      this.highlightedPosition = (this.highlightedPosition - 1 + this.fSuggestions.length) % this.fSuggestions.length
    },
    select () {
      const selectedOption = this.fSuggestions[this.highlightedPosition]
      this.keyword = selectedOption.title
      this.isOpen = false
      this.$emit('selected', this.keyword)
    }
  }
}
</script>

<style lang="scss" scoped>
  .autocomplete-input {
    position: relative;
    height: 300px;

    input {
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
    }

    ul {
      list-style-type: none;
      padding: 0;

      li {
        display: inline-block;
        margin: 0 10px;
      }

      &.suggestions-list {
        display: flex;
        flex-direction: column;
        margin-top: -12px;
        border: 1px solid #dbdbdb;
        border-radius: 0 0 3px 3px;
        position: absolute;
        width: 100%;
        overflow: hidden;

        li {
          width: 100%;
          flex-wrap: wrap;
          background: white;
          margin: 0;
          border-bottom: 1px solid #eee;
          color: #363636;
          padding: 7px;
          cursor: pointer;

          &.highlighted {
            background: #f8f8f8
          }
        }
      }
    }
  }

</style>
