# HTML

## HTML 语义化

简单来说，HTML 语义化就是：根据结构化的内容，选择合适的标签。

直观上很好理解，「合适的标签」是内容表达的高度概括，这样浏览器爬虫或者任何机器在读取 HTML 时，都能更好地理解，进而解析效率更高。这样带来的收益如下：

- 有利于 SEO

- 开发维护体验更好

- 用户体验更好（如使用 alt 标签用于解释图片信息）

- 更好的 accessibility，方便任何设备解析（如盲人阅读器）

### 语义化的发展和高级玩法

Microformats，翻译为微格式，是 HTML 标记某些实体的小模式，这些实体包括人、组织、事件、地点、博客、产品、评论、简历、食谱等。它们是在 HTML 中嵌套语义的简单协议，且能迅速地提供一套可被搜索引擎、聚合器等其他工具使用的 API。

除了 hCard 和 hCalendar，有好几个库特别开发了微格式。

## BFC 背后的布局问题

BFC 是 Block Formatting Context 的简写，我们可以直接翻译成「块级格式化上下文」。它会创建一个特殊的区域，在这个区域中，只有 block box 参与布局。而 BFC 的一套特点和规则就规定了在这个特殊的区域中如何进行布局，如何进行定位，区域内元素的相互关系和相互作用。这个特殊的区域不受外界影响。

上面提到了 block box 的概念，block box 是指 display 属性为 block、list-item、table 的元素。

顺便插一个问题：那你还知道其他哪些 box 类型呢？

相应地，我们有 inline box，它是指 display 属性为 inline、inline-block、inline-table 的元素。CSS3 规范中又加入了 run in box，这里我们不再展开。

### 如何形成 BFC

- 根元素或其他包含它的元素

- 浮动元素 (元素的 float 不是 none)

- 绝对定位元素 (元素具有 position 为 absolute 或 fixed)

- 内联块 (元素具有 display: inline-block)

- 表格单元格 (元素具有 display: table-cell，HTML 表格单元格默认属性)

- 表格标题 (元素具有 display: table-caption, HTML 表格标题默认属性)

- 具有 overflow 且值不是 visible 的块元素

- display: flow-root 的元素

- column-span: all 的元素

### BFC 决定了什么

- 内部的 box 将会独占宽度，且在垂直方向，一个接一个排列

- box 垂直方向的间距由 margin 属性决定，但是同一个 BFC 的两个相邻 box 的 margin 会出现边距折叠现象

- 每个 box 水平方向上左边缘，与 BFC 左边缘相对齐，即使存在浮动也是如此

- BFC 区域不会与浮动元素重叠，而是会依次排列

- BFC 区域内是一个独立的渲染容器，容器内元素和 BFC 区域外元素不会形成任何干扰

- 浮动元素的高度也参与到 BFC 高度的计算当中

## 元素水平垂直居中

### 仅适用于居中元素定宽高

- absolute + 负 margin

```css
.wp {
  position: relative;
}

.box {
  position: absolute;;
  top: 50%;
  left: 50%;
  margin-left: -50px;
  margin-top: -50px;
}
```

- absolute + margin auto

```css
.wp {
  position: relative;
}

.box {
  position: absolute;;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}
```

这种方式将设置各个方向的距离都是 0，此时配合 margin 为 auto，就可以在各个方向上居中了。

- absolute + calc

```css
.root {
  position: relative;
}

.textBox {
  position: absolute;;
  top: calc(50% - 50px);
  left: calc(50% - 50px);
}
```

### 居中元素不定宽高

- absolute + transform

不定宽高时，利用 CSS3 新增的 transform，transform 的 translate 属性也可以设置百分比，这个百分比是相对于自身的宽和高，因此可以将 translate 设置为 ﹣50%：

```css
.wp {
  position: relative;
}

.box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

- lineheight

把 box 设置为行内元素，通过 text-align 也可以做到水平居中，同时通过 vertical-align 做到垂直方向上的居中，代码如下：

```css
.wp {
  line-height: 300px;
  text-align: center;
  font-size: 0px;
}

.box {
  font-size: 16px;
  display: inline-block;
  vertical-align: middle;
  line-height: initial;
  text-align: left; /* 修正文字 */
}
```

- table

其实历史上 table 经常被用来做页面布局，这么做的缺点是会增加很多冗余代码，并且性能也不友好。不过处理居中问题，它可是能手：

```css
.wp {
  text-align: center;
}

.box {
  display: inline-block;
}
```

- css-table

如何使用 table 布局的特性效果，但是不采用 table 元素呢？答案是 css-table：

```css
.wp {
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}

.box {
  display: inline-block;
}
```

我们使用了 display: table-cell，同时和 table 布局相比，减少了很多冗余代码。

- flex

flex 是非常现代的布局方案，只需几行代码就可以优雅地做到居中：

```css
.wp {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

- grid

grid 布局非常超前，虽然兼容性不好，但是能力超强：

```css
.wp {
  display: grid;
}

.box {
  align-self: center;
  justify-self: center;
}
```

我们总结一下：

- PC 端有兼容性要求，宽高固定，推荐 absolute + 负 margin

- PC 端有兼容要求，宽高不固定，推荐 css-table

- PC 端无兼容性要求，推荐 flex

- 移动端推荐使用 flex
