import ElasticSearch from 'elasticsearch'

export class ElasticManager {
  constructor () {
    this.client = null
    this.index = ''
    this.type = ''
  }

  configure ({ host, index, type }) {
    this.client = ElasticSearch.Client({
      host,
      log: 'error',
    })
    this.index = index
    this.type = type
  }

  suggest (query) {
    if (!this.client) {
      return Promise.reject(new Error('Search client is not configured'))
    }

    return this.client
      .suggest({
        index: this.index,
        body: {
          keywordSuggester: {
            prefix: query,
            completion: {
              field: 'text',
            },
          },
        },
      })
      .then(response => (
        response
          .keywordSuggester[0]
          .options
          .map(option => ({
            text: option.text,
            score: option._score,
          }))
        )
      )
  }

  search (keyword, options = {}) {
    if (!this.client) {
      return Promise.reject(new Error('Search client is not configured'))
    }

    const defaultOptions = {
      from: 0,
      size: 10,
      _source: true,
      queryType: 'terms',
    }
    const searchOptions = { ...defaultOptions, ...options }

    let query = {}
    if (searchOptions.queryType === 'terms') {
      query.terms = { keywords: [keyword] }
    } else if (searchOptions.queryType === 'match') {
      query.match = { keywords: keyword }
    }

    const params = {
      index: this.index,
      type: this.type,
      body: {
        query,
        _source: searchOptions._source,
        aggs: searchOptions.aggs || searchOptions.aggregations,
      },
      from: searchOptions.from,
      size: searchOptions.size,
    }

    return this.client
      .search(params)
      .then(response => {
        return {
          query: params,
          response,
        }
      })
  }
}
