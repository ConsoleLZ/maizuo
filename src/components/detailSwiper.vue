<template>
  <div class="swiper" :class="swiperName">
    <div class="swiper-wrapper">
        <slot></slot>
    </div>
  </div>
</template>
<script>
import Swiper from "swiper";
import "swiper/css";
export default {
  props:{
    slidesPerView:{
      type:Number,
      default:1
    },
    swiperName:{
      type:String,
      default:'swiper'
    }
  },
  mounted() {
    var mySwiper = new Swiper(`.${this.swiperName}`, {
      slidesPerView: this.slidesPerView,
      spaceBetween: 30,
      freeMode: true,
    });
  },
};
</script>