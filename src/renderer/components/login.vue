<template>
	<div class="login">
    <!-- 标头 -->
		<div class="title">
			<a href="" target="_blank" underline="ture" class="config">接入配置</a>
			<i class="el-icon-close" @click="exit"></i>
		</div>
    <!-- 用户头像 -->
    <div class="userimg">
        <div class="imgbox">
          <img src="../assets/tx.png"/>
        </div>
    </div>
    <!-- 主体 -->
		<div class="body">
			<div class="input" style="text-align:center;">	
					<div style="margin-top: 20px">
						<el-input v-model="user.account" placeholder="输入账号"></el-input>
						<el-input v-model="user.password" placeholder="输入密码" type="password"></el-input>
						<el-button type="primary"  class="submit" @click="login">登 录</el-button>
					</div>			
		</div>
	</div>
  </div>
</template>

<script>
    import {remote, app, ipcRenderer} from 'electron'
    // import makeDraggable from '../../common/drag'
    export default {
        name: "login",
        data() {
            return {
                user: {
                    account: '',
                    password: ''
                }
            }
        },
        beforeCreate() {
             
            remote.getCurrentWebContents().closeDevTools()
            // remote.getCurrentWindow().setSize(300, 372)
            remote.getCurrentWindow().setMinimumSize(300, 372);//设置最小宽高
          
        },
        mounted() {
          // makeDraggable()//窗口拖拽
            remote.getCurrentWindow().setSize(300, 372, false)
           remote.getCurrentWindow().center();//窗口居中
        remote.getCurrentWindow().setResizable(false);
        },
        methods: {
            exit() {
                //remote.app.quit()
	            remote.getCurrentWindow().hide()
            },
            login() {
                // console.log(this.$router)
                // ipcRenderer.send('new-msg','xxx发来一一条消息')
                this.$router.push('/index')             
            }
        }
    }
</script>

<style scoped>
.login {
		-webkit-app-region: drag;
    background-color: rgb(255, 255, 255);
		/* height: 372px; */
    /* width: 300px; */
		/* min-width: 300px; */
    /* min-height: 372px; */
		overflow: hidden;
	}
.title {
  /* padding: 5px; */
  text-align: left;
  width: 100%;
  height: 45px;
  line-height: 45px;
}
.config {
  color: #666666;
  font-size:15px;
  font-weight: bold;
  padding-left: 15px;
  -webkit-app-region: no-drag;
  outline:none;
}
.el-icon-close {
	-webkit-app-region: no-drag;
  cursor:pointer;
  float:right;
  font-size: 25px;
  margin-right: 15px;
  margin-top:10px;
  color: red !important;
}
.imgbox {
  margin:8px auto;
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.el-input>>>.el-input__inner{
	-webkit-app-region: no-drag;
  width: 250px;
  border-top: none;
  border-left: none;
  border-right: none;
  margin-bottom: 15px;
  border-radius: 0;
  /* border-bottom: 2px !important; */
}
.submit {
	-webkit-app-region: no-drag;
  width: 160px;
  height: 37px;
  margin-top: 13px;
  /* background: -webkit-gradient(linear,100% 0%, 0% 0%,from(#2b99ff),to()#59c2fd)!important; */
  background: linear-gradient(to right,#a4ebff,#67aefb);
  color: #fff;
  font-size: 20px;
  border: none;
}
</style>
