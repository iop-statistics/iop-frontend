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
      <div class="pb-4">
        <div>
          <h4 class="pb-3">{{cn_name +' '+$t('query.time')}}</h4>
          <h5 class="pb-2">{{$t('query.dev_time')+": "+dev_time}}</h5>
        </div>
        <div class="row justify-content-between">
          <div class="btn-group btn-group-toggle">
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
          <div class="row">
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
      <table class="table">
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
          <tr v-for="(ele,i) in sorted_data" :key="i" @click="toFormula([ele.type,ele.formula])">
            <td>{{i+1}}</td>
            <td>{{ele.formula.mp}}</td>
            <td>{{ele.formula.ammo}}</td>
            <td>{{ele.formula.mre}}</td>
            <td>{{ele.formula.part}}</td>
            <td>{{ele.formula.input_level}}</td>
            <td>{{ele.total}}</td>
            <td>{{ele.count}}</td>
            <td>{{ele.rate+'%'}}</td>
          </tr>
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
import DatePicker from "vue2-datepicker";
export default {
  data() {
    return {
      data: {},
      sorted_data: {},
      date_span: [],
      today: "",
      sort: { current: 7, order: -1 },
      filterFlag: 3
    };
  },
  components: {
    comment,
    DatePicker
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

    getStandardDate() {
      this.$ajax
        .get("http://quan.suning.com/getSysTime.do")
        .then(res => {
          this.today = new Date(res.data.sysTime2.split(" ")[0] + "GMT+0800");
        })
        .catch(err => {
          this.today = new Date();
        });
    },

    queryFormula() {
      var _this = this;
      this.$ajax
        .get(
          `/stats/id?type=${_this.$route.query.type}&id=${_this.$route.query.id}`
        )
        .then(res => {
          if (res.status == 200) {
            this.data = res.data;
            this.data.forEach(ele => {
              Object.assign(ele, {
                rate: new Number((ele.total / ele.count) * 100).toFixed(3)
              });
            });
            this.sorted_data = Array.from(this.data);
          }
        });
    },

    queryTime() {
      var _this = this;
      //time query only enabled here
      var type = this.$route.query.type;
      var id = this.$route.query.id;
      if (this.date_span.length < 2) {
        return;
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
            if (res.status == 200) {
              this.data = res.data;
              this.reSort();
              return 1;
            }
            console.log(res.status);
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

    toFormula(param) {
      var type = parseInt(param[0]) == 0 ? "tdoll" : "equip";
      var { mp, ammo, mre, part, input_level } = param[1];
      this.$router.push({
        path: "/query_formula",
        query: {
          type,
          mp,
          ammo,
          mre,
          part,
          input_level
        }
      });
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
    reSortTrigger() {
      const { current, order } = this.sort;
      return { current, order };
    },

    cn_name() {
      try {
        return this.$store.state.dic[this.$route.query.type][
          this.$route.query.id
        ]["cn_name"];
      } catch {
        return "";
      }
    },

    dev_time() {
      try {
        return this.parseDevSec(
          this.$store.state.dic[this.$route.query.type][this.$route.query.id][
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
    this.getStandardDate();
    this.$getInfo()
      .then(res => {
        this.$getGunInfo();
        this.$getEquipInfo();
        this.$getFairyInfo();
        return 1;
      })
      .then(res => {
        this.queryFormula();
      });
    // console.log(this.$store.state.dic);
    // this.checkUrl();
    // console.log(this.$query_obj);
  }
};
</script>

