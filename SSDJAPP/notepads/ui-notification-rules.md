# 手机界面中通知系统的规则与解决方案

## 问题描述

在移动应用原型中，必须确保所有的通知、提示和反馈信息都显示在手机界面内部，而不是外部。这包括：
- 系统通知（如"已启用个性化搭配推荐模式"、"已启用家庭统一风格搭配模式"）
- Toast提示
- 帮助提示文本

## 解决方案

### 系统通知

系统通知必须按照以下规则实现：

1. **DOM结构**:
   - 通知容器必须动态创建并添加到当前活动的iPhone容器内部
   - 必须使用JavaScript找到当前活动的屏幕容器，而不是简单地添加到body

2. **CSS样式**:
   - 通知容器使用绝对定位：`position: absolute`
   - 通知位置应设置在底部导航栏上方：`bottom: 80px`
   - 容器宽度应为100%：`width: 100%`
   - 使用居中对齐：`display: flex; justify-content: center; align-items: center`
   - 使用较高的z-index确保通知显示在其他UI元素上方：`z-index: 1000`

3. **JavaScript实现**:
   - 必须首先查找当前活动的iPhone容器：`.iphone-container:not([style*="display: none"])`
   - 再找到活动屏幕：`.container:not([style*="display: none"])`
   - 动态创建通知元素，并将它添加到活动屏幕中
   - 处理多个通知以避免叠加

### 重要代码片段

#### CSS 样式

```css
.notification-container {
    position: absolute;
    bottom: 80px;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    pointer-events: none;
}

.system-notification {
    max-width: 90%;
    width: auto;
    background-color: rgba(0, 0, 0, 0.8);
    color: #FFF;
    padding: 10px 16px;
    border-radius: 20px;
    display: none;
    align-items: center;
    justify-content: space-between;
    transform: translateY(20px);
    opacity: 0;
    transition: transform 0.3s ease, opacity 0.3s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    pointer-events: auto;
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
}
```

#### JavaScript 实现

```javascript
function showSystemNotification(message) {
    // 查找iPhone容器
    const iPhoneContainer = document.querySelector('.iphone-container:not([style*="display: none"])');
    if (!iPhoneContainer) {
        console.error('无法找到iPhone容器');
        return;
    }
    
    // 查找活动屏幕
    const activeScreen = iPhoneContainer.querySelector('.container:not([style*="display: none"])');
    if (!activeScreen) {
        console.error('无法找到活动屏幕');
        return;
    }
    
    // 查找或创建通知容器
    let notificationContainer = activeScreen.querySelector('.notification-container');
    if (!notificationContainer) {
        // 创建新的通知容器
        notificationContainer = document.createElement('div');
        notificationContainer.className = 'notification-container';
        activeScreen.appendChild(notificationContainer);
        
        // 创建系统通知元素
        const systemNotification = document.createElement('div');
        systemNotification.id = 'systemNotification';
        systemNotification.className = 'system-notification';
        
        // 创建通知文本和关闭按钮
        const notificationText = document.createElement('span');
        notificationText.className = 'notification-text';
        
        const closeButton = document.createElement('button');
        closeButton.className = 'notification-close';
        closeButton.textContent = '×';
        closeButton.onclick = hideSystemNotification;
        
        // 组装通知元素
        systemNotification.appendChild(notificationText);
        systemNotification.appendChild(closeButton);
        notificationContainer.appendChild(systemNotification);
    }
    
    // 设置通知内容并显示
    const systemNotification = notificationContainer.querySelector('#systemNotification');
    const notificationText = systemNotification.querySelector('.notification-text');
    
    if (systemNotification && notificationText) {
        notificationText.textContent = message;
        systemNotification.style.display = 'flex';
        
        setTimeout(() => {
            systemNotification.classList.add('active');
        }, 10);
    }
}
```

## 注意事项

1. 保持一致的通知方式：所有通知都应使用相同的方法（showSystemNotification）而不是混用不同的通知方式
2. 每次改动后，务必测试不同场景下的表现
3. 不要使用固定的通知标记，而是根据当前活动的屏幕动态创建
4. 千万不要将通知添加在手机界面之外（即iPhone容器外部）
5. 根据通知内容调整样式，但保持整体一致性

## 样式对比

✅ **正确**：通知在手机界面内部，位于底部导航栏上方
❌ **错误**：通知出现在手机界面外部，或者被导航栏遮挡

记住：任何UI元素都必须保证在手机界面内部显示，这样才能提供真实的移动应用体验。 