<style scoped>
* {
  font-weight: 400;
}

.n .icon-star:before {
  color: #6c757d;
}
.r .icon-star:before {
  color: #5db4d8;
}
.sr .icon-star:before {
  color: #8fc31f;
}
.ssr .icon-star:before {
  color: orange;
}

thead th,
tbody tr {
  cursor: pointer;
}
.table thead th {
  border-top: 0px;
  border-bottom-width: 1px;
}

td,
th {
  text-align: center;
}

tbody tr:hover,
thead tr th:hover {
  background: #f5f5f5;
}
</style>

<template>
  <div>
    <div class="container">
      <div class="pb-4">
        <div class="row justify-content-between align-items-end">
          <div>
            <h4 class="pb-3">{{formulaDisplay +$t('query_formula.tier')}}</h4>
            <h5 class="pb-2">{{$t('query_formula.total',{msg:this.currentTotal})}}</h5>
          </div>
          <div class="row pb-2">
            <date-picker
              v-model="date_span"
              range
              :not-before="new Date('2016-5-20 GMT+0800')"
              :not-after="today"
              :confirm="true"
              :shortcuts="false"
              :editable="false"
            ></date-picker>
            <button class="btn btn-secondary ml-1" @click="queryTime()">{{$t('query.search')}}</button>
          </div>
        </div>
      </div>
      <table class="table" v-show="renderFlag===1">
        <thead>
          <tr>
            <th>{{$t('query_formula.order')}}</th>
            <th
              v-if="queryFormula.type=='tdoll'"
              @click="changeSort(1)"
            >{{$t('query_formula.tdoll_order')}}</th>
            <th v-else @click="changeSort(1)">{{$t('query_formula.equip_order')}}</th>

            <th @click="changeSort(2)">{{$t('query_formula.rank')}}</th>
            <th>{{$t('query_formula.tdoll')}}</th>
            <th @click="changeSort(3)">{{$t('query_formula.dev_time')}}</th>
            <th @click="changeSort(4)">{{$t('query_formula.hits')}}</th>
            <th @click="changeSort(5)">{{$t('query_formula.rate')}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(ele,i) in sorted_data" :key="i" @click="toProduct(ele.type,ele.id)">
            <td>{{i+1}}</td>
            <td>{{ele.id}}</td>
            <td
              v-if="queryFormula.type==='tdoll' || queryFormula.type==='equip'"
              :class="{'n':ele.rank==2,
                       'r':ele.rank==3,              'sr':ele.rank==4,             'ssr':ele.rank==5}"
            >
              <span v-for="n in ele.rank" :key="n" class="icon-star"></span>
            </td>
            <td>{{ele.name}}</td>
            <td>
              {{parseDevSec(ele.devTime).map(ele =>
              ele.toString().length == 1 ? "0" + ele.toString() : ele.toString()
              )
              .join(":")}}
            </td>
            <td>{{ele.count}}</td>
            <td>{{ele.rate+'%'}}</td>
          </tr>
        </tbody>
      </table>
      <div class="text-center">
        <h2 v-show="renderFlag===0">No Data Found</h2>
        <h2 v-show="renderFlag===2">Loading....</h2>
      </div>
      <hr />
      <comment
        :uri="`${queryFormula.type}_${queryFormula.mp}_${queryFormula.ammo}_${queryFormula.mre}_${queryFormula.part}_${queryFormula.input_level}}`"
      ></comment>
      <hr />
    </div>
  </div>
</template>

<script>
///formula?mp=130&ammo=130&mre=130&part=130&type=tdoll
import comment from "./comment.vue";
import DatePicker from "vue2-datepicker";
import { mapState } from "vuex";
export default {
  components: {
    comment,
    DatePicker
  },
  data() {
    return {
      data: {},
      sorted_data: {},
      date_span: [],
      sort: { current: 6, order: -1 },
      filterFlag: 3,
      renderFlag: 2
    };
  },
  methods: {
    checkUrl() {
      if (this.checkPara() || !this.$router.fullpath === "/formula") {
        this.$router.push({ path: "/home" });
        return true;
      }
      return false;
    },

    checkPara() {
      var { type, mp, ammo, mre, part, input_level } = this.queryFormula;
      var ty = new Set(
        [mp, ammo, mre, part, input_level].map(ele => typeof ele)
      );
      try {
        if (type === "tdoll" || type === "equip") {
          if (
            ty.has("number") &&
            ty.size === 1 &&
            mp >= 10 &&
            mp <= 9999 &&
            ammo >= 10 &&
            ammo <= 9999 &&
            mre >= 10 &&
            mre <= 9999 &&
            part >= 10 &&
            part <= 9999 &&
            input_level >= 0 &&
            input_level <= 3
          ) {
            return false;
          }
        }
      } catch (error) {
        return true;
      }
      return true;
    },

    installData() {
      this.sorted_data = Array.from(this.data);
      if (this.data === null) {
        this.renderFlag = 0;
        console.log(2);
        return;
      }
      var _this = this;
      this.sorted_data.forEach(ele => {
        try {
          if (_this.queryFormula.type === "tdoll") {
            Object.assign(ele, {
              rank: _this.dic.tdoll[ele.id].rank,
              name: _this.dic.tdoll[ele.id].cn_name.split("|")[0],
              devTime: _this.dic.tdoll[ele.id].develop_duration,
              type: "tdoll"
            });
          } else if (ele.type === 1) {
            Object.assign(ele, {
              rank: parseInt(_this.dic.equip[ele.id].rank),
              name: _this.dic.equip[ele.id].cn_name,
              devTime: _this.dic.equip[ele.id].develop_duration,
              type: "equip"
            });
          } else if (ele.type === 2) {
            Object.assign(ele, {
              rank: parseInt(_this.dic.fairy[ele.id].rank),
              name: _this.dic.fairy[ele.id].cn_name,
              devTime: _this.dic.fairy[ele.id].develop_duration,
              type: "fairy"
            });
          }
          Object.assign(ele, {
            rate: new Number((ele.count / _this.currentTotal) * 100).toFixed(3)
          });
        } catch {
          console.log("parse failed");
        }
      });
      console.log(this.sorted_data);
      this.renderFlag = 1;
    },

    changeSort(code) {
      if (code == this.sort.current) {
        this.sort.order *= -1;
      } else {
        this.sort.current = code;
        this.sort.order = -1;
      }
    },

    reSort() {
      var _this = this;
      switch (this.sort.current) {
        case 1:
          this.sorted_data = this.sorted_data.sort(
            (a, b) => _this.sort.order * (a.id - b.id)
          );
          break;
        case 2:
          this.sorted_data = this.sorted_data.sort(
            (a, b) => _this.sort.order * (a.rank - b.rank)
          );
          break;
        case 3:
          this.sorted_data = this.sorted_data.sort(
            (a, b) => _this.sort.order * (a.devTime - b.devTime)
          );
          break;
        case 4:
          this.sorted_data = this.sorted_data.sort(
            (a, b) => _this.sort.order * (a.count - b.count)
          );
          break;
        case 5:
          this.sorted_data = this.sorted_data.sort(
            (a, b) =>
              _this.sort.order * (new Number(a.rate) - new Number(b.rate))
          );
          break;
      }
    },

    queryProduct() {
      var { type, mp, ammo, mre, part, input_level } = this.queryFormula;
      var _this = this;
      this.$ajax
        .get("/stats/formula", {
          type,
          mp,
          ammo,
          mre,
          part,
          input_level
        })
        .then(res => {
          if (res == undefined) {
            return;
          }
          if (res.status == 200) {
            this.data = res.data.data.data;
            this.installData();
          }
        });
    },

    queryTime() {
      this.renderFlag = 2;
      var _this = this;
      //time query only enabled here
      var { type, mp, ammo, mre, part, input_level } = this.queryFormula;
      if (this.date_span.length < 2) {
        return;
      } else if (this.date_span[0] == null) {
        this.queryProduct();
      } else {
        var from =
          this.date_span[0].getFullYear() +
          ("0" + (this.date_span[0].getMonth() + 1)).substr(-2) +
          ("0" + this.date_span[0].getDate()).substr(-2);
        var to =
          this.date_span[1].getFullYear() +
          ("0" + (this.date_span[1].getMonth() + 1)).substr(-2) +
          ("0" + this.date_span[1].getDate()).substr(-2);
        var param = {
          type,
          mp,
          ammo,
          mre,
          part,
          input_level,
          from,
          to
        };
        this.$ajax
          .get("/stats/formula", param)
          .then(res => {
            // console.log(res);
            if (res.status == 200) {
              this.data = res.data.data.data;
              this.installData();
              this.reSort();
              return 1;
            }
            // console.log(res.status);
          })
          .catch(err => console.log(err));
      }
    },

    toProduct(cate, ide) {
      /* the time span disabled here*/
      this.$store.commit("setQueryID", { type: cate, id: ide });
      this.$router.push({ path: "/id" });
    },

    parseDevSec(sec) {
      sec = parseInt(sec);
      var h, m, s;
      h = Math.floor(sec / 3600);
      sec -= h * 3600;
      m = Math.floor(sec / 60);
      s = sec - m * 60;
      return [h, m, s];
    }
  },

  watch: {
    reSortTrigger() {
      this.reSort();
    }
  },
  computed: {
    ...mapState(["today", "queryFormula", "currentTotal", "dic"]),
    formulaDisplay() {
      var { mp, ammo, mre, part, input_level } = this.queryFormula;
      return [mp, ammo, mre, part, input_level].join(" ");
    },
    reSortTrigger() {
      const { current, order } = this.sort;
      return { current, order };
    }
  },
  created() {
    // this.$ajax
    //   .get(
    //     "/stats/formula?mp=500&ammo=500&mre=500&part=500&input_level=1&type=equip"
    //   )
    //   .then(res => {
    //     console.log(res);
    //   });
    // this.$getStandardDate();
    // this.$getInfo()
    //   .then(res => {
    //     this.$getGunInfo();
    //     this.$getEquipInfo();
    //     this.$getFairyInfo();
    //     return 1;
    //   })
    //   .then(res => {
    //     this.queryProduct();
    //   });

    new Promise((resolve, reject) => {
      var s = this.checkUrl();
      if (s) reject("err");
      resolve();
    })
      .then(() => {
        this.queryProduct();
      })
      .catch(err => {});
  }
  // activated() {
  //   this.queryProduct();
  // }
};
</script>
