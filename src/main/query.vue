<style scoped>
* {
  font-weight: 400;
}
thead th {
  cursor: pointer;
}
.table thead th {
  border-top: 0px;
  border-bottom-width: 1px;
}
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
///formula?mp=130&ammo=130&mre=130&part=130&type=tdoll
import comment from "./comment.vue";
export default {
  data() {
    return {
      received: {
        mp: 130,
        ammo: 130,
        mre: 130,
        part: 130,
        type: "tdoll"
      },
      query_obj: {}
    };
  },
  components: {
    comment: comment
  },
  methods: {
    checkUrl() {
      if (
        this.$query_obj.id == 0 ||
        !this.$query_obj.cat ||
        !this.$router.fullpath === "/query"
      ) {
        this.$router.push({ path: "/home" });
        return;
      }
      this.query_obj = this.$dic[this.$query_obj.cat][this.$query_obj.id];
    }
  },

  created() {
    this.checkUrl();

    // console.log(this.$query_obj);
  }
};
</script>

