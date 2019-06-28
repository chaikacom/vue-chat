import Service from './Service'

import users from '../data/users'
import messages from '../data/messages'

export default class Demo extends Service {
  getContacts () {
    return new Promise((resolve, reject) => {
      setTimeout(() => (resolve(users)), 1000)
    })
  }

  getMessages (id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => (resolve(messages)), 1000)
    })
  }
}
