import Model from './Model'

export default class Chat extends Model {
  defaults () {
    return {
      id: null,
      email: null,
      fullname: null,
      phone: null,
      messages: null,
      message: null
    }
  }
}
