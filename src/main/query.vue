<style scoped>
* {
  font-weight: 400;
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
        <div>
          <h4 class="pb-3">{{cn_name +' '+$t('query.time')}}</h4>
          <h5 class="pb-2">{{$t('query.dev_time')+": "+dev_time}}</h5>
        </div>
        <div class="row justify-content-center justify-content-md-between flex-column flex-md-row">
          <div class="btn-group btn-group-toggle mb-2">
            <label
              class="btn btn-secondary"
              :class="{'active': filterFlag==1}"
              @click="filterFlag=1"
            >
              <input type="radio" name="options" id="options1" autocomplete="off" />
              {{$t('query.normal')}}
            </label>
            <label
              class="btn btn-secondary"
              :class="{'active': filterFlag==2}"
              @click="filterFlag=2"
            >
              <input type="radio" name="options" id="options2" autocomplete="off" />
              {{$t('query.heavy')}}
            </label>
            <label
              class="btn btn-secondary"
              :class="{'active': filterFlag==3}"
              @click="filterFlag=3"
            >
              <input type="radio" name="options" id="options3" autocomplete="off" />
              {{$t('query.show_all')}}
            </label>
          </div>
          <div class="row mb-2">
            <date-picker
              v-model="date_span"
              range
              :not-before="new Date('2016-5-20 GMT+0800')"
              :not-after="today"
              :confirm="true"
              :shortcuts="false"
              :editable="false"
              style="width:auto"
            ></date-picker>
            <button
              class="btn btn-secondary ml-1"
              :disabled="renderFlag===2"
              @click="queryTime()"
            >{{$t('query.search')}}</button>
          </div>
        </div>
      </div>

      <div class="overflow-scroll w-100">
        <table class="table" v-show="renderFlag===1">
          <thead>
            <tr>
              <th>{{$t('query.order')}}</th>
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
            <tr v-for="(ele,i) in sorted_data" :key="i" @click="toFormula(ele.total,ele.formula)">
              <td>{{i+1}}</td>
              <td>{{ele.formula.mp}}</td>
              <td>{{ele.formula.ammo}}</td>
              <td>{{ele.formula.mre}}</td>
              <td>{{ele.formula.part}}</td>
              <td>{{ele.formula.input_level}}</td>
              <td>{{ele.count}}</td>
              <td>{{ele.total}}</td>
              <td>{{ele.rate+'%'}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="text-center">
        <h2 v-show="renderFlag===0">No Data Found</h2>
        <h2 v-show="renderFlag===2">Loading....</h2>
      </div>
      <hr />
      <comment :uri="`${queryID.type}_${queryID.id}`"></comment>
      <hr />
    </div>
  </div>
</template>

<script>
///formula?mp=130&ammo=130&mre=130&part=130&type=tdoll

import comment from "./comment.vue";
import DatePicker from "vue2-datepicker";
import { mapState } from "vuex";
import { reject } from "q";
import queryFormulaVue from "./queryFormula.vue";
export default {
  data() {
    return {
      data: {},
      sorted_data: {},
      date_span: [],
      // today: "",
      sort: { current: 7, order: -1 },
      filterFlag: 3,
      renderFlag: 2
    };
  },
  components: {
    comment,
    DatePicker
  },
  methods: {
    checkUrl() {
      if (this.$route.fullPath != "/id" || this.checkPara()) {
        this.$router.push({ path: "/home" });
        return true;
      }
      return false;
    },

    checkPara() {
      var { type, id } = this.queryID;
      id = parseInt(id);
      try {
        if (type === "tdoll" || type === "fairy" || type === "equip") {
          if (typeof id === "number" && id > 0) {
            return false;
          }
        }
      } catch (error) {
        return true;
      }
      return true; //true means corrupted data
    },

    installData() {
      if (this.data === null) {
        this.renderFlag = 0;
        return;
      }
      this.data.forEach(ele => {
        try {
          Object.assign(ele, {
            rate: new Number((ele.count / ele.total) * 100).toFixed(3)
          });
        } catch {
          console.log("reg parse failed");
        }
      });
      this.sorted_data = Array.from(this.data);
      this.renderFlag = 1;
    },

    queryFormula() {
      var _this = this;
      this.$ajax
        .get("/stats/id", {
          type: this.queryID.type,
          id: this.queryID.id
        })
        .then(res => {
          if (res == undefined) {
            this.renderFlag = 0;
            return;
          }
          if (res.status == 200) {
            this.data = res.data.data.data;
            this.installData();
          }
        });
    },

    queryTime() {
      var _this = this;
      this.renderFlag = 2;
      //time query only enabled here
      var { type, id } = this.queryID;
      if (this.date_span.length < 2 || this.date_span[0] == null) {
        this.queryFormula();
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
          id,
          from,
          to
        };
        this.$ajax
          .get("/stats/id", param)
          .then(res => {
            // console.log(res);
            if (res == undefined) {
              this.renderFlag = 0;
              return;
            }
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
          this.sorted_data = this.data.sort(
            (a, b) => _this.sort.order * (a.formula.mp - b.formula.mp)
          );
          break;
        case 2:
          this.sorted_data = this.data.sort(
            (a, b) => _this.sort.order * (a.formula.ammo - b.formula.ammo)
          );
          break;
        case 3:
          this.sorted_data = this.data.sort(
            (a, b) => _this.sort.order * (a.formula.mre - b.formula.mre)
          );
          break;
        case 4:
          this.sorted_data = this.data.sort(
            (a, b) => _this.sort.order * (a.formula.part - b.formula.part)
          );
          break;
        case 5:
          this.sorted_data = this.data.sort(
            (a, b) =>
              _this.sort.order * (a.formula.input_level - b.formula.input_level)
          );
          break;
        case 6:
          this.sorted_data = this.data.sort(
            (a, b) => _this.sort.order * (a.total - b.total)
          );
          break;
        case 7:
          this.sorted_data = this.data.sort(
            (a, b) => _this.sort.order * (a.count - b.count)
          );
          break;
        case 8:
          this.sorted_data = this.data.sort(
            (a, b) =>
              _this.sort.order * (new Number(a.rate) - new Number(b.rate))
          );
          break;
      }
    },

    refilter() {
      this.reSort();
      switch (this.filterFlag) {
        case 1:
          this.sorted_data = this.sorted_data.filter(
            ele => ele.formula.input_level == 0
          );
          break;
        case 2:
          this.sorted_data = this.sorted_data.filter(
            ele => ele.formula.input_level > 0
          );
          break;
        case 3:
          break;
      }
    },

    toFormula(total, param) {
      var type = this.queryID.type === "tdoll" ? "tdoll" : "equip";
      var { mp, ammo, mre, part, input_level } = param;
      this.$store.commit("setCurrentTotal", total);
      this.$store.commit("setQueryFormula", {
        type,
        mp,
        ammo,
        mre,
        part,
        input_level
      });
      this.$router.push({ path: "/formula" });
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
    },

    filterFlag() {
      this.refilter();
    }
  },
  computed: {
    ...mapState(["today", "queryID"]),
    reSortTrigger() {
      const { current, order } = this.sort;
      return { current, order };
    },

    cn_name() {
      try {
        return this.$store.state.dic[this.queryID.type][this.queryID.id][
          "cn_name"
        ];
      } catch {
        return "";
      }
    },

    dev_time() {
      try {
        return this.parseDevSec(
          this.$store.state.dic[this.queryID.type][this.queryID.id][
            "develop_duration"
          ]
        )
          .map(ele =>
            ele.toString().length == 1 ? "0" + ele.toString() : ele.toString()
          )
          .join(":");
      } catch {
        return "";
      }
    }
  },
  created() {
    // this.getStandardDate();
    // this.$getStandardDate();
    // this.$getInfo()
    //   .then(res => {
    //     this.$getGunInfo();
    //     this.$getEquipInfo();
    //     this.$getFairyInfo();
    //     return 1;
    //   })
    //   .then(res => {
    //     this.queryFormula();
    //   });
    // console.log(this.$store.state.dic);
    new Promise((resolve, reject) => {
      var s = this.checkUrl();
      if (s) reject("err");
      resolve();
    })
      .then(() => {
        this.queryFormula();
      })
      .catch(err => {});

    // console.log(this.$query_obj);
  }
  // activated() {
  //   this.queryFormula();
  // }
};
</script>

