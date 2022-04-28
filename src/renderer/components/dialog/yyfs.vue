<template>
  <div class="body body-blur">
    <!-- 顶部菜单 -->
    <div class="tbtn">
      <i class="iconfont icon-zuixiaohua" @click="handleMin"></i>
      <!-- <i class="iconfont icon-zuidahuaxi"></i> -->
      <i class="iconfont icon-guanbixi" @click="close"></i>
    </div>
    <!-- 居中图标 -->
    <div class="center">
      <div class="icon">
        <i class="iconfont icon-voice-s"></i>
      </div>
    </div>

    <!-- 底部按钮 -->
    <div class="bbtn">
      <div class="cancel">
        <i class="iconfont icon-guanbixi" @click="close"></i>
        <span>取消</span>
      </div>
      <div class="send" @click="close">
        <i class="iconfont icon-gouxuan"></i>
        <span>发送</span>
      </div>
    </div>
  </div>
</template>

<script>
import { remote, ipcRenderer } from "electron";
export default {
  name: "",
  props: [""],
  data() {
    return {};
  },

  components: {},

  beforeMount() {
    // remote.getCurrentWindow().setSize(280, 340);
    remote.getCurrentWindow().setContentSize(280, 340);
     remote.getCurrentWebContents().closeDevTools();
      // remote.getCurrentWindow().setResizable(false)
  },

  mounted() {},

  methods: {
    handleMin() {
      remote.getCurrentWindow().minimize();
    },
    close() {
      remote.getCurrentWindow().hide();
     remote.getGlobal("sharedObject").dialogStatus = 0
    },
  },
};
</script>
<style  scoped>
.body {
  -webkit-app-region: drag;
  background-color: #f7f7f7;
  width: 100%;
  height: 340px;
  -webkit-user-select: none;
  user-select: none;
}
.tbtn {
  -webkit-app-region: no-drag;
  position: fixed;
  top: 10px;
  right: 0px;
  text-align: right;
}
.tbtn i {
  cursor: pointer;
  color: #666666;
}
.tbtn .iconfont {
  font-size: 14px;
  margin-right: 14px;
}

.center {
  display: block;
  width: 150px;
  margin: 0 auto;
  padding: 50px 0 30px;
}
.icon {
  display: inline-block;
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
  background-color: #eee;
}
.icon .icon-voice-s {
  font-size: 110px;
  color: #07c15f;
}

/* 底部按钮 */
.bbtn {
  display: block;
  width: 150px;
  margin: 10px auto;
  position: relative;
}

.cancel {
  -webkit-app-region: no-drag;
  display: inline-block;
  position: absolute;
  left: 1px;
  background-color: #ff6565;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  text-align: center;
  cursor: pointer;
  line-height: 40px;
}

.send {
  -webkit-app-region: no-drag;
  display: inline-block;
  position: absolute;
  right: 1px;
  background-color: #07c15f;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  text-align: center;
  cursor: pointer;
  line-height: 40px;
}
.bbtn i {
  margin: 0 auto;
  color: #fff;
  font-size: 20px;
  width: 20px;
  height: 20px;
}

.bbtn span {
  display: block;
  /* padding-top: 30px; */
  font-size: 12px;
  color: #666666;
  line-height: 30px;
}
</style>