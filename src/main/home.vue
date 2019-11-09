<style scoped>
.inner {
  padding: 0.7rem 0;
}
.card-body {
  padding: 0.6rem 1.25rem;
}
.counter {
  margin-bottom: 1rem;
}
.counter p {
  margin: 0px !important;
}

h5 {
  font-weight: 400;
}

.blocks {
  padding: 6px 12px;
  margin-left: 10px;
  margin-top: 10px;
  display: inline-block;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 4px;
  color: white;
}

.blocks.rank-2 {
  background-color: #6c757d;
}
.blocks.rank-3 {
  background-color: #5db4d8;
}
.blocks.rank-4 {
  background-color: #8fc31f;
}
.blocks.rank-5 {
  background-color: orange;
}
.blocks.rank-6 {
  background-color: #ff6a38;
}
.blocks.rank-7 {
  background-color: #7794d6;
}
</style>

<template>
  <div>
    <div class="container">
      <div class="card">
        <div class="card-header">{{ $t("home.notification") }}</div>
        <div class="card-body">
          <p class="card-text">
            {{$t("home.source")}}
            <a href="javascript:void(0);">gfdb</a>
          </p>
          <p class="card-text">{{$t("home.update")+(notice.last_update || '1970-1-1 0:00:00')}}</p>
          <div class="counter">
            <p class="card-text">{{$t("home.equip_counter")+(notice.equip_count || 999999)}}</p>
            <p class="card-text">{{$t("home.doll_counter")+(notice.gun_count || 999999)}}</p>
          </div>
          <p>{{notice.info}}</p>
          <p class="card-text">{{$t("home.conditions")}}</p>
        </div>
      </div>
    </div>

    <div class="container">
      <div v-for="(obj,cat,index) in home_info" :id="cat" :key="index">
        <div class="inner" v-for="(val,key,i) in obj" :key="i">
          <div class="title">
            <h5>{{ $t('home.cate.'+ key ) }}</h5>
          </div>
          <div
            class="blocks"
            v-for="ele in val"
            :class="'rank-'+ ele.rank"
            @click="performQuery(cat,ele.id)"
            :key="ele.id"
            v-text="ele.cn_name"
          ></div>
        </div>
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
import { reject } from "q";
export default {
  name: "home",
  data() {
    return {
      notice: {},
      home_info: {
        tdoll: {
          hg: [],
          smg: [],
          rf: [],
          ar: [],
          mg: [],
          sg: []
        },
        equip: {
          acc: [],
          mag: [],
          ske: []
        },
        fairy: {
          bat: [],
          tac: []
        }
      }
    };
  },
  methods: {
    performQuery(cate, ide) {
      // this.$query_obj.cat = cate;
      // this.$query_obj.id = ide;
      // Object.assign(this.$query_obj, { cat: cate, id: ide });
      this.$router.push({ path: `/query?type=${cate}&id=${ide}` });
    },

    installInfo() {
      this.notice = this.$store.state.dic.info;
    },

    installGun() {
      Object.values(this.$store.state.dic.tdoll).forEach(ele => {
        ele.cn_name = ele.cn_name + " | " + ele.code;
        switch (ele.type) {
          case 1:
            this.home_info.tdoll.hg.push(ele);
            break;
          case 2:
            this.home_info.tdoll.smg.push(ele);
            break;
          case 3:
            this.home_info.tdoll.rf.push(ele);
            break;
          case 4:
            this.home_info.tdoll.ar.push(ele);
            break;
          case 5:
            this.home_info.tdoll.mg.push(ele);
            break;
          case 6:
            this.home_info.tdoll.sg.push(ele);
            break;
        }
      });
      Object.values(this.home_info.tdoll).forEach(ele => {
        ele = ele.sort((a, b) => a.type - b.type || a.rank - b.rank);
      });
    },

    installEquip() {
      var re = new RegExp("（|）");
      Object.values(this.$store.state.dic.equip).forEach(ele => {
        switch (ele.category) {
          case "1":
            this.home_info.equip.acc.push(ele);
            break;
          case "2":
            if (!re.test(ele.cn_name)) {
              this.home_info.equip.mag.push(ele);
            }
            break;
          case "3":
            this.home_info.equip.ske.push(ele);
            break;
        }
      });
      Object.values(this.home_info.equip).forEach(ele => {
        ele = ele.sort((a, b) => a.category - b.category || a.rank - b.rank);
      });
    },

    installFairy() {
      Object.values(this.$store.state.dic.fairy).forEach(ele => {
        switch (ele.category) {
          case "1":
            this.home_info.fairy.bat.push(ele);
            break;
          case "2":
            this.home_info.fairy.tac.push(ele);
            break;
        }
      });
      Object.values(this.home_info.fairy).forEach(ele => {
        ele = ele.sort((a, b) => a.category - b.category || a.id - b.id);
      });
    }
  },
  watch: {
    infoTrigger(newVal) {
      if (newVal == 1) {
        this.notice = this.$store.state.dic.info;
      }
    },
    gunTrigger(newVal) {
      if (newVal == 1) {
        this.installGun();
      }
    },
    equipTrigger(newVal) {
      if (newVal == 1) {
        this.installEquip();
      }
    },

    fairyTrigger(newVal) {
      if (newVal == 1) {
        this.installFairy();
      }
    }
  },
  computed: {
    infoTrigger() {
      return this.$store.state.flag.info;
    },
    gunTrigger() {
      return this.$store.state.flag.tdoll;
    },
    equipTrigger() {
      return this.$store.state.flag.equip;
    },
    fairyTrigger() {
      return this.$store.state.flag.fairy;
    }
  },
  created() {
    var _this = this;
    // var promise = new Promise((resolve, reject) => {
    //   if (!_this.$store.state.flag.info) {
    //     _this.$getInfo();
    //   }
    //   resolve("complete");
    // });
    // promise.then(res => {
    //   _this.$getGunInfo();
    //   _this.$getEquipInfo();
    // });
    this.$getInfo().then(res => {
      this.$getGunInfo();
      this.$getEquipInfo();
      this.$getFairyInfo();
    });
    // this.$getGunInfo();
    // this.$getEquipInfo();
    // this.$getFairyInfo();
    // console.log("test api");
    // this.$ajax
    //   // .get(
    //   //   "http://db.baka.pw:8898/stats/formula?mp=130&ammo=130&mre=130&part=130&type=tdoll"
    //   // )
    //   .get('/json/equip_info_simple.json')
    //   .then(res => {
    //     console.log(res);
    //   });
    // console.log(this.$dic);
    // console.log(JSON.parse(JSON.stringify(this.home_info.equip.acc[0])));
    // console.log(this.home_info.equip.acc);
  }
};
</script>
