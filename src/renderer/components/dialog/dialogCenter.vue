<template>
  <div class="body body-blur">
    <!-- <div class="bg">
      <!-- <img :src="img" alt="" /> -
    </div> -->

    <div class="tbtn">
      <i class="iconfont icon-zuixiaohua" @click="handleMin"></i>
      <i class="iconfont icon-zuidahuaxi"></i>
      <i class="iconfont icon-guanbixi" @click="close"></i>
    </div>
      <div>
        <!-- <h1>
            弹窗中心
        </h1> -->
      <!-- <route-view   style="width: 300px;height:300px"/> -->
      </div>

    </div>
  </div>
</template>

<script>
import { remote, ipcRenderer } from "electron";
export default {
  name: "dialogCenter",

  props: [""],
  data() {
    return {
      name: "",
      time: "03:35",
      img: "",
    };
  },

  components: {},

  beforeCreate() {
    console.log("999");
    // remote.getCurrentWebContents().closeDevTools();
    //     remote.getCurrentWindow().setSize(1440, 1024);
    //     remote.getCurrentWindow().center();
    //    在挂载之前调用事件监听
  },

  beforeMount() {
    this.call();
  },

  mounted() {
    remote.ipcMain.on("yydata", (event, arg, arg2) => {
      console.log(arg);
      console.log(arg2);
      this.call(arg2);
      // this.name = arg.name;
      // this.img = arg.img;
      // console.log(arg.name);
      // console.log("778");
      // console.log(this.$route.query.type);
    });

    remote.ipcMain.on("dialogclose", (event) => {
      console.log("close");
      remote.getCurrentWindow().close();
    });
  },

  beforeUpdate() {},

  methods: {
    // call() {
    //   console.log("886" + this.$route.query.type);

    //   switch (this.$route.query.type) {
    //     case "1":
    //       this.$router.push("/yyth");
    //       break;
    //     case "2":
    //       this.$router.push("/spth");
    //       break;
    //     default:
    //       break;
    //   }
    // },

    call(arg2) {
      // console.log("886" + this.$route.query.type);

      switch (arg2) {
        case 1:
          this.$router.push("/yyth");
          remote.getCurrentWindow().show();
          break;
        case 2:
          this.$router.push("/spth");
          remote.getCurrentWindow().show();
          break;
        case 3:
          this.$router.push("/yyfs");
          remote.getCurrentWindow().show();
          break;
          case 4:
          this.$router.push("/sphy");
          remote.getCurrentWindow().show();
          break;
        default:
          break;
      }
    },

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
    close() {
      remote.getCurrentWindow().hide();
    },
    go() {
      this.$router.push({ path: "/spth" });
      console.log(this.$router);
      console.log(window.location.href);
    },
  },
};
</script>
<style  scoped>
.body {
  -webkit-app-region: drag;
  background-color: pink;
  width: 100%;
  height: 600px;
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
}
.tbtn .iconfont {
  font-size: 14px;
  margin-right: 14px;
}
img {
  display: block;
  /* width: 150px; */
  margin: 0 auto;
  padding-top: 120px;
}
.name {
  color: #fff;
  margin-top: 20px;
  width: 100%;
  text-align: center;
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
.mute {
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
}
</style>