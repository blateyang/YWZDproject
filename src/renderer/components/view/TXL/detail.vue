<template>
  <!-- 主体 -->
  <div class="detailmain">
    <!-- 群聊名字 -->
    <div class="detailtop">
      <div v-show="detail.number">({{ detail.number }}) {{ detail.name }}</div>
    </div>
    <!-- 详细窗口 -->
    <div class="detailbody" v-if="detail !== null" @click="showBrow = false">
      <!-- 群聊界面 -->
      <div v-if="detail.number" class="groupcard">
        <div v-for="m in detail.member">
          <div class="member">
            <img :src="m.img" alt="" />
            <p >{{ m.name }}</p>
          </div>
        </div>
        <div v-show="detail.Id !== 0">
          <el-button class="send"@click="send(detail.Id)">发消息</el-button>
        </div>
      </div>
      <!-- 个人界面 -->
      <div v-else>
        <div class="personcard">
          <img :src="detail.img" alt="" />
          <p>{{ detail.name }}</p>
          <el-descriptions class="persondetail" title="" direction="horizontal" :column="1" >  
            <el-descriptions-item label="手机号" 
              > <div class="edit" @dblclick="edit($event)" title="双击编辑" v-text="detail.info.tel"></div></el-descriptions-item
            >
            <el-descriptions-item label="居住地"><div class="edit" @dblclick="edit($event)" title="双击编辑" v-text="detail.info.add"></div></el-descriptions-item>
            <el-descriptions-item label="备注">
              <el-tag size="small">普通用户</el-tag>
            </el-descriptions-item>
          
          </el-descriptions>
        </div>
        <div v-show="detail.Id !== 0">
          <el-button class="send" @click="send(detail.Id,detail)">发消息</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { remote, ipcRenderer } from "electron";
// const BrowserWindow = remote.BrowserWindow;
// const  { BrowserWindow }  =  require ( '@electron/remote' )
// const path = require("path");
// let childWindow = null;
import Vue from 'vue'

export default {
  name: "detail",
  props: ["detail"],
  data() {
    return {
      detailId:null,
    };
  },
  mounted() {},

  methods: {
    // 跳转到会话
    send(id){
            this.$emit("send", id);      
    },
    //编辑
    edit(e) {
      let element = e.target
        let oldhtml = element.innerHTML;
        //创建新的input元素
        let newobj = document.createElement('input');
        //为新增元素添加类型
        newobj.type = 'text';
        //为新增元素添加value值
        newobj.value = oldhtml;
        //为新增元素添加光标离开事件
        newobj.onblur = function() {
          //当触发时判断新增元素值是否为空或者是否和原值相等，为空则不修改，并返回原有值
            element.innerHTML = this.value == oldhtml||this.value == "" ? oldhtml : this.value;
        //执行修改操作           
            console.log(this.value)
            
        }
        //设置该标签的子节点为空
        element.innerHTML = '';
        //添加该标签的子节点，input对象
        element.appendChild(newobj);
         //设置获得光标
        newobj.focus();
        //设置选择文本的内容或设置光标位置（两个参数：start,end；start为开始位置，end为结束位置；如果开始位置和结束位置相同则就是光标位置）
        newobj.setSelectionRange(oldhtml.length, oldhtml.length);
    }
  },
  watch: {},
};
</script>

<style scoped>
.detailmain {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.detailtop {
  /* position: fixed; */
  height: 80px;
  line-height: 80px;
  /* top: 30px; */
  /* margin-left: 50px; */
  font-size: 24px;
  font-weight: bold;
  background-color: #f3f3f3;
  width: 40vw;
  padding-left: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.detailbody {
  /* padding: 0 0 334px 0 ; 方案二 */
  border-top: 1px solid #ddd;
  box-sizing: border-box;
  font-family: 微软雅黑, serif;
  /* height: calc(100%-81px); */
  height: 100%;
  margin-bottom: -81px;
  /* height:789px; */
  width: 100%;
  position: relative;
}
/* 群聊 */
.groupcard {
  margin: 40px;
  height: 65vh;
  overflow: overlay;
}
.member {
  float: left;
  text-align: center;
  margin: 15px;
}
.member img {
  width: 80px;
}
.member p {
  width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/* 个人 */
.personcard {
  position: absolute;
  left: 50%;
  top: 35%;
  transform: translate(-50%, -50%);
  margin: auto;
  width: 50vw;
  height: 60vh;
  text-align: center;
}
.personcard img {
  width: 80px;
}
.personcard p {
  /* width: 80px; */
  font-size: 25px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.personcard >>> .persondetail .el-descriptions__body{
  font-size: 15px;
     border-top: 1px solid #ddd;
     border-bottom: 1px solid #ddd;
    background-color: #f3f3f3;
}
.personcard >>> .persondetail .el-descriptions__body .el-descriptions-row{
    height: 60px;
}
.edit {
  cursor: pointer;
}
/* 发消息按钮 */
.send {
  width: 180px;
  position: absolute;
  bottom: 20vh;
  left: 50%;
  margin-left: -90px;
  color: #fff;
  background-color: #9bccff;
}

/* 滚动槽 */
::-webkit-scrollbar-track {
  /* border-radius: 10px; */
  background: transparent;
  /* background-color: rgba(216, 16, 16, 0.1);   */
  /* opacity: 0; */
  /* display: none; */
}
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius: 8px;
  /* -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2); */
  background: rgba(58, 57, 54, 0.5);
  /* opacity:0.50; */
  /* filter:alpha(opacity=50); */
}
</style>