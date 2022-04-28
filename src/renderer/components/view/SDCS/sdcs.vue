<template>
  <!-- 手动测试会话主体 -->
  <div class="body">
    <!-- list -->
    <!-- 左侧联系人列表 -->
    <div class="group">
      <!-- 列表搜索栏 -->
      <grouptop @showResult="result"></grouptop>

      <!-- 联系人列表    onselectstart="return false;"不能选中取消全选-->
      <div v-if="search" class="gul" onselectstart="return false;">
        <ul>
          <li
            v-for="g in groups"
            @click="selects(g)"
            :style="
              select !== null && g.groupId === select.groupId
                ? 'background-color: #eee;'
                : ''
            "
          >
            <list :group="g" :select="select" @deleteIndex="del"></list>
          </li>
        </ul>
      </div>
      <!-- 搜索面板 -->
      <div v-else class="gsearch"></div>
      <!--搜索面板 方案二 -->
      <!-- <div v-show="!search" style="display:none;" class="gsearch2"></div>    -->
    </div>

    <!-- 会话窗口 -->
    <div v-show="select.groupId" class="content">
      <!-- 删除功能以v-show判断id隐藏 -->
      <chat :chat="select" @send="send" v-show="hidden" ref="child"></chat>
    </div>
    <!-- <chat class="chat"></chat> -->
  </div>
</template>

<script>
// 右键菜单事件
window.addEventListener("contextmenu", function (e) {
  e.preventDefault();
  //   console.log(e)
});
import chat from "./chat.vue";
import grouptop from "../../../../common/grouptop.vue";
import list from "./list.vue";
import draft from "../../../../common/draft"; //草稿箱功能

export default {
  components: { grouptop, chat, list },
  data() {
    return {
      search: 1,
      select: { groupId: null },
      endselectId: null,
      hidden: 1,
      haha: require("../../../assets/tx.png"),
      groups: [
        {
          img: require("../../../assets/tx.png"),
          name: "陈一发",
          type: "group",
          msgs: [
            {
              isMe: true,
              content: "哈哈哈哈",
              time: 1650014801278,
              type: "text",
            },
            {
              isMe: true,
              content: {
                videosrc: "https://www.w3schools.com/html/movie.mp4",
                videoimg: "",
              },
              time: new Date().getTime(),
              type: "video",
            },
            {
              isMe: false,
              content: {
                videosrc:
                  "http://vfx.mtime.cn/Video/2021/07/10/mp4/210710095541348171.mp4",
                videoimg: "",
              },
              time: 1650072313,
              type: "video",
            },
          ],
          groupId: 1,
          unRead: 0,
        },
        {
          img: require("../../../assets/tx.png"),
          name: "王力宏",
          type: "group",
          msgs: [
            {
              isMe: false,
              content:
                "天王盖地虎,天王盖地虎天王盖地虎天王盖地虎天王盖地虎,天王盖地虎天王盖地虎",
              time: new Date().getTime(),
              type: "text",
            },
            {
              isMe: true,
              content: "文本",
              time: new Date().getTime(),
              type: "text",
            },
            {
              isMe: true,
              content: "文本",
              time: new Date().getTime(),
              type: "text",
            },
            {
              isMe: true,
              content: 27,
              time: new Date().getTime(),
              type: "voice",
            },
            {
              isMe: false,
              content: 10,
              time: new Date().getTime(),
              type: "voice",
            },
            {
              isMe: false,
              content: 4,
              time: new Date().getTime(),
              type: "voice",
            },
            {
              isMe: false,
              content: 2,
              time: new Date().getTime(),
              type: "voice",
            },
            {
              isMe: false,
              content: 60,
              time: new Date().getTime(),
              type: "voice",
            },
            {
              isMe: false,
              content: 80,
              time: new Date().getTime(),
              type: "voice",
            },
            {
              isMe: true,
              content: 180,
              time: new Date().getTime(),
              type: "voice",
            },
            {
              isMe: true,
              content: 120,
              time: new Date().getTime(),
              type: "voice",
            },
            {
              isMe: true,
              content: {
                fileName: "开会资料.pdf",
                fileSize: "2MB",
              },
              time: new Date().getTime(),
              type: "file",
            },
            {
              isMe: false,
              content: {
                fileName:
                  "开会文件开会文件开会文件开会文件开会文件开会文件.pdf",
                fileSize: "5MB",
              },
              time: new Date().getTime(),
              type: "file",
            },
            {
              isMe: false,
              content: {
                fileName:
                  "开会文件开会文件开会文件开会文件开会文件开会文件.pdf",
                fileSize: "5MB",
              },
              time: new Date().getTime(),
              type: "file",
            },
            {
              isMe: true,
              content: {
                imgsrc: require("../../../assets/tx.png"),
                // imgsrc:"https://fakeimg.pl/625x375/F44336/FFF/?font=noto&text=%E5%8D%A2%E5%85%88%E7%94%9F"
              },
              time: new Date().getTime(),
              type: "img",
            },
            {
              isMe: false,
              content: {
                // imgsrc:"https://picsum.photos/400/500?random=1",
                imgsrc: require("../../../assets/500.jpg"),
              },
              time: 1648779615,
              type: "img",
            },
          ],
          groupId: 2,
          unRead: 5,
        },
        {
          img: require("../../../assets/tx.png"),
          name: "工作群9999999999999999999999999999999",
          type: "group",
          msgs: [
            {
              isMe: false,
              name: "王力宏",
              head: require("../../../assets/tx.png"),
              content: "今天是部门培训会议，你什么时候过来吖",
              time: 1574741563000,
              type: "text",
            },
            {
              isMe: true,
              content: "我现在马上过来",
              time: 1649470815000,
              type: "text",
            },
            {
              isMe: false,
              name: "陈一发",
              content:
                "今天部门有一个非常重要的会议，领导也会出席，你什么时候过来吖",
              time: 1650025215,
              type: "text",
            },
            {
              isMe: false,
              name: "陈二发",
              content: 10,
              time: 1649989215,
              type: "voice",
            },
            {
              isMe: false,
              name: "火红的萨日朗",
              content: {
                fileName: "开会资料.pdf",
                fileSize: "2MB",
              },
              time: 1650039615,
              type: "file",
            },
            {
              isMe: false,
              name: "萨日朗",
              content: {
                imgsrc: require("../../../assets/tx.png"),
                // imgsrc:"https://fakeimg.pl/625x375/F44336/FFF/?font=noto&text=%E5%8D%A2%E5%85%88%E7%94%9F"
              },
              time: 1650075227,
              type: "img",
            },
          ],
          groupId: 3,
          unRead: 5,
        },
        {
          img: require("../../../assets/tx.png"),
          name: "王力宏今天是部门培训会议，你什么时候过来吖",
          type: "group",
          msgs: [
            {
              isMe: false,
              content: "今天是部门培训会议，你什么时候过来吖",
              time: "2022-04-14 19:00",
              type: "text",
            },
            {
              isMe: true,
              content: "我现在马上过来",
              time: "2021-04-14 11:00",
              type: "text",
            },
            {
              isMe: false,
              content:
                "今天部门有一个非常重要的会议，领导也会出席，你什么时候过来吖",
              time: "2021-04-15 11:00",
              type: "text",
            },
          ],
          groupId: 4,
          unRead: 5,
        },
        {
          img: require("../../../assets/tx.png"),
          name: "王力宏今天部门有一个非常重要的会议，领导也会出席，你什么时候过来吖",
          type: "group",
          msgs: [
            {
              isMe: false,
              content: "今天是部门培训会议，你什么时候过来吖",
              time: new Date().getTime(),
              type: "text",
            },
            {
              isMe: true,
              content: "我现在马上过来",
              time: new Date().getTime(),
              type: "text",
            },
            {
              isMe: false,
              content:
                "今天部门有一个非常重要的会议，领导也会出席，你什么时候过来吖",
              time: new Date().getTime(),
              type: "text",
            },
          ],
          groupId: 5,
          unRead: 5,
        },
        {
          img: require("../../../assets/tx.png"),
          name: "王力宏",
          type: "group",
          msgs: [
            {
              isMe: false,
              content: "今天是部门培训会议，你什么时候过来吖",
              time: new Date().getTime(),
              type: "text",
            },
            {
              isMe: true,
              content: "我现在马上过来",
              time: new Date().getTime(),
              type: "text",
            },
            {
              isMe: false,
              content:
                "今天部门有一个非常重要的会议，领导也会出席，你什么时候过来吖",
              time: new Date().getTime(),
              type: "text",
            },
          ],
          groupId: 6,
          unRead: 5,
        },
        {
          img: require("../../../assets/tx.png"),
          name: "王力宏",
          type: "group",
          msgs: [
            {
              isMe: false,
              content: "今天是部门培训会议，你什么时候过来吖",
              time: new Date().getTime(),
              type: "text",
            },
            {
              isMe: true,
              content: "我现在马上过来",
              time: new Date().getTime(),
              type: "text",
            },
            {
              isMe: false,
              content:
                "今天部门有一个非常重要的会议，领导也会出席，你什么时候过来吖",
              time: new Date().getTime(),
              type: "text",
            },
          ],
          groupId: 7,
          unRead: 5,
        },
        {
          img: require("../../../assets/tx.png"),
          name: "王力宏",
          type: "group",
          msgs: [
            {
              isMe: false,
              content: "今天是部门培训会议，你什么时候过来吖",
              time: new Date().getTime(),
              type: "text",
            },
            {
              isMe: true,
              content: "我现在马上过来",
              time: new Date().getTime(),
              type: "text",
            },
            {
              isMe: false,
              content:
                "今天部门有一个非常重要的会议，领导也会出席，你什么时候过来吖",
              time: new Date().getTime(),
              type: "text",
            },
          ],
          groupId: 8,
          unRead: 5,
        },
        {
          img: require("../../../assets/tx.png"),
          name: "王力宏",
          type: "group",
          msgs: [
            {
              isMe: false,
              content: "今天是部门培训会议，你什么时候过来吖",
              time: new Date().getTime(),
              type: "text",
            },
            {
              isMe: true,
              content: "我现在马上过来",
              time: new Date().getTime(),
              type: "text",
            },
            {
              isMe: false,
              content:
                "今天部门有一个非常重要的会议，领导也会出席，你什么时候过来吖",
              time: new Date().getTime(),
              type: "text",
            },
          ],
          groupId: 9,
          unRead: 5,
        },
        {
          img: require("../../../assets/tx.png"),
          name: "王力宏",
          type: "group",
          msgs: [
            {
              isMe: false,
              content: "今天是部门培训会议，你什么时候过来吖",
              time: new Date().getTime(),
              type: "text",
            },
            {
              isMe: true,
              content: "我现在马上过来",
              time: new Date().getTime(),
              type: "text",
            },
            {
              isMe: false,
              content:
                "今天部门有一个非常重要的会议，领导也会出席，你什么时候过来吖",
              time: new Date().getTime(),
              type: "text",
            },
          ],
          groupId: 10,
          unRead: 5,
        },
        {
          img: require("../../../assets/tx.png"),
          name: "王力宏55",
          msgs: [
            {
              isMe: false,
              content: "今天是部门培训会议，你什么时候过来吖6666",
              time: new Date().getTime(),
              type: "text",
            },
          ],
          groupId: 90,
          unRead: 5,
        },
        {
          img: require("../../../assets/tx.png"),
          name: "周铁轮((((((((((((((((((((((((((((((((((((((((((((9999999999999999999",
          msgs: [
            {
              isMe: false,
              content: "过来开会",
              time: new Date().getTime(),
              type: "text",
            },
            {
              isMe: true,
              content: "ok",
              time: new Date().getTime(),
              type: "text",
            },
          ],
          groupId: 11,
          type: "user",
          unRead: 3,
        },
        {
          img: require("../../../assets/tx.png"),
          name: "周铁轮",
          msgs: [
            {
              isMe: false,
              content: "打电话",
              time: new Date().getTime(),
              type: "text",
            },
            {
              isMe: true,
              content: 7 + '"',
              time: new Date().getTime(),
              type: "voice",
            },
          ],
          groupId: 12,
          type: "user",
          unRead: 2,
        },
        {
          img: require("../../../assets/tx.png"),
          name: "周铁轮",
          msgs: [
            {
              isMe: false,
              content: "打电话",
              time: new Date().getTime(),
              type: "text",
            },
            {
              isMe: true,
              content: 7 + '"',
              time: new Date().getTime(),
              type: "voice",
            },
          ],
          groupId: 13,
          type: "user",
          unRead: 2,
        },
        {
          img: require("../../../assets/tx.png"),
          name: "周铁轮",
          msgs: [
            {
              isMe: false,
              content: "打电话",
              time: new Date().getTime(),
              type: "text",
            },
            {
              isMe: true,
              content: 7,
              time: new Date().getTime(),
              type: "voice",
            },
          ],
          groupId: 14,
          type: "user",
          unRead: 2,
        },
      ],
    };
  },
  beforeMount() {},
  mounted() {
    this.tochat();
    //  console.log(this.$route.query.id)
  },
  beforeDestroy() {
    //  this.select=s
    //页面销毁之前提交保留的数据
    this.$store.commit("saveId", this.select.groupId);
    //  console.log(this.select.groupId)
  },

  //挂载后和更新前被调用的。但如果该组件中没有使用缓存，也就是没被<keep-alive>包裹，activated不起作用
  // activated(){
  //     this.$nextTick(()=>{
  //         this.tochat();
  //     })
  // },

  // 只执行一次
  // created(){
  //     this.$nextTick(()=>{
  //          setTimeout(() => {
  //          this.select={ groupId:null};
  //     },100);
  //     })
  // },
  methods: {
    // 跳转到聊天  刚开始没有数据要先给属性赋值空，不然bug ┭┮﹏┭┮
    tochat() {
      // console.log( this.$route.query.id)
      this.select = this.groups.find((item) => {
        return item.groupId == this.$route.query.id;
      }) || { groupId: null };
      this.selects(this.select);
    },
    // 发送信息
    send(content, groupId) {
      this.groups.forEach((group) => {
        if (group.groupId === groupId) {
          group.msgs.push(content);
        }
      });
    },
    // 选择联系人
    selects(s) {
      this.$refs.child.loading = true;
      (this.select = s), (this.hidden = s.groupId);
      // this.$store.commit('setSelectSession', s) 暂时报错

      this.$forceUpdate();

      //自动滚动到底部
      setTimeout(() => {
        document.getElementById("msg").scrollTop =
          document.getElementById("msg").scrollHeight;
        this.$refs.child.loading = false;
      }, 200);

      draft(s.groupId, this.endselectId);
      this.endselectId = this.select.groupId;
      const inp = document.getElementById("input");
      this.setFocus(inp);
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
    // 设置光标在文本最后
    setFocus(el) {
      el.focus();
      var range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    },

    //打开搜索面板
    result(e) {
      this.search = e;
      console.log("面板" + e);
    },
  },
  watch: {},
};
</script>

<style scoped>
.body {
  height: 100%;
  background-color: #f3f3f3;
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
/* 列表 */
.group .gul {
  height: 100%;
  overflow-y: hidden;
  overflow-x: hidden;
}
/* 搜索面板 */
.group .gsearch {
  height: 100%;
  width: 100%;
}
.group .gsearch2 {
  /* display: inline-block; */
  padding: 80px 0 0;
  box-sizing: border-box;
  width: 379px;
  height: 100%;
  position: fixed;
  top: 80px;
  left: 100px;
  background-color: #f7f7f7;
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
