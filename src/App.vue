<template>
  <div id="app">
    <div class="confirm-area">
      <button @click="openBox">Click me</button>
    </div>
    <div class="pagination-area">
      <pagination @pageChange="onPageChange" @pageSizeChange="onPageSizeChange" :total="totalResult" :current="actualCurrent" :counts="counts" :count="count"></pagination>
    </div>
  </div>
</template>

<script>
import Confirm from './components/confirm/index'
import pagination from './components/pagination/pagination.vue'

export default {

  data(){
    return {
      totalResult:361,
      actualCurrent:1,
      counts:[10,20,50],
      count:10

    }
  },

  components: {
    pagination
  },
  methods: {
    openBox() {
      Confirm({
        message:'你确定不吃午饭吗？',
        confirm:function () {
            console.log(`你点击了确定`)
        },
        cancel:function () {
            console.log(`你点击了取消`)
        }

      })
    },

    onPageChange(val){
      console.log(`当前所在页:${val}`)
    },
    onPageSizeChange(val){
      console.log(`每页条数:${val}`)
    }


  }
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

}
  .pagination-area{
    margin-top: 50px;
  }

</style>
