const { remote } = require('electron');
const { Menu, MenuItem } = remote;
import Vue from 'vue';
let x, y;
// var el = window.document.body;
window.document.body.onmouseup = function (event) {
    // el = event.target.nodeName;
    x = event.clientX;
    y = event.clientY;
    // console.log(event)
}
export default function (type, e) {
    console.log("右键事件")
    console.log(e)
    console.log(type)
    // console.log(this)
    // console.log(e.offsetX)
    // console.log(e.offsetY)
    const that = this
    // const menu2 = new Menu();
    let listmenu = [{
        label: '删除',
        click: function () {
            console.log('item：' + e + "__" + that)
            // that.removeItem(e)
            that.$emit('deleteIndex', e);
        }
    },
    ]
    let chatmenu = [{
        label: '复制',
        click: function () {
            // console.log('复制的内容：'+e)
            //根据点击位置获取元素
            var obj = document.elementFromPoint(x, y);
            // console.log(obj.parentNode.className)
            //判断上一级元素的名字是否为消息框
            if( obj.parentNode.className=="content") {
                 selectText(obj)
            }else{
                //否则只是局部元素只会复制一部分，选择上一级元素代入
                selectText( obj.parentNode)                    
            }
        }
    },
        // {
        //     label: '剪切',
        //     role: 'cut',
        // },
    ]
    let inpmenu = [{
        label: '粘贴',
        role: 'paste',
    },]
    let menu = Menu.buildFromTemplate(listmenu);
    let menu2 = Menu.buildFromTemplate(chatmenu);
    let menu3 = Menu.buildFromTemplate(inpmenu);
    // const menu = new Menu();
    // menu.append(new MenuItem({label:'撤销', role: 'undo' }));
    //    menu.popup({window: remote.getCurrentWindow()})
    // console.log("监听1："+e)
    // window.addEventListener('contextmenu', (e) => {
    //     e.preventDefault();      
    //     console.log("监听2："+e)
    // }, false)

    switch (type) {
        case 1: menu.popup({ window: remote.getCurrentWindow() }); break;
        case 2: menu2.popup({ window: remote.getCurrentWindow() }); break;
        case 3: menu3.popup({ window: remote.getCurrentWindow() }); break;
    }
    // function delHtmlTag(str) {
    //     let e = str.replace(/<[^>]+>/g, "");
    //     e.replace(/&lt;/g, "<");
    //     return e.replace(/&nbsp;/g, " ");
    // }

    //选择内容复制
    function selectText(text) {
        // var text = document.getElementById(element);
        if (document.body.createTextRange) {
            var range = document.body.createTextRange();
            range.moveToElementText(text);
            range.select();
            document.execCommand('copy');
            // console.log("ok1")
        } else if (window.getSelection) {
            var selection = window.getSelection();
            var range = document.createRange();
            range.selectNodeContents(text);
            selection.removeAllRanges();
            selection.addRange(range);
            document.execCommand('copy');
            // console.log("ok2")
            /*if(selection.setBaseAndExtent){
                selection.setBaseAndExtent(text, 0, text, 1);
            }*/
        } else {
            console.log("error")
        }
    }
    // let demo = document.getElementsByClassName("cp-group"); 
    // demo.oncontextmenu = function(e) {
    //     e.preventDefault();
    //     // 执行代码块
    //     console.log(this)
    // }

}
