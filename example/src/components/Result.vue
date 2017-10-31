<template>
  <div class="result">

    <vue-elastic-result-box
      :keyword="keyword"
      :result="result">

      <template slot="result-header" slot-scope="{ keyword, result }">
        <router-link :to="{ name: 'Search' }">Back</router-link>
        <h1>Result for {{ keyword }}</h1>
        <h2>{{ result.total }} photos</h2>
      </template>

      <template slot="result-content" slot-scope="{ keyword, result }">
        <h1>Result box</h1>
      </template>
    </vue-elastic-result-box>

  </div>
</template>

<script>
export default {
  name: 'Result',
  data () {
    return {
      msg: 'Result View'
    }
  },
  computed: {
    keyword () {
      return this.$route.params.keyword
    },
    result () {
      return {
        total: this.$store.getters['elastic/search/total'],
        hits: this.$store.getters['elastic/search/hits']
      }
    }
  },
  created () {
    this.$store.dispatch('elastic/search/fetchHits', this.keyword)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
