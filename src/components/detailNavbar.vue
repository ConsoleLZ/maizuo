<template>
  <div>
    <span
      class="iconfont icon-fanhui5"
      style="color: #3e3636"
      @click="pageBack()"
    ></span>
    <div class="navbar" v-scroll="50">
      {{ name }}
    </div>
  </div>
</template>
<script>
import Vue from "vue";
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
  props: {
    name: {
      type: String,
      default: "暂无标题",
    },
  },
  methods: {
    pageBack() {
      window.history.back();
    },
  },
};
</script>
<style scoped>
.icon-fanhui5 {
  font-family: "iconfont" !important;
  font-size: 30px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: fixed;
  top: 7px;
  z-index: 11;
}
.navbar {
  background-color: white;
  height: 44px;
  line-height: 44px;
  position: fixed;
  z-index: 10;
  font-size: 17px;
  text-align: center;
  width: 100%;
  display: none;
}
</style>
