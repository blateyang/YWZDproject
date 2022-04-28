<template>
 <div  class="body">
       <!-- 左边选择框  @showResult="result"-->
      <div class="group">
        <grouptop></grouptop>
        <div class="gul" onselectstart="return false;">
          <el-checkbox-group v-model="checkList" @change="handleCheckedChange">
            <el-checkbox
              v-for="g in member"
              :label="g.id"
              :style="
                checkList !== null && checkList.includes(g.id)
                  ? 'background-color: #eee;'
                  : ''
              "
            >
              <div>
                <img :src="g.head" alt="" />
                <div class="memname">{{ g.name }}</div>
              </div>
            </el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <!-- 右边确定框 -->
      <div class="content">
        <div class="contenttop">发起群聊</div>
        <!-- 选择联系人 -->
        <div class="contentbox">
          <div v-for="a in checkList" class="select" >
            <img
              :src="
                member.find((item) => {
                  return item.id == a;
                }).head
              "
              alt=""
            />
            <p class="selectname">
              {{
                member.find((item) => {
                  return item.id == a;
                }).name
              }}
            </p>
            <div id="cancel" @click="cancel(a)">
              <i class="iconfont icon-guanbixi"></i>
            </div>
          </div>
        </div>
        <!-- 确认菜单 -->
        <div class="menu">
          <el-button class="cancel" icon="iconfont icon-quxiao" @click="close"
            >取消</el-button
          >
          <el-button
            type="primary"
            icon="iconfont icon-queren"
            @click="create"
            >确认</el-button
          >
        </div>
      </div>
 </div>
</template>

<script>
import { remote, ipcRenderer } from "electron";
import grouptop from "../../../common/grouptop";
 export default {
  name:'drcs',
  props:[''],
  data () {
   return {
         member: [
        {
          name: "林俊杰",
          head: require("../../assets/tx.png"),
          id: 1,
        },
        {
          name: "周杰伦",
          head: require("../../assets/tx2.jpg"),
          id: 3,
        },
        {
          name: "芬斯蒂芬斯蒂芬是否ddd",
          head: require("../../assets/tx.png"),
          id: 10,
        },
        {
          name: "芬斯蒂芬",
          head: require("../../assets/tx.png"),
          id: 11,
        },
        {
          name: "王力斯",
          head: require("../../assets/tx.png"),
          id: 12,
        },
        {
          name: "王宏斯",
          head: require("../../assets/tx.png"),
          id: 44,
        },
        {
          name: "王是否",
          head: require("../../assets/tx.png"),
          id: 14,
        },
      ],
       checkList: [],
   };
  },

  components: { grouptop, top },


  beforeMount() {
          remote.getCurrentWebContents().closeDevTools();
  },

  mounted() {},

  methods: {
       //选择联系人添加到数组
            handleCheckedChange(val) {
      // this.checkedList = val ? this.member.id : [];
      this.checkedList = val;
      console.log(val);
      // this.isIndeterminate = false;
    },
    // 取消选择某一个
    cancel(id) {
      for (var i = 0; i < this.checkList.length; i++) {
        // 严格比较，即类型与数值必须同时相等。
        if (this.checkList[i] === id) {
          this.checkList.splice(i, 1);
          break;
        }
      }
      // console.log(this.checkList)
    },
    //取消发起
    close() {
      remote.getCurrentWindow().hide();
      this.checkList = [];
    },
    //发起群聊
    create() {
            remote.getCurrentWindow().hide();
    },
  },


 }

</script>
<style  scoped>
.body {
  /* -webkit-app-region: drag; */
  /* background-color: #f7f7f7; */
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  /* height: 100vh; */
  -webkit-user-select: none;
  user-select: none;
}
/* 选择联系人界面 ———————————————————————— */
/* #region */
/* 左侧列表 */
.group {
  display: block;
  z-index: 2;
  padding: 80px 0 0;
  box-sizing: border-box;
  width: 320px;
  height: 100%;
  position: fixed;
  top: 0;
  border-right: 1px solid #ddd;
  background-color: #f7f7f7;
  overflow: hidden;
}
.group >>> .groupbody .gtop .el-input {
  width: 280px;
}
.group >>> .groupbody #cancel {
  left: 265px;
}
.group >>> .groupbody .gtopp {
  display: none;
}
/* 列表 */
.group .gul {
  height: 100%;
  overflow-y: hidden;
}
.group .gul:hover {
  overflow-y: overlay;
}
/* 多选框 */
.group .gul .el-checkbox {
  position: relative;
  line-height: 60px;
  height: 60px;
  margin: 0;
  width: 100%;
  cursor: pointer;
}
.group .gul .el-checkbox img {
  position: absolute;
  left: 45px;
  width: 40px;
  margin: auto;
  height: 40px;
  top: 50%;
  transform: translateY(-50%);
}
.group .gul .el-checkbox .memname {
  position: absolute;
  left: 95px;
  width: 200px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/* 选中的框框 */
.group >>> .el-checkbox__input .el-checkbox__inner {
  border-radius: 50%;
  margin-left: 20px;
  width: 16px;
  height: 16px;
  border: 1px solid rgb(100, 98, 98);
}
.group >>> .el-checkbox__input.is-checked .el-checkbox__inner {
  border: 1px solid #409eff;
}
/* 右侧确认框 */
.content {
  padding-left: 320px;
  position:relative;
  height: 100%;
  /* width: 100%; */
  box-sizing: border-box;
  /* overflow: hidden; */
  /* background-color: #f3f3f3; */
}
.content .contenttop {
  /* display: block; */
  box-sizing: border-box;
  margin: 0;
  /* float: left; */
  -webkit-app-region: drag;
  line-height: 80px;
  font-size: 20px;
  height: 80px;
  padding-left: 30px;
  width: 100%;
}
.contentbox {
  height: 70vh;
  width: 100%;
  padding: 5px 20px;
  box-sizing: border-box;
  /* margin: 5px 10px; */
  overflow: hidden;
}
.contentbox:hover {
  overflow: overlay;
}
.select {
  position: relative;
  float: left;
  text-align: center;
  margin: 10px 15px;
}
.select img {
  width: 60px;
}
.select .selectname {
  width: 80px;
  height: 20px;
  font-size: 15px;
  margin: 0;
  padding: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
#cancel {
  cursor: pointer;
  position: absolute;
  text-align: center;
  line-height: 14px;
  right: 0px;
  top: -9px;
  border-radius: 50%;
  color: #f7f7f7;
  height: 18px;
  width: 18px;
  background-color: #a3a3a3;
}
#cancel:hover {
  background-color: #ec3e3e;
}
#cancel i {
  font-size: 8px;
}
/* 菜单按钮 */
.menu {
  width: 255px;
  margin: 0 auto;
}
.el-button {
  width: 100px;
  height: 35px;
  padding: 0;
  margin: 0 13px;
}
.el-button >>> i {
  margin-right: 5px;
}
.cancel {
  background-color: #ccc;
  border: none;
  color: #409eff;
}
/* #endregion */
/* 滚动槽 */
::-webkit-scrollbar-track {
  /* border-radius: 10px; */
  background: transparent;
}
::-webkit-scrollbar {
  width: 8px;
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius: 8px;
  /* -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2); */
  background: rgba(58, 57, 54, 0.5);
}
</style>