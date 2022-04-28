export default function(s,d) {
    // console.log("当前id："+s)
    // console.log("上一个id："+d)   
    let inp = document.getElementById("input");
    // console.log("当前文本："+inp.innerText) 
    // 获取当前输入框的文本,判断是否有值
    if(inp.innerText){
          //如果上一个id草稿箱已经存在  把文本存到上一个id
    if(document.getElementById(d)){
        document.getElementById(d).innerText=inp.innerText
        inp.innerText=null
        // console.log("上个id记录的文本1："+document.getElementById(d).innerText) 
    }else {
        // 否则重新创建一个草稿箱，用上一个id赋值方便根据id查找
        let el = document .createElement( 'textarea' ); 
        // 隐藏区域 
        el.setAttribute( 'readonly' , '' ); 
        el.style.position = 'absolute' ; 
        el.style.left = '-9999px' ;
    document .body.appendChild(el); 
    el.id=d
    el.innerText=inp.innerText
    inp.innerText=null
    // console.log("上个id记录的文本2："+el.innerText) 
    }
    } 
  
    // 根据当前id获取对应id草稿箱的文本  把输入框内容替换换
    if(document.getElementById(s)){
        inp.innerText=document.getElementById(s).innerHTML
        // console.log("当前id的草稿箱："+document.getElementById(s).innerHTML) 
    }
  
    
}