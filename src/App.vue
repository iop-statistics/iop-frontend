<template>
  <div class="container-fluid" style="padding:0px;min-height:100%;position:relative">
    <pageHeader></pageHeader>
    <keep-alive include="home">
      <router-view style="padding-bottom:130px"></router-view>
    </keep-alive>
    <pageFooter style="position: absolute;bottom: 0;width: 100%;"></pageFooter>
  </div>
</template>

<script>
import pageFooter from "./main/pageFooter.vue";
import pageHeader from "./main/pageHeader.vue";
export default {
  components: {
    pageFooter,
    pageHeader
  }
};
</script>

<style>
[v-cloak] {
  display: none;
}
.container {
  padding: 0px !important;
  margin-bottom: 10px;
}

.row {
  margin: 0 !important;
}

html {
  font-size: 14px !important;
}
html,
body {
  height: 100%;
}

/* hr {
  margin-left: -15px;
  margin-right: -15px;
} */
</style>

