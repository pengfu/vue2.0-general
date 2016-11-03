<template>
  <div id="app">
    <button @click="openBox">Click me</button>
  </div>
</template>

<script>
import Confirm from './components/confirm/index'

export default {

  components: {

  },
  methods: {
    openBox() {
      Confirm({
        message:'你确定不吃午饭吗？',
        confirm:function () {
            console.log('ok')
        },
        cancel:function () {
            console.log('cancel')
        }

      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
