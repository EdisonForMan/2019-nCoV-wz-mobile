<template>
  <label role="checkbox" :class="['switch', { toggled }]">
    <input type="checkbox"
           class="switch-input"
           @change="toggle"/>
    <div class="switch-core"
         :style="{backgroundColor: toggled ? colorChecked  : colorUnchecked}">
      <div class="switch-button"
           :style="{transition: `transform ${speed}ms`,
           transform: toggled ? null: `translate3d(32px, 0px, 0px)`}">
      </div>
    </div>
    <span class="switch-label label-right"
          v-if="toggled"
          v-html="labelChecked">
     </span>
    <span class="switch-label label-left"
          v-html="labelUnchecked" v-else>
    </span>
  </label>
 
</template>
 
<script>
  export default {
    name: 'ToggleSwitch',
    data () {
      return {
        toggled: true,
        colorChecked: '#25b9e9',
        colorUnchecked: '#db572e',
        labelChecked: '开',
        labelUnchecked: '关',
        speed:100
      }
    },
    props: {},
    methods: {
      toggle (event) {
        this.toggled = !this.toggled
        this.$emit('change', this.toggled)
      }
    }
  }
</script>
 
<style lang="less" scoped>
  .switch {
    display: inline-block;
    position: relative;
    overflow: hidden;
    vertical-align: middle;
    user-select: none;
    font-size: 10px;
    cursor: pointer;
 
    .switch-input {
      display: none;
    }
 
    .switch-label {
      position: absolute;
      top: 0;
      font-weight: 600;
      color: white;
 
      z-index: 2;
 
      &.label-left {
        left: 10px;
        line-height: 24px;
        border-top-left-radius: 2px;
        border-bottom-left-radius:2px;
      }
 
      &.label-right {
        right: 12px;
        line-height: 24px;
        border-top-right-radius: 2px;
        border-bottom-right-radius:2px;
      }
    }
 
    .switch-core {
      display: block;
      position: relative;
      box-sizing: border-box;
      outline: 0;
      margin: 0;
      transition: border-color .3s, background-color .3s;
      user-select: none;
      width: 52px;
      height: 20px;
      border-radius: 10px;
      line-height: 20px;
 
      .switch-button {
        width: 20px;
        height: 20px;
        display: block;
        position: absolute;
        overflow: hidden;
        top: 0;
        left: 0;
        z-index: 3;
        border-radius: 50%;
        transform: translate3d(0, 0, 0);
        background-color: #ecf0f5;
      }
    }
  }
</style>