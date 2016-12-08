<template>
  <div class="select-item" :class="{'active':isActive}" @click="handleClick">
    <span >{{count}}</span>
  </div>
</template>
<style lang="less">
  .select-item{
    display: inline-block;
    color:#8e99b3;
    font-size: 12px;
    -webkit-text-size-adjust:none;
    line-height: 24px;
    width: 34px;
    height: 24px;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    margin-right: 4px;

    &.active{
      border: 1px solid #e3e7ee;
      border-radius: 12px;
      background-color: #1f95e7;
      color:#fff;
    }

  }
</style>
<script>
  export default{
    data(){
      return {
        msg: 'hello vue'
      }
    },

    props: {
      count:{
        type:Number,
      },
      isActive:{
        type:Boolean,
        default:false
      }
    },
    methods:{
      handleClick(){
        this.$emit('click', this.count)
      }
    },
    components: {}
  }
</script>
