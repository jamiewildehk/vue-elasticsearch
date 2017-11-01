<template>
  <div class="result">
    {{ query }}

    <vue-elastic-result-box
      :keyword="keyword"
      :result="result">

      <template slot="result-header" slot-scope="{ keyword, result }">
        <div class="result-header">
          <div class="back-link">
            <router-link :to="{ name: 'Search' }"><i class="fa fa-chevron-left fa-2x" /></router-link>
          </div>

          <div class="result-title">
            <h1>Result for {{ keyword }}</h1>
          </div>

          <div class="result-total">
            <h3>{{ result.total }} photos</h3>
          </div>
        </div>
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
    fetching () {
      return this.$store.getters['elastic/search/fetching']
    },
    result () {
      // Returns the search result
      return {
        query: this.$store.getters['elastic/search/query'],
        total: this.$store.getters['elastic/search/total'],
        page: this.$store.getters['elastic/search/page'],
        pageSize: this.$store.getters['elastic/search/pageSize'],
        hasNext: this.$store.getters['elastic/search/hasNext'],
        hits: this.$store.getters['elastic/search/hits']
      }
    },
    error () {
      return this.$store.getters['elastic/search/error']
    }
  },
  methods: {
    updateKeyword () {
      this.$store.dispatch('elastic/search/updateKeyword', {
        keyword: this.keyword
      })
    },
    search () {
      this.$store.dispatch('elastic/search/fetchHits', {
        reset: true,
        options: {
          _source: 'resource_id'
        }
      })
    },
    onNext () {
      this.$store.dispatch('elastic/search/fetchHits', {
        reset: false,
        options: {
          _source: 'resource_id'
        }
      })
    }
  },
  created () {
    this.updateKeyword()
    this.search()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .result-header {
    display: flex;
    align-items: center;
    margin: 0 20px;

    .result-title {
      flex: 1 1 auto;
    }
  }
</style>
