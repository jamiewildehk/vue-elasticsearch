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

  search (keyword) {
    if (!this.client) {
      return Promise.reject(new Error('Search client is not configured'))
    }

    return this.client
      .search({
        size: 100,
        query: {
          bool: {
            must: [
              { type: { value: this.type } },
              { term: { keywords: keyword } },
            ],
          },
        },
      })
      .then(response => response.hits.hits)
  }
}
