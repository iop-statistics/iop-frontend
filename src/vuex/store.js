import Vue from 'vue'
import Vuex from 'vuex'
// import { stat } from 'fs'

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
    },
    today: "",
    currentTotal: 0,
    queryID: {},
    queryFormula: {}

  },

  mutations: {
    pushDic(state, para) {
      state.dic[para.type] = para.content
      state.flag[para.type] = 1
    },
    setToday(state, today) {
      state.today = today
    },
    setCurrentTotal(state, total) {
      state.currentTotal = total
    },
    setQueryID(state, obj) {
      state.queryID = obj
    },
    setQueryFormula(state, obj) {
      state.queryFormula = obj
    }
  }

})


export default store