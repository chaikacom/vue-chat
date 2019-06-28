<template>
  <div id="app">
    <multichat :service="service"></multichat>
  </div>
</template>

<script>
import DemoService from './services/demo'
import Multichat from './components/Multichat.vue'

export default {
  name: 'app',
  components: { Multichat },
  data () {
    return {
      service: new DemoService()
    }
  }
}
</script>

<style>
  #app {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 940px;
    margin: auto;
  }

  .multichat {
    height: 590px;
  }
</style>
