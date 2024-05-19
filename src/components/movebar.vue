<template>
  <div class="box_movebar">
    <div class="movebar_top" v-scroll="50">
      <div style="font-size: 17px">电影</div>
      <div @click="handleCityChange" style="position: absolute; top: 0px; left: 8px; font-size: 13px">
        {{ $store.state.cityName }}<van-icon name="arrow-down" />
      </div>
    </div>
    <div class="movebar">
      <label
        ><router-link
          to="/move/nowplaying"
          custom
          v-slot="{ navigate, isActive }"
          ><span
            ><li @click="navigate" :class="isActive ? 'active' : ''">
              正在热映
            </li></span
          ></router-link
        ></label
      >
      <label
        ><router-link
          to="/move/willplaying"
          custom
          v-slot="{ navigate, isActive }"
          ><span
            ><li @click="navigate" :class="isActive ? 'active' : ''">
              即将放映
            </li></span
          ></router-link
        ></label
      >
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Icon } from "vant";

Vue.use(Icon);
Vue.directive("scroll", {
  inserted: function (el,bind) {
    window.onscroll = function () {
      if (document.documentElement.scrollTop > bind.value) {
        el.style.display = "block";
      } else {
        el.style.display = "none";
      }
    };
  },
  unbind: function(){
    window.onscroll=null
  }
});
export default {
  methods:{
    handleCityChange(){
      this.$router.push('/city')
    }
  }
}
</script>
<style scoped>
.movebar {
  width: 96vw;
  height: 49px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: white;
}
.movebar li {
  list-style: none;
  line-height: 49px;
  height: 49px;
  font-size: 14px;
  color: #191a1b;
}
.active {
  border-bottom: 3px solid #ff5f16;
  color: #ff5f16 !important;
}
.movebar_top {
  background-color: white;
  text-align: center;
  height: 44px;
  line-height: 44px;
  display: none;
}
.box_movebar{
  position: sticky;
  top: 0;
  z-index: 999;
}
</style>