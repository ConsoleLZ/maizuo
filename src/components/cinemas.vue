<template>
    <div v-if="this.$store.state.cinemasList" :class="genSelect">
      <ul>
        <li v-for="data in cinemasData" :key="data.cinemaId" class="cinemaItem">
          <div style="width: 70%">
            <div>{{ data.name }}</div>
            <div class="cinema_address">{{ data.address }}</div>
          </div>
          <div
            style="
              width: 25%;
              text-align: center;
              font-size: 15px;
              color: #ff5f16;
            "
          >
            ￥{{ data.lowPrice / 100 }}起
          </div>
        </li>
      </ul>
    </div>
</template>
<script>
export default {
   props:{
        cinemasData:{
            type:Array,
            default:[]
        },
        genSelect:{
            type:String,
            default:'wrapper'
        }
    }
}
</script>
<style scoped>
.cinemaItem {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 15px;
  box-sizing: border-box;
}
.cinema_address {
  width: 80%;
  color: #797d82;
  font-size: 12px;
  margin-top: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.wrapper {
  height: calc(100vh - 98px);
  overflow: hidden;
  position: relative;
}
</style>