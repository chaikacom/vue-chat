import autosize from 'autosize'

export default {
  inserted (el) {
    autosize(el)
  },

  unbind (el) {
    autosize.destroy(el)
  }
}
