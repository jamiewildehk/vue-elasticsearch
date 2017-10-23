import { ElasticManager } from './ElasticManager'

const SuggestManager = new ElasticManager()
const SearchManager = new ElasticManager()

export {
  SuggestManager,
  SearchManager
}
