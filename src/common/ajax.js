export default function (option){
    var Method = option.method || "GET"
      var data = option.data || {} // {pageNum:1, pageSize:10}
      var url = option.url   // http://localhost:3000/api/film/getList
      
     if(Method == 'GET'){
      var str = "?"
      for(var key in data){
          str += key + "=" + data[key] + "&" // pageNum=1pageSize=10
      }
      // 切除掉最后一个 & 
      str = str.slice(0,str.length-1)
      url +=str
      }
      // 将参数拼接到URL上
      console.log(url)
      // 1.创建ajax对象
      var xhr = new XMLHttpRequest()
      // 2.建立连接
      xhr.open(Method, url,true)
      // 3.发送请求
      xhr.send()
      // 4.监听数据回来
      xhr.onreadystatechange=function(){
          // xhr.readyState === 4 意味这服务器返回数据
          // xhr.status == 200 服务器返回正确的数据
           if( xhr.readyState === 4 && xhr.status == 200 ){
                
                var res =  JSON.parse(xhr.responseText)
                  option.success(res)
           }
      }
}
