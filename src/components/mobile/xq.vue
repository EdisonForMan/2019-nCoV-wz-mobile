<template>
  <div class="xq">
    <div class="redFlag">
      <div class="head">
        <p>
          {{this.title}}
          <span class="red">红</span>
          <span class="white">白</span>阵地分布图
        </p>
        <span @click="back()"><<&nbsp&nbsp返回</span>
      </div>
      <div class="xq_contain">
        <ul class="bl">
          <li v-for="(bitem,bindex) in bl" :key="bindex">
            <div>
              <span>{{bitem.label}}</span>
              <br />
              <span :style="{color:bitem.color}">{{bitem.value}}例</span>
            </div>
          </li>
        </ul>
        <div class="Flagbl" style="text-align: left;font-size: 16px;margin-bottom: 4px;">
          <ul style="list-style: none;">
            <li v-for="(fitem,findex) in flagnum" :key="findex">
              <div>
                <span>当前<span style="color:red;">红旗</span></span>
                <br />
                <span>{{fitem.red}}</span>
              </div>

              <div>
                <span>当前白旗</span>
                <br />
                <span>{{fitem.white}}</span>
              </div>
              <!-- <span class="flags" style="color:red;;">
                当前红旗
                <br />
                {{fitem.red}}
              </span>-->
              <!-- <span class="flags" style="float: right">
                当前白旗
                <br />
                {{fitem.white}}
              </span>-->
              <!-- <img src="./img/red.png" />
              <span style="padding-right: 10px">{{fitem.red}}</span>
              <img  style="padding-left: 10px" src="./img/white.png" />
              <span>{{fitem.white}}</span>-->
            </li>
          </ul>
          <!-- <span style="padding-right: 20px;">红：4</span>
          <span>白：21</span>-->
        </div>
        <div class="img" v-show="show" @click="imgShow()">
          <img :src="`${this.server}img/map/${this.title}.png`" @error="errorImg()" />
        </div>
      </div>
      <!-- <div class="head">
      <p>{{this.title}}疫情小报</p>
      </div>-->

      <p>病例信息</p>
      <ul class="xq1">
        <li v-for="(bitem,bindex) in xq" :key="bindex">
          <span>{{++bindex}}</span>
          <span>.{{bitem}}</span>
        </li>
      </ul>
      <div class="slipe">
        <span>
          下滑可查看更多
          <img src="./img/jt.png" style="position: relative;
    top: 5px;" />
        </span>
        <br />
        <span style="font-size:10px;line-height:15px">表中病例信息来源“健康温州”公众号于2020年1月28日起至今公布的信息，部分病例信息缺失。</span>
      </div>
      <!-- <span v-else style="font-size:10px;line-height:15px">表中病例信息来源“健康温州”公众号于2020年1月28日起至今公布的信息，且并无删减出院病例。</span> -->
    </div>
    <div class="footer">
      <p>
        <span class="text">截至</span> 2020年 2月
        <span class="time">{{date}}</span>日
        <span class="time">24</span>时
      </p>
      <span style="font-size: 13px;">温州设计集团勘测院&nbsp&nbsp&nbsp出品</span>
    </div>
    <bigimg v-if="showImg" @clickit="viewImg" :imgSrc="`${this.server}img/map/${this.title}.png`"></bigimg>
  </div>
</template>

<script>
/* eslint-disable */
import context from "./xq";
import { date } from "./mapdata";
import bigimg from "./bigImg";

export default {
  name: "sbDate",
  data() {
    return {
      bl: [],
      xq: [],
      flagnum: [],
      title: "",
      context,
      date,
      server: "https://lysb.lucheng.gov.cn/other/",
      show: true,
      showImg: false
    };
  },
  props: {},
  watch: {},
  created() {
    this.xqxx();
  },
  mounted() {},
  components: { bigimg },
  methods: {
    xqxx() {
      var o;
      for (o in this.context) {
        if (this.$route.query.label == o) {
          this.bl = this.context[o].bl;
          this.xq = this.context[o].xq;
          this.flagnum = this.context[o].flag;
          this.title = o;
          console.log(o);
        }
      }
    },
    errorImg() {
      this.show = false;
    },
    viewImg() {
      console.log(111);
      this.showImg = false;
    },
    imgShow() {
      this.showImg = true;
    },
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped  lang="less">
.xq {
  // display: flex;
  // flex-direction: column;
  box-sizing: border-box;
  padding: 15px;
  height: 100%;
  background-image: url("./img/bg.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  overflow-y: auto;
  .Flagbl {
    ul {
      li {
        div {
          background-color: #483088;
          width: 73px;
          height: 40px;
          border-radius: 5px;
          text-align: center;
          display: inline-block;
          span {
            font-size: 14px;
            color: #fff;
          }
        }

        div:nth-child(1) {
          float: right;
        }

        // img {
        //   width: 20px;
        //   padding-right: 10px;
        // }
        // .flags {
        //   display: inline-block;
        //   background-color: #483088;
        //   height: 30px;
        //   line-height: 30px;
        //   text-align: center;
        //   border-radius: 5px;
        //   padding: 0 8px;
        // }
        // .flags:last-child {
        //   margin-left: 10px;
        // }
      }
    }
  }
  .head {
    display: block;
    width: 100%;
    height: 30px;
    cursor: pointer;
    .red {
      float: unset !important;
      font-size: 20px !important;
      background-image: -webkit-gradient(
        linear,
        0 0,
        0 bottom,
        from(#f44336),
        to(#f44336)
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .white {
      float: unset !important;
      font-size: 20px !important;
      background-image: -webkit-gradient(
        linear,
        0 0,
        0 bottom,
        from(#fff),
        to(#fff)
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    p {
      float: left;
      text-align: left;
      font-size: 20px;
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
    span:nth-child(2) {
      float: right;
      font-size: 14px;
      color: #fff;
      line-height: 28px;
    }
  }
  .img {
    width: 100%;
    // height: 420px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .xq_contain {
    width: 100%;
    // display: flex;
    flex-direction: column;
    .bl {
      list-style: none;
      display: flex;
      justify-content: space-between;
      height: 60px;
      padding-top: 10px;
      li {
        background-color: #483088;
        width: 73px;
        height: 40px;
        border-radius: 5px;
        span {
          font-size: 14px;
          color: #fff;
        }
      }
    }
    p {
      font-size: 17px;
      color: #fff;
      text-align: left;
    }
    .xq1 {
      list-style: none;
      // display: flex;
      flex-direction: column;
      height: 500px;
      overflow: auto;
      li {
        width: 97%;
        border: 1px solid #4e5fd5;
        padding: 4px;
        line-height: 20px;
        margin-bottom: 10px;
        text-align: left;
        span {
          font-size: 12px;
          color: #fff;
        }
        span:nth-child(1) {
          color: rgb(9, 252, 255);
        }
      }
    }
  }
  .footer {
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
  .xq1 {
    list-style: none;
    // display: flex;
    flex-direction: column;
    height: 500px;
    overflow: auto;
    li {
      width: 97%;
      border: 1px solid #4e5fd5;
      padding: 4px;
      line-height: 20px;
      margin-bottom: 10px;
      text-align: left;
      span {
        font-size: 12px;
        color: #fff;
      }
      span:nth-child(1) {
        color: rgb(9, 252, 255);
      }
    }
  }
}
</style>