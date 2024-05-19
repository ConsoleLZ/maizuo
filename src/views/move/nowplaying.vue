<template>
  <!-- <div class="datalist"> -->
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    :immediate-check="false"
  >
    <van-cell
      v-for="data in datalist"
      :key="data.filmId"
      @click="handChangeDetail(data.filmId)"
    >
      <img :src="data.poster" alt="" />
      <div class="datalist_right">
        <div class="name">{{ data.name }}</div>
        <div class="right_content">
          <div :class="data.grade ? '' : 'grade_hidden'">
            观众评分 <span style="color: #ffb232">{{ data.grade }}</span>
          </div>
          <div class="actors">主演：{{ data.actors | dataActors }}</div>
          <div>{{ data.nation }} | {{ data.runtime }}分钟</div>
        </div>
      </div>
    </van-cell>
  </van-list>
  <!-- </div> -->
</template>

<script>
import Vue from "vue";
import http from "@/utils/http.js";
import { List,Cell } from "vant";

Vue.use(List);
Vue.use(Cell);
Vue.filter("dataActors", (data) => {
  if (data === undefined) return "暂无主演";
  return data.map((item) => item.name).join(" ");
});
export default {
  data() {
    return {
      datalist: [],
      loading: false,
      finished: false,
      pageNum: 1, //记录第几页的数据
      total: null, //记录返回数据的总长度
    };
  },
  methods: {
    handChangeDetail(id) {
      this.$router.push(`/detail/${id}`);
    },
    onLoad() {
      // **********懒加载重要bug解决
      if (this.total === null) {
        this.loading = false;
        return;
      } else {
        //判断是否所有数据加载完毕
        if (this.datalist.length === this.total) {
          this.finished = true;
          return;
        }
        this.pageNum++;
        http({
          url: `/gateway?cityId=${this.$store.state.cityId}&pageNum=${this.pageNum}&pageSize=10&type=1&k=9113038`,
          headers: {
            "X-Host": "mall.film-ticket.film.list",
          },
        })
          .then((res) => {
            this.datalist = [...this.datalist, ...res.data.data.films];
            this.loading = false;
          })
          .catch((err) => {
            console.log("错误", err);
          });
      }
    },
  },
  mounted() {
    http({
      url: `/gateway?cityId=${this.$store.state.cityId}&pageNum=1&pageSize=10&type=1&k=9113038`,
      headers: {
        "X-Host": "mall.film-ticket.film.list",
      },
    })
      .then((res) => {
        // console.log("卖座数据", res.data);
        this.datalist = res.data.data.films;
        this.total = res.data.data.total;
      })
      .catch((err) => {
        console.log("错误", err);
      });
  },
};
</script>

<style scoped>
.van-list {
  margin-bottom: 49px;
  overflow: hidden;
}
.datalist_right {
  transform: translateX(10px);
}
.van-list .van-cell {
  overflow: hidden;
  list-style: none;
  padding: 15px;
}
.van-list .van-cell img {
  float: left;
  width: 66px;
}
.name {
  font-size: 16px;
}
.right_content {
  font-size: 13px;
  margin-top: 4px;
  color: #797d82;
}
.actors {
  width: 210px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.grade_hidden {
  visibility: hidden;
}
</style>