<template>
  <div class="ve-search-box">
    <vue-elastic-autocomplete
      :suggestions="suggestions"
      @selected="selected">
      <template slot="item" slot-scope="{ suggestion }">
        <article class="media">
          <figure class="media-left">
            <p class="image is-64x64">
              <img :src="suggestion.thumbnail">
            </p>
          </figure>
          <p>
            <strong>{{ suggestion.title }}</strong>
            <br>
            {{ suggestion.description }}
          </p>
        </article>
      </template>
    </vue-elastic-autocomplete>
  </div>
</template>

<script>
import VueElasticAutocomplete from './VueElasticAutocomplete'

export default {
  name: 'VueElasticSearchBox',
  components: {
    VueElasticAutocomplete
  },
  data () {
    return {
      suggestions: [
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
    selected (keyword) {
      this.$emit('selected', keyword)
    }
  }
}
</script>

<style lang="scss" scoped>
.ve-search-box {

}
</style>
