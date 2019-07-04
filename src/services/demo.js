import Service from './Service'

import search from '../data/search'

export default class Demo extends Service {
  search (options = {}) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(search)
      }, 500)
    })
  }

  getContacts (channel) {
    return new Promise((resolve, reject) => {
      import(/* webpackChunkName: 'contacts' */ '../data/users')
        .then(users => resolve(users.default[channel]))
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

  getChannels () {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve([
        { id: 'tg', icon: 'paper-plane', label: 'Telegram' },
        { id: 'email', icon: 'envelope', label: 'E-mail' }
      ]), 500)
    })
  }
}
