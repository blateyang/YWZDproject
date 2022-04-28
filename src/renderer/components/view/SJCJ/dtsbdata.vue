<template>
 <div>
          <!-- 主体 -->
    <div class="sjmain">
      <!-- 顶部菜单 -->
      <div class="mainmenu">
         <el-button type="warning" icon="el-icon-upload">导出</el-button>
         <el-button type="danger" icon="el-icon-delete" @click="deleteT">删除</el-button>
                  <el-button type="primary" icon="el-icon-search"style="float:right">搜索</el-button>
         <el-input v-model="input" placeholder="关键词"style="float:right" clearable></el-input>

      </div>
      <!-- 主体表格 -->
        <el-table
        stripe
          ref="multipleTable"
          :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
          tooltip-effect="dark"
           :header-cell-style="{color:'#171717',background:'#f7f9ff',borderColor:'#CECECE',borderTop:'1px solid #ddd'}"
          style="width: 100%;height:65vh"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"label-class-name="DisabledSelection"> </el-table-column>
          <el-table-column label="编号" width="90"prop="number">
            <template slot-scope="scope">{{ scope.row.number }}</template>
          </el-table-column>
          <el-table-column prop="model" label="工作模式" width="100">
          </el-table-column>
          <el-table-column prop="band" label="频段" width="150" show-overflow-tooltip>
          </el-table-column>
           <el-table-column prop="startdate" label="开始时间" show-overflow-tooltip>
          </el-table-column>
           <el-table-column prop="enddate" label="结束时间" show-overflow-tooltip>
          </el-table-column>
           <el-table-column prop="bandwidth" label="带宽" show-overflow-tooltip>
          </el-table-column>
           <el-table-column prop="speed" label="速率" show-overflow-tooltip>
          </el-table-column>
           <el-table-column prop="power" label="功率" show-overflow-tooltip>
          </el-table-column>
        </el-table>
           <!-- 分页器 -->
         <div style="text-align: center;margin-top: 30px;">       
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="current_change">
      </el-pagination>
    </div>
        <!-- 底部按钮 -->
        <!-- <div style="margin-top: 20px">
          <el-button @click="toggleSelection()">取消选择</el-button>
        </div> -->
      
    </div>
 </div>
</template>

<script>
export default {
     data() {
    return {
      input:"",
      tableData: [
        {
          number:1,        
          model: "模式一",
          band: "1000Khz-2000Khz",
          startdate: "2016-05-03",
           enddate: "2016-05-03",
           bandwidth:1000,
           speed:100,
           power:60,
        },{
          number:2,        
          model: "模式二",
          band: "1000Khz-2000Khz",
          startdate: "2016-05-03",
           enddate: "2016-05-03",
           bandwidth:1000,
           speed:100,
           power:60,
        },{
          number:3,        
          model: "模式三",
          band: "1000Khz-2000Khz",
          startdate: "2016-05-03",
           enddate: "2016-05-03",
           bandwidth:1000,
           speed:100,
           power:60,
        },],   
      //     tableData:[
      //   {
      //     number: "",
      //     type: "",
      //     name: "",
      //     startdate: "",
      //     enddate: "",
      //     source:"",
      //     direction:"",
      //     status:"",
      //   },
      // ],
         multipleSelection: [],
          total: 20,
        pagesize:12,
        currentPage:1
    }
  },
  beforeMount(){
    // this.gettableData()
  },
  methods:{
        //获取数据
    gettableData() {
        this.$http.get(' ').then((response)=>{
    this.tableData=response.data;
    console.log(response.data); 
        }).catch((response)=>{
     console.log(response.data);   
        })
    },
      current_change(currentPage){
        this.currentPage = currentPage;
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
}
}
</script>

<style scoped>

.sjtitle {
  font-size: 27px;
  line-height: 80px;
  margin-left: 24px;
}
.sjtop {
  height: 80px;
  width: 100%;
  border-bottom: 1px solid #ddd;
}
.sjmain {
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
/* 去掉表单底部白线 */
.el-table::before {
    height: 0px;
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
}
</style>