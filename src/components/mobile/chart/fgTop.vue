<template>
  <div class="qz">
    <div class="qz_num">
      <ul>
        <li>
          <img :src="person" alt />
          <p>
            累计返工人数
            <span>{{num}}</span> 万人
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
      person: require("./img/person.png")
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
    padding: 2px 0;
    font-size: 13px;
    padding-left: 5px;
    display: inline-block;
    margin-left: 4px;
    span {
      color: #ff4242;
      font-size: 18px;
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
        height: 30px;
        line-height: 30px;
        display: inline-block;
        text-align: center;
        * {
          display: inline-block;
          vertical-align: top;
        }
        img {
          height: 20px;
          margin-top: 5px;
        }
      }
    }
  }
}
</style>