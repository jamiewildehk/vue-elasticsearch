<template>
  <div class="ve-search-box">
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
      <ul v-show="isOpen" class="options-list">
        <li v-for="(option, index) in fOptions"
          :key="index"
          :class="{'highlighted': index === highlightedPosition}"
          @mouseenter="highlightedPosition = index"
          @mousedown="select">
          <slot name="item"
            :title="option.title"
            :description="option.description"
            :thumbnail="option.thumbnail">
          </slot>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VueElasticSearchBox',
  data () {
    return {
      keyword: '',
      isOpen: false,
      highlightedPosition: 0,
      options: [
        {
          title: 'First Scene',
          description: 'lorem ipsum dolor amet.',
          thumbnail: 'http://lorempicsum.com/nemo/200/200/1'
        },
        {
          title: 'Second Scene',
          description: 'lorem ipsum dolor amet.',
          thumbnail: 'http://lorempicsum.com/nemo/200/200/2'
        },
        {
          title: 'Third Scene',
          description: 'lorem ipsum dolor amet.',
          thumbnail: 'http://lorempicsum.com/nemo/200/200/3'
        },
        {
          title: 'Fourth Scene',
          description: 'lorem ipsum dolor amet.',
          thumbnail: 'http://lorempicsum.com/nemo/200/200/4'
        }
      ]
    }
  },
  computed: {
    fOptions () {
      const re = new RegExp(this.keyword, 'i')
      return this.options.filter(o => o.title.match(re))
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
      this.highlightedPosition = (this.highlightedPosition + 1) % this.fOptions.length
    },
    moveUp () {
      if (!this.isOpen) {
        return
      }
      this.highlightedPosition = (this.highlightedPosition - 1 + this.fOptions.length) % this.fOptions.length
    },
    select () {
      const selectedOption = this.fOptions[this.highlightedPosition]
      this.keyword = selectedOption.title
      this.isOpen = false
      this.$emit('selected', selectedOption)
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

      &.options-list {
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
