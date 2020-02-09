<template>
  <div class="map">
    <div class="title">
      <span>温州市新冠肺炎防控作战地图</span>
      <!-- <p style="font-size: 12px;">（注：洞头区确诊病例数包含瓯江口产业集聚区）</p> -->
    </div>
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
    <div class="isGk isGkActive" @click="gkChange">管控力指标</div>
    <div class="kind">
      <div class="t1">一类区域</div>
      <div class="t2">二类区域</div>
      <div class="t3">三类区域</div>
      <div class="t4">四类区域</div>
    </div>
    <div class="bottom">
      <p>
        <span class="text">截至</span> 2020年 2月
        <span class="time">{{date}}</span>日
        <span class="time">24</span>时
      </p>
    </div>
    <fk v-if="current == 0" />
    <bl v-if="current == 1" />
  </div>
</template>

<script>
/* eslint-disable */

import bl from "./chart/bl";
import fk from "./chart/fk";
import wx from "weixin-js-sdk";
import axios from "axios";
import { date } from "./mapdata";

export default {
  name: "Mobile",
  components: { bl, fk },
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
      date,
      token: "",
      access_token: "",
      ticketString: "",
      nonceStr: "Wm3WZYTPz0wzccnC",
      timestamp: 1414587466,
      wx,
      isGk: false
    };
  },
  created() {
    this.getToken();
  },
  watch: {
    isGk(n, o) {
      this.NYJJMap();
    }
  },
  methods: {
    goPage(index) {
      index > 1 && alert("建设中");
      index < 2 && (this.current = index);
    },
    gkChange() {
      this.$router.push({
        path: "/MobileGK"
      });
    },
    //信用分后台认证
    getToken() {
      const that = this;
      $.ajax({
        url: "http://115.223.34.189:8099/xypt/zww/settoken",
        type: "Post",
        data: {
          idcard: "test",
          username: "syl",
          phoneum: "123456"
        },
        dataType: "json",
        success: function(data) {
          window.localStorage.setItem("token", data.responseText);
          that.getaccess();
        },
        error: function(data) {
          window.localStorage.setItem("token", data.responseText);
          that.getaccess();
        }
      });
    },
    //获取Access_Token
    getaccess() {
      const that = this;
      $.ajax({
        url: "http://115.223.34.189:8099/xypt/wx/getsign",
        type: "Post",
        data: {
          url: location.href.split("#")[0],
          token: window.localStorage.getItem("token")
        },
        dataType: "json",
        success: function(data) {
          const signature = data.signature;
          const noncestr = data.noncestr;
          const timestamp = data.timestamp;
          that.WXshare(signature, noncestr, timestamp);
        },
        error: function(data) {
          console.log(data);
        }
      });
    },
    WXshare(signature, noncestr, timestamp) {
      const that = this;
      this.wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来

        appId: "wx7eeb4eea87cf3ce6", // 必填，企业微信的corpID
        timestamp: timestamp, // 必填，生成签名的时间戳

        nonceStr: noncestr, // 必填，生成签名的随机串 必填，生成签名的随机串

        signature: signature, //
        jsApiList: ["updateAppMessageShareData"]
      });
      this.wx.ready(function() {
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        that.wx.updateAppMessageShareData({
          title: "温州市疫情分布动态地图", // 分享标题
          desc: "抗击疫情，我们在一起，温州加油！", // 分享描述
          link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: "", // 分享图标
          success: function() {
            // 设置成功
          }
        });
      });
      this.wx.error(function(res) {});
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
    bottom: 100px;
    right: 20px;
    color: #fff;
    height: 30px;
    line-height: 30px;
    border-radius: 6px;
    border: 1px rgb(48, 170, 273) solid;
    padding: 0 6px;
    background-color: rgba(48, 170, 273, 0.3);
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
    top: 80px;
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
          font-size: 14px;
          font-weight: 700;
          display: block;
          color: rgb(255, 255, 255);
          cursor: pointer;
          > * {
            display: inline-block;
            height: 20px;
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
  .bottom {
    position: absolute;
    width: 100%;
    text-align: center;
    bottom: 2%;
    .tips {
      width: 313px;
      font-size: 14px;
    }
    p {
      color: #fff;
      font-size: 20px;
      font-weight: bolder;
      margin: 0;

      .text {
        color: #a7ecf7;
      }

      .time {
        color: #f3f998;
      }
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