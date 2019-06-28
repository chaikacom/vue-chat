import Model from './Model'

export default class Search extends Model {
  defaults () {
    return {
      query: null,
      filters: [{ id: 'c', label: 'Contact' }, { id: 'm', label: 'Message' }],
      filter: null
    }
  }
}
