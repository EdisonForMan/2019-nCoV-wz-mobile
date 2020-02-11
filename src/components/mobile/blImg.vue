<template>
  <div class="xq">
    <div class="redFlag">
      <div class="head">
        <p>{{$route.query.name}}病例小区</p>
        <span @click="back()"><<&nbsp&nbsp返回</span>
      </div>
      <!--<span v-else style="font-size:10px;line-height:15px">表中病例信息来源“健康温州”公众号于2020年1月28日起至今公布的信息，且并无删减出院病例。</span> -->
    </div>
    <!-- <img :src="forceImg" style="width:100%;" /> -->
    <img
      style="width:100%;"
      :src="`${this.server}img/estate/${this.title}_${bl_imgtag}.png`"
      @error="errorImg()"
    />
    <img
    v-show="title == '乐清市'"
      style="width:100%;"
      :src="`${this.server}img/estate/${this.title}1.png`"
      @error="errorImg()"
    />
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
  </div>
</template>

<script>
import context from "./xq";
export default {
  name: "gk",
  data() {
    return {
      context,
      bl: [],
      xq: [],
      flagnum: [],
      title: "",
      forceImg: undefined,
      server: "https://lysb.lucheng.gov.cn/other/",
      bl_imgtag:10
    };
  },
  mounted() {
    this.forceImg = this[this.$route.query.name];
    this.xqxx();
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    xqxx() {
      var o;
      for (o in this.context) {
        if (this.$route.query.name == o) {
          this.bl = this.context[o].bl;
          this.xq = this.context[o].xq;
          this.flagnum = this.context[o].flag;
          this.title = o;
        }
      }
    }
  }
};
</script>

<style scoped  lang="less">
.xq {
  // display: flex;
  // flex-direction: column;
  box-sizing: border-box;
  height: 100%;
  background-image: url("./img/bg.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  overflow-y: auto;
  .Flagbl {
    ul {
      li {
        img {
          width: 20px;
          padding-right: 10px;
        }
      }
    }
  }
  .head {
    display: block;
    width: 100%;
    height: 50px;
    box-sizing: border-box;
    padding: 10px 20px;
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
    box-sizing: border-box;
    padding: 0 10px;
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