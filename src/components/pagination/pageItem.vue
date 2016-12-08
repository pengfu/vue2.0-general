<template>
  <div class="page-item" @click="handleClick" :class="{'active':isActive}">
    <span v-if="index">{{index}}</span>
    <slot></slot>
  </div>
</template>
<style lang="less">
  .page-item{
    display: inline-block;
    border:1px solid #e3e7ee;
    color:#8e99b3;
    border-radius: 4px;
    font-size: 12px;
    -webkit-text-size-adjust:none;
    line-height: 32px;
    width: 32px;
    height: 32px;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    margin-right: 4px;


    &.active{
      background-color: #1f95e7;
      color:#fff;
    }
    &:hover:not(.active){
      background-color:#fafafe;
    }
    .prev i, .next i {
      background: url("../../assets/sprite.png");
      width: 11px;
      height: 18px;
      display: inline-block;
      cursor: pointer;
      vertical-align: middle;
    }

    .prev i {
      background-position: -25px -3px;
    }

    .next i {
      background-position: -40px -3px;
    }
  }


</style>
<script>
export default{
    data(){
        return{

        }
    },
    props:{
      index:{
        type:Number
      },
      isActive: {
        type:Boolean,
        default:false
      },
      identifier: {
        type: String
      }
    },
    methods:{
      handleClick(){
        if(this.index){
          this.$emit('click', this.index)
        }else {
          this.$emit('click', this.identifier)
        }
      }
    },
    components:{

    }
}
</script>
