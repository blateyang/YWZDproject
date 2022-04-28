<template>
  
    <div class="btn">
      <div title="最小化"> <i class="iconfont icon-zuixiaohua" @click="handleMin"></i></div> 
       <div title="最大化"> <i class="iconfont icon-zuidahuaxi" @click="handleMax"></i></div> 
        <div title="关闭">  <i class="iconfont icon-guanbixi" @click="exit"></i></div>   
    </div>

</template>

<script>
import { remote } from "electron";

export default {
  name: "top",
  components: {},
  data() {
    return {
      isMax: false,
      isTop: false,
    };
  },
  methods: {
    exit() {
      //remote.app.quit()
      remote.getCurrentWindow().hide();
    },
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
  },
};
</script>

<style scoped>
/* body {
  -webkit-app-region: drag;
} */
.btn {
  -webkit-app-region: no-drag; 
  position: fixed;
  top: 0px;
  right: 0px;
  /* width: 100%; */
  text-align: right;
   user-select:none;
}
.btn div {
  display: inline-block;
}
.btn i {
cursor: pointer;
}
.iconfont {
    /* display: inline-block; */
     /* width: 15px; 
    height: 15px;  */
  font-size: 15px;
  margin-right: 20px;
}
.icon-guanbixi:hover {
  color: rgb(209, 49, 49);
  font-weight: 800;
}
</style>