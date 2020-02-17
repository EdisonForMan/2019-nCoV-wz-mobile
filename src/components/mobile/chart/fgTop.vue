<template>
  <div class="qz">
    <div class="qz_num">
      <ul>
        <li>
          <img :src="person" alt />
          <p>
            提交复工申请企业数总数
            <span style="color:#ffbf13">{{num}}</span> 家
          </p>
        </li>
        <li>
          <img :src="person" alt />
          <p>
            通过复工申请企业数总数
            <span style="color:#00cc6e">{{num}}</span> 家
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      fgxz: require("./img/fgxz.png"),
      person: require("../img/fgtop.png")
    };
  },
  props: ["num", "title"]
};
</script>

<style  lang="less" scoped>
.qz {
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 12px;
  p {
    color: #fff;
    font-size: 12px;
    padding-left: 5px;
    display: inline-block;
    span {
      color: #ff4242;
      font-size: 14px;
      font-weight: bold;
    }
  }
  .qz_num {
    width: 100%;
    box-sizing: border-box;
    padding: 0px 10px;
    ul {
      list-style: none;
      background-image: linear-gradient(to right, #15005b, #4855d6, #15005b);
      padding: 8px;
      li {
        height: 23px;
        line-height: 23px;
        display: inline-block;
        text-align: center;
        * {
          display: inline-block;
          vertical-align: top;
        }
        img {
          height: 14px;
          margin-top: 4px;
        }
      }
    }
  }
}
</style>