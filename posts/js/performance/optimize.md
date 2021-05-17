# 性能优化

## 网页加载过程

1、 加载过程

1. DNS解析: 域名 -> IP地址

2. 浏览器根据IP地址向服务器发起http请求

3. 服务器处理http请求，并返回给浏览器

2、 渲染过程

1. 根据HTML代码生成 DOM Tree

2. 根据CSS代码生成 CSSOM（CSS Object Mode）

3. 将 DOM Tree和 CSSOM整合生成 Render tree

4. 根据 Render tree渲染页面

5. 遇到`<script>`则暂停渲染，优先加载并执行Js代码，完成再继续

6. 直至把 Render tree 渲染完成

3、 `window.onload` 和 `DOMContentLoaded`

```js
window.addEventListener('load', function () {
  // 页面的全部资源加载完才会执行，包括图片、视频等
})

document.addEventListener('DOMContentLoaded', function () {
  // DOM 渲染完即可执行，此时图片、视频还可能没有加载完
})
```

## 前端性能优化

前端性能涉及方方面面，优化角度切入点都有所不同。我认为，主要可以分为：页面工程优化和代码细节优化两大方向。

页面工程优化从页面请求开始，涉及网络协议、资源配置、浏览器性能、缓存等；代码细节优化上相对零散，比如 JavaScript 对 DOM 操作，宿主环境的单线程相关内容等。

### 让加载更快

- 减少资源体积：代码压缩、以 tree shaking 手段为主的代码瘦身、优先选择 WebP 格式、按需加载

- 减少访问次数：合并代码、使用雪碧图、base64、SSR服务器端渲染、缓存

- 优化网络链接：使用CDN、静态资源分域存放、DNS预解析

### 让渲染更快

- CSS 放在 head， JS 放在 body 最下面

- 尽早开始执行 JS， 用 DOMContentLoaded 触发

- 懒加载（图片懒加载，上滑加载更多）

- 对 DOM 查询进行缓存

- 频繁 DOM 操作，合并到一起插入 DOM 结构

- 节流 throttle 防抖 debounce（让渲染更加流畅）

- 使用 prefetch / preload 预加载等新特性

## 动画性能方向

如果发现页面动画效果卡顿，你会从哪些角度解决问题？

首先从动画实现入手：

- 一般 CSS3 动画会比基于 JavaScript 实现的动画效率要高，因此优先使用 CSS3 实现效果（这一点并不绝对）

- 在使用 CSS3 实现动画时，考虑开启 GPU 加速（这一点也并不总是正向效果）

- 优先使用消耗最低的 transform 和 opacity 两个属性

- 使用 will-change 属性

- 独立合成层，减少绘制区域

- 对于只能使用 JavaScript 实现动画效果的情况，考虑 requestAnimationFrame、requestIdleCallback API

- 批量进行样式变换，减少布局抖动

事实上，上面每一点的背后都包含着很多知识点，例如：

- 如何理解 requestAnimationFrame 和 60 fps

- 如何实现 requestAnimationFrame polyfill

- 哪些操作会触发浏览器 reflow（重排）或者 repaint（重绘）

- 对于给出的代码，如何进行优化

- 如何实现滚动时的节流、防抖函数
