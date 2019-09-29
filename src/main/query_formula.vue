<style lang="">
</style>

<template>
  <div>
    <h1>This is the query component (for formula)</h1>
    <router-link :to="'/query?'+uniformed">to link</router-link>
    <comment></comment>
  </div>
</template>

<script>
import comment from "./comment.vue";
export default {
  components: {
    comment
  },
  data() {
    return {
      received: {
        id: 233,
        type: "tdoll"
      }
    };
  },
  computed: {
    uniformed() {
      let _this = this;
      let temp = "";
      for (var key in _this.received) {
        temp = temp + key + "=" + _this.received[key] + "&";
      }
      return temp.slice(0, temp.length - 1);
    }
  },
  created() {
    console.log(this.$route);
  }
};
</script>
