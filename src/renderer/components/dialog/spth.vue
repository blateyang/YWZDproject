<template>
<!-- 背景 -->
  <div class="body body-blur">
    <div v-if="status=='0'">
         <div class="bg">
      <img :src="img" alt="" />
    </div> 
    </div>
    <div v-else>
      <div class="bg2"></div>
    </div>
  <!-- 顶部菜单 -->
    <div class="tbtn">
      <i class="iconfont icon-zuixiaohua" @click="handleMin"></i>
      <i v-show="status=='1'" class="iconfont icon-zuidahuaxi"@click="handleMax"></i>
      <i class="iconfont icon-guanbixi" @click="close"></i>
    </div>
    <!-- 等待/接通区域 -->
    <div v-if="status=='0'">
      <img :src="img" width="61" height="61" />
    <div class="name">{{ name }}</div>
    <template >
      <div class="time">正在等待对方接受邀请</span>
       <i class="el-icon-loading"></i>
      </div>
    </template>
    </div>
    <div v-else>
      <div class="me"></div>
    </div>
  
    <!-- 底部菜单按钮 -->
    <div v-if="status=='0'">
         <div class="bbtn">
        <div class="mute" @click="go">
        <i class="iconfont icon-yuyin1"></i>
        <span>切换语音通话</span>
      </div>
      <div class="close" @click="close">
        <i class="iconfont icon-guaduan"></i>
        <span>取消</span>
      </div>
    </div>
    </div>
    <div  v-else>
       <div class="time2">{{ time }}</div>
       <div class="bbtn2">
         <div id="camera" class="mute bmenu" @click="camera">
           <div v-if="cameraStatus=='1'">
               <i class="iconfont icon-shexiangtou"></i>
              <span>关闭摄像头</span>
           </div>
          <div v-else >
              <i class="iconfont icon-guanbishexiangtou" style="font-size:16px;color:black"></i>
              <span>打开摄像头</span>
          </div>
      </div>
      <div class="close bmenu" @click="close">
        <i class="iconfont icon-guaduan"></i>
        <span>挂断</span>
      </div>
        <div class="mute bmenu" @click="go">
        <i class="iconfont icon-yuyin1"></i>
        <span>切换语音通话</span>
      </div>
       </div>
    </div>
  </div>
</template>

<script>
import { remote, ipcRenderer } from "electron";
export default {
  name: "spth",
  props: [""],
  data() {
    return {
      name: "",
      time: "03:35",
      img: "",
      status: 0,
      cameraStatus:1,
    };
  },

  components: {},
  beforeCreate() {
    remote.getCurrentWebContents().closeDevTools();
    remote.getCurrentWindow().setContentSize(360, 600);
    // remote.getCurrentWindow().setSize(1440, 1024);
    // remote.getCurrentWindow().center();
    //    在挂载之前调用事件监听
    remote.ipcMain.once("yydata", (event, arg) => {
      this.name = arg.name;
      this.img = arg.img;
      console.log(arg.name);
      console.log("778");
    });
  },

  beforeMount() {},

  mounted() {
    setTimeout(() => {
      this.status = 1;
    }, 3000);
  },

  methods: {
    handleMin() {
      remote.getCurrentWindow().minimize();
    },
    handleMax() {
      if (this.isMax) {
        remote.getCurrentWindow().unmaximize();
        this.isMax = false;
      } else {
        remote.getCurrentWindow().maximize();
        this.isMax = true;
      }
    },
    camera() {    
      this.cameraStatus = !this.cameraStatus
      let cam = document.getElementById("camera")
      if(!this.cameraStatus){cam.style.backgroundColor="white"}else{cam.style.backgroundColor="#999"}
    },
    close() {
      remote.getCurrentWindow().hide();
      remote.getGlobal("sharedObject").dialogStatus = 0
    },
    go() {
      this.$router.push("/yyth");
      console.log("luyou" + this.$router);
    },
  },
};
</script>
<style  scoped>
.body {
  -webkit-app-region: drag;
  width: 100%;
  height: 600px;
  overflow: hidden;
  -webkit-user-select: none;
  user-select: none;
}
/* 背景 */
.bg {
  width: 360px;
  height: 600px; /**宽高100%是为了图片铺满屏幕 */
  z-index: -1;
  position: absolute;
  overflow: hidden;

  -webkit-filter: blur(10px); /**图层模糊 */
  -moz-filter: blur(15px);
  -o-filter: blur(15px);
  -ms-filter: blur(15px);
  filter: blur(15px);
}
.bg2 {
  width: 100%;
  height: 100%;
  z-index: -1;
  position: absolute;
  background-color: pink;
}
.bg img {
  /* 图片居中对齐，加上盒子的长度再位移自身一半 */
  padding-left: 360px;
  transform: translate(-50%, -50%);
  padding-top: 600px;
  /* width:200%; */
  height: 130%;
}
/* 顶部 */
.tbtn {
  -webkit-app-region: no-drag;
  position: fixed;
  top: 10px;
  right: 0px;
  text-align: right;
}
.tbtn i {
  cursor: pointer;
  color: #fff;
}
.tbtn i:hover {
  color: #ff6565;
  font-weight: 800;
}
.tbtn .iconfont {
  font-size: 14px;
  margin-right: 14px;
}
/* 中间 */
img {
  position: fixed;
  top: 15px;
  left: 12px;
  text-align: left;
}
.name {
  color: #fff;
  margin-top: 18px;
  margin-left: 90px;
  width: 50%;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.time {
  position: absolute;
  color: #fff;
  left: 90px;
  margin: 15px auto;
  text-align: center;
  font-size: 14px;
}
.me {
  position: fixed;
  top: 30px;
  left: 12px;
  width: 100px;
  height: 160px;
  background-color: #fff;
}
@media screen and (min-width: 1000px) {
  .me {
    width: 200px;
    height: 320px;
  }
}
/* 底部 */
.bbtn {
  width: 100%;
  margin: 60px auto;
  bottom: 0;
  position: absolute;
}
.mute {
  margin: 0px auto;
  -webkit-app-region: no-drag;
  display: block;
  background-color: #999;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  text-align: center;
  cursor: pointer;
  line-height: 40px;
  margin-bottom: 50px;
}
.close {
  -webkit-app-region: no-drag;
  display: block;
  margin: 0px auto;
  background-color: #ff6565;
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
  color: #fff;
  line-height: 30px;
  width: 130px;
  margin: 0 auto;
  transform: translateX(-50%);
  padding-left: 40px;
}
.time2 {
  position: absolute;
  color: #fff;
  width: 100px;
  left: 50%;
  transform: translate(-50%);
  margin: 20px auto;
  text-align: center;
  font-size: 15px;
  bottom: 100px;
}
.bbtn2 {
  width: 100%;
  height: 100px;
  line-height: 150px;
  text-align: center;
  margin: 0 auto;
  bottom: 0;
  position: absolute;
  background-color: rgba(59, 54, 53, 0.5);
  /* opacity: 0.7; */
}
.bmenu {
  display: inline-block;
  margin: 0 9vw;
}
.bbtn2 i {
  /* margin: 0 auto; */
  color: #fff;
  font-size: 20px;
  width: 20px;
  height: 20px;
}

.bbtn2 span {
  display: block;
  /* padding-top: 30px; */
  font-size: 12px;
  color: #fff;
  line-height: 30px;
  width: 130px;
  margin: 0 auto;
  transform: translateX(-50%);
  padding-left: 40px;
}
</style>