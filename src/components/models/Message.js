import Model from './Model'

export default class Message extends Model {
  defaults () {
    return {
      status: null,
      createdAt: null,
      updatedAt: null,
      username: null,
      text: null,
      document: null
    }
  }
}
