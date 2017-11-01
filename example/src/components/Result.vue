<template>
  <div class="result">
    <vue-elastic-result-box
      :keyword="keyword"
      :fetching="fetching"
      :result="result">

      <template slot="result-header" slot-scope="{ keyword, fetching, result }">
        <div class="result-header">
          <div class="back-link">
            <router-link :to="{ name: 'Search' }"><i class="fa fa-chevron-left fa-2x" /></router-link>
          </div>

          <div class="result-title">
            <h1>Result for {{ keyword }}</h1>
          </div>

          <div class="result-count">
            <h3>{{ result.hits.length }} / {{ result.total }} loaded</h3>
          </div>
        </div>
      </template>

      <template slot="result-content" slot-scope="{ keyword, fetching, result }">
        <div class="result-content">

          <div class="loading" v-show="fetching">
            <div>
              <i class="fa fa-spinner fa-pulse fa-4x fa-fw"></i>
              <span class="sr-only">Loading...</span>
            </div>
          </div>

          <code class="result-query">{{ result.query }}</code>

          <b-container class="result-hits">
            <b-row>
              <b-col cols="*" sm="6" md="3" lg="2"
                v-for="(hit, key) in result.hits"
                :key="key"
                class="result-hit-item">
                <img :src="`https://demoimg.miro.io/120_${hit._source.resource_id}.jpg`" alt="" class="result-hit-thumb">
              </b-col>
            </b-row>
          </b-container>

          <b-button v-if="result.hasNext" @click="loadMore()" variant="link">Load More</b-button>
        </div>
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
    loadMore () {
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

  .result-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    .loading {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 999;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(255, 255, 255, 0.7);
    }

    .result-query {
      display: block;
      width: 600px;
      border: 1px solid;
      margin: 0 auto;
    }

    .result-hits {
      margin: 20px 0;

      .result-hit-item {
        padding: 0;

        img.result-hit-thumb {
          width: 100%;
          height: auto;
          min-height: 190px;
        }
      }
    }
  }
</style>
