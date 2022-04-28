<template>
  <!-- 数据采集 -->
     <div class="bod">
       <!-- 标题 -->
    <div class="sjtop">
      <span class="sjtitle">业务数据采集</span>
    </div>
    <!-- 子菜单 -->
      <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="终端设备" name="first"><zdsbdata/></el-tab-pane>
    <el-tab-pane label="电台设备" name="second"><dtsbdata/></el-tab-pane>
    <el-tab-pane label="电台射频" name="third"><dtspdata/></el-tab-pane>
      <!-- <el-tab-pane label="test" name="fourth"><Test/></el-tab-pane> -->
  </el-tabs>
 
  </div>
</template>

<script>
import Dtsbdata from './dtsbdata.vue'
import Dtspdata from './dtspdata.vue'
import zdsbdata from './zdsbdata.vue'
import Test from './test.vue'
export default {
  components: { zdsbdata, Dtsbdata, Dtspdata,Test },
     data() {
    return {
       activeName: 'first'
    }
  },
  beforeMount(){
    // this.gettableData()
  },
  methods:{
        handleClick(tab, event) {
        console.log(tab, event);
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
.bod >>> .el-tabs__nav-scroll{
  margin-left: 24px;
  color: pink!important;
}
</style>