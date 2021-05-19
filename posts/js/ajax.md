# Ajax

## 实现简易 Ajax 请求

```js
function ajax(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.onreadystatechange = function() {
      if(xhr.readyState === 4) {
        if(xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText))
        }
      } else if(xhr.status === 404 || xhr.status === 500) {
        reject(new Error('404 not found'))
      }
    }

    xhr.send(null)
    // xhr.send('postData') // post 请求传递参数
  })
}

const url = '/data/test.json'
ajax(url)
  .then(res => console.log(res))
  .catch(err => console.log(err))
```

## 状态码

`xhr.readyState`

- 0 - (未初始化)还没有调用`send()`方法

- 1 - (载入)已调用`send()`方法，正在发送请求

- 2 - (载入完成)`send()`方法执行完成，已经收到全部响应内容

- 3 - (交互)正在解析响应内容

- 4 - (完成)响应内容解析完成，可以在客户端调用

`xhr.status`

- 2xx - 表示成功处理请求，如200

- 3xx - 需要重定向，浏览器直接跳转，如301(永久重定向)、302(临时重定向)、304(资源未改变，缓存相关)

- 4xx - 客户端请求错误，如404(请求地址错误)、403(客户端没权限)

- 5xx - 服务端错误

## 同源策略

- ajax请求时，浏览器要求当前网页和 server必须同源(安全)

- 同源:协议、域名、端口，三者必须一致

**加载图片 CSS  js可无视同源策略**：

- `<img src=跨域的图片地址/ >`  可用于统计打点，可使用第三方统计服务

- `<link href=跨域的css地址/>` 可使用CDN，CDN 一般都是外域

- `<script src=跨域的js地址></script>` 可使用 CDN，可实现 JSONP

## 跨城

- 所有的跨域，都必须经过 server 端允许和配合

- 未经 server端允许就实现跨域，说明浏览器有漏洞，危险信号

**JSONP**：

- `<script>`可绕过跨域限制

- 服务器可以任意动态拼接数据返回

- 所以，`<script>` 就可以获得跨域的数据，只要服务端愿意返回

**CORS-服务器设置 http header**：

```js
// 第二个参数填写允许跨域的名称，不建议直接写 '*'
response.setHeader("Access-Control-Allow-Origin", "http://localhost:8011")
response.setHeader("Access-Control-Allow-Headers", "X-Requested-With")
response.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")

// 接收跨域的 cookie
response.setHeader("Access-Control-Allow-Credentials", "true")
```

实际项目中 ajax 常用插件：[axios](http://axios-js.com/)、[Fetch](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch)

## 存储

### cookie

cookie 本身用于浏览器和 server通讯，被“借用”到本地存储来，可用 `document. cookie=` 来修改。

**cookie的缺点**：

- 存储大小，最大4KB

- http请求时需要发送到服务端，增加请求数据量

- 只能用 document. cookie= ‘…’ 来修改，太过简陋

### localStorage 和 sessionStorage

- HTML5专门为存储而设计，最大可存5M

- API简单易用 setItem getItem

- 不会随着http请求被发送出去

**localStorage 和 sessionStorage 的区别**：

- localStorage数据会永久存储，除非代码或手动删除

- session Storage数据只存在于当前会话，浏览器关闭则清空

- 一般用 localStorage会更多一些
- 