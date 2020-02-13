<template>
  <div class="map">
    <!-- <div class="title">
      <span>温州市新冠肺炎防控作战地图</span>
    </div>-->
    <header class="app_header">
      <ul class="app_toptab">
        <li
          v-for="(item,index) in toptab"
          :key="index"
          :class="{top_active:index==current}"
          @click="goPage(index)"
        >
          <span>
            <img :src="item.icon" />
            <i>{{item.label}}</i>
          </span>
        </li>
      </ul>
    </header>
    <div class="qz" v-if="current == 0">
      <p>今日全市</p>
      <div class="qz_num">
        <ul>
          <li>
            <div style="width: 20%;">
              <img src="./img/rflag.png" />
              <span style="color: red;">{{qz_num.red}}</span>
            </div>
            <div style="width: 20%;">
              <img src="./img/wflag.png" />
              <span>{{qz_num.white}}</span>
            </div>
            <div style="width: 30%;">
              <img src="./img/wflag.png" />
              <span style="padding-right:7px">转</span>
              <img src="./img/rflag.png" />
              <span>{{qz_num.wr}}</span>
            </div>
            <div style="width: 30%;">
              <img src="./img/rflag.png" />
              <span style="padding-right:7px">转</span>
              <img src="./img/wflag.png" />
              <span style="color: red;">{{qz_num.rw}}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="isGk isGkActive" @click="gkChange" v-if="current == 0">管控力</div>
    <div class="kind" v-if="current != 2">
      <div class="t1">一类区域</div>
      <div class="t2">二类区域</div>
      <div class="t3">三类区域</div>
      <div class="t4">四类区域</div>
    </div>
    <div class="sjlz" v-if="current != 2">数据来源：温州市新冠肺炎工作领导小组</div>
    <div class="bottom" v-if="current != 2">
      <div class="float" v-show="logoshow">
        <span>温州设计集团勘察院</span>
      </div>
      <p>
        <span class="text">截至</span> 2020年 2月
        <span class="time">{{date}}</span>日
        <span class="time">24</span>时
      </p>
      <img src="./img/logo.png" @click="showLogo()" />
    </div>
    <fk v-if="current == 0" ref="fk" />
    <bl v-if="current == 1" ref="bl" />
    <tb v-if="current == 2" />
  </div>
</template>

<script>
/* eslint-disable */

import bl from "./chart/bl";
import fk from "./chart/fk";
import tb from "./chart/tb";
import wx from "weixin-js-sdk";
// import dd from "dingtalk-jsapi";
import axios from "axios";
import { date } from "./mapdata";
import { mapState, mapActions } from "vuex";

export default {
  name: "Mobile",
  components: { bl, fk, tb },
  data() {
    return {
      toptab: [
        {
          label: "防控作战",
          name: "Map",
          icon: require("./img/Map.png")
        },
        {
          label: "病例分布",
          name: "Estate",
          icon: require("./img/Estate.png")
        },
        {
          label: "疫情趋势",
          name: "Analyze",
          icon: require("./img/Analyze.png")
        },
        {
          label: "区域风险",
          name: "Risk",
          icon: require("./img/Risk.png")
        }
      ],
      current: 0,
      reloadFlag: null,
      date,
      token: "",
      access_token: "",
      ticketString: "",
      nonceStr: "Wm3WZYTPz0wzccnC",
      timestamp: 1414587466,
      wx,
      isGk: false,
      qz_num: { red: 0, white: 0, rw: 0, wr: 0 },
      logoshow: false
    };
  },
  mounted() {
    !this.blList.length && this.fetchBlList();
    !this.flagList.length && this.fetchFlagList();
  },
  computed: {
    ...mapState({
      blList: state => state.blList,
      flagList: state => state.flagList
    })
  },
  watch: {
    isGk(n, o) {
      this.NYJJMap();
    },
    flagList(n) {
      this.fixFlagData();
    }
  },
  methods: {
    ...mapActions(["fetchBlList", "fetchFlagList"]),
    fixFlagData() {
      const qz_num = { red: 0, white: 0, rw: 0, wr: 0 };
      this.flagList.map(item => {
        parseInt(item.hbqqk) ? (qz_num.white += 1) : (qz_num.red += 1);
        parseInt(item.hqzbq) && (qz_num.rw += 1);
        parseInt(item.bqzhq) && (qz_num.wr += 1);
      });
      this.qz_num = qz_num;
    },
    goPage(index) {
      index > 2 && alert("建设中，敬请期待！");
      index < 3 && (this.current = index);
    },
    showLogo() {
      this.logoshow = true;
      this.timeOut();
    },
    timeOut() {
      const that = this;
      setTimeout(function() {
        that.logoshow = false;
      }, 3000);
    },
    gkChange() {
      this.$router.push({
        path: "/MobileGK"
      });
    }
  }
};
</script>

<style scoped  lang="less">
@bg: rgba(7, 39, 80, 1);
@MaxHeight: 36px;
@MaxWidth: 100%;
.box(@size:border-box) {
  box-sizing: @size;
}
.toFather() {
  width: 100%;
  height: 100%;
}
.topLine(@height:100%,@block:inline-block) {
  display: @block;
  vertical-align: top;
  height: @height;
  line-height: @height;
  text-align: center;
}

.map {
  height: 100%;
  background-image: url("./img/bg.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  .isGk {
    position: fixed;
    top: 79px;
    left: 19px;
    color: #fff;
    height: 27px;
    font-size: 14px;
    line-height: 30px;
    border-radius: 6px;
    border: 1px #30aaff solid;
    padding: 0 6px;
    z-index: 2;
  }
  .isGkActive {
    background-color: rgba(48, 170, 273, 0.6);
  }
  .kind {
    position: fixed;
    bottom: 60px;
    height: @MaxHeight;
    padding: 10px;
    width: 100%;
    box-sizing: border-box;
    font-size: 12px;
    > div {
      .topLine(@MaxHeight);
      width: 70px;
      position: relative;
      margin: 0 2px;
    }
    > div:before {
      content: "";
      display: block;
      width: 70px;
      height: 4px;
      position: absolute;
      top: 0;
    }
    .t1:before {
      background-color: rgb(247, 39, 38);
    }
    .t2:before {
      background-color: rgb(255, 145, 47);
    }
    .t3:before {
      background-color: rgb(255, 242, 172);
    }
    .t4:before {
      background-color: rgb(255, 255, 255);
    }
  }
  .app_header {
    position: fixed;
    top: 20px;
    height: @MaxHeight;
    padding: 4px;
    background: rgba(0, 0, 0, 0);
    box-sizing: border-box;
    > .app_toptab {
      .toFather();
      > li {
        .topLine(@MaxHeight);
        width: @MaxWidth / 4;
        .box();
        padding: 0 4px;
        opacity: 0.65;
        > span {
          .toFather();
          border-radius: 14px;
          background-color: rgb(48, 170, 237);
          font-size: 12px;
          font-weight: 700;
          display: block;
          color: rgb(255, 255, 255);
          cursor: pointer;
          > * {
            display: inline-block;
            height: 14px;
            line-height: 20px;
            vertical-align: middle;
            font-style: normal;
          }
          i {
            margin-left: 2px;
          }
        }
      }
      .top_active {
        opacity: 1 !important;
      }
    }
  }
  .title {
    position: absolute;
    width: 100%;
    text-align: center;
    top: 30px;
    z-index: 3;
    span {
      font-size: 24px;
      font-weight: bolder;
      background-image: -webkit-gradient(
        linear,
        0 0,
        0 bottom,
        from(#5ef2f5),
        to(#0b3cca)
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
  .sjlz {
    position: absolute;
    width: 100%;
    text-align: center;
    bottom: 5%;
    font-size: 12px;
  }
  .qz {
    position: absolute;
    bottom: 13%;
    width: 100%;
    // height: 135px;
    box-sizing: border-box;
    z-index: 2;
    p {
      font-weight: bold;
      width: 105px;
      font-size: 12px;
    }
    .qz_num {
      width: 100%;
      box-sizing: border-box;
      padding: 10px;
      ul {
        list-style: none;
        border-radius: 13px;
        border: 1px solid #191682;
        background-color: #171573;
        padding: 5px;
        li {
          display: flex;
          flex-direction: row;
          width: 100%;
          div {
            img {
              width: 12px;
              padding-right: 7px;
            }
            span {
              font-size: 12px;
              font-weight: bold;
            }
          }
        }
      }
    }
  }
  .bottom {
    position: absolute;
    width: 100%;
    text-align: center;
    bottom: 2%;
    z-index: 2;
    .tips {
      width: 313px;
      font-size: 14px;
    }
    p {
      color: #fff;
      font-size: 12px;
      font-weight: bolder;
      margin: 0;
      display: inline-block;
      width: 152px;

      .text {
        color: #a7ecf7;
      }

      .time {
        color: #f3f998;
      }
    }
    .float {
      position: relative;
      right: -53%;
      width: 126px;
      display: block;
      background-color: blue;
      box-sizing: border-box;
      padding: 5px;
      border-radius: 10px;
      span {
        font-size: 12px;
      }
    }
    img {
      font-size: 12px;
      width: 12px;
      position: relative;
      top: 2px;
    }
  }

  .bottom-right {
    position: absolute;
    left: 28%;
    bottom: 2%;
    // bottom: 2%;
    // margin: 0 72px;

    p {
      color: #fff;
      font-size: 13px;
      margin: 0;
    }
  }
}
</style>