<template>
  <van-index-bar :index-list="indexList" @change="handleToast">
    <div v-for="(data, index) in cityList" :key="data.city.cityId">
      <van-index-anchor :index="index">{{ data.type }}</van-index-anchor>
      <van-cell
        v-for="cityData in data.city"
        :key="cityData.cityId"
        :title="cityData.name"
        @click="handleCity(cityData.name, cityData.cityId)"
      />
    </div>
  </van-index-bar>
</template>

<script>
import Vue from "vue";
import { IndexBar, IndexAnchor } from "vant";
import { Cell } from "vant";
import { Toast } from "vant";
import http from "@/utils/http.js";
import mymixins from "@/utils/mymixins";

Vue.use(IndexBar);
Vue.use(IndexAnchor);
Vue.use(Cell);
Vue.use(Toast);
export default {
  mixins: [mymixins],
  data() {
    return {
      indexList: [],
      cityList: [],
    };
  },
  mounted() {
    http({
      url: "/gateway?k=5679737",
      headers: {
        "X-Host": "mall.film-ticket.city.list",
      },
    })
      .then((res) => {
        // console.log(res.data.data.cities)
        this.renderCity(res.data.data.cities);
      })
      .catch((err) => {
        console.log("错误", err);
      });
  },
  methods: {
    renderCity(cityData) {
      for (var i = 65; i < 91; i++) {
        var newcityList = cityData.filter(
          (item) =>
            item.pinyin.substring(0, 1).toLocaleUpperCase() ==
            String.fromCharCode(i)
        );
        if (newcityList.length === 0) continue;
        this.indexList.push(String.fromCharCode(i));
        this.cityList.push({
          type: String.fromCharCode(i),
          city: newcityList,
        });
      }
    },
    handleToast(data) {
      Toast(data);
    },
    // 切换城市事件
    handleCity(cityName, cityId) {
      // console.log(cityName,cityId)
      this.$store.commit("changeCityName", cityName);
      this.$store.commit("changeCityId", cityId);
      this.$store.commit("clearCinemas");
      this.$router.back()
    },
  },
};
</script>
<style scoped>
.van-index-anchor {
  background-color: #f1ebeb;
}
</style>