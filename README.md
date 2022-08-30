

## 文字特效

文字特效的能力，本质上可以视为多层不同效果文字的叠加，使用 text-fill、text-stroke、background-clip等 CSS 属性加上多个元素重叠和偏移来形成特效的效果。
注意：文字特效的优先级会高于 color 和 shadow，当文字包含特效时，color 和 shadow 的值会被忽略不再生效。所以当文字是渐变的时候，不能使用 shadow 来生成阴影。
多个元素重叠意味着同一个元素有多组上述的属性，此时使用数组表示即可。


利用 h1 元素、 `h1::before` 和 `h1::after` 两个伪元素实现三层字体的嵌套。
使用 `text-stroke` 实现文本描边效果，`text-stroke` 属性是向内填充，设置的像素如果很大，就会把字给挡住。
最后使用 `z-index` 属性设置上述三个元素的堆叠顺序。

text-stroke是居中描边的。
text-stroke只有两个属性合并：text-stroke-width和text-stroke-color.就是描边的颜色和宽度。
text-shadow的属性可以不断叠加，但是text-stroke则不可以，如果想要实现多重描边效果，可以借助伪元素多层叠加模拟。


##  文字基础信息 + 文字特效

```
class textElement {
  // 特效文字
  type: 'effectText',
  config: {
    // 水平方向对齐
    align: 'left' | 'right' | 'center',
    // 垂直方向对齐
    verticalAlign: 'top' | 'middle' | 'bottom',
    // 文本大小
    fontSize?: number,
    // 字体
    fontFamily?: string,
    // 字号
    fontWeight?: number,
    // 字体样式，正常或斜体
    fontStyle?: 'normal' | 'italic',
    // 字体颜色
    color?: string,
    // 阴影颜色
    shadowColor?: string,
    // 阴影偏移，分别对应 x, y
    shadowOffset?: [number, number],
    // 阴影模糊半径
    shadowBlur?: number,
    // 文字样式
    textDecoration?: 'none' | 'line-through' | 'underline',
    
    // 数组里面可以做文字模版，数组里面每个元素定义一个独立样式的文字,属性没有定义，则会使用上面定义的全局属性。
    contents: {
      text: string, // 文字
      fontSize?: number,
      fontWeight?: number,
      fontFamily?: string,
      fontStyle?: 'normal' | 'italic',
      color?: string,
      shadowColor?: string,
      shadowOffset?: [number, number],
      shadowBlur?: number,
      textDecoration?: 'none' | 'line-through' | 'underline'
    }[],

    //样式特效数组
    effects: {
      // 文字填充色, text-fill 除了 CSS 颜色，还支持 linear-gradient，url 函数, 当 textFill 为一张图片时，将使用 background-clip 来实现
      fill: string,
      // 文字描边宽度, text-stroke-width
      strokeWidth: string,
      // 文字描边颜色, text-stroke-color
      stroke: string,
      // 特效偏移值, offset
      offset: [number, number]
    }[]
  }
}

// 渐变与描边 demo
{
  type: 'effectText',
​
  width: 580,
  height: 126,
  left: 0,
  top: 0,
​
  contents: [{
    fontSize: 48,
    fontWeight: 700,
    fontFamily: 'sans-serif',
    fontStyle: 'normal',
    text: '渐变与描边'
  }],
  effects: [{
    strokeWidth: 16,
    stroke: '#000',
    offset: [0, 0],
    fill: 'linear-gradient(0deg, rgb(255, 142, 193) 4%, rgb(255, 152, 185) 14%, rgb(255, 142, 193) 30%,rgb(255, 188, 156) 45%, rgb(255, 234, 119) 73%,rgb(255, 234, 119) 85%)'
  }]
}

// 不同文字包含不同样式 demo
{
  type: 'effectText',
​
  width: 352,
  height: 40,
  left: 0,
  top: 0,
​
  fontSize: 32,
  fontFamily: 'aria',
  color: '#000',
​
  content: [{
    text: '不同文字'
  }, {
    text: '包含',
    color: '#ff0000',
    fontSize: 48
  }, {
    text: '不同',
  }, {
    text: '样式',
    fontStyle: 'italic'
  }],
}
``` 

## 效果实现

- 纹理 ❌
- 渐变 ✅
  - 单渐变 ✅
  - 多重渐变 ✅
- 描边 ✅
  - 单描边 ✅
  - 多重描边（伪元素::before ::after 实现）✅
  - 多重描边（外描边是圆形）❌
- 阴影 ✅
- 发光（阴影实现）✅
- 底纹（图片实现）✅

注意：渐变+阴影 效果❌，多重描边+阴影 效果❌

- 渐变 + 描边 ✅
- 渐变 + 阴影 ❌
- 渐变 + 发光 ✅
- 描边 + 阴影 ✅
- 描边 + 发光 ✅
- 阴影 + 发光 ✅
- 多重描边（最多3重）+ 阴影 ❌

### 渐变

```
// 3行代码， 注意3个属性的顺序

background-image: linear-gradient(to right, red, blue);
-webkit-background-clip: text;
color: transparent;
```

1、给背景设置渐变色 [css3 渐变](https://www.runoob.com/css3/css3-gradients.html)
background-image 设置为渐变色，当然也可以简写 background。

2、规定背景的绘制区域 [background-clip](https://www.w3school.com.cn/cssref/pr_background-clip.asp)
background-clip 属性， background-clip: border-box|padding-box|content-box;

3、让文字为透明色，背景色透出
color: transparent

4、多重渐变 linear-gradient 逗号拼接
linear-gradient(0deg, rgb(255, 142, 193) 4%, rgb(255, 152, 185) 14%, rgb(255, 142, 193) 30%,rgb(255, 188, 156) 45%, rgb(255, 234, 119) 73%,rgb(255, 234, 119) 85%);

### 描边

```
// 2行代码
-webkit-text-stroke-color: blue;
-webkit-text-stroke-width: 4px;

```
text-stroke只有两个属性合并：text-stroke-width和text-stroke-color，就是描边的颜色和宽度。

注意：text-stroke是居中描边的。text-stroke 属性是向内填充，设置的像素如果很大，就会把字给挡住。

### 阴影

```
// 1行代码

text-shadow: 4px 4px #fff, 8px 8px 3px green;
```

text-shadow的属性可以不断叠加，跟background-image 一致。


## 字体库
在 [Google Fonts](https://fonts.google.com/) 找到字体，[Google Fonts 使用教程](https://www.zhihu.com/question/19578734)

1、增加 HTML link

```
<link href="https://fonts.googleapis.com/css2?family=Nosifer&display=swap" rel="stylesheet">
```

2、设置 css 代码即可

```
body {
    font-family: 'Nosifer', cursive;
}
```

## 参考练习

https://juejin.cn/post/7084551440231825421
https://segmentfault.com/a/1190000039362755