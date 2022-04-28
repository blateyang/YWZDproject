<template>
  <!-- 列表搜索栏 -->
  <div class="groupbody">
    <div class="gtop">
      <el-input
        id="inp"
        placeholder="搜索"
        prefix-icon="el-icon-search"
        v-model="input"
        @click.native="search"
        @input="result($event)"
      ></el-input>

      <div class="gtopp" title="创建群聊" @click="showdrcs">
        <i class="el-icon-plus"></i>
      </div>
    </div>
    <div id="cancel" @click="cancel">
      <i class="iconfont icon-guanbixi"> </i>
    </div>
    <!-- <div>聊天列表</div> -->
  </div>
</template>

<script>
import { remote, ipcRenderer } from "electron";
export default {
  name: "grouptop",
  data() {
    return {
      input: "",
    };
  },
  methods: {
    // 点击事件  展示搜索层
    search() {
      // console.log("11");
      this.$emit("showResult", 0); //自定义事件  传递值“子向父组件传值” 
      let cal = document.getElementById("cancel");
      cal.style.display = "block";
    },
    // 取消点击   关闭搜索层
    cancel() {
      this.$emit("showResult", 1); 
      let cal = document.getElementById("cancel");
      cal.style.display = "none";
      let inp = document.getElementById("inp");
      inp.value = "";
    },
    // 搜索内容变化时触发
    result(e) {
      console.log(e);
    },
    //创建群聊窗口
    showdrcs(){
      ipcRenderer.send("showdrcs");
    },
  },
};
</script>

<style scoped>
.groupbody {
  margin: -80px 0 0;
  background-color: #f7f7f7;
}
.gtop {
  height: 80px;
  /* text-align: center; */
  padding: 0 20px;
  line-height: 80px;
}
.gtopp {
  display: inline-block;
  width: 23px;
  cursor: pointer;
}
.gtop >>> .el-input {
  width: 290px;
  height: 23px;
}
.gtop >>> .el-input__inner {
  border: none;
  background-color: #eee;
}
/* .el-icon-search::before {
    color: #000;
} */

.gtopp >>> .el-icon-plus {
  padding: 11px;
  margin: 10px;
  color: #a3a3a3;
  background-color: #eee;
}
.gtop >>> .gtopp :hover {
  background-color: rgb(223, 223, 223);
}
.el-input >>> input::-webkit-input-placeholder {
  color: #a3a3a3;
  font-weight: bold;
  font-size: 15px;
  padding-left: 4px;
}
.el-input /deep/ .el-icon-search::before {
  color: #a3a3a3;
  font-size: 18px;
}
#cancel {
  display: none;
  cursor: pointer;
  position: fixed;
  text-align: center;
  line-height: 25px;
  left: 380px;
  top: 27px;
  font-size: 12px;
  border-radius: 50%;
  color: #f7f7f7;
  height: 25px;
  width: 25px;
  background-color: #a3a3a3;
}
</style>
