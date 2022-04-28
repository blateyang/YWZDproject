<template>
  <!-- 终端设备 -->
  <div class="bod">
    <!-- 顶部标题 -->
    <div class="zdtop">
      <span class="zdtitle">用户管理</span>
    </div>
    <!-- 主体 -->
    <div class="zdmain">
      <!-- 顶部菜单 -->
      <div class="mainmenu">
        <el-button
          type="primary"
          icon="el-icon-circle-plus-outline"
          @click="addForm"
          >添加</el-button
        >
        <el-button
          type="success"
          icon="el-icon-time"
          style="width: 100px"
          @click="getTime"
          >获取时间</el-button
        >
        <el-button
          type="primary"
          icon="el-icon-search"
          style="float: right"
          v-model="input"
          >搜索</el-button
        >
        <el-input
          v-model="input"
          placeholder="关键词"
          style="float: right"
          clearable
        ></el-input>
      </div>
      <!-- 表格内容 -->
      <el-table
        ref="singleTable"
        :data="tableData"
        stripe
        :header-cell-style="{
          color: '#171717',
          background: '#f7f9ff',
          borderColor: '#CECECE',
          borderTop: '1px solid #ddd',
          height: '61px',
        }"
        :row-style="{ height: '61px' }"
         style="width: 100%;height:70vh;"
      >
        <!-- @selection-change="handleSelectionChange"tooltip-effect="dark" <el-table-column label="编号" type="selection" width="55"label-class-name="DisabledSelection"> </el-table-column> -->
        <el-table-column label="编号" min-width="30%">
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column prop="img" label="头像" min-width="30%">
          <!-- 'data:image/jpeg;base64,' +   解码 -->

          <template slot-scope="scope">
            <img width="60px" :src="scope.row.head" />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="用户名" min-width="40%">
        </el-table-column>
        <el-table-column
          prop="role"
          label="所属角色"
          min-width="40%"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{ scope.row.region ? "超级管理员" : "普通用户" }}
          </template>
        </el-table-column>
        <el-table-column
          prop="time"
          label="添加时间"
          min-width="40%"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="address" label="操作" min-width="30%">
          <template slot-scope="scope">
            <a class="cz">重置</a>
            <a class="bj"@click="edit(scope.row.id)">编辑</a>
            <a v-show="scope.row.region === 0" class="sc" @click="deleteT(scope.row.id)">删除</a>
          </template>
        </el-table-column>
      </el-table>
      <!-- 底部按钮 -->
      <!-- <div style="margin-top: 20px">
        <el-button @click="toggleSelection()">取消选择</el-button>
      </div> -->

           <!-- 分页器 -->
     <div style="text-align: center;margin-top: 30px;">       
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="current_change">
      </el-pagination>
    </div>

      <!-- 添加信息弹窗  v-model="form.head"     -->
      <el-dialog
        v-dialogDrag
        title="用户信息"
        :visible.sync="dialogFormVisible"
        :modal-append-to-body="false"
        :close-on-click-modal="false"
      >
        <el-form :model="form" ref="form">
          <div class="up">
            <el-form-item
              label="头像"
              :label-width="formLabelWidth"
              prop="head"
            >
              <el-input class="upload" readonly> </el-input>
            </el-form-item>

            <a class="upfile" @click="uploadFile">
              <div v-if="fileName == ''">选择文件</div>
              <div v-else v-text="fileName">选择文件</div>
              <el-upload
                style="display: none"
                :limit="1"
                ref="upload"
                :on-change="upChange"
                class="upload-demo"
                action=""
                :auto-upload="false"
              >
                <el-button size="small" type="primary" ref="upFile"></el-button>
              </el-upload>
            </a>
            <!--  :on-preview="handlePreview":file-list="form.head"  "true"=  :before-upload="beforeUpload"  -->
          </div>
          <el-form-item
            label="用户名"
            :label-width="formLabelWidth"
            prop="name"
          >
            <el-input
              v-model="form.name"
              autocomplete="off"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="所属角色"
            :label-width="formLabelWidth"
            prop="region"
          >
            <el-select v-model="form.region"  placeholder="请选择">
              <el-option label="超级管理员" value="1" ></el-option>
              <el-option label="普通用户" value="0" ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="密码"
            :label-width="formLabelWidth"
            prop="password"
          >
            <el-input
              type="password"
              v-model="form.password"
              autocomplete="off"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button icon="iconfont icon-quxiao" @click="cancel"
            >取消</el-button
          >
          <el-button
            icon="iconfont icon-queren"
            type="primary"
            @click="submit(form)"
            >确认</el-button
          >
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { remote, ipcRenderer } from "electron";
import path from "path";
import { copyFileSync } from "original-fs";
// 导入拖拽插件
import "../../../common/drag";
import ajax from "../../../common/ajax";
import { setTimeout } from 'timers';
export default {
  name: "ZDSB",
  data() {
    return {
      input: "",
      fileName: "",
      tableData: [
        {
          id: 1,
          time: "2016-05-03",
          head: require("../../assets/tx.png"),
          name: "admin",
          region: 1,
        },
        {
          id: 2,
          time: "2016-05-03",
          head: require("../../assets/tx.png"),
          name: "admin2",
          region: 0,
        },
        {
          id: 3,
          time: "2016-05-03",
          head: require("../../assets/tx.png"),
          name: "admin3",
          region: 0,
        },
        {
          id: 4,
          time: "2016-05-03",
          head: require("../../assets/tx.png"),
          name: "admin4",
          region: 0,
        },
      ],
      // tableData:[
      //   {
      //     id: "",
      //     time: "",
      //     img: "",
      //     name: "",
      //     role: "",
      //     head:"",
      //   },
      // ],
      multipleSelection: [],
      dialogFormVisible: false,
      form: {
        name: "",
        head: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        password: "",
      },
      formLabelWidth: "120px",
       total: 20,
        pagesize:8,
        currentPage:1
    };
  },
  beforeMount() {
    //  this.gettableData()
  },
  methods: {
    // toggleSelection(rows) {
    //   if (rows) {
    //     rows.forEach((row) => {
    //       this.$refs.multipleTable.toggleRowSelection(row);
    //     });
    //   } else {
    //     this.$refs.multipleTable.clearSelection();
    //   }
    // },
    // handleClick(row) {
    //   console.log(row);
    // },
    //获取数据
    gettableData() {
      this.$http
        .get(" http://localhost:3000/add")
        .then((response) => {
          this.tableData = response.data;
          console.log(response.data);
        })
        .catch((response) => {
          console.log(response.data);
        });
    },
    // 添加用户弹框
    addForm() {
      this.dialogFormVisible = true;
      const dragDom = document.querySelector(".el-dialog");
      // dragDom.style.left = 120+ dragDom.offsetParent.clientWidth/2+"px"
      dragDom.style.left = " 120px";
      console.log(dragDom.style.left);
    },

    // 上传头像链接
    uploadFile() {
      this.$refs.upFile.$el.click(); //实际点击upload组件
      this.$refs.upload.clearFiles();
      // console.log(this.form.head);
    },
    //上传条件      因为跟auto-upload冲突所以要放到upchange中调用
    beforeUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
        this.$refs.upload.clearFiles(); //不符合条件之后要清空上传缓存里的列表文件
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
        this.$refs.upload.clearFiles();
      }
      return isJPG && isLt2M;
    },
    //上传触发事件
    upChange(file, fileList) {
      //  console.log(file)  //上传的文件对象
      let _this = this;
      let event = event || window.event;
      var file = event.target.files[0]; //在event中获取文件对象
      // var file2 = file.raw   // 因为被element包装过，upload获取的file对象要在下一层中获取文件对象
      //判断一次条件并同时调用一次
      if (this.beforeUpload(file)) {
        //创建文件对象
        let reader = new FileReader();
        //调用api获取特殊格式的文件对象，从里面获取base64
        reader.readAsDataURL(file);
        //读取文件对象函数，完成时执行，在里面执行操作
        reader.onload = function (e) {
          //  console.log(e)    转化后的文件对象
          //   console.log(file.name)
          _this.form.head = e.target.result; //将base64结果赋值给表单
          _this.fileName = file.name; //从第一个参数中获取文件名然后赋值
        };
      }
    },

    // 提交
    submit(from) {
      console.log(this.form.id);
      //根据id来判断是修改还是编辑  一种情况是没有id根据是否存在判断，一种是自己定义id再判断
      // for(let i;i<this.tableData.length;i++){
      //           if(this.tableData[i].id===this.form.id){
      //         }else{
      //         }
      // }

      if(this.form.id){
                for(let i;i<this.tableData.length;i++){
                if(this.tableData[i].id===this.form.id){
                  this.tableData[i].name = this.form.name
              }
      }
      }else{
          this.form.id=this.tableData[this.tableData.length-1].id+1
          this.tableData.push(this.form)
      }

      this.form = {}      
      // this.$refs["form"].resetFields(); //清空表单 跟this.form={}冲突
      this.dialogFormVisible = false; //关闭弹窗
      this.fileName = ""; //清空文件名
      this.$refs.upload.clearFiles(); //清空列表
    },
    // 取消提交
    cancel() {
       this.form = {}    
      // this.$refs.form.resetFields();
      this.dialogFormVisible = false;
      this.fileName = "";
      this.$refs.upload.clearFiles();
    },

    //获取时间
    getTime() {
      console.log("ok");
      //h5原生notication的api不起作用
      // let option = {
      //   title: "你订阅的《XXX》更新了",
      //   body: "《xx》已更新",
      //   icon: path.join("static/zd.png"),
      //   // href: 'https://jiweiv.cn'
      // };
      // // 创建通知并保存
      // let hhwNotication = new window.Notification(option.title, option);
      // console.log(hhwNotication);
      // // 当通知被点击时, 用默认浏览器打开链接
      // hhwNotication.onclick = function () {
      //   // shell.openExternal(option.href)
      //   console.log("ok2");
      // };

      // ipcRenderer.send("shownotify");
      // setTimeout(() => {
         ipcRenderer.send("new-msg",'666')
      // },600)
     
    },

    //编辑
    edit(e){         
	 this.form = this.tableData.find((item)=>{
	      return item.id === e;
		      });
          console.log(this.form)
          console.log(this.tableData)
          this.dialogFormVisible=true;
    },

    //删除
    deleteT(e) {
                for(let t=0;t<this.tableData.length;t++){
                if(this.tableData[t].id === e){
                    this.tableData.splice(t,1)
                }
          }
    },
      //分页器
          current_change(currentPage){
        this.currentPage = currentPage;
  },
  },
};
</script>

<style scoped>
/* .bod{
      background: rgb(0, 255, 157);
      margin-top: 80px;
   } */
.zdtitle {
  font-size: 27px;
  line-height: 80px;
  margin-left: 24px;
}
.el-table__header thead .has-gutter {
  color: #000;
}
.zdtop {
  height: 80px;
  width: 100%;
  border-bottom: 1px solid #ddd;
}
.zdmain {
  padding: 20px;
}
.mainmenu {
  margin-bottom: 20px;
}
.el-button {
  width: 72px;
  height: 35px;
  padding: 0;
}
.el-input {
  width: 160px;
  height: 35px;
}
.el-input >>> .el-input__inner {
  height: 35px;
  background-color: #f3f3f3;
  border: none;
}
.el-input >>> input::-webkit-input-placeholder {
  color: #999;
  font-weight: bold;
  font-size: 15px;
}
.cz {
  color: #ffaa64;
}
.bj {
  color: #4da0ff;
}
.sc {
  color: #ff6464;
}
.cell a {
  margin-right: 8px;
  text-decoration: underline;
}
.cell a:hover {
  cursor: pointer;
}
.cell img {
  padding-top: 6px;
  width: 42px;
  height: 42px;
}
.el-table >>> .el-table__cell {
  padding: 0;
}

/* 对话框 */
.el-dialog__wrapper >>> .el-dialog {
  width: 440px;
  height: 340px;
  /* left: 15vw; */
  left: 36vw;
  top: 20vh;
  margin: 0 !important;
}
.el-dialog__wrapper >>> .el-dialog__body {
  padding: 10px;
}
.el-dialog__wrapper >>> .el-dialog__header {
  padding: 10px 20px 20px;
}
.el-dialog__wrapper >>> .el-dialog__title {
  color: #000;
  font-weight: bold;
}
.el-dialog__wrapper >>> .el-dialog__title::before {
  content: "\00a0 ";
  border-left: 5px solid #4da0ff;
}
.el-dialog__wrapper >>> .el-dialog__headerbtn .el-dialog__close {
  color: #000;
  font-size: 25px;
  line-height: 2px;
}
/* 对话框表单 */
.el-form {
  /* padding-left: 20px; */
  width: 360px;
  margin: 0 auto;
}
.el-dialog__body .el-form .el-form-item {
  margin-bottom: 15px;
}
.el-form >>> .el-form-item__content .el-input {
  height: 35px;
  width: 240px;
}
.el-form >>> .el-form-item__content {
  line-height: 35px;
}
.el-form >>> .el-form-item__label {
  background-color: #86bdff;
  color: #fff;
  height: 35px;
  line-height: 35px;
  text-align: center;
  padding: 0;
}
.el-form >>> .el-form-item__label::before {
  content: "*";
  color: red;
}
.el-form >>> .el-input__inner {
  background-color: #f3f3f3;
  border: none;
  height: 35px;
}
.el-form >>> .el-input__inner::-webkit-input-placeholder {
  /* color: #000!important; */
  color: #999;
  font-weight: bold;
}
/* 对话框按钮 */
.el-dialog__footer {
  padding: auto;
}
.dialog-footer {
  /* width: 190px; */
  margin: 0 auto;
  text-align: center;
}
.dialog-footer >>> .el-button {
  width: 82px;
  height: 35px;
  border-radius: 3px;
}
.dialog-footer .el-button--default {
  background-color: #999;
  color: #fff;
  margin-right: 10px;
}
.dialog-footer >>> i {
  padding-right: 5px;
}
/* 模态框 margin-left: 120px; */
/* .el-dialog__wrapper {
  z-index: 9 !important;
}
.zdmain >>> .v-modal {
  z-index: 8 !important;
} */

/* 上传按钮css修改方案二  创建新标签覆盖，用upload代替 */
.el-form .up {
  position: relative;
}
.el-form .up .upfile {
  color: #999;
  font-weight: bold;
  font-size: 15px;
  position: absolute;
  left: 135px;
  top: 9px;
  text-decoration: underline;
  /* z-index: -1; */
}
.el-form
  >>> .el-form-item__content
  .el-input
  .el-input__inner::-webkit-file-upload-button {
  /* display: none; */
  margin-top: 5px;
  opacity: 0;
}
/* 上传按钮css修改方案一  保留input类型file，修改原生按钮仅保留提示文字 */
/* .el-form >>> .el-form-item__content .el-input .el-input__inner::-webkit-file-upload-button {
  position: absolute;
  left: 0px;
  width: 0px;
  height: 0px;
  margin-top: 10px;
  background-color: #f3f3f3; */
/* overflow: hidden; */
/* line-height: 99em; */
/* border: none;
  z-index: 2;
 }  */
</style>