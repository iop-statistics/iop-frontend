  <style scoped>
#menu {
  background-color: rgb(36, 39, 40);
  padding: 7px 0px 1px 0px;
  margin-bottom: 10px;
}
#mutiLang .btn {
  font-size: 0.75rem;
}
.navbar-brand img {
  width: 40px;
  height: 40px;
}
.navbar-brand span {
  color: white;
}
</style>

<template>
  <div>
    <header id="menu">
      <div class="container">
        <!-- <div class="row"> -->
        <router-link to="/" class="navbar-brand">
          <img src="../img/iop.jpg" alt srcset />
          <!-- <span>IOP公司出货统计3.5 BETA</span> -->
          <span>{{$t("app.header")}}</span>
        </router-link>
        <!-- </div> -->
      </div>
    </header>
    <div id="mutiLang" class="container">
      <div class="row justify-content-end">
        <div class="btn-group btn-group-toggle">
          <label class="btn btn-secondary" :class="{'active': langFlag==1}" @click="langFlag=1">
            <input type="radio" name="options" id="option1" autocomplete="off" /> 简体中文
          </label>
          <label class="btn btn-secondary" :class="{'active': langFlag==2}" @click="langFlag=2">
            <input type="radio" name="options" id="option2" autocomplete="off" /> English
          </label>
          <label class="btn btn-secondary" :class="{'active': langFlag==3}" @click="langFlag=3">
            <input type="radio" name="options" id="option3" autocomplete="off" /> 한국어
          </label>
          <label class="btn btn-secondary" :class="{'active': langFlag==4}" @click="langFlag=4">
            <input type="radio" name="options" id="option3" autocomplete="off" /> 日本語
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "pageHeader",
  data() {
    return {
      langFlag: 1
    };
  },
  methods: {},
  watch: {
    langFlag(val) {
      if (val == 1) {
        this.$i18n.locale = "zh";
      }
      if (val == 2) {
        this.$i18n.locale = "en";
      }
      if (val == 3) {
        this.$i18n.locale = "kr";
      }
      if (val == 4) {
        this.$i18n.locale = "jp";
      }
      document.title = this.$t("app.header").slice(0, -8);
    }
  },
  created() {
    document.title = this.$t("app.header").slice(0, -8);
  }
};
</script>
