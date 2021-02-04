<template>
  <div>
    <HanderNav/>
      <router-view></router-view>
  </div>
</template>

<script>
import HanderNav from '@/components/HanderNav.vue'
export default {
components:{
  HanderNav
}
}
</script>

<style>

</style>