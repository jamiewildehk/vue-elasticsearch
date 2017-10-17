<template>
  <div class="ve-search-box">
    <vue-elastic-autocomplete
      :suggestions="suggestions"
      @change="change"
      @selected="selected">
      <template slot="item" slot-scope="{ suggestion }">
        {{ suggestion.text }} {{ suggestion.score }}
      </template>
    </vue-elastic-autocomplete>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import store from '../store'
import VueElasticAutocomplete from './VueElasticAutocomplete'

export default {
  name: 'VueElasticSearchBox',
  components: {
    VueElasticAutocomplete
  },
  store,
  computed: mapGetters({
    suggestions: 'suggest/suggestions'
  }),
  methods: {
    ...mapActions({
      change: 'suggest/fetchSuggestions'
    }),
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
