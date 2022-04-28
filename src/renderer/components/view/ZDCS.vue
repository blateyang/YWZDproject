<template>
  <!-- 自动测试 -->
  <div class="bod">
    <!-- 标题 -->
    <div class="zdtop">
      <span class="zdtitle">自动测试</span>
    </div>
    <!-- 主体 -->
    <div class="zdmain">
      <!-- 顶部菜单 -->
      <div class="mainmenu">
         <el-button type="warning" icon="el-icon-upload"  >导出</el-button>
         <el-button type="danger" icon="el-icon-delete" @click="deleteT">删除</el-button>
                  <el-button type="primary" icon="el-icon-search"style="float:right">搜索</el-button>
         <el-input v-model="input" placeholder="关键词"style="float:right" clearable></el-input>

      </div>
      <!-- 主体表格 -->
        <el-table
        stripe
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
           :header-cell-style="{color:'#171717',background:'#f7f9ff',borderColor:'#CECECE',borderTop:'1px solid #ddd'}"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column  type="selection" width="55"label-class-name="DisabledSelection"> </el-table-column>
          <el-table-column  label="编号" width="100"prop="number">
            <!-- <template slot-scope="scope">{{ scope.row.number }}</template> -->
          </el-table-column>
          <el-table-column  prop="name" label="任务名称" width="100">
          </el-table-column>
          <el-table-column  prop="belong" label="所属网络" show-overflow-tooltip>
          </el-table-column>
           <el-table-column prop="startdate" label="开始时间" show-overflow-tooltip>
          </el-table-column>
           <el-table-column prop="enddate" label="结束时间" show-overflow-tooltip>
          </el-table-column>
           <el-table-column prop="type" label="业务类型" show-overflow-tooltip>
          </el-table-column>
           <el-table-column prop="receiver" label="接收端" show-overflow-tooltip>
          </el-table-column>
           <el-table-column prop="status" label="状态" show-overflow-tooltip>            
             <template slot-scope="scope">
               <span v-if="scope.row.status===1" style="color:#07C15F">已完成</span>
               <span v-else-if="scope.row.status===2" style="color:#FEAA65">进行中</span>
               <span v-else style="color:#676767">未完成</span>
              </template>
          </el-table-column>
        </el-table>
        <!-- 底部按钮 -->
        <div style="margin-top: 20px">
          <el-button @click="toggleSelection()">取消选择</el-button>
        </div>
      
    </div>
  </div>
</template>

<script>
import { remote,ipcRenderer,ipcMain } from "electron";
export default {
   name:"ZDCS",

  data() {
    return {
      input:"",
      tableData: [
        {
          number:1,
          startdate:"2016-05-03",
          enddate: "2016-05-03",
          name: "任务一",
          type: "语音",
          receiver:"单位一",
          status:1,
          belong:"接入网1",
        },{
          number:2,
          startdate:"2016-05-03",
          enddate: "2016-05-03",
          name: "任务一",
          type: "语音",
          receiver:"单位一",
          status:2,
          belong:"接入网1",
        },{
          number:3,
          startdate:"2016-05-03",
          enddate: "2016-05-03",
          name: "任务一",
          type: "语音",
          receiver:"单位一",
          status:3,
          belong:"接入网1",
        },{
          number:4,
          startdate:"2016-05-03",
          enddate: "2016-05-03",
          name: "任务一",
          type: "语音",
          receiver:"单位一",
          status:2,
          belong:"接入网1",
        },
        ],   
         multipleSelection: [] 
    }
  },
  methods: {
    //选择
    handleSelectionChange(rows){
        // console.log(rows)
        
    },
    //取消全选
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          //toggleRowSelection(row，selected) 如果使用了第二个参数，则是设置这一行选中与否（selected 为 true 则选中）
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    //删除
    deleteT() {
      // console.log(this.$refs.multipleTable.selection[1].number)
      for(let i=0;i<this.$refs.multipleTable.selection.length;i++){
          for(let t=0;t<this.tableData.length;t++){
                if(this.tableData[t].number === this.$refs.multipleTable.selection[i].number){
                    this.tableData.splice(t,1)
                }
          }
      }
    }
  },
};
</script>

<style scoped>
/* .bod{
      margin-top: 80px;
      background-color: pink;
   } */
.zdtitle {
  font-size: 27px;
  line-height: 80px;
  margin-left: 24px;
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
.el-input >>>.el-input__inner {
   height: 35px;
     background-color: #f3f3f3;
      border:none;
}
.el-input >>> input::-webkit-input-placeholder {
  color: #999;
  font-weight: bold;
  font-size: 15px;
}
.el-table >>> .DisabledSelection .cell .el-checkbox__inner {
  /* display: none;
  position: relative; */
  width: 30px;
  visibility: hidden;
}
.el-table >>> .DisabledSelection .cell:before {
  content: "全 选";
  position: absolute;
  left: 7px;
  text-decoration:underline;
  border-bottom: 5px;
  font-weight: bold;
  font-size: 15px;
  /* color: #000; */
}
/* .el-table >>> .DisabledSelection .cell::after {
  content: none;
  position: absolute;
  left: 7px;
  text-decoration:underline;
  border-bottom: 5px;
  color: #000;
} */
</style>