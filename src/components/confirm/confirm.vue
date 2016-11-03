<template>
    <transition name="modal">
        <div class="layer_shadow"  v-show="show">
            <div class="dialog_wrap dialog-sm">
                <p class="subject">温馨提示<span class="close" @click="closeConfirm">&times;</span></p>
                <div class="app_cont_dialog">{{message}}</div>
                <div class="app_opt_dialog">
                    <button class="btn_a btn-save" @click="handle('confirm')" >确认</button>
                    <button class="btn_a bg_deep"  @click="handle('cancel')">取消</button>
                </div>
            </div>
        </div>
    </transition>
</template>
<style scoped lang="less">
  @import "../../less/scaffolding.less";
  @import "../../less/normalize.less";
  @import "../../less/button.less";
  @import "../../less/modal.less";
  .app_cont_dialog{
    padding-top: 35px;
    padding-left: 60px;
    padding-right: 60px;
    font-size: 16px;
    text-align: center;

  }

  .app_opt_dialog{
    margin: 48px 0 40px;
    text-align: center;
    button:first-child{
      margin-right: 10px;
    }
  }
</style>
<script>

    export default{
        data(){
            return{
              show:false,
              message:''
            }
        },
        props:{
            confirm:Function,
            cancel:Function
        },
        methods:{
          closeConfirm:function(){
            this.close()
          },
          handle:function(fn){
            this.close()
            this[fn]&&this[fn]();
          }
        },
        components:{

        }
    }
</script>
