import Vue from 'vue'
import Vuex from 'vuex'
import http from "@/utils/http.js";
import persistedState from 'vuex-persistedstate'

let create_persistedstate = persistedState({ 
  key:'store',
  reducer(val) {
    return {
        // 指定存储的内容
          cityName: val.cityName,
          cityId: val.cityId
      }
  }
})

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [create_persistedstate],
  state: {
    cityName: '娄底',
    cityId: 431300,
    cinemasList: []
  },
  getters: {
  },
  // 同步操作
  mutations: {
    changeCityName(state, cityname) {
      state.cityName = cityname
    },
    changeCityId(state, cityid){
      state.cityId = cityid
    },
    clearCinemas(state){
      state.cinemasList = [] 
    }
  },
  // 异步操作
  actions: {
    getCinemaData(store){
      return http({
        url: `/gateway?cityId=${store.state.cityId}&ticketFlag=1&k=7882741`,
        headers: {
          "X-Host": "mall.film-ticket.cinema.list",
        },
      })
        .then((res) => {
          // console.log(res.data.data.cinemas)
          store.state.cinemasList=res.data.data.cinemas
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
  modules: {
  }
})
