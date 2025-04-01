# HTML原型转微信小程序指南

本文档提供了将HTML/CSS/JavaScript原型转换为微信小程序的详细指南，重点介绍了实际操作步骤、规范和注意事项。

## 一、项目概述

本项目是一个服装搭配推荐应用，原始版本使用HTML、CSS和JavaScript开发，现需要将其转换为微信小程序格式，以便在微信生态中运行。

### 图片资源

- 用户头像：`women_32.jpg`, `women_44.jpg`, `men_32.jpg`, `men_36.jpg` 等
- 产品图片：`lv_bag.jpg`, `lv_bag2.jpg` 等
- 背景图片：`dangan.jpg` 等

## 二、转换步骤

### 1. 文件结构转换

HTML项目通常组织为:
```
app/
├── index.html
├── styles/
│   └── main.css
├── scripts/
│   └── main.js
└── images/
    └── *.jpg
```

微信小程序的文件结构应为:
```
miniprogram/
├── app.js        # 全局逻辑
├── app.json      # 全局配置
├── app.wxss      # 全局样式
├── pages/        # 各页面
│   ├── index/    # 首页
│   │   ├── index.js
│   │   ├── index.wxml
│   │   └── index.wxss
│   └── ...
└── images/
    └── *.jpg
```

### 2. HTML 转 WXML

WXML (WeiXin Markup Language) 是微信小程序的标记语言。转换时需注意:

| HTML | WXML |
|------|------|
| `<div>` | `<view>` |
| `<span>` | `<text>` |
| `<img>` | `<image>` |
| `<a>` | `<navigator>` |
| `<input>` | `<input>` |
| `<button>` | `<button>` |

示例转换:

```html
<!-- HTML -->
<div class="container">
  <h1 class="title">今日推荐</h1>
  <div class="outfit">
    <img src="images/outfit.jpg" alt="服装搭配">
    <button onclick="favoriteOutfit()">收藏</button>
  </div>
</div>
```

转换为:

```xml
<!-- WXML -->
<view class="container">
  <text class="title">今日推荐</text>
  <view class="outfit">
    <image src="/images/outfit.jpg" mode="aspectFill"></image>
    <button bindtap="favoriteOutfit">收藏</button>
  </view>
</view>
```

注意事项:
- 事件绑定从`onclick`改为`bindtap`
- 图片的`src`路径需要调整
- 图片添加`mode`属性控制裁剪和缩放行为

### 3. CSS 转 WXSS

WXSS (WeiXin Style Sheets) 是微信小程序的样式语言。主要区别:

1. 支持大多数CSS选择器和属性，但不支持一些高级选择器
2. 引入了`rpx`单位，建议使用它做适配
3. 不支持一些CSS特性，如`position: fixed`的部分用法、某些动画等

示例转换:

```css
/* CSS */
.container {
  width: 100%;
  max-width: 375px;
  margin: 0 auto;
  padding: 15px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}
```

转换为:

```css
/* WXSS */
.container {
  width: 100%;
  padding: 30rpx;
}

.title {
  font-size: 48rpx;
  font-weight: bold;
  text-align: center;
}
```

注意事项:
- 将`px`单位转换为`rpx`，通常1px = 2rpx
- 移除不必要的`max-width`和`margin: 0 auto`等用于居中的样式
- 小程序默认就是单页应用，无需额外的全页面居中样式

### 4. JavaScript 转小程序 JS

微信小程序的JavaScript用法有很大不同:

1. 页面逻辑必须通过`Page()`函数注册
2. 全局逻辑通过`App()`函数注册
3. DOM操作替换为数据绑定和`setData()`方法
4. 事件处理需要定义在`Page()`对象的方法中

示例转换:

```javascript
// JavaScript
document.addEventListener('DOMContentLoaded', function() {
  loadOutfits();
  document.querySelector('.favorite-btn').addEventListener('click', toggleFavorite);
});

function loadOutfits() {
  // 加载服装数据
  fetch('/api/outfits')
    .then(response => response.json())
    .then(data => {
      document.querySelector('.outfit-img').src = data.imageUrl;
    });
}

function toggleFavorite() {
  const btn = document.querySelector('.favorite-btn');
  const isFavorite = btn.classList.contains('active');
  
  if (isFavorite) {
    btn.classList.remove('active');
    alert('已取消收藏');
  } else {
    btn.classList.add('active');
    alert('已添加收藏');
  }
}
```

转换为:

```javascript
// 微信小程序 JS
Page({
  data: {
    outfit: {},
    isFavorite: false
  },
  
  onLoad: function() {
    this.loadOutfits();
  },
  
  loadOutfits: function() {
    // 加载服装数据
    wx.request({
      url: 'https://api.example.com/outfits',
      success: (res) => {
        this.setData({
          outfit: res.data
        });
      }
    });
  },
  
  toggleFavorite: function() {
    const isFavorite = !this.data.isFavorite;
    
    this.setData({
      isFavorite: isFavorite
    });
    
    wx.showToast({
      title: isFavorite ? '已添加收藏' : '已取消收藏',
      icon: 'success'
    });
  }
});
```

注意事项:
- 用`wx.request`代替`fetch`
- 用`this.setData()`代替DOM操作
- 用`wx.showToast()`代替`alert`
- 事件处理函数定义在`Page`对象内

## 三、常见问题与解决方案

### 1. 网络请求

小程序中网络请求有限制：
- 必须使用`wx.request`
- 必须使用HTTPS
- 域名必须在小程序管理后台配置

解决方案：
- 开发时可以临时打开"不校验合法域名"选项
- 上线前必须将API域名添加到小程序管理后台的安全域名列表

### 2. 存储

HTML中常用`localStorage`，小程序中使用:
- `wx.setStorageSync` 和 `wx.getStorageSync` 同步存储
- `wx.setStorage` 和 `wx.getStorage` 异步存储

### 3. 事件绑定

小程序事件绑定有特殊语法:
- `bindtap`而非`onclick`
- `bindinput`而非`oninput`
- 使用`data-*`传递数据，如`data-id="123"`

### 4. 页面导航

小程序页面导航使用API:
- `wx.navigateTo()` 保留当前页面，跳转到新页面
- `wx.redirectTo()` 关闭当前页面，跳转到新页面
- `wx.navigateBack()` 返回上一页
- `wx.switchTab()` 跳转到 tabBar 页面

### 5. 异步操作

小程序中使用回调和Promise处理异步:
- 大多数API都提供success/fail回调选项
- 较新版本支持使用Promise（需在项目设置中启用）

## 四、重要考虑事项

1. **包体积限制**: 小程序主包不能超过2MB，超过须使用分包加载
2. **隐私政策**: 确保符合微信小程序的隐私规范
3. **兼容性**: 针对不同的设备屏幕尺寸和系统版本进行适配
4. **性能优化**: 避免过多的setData操作，合理使用分包和按需加载
5. **rpx单位**: 设计时使用rpx单位实现不同设备的自适应

## 五、参考资源

- [微信小程序官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)
- [小程序设计指南](https://developers.weixin.qq.com/miniprogram/design/)
- [小程序开发者工具下载](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)

通过遵循本指南，你应该能够成功地将HTML原型转换为微信小程序。转换过程中可能需要根据具体项目进行调整和优化。 