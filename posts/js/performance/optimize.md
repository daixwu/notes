# 性能优化

前端性能涉及方方面面，优化角度切入点都有所不同。我认为，主要可以分为：页面工程优化和代码细节优化两大方向。

页面工程优化从页面请求开始，涉及网络协议、资源配置、浏览器性能、缓存等；代码细节优化上相对零散，比如 JavaScript 对 DOM 操作，宿主环境的单线程相关内容等。

也正如上所答，本节课程也会基于以下两个大方向的相关知识进行梳理：

- 页面工程优化

- 代码细节优化

## 页面工程优化

### WebP 图片优化

我们的产品页面中，往往存在大量的图片内容，因此图片的性能优化是瓶颈和重点。除了传统的图片懒加载手段以外，我调研并实施了 WebP 图片格式的替换。由于可能会有潜在兼容性的问题，因而具体做法是先进行兼容性嗅探。这一手段借鉴了社区一贯做法，利用 img 标签加载一张 base64 的 WebP 图片，并将结果存入 localStorage 中防止重复判断。如果该终端支持，则再对图片格式进行替换。这个兼容性嗅探过程，也封装成 promise 化的通用接口。

相关代码片段如下：

```js
const supportWebp = () => new Promise(resolve => {
  const image = new Image()
  image.onerror = () => resolve(false)
  image.onload = () => resolve(image.width === 1)
  image.src = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA='
}).catch(() => false)
```

### 按需加载优化

### 图片懒加载

### 雪碧图

### 合理设置缓存策略

### 使用 prefetch / preload 预加载等新特性

### 以 tree shaking 手段为主的代码瘦身

## 代码细节优化

### 动画性能方向

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

### 操作 DOM 方向

### 浏览器加载、渲染性能方向

### 性能测量、监控方向
