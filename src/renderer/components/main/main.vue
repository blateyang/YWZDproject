<template>
  <div class="main">
    <!-- 左侧导航栏 -->
    <leftbar style="position: fixed; top: 0; left: 0; z-index: 999"></leftbar>

    <!-- <div class="top"style="-webkit-app-region: drag;" >
      <!-- <title-main :title="$store.state.Session.selectSession"></title-main> -->
    <!-- <top></top>
    </div> 方案一：固定主体的top栏-->

    <!-- <topmenu></topmenu> 方案二：固定主体右上角的菜单按钮，绝对定位-->

    <div class="top" style="-webkit-app-region: drag; z-index: 1">
      <top></top>
    </div>
    <!-- 方案三：固定主体的top栏，绝对定位透明  -->

    <!-- 右侧主体内容 -->
    <keep-alive>
      <router-view style="margin-left: 100px" v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view style="margin-left: 100px" v-if="!$route.meta.keepAlive" />
  </div>
</template>

<script>
import { remote,ipcRenderer,ipcMain } from "electron";
const BrowserWindow = remote.BrowserWindow;
import leftbar from "./leftbar.vue";
import top from "./top.vue";
import topmenu from "./topmenu.vue";
// import SDCS from "../view/SDCS/sdcs.vue";SDCS,
const path = require("path");
var childWindow2 = null;
export default {
  name: "main",
  components: { leftbar, top, topmenu },
  methods: {

// #region 功能小窗 
//     dialogCenter() {
//       const childURL =
//         process.env.NODE_ENV === "development"
//           ? "http://localhost:9080" + "#/dialog"
//           : `file://${__dirname}/index.html#/dialog`;
//       //   // 判读是否已经存在子窗口 path.join("file://", __dirname, "../renderer/components/dialog/dialogCenter.vue");
//       //     if (childWindow) {
//       //       childWindow.hide();
//       //     } else {
//       //       childWindow = new BrowserWindow({
//       //         useContentSize: true,
//       //         		// modal: true,
//       //         height: 600,
//       //         width: 660,
//       //         resizable: true,
//       //         show: false,
//       //         frame: false,
//       //         // titleBarStyle:'hidden-inset',
//       //         // titleBarOverlay: true,
//       //         parent: remote.mainWindow,
//       //         webPreferences: {
//       //           webSecurity: false,
//       //         },
//       //       });

//       //       childWindow.loadURL(childURL);

//       // }

//       childWindow2 = new BrowserWindow({
//         useContentSize: true,
//         // modal: true,
//         height: 600,
//         width: 660,
//         resizable: false,//禁止改变主窗口大小，再设置大小就需要使用setContentSize
//         show: false,
//         frame: false,
//         // titleBarStyle:'hidden-inset',
//         // titleBarOverlay: true,
//         parent: remote.mainWindow,
//         webPreferences: {
//           webSecurity: false,
//         },
//       });

//       childWindow2.loadURL(childURL);
//      childWindow2.on('close', (e) => {
//         e.preventDefault();
//   childWindow2.hide()
// })
//       childWindow2.hookWindowMessage(278, function (e) {
//         childWindow2.setEnabled(false);
//         setTimeout(() => {
//           childWindow2.setEnabled(true);
//         }, 100);
//         return true;
//       });
//     },
//#endregion


  },
  beforeCreate() {
    // 调用主进程设置窗体
    // remote.getCurrentWindow().setSize(1440, 1024);
    remote.getCurrentWindow().setSize(1130, 870); //设置宽高

    remote.getCurrentWindow().setResizable(true); //设置是否允许改变宽高

    remote.getCurrentWindow().center(); //窗口居中
  },
  mounted() {
 remote.getGlobal("sharedObject").dialogStatus = 0
 remote.ipcMain.on("toChat",(event, arg) => {
    this.$router.push({ path: "/sdcs", query: { id:arg } });
    remote.getCurrentWindow().show()
})   
    // 挂载之后导航到指定页面
    this.$router.push("/sdcs");
    remote.getCurrentWindow().setMinimumSize(1130, 870); //设置最小宽高

    // this.dialogCenter();
 

    //禁止页面缩放
    // document.addEventListener('mousewheel', (ev) => {
    // if(ev.ctrlKey){
    // ev.preventDefault();
    // return false;
    // }
    // });
  },
  beforeDestroy() {
    childWindow2 = null;
    // this.$message({
    //   message: "已关闭子窗口",
    //   center: true,
    // });
       //删除草稿箱
    let drafts = document.getElementsByTagName("textarea");
    while (drafts.length > 0 && drafts[0].getAttribute("readonly") != null) {
      // console.log(drafts[0]);
      drafts[0].remove();
    }
  },
};
</script >

<style scoped>
.main {
  height: 100vh;
  position: relative;
  min-width: 700px;
  overflow-x: hidden;
}
.main >>> .group {
  -webkit-app-region: no-drag;
  z-index: 2;
}
.top {
  position: fixed;
  margin-left: 120px;
  width: 100%;
  height: 80px;
  line-height: 80px;
  background-color: rgba(0, 0, 0, 0);
  top: 0;
}
</style>