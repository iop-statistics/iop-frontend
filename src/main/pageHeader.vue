  <style scoped>
#menu {
  background-color: rgb(36, 39, 40);
  padding: 7px 0px 1px 0px;
  margin-bottom: 10px;
}
#mutiLang .btn {
  font-size: 0.75rem;
}
#mutiLang button.btn {
  font-size: 1rem;
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
      <div class="container overflow-scroll">
        <!-- <div class="row"> -->
        <router-link to="/" class="navbar-brand">
          <img src="../assets/iop.jpg" alt srcset />
          <!-- <span>IOP公司出货统计3.5 BETA</span> -->
          <span>{{$t("app.header")}}</span>
        </router-link>
        <!-- </div> -->
      </div>
    </header>
    <div id="mutiLang" class="container py-3">
      <div
        class="row align-items-sm-center justify-content-center justify-content-sm-between flex-column flex-sm-row"
      >
        <div class="btn-group btn-group-toggle pb-2 pb-sm-0">
          <router-link
            to="/home"
            class="btn btn-secondary"
            tag="button"
            v-if="$route.fullPath!='/home'"
          >{{$t("app.back")}}</router-link>
        </div>
        <div class="btn-group btn-group-toggle">
          <label
            class="btn btn-secondary"
            :class="{'active': langFlag=='zh'}"
            @click="langFlag='zh'"
          >
            <input type="radio" name="options" id="option1" autocomplete="off" /> 简体中文
          </label>
          <label
            class="btn btn-secondary"
            :class="{'active': langFlag=='en'}"
            @click="langFlag='en'"
          >
            <input type="radio" name="options" id="option2" autocomplete="off" /> English
          </label>
          <label
            class="btn btn-secondary"
            :class="{'active': langFlag=='kr'}"
            @click="langFlag='kr'"
          >
            <input type="radio" name="options" id="option3" autocomplete="off" /> 한국어
          </label>
          <label
            class="btn btn-secondary"
            :class="{'active': langFlag=='jp'}"
            @click="langFlag='jp'"
          >
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
      langFlag: String
    };
  },
  methods: {
    setLocalStorage(str) {
      if (["zh", "en", "kr", "jp"].indexOf(str) != -1) {
        localStorage.setItem("locale", str);
      }
    },
    getLocalStorage() {
      const locale = localStorage.getItem("locale");
      if (["zh", "en", "kr", "jp"].indexOf(locale) != -1) {
        this.$i18n.locale = this.langFlag = locale;
      } else {
        this.$i18n.locale = this.langFlag = "zh";
      }
    }
  },
  watch: {
    langFlag(val) {
      if (["zh", "en", "kr", "jp"].indexOf(val) != -1) {
        this.$i18n.locale = val;
        this.setLocalStorage(val);
      }
      document.title = this.$t("app.header").slice(0, -8);
    }
  },
  created() {
    this.getLocalStorage();
    document.title = this.$t("app.header").slice(0, -8);
  }
};
</script>
