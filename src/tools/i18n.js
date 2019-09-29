import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const mutilang = {
  zh: require('../i18n/zh.js'),
  en: require('../i18n/en.js'),
  kr: require('../i18n/kr.js'),
  jp: require('../i18n/jp.js'),
}

export default new VueI18n({
  locale: 'zh',
  fallbackLocale: 'zh',
  messages: mutilang
})