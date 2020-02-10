/**
 * vue-cli router config
 * add by eds 2019/7/6
 */
import Vue from "vue";
import Router from "vue-router";
// pages modules
import Macroscopic from "./components/macroscopic/Macroscopic.vue";
import Control from "./components/control/Control.vue";
import Monitor from "./components/monitor/Monitor.vue";
import Mobile from "./components/mobile/map.vue"
import MobileXq from "./components/mobile/xq.vue"
import MobileGK from "./components/mobile/gk.vue"
import BlImg from "./components/mobile/blImg.vue"
// import tb from "./components/mobile/tb.vue";

Vue.use(Router);

export default new Router({
  mode: "hash",
  routes:
    [
      {
        // path: "/",
        // name: "macroscopic",
        // component: Macroscopic
        path: "/",
        name: "Mobile",
        component: Mobile,
        meta: { index: 1 }
      }, {
        path: "/MobileXq",
        name: "MobileXq",
        component: MobileXq,
        meta: { index: 2 }
      }, {
        path: "/MobileGK",
        name: "MobileGK",
        component: MobileGK,
      }, {
        path: "/BlImg",
        name: "BlImg",
        component: BlImg,
      },
      {
        path: "/monitor",
        name: "monitor",
        component: Monitor
      },
      // {
      //   path: "/tb",
      //   name: "tb",
      //   component: tb
      // }
    ]
});
