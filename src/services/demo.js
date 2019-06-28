import Service from './Service'

import search from '../data/search'

export default class Demo extends Service {
  search (options = {}) {
    console.log(options)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(search)
      }, 500)
    })
  }

  getContacts () {
    return new Promise((resolve, reject) => {
      import(/* webpackChunkName: 'contacts' */ '../data/users')
        .then(users => resolve(users.default))
        .catch(err => reject(err))
    })
  }

  getMessages (contact) {
    return new Promise((resolve, reject) => {
      import(/* webpackChunkName: 'messages' */ '../data/messages/' + contact.id)
        .then(messages => resolve(messages.default))
        .catch(err => reject(err))
    })
  }

  sendMessage (message) {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve('ok!'), 500)
    })
  }
}
