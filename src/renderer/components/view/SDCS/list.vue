<template>
  <!-- 联系人列表 -->
  <div class="cp-group" @contextmenu="menu(1,group.groupId)">
    <div>
      <!-- 头像     && group.type === 'group' :value="group.unRead"-->
      <div class="img">
        <el-badge
          :is-dot="group.unRead > 0 "     
          :hidden="0 === group.unRead"
        >
          <img :src="group.img" width="48" height="48" />
        </el-badge>
      </div>
      <!-- 消息 -->
      <div class="content">
        <p>{{ group.name }}
              <span class="time">
                {{ getTime(group.msgs) }}
            </span>
        </p>
        <!-- 最新消息预览 -->
        <div class="ctip">
             <span style="color:red" v-show="group.unRead !== undefined && group.unRead > 0"
          >[{{ group.unRead }}条]</span
        > 
        <div class="cNews" v-if="getdraft(group.groupId)">
              <div style="color:red"> 草稿：{{getdraftContent(group.groupId)}}</div>
        </div>
        <div class="cNews" v-else>
            <div v-if="group.msgs[group.msgs.length - 1].type=='video'">[ 视频 ]</div>
           <div v-else-if="group.msgs[group.msgs.length - 1].type=='img'">[ 图片 ]</div>
           <div v-else-if="group.msgs[group.msgs.length - 1].type=='voice'">[ 语音 ]</div>
           <div v-else-if="group.msgs[group.msgs.length - 1].type=='file'">[ 文件 ]</div>
           <div v-else>{{ subMsg(group.msgs) }}</div>
        </div>

        </div>
       
      </div>
    </div>
  </div>
</template>

<script>
//时间转化
import {timeFormat} from "../../../../common/formatDate";
// 导入右键菜单
  import menu from '../../../../common/rightClick'
export default {
  name: "list",
  props: ["group", "select"],
  data() {
    return {
    };
  },
   
  components: {},

  beforeMount() {},

  mounted() {
    //间隔性更新
    // setInterval(()=>{
    //     this.$forceUpdate()
    // },300)
    
    //通过事件总线获取更新指示
    this.$bus.$on('updraft',() => {
        this.$forceUpdate()
     })
  },

  methods: {
    //获取草稿箱
    getdraft(id){
            if(document.getElementById(id))
            return true
    },
    //获取草稿箱内容
    getdraftContent(id){
            if(document.getElementById(id))
            return this.subStr(document.getElementById(id).innerHTML,17)
    },
    //展示最后一条消息
    subMsg(msg) {
      if (msg !== undefined && msg !== null && msg.length > 0) {
        return this.subStr(this.filterHtml(msg[msg.length - 1].content),20);
      } else {
        return "";
      }
    },
    //省略号代替超出文本
    subStr(msg,num) {
      if (msg !== undefined && msg !== null) {
        if (msg.length > 10) {
          return msg.substring(0, num) + "...";
        }
        return msg;
      } else {
        return "";
      }
    },
    //获取最后一条消息的时间转化格式
    getTime(t) {
      if (t !== undefined && t !== null && t.length > 0) {
        // let time = new Date(t[t.length - 1].time);
        // time = time.substring(0, time.length - 3);
        return timeFormat(t[t.length - 1].time);
      } else {
        return "";
      }
    },
    //去格式
    filterHtml(m) {
      if (m !== undefined && m !== null && m.length > 0) {
        let msg = m.replace(/<\/?[^>]*>/g, ""); //去除HTML Tag
        msg = msg.replace(/[|]*\n/, ""); //去除行尾空格
        msg = msg.replace(/&npsp;/gi, ""); //去掉npsp
        return msg;
      }
      return "";
    },
    // menu(e){
    //  e.preventDefault();
    // // 执行代码块
    //  console.log(e)
    //  console.log(this)
    // console.log(e.offsetX)
    // console.log(e.offsetY)
    // const menu = document.getElementsByClassName("menu")
    // console.log(menu)
    // // menu.style.left=e.offsetX
    // // menu.offsetY=e.offsetY
    // },
    menu
   
    
  },
  watch:{

  }
};
</script>
<style  scoped>
.cp-group {
  height: 75px;
  font-size: small;
  position: relative;
}
.img {
    padding: 15px 0 15px 19px;
}
p {
  color: black;
  margin: 1px 0;
  font-size: 16px;
  width: 200px;
  /* width: 100%; */
    overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.time {
  position: absolute;
  font-size: smaller;
  font-size: 12px;
  right: 1px;
  top: -15px;
  color:#a3a3a3;
  /* top: 5px; */
}
.content {
  /* display: inline-block; */
  position: absolute;
  left: 80px;
  top: 20px;
}
.ctip {
    margin-top: 9px;
    font-size: 12px;
    width:290px;
}
.cNews {
  display: inline-block;

}
</style>
