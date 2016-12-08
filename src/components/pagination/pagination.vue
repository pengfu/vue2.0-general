<template>
  <div class="">
    <div class="select">
      <span>每页显示条数:</span>
      <select-item v-for="count in counts" :count="count" :isActive="actualCount === count" @click="handleSelectClick"></select-item>
    </div>
    <div class="page">
      <page-item identifier="singleBack" @click="handleClick">
        <span class="prev"><i></i></span>
      </page-item>
      <page-item :index="1" :isActive="actualCurrent === 1" @click="handleClick"></page-item>
      <page-item v-if="totalPageCount > 5 && actualCurrent - 1 >= 4" identifier="backs" @click="handleClick" title="前5页">
        <span>...</span>
      </page-item>
      <page-item v-for="item in pageList" :index="item" @click="handleClick"
                 :isActive="actualCurrent === item">
      </page-item>
      <page-item v-if="totalPageCount > 5 && totalPageCount - actualCurrent >= 4" identifier="forwards"
                 @click="handleClick" title="后5页">
        <span>...</span>
      </page-item>
      <page-item v-if="totalPageCount !== 1" :index="totalPageCount" @click="handleClick"
                 :isActive="actualCurrent === totalPageCount">
      </page-item>
      <page-item identifier="singleForward" @click="handleClick">
        <span class="next"><i></i></span>
      </page-item>
    </div>
  </div>

</template>
<style lang="less">
  .select{
    float:left;
    >span{
      color:#8e99b3;
      font-size: 12px;
      margin-right: 20px;
    }
  }
  .page {
    font-size: 0;
    float:right;
  }

  .clearfix {
    &:before,
    &:after {
      content: " "; // 1
      display: table; // 2
    }
    &:after {
      clear: both;
    }
  }

</style>
<script>
  import pageItem from './pageItem.vue'
  import selectItem from './selectItem.vue'
  export default{
    data(){
      return {
        totalPageCount: 0,
        pageList: [],
        actualCurrent:this.current,
        actualCount:this.count,
//        totalNumber:this.total
      }
    },
    props:{
      current: {
        type:Number,
        default:1
      },

      total: {
        type: Number,
        default: 0
      },

      count:{
        type:Number,
        default:10
      },
      counts:{
        type:Array,
      }

    },

    mounted() {
      this.pageList = this.calcPageList(this.actualCurrent)
    },

    computed: {
      totalPageCount(){
        return Math.ceil(this.total / this.actualCount)
      },

    },

    watch: {
      actualCurrent(val){
        if (val === 0) {
          return
        }
        this.pageSizeAndTotalChange(val)
        this.$emit('pageChange', val)
      },

      actualCount: function (val, oldVal) {
        // 如果页面条数改变的时候,对应的当前页也是需要重新计算的,
        // 计算规则是根据当前页的起始索引来计算该索引位于新的pageSize
        // 中的页码
        let itemIndex = oldVal * (this.actualCurrent - 1)
        let oldCurrent = this.actualCurrent
        this.actualCurrent = Math.floor(itemIndex / val) + 1
        // 页码条数改变的时候当前页不一定改变,但是我们必须重新计算一些依赖的参数
        if (oldCurrent === this.actualCurrent) {
          this.pageSizeAndTotalChange(oldCurrent)
        }
        this.$emit('pageSizeChange', val)
      },
      total: function (val) {
        // 如果条目总数改变的时候当前页也需要重新计算
        let oldCurrent = this.actualCurrent
        this.actualCurrent = Math.min(this.totalPageCount, this.actualCurrent)
        // 总条数改变的时候当前页不一定改变,但是我们必须重新计算一些依赖的参数,
        // 比如total从10变为11(pageSize=10),那么current没变,不过右前进的按钮应该由
        // disable变为enable的
        if (oldCurrent === this.actualCurrent) {
          this.pageSizeAndTotalChange(oldCurrent)
        }
      },


    },
    methods: {
      handleSelectClick(res){
        this.actualCount = res
      },

      handleClick(res){
        if(typeof res === 'number'){
          this.actualCurrent = res
        }else{
          switch (res) {
            case 'singleBack':
              this.actualCurrent = Math.max(1, this.actualCurrent - 1)
              break
            case 'backs':
              this.actualCurrent = Math.max(1, this.actualCurrent - 5)
              break
            case 'forwards':
              this.actualCurrent = Math.min(this.totalPageCount, this.actualCurrent + 5)
              break
            case 'singleForward':
              this.actualCurrent = Math.min(this.totalPageCount, this.actualCurrent + 1)
              break
          }
        }
      },

      calcPageList (current) {
        let pageList = []

        if (this.totalPageCount > 5) {
          let left = Math.max(2, current - 2)
          let right = Math.min(current + 2, this.totalPageCount - 1)
          if (current - 1 < 2) {
            right = 4
          }

          if (this.totalPageCount - current < 2) {
            left = this.totalPageCount - 3
          }

          for (let i = left; i <= right; i++) {
            pageList.push(i)
          }
        } else {
          for (let i = 2; i < this.totalPageCount; i++) {
            pageList.push(i)
          }
        }

        return pageList
      },

      pageSizeAndTotalChange(current){
        this.pageList = this.calcPageList(current)
      },




    },
    components: {
      pageItem,
      selectItem
    },
  }
</script>
