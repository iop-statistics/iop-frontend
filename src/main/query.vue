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
            <th @click="changeSort(0)">{{$t('query.order')}}</th>
            <th @click="changeSort(1)">{{$t('query.mp')}}</th>
            <th @click="changeSort(2)">{{$t('query.amm')}}</th>
            <th @click="changeSort(3)">{{$t('query.mre')}}</th>
            <th @click="changeSort(4)">{{$t('query.part')}}</th>
            <th @click="changeSort(5)">{{$t('query.tier')}}</th>
            <th @click="changeSort(6)">{{$t('query.hits')}}</th>
            <th @click="changeSort(7)">{{$t('query.attempt')}}</th>
            <th @click="changeSort(8)">{{$t('query.rate')}}</th>
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
      query_obj: {},
      sort: { current: 7, order: 0 }
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
    },

    changeSort(code) {
      if (code == this.sort.current) {
        this.sort.order ^= 1;
      } else {
        this.sort.current = code;
        this.sort.order = 0;
      }
    },

    reSort() {},

    timeQuery() {
      //time query only enabled here
    },

    toFormula() {
      this.$router.push({ path: "/query_formula" });
    }
  },

  watch: {
    reSortTrigger() {}
  },
  computed: {
    reSortTrigger() {
      const { current, order } = this.sort;
      return { current, order };
    }
  },
  created() {
    this.checkUrl();

    // console.log(this.$query_obj);
  }
};
</script>

