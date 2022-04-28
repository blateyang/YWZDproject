<template>
  <div class="bar" onselectstart="return false;" >
    <!-- 头像 -->
    <img src="../../assets/tx.png" width="60" height="60" @click="userdetail" title="个人详情"/>
    <!-- 菜单 -->
    <div style="margin-top: 20px">
      <div class="item" v-for="m in menus">
        <el-badge :value="m.value" :hidden="m.value === 0">
          <i
            :class="m.icon"
            @click="
              to(m.path);
              now = m.index;
            "
            :style="now === m.index ? 'color: rgb(77, 159, 255)' : ''"
          >
            <span>{{ m.name }}</span></i
          >
        </el-badge>
      </div>
    </div>
    <!-- 设置 -->
    <div class="option">
      <div
        id="op"
        class="iconfont icon-option-one"
        @click="show"
        :modal="false"
        tabindex="-1"
      >
        <div class="optionslist" style="display: none">
          <ul>
            <li>意见反馈</li>
            <li>备份与恢复</li>
            <li>设置</li>
            <li @click.stop="logoutDialog = true">退出账号</li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 退出弹窗 -->
    <el-dialog
      title="退出登录"
      :visible.sync="logoutDialog"
      width="360px"
      :center="false"
      :close-on-click-modal="false"
      append-to-body
    >
      <span>确认退出登录？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="logout">确 定</el-button>
        <el-button size="mini" @click="logoutDialog = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { remote, ipcRenderer } from "electron";
import Vue from "vue";
export default {
  name: "leftbar",
  data() {
    return {
      now: 2,//默认页面
      logoutDialog: false,
      menus: [
        {
          icon: "iconfont icon-xinicon_huabanfuben",
          path: "zdcs",
          value: 0, //角标
          name: "自动测试",
          index:1,
        },
        {
          icon: "iconfont icon-ceshi",
          path: "sdcs",
          value: 0,
          name: "手动测试",
           index:2,
        },
        {
          icon: "iconfont icon-tongxunlu",
          path: "txl",
          value: 0,
          name: "通讯录",
           index:3,
        },
        {
          icon: "iconfont icon-dingwei",
          path: "zdsb",
          value: 0,
          name: "终端设备",
           index:4,
        },
        {
          icon: "iconfont icon-icon_shujucaiji",
          path: "sjcj",
          value: 0,
          name: "数据采集",
           index:5,
        },
        {
          icon: "iconfont icon-yupanpinggu",
          path: "xnpg",
          value: 0,
          name: "效能评估",
           index:6,
        }
      ],
    };
  },
  methods: {
    //跳转到个人详情页
    userdetail(){
       this.$router.push({ path: "/txl", query: { id:'000' } });
       console.log("do it")
    },
    //展示子菜单
    show() {
      const opl = document.querySelector(".optionslist"); //子菜单列表
      const op = document.getElementById("op"); //菜单按钮
      switch (
        opl.style.display //切换隐藏
      ) {
        case "block":
          opl.style.display = "none";
          break;
        case "none":
          opl.style.display = "block";
          break;
      }
      op.onblur = function () {
        //失去焦点控制隐藏
        opl.style.display = "none";
      };
    },
    //跳转路由
    to(path) {
      if (path !== null && path !== undefined) {
        // console.log("=> /main/" + path);
        // this.$store.commit('setSelectSession', null)
        // this.$router.push(path);
        let id = this.keepdate(path)
        this.$router.push({ path, query: { id } });
      }

    },
    //保留页面数据
    keepdate(path){
      switch(path){
     case 'sdcs':
      return this.$store.state.Counter.id;
       break;
     default:  
     return 555;     
       break;
   }
    },
    //退出登陆
    logout() {
      ipcRenderer.send("login-window");
        ipcRenderer.send("dialogclose");
         // 删除草稿箱
    // let drafts = document.getElementsByTagName("textarea")
    // for(let i=0;i<drafts.length;i++){
    //   if(drafts[i].getAttribute('readonly')){
    //        drafts[i].remove()
    //   }
    // }

      this.$router.push("/");
      this.$message({
        message: "请重新登录",
        center: true,
      });
    
    mainWindow.on('closed', () => {
      mainWindow = null
      }) 

      localStorage.removeItem("dialogStatus");
    },
 
 },
 watch:{
   //监听路由地址
   $route(to,from){
      switch(to.path){
         case '/zdcs':
      return this.now=1;
       break;
     case '/sdcs':
      return this.now=2;
       break;
        case '/txl':
      return this.now=3;
       break;
          case '/zdsb':
      return this.now=4;
       break;
          case '/sjcj':
      return this.now=5;
       break;
          case '/xnpg':
      return this.now=6;
       break;
     default:  
     return 555;     
       break;
   }
  }
 },
};
</script>

<style  scoped>
.bar {
  /* float: left; */
  /* display:flex; */
  /* position: absolute; */
  text-align: center;
  height: 100%;
  width: 100px;
  padding: 30px 0;
  background-color: #21345c;
}
img {
  cursor: pointer;
}
.iconfont {
  float: left;
  margin: 0 10px;
  margin-top: 13px;
  font-size: 35px;
  color: #fff;
    cursor: pointer;
}
.iconfont > span {
  display: block;
  margin: 10px;
  font-size: 12px;
}
.option {
  position: fixed;
  bottom: 35px;
  left: 50px;
  transform: translateX(-50%);
}
.option > .iconfont {
  font-size: 25px;
  outline: none;
}
.optionslist {
  position: fixed;
  left: 74px;
  bottom: 0;
  width: 130px;
  background-color: #21345c;
}
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
li {
  color: rgba(255, 255, 255, 0.9);
  padding-left: 10px;
  text-align: left;
  font-size: 14px;
  height: 50px;
  line-height: 50px;
}

li:hover {
  background-color: #2f529c;
}
.bar  >>> .el-badge .el-badge__content {
  top:15px;
  right: 35px;
  border: 0;
}
</style>
<style>
.el-button {
  width: 80px;
}
</style>