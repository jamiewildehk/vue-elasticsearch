import ElasticSearch from 'elasticsearch'

export class ElasticManager {
  client = null;
  index = '';
  type = '';

  configure ({ host, index, type }) {
    this.client = ElasticSearch.Client({
      host,
      log: 'error'
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
              field: 'text'
            }
          }
        }
      })
      .then(results => {
        return results.keywordSuggester[0].options.map(option => ({
          text: option.text,
          score: option._score
        }))
      })
  }
}
