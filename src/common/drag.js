import Vue from 'vue';
 
// v-dialogDrag: 弹窗拖拽
Vue.directive('dialogDrag', {
  bind(el, binding, vnode, oldVnode) {
    // 获取拖拽内容头部
    const dialogHeaderEl = el.querySelector('.el-dialog__header');
    // 获取拖拽内容整体 
    const dragDom = el.querySelector('.el-dialog');
    dialogHeaderEl.style.cursor = 'move';
 
    // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
    const sty = dragDom.currentStyle || window.getComputedStyle(dragDom, null);
 
    // 鼠标按下事件
    dialogHeaderEl.onmousedown = (e) => {
      // 鼠标按下，计算当前鼠标在拖拽元素可视距离的方位
      const disX = e.clientX - dragDom.offsetLeft;
      const disY = e.clientY -  dragDom.offsetTop;
    //   console.log("元素距离左边位置 offsetTop："+dragDom.offsetTop)
      // 获取到的值带px 正则匹配替换  

    //   let styL, styT;
      // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
    //   if (sty.left.includes('%')) {
    //     styL = +document.body.clientWidth * (+sty.left.replace(/\%/g, '') / 100);
    //     styT = +document.body.clientHeight * (+sty.top.replace(/\%/g, '') / 100);
    //   } else {
    //     styL = +sty.left.replace(/\px/g, '');
    //     styT = +sty.top.replace(/\px/g, '');
    //   };
 
      // 鼠标拖拽事件
      document.onmousemove = function (e) {
        e.preventDefault();
        // 通过事件委托，计算拖拽元素距离整个可视区域的距离，即拖拽元素的x，y的0点。
        const l = e.clientX - disX;
        const t = e.clientY - disY;

        let finallyL = l  
        let finallyT = t 
        // console.log("元素距离左边偏移的位置 styL："+styL)
        console.log("移动距离 t："+t)
        console.log("最终元素的位置 finallt："+finallyT)   
        console.log("鼠标距离边x距离 e.client："+e.clientY)  
        console.log( "鼠标在拖拽元素的位置 dist："+disY)      
        console.log("----------")
        // 边界值判定 注意clientWidth scrollWidth区别 要减去之前的top left值
        // dragDom.offsetParent表示弹窗阴影部分
        if (finallyL < 100) {
          finallyL = 100
        } else if (finallyL > dragDom.offsetParent.clientWidth - dragDom.clientWidth - dragDom.offsetParent.offsetLeft) {
          finallyL = dragDom.offsetParent.clientWidth - dragDom.clientWidth - dragDom.offsetParent.offsetLeft
        }

        if (finallyT < 0) {
          finallyT = 0
        } else if (finallyT > dragDom.offsetParent.clientHeight - dragDom.clientHeight - dragDom.offsetParent.offsetLeft) (
          finallyT = dragDom.offsetParent.clientHeight - dragDom.clientHeight - dragDom.offsetParent.offsetLeft
        )
 
        // 移动当前元素，这里赋值的位置是相对拖拽元素的父元素，不是可视区域
        dragDom.style.left = `${finallyL}px`;
        dragDom.style.top = `${finallyT}px`;
 
        //将此时的位置传出去
        //binding.value({x:e.pageX,y:e.pageY})
      };
 
      document.onmouseup = function (e) {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    }
  }
})