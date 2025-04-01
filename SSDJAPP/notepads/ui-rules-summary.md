# 移动界面UI元素规则总结

## 基本原则

所有UI元素必须始终保持在手机界面内部（iPhone容器内），不得超出边界。

## 通知类UI元素规则

1. **系统通知**: 
   - 必须在手机界面内部显示
   - 应位于底部导航栏上方（bottom: 80px）
   - 必须通过JavaScript动态添加到当前活动的屏幕容器中
   - 统一使用`showSystemNotification`函数处理

2. **Toast提示**:
   - 应在手机界面中心位置显示
   - 短暂显示后自动消失
   - 不应阻碍用户交互

3. **弹窗对话框**:
   - 居中显示在手机界面内部
   - 带有合适的阴影和背景模糊效果
   - 提供明确的关闭方式

## 文本提示规则

1. **帮助提示文本**: 
   - 提示气泡不得超出手机屏幕边界
   - 当靠近边缘时应自动调整位置
   - 确保提示箭头正确指向触发元素

2. **输入提示**:
   - 应显示在输入框附近且不超出屏幕边界
   - 颜色对比度符合可读性要求

## 样式规则

1. **交互按钮**:
   - 高度至少44px（符合人手指点击的最小尺寸）
   - 有明确的交互状态反馈
   
2. **图标和文字**:
   - 文字大小不小于12px
   - 图标足够清晰可辨识

## 使用JavaScript确保元素位置正确的技巧

```javascript
// 查找当前活动的iPhone容器
const activeContainer = document.querySelector('.iphone-container:not([style*="display: none"])');

// 查找当前活动的屏幕
const activeScreen = activeContainer.querySelector('.container:not([style*="display: none"])');

// 将UI元素添加到活动屏幕
activeScreen.appendChild(yourUIElement);
```

## 常见错误

1. ❌ 将通知、提示添加到body而非iPhone容器内
2. ❌ 使用固定位置而非相对于当前活动屏幕
3. ❌ 忽略不同屏幕尺寸和方向变化
4. ❌ 元素定位超出手机界面范围

## 测试提示

每次修改后，务必在不同状态下测试UI元素表现:
- 不同屏幕（首页、衣橱、上传页面等）
- 不同操作（点击、滑动、切换）
- 同时触发多个UI元素时的堆叠顺序 