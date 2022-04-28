<template>
  <!-- 通讯录主体 -->
  <div class="body">
    <!-- list -->
    <!-- 左侧联系人列表 -->
    <div class="group">
      <!-- 列表搜索栏 -->
      <grouptop @showResult="result"></grouptop>
      <div v-if="search" class="gul" onselectstart="return false;">
        <!-- 方案二
<el-collapse v-model="activeNames" @change="handleChange">
  <el-collapse-item title="群聊" name="1">
      
  </el-collapse-item>
  <el-collapse-item title="联系人" name="2">
    
  </el-collapse-item> -->
        <!-- </el-collapse> -->
        <!-- 用户 -->
        <div>
          <p>用户</p>
          <!-- -->
          <ul>
            <li
              v-for="g in me"
              @click="selects(g)"
              :style="
                select !== null && g.Id === select.Id
                  ? 'background-color: #eee;'
                  : ''
              "
            >
              <div class="groupul" @contextmenu="menu(1, g.Id)">
                <!-- 头像 -->
                <div class="img">
                  <img :src="g.img" width="48" height="48" />
                </div>
                <!-- 内容 -->
                <div class="username">
                  {{ g.name }}
                </div>
              </div>
            </li>
          </ul>
        </div>
        <!-- 群聊 -->
        <div>
          <p>群聊</p>
          <ul>
            <li
              v-for="g in groups"
              @click="selects(g)"
              :style="
                select !== null && g.Id === select.Id
                  ? 'background-color: #eee;'
                  : ''
              "
            >
              <div class="groupul" @contextmenu="menu(1, g.Id)">
                <!-- 头像 -->
                <div class="img">
                  <img :src="g.img" width="48" height="48" />
                </div>
                <!-- 内容 -->
                <div class="username">
                  {{ g.name }}
                </div>
              </div>
            </li>
          </ul>
        </div>
        <!-- 联系人 -->
        <div>
          <p>联系人</p>
          <ul>
            <li
              v-for="g in users"
              @click="selects(g)"
              :style="
                select !== null && g.Id === select.Id
                  ? 'background-color: #eee;'
                  : ''
              "
            >
              <div class="groupul" @contextmenu="menu(1, g.Id)">
                <!-- 头像 -->
                <div class="img">
                  <img :src="g.img" width="48" height="48" />
                </div>
                <!-- 内容 -->
                <div class="username">
                  {{ g.name }}
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 搜索面板 -->
      <div v-else class="gsearch">
           <!-- 搜索面板 -->
      </div>
    </div>
    <!-- 会话窗口 -->
    <div class="content">
      <!-- 删除功能以v-show判断id隐藏 -->

      <detail :detail="select" @send="send"></detail>

      <!-- 方案二 -->
      <!-- <el-card class="box-card">
        <img :src="select.img" width="48" height="48" />
        <div class="chattop">{{ select.name }}</div>
      </el-card> -->
    </div>
  </div>
</template>

<script>
// 右键菜单事件
window.addEventListener("contextmenu", function (e) {
  e.preventDefault();
  //   console.log(e)
});
// 导入右键菜单
import menu from "../../../../common/rightClick";
import detail from "./detail.vue";
import grouptop from "../../../../common/grouptop.vue";
export default {
  components: { grouptop, detail },
  data() {
    return {
      search: 1,
      select: null,
      endselectId: null,
      hidden: 1,
      me: [
        {
          img: require("../../../assets/tx.png"),
          name: "Admin",
          Id: 0,
          info:{
            tel:"123456",
            add:"北京市",
          },
        },
      ],
      groups: [
        {
          img: require("../../../assets/tx.png"),
          name: "王力宏",
          Id: 1,
          number: 4,
          member: [
            {
              img: require("../../../assets/tx.png"),
              name: "王力宏1王力宏王力宏王力宏王力宏王力宏王力宏王力宏",
              groupId: 1,
            },
            {
              img: require("../../../assets/tx.png"),
              name: "王力宏2",
              groupId: 1,
            },
            {
              img: require("../../../assets/tx.png"),
              name: "王力宏2",
              groupId: 1,
            },
          ],
        },
        {
          img: require("../../../assets/tx.png"),
          name: "陈2️⃣发",
          Id: 2,
          number: 8,
        },
        {
          img: require("../../../assets/tx.png"),
          name: "陈3️⃣发富强民主和平自由公正法治",
          Id: 3,
          number: 9,
        },
        {
          img: require("../../../assets/tx.png"),
          name: "陈絲发",
          Id: 4,
          number: 4,
        },
      ],
      users: [
        {
          img: require("../../../assets/tx.png"),
          name: "999999999999999999999999999999999999999",
          Id: 5,
           info:{
            tel:"3256",
            add:"厦市",
          },
        },
        {
          img: require("../../../assets/tx.png"),
          name: "陈一发陈一发陈一发陈一发陈一发陈一发陈一发陈一发陈一发陈一发陈一发陈一发",
          Id: 6, 
           info:{
            tel:"3453556",
            add:"广州市",
          },
        },
        {
          img: require("../../../assets/tx.png"),
          name: "陈一发",
          Id: 7,
        },
        {
          img: require("../../../assets/tx.png"),
          name: "陈一发",
          Id: 8,
        },
      ],
    };
  },
    activated(){ 
      this.$nextTick(()=>{   
          this.todetail();                
      })
  },
  mounted() {
    //   默认界面
    this.selects(this.me[0]);
  },
  beforeDestroy() {
    //  this.select=s
  },
  methods: {
    //跳转到个人详情
    todetail(){
          if(this.$route.query.id == '000')return this.selects(this.me[0]); 
    },
    // 接收子组件参数  跳转到会话
    send(id) {
      this.$router.push({ path: "/sdcs", query: { id } });
    },
    selects(s) {
      //   console.log(s);

      (this.select = s), (this.hidden = s.Id);
      console.log(this.select);
    },
    // 右键删除
    del(e) {
      if (e !== 0) {
        this.groups.splice(
          this.groups.findIndex((item) => item.groupId === e),
          1
        );
        console.log("被父元素获取的e：" + e);
        // const chats = document.getElementsByClassName("chatmain")
        // chats.parentNode.removeChild(chats)
        // this.selects(null)
        this.hidden = 0;
      }
    },
    // 搜索面板
    result(e) {
      this.search = e;
    },
    menu,
  },
  watch: {},
};
</script>

<style scoped>
.body {
  height: 100%;
}
.group {
  padding: 80px 0 0;
  box-sizing: border-box;
  width: 380px;
  /* z-index: 999; */
  /* display: inline-block; */
  height: 100%;
  position: fixed;
  top: 0;
  /* left: 0;  */
  left: 100px;
  border-right: 1px solid #ddd;
  background-color: #f7f7f7;
  overflow: hidden;
}

.group .gul {
  height: 100%;

  overflow-y: hidden;
}
.group .gul p {
  border-top: solid 1px #ddd;
  padding: 15px 0 5px 20px;
  margin: 0 0px;
  color: #a3a3a3;
}
.group .gsearch {
  /* display: inline-block; */
  /* z-index: 889; */
  height: 100%;
  width: 100%;
  /* background-color: pink; */

  overflow-y: overlay;
}
.group .gul:hover {
  overflow-y: overlay;
}
.group ul {
  width: 100%;
  /* height: 100%; */
  padding: 0;
  margin: 0 0;
  background-color: #f7f7f7;
}
.group li {
  color: rgb(153, 153, 153);
  /* padding: 5px 10px; */
  list-style-type: none;
  /* width: 600px; */
}
.groupul {
  /* width: 200px; */
  height: 75px;
  font-size: small;
  position: relative;
}
.img {
  padding: 15px 0 15px 19px;
}
.username {
  /* display: block; */
  width: 270px;
  position: absolute;
  left: 80px;
  top: 32px;
  font-size: 18px;
  color: #000;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.content {
  /* display: inline-block;  */
  /* left: 440px; */
  padding-left: 380px;
  position: relative;
  height: 100%;
  /* height: 1024px; */
  background-color: #f3f3f3;
}

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
