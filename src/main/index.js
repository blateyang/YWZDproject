import { app, BrowserWindow, Tray, Menu, ipcMain,dialog,Notification,screen} from 'electron'
// import notifier from 'node-notifier'
// import fs from "fs"  
import path from 'path' 
import '../renderer/store'
// import storage from 'electron-localstorage'
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'
global.sharedObject = {dialogStatus:0};//功能小窗状态
// require('web-frame').setZoomLevelLimits(1, 1);
// var webFrame = require('electron').webFrame; 
// webFrame.setZoomFactor(2);
       
/**     
 * Set `__static` path to static files in production    
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */   
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}
 
let mainWindow, tray = null, trayIcon = null
let childWindow1 = null;
let childWindow2 = null;
let childWindow3 = null;
// 主窗口
const winURL = process.env.NODE_ENV === 'development' 
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`;
  // 多人测试窗口
  const childURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:9080" + "#/drcs"
    : `file://${__dirname}/index.html#/drcs`;
    // 功能弹窗
    const child2URL =
      process.env.NODE_ENV === "development"
        ? "http://localhost:9080" + "#/dialog"
        : `file://${__dirname}/index.html#/dialog`;
        // 通知窗口
        const child3URL =
        process.env.NODE_ENV === "development"
          ? "http://localhost:9080" + "#/notify"
          : `file://${__dirname}/index.html#/notify`;


   
//#region  窗体 
function createWindow() {
  /**  
   * Initial window options
   */       
  // 主窗口 
  mainWindow = new BrowserWindow({
    height: 372,
    useContentSize: true,
    width: 300,
    frame: false,
    // resizable: false,   
    show: false,
    title:"终端",
    icon: path.join(__static, './zd.ico'),
  })
  
  mainWindow.loadURL(winURL)
  //屏蔽窗口菜单（-webkit-app-region:drag）
  mainWindow.hookWindowMessage(278, function (e) { 
  mainWindow.setEnabled(false)
  setTimeout(()=> {mainWindow.setEnabled(true)
  }, 100) 
 return true 
  })
mainWindow.on('ready-to-show', () => {
  mainWindow.show()
    if (process.platform === 'win32') {
    // app.setAppUserModelId("com.example.yourapp");
    app.setAppUserModelId(process.execPath);
  }

})
/***
   * 关闭窗口前提示确认信息
   */
 mainWindow.on('close', (e) => {
  e.preventDefault()//阻止默认行为，一定要有
  dialog.showMessageBox({
    type: 'info',
    title: '终端',
    cancelId:2, //关闭按钮的id
    defaultId: 0,
    noLink:true,  //取消上下排列
    message: '确定要退出吗？',
    buttons: ['最小化到托盘','直接退出']
  },(index)=>{
    if( index == 0) {
      e.preventDefault();		//阻止默认行为，一定要有
      mainWindow.hide();	//调用 隐藏
    } else if(index == 1) {
      mainWindow = null;
      //app.quit();	//不要用quit();试了会弹两次
      app.exit();		//exit()直接关闭客户端，不会执行quit();
    }
  })
  });


// 添加群聊窗口
childWindow1 = new BrowserWindow({
  useContentSize: true,
  modal: true,
  height: 480,
  width: 700,
  resizable: false,//禁止改变主窗口大小，再设置大小就需要使用setContentSize 
  show: false,
  frame: false,
  // titleBarStyle:'hidden-inset',
  // titleBarOverlay: true,remote. 
  parent: mainWindow,
  webPreferences: {
    webSecurity: false,
  },
});
childWindow1.loadURL(childURL);
childWindow1.on('close', (e) => {
  e.preventDefault();
childWindow1.hide()

})
//屏蔽窗口菜单 
childWindow1.hookWindowMessage(278, function (e) {
  childWindow1.setEnabled(false);
  setTimeout(() => {
    childWindow1.setEnabled(true);
  }, 100);
  return true;
});


    //   // 判读是否已经存在子窗口 path.join("file://", __dirname, "../renderer/components/dialog/dialogCenter.vue");
    //     if (childWindow) {
    //       childWindow.hide();
    //     } else {
    //       childWindow = new BrowserWindow({
    //     
    //       });
    //       childWindow.loadURL(childURL);
    // }


    // 会话功能窗口 
    childWindow2 = new BrowserWindow({
      useContentSize: true,
      // modal: true,
      height: 600,
      width: 660,
      resizable: false,//禁止改变主窗口大小，再设置大小就需要使用setContentSize
      show: false,
      frame: false,
      title:"会话",
      icon: path.join(__static, './drcs.ico'),
      // titleBarStyle:'hidden-inset',
      // titleBarOverlay: true,remote.
      // parent: mainWindow, 
      webPreferences: {
        webSecurity: false,
      },
    });
    childWindow2.loadURL(child2URL);
   childWindow2.on('close', (e) => {
      e.preventDefault();

      dialog.showMessageBox({
        type: 'info',
        title: '会话',
        noLink:true,
        message: '是否要关闭会话？',
        buttons: ['确定','取消']
      },(index)=>{
        if( index == 0) {
          e.preventDefault();		//阻止默认行为，一定要有
          childWindow2.hide();	//调用 隐藏.getItem("dialogStatus")
        //  storage.setItem("dialogStatus",9)//第三方模拟localstorage的包
        global.sharedObject.dialogStatus = 0
        } else if(index == 1) {
         
        }
      })

})
//屏蔽窗口菜单 
    childWindow2.hookWindowMessage(278, function (e) {
      childWindow2.setEnabled(false);
      setTimeout(() => {
        childWindow2.setEnabled(true);
      }, 100);
      return true;
    });



    // 通知窗口
   let display = screen.getPrimaryDisplay().workAreaSize;
      let WIDTH = display.width;
      let HEIGHT = display.height; // 减去任务栏的高度    
      this.screenHeight = HEIGHT; 
      const offset = 8;
  
    childWindow3 = new BrowserWindow({
      alwaysOnTop:true,//窗口置顶
      useContentSize: true,
      // modal: true,
      height: 150,
      width: 300,
      x: WIDTH -300 - offset ,      
      y: HEIGHT -150 - offset, 
      resizable: false,//禁止改变主窗口大小，再设置大小就需要使用setContentSize
      show: false,
      frame: false,
      // titleBarStyle:'hidden-inset',
      // titleBarOverlay: true,remote.
      // parent: mainWindow,
      webPreferences: {
        webSecurity: false,
      }, 
    });
    childWindow3.setSkipTaskbar(true)
    // childWindow3.setAlwaysOnTop(true);//窗口置顶
    childWindow3.webContents.closeDevTools();//关闭开发者工具
    childWindow3.loadURL(child3URL);
   childWindow3.on('close', (e) => {
      e.preventDefault();
childWindow3.hide()
})
//屏蔽窗口菜单 
    childWindow3.hookWindowMessage(278, function (e) {
      childWindow3.setEnabled(false);
      setTimeout(() => {
        childWindow3.setEnabled(true);
      }, 100);
      return true;
    });


// 创建图标托盘 
createTray()
}
//#endregion


//#region  主进程监听事件
app.on('ready', createWindow)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
 
//设置任务栏任务菜单
// app.setUserTasks([
//   {
//     program: process.execPath,
//     arguments: '--new-window',
//     iconPath: process.execPath,
//     iconIndex: 0,
//     title: 'New Window',
//     description: 'Create a new window'
//   }
// ])
//#endregion


//#region  托盘图标
//创建图标
const createTray = () => {
  // trayIcon = path.join(__dirname, './');
  trayIcon = path.join(__static, './');
  tray = new Tray(path.join(trayIcon, 'zd.ico'));
  // tray = new Tray(path.join(__static,'./zd.png'))
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '忽略', click: function () {
        trayInit()
      }
    },
    {
      label: '退出', click: function () {
          app.exit()          
      }

    },
    // {
    //   label: '重新启动', click: function () {
    //     // app.relaunch({args: process.argv.slice(1).concat(['--relaunch'])})
    //     // app.exit(0)
    //     app.relaunch()
    //     app.quit()
    //   }
    // }, 
  ])
  tray.on('click', () => {
    mainWindow.show()
    trayInit()
    childWindow3.hide()
  })
  tray.setToolTip('终端')
  tray.setTitle('终端')
  tray.setContextMenu(contextMenu)
  // trayFlashing()
}

let show = false, timer = null;
//图标初始化 ,同时取消闪烁 
const trayInit = () => {
  if (null !== timer) {
    clearInterval(timer)
    timer = null
    tray.setImage(path.join(trayIcon, 'zd.ico'))
  }
} 
//图标闪烁
const trayFlashing = () => {
  timer = setInterval(function () {
    if (show) {
      tray.setImage(path.join(trayIcon, 'zd.ico'))
    } else {
      tray.setImage(path.join(trayIcon, 'zd2.png'))
    }
    show = !show
  }, 600);
}

//#endregion


//#region  主,渲染进程通信
//收到通知
ipcMain.on('new-msg', (event, params) => {
  console.log('收到新消息：', params)
  trayFlashing()  //托盘图标闪烁
  childWindow3.show()//显示通知
  mainWindow.flashFrame(true)//主窗口闪烁
  return true
}) 
//结束通知
ipcMain.on('finish-notify',() => {
  trayInit()//托盘图标重置
  childWindow3.hide()//隐藏通知
  mainWindow.flashFrame(false)//主窗口取消闪烁
})
//退出登陆
ipcMain.on('login-window', () => {
  mainWindow.setContentSize(300, 372)
  mainWindow.center() 
})
//显示添加群聊
ipcMain.on('showdrcs', () => {
  childWindow1.show()
  childWindow1.center()
})

//显示系统通知 部分系统不显示
// ipcMain.on('shownotify', () => {
//   //部分系统不显示，调用第三方插件（node-notifier）正常显示通知
//   // notifier.notify({
//   //   title: '手动测试',
//   //   message: '你收到一条新的消息',
//   //   icon: path.join('static/zd.png'), // Absolute path (doesn't work on balloons)
//   //   sound: true, // Only Notification Center or Windows Toasters
//   //   wait: true // Wait with callback, until user action is taken against notification
//   // }, function (err, response) {
//   //   // Response is response from notification
//   // });
//   // notifier.on('click', function (notifierObject, options) {
//   //   // Triggers if `wait: true` and user clicks notification
//   //   notifier.notify('Message');//点击通知提醒，会再次调用消息通知，如果不需要，请注释掉此行
//   // });


//   //electron的notification模块不起作用
//   //  if (Notification.isSupported()){
//   // console.log('notification is suppoerted')
//   // let myNotification = new Notification({
//   //   // 通知的标题, 将在通知窗口的顶部显示
//   //   title: 'Boss',
//   //   // 通知的副标题, 显示在标题下面 macOS
//   //   subtitle: '重要消息',
//   //   // 通知的正文文本, 将显示在标题或副标题下面
//   //   body: '@所有人 放假！！！',
//   //   // false有声音，true没声音
//   //   silent: false,
//   //   // 通知的超时持续时间 'default' or 'never'
//   // timeoutType: 'default',
//   // })
//   // myNotification.show()
//   // myNotification.onclick = () => {
//   //   console.log('通知被点击')
//   // }
// // }
// })
//#endregion

/** 
 * Auto Updater 自动升级
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */