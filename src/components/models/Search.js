import Model from './Model'

export default class Search extends Model {
  defaults () {
    return {
      query: null,
      filters: null,
      filter: null
    }
  }
}
