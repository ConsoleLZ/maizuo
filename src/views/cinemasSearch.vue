<template>
  <div>
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @cancel="onCancel"
        @input="valueChange"
      />
    </form>
    <cinemas-list :cinemasData="searchList" genSelect="SearchWrapper"></cinemas-list>
    <div v-if="!searchList.length" class="zuiJing">
      <div style="color: #bdc0c5; margin-bottom: 15px">离你最近：</div>
      <ul>
        <li
          class="zuiJingItem"
          v-for="data in this.$store.state.cinemasList.slice(0, 5)"
          :key="data.cinemaId"
        >
          {{ data.name }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Search } from "vant";
import cinemasList from "@/components/cinemas.vue";
import mymixins from "@/utils/mymixins";

Vue.use(Search);
export default {
  mixins: [mymixins],
  data() {
    return {
      value: "",
      searchList: [],
      timer: null,
    };
  },
  components: {
    cinemasList,
  },
  methods: {
    onCancel() {
      this.$router.back();
    },
    valueChange() {
      if (this.timer) {
        // 清除定时器
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        if (!this.value) {
          this.searchList = [];
          return;
        }
        this.searchList = this.$store.state.cinemasList.filter(
          (item) =>
            item.name.includes(this.value.toLocaleUpperCase()) ||
            item.name.includes(this.value) ||
            item.address.includes(this.value.toLocaleUpperCase()) ||
            item.address.includes(this.value)
        );
      }, 500);
    },
  },
  created() {
    if (!this.$store.state.cinemasList.length) {
      this.$store.dispatch("getCinemaData")
    }
  },
};
</script>
<style scoped>
.SearchWrapper{
  margin-top: 54px;
}
.zuiJing {
  position: absolute;
  top: 60px;
  left: 15px;
  font-size: 13px;
}
.zuiJingItem {
  height: 30px;
  background-color: hsla(0, 0%, 95.7%, 0.6);
  line-height: 30px;
  border-radius: 3px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  font-size: 13px;
  margin-bottom: 10px;
}
.van-search{
  width: 100%;
  position: fixed;
  top: 0;
}
</style>