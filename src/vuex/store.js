import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    dic: {
      tdoll: {},
      equip: {},
      fairy: {},
      info: {},
    },
    flag: {
      tdoll: 0,
      equip: 0,
      fairy: 0,
      info: 0
    }
  },

  mutations: {
    pushDic(state, para) {
      state.dic[para.type] = para.content
      state.flag[para.type] = 1
    }
  }

})


export default store