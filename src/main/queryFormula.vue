<style scoped>
* {
  font-weight: 400;
}
</style>

<template>
  <div>
    <div class="container">
      <!-- <h1>{{this.$route.query}}</h1> -->
      <div></div>
      <table class="table">
        <thead>
          <tr>
            <th>{{$t('query_formula.order')}}</th>
            <th>{{$t('query_formula.tdoll_order')}}</th>
            <th>{{$t('query_formula.rank')}}</th>
            <th>{{$t('query_formula.tdoll')}}</th>
            <th>{{$t('query_formula.dev_time')}}</th>
            <th>{{$t('query_formula.mp')}}</th>
            <th>{{$t('query_formula.amm')}}</th>
            <th>{{$t('query_formula.mre')}}</th>
            <th>{{$t('query_formula.part')}}</th>
            <th>{{$t('query_formula.tier')}}</th>
            <th>{{$t('query_formula.hits')}}</th>
            <!-- <th>{{$t('query_formula.attempt')}}</th> -->
            <th>{{$t('query_formula.rate')}}</th>
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
  computed: {},
  created() {
    // console.log(this.$route);
    // this.checkUrl();
  }
};
</script>
