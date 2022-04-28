<template>
  <div class="body">
    <!-- 选择联系人  v-if="status == '0'"-->
    <div v-show="!status">
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
        <div class="contenttop">发起视频会议</div>
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
            @click="toMeeting"
            >确认</el-button
          >
        </div>
      </div>
    </div>
    <!-- 发起会议 v-else -->
    <div v-show="status">
      <!-- 顶部菜单 -->
      <div class="top">
        <div class="topTitle">视频会议</div>
        <top />
      </div>
      <!-- 视频区域 -->
      <div class="center">
        <div v-for="a in checkList" class="member">
          <div class="bg">
            <img
              :src="
                member.find((item) => {
                  return item.id == a;
                }).head
              "
              alt=""
            />
            <div class="loading">
              <span class="dot dot1"></span>
              <span class="dot"></span>
              <span class="dot"></span>
            </div>
          </div>
        </div>
      </div>
      <!-- 底部菜单 -->
      <div class="bottom">
        <div class="bottomTitle">
          <div v-if="memberStatus == '0'">等待接听</div>
          <div v-else>3:30</div>
        </div>
        <!-- 按钮 -->
        <div class="bbtn">
          <div class="add" @click="add">
            <i class="iconfont icon-jiahao"></i>
            <span>添加成员</span>
          </div>
          <div class="mute" @click="mute">
            <div v-if="muteStatus == '1'">
              <i class="iconfont icon-voice-s"></i>
              <span>静音</span>
            </div>
            <div v-else>
              <i
                class="iconfont icon-jingyin"
                style="font-size: 20px; color: black"
              ></i>
              <span>取消静音</span>
            </div>
          </div>
          <div class="close" @click="close">
            <i class="iconfont icon-guaduan"></i>
            <span>挂断</span>
          </div>
          <div class="camera" @click="camera">
            <div v-if="cameraStatus == '1'">
              <i class="iconfont icon-shexiangtou"></i>
              <span>关闭摄像头</span>
            </div>
            <div v-else>
              <i
                class="iconfont icon-guanbishexiangtou"
                style="font-size: 18px; color: black"
              ></i>
              <span>打开摄像头</span>
            </div>
          </div>
          <div class="setting">
            <i class="iconfont icon-shezhi"></i>
            <span>成员管理</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { remote, ipcRenderer } from "electron";
import grouptop from "../../../common/grouptop";
import top from "../main/top.vue";
export default {
  name: "",
  components: { grouptop, top },
  props: [""],
  data() {
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
      status: 0,
      memberStatus: 0,
      muteStatus: 1,
      cameraStatus: 1,
    };
  },

  beforeMount() {
    // remote.getCurrentWindow().setSize(700, 480);使用setSize会失效导致drag区域双击全屏
    remote.getCurrentWindow().setContentSize(700, 480);
    remote.getCurrentWebContents().closeDevTools();
    //  remote.getCurrentWindow().center();//窗口居中
  },

  mounted() {
    setTimeout(() => {
      this.memberStatus = 1;
    }, 3000);
  },

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
      this.status = 0;
      remote.getCurrentWindow().setContentSize(700, 480);
      remote.getGlobal("sharedObject").dialogStatus = 0
    },
    //发起会议
    toMeeting() {
      this.status = 1;
      remote.getCurrentWindow().setContentSize(880, 600);
      this.setSize();
    },
    //静音
    mute() {
      this.muteStatus = !this.muteStatus;
      let mut = document.getElementsByClassName("mute");
      if (!this.muteStatus) {
        mut[0].style.backgroundColor = "white";
      } else {
        mut[0].style.backgroundColor = "rgba(163, 160, 159, 0.5)";
      }
    },
    //摄像头
    camera() {
      this.cameraStatus = !this.cameraStatus;
      let cam = document.getElementsByClassName("camera");
      if (!this.cameraStatus) {
        cam[0].style.backgroundColor = "white";
      } else {
        cam[0].style.backgroundColor = "rgba(163, 160, 159, 0.5)";
      }
    },
    // 添加成员
    add() {
      this.status = 0;
      //  remote.getCurrentWindow().setContentSize(700, 480);
    },
    //设置视频成员盒子大小
    setSize() {
      switch (this.checkList.length) {
        case 2:
          return this.set("50%");
          break;
        case 3:
          return this.set("33.3%");
          break;
        case 4:
          return this.set("25%");
          break;
        default:
          return this.set("25%");
          break;
      }
    },
    set(x,y) {
      setTimeout(() => {
        let mem = document.getElementsByClassName("member");
        for (let i = 0; i < mem.length; i++) {
          mem[i].style.width = x;
          mem[i].style.height = y;
          console.log(mem[i])
        }
      }, 100);
    },
  },
  watch: {},
};
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
/* 视频会议界面 ———————————————————————— */
/* #region */
/* 顶部菜单 */
.top {
  -webkit-app-region: drag;
  width: 100%;
  height: 40px;
  line-height: 40px;
  color: #fff;
  background-color: #333;
  position: absolute;
  top: 0;
}
.topTitle {
  padding-left: 15px;
}
/* 视频区域 */
.center {
  width: 100%;
  position: absolute;
  top: 40px;
  bottom: 120px;
  background-color: #333;
  /* overflow-y: overlay; */
  overflow-y: scroll;
}
.member {
  width: 25%;
  /* flex: 1; 方案二*/
  /* max-height: calc(100% / 4); */
  float: left;
}
/* @media screen and (min-width : 1000px) { 
  .member {
    width: 20%;
  }
} */
.member img {
  width: 100%;
  /* height: 100%; */
  filter: blur(2px);
}
.bg {
  position: relative;
}
.loading {
  position: absolute;
  display: inline-block;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.dot {
  height: 10px;
  width: 10px;
  display: inline-block;
  border-radius: 50%;
  background-color: rgb(255, 255, 255);
  opacity: 0.5;
  margin: 6px 5px;
}
.dot1 {
  opacity: 0.8;
  background-color: rgb(255, 255, 255);
  animation: dotting 1.5s infinite step-start;
}
@keyframes dotting {
  35% {
    box-shadow: 23px 0 0 rgb(255, 255, 255);
  }
  70% {
    box-shadow: 48px 0 0 rgb(255, 255, 255);
  }
  85% {
    opacity: 0.6;
  }
}

/* 底部 */
.bottom {
  position: absolute;
  width: 100%;
  height: 120px;
  bottom: 0;
  background-color: #333;
  color: #fff;
  text-align: center;
  overflow: hidden;
}
.bottomTitle {
  width: 130px;
  height: 20px;
  margin: 10px auto;
  font-size: 15px;
}
/* .bbtn {
  /* width: 50vw; */
/* height: 100px;  
} */
.bbtn span {
  display: inline-block;
  font-size: 12px;
  width: 60px;
  transform: translate(-10px, -7px);
}
.bbtn i {
  font-size: 24px;
}
.add {
  float: left;
  margin: 0px 30px;
  background-color: rgba(163, 160, 159, 0.5);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  text-align: center;
  cursor: pointer;
  line-height: 40px;
}
.setting {
  float: right;
  margin: 0px 30px;
  background-color: rgba(163, 160, 159, 0.5);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  text-align: center;
  cursor: pointer;
  line-height: 40px;
}
.close {
  display: inline-block;
  background-color: #ff6565;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  text-align: center;
  cursor: pointer;
  line-height: 40px;
}
.mute {
  display: inline-block;
  background-color: rgba(163, 160, 159, 0.5);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  text-align: center;
  cursor: pointer;
  line-height: 40px;
  transform: translateX(-60px);
}
.camera {
  display: inline-block;
  background-color: rgba(163, 160, 159, 0.5);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  text-align: center;
  cursor: pointer;
  line-height: 40px;
  transform: translateX(60px);
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
