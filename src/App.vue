<template>
  <div id="app">
    <div>  
      <!-- //视图删除在添加   -->
      <router-view v-if='isRouterAlive' ></router-view>
    </div>
    
  </div>
</template>

<script>


export default {
  name: 'app',
  data(){
    return{/*  */
      isRouterAlive:true
    }
  },
  components: {
   
  },
  provide(){
    return{
      reload:this.reload
    }
  },
  methods:{
    reload(){
      this.isRouterAlive=false;
      this.$nextTick(()=>{// DOM更新完成  生命周期函数
        this.isRouterAlive=true
      })
    }
  }
}
</script>

<style>

</style>
