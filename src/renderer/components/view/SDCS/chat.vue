<template>
  <!-- 会话主体 -->
  <div class="chatmain">
    <!-- 联系人名字 -->
    <div class="chattop">{{ chat.name }}</div>
    <!-- 会话窗口 -->
    <div
      v-loading="loading"
      class="chatbody"
      v-if="chat !== null"
      @click="showBrow = false"
    >
      <!-- 对话框 onselectstart="return false;"-->
      <div class="msg" id="msg">
        <p class="loadMess" v-if="loadMess">
          加载中<i class="el-icon-loading"></i>
        </p>
        <p class="loadMess" v-if="noMore">没有更多了</p>
        <p class="loadMess">上拉加载更多</p>
        <ul>
          <!-- style="min-height: 100px" v-html="c.content"-->
          <li v-for="c in chat.msgs">
            <!-- 我的消息 -->
            <div v-if="c.isMe" class="content" style="min-height: 55px">
              <p class="messTime" v-show="getTime(c.time)">
                {{ getTime(c.time) }}
              </p>
              <div
                v-if="c.type == 'text'"
                class="metext"
                v-html="c.content"
                @contextmenu="menu(2, c)"
              ></div>
              <div
                v-else-if="c.type == 'voice'"
                class="mevoice"
                :style="{ width: voiceWidth(c.content) }"
                title="播放"
              >
                <p>{{ c.content }}"</p>
                <i class="iconfont icon-saying"></i>
              </div>
              <div v-else-if="c.type == 'file'" class="mefile" title="下载文件">
                <i class="el-icon-document"></i>
                <p class="mefilename">{{ c.content.fileName }}</p>
                <p class="mefilesize">{{ c.content.fileSize }}</p>
              </div>
              <div v-else-if="c.type == 'video'" class="mevideo">
                <video
                  width="100%"
                  height="100%"
                  :poster="c.content.videoimg ? c.content.videoimg : thImg"
                  style="object-fit: cover"
                  controls="controls"
                  :src="c.content.videosrc"
                >
                  不支持该视频播放
                </video>
              </div>
              <div v-else class="meimg">
                <div class="imgbox">
                  <i
                    class="iconfont icon-xiazai"
                    title="保存图片"
                    @click="saveImg(c.content.imgsrc)"
                  ></i>
                  <img :src="c.content.imgsrc" alt="" />
                </div>
              </div>
              <div class="me-img">
                <img src="../../../assets/tx.png" width="50" height="50" />
              </div>
            </div>
            <!-- 对方消息 -->
            <div v-else class="content">
              <p class="messTime" v-show="getTime(c.time)">
                {{ getTime(c.time) }}
              </p>
              <div class="other-img">
                <img v-if="!c.name" :src="chat.img" width="50" height="50" />
                <img v-else :src="c.head" width="50" height="50" />
              </div>
              <div v-show="c.name" class="membername">{{ c.name }}</div>
              <div
                v-if="c.type == 'text'"
                class="other"
                v-html="c.content"
                @contextmenu="menu(2, c)"
              ></div>
              <div
                v-else-if="c.type == 'voice'"
                class="othervoice"
                :style="{ width: voiceWidth(c.content) }"
                title="播放"
              >
                <i class="iconfont icon-saying"></i>
                <p>{{ c.content }}"</p>
              </div>
              <div
                v-else-if="c.type == 'file'"
                class="otherfile"
                title="下载文件"
              >
                <i class="el-icon-document"></i>
                <p class="otherfilename">{{ c.content.fileName }}</p>
                <p class="otherfilesize">{{ c.content.fileSize }}</p>
              </div>
              <div v-else-if="c.type == 'video'" class="othervideo">
                <video
                  width="100%"
                  height="100%"
                  :poster="c.content.videoimg ? c.content.videoimg : thImg"
                  style="object-fit: cover"
                  controls="controls"
                  :src="c.content.videosrc"
                >
                  不支持该视频播放
                </video>
              </div>
              <div v-else class="otherimg">
                <div class="imgbox">
                  <i
                    class="iconfont icon-xiazai"
                    title="保存图片"
                    @click="saveImg(c.content.imgsrc)"
                  ></i>
                  <img :src="c.content.imgsrc" alt="" />
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <!--  拖拽条 -->
      <div id="drag" @mousedown="resize" @mouseup="resizeover"></div>
      <!-- 发送框 -->
      <div class="send" id="send">
        <!-- 发送框菜单栏 -->
        <div class="tool-bar">
          <!-- 图片发送 -->
          <el-tooltip content="图片发送" placement="top">
            <i class="iconfont icon-tupian" @click="uploadImg"> </i>
          </el-tooltip>

          <!-- 文件发送 -->
          <el-tooltip content="文件发送" placement="top">
            <i class="iconfont icon-wenjian" @click="uploadFile">
              <el-upload
                style="display: none"
                :limit="1"
                ref="upload"
                :on-preview="handlePreview"
                :on-change="upChange"
                :auto-upload="false"
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :file-list="fileList"
              >
                <el-button size="small" type="primary" ref="upFile"></el-button>
              </el-upload>
            </i>
          </el-tooltip>

          <el-tooltip content="语音通话" placement="top">
            <i class="iconfont icon-dianhua yuyin" @click="dialog(1)"></i>
          </el-tooltip>

          <el-tooltip content="视频通话" placement="top">
            <i class="iconfont icon-shipin" @click="dialog(2)"></i>
          </el-tooltip>

          <el-tooltip content="语音发送" placement="top">
            <i class="iconfont icon-yuyin" @click="dialog(3)"></i>
          </el-tooltip>

          <el-tooltip content="视频发送" placement="top">
            <i class="iconfont icon-shipin1" @click="uploadVideo">
              <el-upload
                style="display: none"
                :limit="1"
                ref="upvideoload"
                :on-change="upVideoChange"
                :auto-upload="false"
                class="upload-demo"
                action=""
                :file-list="fileList"
              >
                <el-button
                  size="small"
                  type="primary"
                  ref="upVideo"
                ></el-button>
              </el-upload>
            </i>
          </el-tooltip>

          <el-tooltip content="视频会议" placement="top">
            <i class="iconfont icon-shipintonghua" @click="dialog(4)"></i>
          </el-tooltip>

          <el-tooltip content="IP拨号" placement="top">
            <i class="iconfont icon-IPbohao" @click="dialog(5)"></i>
          </el-tooltip>
        </div>
        <!-- 输入框 @dragenter="drag"-->
        <div
          id="input"
          ref="ip"
          contenteditable="true"
          @blur="autoSave(chat.groupId)"
          @click="db"
          @contextmenu="menu(3)"
        >
          <!-- 文件图标 -->
          <!-- <div
            v-if="fileList.length > 0"
            class="file"
            contenteditable="false"
            @click="openFile(fileList[0].raw)"
          >
            <i class="el-icon-close" @click.stop="fileList = []"></i>
            <i class="el-icon-document"></i>
            <!--<div v-html="getFileImg(fileList[0].row)"></div>
            <div class="info">
              <p style="margin-bottom: 5px">{{ fileList[0].name }}</p>
              <p>{{ getSize(fileList[0].size) }}</p>
            </div>
          </div> -->
        </div>
        <!-- 按钮 -->
        <button class="btn" @click="sendbtn">发送</button>
      </div>
    </div>
  </div>
</template>

<script>
let fs = require("fs");
import { timeFormat } from "../../../../common/formatDate";
import menu from "../../../../common/rightClick";
import { remote, ipcRenderer } from "electron";
const BrowserWindow = remote.BrowserWindow;
// const  { BrowserWindow }  =  require ( '@electron/remote' )
const path = require("path");
// let childWindow = null;
export default {
  name: "chat",
  props: ["chat"],
  data() {
    return {
      sendHeight: 50,
      input: "",
      fileList: [],
      img: null,
      showBrow: false,
      activeBrow: 0,
      loading: false,
      thImg: require("../../../assets/th.jpg"),
      num: 1,
      count: [],
      monilist: [
        {
          isMe: true,
          content: "111哈哈哈哈",
          time: 1650014801278,
          type: "text",
        },
        {
          isMe: true,
          content: "2222哈哈哈哈",
          time: 1650014801278,
          type: "text",
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
      loading: false,
      noMore: false,
      loadMess: false,
      totalPage: "",
    };
  },
  beforeMount(){
  
  },
  mounted() {
      console.log()
    //  加上异步setTimeout，延迟获取dom的代码的执行
    this.$nextTick(() => {
      setTimeout(() => {
        // this.enter();
        console.log("work");
        this.drag();
        this.paste();
        this.loadMessage();
        // this.setPasteImg();
      }, 3000);
    });
  },

  methods: {
    // 上拉加载记录
    loadMessage() {
      let msg = document.getElementById("msg");
      msg.addEventListener("scroll", (e) => {
        //这里的2秒钟定时是为了避免滑动频繁，节流
        setTimeout(() => {
          //如果当前页数等于总页数，不再加载 
          if (0) {
            this.noMore = true;
            return;
          }

          //滑到顶部时触发下次数据加载 （滑到顶部&&loadMess等于false&&当前页数不等于总页数
          if (e.target.scrollTop == 0) {
            // //将scrollTop置为10以便下次滑到顶部
            e.target.scrollTop = 10;
            //获取原先高度
            let hei = e.target.scrollHeight - e.target.scrollTop;
            //加载数据
            this.getMess();
         
            //模拟
            setTimeout(() => {
              this.loadMess = false;
                   //减去多出的高度使记录保持在原先位置
              e.target.scrollTop = e.target.scrollHeight - hei;
              
            }, 300);
          }
        }, 500);
      });
    },

    // 获取记录
    getMess() {
      this.loadMess = true;
      this.noMore = false;
      console.log(this.chat.msgs);
      this.chat.msgs.unshift(...this.monilist);
    },

    // 语音条长度随语音秒数变化
    voiceWidth(c) {
      if (c < 60) {
        if (c < 30) {
          return 80 + c + "px";
        } else {
          return 100 + c + "px";
        }
      } else {
        return 120 + c + "px";
      }
    },

    menu,

    // 功能小窗
    // dialog(type) {
    //   console.log(window.location.href);
    //   console.log(type);
    //   const childURL =
    //     process.env.NODE_ENV === "development"
    //       ? "http://localhost:9080" + "#/dialog?type=" + type
    //       : path.join("file://", __dirname, "../renderer/components/dialog/dialogCenter.vue");
    //   // 判读是否已经存在子窗口
    //   if (childWindow) {
    //     childWindow.show();
    //   } else {
    //     childWindow = new BrowserWindow({
    //       useContentSize: true,
    //       height: 600,
    //       width: 360,
    //       resizable: true,
    //       show: false,
    //       frame: false,
    //       // titleBarStyle:'hidden-inset',
    //       // titleBarOverlay: true,
    //       parent: remote.mainWindow,
    //       webPreferences: {
    //         webSecurity: false,
    //       },
    //     });

    //     childWindow.loadURL(childURL);
    //     childWindow.once("ready-to-show", () => {
    //       childWindow.show();
    //     });
    //     childWindow.on("closed", () => {
    //       childWindow = null;
    //     });
    //   }
    //   // 定时发送目的是等待子窗口完成渲染才能监听数据
    //   setTimeout(() => {
    //     ipcRenderer.send("yydata", this.chat);
    //   }, 2000);
    // },

    // 功能小窗
    dialog(type) {
      if (remote.getGlobal("sharedObject").dialogStatus == 0) {
        console.log(type);
        //  定时发送目的是等待子窗口完成渲染才能监听数据
        setTimeout(() => {
          ipcRenderer.send("yydata", this.chat, type);
        }, 1000);
        // localStorage.setItem("dialogStatus",1) 主进程无法访问，改用global
        remote.getGlobal("sharedObject").dialogStatus = 1;
      } else {
        this.$message({
          message: "请先结束当前会话",
          center: true,
        });
      }
    },

    //自动保存草稿
    autoSave(d) {
      let inp = document.getElementById("input");
      // 获取当前输入框的文本,判断是否有值
      if (inp.innerText) {
        //如果这个id草稿箱是否已经存在  把文本存到这个id
        if (document.getElementById(d)) {
          document.getElementById(d).innerText = inp.innerText;
        } else {
          // 否则重新创建一个草稿箱，用这个id赋值方便根据id查找
          let el = document.createElement("textarea");
          // 隐藏区域
          el.setAttribute("readonly", "");
          el.style.position = "absolute";
          el.style.left = "-9999px";
          document.body.appendChild(el);
          el.id = d;
          el.innerText = inp.innerText;
        }
      }
      console.log(this);
      //通过事件总线更新消息列表
      this.$bus.$emit("updraft");
    },

    //发送操作
    send(d) {
      let msg = {
        isMe: true,
        content: d.content,
        time: new Date().getTime(),
        type: d.type,
      };
      //子组件发送给父组件
      this.$emit("send", msg, this.chat.groupId);

      //自动滚动到底部
      setTimeout(() => {
        document.getElementById("msg").scrollTop =
          document.getElementById("msg").scrollHeight;
      }, 100);
    },

    //发送按钮，默认发送文本消息
    sendbtn() {
      //如果有文本再发送
      if (this.$refs.ip.innerHTML.length > 0) {
        let b = {
          type: "text",
          content: this.$refs.ip.innerHTML,
        };
        this.send(b);
        this.$refs.ip.innerHTML = ""; //清空输入框
        // 删除草稿箱
        document.body.removeChild(document.getElementById(this.chat.groupId));
        // console.log(this.chat.groupId)
        // console.log(this.fileList);
      }
    },

    // 获取文件大小
    getSize(size) {
      if (size > 1024000) {
        return (size / 1024000).toFixed(2) + "MB";
      } else if (size > 1024) {
        return (size / 1024).toFixed(2) + "KB";
      } else {
        return size + "B";
      }
    },

    //光标自动跳到最后
    // foceEnd(id) {
    //   var range,
    //     doc = document.getElementById(id);
    //   if (doc.setSelectionRange) {
    //     doc.focus();
    //     doc.setSelectionRange(doc.value.length, doc.value.length);
    //   } else {
    //     range = doc.createTextRange();
    //     range.collapse(false);
    //     range.select();
    //   }
    // },

    getFileImg(row) {},

    db() {
      let a = window.getSelection();
      //a.selectAllChildren(document.getElementById('input'))
      console.log(a);
    },
    // 打开文件夹路径
    openFile(row) {
      exec(row.path, {});
      //exec.exec(row.path, {})
    },

    //点击已上传文件链接时的钩子，可以通过file.response拿到服务器返回的数据
    handlePreview(file) {
      console.log(file);
      this.$refs.ip.innerHTML = "";
    },

    //文件状态改变的钩子，添加成功失败都会调用
    upChange(file, fileList) {
      this.fileList = fileList;
      console.log(file, fileList);
    },

    // 发送文件
    uploadFile() {
      this.$refs.upFile.$el.click();
    },

    //发送图片
    uploadImg() {
      let that = this;
      //调用electron进程打开系统对话框
      let res = remote.dialog.showOpenDialog(
        {
          title: "选择图片",
          // 默认打开的路径，比如这里默认打开下载文件夹
          // defaultPath: app.getPath('downloads'),
          buttonLabel: "确认",
          // 限制能够选择的文件类型
          filters: [
            { name: "Images", extensions: ["jpg", "png", "gif"] },
            // { name: 'Movies', extensions: ['mkv', 'avi', 'mp4'] },
            // { name: 'Custom File Type', extensions: ['as'] },
            // { name: 'All Files', extensions: ['*'] },
          ],
          properties: ["openfile"], //"multiSelections"多选
        },
        (res) => {
          // 选择文件之后的处理
          if (res != undefined) {
            // 如果不是点取消按钮
            //限制图片大小
            fs.stat(res[0], function (err, stat) {
              if (err) {
                console.log(err);
              } else {
                // console.log("isFile: " + stat.isFile()); // 是否是文件:
                // console.log("isDirectory: " + stat.isDirectory());// 是否是目录:
                // console.log("size: " + stat.size);// 文件大小:单位byte
                // console.log("birth time: " + stat.birthtime);// 创建时间, Date对象:
                // console.log("modified time: " + stat.mtime);// 修改时间, Date对象:
                if (stat.size > 512000) {
                  that.$message.error({ message: "图片超出0.5M" });
                } else {
                  that.img = fs.readFileSync(res[0], "base64"); // 图片转 base64
                  let data = {
                    type: "img",
                    content: {
                      imgsrc: "data:image/png;base64," + that.img,
                    },
                  };
                  that.send(data);
                  // this.img = null;
                  // console.log(this.img);
                }
              }
            });
          } else {
            console.log("你选择了取消按钮");
          }
        }
      );
    },

    //保存图片
    saveImg(i) {
      // console.log(i)
      let that = this;
      let base64 = i.replace(/^data:image\/\w+;base64,/, "");
      let dataBuffer = new Buffer(base64, "base64");
      //调用electron进程打开系统对话框
      let res = remote.dialog.showSaveDialog({
        title: "保存图片",
        // 保存的文件名
        // defaultPath: "66",
        buttonLabel: "确认",
        // 限制保存的文件类型
        filters: [
          { name: "Images", extensions: ["jpg", "png", "gif"] },
          // { name: 'Movies', extensions: ['mkv', 'avi', 'mp4'] },
          // { name: 'Custom File Type', extensions: ['as'] },
          // { name: 'All Files', extensions: ['*'] },
        ],
      });
      //点击取消时
      if (!res) return;
      fs.writeFile(res, dataBuffer, function (err) {
        if (err) {
          console.log(err);
        } else {
          that.$message.success({ message: "保存成功" });
        }
      });
    },

    //发送视频
    uploadVideo() {
      this.$refs.upVideo.$el.click(); //实际点击upVideo按钮
      this.$refs.upvideoload.clearFiles();
    },

    //上传视频条件      因为跟auto-upload冲突所以要放到upchange中调用
    beforeUpload(file) {
      const isType = file.type === "video/mp4";
      const isLt10M = file.size / 1024 / 1024 < 10; //100M大小
      // const size = files.size / 1024 / 1024  //文件大小单位为M,(做限制条件用)
      if (!isType) {
        this.$message.error("上传视频只能是 mp4 格式!");
        this.$refs.upvideoload.clearFiles(); //不符合条件之后要清空上传缓存里的列表文件
      }
      if (!isLt10M) {
        this.$message.error("上传视频大小不能超过 10MB!");
        this.$refs.upvideoload.clearFiles();
      }
      return isType && isLt10M;
    },
    //上传触发事件
    upVideoChange(file, fileList) {
      //  console.log(file)  //上传的文件对象
      let that = this;
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
          console.log(e); //转化后的文件对象
          let video = document.createElement("video");
          video.setAttribute("src", e.target.result);
          video.setAttribute("controls", "controls");
          video.setAttribute("width", 250); //设置大小，如果不设置，下面的canvas就要按需设置
          video.setAttribute("height", 150);
          video.currentTime = 7; //视频时长，一定要设置，不然大概率白屏
          video.addEventListener("loadeddata", function () {
            let canvas = document.createElement("canvas"),
              width = video.width, //canvas的尺寸和图片一样
              height = video.height;
            canvas.width = width; //画布大小，默认为视频宽高
            canvas.height = height;
            canvas.getContext("2d").drawImage(video, 0, 0, width, height); //绘制canvas
            let dataURL = canvas.toDataURL("image/png"); //转换为base64
            // console.log(dataURL)
            video.setAttribute("poster", dataURL); //设置为视频封面
            let data = {
              type: "video",
              content: {
                videoimg: dataURL,
                videosrc: e.target.result,
              },
            };
            that.send(data);
          });
        };
      }
    },
    // 拖拽条功能
    resize(ev) {
      let initY = 0,
        tph = 0,
        bth = 0;
      let tp = document.getElementById("msg");
      let bt = document.getElementById("send");
      let drag = document.getElementById("drag");
      let inp = document.getElementById("input");
      tph = tp.clientHeight; //对话框的可视高度
      bth = bt.clientHeight; //发送框的可视高度

      initY = (ev || event).clientY;
      document.onmousemove = function (ev2) {
        var y = (ev2 || event).clientY - initY; //鼠标y轴移动距离
        //tp.style.cursor = 's-resize'
        bt.style.height = bth - y + "px"; //发送框高度
        drag.style.bottom = bth - y + "px"; //拖拽条底部
        inp.style.height = bth - 100 - 65 - y + "px"; //输入框高度
        tp.style.height = "calc(100% - " + (bth - y) + "px)"; //对话框高度
        // console.log("——————————————")
        //  console.log("鼠标y轴移动距离:"+y)
        //  console.log("对话框可视高度:"+tph)
        //   console.log("发送框可视高度:"+bth)
        // console.log("**发送框高度:"+bt.style.height)
        // console.log( "**拖拽条离底部高度:"+drag.style.bottom)
        //  console.log("**输入框高度:"+inp.style.height)
        //  console.log("**对话框高度:"+tp.style.height)
        //  console.log("输入框可视高度:"+inp.clientHeight)
        //  console.log("对话框可视高度:"+tp.clientHeight)
        //  console.log("发送框可视高度:"+bt.clientHeight)

        if (inp.clientHeight > 590) {
          bt.style.height = "755px";
          drag.style.bottom = "755px";
          tp.style.height = "calc(100% - " + 755 + "px)";
          inp.style.height = "590px";
          document.onmousemove = null;
          inp.style.height >= 650;
        } else if (inp.clientHeight < 100) {
          bt.style.height = "265px";
          drag.style.bottom = "265px";
          tp.style.height = "calc(100% - " + 265 + "px)";
          inp.style.height = "100px";
          document.onmousemove = null;
        }
      };
    },
    // 拖拽结束
    resizeover() {
      //    document.onmouseup = function () {
      //   document.onmousedown = null;
      //   document.onmousemove = null;
      // };
      document.onmousedown = null;
      document.onmousemove = null;
      console.log("drag-over");
    },

    // 粘贴去格式
    paste() {
      let inp = document.getElementById("input");
      inp.addEventListener("paste", function (event) {
        const text = event.clipboardData.getData("Text");
        document.execCommand("insertText", false, text);
        console.log("粘贴的文本是：" + text);
        event.preventDefault();
      });
    },

    // 拖拽去格式
    drag() {
      let inp = document.getElementById("input");
      inp.addEventListener(
        "dragenter",
        function (e) {
          e.preventDefault();
          e.stopPropagation();
          console.log("拖拽开始");
        },
        false
      );
      inp.addEventListener(
        "dragover",
        function (e) {
          e.preventDefault();
          e.stopPropagation();
        },
        false
      );
      inp.addEventListener(
        "dragleave",
        function (e) {
          e.preventDefault();
          e.stopPropagation();
        },
        false
      );
      //
      inp.addEventListener(
        "drop",
        function (e) {
          e.preventDefault();
          e.stopPropagation();
          // 处理拖拽的逻辑
          console.log("拖拽结束");

          // const contentEditableDiv = document.getElementById("input");
          // 获取被选中的内容，起点和终点在同一位置为光标，不同位置为选区
          const selection = window.getSelection();
          // 被选中/focus的元素
          const anchorNode = selection.anchorNode;
          if (!anchorNode) return;
          // 父节点
          const parentNode = selection.anchorNode.parentNode;
          // const range = selection.getRangeAt(0);
          const textNode = document.createTextNode(selection.toString());

          // 判断选中区域的父元素是否等于当前区域，如果是，则拖拽插入无效
          if (parentNode !== inp) {
            inp.appendChild(textNode);
          }
        },
        false
      );
    },
    //时间戳标签 单位毫秒
    getTime(nt) {
      let lastTime;
      let NowTime;
      // this.$bus.$on("lastTime",(value)=>{
      //   t = value
      //     console.log(t)
      // })

      //  console.log(index)
      lastTime = this.chat.msgs[this.chat.msgs.length - 2].time;
      if (nt) {
        NowTime = new Date(nt).toLocaleTimeString();
        //  return  NowTime.substring(0, NowTime.length - 3)
        return timeFormat(nt);
      } else {
        return "";
      }
    },

    // setPasteImg() {
    //   document.addEventListener("paste", function (event) {
    //     if (!document.activeElement === document.getElementById("input")) {
    //       return;
    //     }
    //     if (event.clipboardData || event.originalEvent) {
    //       var clipboardData =
    //         event.clipboardData || event.originalEvent.clipboardData;
    //       if (clipboardData.items) {
    //         var blob;
    //         for (var i = 0; i < clipboardData.items.length; i++) {
    //           if (clipboardData.items[i].type.indexOf("image") !== -1) {
    //             blob = clipboardData.items[i].getAsFile();
    //           }
    //         }
    //         var render = new FileReader();
    //         render.onload = function (evt) {
    //           //输出base64编码
    //           var base64 = evt.target.result;
    //           var img = document.createElement("img");
    //           img.setAttribute("src", base64);
    //           img.setAttribute("style", "max-width:150px; max-height:120px");
    //           document.activeElement.appendChild(img);
    //         };
    //         render.readAsDataURL(blob);
    //       }
    //     }
    //   });
    // },

    insertHtml(html) {
      var sel = window.getSelection(),
        range;
      if (sel.getRangeAt && sel.rangeCount) {
        range = sel.getRangeAt(0);
        range.deleteContents();
        var el = document.createElement("span");
        el.innerHTML = html;
        var frag = document.createDocumentFragment(),
          node,
          lastNode;
        while ((node = el.firstChild)) {
          lastNode = frag.appendChild(node);
        }
        range.insertNode(frag);
        if (lastNode) {
          range = range.cloneRange();
          range.setStartAfter(lastNode);
          range.collapse(true);
          sel.removeAllRanges();
          sel.addRange(range);
        }
      }
    },
  },
  watch: {
    fileList: {
      deep: true,
      handler(val) {
        console.log(val);
      },
    },
  },
  computed: {},
};
</script>

<style scoped>
.chatmain {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.chattop {
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
.chatbody {
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
/* 消息框 */
.chatbody .msg {
  background-color: #f3f3f3;
  /* height: 100%;方案二 */
  /* height: 716px; */
  /* height: calc(100% -334px) ; */
  height: 60vh;
  /* bottom: 334px; */
  width: 100%;
  overflow: hidden;
}
.chatbody .msg:hover {
  overflow-y: overlay;
}
.chatbody .msg ul {
  margin: 0;
  padding: 0 20px;
  list-style-type: none;
  position: relative;
}
.chatbody .msg ul li {
  position: relative;
  margin: 10px 0;
  height: 100%;
  width: 100%;
  word-wrap: break-word;
  word-break: break-all;
}
.chatbody .msg ul li .content {
  display: inline-block;
  width: 100%;
}
.chatbody .msg ul li .content .other-img {
  /* float: left; */
  position: absolute;
  right: left;
}
.chatbody .msg ul li .content .other {
  padding: 15px 10px 20px 10px;
  float: left;
  max-width: 50%;
  margin-left: 65px;
  background-color: #fff;
  font-size: 15px;
  border-radius: 2px;
}

.chatbody .msg ul li .content .me-img {
  position: absolute;
  right: 0;
}
/* 消息时间 */
.chatbody .msg ul li .messTime {
  width: 160px;
  margin: 15px auto;
  /* background-color: rgba(78, 73, 72, 0.2); */
  font-size: 12px;
  text-align: center;
  border-radius: 8%;
  /* color: #fff; */
}
.loadMess {
  width: 160px;
  margin: 10px auto;
  text-align: center;
  color: #7e7e7e;
}
/* 文本内容 */
.chatbody .msg ul li .content .metext {
  max-width: 50%;
  float: right;
  margin-right: 65px;
  font-size: 15px;
  border-radius: 2px;
  padding: 15px 10px 20px 10px;
  background-color: #9bccff;
}
/* 语音内容 */
.chatbody .msg ul li .content .mevoice {
  max-width: 50%;
  width: 80px;
  line-height: 55px;
  height: 55px;
  float: right;
  margin-right: 65px;
  font-size: 15px;
  border-radius: 2px;
  /* padding: 0px 0px 5px 0px; */
  background-color: #9bccff;
  cursor: pointer;
}
.chatbody .msg ul li .content .mevoice::after {
  content: "";
  position: absolute;
  right: 50px;
  top: 8px;
  width: 0;
  height: 0;
}
.chatbody .msg ul li .content .mevoice p {
  float: left;
  transform: translateX(-25px);
  color: #7e7e7e;
  font-size: 17px;
  margin: 0 -15px;
}
.chatbody .msg ul li .content .mevoice i {
  float: right;
  margin-right: 5px;
  font-size: 30px;
  transform: rotate(180deg);
}
/* others群聊名字 */
.chatbody .msg ul li .content .membername {
  display: block;
  color: #a3a3a3;
  margin: 3px 0 4px 65px;
  font-size: 13px;
}
.chatbody .msg ul li .content .membername::after {
  content: "";
  position: absolute;
  left: 50px;
  top: 8px;
  z-index: 5;
  width: 15px;
  height: 65px;
  background-color: #f3f3f3;
}
/* others语音内容 */
.chatbody .msg ul li .content .othervoice {
  /* padding: 15px 10px 20px 10px; */
  float: left;
  max-width: 50%;
  width: 80px;
  line-height: 55px;
  height: 55px;
  margin-left: 65px;
  background-color: #fff;
  font-size: 15px;
  border-radius: 2px;
  cursor: pointer;
}
.chatbody .msg ul li .content .othervoice::after {
  content: "";
  position: absolute;
  right: 50px;
  top: 8px;
  width: 0;
  height: 0;
}
.chatbody .msg ul li .content .othervoice p {
  float: right;
  transform: translateX(35px);
  color: #7e7e7e;
  font-size: 17px;
  margin: 0;
}
.chatbody .msg ul li .content .othervoice i {
  float: left;
  margin-left: 5px;
  font-size: 30px;
  /* transform: rotate(180deg); */
}
/* me文件内容 */
.chatbody .msg ul li .content .mefile {
  max-width: 50%;
  float: right;
  margin-right: 65px;
  width: 225px;
  /* line-height: 70px; */
  height: 70px;
  font-size: 15px;
  border-radius: 2px;
  /* padding: 15px 10px 20px 10px; */
  background-color: #ffffff;
  cursor: pointer;
}
.chatbody .msg ul li .content .mefile::after {
  content: "";
  position: absolute;
  right: 51px;
  top: 8px;
  z-index: 5;
  width: 15px;
  height: 65px;
  background-color: #f3f3f3;
  /* width: 0; 跟时间标签冲突改用长柱
  height: 0;
  z-index: 5;
  border: 8px solid #ffffff;
  border-top-color: transparent;
  border-right-color: transparent;
  border-bottom-color: transparent; */
}
.chatbody .msg ul li .content .mefile i {
  float: right;
  margin: 15px;
  font-size: 40px;
}
.chatbody .msg ul li .content .mefile .mefilename {
  margin: 15px 10px 5px;
  font-size: 13px;
  font-weight: 800;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.chatbody .msg ul li .content .mefile .mefilesize {
  margin: 10px;
  font-size: 12px;
  color: #7e7e7e;
}
/* other文件内容 */
.chatbody .msg ul li .content .otherfile {
  max-width: 50%;
  float: left;
  margin-left: 65px;
  width: 225px;
  /* line-height: 70px; */
  height: 70px;
  font-size: 15px;
  border-radius: 2px;
  /* padding: 15px 10px 20px 10px; */
  background-color: #ffffff;
  cursor: pointer;
}
.chatbody .msg ul li .content .otherfile i {
  float: right;
  margin: 15px;
  font-size: 40px;
}
.chatbody .msg ul li .content .otherfile .otherfilename {
  margin: 15px 10px 5px;
  font-size: 13px;
  font-weight: 800;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.chatbody .msg ul li .content .otherfile .otherfilesize {
  margin: 10px;
  font-size: 12px;
  color: #7e7e7e;
}
.chatbody .msg ul li .content .otherfile::after {
  content: "";
  position: absolute;
  left: 50px;
  top: 8px;
  z-index: 5;
  width: 15px;
  height: 65px;
  background-color: #f3f3f3;
}
/* me图片内容 */
.chatbody .msg ul li .content .meimg {
  max-width: 50%;
  float: right;
  margin-right: 65px;
  /* height: 180px; */
  width: 250px;
}
.chatbody .msg ul li .content .meimg img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  float: right;
}
.chatbody .msg ul li .content .meimg .imgbox {
  position: relative;
  float: right;
}
.chatbody .msg ul li .content .meimg i {
  position: absolute;
  width: 40px;
  height: 40px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  color: #fff;
  font-size: 40px;
  opacity: 0.8;
}
.chatbody .msg ul li .content .meimg::after {
  content: "";
  position: absolute;
  right: 50px;
  top: 8px;
  z-index: 5;
  width: 15px;
  height: 65px;
  background-color: #f3f3f3;
}
/* other图片内容 */
.chatbody .msg ul li .content .otherimg {
  /* position: relative; */
  max-width: 50%;
  float: left;
  margin-left: 65px;
  /* height: 180px; */
  width: 250px;
}
.chatbody .msg ul li .content .otherimg .imgbox {
  position: relative;
  float: left;
}
.chatbody .msg ul li .content .otherimg i {
  position: absolute;
  width: 40px;
  height: 40px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  color: #fff;
  font-size: 40px;
  opacity: 0.8;
}
.chatbody .msg ul li .content .otherimg img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  float: left;
}
.chatbody .msg ul li .content .otherimg::after {
  content: "";
  position: absolute;
  left: 50px;
  top: 8px;
  z-index: 5;
  width: 15px;
  height: 65px;
  background-color: #f3f3f3;
}
/* me视频内容 */
.chatbody .msg ul li .content .mevideo {
  max-width: 50%;
  float: right;
  margin-right: 65px;
  /* height: 180px; */
  width: 250px;
}
.chatbody .msg ul li .content .mevideo::after {
  content: "";
  position: absolute;
  right: 50px;
  top: 8px;
  z-index: 5;
  width: 15px;
  height: 65px;
  background-color: #f3f3f3;
}
/* other视频内容 */
.chatbody .msg ul li .content .othervideo {
  max-width: 50%;
  float: left;
  margin-left: 65px;
  /* height: 180px; */
  width: 250px;
}
.chatbody .msg ul li .content .othervideo::after {
  content: "";
  position: absolute;
  left: 50px;
  top: 8px;
  z-index: 5;
  width: 15px;
  height: 65px;
  background-color: #f3f3f3;
}
/* me对话框小三角 */
.chatbody .msg ul li .content .me-img::after {
  content: "";
  position: absolute;
  right: 49px;
  top: 8px;
  width: 0;
  height: 0;
  border: 8px solid #9bccff;
  border-top-color: transparent;
  border-right-color: transparent;
  border-bottom-color: transparent;
}
/* other对话框小三角 */
.chatbody .msg ul li .content .other-img::after {
  content: "";
  position: absolute;
  left: 49px;
  top: 8px;
  width: 0;
  height: 0;
  border: 8px solid rgb(255, 255, 255);
  border-top-color: transparent;
  border-left-color: transparent;
  border-bottom-color: transparent;
}
/*拖拽条 */
#drag {
  width: calc(100% + 64px);
  cursor: n-resize;
  border: 2px solid #e8e8e8;
  position: absolute;
  /* bottom: 334px; */
  bottom: 40vh;
}
/* 发送框 */
.chatbody .send {
  /* margin-bottom: -332px;方案二 */
  /* padding: 0 30px; */
  /* height: 330px; */
  height: 39.9vh;
  width: 100%;
  bottom: 1px;
  position: absolute;
  background-color: #f3f3f3;
  -webkit-user-select: none;
  user-select: none;
}
.chatbody .send .tool-bar {
  height: 50px;
  line-height: 50px;
  background-color: #f3f3f3;
}
.chatbody .send .tool-bar i {
  cursor: pointer;
  margin-left: 15px;
  font-size: large;
  color: #666;
  outline: none;
}
.icon-IPbohao {
  float: right;
}
.icon-shipintonghua {
  float: right;
  margin-right: 15px;
}

/* 按钮 */
.chatbody .send .btn {
  cursor: pointer;
  bottom: 10px;
  right: 20px;
  position: fixed;
  width: 80px;
  height: 26px;
  font-size: 14px;
  font-family: 微软雅黑, serif;
  color: #606060;
  border: 1px solid #e5e5e5;
  background-color: #f5f5f5;
  outline: none;
}
.chatbody .send .btn:hover {
  color: #fff;
  background-color: hsl(211, 100%, 80%);
}
/* 输入框 */
#input {
  box-sizing: border-box;
  padding: 0px 17px 7px 17px;
  background-color: #f3f3f3;
  /* height: 160px; */
  height: 21.5vh;
  overflow-y: auto;
  width: 100%;
  word-wrap: break-word;
  word-break: break-all;
  overflow-x: hidden;
  overflow-y: hidden;
  outline: none;
}
#input:hover {
  overflow-y: overlay;
}
/* 文件 */
.chatbody #input .file {
  cursor: default;
  height: 45px;
  padding: 5px 10px;
  width: 300px;
  position: relative;
  border: 0.5px solid #d0d0d0;
  border-radius: 3px;
}
.chatbody #input .file:hover {
  background: #d0cecd;
}
.chatbody #input .file .el-icon-close {
  position: absolute;
  top: 3px;
  right: 5px;
  cursor: pointer;
  color: #969696;
}
.chatbody #input .file .el-icon-close:hover {
  color: #6b6b6b;
}
.chatbody #input .file .el-icon-document {
  color: #969696;
  font-size: 40px;
  float: left;
}
.chatbody #input .file .info {
  margin-left: 15px;
  font-size: small;
  float: left;
}
.chatbody #input .file .info p {
  margin: 0;
}
.tool-bar >>> .el-tooltip__popper .is-dark {
  background: #d0cecd;
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