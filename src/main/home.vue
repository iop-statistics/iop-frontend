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
export default {
  name: "home",
  data() {
    return {
      notice: {},
      home_info: {
        t_doll: {
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
    getGunInfo() {
      this.$ajax.get("../sample_data/gun_info.json").then(response => {
        if (response.status === 200) {
          this.$dic.t_doll = {};
          response.data
            .filter(a => a.id < 1000)
            .sort((a, b) => a.type - b.type || a.rank - b.rank)
            .forEach(ele => {
              let temp = JSON.parse(JSON.stringify(ele));
              let temp1 = JSON.parse(JSON.stringify(ele));
              this.$dic.t_doll[temp1.id] = temp1;
              temp.cn_name = temp.cn_name + " | " + temp.code;
              switch (temp.type) {
                case 1:
                  this.home_info.t_doll.hg.push(temp);
                  break;
                case 2:
                  this.home_info.t_doll.smg.push(temp);
                  break;
                case 3:
                  this.home_info.t_doll.rf.push(temp);
                  break;
                case 4:
                  this.home_info.t_doll.ar.push(temp);
                  break;
                case 5:
                  this.home_info.t_doll.mg.push(temp);
                  break;
                case 6:
                  this.home_info.t_doll.sg.push(temp);
                  break;
              }
            });
        }
      });
    },
    getEquipInfo() {
      var re = new RegExp("（|）");
      var re_c = new RegExp("16Lab");
      this.$ajax.get("../sample_data/equip_info.json").then(response => {
        if (response.status === 200) {
          this.$dic.equip = {};
          response.data
            .filter(
              a =>
                a.id < 100 &&
                a.develop_duration < 3600 &&
                !re_c.test(a.company) &&
                a.company
            )
            .sort((a, b) => a.category - b.category || a.rank - b.rank)
            .forEach(ele => {
              let temp = JSON.parse(JSON.stringify(ele));
              this.$dic.equip[temp.id] = temp;
              switch (temp.category) {
                case "1":
                  this.home_info.equip.acc.push(temp);
                  break;
                case "2":
                  if (!re.test(temp.cn_name)) {
                    this.home_info.equip.mag.push(temp);
                  }
                  break;
                case "3":
                  this.home_info.equip.ske.push(temp);
                  break;
              }
            });
        }
      });
      // console.log(this.home_info.equip.acc);
    },
    getFairyInfo() {
      this.$ajax.get("../sample_data/fairy_info.json").then(response => {
        if (response.status === 200) {
          this.$dic.fairy = {};
          response.data
            .filter(a => a.id < 1000)
            .sort((a, b) => a.category - b.category || a.id - b.id)
            .forEach(ele => {
              let temp = JSON.parse(JSON.stringify(ele));
              temp.rank = parseInt(temp.category) + 5;
              this.$dic.fairy[temp.id] = temp;
              switch (temp.category) {
                case "1":
                  this.home_info.fairy.bat.push(temp);
                  break;
                case "2":
                  this.home_info.fairy.tac.push(temp);
                  break;
              }
            });
        }
      });
    },
    getNotification() {
      this.$ajax.get("../sample_data/info.json").then(response => {
        if (response.status === 200) {
          this.notice = response.data;
          let date = new Date(this.notice.last_update * 1000);
          this.notice.last_update =
            " " +
            date
              .toLocaleDateString()
              .split("/")
              .reverse()
              .join("-") +
            " " +
            date.toLocaleTimeString();
        }
      });
    },
    performQuery(cate, ide) {
      // this.$query_obj.cat = cate;
      // this.$query_obj.id = ide;
      Object.assign(this.$query_obj, { cat: cate, id: ide });
      this.$router.push({ path: "/query" });
    }
  },
  created() {
    this.getNotification();
    this.getGunInfo();
    this.getEquipInfo();
    this.getFairyInfo();
    // console.log(this.$dic);
    // console.log(JSON.parse(JSON.stringify(this.home_info.equip.acc[0])));
    // console.log(this.home_info.equip.acc);
  }
};
</script>
