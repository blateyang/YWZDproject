<template>
  <div class="body body-blur">
    <!-- 背景模糊 -->
    <div class="bg">
      <img :src="img" alt="" />
    </div>
    <!-- 顶部菜单 -->
    <div class="tbtn">
      <i class="iconfont icon-zuixiaohua" @click="handleMin" title="最小化"></i>
      <!-- <i class="iconfont icon-zuidahuaxi"></i> -->
      <i class="iconfont icon-guanbixi" @click="close" title="关闭"></i>
    </div>
    <img :src="img" width="150" height="150" />
    <div class="name">{{ name }}</div>
    <div v-if="status == '1'" class="time">{{ time }}</div>
    <div v-else class="time">
      <div>正在等待对方接受邀请</div>
      <span class="dot dot1"></span>
      <span class="dot"></span>
      <span class="dot"></span>
    </div>
    <!-- 底部按钮 -->
    <div class="bbtn">
      <div v-if="status == '1'">
        <div id="mute" @click="mute">
          <div v-if="muteStatus == '1'"style="color:black">
           <i class="iconfont icon-voice-s" style="font-size: 22px"></i>
            <span>静音</span>
          </div>
          <div v-else>
            <i class="iconfont icon-jingyin" style="font-size: 16px;color:black"></i>
            <span>取消静音</span>
          </div>
        </div>
        <div class="close" @click="close">
          <i class="iconfont icon-guaduan"></i>
          <span>挂断</span>
        </div>
      </div>
      <div v-else>
        <div class="cancel" @click="close">
          <i class="iconfont icon-guaduan"></i>
          <span>取消</span>
        </div>
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
    return {
      name: "",
      status: 0,
      time: "03:35",
      img: "",
      muteStatus:1,
    };
  },

  components: {},
  beforeCreate() {
    remote.getCurrentWebContents().closeDevTools();
    remote.getCurrentWindow().setContentSize(360, 600);
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
    //     handleMax() {
    //       if (this.isMax) {
    //         remote.getCurrentWindow().unmaximize();
    //         this.isMax = false;
    //       } else {
    //         remote.getCurrentWindow().maximize();
    //         this.isMax = true;
    //       }
    //     },
    mute(){
      this.muteStatus = !this.muteStatus
      let mut = document.getElementById("mute")
      if(!this.muteStatus){
        mut.style.backgroundColor="white"     
        }else{
       mut.style.backgroundColor="#5f5554"
      }
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
  /* background-color: rgb(212, 145, 155); */
  width: 100%;
  height: 600px;
  -webkit-user-select: none;
  user-select: none;
}
.dot {
  height: 7px;
  width: 7px;
  display: inline-block;
  border-radius: 50%;
  background-color: rgb(255, 255, 255);
  opacity: 0.5;
  margin: 6px 4px;
}
.dot1 {
  opacity: 0.8;
  background-color: rgb(255, 255, 255);
  animation: dotting 1.5s infinite step-start;
}
@keyframes dotting {
  35% {
    box-shadow: 19px 0 0 rgb(255, 255, 255);
  }
  70% {
    box-shadow: 38px 0 0 rgb(255, 255, 255);
  }
  85% {
    opacity: 0.6;
  }
}
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
.bg img {
  /* 图片居中对齐，加上盒子的长度再位移自身一半 */
  padding-left: 360px;
  transform: translate(-50%, -50%);
  padding-top: 600px;
  /* width:200%; */
  height: 130%;
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
  color: #fff;
}
.tbtn .iconfont {
  font-size: 14px;
  margin-right: 14px;
}
.tbtn i:hover {
  color: #ff6565;
  font-weight: 800;
}

img {
  display: block;
  /* width: 150px; */
  margin: 0 auto;
  padding-top: 120px;
}
.name {
  color: #fff;
  width: 80vw;
  margin: 20px auto;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.time {
  color: #fff;
  margin-top: 5px;
  width: 100%;
  text-align: center;
}
.bbtn {
  display: block;
  width: 150px;
  margin: 120px auto;
  position: relative;
}
#mute {
  -webkit-app-region: no-drag;
  display: inline-block;
  position: absolute;
  left: 1px;
  background-color: #5f5554;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  text-align: center;
  cursor: pointer;
  line-height: 40px;
}

.close {
  -webkit-app-region: no-drag;
  display: inline-block;
  position: absolute;
  right: 1px;
  background-color: #ff6565;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  text-align: center;
  cursor: pointer;
  line-height: 40px;
}
.cancel {
  -webkit-app-region: no-drag;
  display: inline-block;
  position: absolute;
  right: 55px;
  top: -25px;
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
  text-align: center;
  width: 60px;
  transform: translateX(-10px);
  /* padding-top: 30px; */
  font-size: 12px;
  color: #fff;
  line-height: 30px;
}
</style>