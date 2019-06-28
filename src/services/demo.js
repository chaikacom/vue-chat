import Service from './Service'

// import users from '../data/users'
// import messages from '../data/messages'

export default class Demo extends Service {
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
