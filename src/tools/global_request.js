export default {
  install(Vue, options) {
    Vue.prototype.$getGunInfo = function () {
      // if (!this.$store.state.flag.info) {
      //   const sync = await this.$getInfo();
      // }
      this.$ajax.get("/json/gun_info_simple.json").then(response => {
        if (response.status === 200 && this.$store.state.flag.info) {
          var tdoll = {}
          response.data
            .filter(a => a.id < 1000)
            .forEach(ele => {
              let temp = JSON.parse(JSON.stringify(ele));
              tdoll[temp.id] = temp
            });
          this.$store.commit('pushDic', {
            type: 'tdoll',
            content: tdoll,
          })
        }
      });
    };

    Vue.prototype.$getEquipInfo = function () {
      // if (!this.$store.state.flag.info) {
      //   const sync = await this.$getInfo();
      // }
      var re_c = new RegExp("16Lab");
      this.$ajax.get("/json/equip_info_simple.json").then(response => {
        if (response.status === 200 && this.$store.state.flag.info) {
          var equip = {};
          response.data
            .filter(
              a =>
                a.id < 100 &&
                a.develop_duration < 3600
              // &&!re_c.test(a.company) &&
              // a.company
            )
            // .sort((a, b) => a.category - b.category || a.rank - b.rank)
            .forEach(ele => {
              let temp = JSON.parse(JSON.stringify(ele));
              equip[temp.id] = temp;
              // switch (temp.category) {
              //   case "1":
              //     this.home_info.equip.acc.push(temp);
              //     break;
              //   case "2":
              //     if (!re.test(temp.cn_name)) {
              //       this.home_info.equip.mag.push(temp);
              //     }
              //     break;
              //   case "3":
              //     this.home_info.equip.ske.push(temp);
              //     break;
              // }
            });
          this.$store.commit('pushDic', {
            type: 'equip',
            content: equip,
          });
        }
      })
    };

    Vue.prototype.$getFairyInfo = function () {
      var fairy = {}
      this.$ajax.get("/json/fairy_info.json").then(response => {
        if (response.status === 200) {
          response.data
            .filter(a => a.id < 1000)
            // .sort((a, b) => a.category - b.category || a.id - b.id)
            .forEach(ele => {
              let temp = JSON.parse(JSON.stringify(ele));
              temp.rank = parseInt(temp.category) + 5;
              fairy[temp.id] = temp;
              // switch (temp.category) {
              //   case "1":
              //     this.home_info.fairy.bat.push(temp);
              //     break;
              //   case "2":
              //     this.home_info.fairy.tac.push(temp);
              //     break;
              // }
            });
          this.$store.commit('pushDic', {
            type: 'fairy',
            content: fairy,
          });
        }
      });
    };

    Vue.prototype.$getInfo = function () {
      var info = {}
      return this.$ajax.get("/stats/info").then(response => {
        if (response.status === 200) {
          info = response.data.data;
          let date = new Date(info.last_update * 1000);
          info.last_update =
            " " +
            date
              .toLocaleDateString()
              .split("/")
              .reverse()
              .join("-") +
            " " +
            date.toLocaleTimeString();
          return 1
        }
      }).then(input => {
        this.$store.commit('pushDic', {
          type: 'info',
          content: info,
        })
      }).catch(err => { console.log('error in fetching data from info') });
    };

    Vue.prototype.$getStandardDate = function () {

      this.$ajax.get("http://quan.suning.com/getSysTime.do")
        .then(res => {
          this.$store.commit('setToday', new Date(res.data.sysTime2.split(" ")[0] + "GMT+0800"))
          // console.log(today)
        })
        .catch(err => {
          this.$store.commit('setToday', new Date());
        });
    }
  }
}