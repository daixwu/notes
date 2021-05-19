# 前端缓存应用

## cookie

- 本身用于浏览器和 server 通讯

- 被“借用”到本地存储来

- 可用 document.cookie = "..." 来修改

**cookie 的缺点**：

- 存储大小限制，最大4KB

- 个数限制（各浏览器不同），一般不能超过20个

- 每次都会携带在 HTTP 请求头中，如果使用 cookie 保存过多数据会带来性能问题

- 只能用 document.cookie = "..." 来修改，太过简陋

### [cookie详解](https://blog.csdn.net/playboyanta123/article/details/79464684)

## WebStorage 本地存储

**WebStorage 的目标**:

- 提供一种在cookie之外存储会话数据的路径

- 提供一种存储大量可以跨会话存在的数据的机制

HTML5的 WebStorage 提供了两种API：localStorage（本地存储）和sessionStorage（会话存储），一般用 localStorage 会多些

**作用域的不同**：

不同浏览器无法共享 localStorage 或 sessionStorage 中的信息。相同浏览器的不同页面间可以共享相同的 localStorage（页面属于相同域名和端口），但是不同页面或标签页间无法共享 sessionStorage 的信息。

> 这里需要注意的是，页面及标签页仅指顶级窗口，如果一个标签页包含多个 iframe 标签且他们属于同源页面，那么他们之间是可以共享 sessionStorage 的

**存储大小**：

localStorage 和 sessionStorage 的存储数据大小一般都是：5MB

**存储位置**：

localStorage 和 sessionStorage都保存在客户端，不与服务器进行交互通信

**存储内容类型**：

localStorage 和 sessionStorage 只能存储字符串类型，对于复杂的对象可以使用 ECMAScript 提供的 JSON 对象的 stringify 和 parse 来处理

**获取方式**：

localStorage：`window.localStorage`

sessionStorage：`window.sessionStorage`

**应用场景**：

localStorage：常用于长期登录（+判断用户是否已登录），适合长期保存在本地的数据，而 sessionStorage：敏感账号一次性登录

**WebStorage的优点**：

存储空间更大：cookie为4KB，而WebStorage是5MB

节省网络流量：WebStorage不会传送到服务器，存储在本地的数据可以直接获取，也不会像cookie一样美词请求都会传送到服务器，所以减少了客户端和服务器端的交互，节省了网络流量

对于那种只需要在用户浏览一组页面期间保存而关闭浏览器后就可以丢弃的数据，sessionStorage会非常方便

快速显示：有的数据存储在WebStorage上，再加上浏览器本身的缓存。获取数据时可以从本地获取会比从服务器端获取快得多，所以速度更快

安全性：WebStorage不会随着HTTP header发送到服务器端，所以安全性相对于cookie来说比较高一些，不会担心截获，但是仍然存在伪造问题

WebStorage提供了一些方法，数据操作比cookie方便

`setItem(key, value)` —— 保存数据，以键值对的方式储存信息

`getItem(key)` —— 获取数据，将键值传入，即可获取到对应的value值

`removeItem(key)` —— 删除单个数据，根据键值移除对应的信息

`clear()` —— 删除所有的数据

`key(index)` —— 获取某个索引的key
