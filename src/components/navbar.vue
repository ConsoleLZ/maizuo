<template>
    <div class="navbar">
      <label
        ><router-link to="/move/nowplaying" custom v-slot="{ navigate, isActive }"
          ><span
            ><li
              @click="navigate"
              :class="isActive ? 'active' : ''"
            ><span class="iconfont icon-dianyingpiaoiocn"></span>电影
            </li></span
          ></router-link
        ></label
      >
      <label
        ><router-link to="/cinema" custom v-slot="{ navigate, isActive }"
          ><span
            ><li
              @click="navigate"
              :class="isActive ? 'active' : ''"
            ><span class="iconfont icon-yingyuan"></span>影院
            </li></span
          ></router-link
        ></label
      >
      <label
        ><router-link to="/information" custom v-slot="{ navigate, isActive }"
          ><span
            ><li
              @click="navigate"
              :class="isActive ? 'active' : ''"
            ><span class="iconfont icon-zixun"></span>资讯
            </li></span
          ></router-link
        ></label
      >
      <label
        ><router-link to="/center" custom v-slot="{ navigate, isActive }"
          ><span
            ><li
              @click="navigate"
              :class="isActive ? 'active' : ''"
            ><span class="iconfont icon-wode"></span>我的
            </li></span
          ></router-link
        ></label
      >
   </div>
</template>
<style scoped>
.active{
  color: #ff5f16;
}
.navbar{
  height: 49px;
  width: 100vw;
  position: fixed;
  z-index: 999;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: white;
  color: #797d82;
}
.navbar li{
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.iconfont{
  font-size: 25px;
}
</style>