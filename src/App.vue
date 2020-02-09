<template>
  <div id="app">
    <!-- <header :class="`app_header `">
      <div class="app_icon">鹿城区疫情防控指挥地图</div>
      <div class="app_toptab_position app_toptab_normal">
        <ul class="app_toptab">
          <li
            v-for="(item,index) in toptab"
            :key="index"
            :class="{top_active:index==current}"
            @click="$goRoute(item.route),selected(index)"
          >{{item.label}}</li>
        </ul>
        <p>截至日期：2020年2月1日8点</p>
        <p style="position: absolute;right: 15px;top: 15px;">温州设计集团勘测院</p>
        <p style="position: absolute;right: 15px;top: 40px;">{{time}}</p>
      </div>
    </header>-->
    <div class="app_container">
      <!-- <router-view ref="router" />
      <transition name="frame"></transition>-->
      <!-- <transition name="slide-fade">
      <router-view/>
      </transition>-->
      <!-- <transition :name="transitionName">
        <router-view></router-view>
      </transition>-->

      <transition :name="transitionName">
        <keep-alive include="Mobile">
          <router-view></router-view>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import router from "@/router";
import { OPTION, GET_ARCGIS_TOKEN, WRT_config } from "./components/common/Tmap";
import { fixMenuList } from "./components/common/user/menuHash";
export default {
  name: "app",
  data() {
    return {
      toptab: [
        { label: "宏观管控", route: "control" },
        { label: "防疫布控", route: "macroscopic" },
        { label: "疫情监控", route: "monitor" }
      ],
      current: 1,
      time: " ",
      transitionName: "slide-right"
    };
  },
  watch: {
    $route(to, from) {
      let toName = to.name;
      const toIndex = to.meta.index;
      const fromIndex = from.meta.index;
      this.transitionName = toIndex > fromIndex ? "slide-left" : "slide-right";
    }
  },
  mounted() {
    setInterval(() => {
      this.getTime();
    }, 1000);
  },
  methods: {
    shallLogin() {
      const that = this;
      return new Promise(async (resolve, reject) => {
        that.tabs = window.user.au_username ? fixMenuList(that.toptab) : [];
        resolve(true);
      });
    },
    setLoation() {
      const { name } = this.$router.history.current;
      this.toptab.map((item, index) => {
        if (item.route === name) {
          this.current = index;
        }
      });
    },
    selected(index) {
      this.current = index;
    },
    doRegisterToken(token) {
      const that = this;
      that.$arcgisToken = token;
      loadModules(["esri/identity/IdentityManager"], OPTION).then(
        ([IdentityManager]) => {
          //  token注册
          IdentityManager.registerToken({
            server: GET_ARCGIS_TOKEN,
            token
          });
        }
      );
    },
    //获取当前时间
    getTime() {
      var date = new Date();
      var seperator1 = "-";
      var seperator2 = ":";
      //以下代码依次是获取当前时间的年月日时分秒
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      var minute = date.getMinutes();
      var hour = date.getHours();
      var second = date.getSeconds();
      //固定时间格式
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      if (hour >= 0 && hour <= 9) {
        hour = "0" + hour;
      }
      if (minute >= 0 && minute <= 9) {
        minute = "0" + minute;
      }
      if (second >= 0 && second <= 9) {
        second = "0" + second;
      }
      var currentdate =
        year +
        seperator1 +
        month +
        seperator1 +
        strDate +
        " " +
        hour +
        seperator2 +
        minute +
        seperator2 +
        second;
      this.time = currentdate;
      //return currentdate;
    }
  }
};
</script>

<style lang="less">
@import url("components/common/css/common.less");
@import url("components/common/css/style.less");
@import url("components/common/css/animate.css");
@import url("components/common/css/frame.less");
@import url("components/common/css/arcgis.css");
// .slide-fade{
//   position: fixed;left:0;right: 0;
//   width: 100%;
//   background-color: white;
// }
// .slide-fade-enter, .slide-fade-leave-to
// {
//   left:0;top: 0;right: 0;
//   position: absolute;
//   transform:translateX(-500px) translateY(-500px) rotate(-150deg) scale(0.5);
//   opacity:1;
// }
// .slide-fade-enter-active {
//   background-color: white;
//   transition: all 0.6s ease;
// }
// .slide-fade-leave-active {
//   transition: all 0.7s ease;
//   background-color: white;
//   transform:translateX(500px) translateY(500px) rotate(150deg) scale(1) ;
//   z-index: 100;
// }
.Router {
  position: relative;
}
.Router > * {
  position: absolute;
  width: 100%;
  text-align: center;
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 500ms;
}

.slide-right-enter {
  opacity: 0;
  transform: translateX(-100%);
}

.slide-right-leave-active {
  opacity: 0;
  transform: translateX(100%);
}

.slide-left-enter {
  opacity: 0;
  transform: translateX(100%);
}

.slide-left-leave-active {
  opacity: 0;
  transform: translateX(-100%);
}
</style>
