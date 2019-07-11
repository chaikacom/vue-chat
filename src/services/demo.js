import Service from './Service'

import search from '../data/search'

import refresh from '../data/messages/refresh'
import Chat from '../components/models/Chat'
let refreshOffset = 0

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
        .then(users => {
          setTimeout(() => {
            resolve(users.default[channel].map(user => new Chat(user)))
          }, 500)
        })
        .catch(err => reject(err))
    })
  }

  getMessages (channel, contact) {
    return new Promise((resolve, reject) => {
      import(/* webpackChunkName: 'messages' */ '../data/messages/' + contact.id)
        .then(messages => {
          setTimeout(() => {
            resolve(messages.default)
          }, 500)
        })
        .catch(err => reject(err))
    })
  }

  sendMessage (contact, channel, model) {
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

  getFilters () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([ { id: 'email', label: 'E-mail' }, { id: 'phone', label: 'Phone' } ])
      }, 0)
    })
  }

  refresh () {
    // Demo
    const limit = 2
    const to = refreshOffset + limit
    const messages = refresh.slice(refreshOffset, to)
    const counter = Math.random().toFixed(1) * 10
    refreshOffset = to

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ messages, alerts: [{ id: '50e4943f-98ec-4691-b17c-59c4457d12b0', counter }] })
      }, 500)
    })
  }
}
