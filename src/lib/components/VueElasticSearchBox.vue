<template>
  <div class="ve-search-box">
    <div class="autocomplete-input">
      <p class="control has-icons-right">
        <input
          class="input is-large"
          placeholder="Search..."
        >
        <span class="icon is-large is-right">
          <i class="fa fa-search"></i>
        </span>
      </p>
      <ul class="options-list">
        <li v-for="option in options" :key="option.title">
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
  methods: {
  }
}
</script>

<style lang="scss" scoped>
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

  input {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  }

  .autocomplete-input {
    position: relative;
    height: 300px;
  }

</style>
