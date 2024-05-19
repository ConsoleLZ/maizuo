<template>
  <div style="padding: 10px">
    <van-nav-bar title="影院" @click-left="handleLeft" @click-right="handleRight">
      <template #left>
        {{ $store.state.cityName }}<van-icon name="arrow-down" />
      </template>
      <template #right>
        <van-icon name="search" size="25" color="black"/>
      </template>
    </van-nav-bar>
    <cinemas-list :cinemasData="$store.state.cinemasList"></cinemas-list>
  </div>
</template>
<script>
import BScroll from "better-scroll";
import Vue from "vue";
import { NavBar } from "vant";
import { Icon } from 'vant';
import cinemasList from '@/components/cinemas.vue'

Vue.use(NavBar);
Vue.use(Icon);
export default {
  components:{
    cinemasList
  },
  methods:{
    handleLeft(){
      // console.log('城市切换')
      this.$router.push('/city')
    },
    handleRight(){
      // console.log('搜索')
      this.$router.push('/cinema/search')
    }
  },
  mounted() {
    if(!this.$store.state.cinemasList.length){
      this.$store.dispatch('getCinemaData').then(()=>{
        let wrapper = document.querySelector(".wrapper");
          new BScroll(wrapper, {
            scrollbar: {
              fade: true,
            },
            mouseWheel: true,
          });
      })
    }else{
      // console.log('缓存')
      let wrapper = document.querySelector(".wrapper");
          new BScroll(wrapper, {
            scrollbar: {
              fade: true,
            },
            mouseWheel: true,
          });
    }
  },
};
</script>
