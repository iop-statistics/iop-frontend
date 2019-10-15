<style lang="">
</style>

<template>
  <div>
    <div class="container">
      <!-- <h1>{{this.$route.query}}</h1> -->
      <div>
        <h5>{{query_obj.cn_name+' '+$t('query.time')}}</h5>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>{{$t('query.order')}}</th>
            <th>{{$t('query.mp')}}</th>
            <th>{{$t('query.amm')}}</th>
            <th>{{$t('query.mre')}}</th>
            <th>{{$t('query.part')}}</th>
            <th>{{$t('query.tier')}}</th>
            <th>{{$t('query.hits')}}</th>
            <th>{{$t('query.attempt')}}</th>
            <th>{{$t('query.rate')}}</th>
          </tr>
        </thead>
        <tbody>
          <tr></tr>
        </tbody>
      </table>
      <hr />
      <comment></comment>
      <hr />
    </div>
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
      query_formula_obj: {}
    };
  },
  methods: {
    checkUrl() {
      if (
        this.$query_obj.id == 0 ||
        !this.$query_obj.cat ||
        !this.$router.fullpath === "/query_formula"
      ) {
        this.$router.push({ path: "/home" });
        return;
      }
      this.query_formula_obj = this.$dic[this.$query_formula_obj.cat][
        this.$query_formula_obj.id
      ];
    },

    timeQuery() {
      // time query only enabled here
    },

    toProduct(cate, ide) {
      /* the time span disabled here*/
      Object.assign(this.$query_obj, { cat: cate, id: ide });
      this.$router.push({ path: "/query" });
    }
  },
  computed: {
    // uniformed() {
    //   let _this = this;
    //   let temp = "";
    //   for (var key in _this.received) {
    //     temp = temp + key + "=" + _this.received[key] + "&";
    //   }
    //   return temp.slice(0, temp.length - 1);
    // }
  },
  created() {
    // console.log(this.$route);
    this.checkUrl();
  }
};
</script>
