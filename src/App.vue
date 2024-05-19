<template>
  <div id="box_App">
    <navbar></navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import 'vant/lib/index.css';
import navbar from '@/components/navbar.vue'
export default({
    components: {
      navbar
    }
})
</script>


<style>
#box_App{
  font-size: 16px;
}
</style>