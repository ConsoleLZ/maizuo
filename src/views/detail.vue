<template>
  <div>
    <div v-if="filmInfo">
      <div
        :style="{
          backgroundImage: `url(${filmInfo.poster})`,
        }"
        class="filmInfo_img"
      >
        <detail-navbar :name="filmInfo.name"></detail-navbar>
      </div>
      <div class="filmInfo_jie_shao">
        <div class="filmInfo_name">
          <div class="filmInfo_name_left">
            <div>{{ filmInfo.name }}</div>
            <span>{{ filmInfo.filmType.name }}</span>
          </div>
          <div style="color: #ffb232">{{ filmInfo.grade }}分</div>
        </div>
        <div class="tg">{{ filmInfo.category }}</div>
        <div class="tg">{{ filmInfo.premiereAt | filmInfoTime }}上映</div>
        <div class="tg">{{ filmInfo.nation }} | {{ filmInfo.runtime }}分钟</div>
        <div class="tg synopsis" :class="isHidden ? 'hidden' : ''">
          {{ filmInfo.synopsis }}
        </div>
        <span
          class="iconfont icon-xuanzeqizhankai_o"
          :class="isHidden ? '' : 'isXuangzhuang'"
          @click="isHidden = !isHidden"
        ></span>
        <!-- 演职演员 -->
        <div style="font-size: 16px; margin-top: 20px; margin-bottom: 10px">
          演职演员
        </div>
        <swiper :slidesPerView="3.6" swiperName="actorsSwiper">
          <swiper-item v-for="(data, index) in filmInfo.actors" :key="index">
            <div
              class="ators_image"
              :style="{
                backgroundImage: `url(${data.avatarAddress})`,
              }"
            ></div>
            <div style="font-size: 12px; text-align: center; margin-top: 9px">
              {{ data.name }}
            </div>
            <div style="font-size: 10px; text-align: center; color: #797d82">
              {{ data.role }}
            </div>
          </swiper-item>
        </swiper>
        <!-- 剧照 -->
        <div style="font-size: 16px; margin-top: 20px; margin-bottom: 10px">
          剧照
        </div>
        <swiper
          :slidesPerView="2.3"
          swiperName="atorsPhotosImage"
        >
          <swiper-item v-for="(data, index) in filmInfo.photos" :key="index">
            <div
              class="ators_photos_image"
              :style="{
                backgroundImage: `url(${data})`,
              }"
              @click="ImagePreview(index)"
            ></div>
          </swiper-item>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
import http from "@/utils/http.js";
import swiper from "@/components/detailSwiper.vue";
import swiperItem from "@/components/detailSwiperItem.vue";
import detailNavbar from "@/components/detailNavbar.vue";
import mymixins from "@/utils/mymixins";
import moment from "moment";
import { ImagePreview } from "vant";
import Vue from "vue";
Vue.filter("filmInfoTime", (time) => {
  return moment(time * 1000).format("YYYY-MM-DD");
});
export default {
  mixins: [mymixins],
  data() {
    return {
      filmInfo: null,
      isHidden: true,
    };
  },
  methods: {
    ImagePreview(index) {
      ImagePreview({
        images: this.filmInfo.photos,
        startPosition: index,
      });
    },
  },
  components: {
    swiper,
    swiperItem,
    detailNavbar,
  },
  created() {
    // console.log(this.$route.params.id)
    http({
      url: `/gateway?filmId=${this.$route.params.id}&k=914445`,
      headers: {
        "X-Host": "mall.film-ticket.film.info",
      },
    })
      .then((res) => {
        // console.log(res.data.data.film)
        this.filmInfo = res.data.data.film;
      })
      .catch((err) => {
        console.log("错误", err);
      });
  },
};
</script>
<style lang="scss" scoped>
.icon-xuanzeqizhankai_o {
  width: 100%;
  font-family: "iconfont" !important;
  font-size: 18px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  display: inline-block;
}
.filmInfo_img {
  width: 100%;
  height: 13.125rem;
  background-position: center center;
  background-size: cover;
}
.filmInfo_jie_shao {
  padding: 15px;
  padding-top: 12px;
}
.tg {
  font-size: 13px;
  color: #797d82;
  margin-top: 4px;
}
.filmInfo_name {
  display: flex;
  justify-content: space-between;
}
.filmInfo_name_left {
  display: flex;
}
.filmInfo_name_left span {
  font-size: 9px;
  color: #fff;
  background-color: #1967dd;
  height: 14px;
  line-height: 14px;
  padding: 0 2px;
  border-radius: 2px;
  display: inline-block;
}
.synopsis {
  overflow: hidden;
}
.hidden {
  height: 35px !important;
}
.isXuangzhuang {
  transform: rotate(-180deg);
}
.ators_image {
  width: 5.3125rem;
  height: 5.6125rem;
  background-position: center center;
  background-size: cover;
}
.ators_photos_image {
  width: 9.375rem;
  height: 6.25rem;
  background-position: center center;
  background-size: cover;
}
</style>