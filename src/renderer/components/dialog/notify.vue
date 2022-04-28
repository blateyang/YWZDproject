<template>
  <div class="body">
    <div class="top">
      通知
      <i class="iconfont icon-guanbixi" @click="close"></i>
    </div>
    <div class="content" @click="openMessage">
      <div>
        你收到<u>{{ message }}</u
        >条未读消息
      </div>
    </div>
  </div>
</template>

<script>
import { remote, ipcRenderer } from "electron";
export default {
  name: "notify",
  props: [""],
  data() {
    return {
      message: 6,
    };
  },

  components: {},

  beforeMount() {},

  mounted() {},

  methods: {
    openMessage() {
      ipcRenderer.send("toChat", 3);
      ipcRenderer.send("finish-notify");
    },
    close() {
      remote.getCurrentWindow().hide();
    },
  },
};
</script>
<style  scoped>
.body {
  width: 300px;
  height: 150px;
  overflow: hidden;
  -webkit-user-select: none;
  user-select: none;
}
.top {
  background-color: #21345c;
  height: 30px;
  color: #fff;
  line-height: 30px;
  padding: 0 10px;
}
.top i {
  float: right;
  cursor: pointer;
}
.top i:hover {
  color: rgb(209, 49, 49);
}
.content {
  cursor: pointer;
  font-size: 20px;
  width: 300px;
  height: 100%;
  line-height: 120px;
  padding: 0 10px;
}
.content u {
  color: rgb(209, 49, 49);
  font-size: 25px;
}
</style>