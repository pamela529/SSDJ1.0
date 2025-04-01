# 首页CSS样式

以下是智能衣橱应用首页的关键CSS样式，确保应用的外观和交互效果正常运行。这些样式需要保持不变，以确保应用的功能正常运行。

## iPhone 容器

```css
.iphone-container {
    position: relative;
    width: 375px;
    height: 812px;
    background-color: white;
    border-radius: 40px;
    overflow: hidden;
    margin: 20px auto;
    box-shadow: 0 12px 24px rgba(0,0,0,0.1);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}

.iphone-notch {
    position: absolute;
    top: 0;
    width: 100%;
    height: 44px;
    background-color: #000;
    z-index: 100;
}

.iphone-container::before {
    content: '';
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 150px;
    height: 24px;
    background-color: #000;
    border-radius: 0 0 18px 18px;
    z-index: 101;
}

.iphone-container::after {
    content: '';
    position: absolute;
    top: 15px;
    right: 90px;
    width: 12px;
    height: 12px;
    background-color: #222;
    border-radius: 50%;
    z-index: 102;
}

.iphone-home-indicator {
    position: absolute;
    bottom: 8px;
    left: 50%;
    transform: translateX(-50%);
    width: 134px;
    height: 5px;
    background-color: #000;
    border-radius: 2.5px;
    z-index: 100;
}

.container {
    position: relative;
    width: 100%;
    height: calc(100% - 44px);
    margin-top: 44px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background-color: #F7F7F7;
}
```

## 首页顶部样式

```css
.header {
    padding: 12px 16px;
    background-color: #F7F7F7;
    border-bottom: 1px solid #E5E5EA;
    display: flex;
    flex-direction: column;
    gap: 12px;
    position: relative;
    z-index: 10;
}

.title-weather {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
}

h1 {
    font-size: 24px;
    font-weight: 700;
    color: #1D1D1F;
    margin: 0;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
}

.login-button {
    display: flex;
    align-items: center;
    background-color: #F2F2F7;
    border-radius: 20px;
    padding: 6px 12px;
    gap: 6px;
    cursor: pointer;
    transition: all 0.2s ease;
    border: none;
    background-size: cover;
    background-position: center;
}

.login-button:hover {
    background-color: #E5E5EA;
}

.login-button:active {
    transform: scale(0.95);
}

.login-button.logged-in {
    width: 36px;
    height: 36px;
    padding: 0;
    border-radius: 50%;
}

.login-text {
    font-size: 14px;
    color: #007AFF;
}

.login-icon-default {
    display: flex;
    align-items: center;
    justify-content: center;
}

.login-button:hover .login-text {
    color: #0062CC;
}

.login-button:hover .login-icon-default {
    opacity: 0.8;
}

.login-button.logged-in .login-text,
.login-button.logged-in .login-icon-default {
    display: none;
}

@keyframes pulse {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.05);
    }
    100% {
        transform: scale(1);
    }
}

.login-button.animate {
    animation: pulse 1s infinite;
}

.weather-info {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 14px;
    color: #8E8E93;
    margin-left: auto;
}
```

## 身份选择器和家庭选项

```css
.identity-selector-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 4px;
    margin-bottom: 4px;
    position: relative;
}

.identity-selector {
    position: relative;
    width: 100px;
}

.identity-selector select {
    appearance: none;
    background-color: #F2F2F7;
    border: none;
    border-radius: 8px;
    padding: 8px 28px 8px 12px;
    font-size: 14px;
    color: #1D1D1F;
    width: 100%;
    cursor: pointer;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8L2 4h8z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 8px center;
}

.identity-selector select:focus {
    outline: none;
}

.family-option {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #1D1D1F;
    background-color: #F2F2F7;
    border-radius: 8px;
    padding: 6px 12px;
    cursor: pointer;
    user-select: none;
    position: relative;
}

.family-option input[type="checkbox"] {
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 4px;
    border: 1px solid #C7C7CC;
    background-color: white;
    margin-right: 8px;
    position: relative;
    cursor: pointer;
}

.family-option input[type="checkbox"]:checked {
    background-color: #007AFF;
    border-color: #007AFF;
}

.family-option input[type="checkbox"]:checked::after {
    content: '';
    position: absolute;
    top: 3px;
    left: 7px;
    width: 4px;
    height: 9px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
}

.family-option .help-icon {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: #E5E5EA;
    color: #8E8E93;
    font-size: 12px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-left: 6px;
    position: relative;
}

.family-text {
    margin-right: 4px;
    user-select: none;
    margin-top: 1px;
}

.help-tooltip {
    visibility: hidden;
    position: absolute;
    bottom: 22px;
    left: 50%;
    transform: translateX(-50%);
    width: 220px;
    background-color: rgba(0,0,0,0.75);
    color: white;
    text-align: center;
    padding: 8px 12px;
    border-radius: 8px;
    font-size: 12px;
    line-height: 1.4;
    z-index: 200;
    opacity: 0;
    transition: opacity 0.3s, visibility 0.3s;
    font-weight: normal;
}

.help-icon:hover .help-tooltip {
    visibility: visible;
    opacity: 1;
}

.help-tooltip::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -6px;
    border-width: 6px;
    border-style: solid;
    border-color: rgba(0,0,0,0.75) transparent transparent transparent;
}
```

## 场景选择器和模特展示

```css
.scene-selector {
    display: flex;
    justify-content: space-around;
    background-color: #F7F7F7;
    padding: 12px 8px;
    margin-bottom: 8px;
    position: sticky;
    top: 0;
    z-index: 5;
}

.scene-btn {
    background: none;
    border: none;
    padding: 6px 12px;
    font-size: 16px;
    color: #8E8E93;
    border-radius: 16px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.scene-btn:hover {
    color: #1D1D1F;
}

.scene-btn:active {
    transform: scale(0.95);
}

.scene-btn.active {
    color: #007AFF;
    font-weight: 500;
}

.model-display {
    height: 280px;
    background-color: #F2F2F7;
    display: flex;
    justify-content: center;
    overflow: hidden;
}

.model-image {
    height: 100%;
    width: auto;
    transition: opacity 0.3s ease;
}
```

## 单品展示区域和筛选

```css
.items-display {
    padding: 16px 0;
    overflow-y: auto;
    flex: 1;
    position: relative;
}

.items-content {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    padding: 0 16px;
}

.item-thumbnail {
    aspect-ratio: 1/1;
    border-radius: 12px;
    overflow: hidden;
    background-color: #F2F2F7;
    cursor: pointer;
    transition: transform 0.2s ease;
}

.item-thumbnail:hover {
    transform: scale(1.02);
}

.item-thumbnail:active {
    transform: scale(0.98);
}

.item-thumbnail img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.items-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 5px;
}

.items-title {
    font-size: 16px;
    font-weight: 600;
    color: #1D1D1F;
}

.filter-btn {
    width: 28px;
    height: 28px;
    background-color: #F2F2F7;
    border: none;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #8E8E93;
}

.filter-btn:hover {
    background-color: #E5E5EA;
}

.filter-btn:active {
    transform: scale(0.95);
}
```

## 底部导航栏

```css
.bottom-nav {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 64px;
    background-color: #FFFFFF;
    border-top: 1px solid #E5E5EA;
    padding: 0 16px;
    position: relative;
}

.nav-btn {
    flex: 1;
    height: 48px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    color: #8E8E93;
    font-size: 12px;
    cursor: pointer;
    position: relative;
}

.nav-icon {
    font-size: 24px;
    margin-bottom: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.wardrobe-icon {
    font-size: 14px;
}

.nav-btn:nth-child(3) {
    background-color: transparent;
}

.nav-btn:nth-child(3) .nav-icon {
    font-size: 14px;
}

.nav-btn:nth-child(2) .nav-icon {
    font-size: 18px;
    font-weight: bold;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #F2F2F7;
    color: #007AFF;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
}

.nav-btn.active:nth-child(2) .nav-icon {
    background-color: #007AFF;
    color: white;
}

.nav-btn:nth-child(2):active .nav-icon {
    transform: scale(0.95);
}

.nav-btn.active {
    color: #007AFF;
}

.nav-btn:active {
    transform: scale(0.95);
}
```

## 筛选弹窗样式

```css
.filter-modal {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    display: none;
    justify-content: center;
    align-items: center;
    z-index: 1100;
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
}

.filter-content {
    background-color: #FFFFFF;
    width: 85%;
    max-height: 80%;
    border-radius: 20px;
    padding: 20px 24px;
    position: relative;
    animation: slideUp 0.3s ease;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
}

.filter-content::-webkit-scrollbar {
    display: none;
}

.filter-header {
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.filter-header h3 {
    font-size: 18px;
    font-weight: 600;
    color: #1D1D1F;
}

.filter-group {
    margin-bottom: 20px;
}

.filter-group h4 {
    margin-bottom: 12px;
    font-size: 16px;
}

.filter-select-container {
    position: relative;
    width: 100%;
}

.filter-select {
    width: 100%;
    padding: 12px 16px;
    border-radius: 12px;
    border: 1px solid #E5E5EA;
    background-color: #F9F9F9;
    font-size: 16px;
    color: #1D1D1F;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8L2 4h8z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 16px center;
    cursor: pointer;
}

.filter-select:focus {
    outline: none;
    border-color: #007AFF;
    box-shadow: 0 0 0 2px rgba(0, 122, 255, 0.1);
}
```

## 颜色选择器样式

```css
#color-select-container {
    --selected-color: transparent;
    position: relative;
}

#color-select-container.has-color .filter-select {
    padding-left: 40px;
}

#color-select-container.has-color::before {
    content: '';
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    background-color: var(--selected-color);
    border-radius: 50%;
    border: 1px solid #E5E5EA;
    z-index: 10;
}

.color-dropdown-container {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    max-height: 0;
    overflow: hidden;
    background-color: white;
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.15);
    z-index: 100;
    transition: max-height 0.3s ease, opacity 0.3s ease, transform 0.3s ease;
    opacity: 0;
    transform: translateY(10px);
    pointer-events: none;
}

.color-dropdown-container.active {
    max-height: 300px;
    opacity: 1;
    transform: translateY(4px);
    pointer-events: auto;
    padding: 8px 0;
    overflow-y: auto;
}

.color-option {
    display: flex;
    align-items: center;
    padding: 10px 16px;
    cursor: pointer;
}

.color-option:hover {
    background-color: #F5F5F7;
}

.color-option-indicator {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    margin-right: 12px;
    border: 1px solid #E5E5EA;
}

.color-option-text {
    font-size: 14px;
    color: #1D1D1F;
}

.filter-actions {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-top: 24px;
    border-top: 1px solid #E5E5EA;
    padding-top: 16px;
}

.reset-btn {
    padding: 10px 16px;
    border: none;
    background: none;
    font-size: 16px;
    color: #007AFF;
    cursor: pointer;
    font-weight: 500;
}

.confirm-btn {
    padding: 10px 20px;
    border: none;
    background-color: #007AFF;
    color: #FFFFFF;
    font-size: 16px;
    font-weight: 500;
    border-radius: 18px;
    cursor: pointer;
}

@keyframes slideUp {
    from {
        transform: translateY(20px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}
```

## 上传选项弹窗样式

```css
.upload-options-modal {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 100;
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
}

.upload-options-modal.active {
    display: flex;
}

.upload-options-content {
    background-color: white;
    border-radius: 20px;
    width: 85%;
    padding: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
    transform: translateY(30px);
    opacity: 0;
    transition: all 0.3s ease;
}

.upload-options-content h3 {
    font-size: 18px;
    font-weight: 600;
    color: #1D1D1F;
    margin-top: 0;
    margin-bottom: 20px;
    text-align: center;
}

.upload-option-btn {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 14px 20px;
    margin-bottom: 12px;
    background-color: #F2F2F7;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    transition: background-color 0.2s ease;
}

.upload-option-btn:hover {
    background-color: #E5E5EA;
}

.upload-option-btn:active {
    background-color: #D1D1D6;
}

.option-icon {
    font-size: 24px;
    margin-right: 12px;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    border-radius: 50%;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

#option-camera .option-icon {
    color: #FF9500;
}

#option-gallery .option-icon {
    color: #007AFF;
}

#option-thirdparty .option-icon {
    color: #5856D6;
}

.option-text {
    font-size: 16px;
    color: #1D1D1F;
    font-weight: 500;
}

.close-upload-modal {
    margin-top: 8px;
    padding: 10px 20px;
    background: none;
    border: none;
    font-size: 16px;
    color: #8E8E93;
    cursor: pointer;
    border-radius: 12px;
}

.close-upload-modal:hover {
    color: #636366;
}

.close-upload-modal:active {
    color: #3A3A3C;
}

.upload-options-modal.active .upload-options-content {
    transform: translateY(0);
    opacity: 1;
}
```

## 通知与提示样式

```css
.notification-container {
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.system-notification {
    background-color: rgba(0, 0, 0, 0.8);
    width: 100%;
    padding: 12px 16px;
    border-radius: 12px;
    display: none;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    opacity: 0;
    transform: translateY(-10px);
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.system-notification.active {
    opacity: 1;
    transform: translateY(0);
}

.system-notification.hiding {
    opacity: 0;
    transform: translateY(-10px);
}

.notification-text {
    font-size: 14px;
    color: white;
}

.notification-close {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.2);
    border: none;
    color: white;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-left: 10px;
}

.toast-message {
    position: fixed;
    bottom: 80px;
    left: 50%;
    transform: translateX(-50%) translateY(20px);
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 10px 16px;
    border-radius: 8px;
    font-size: 14px;
    opacity: 0;
    transition: opacity 0.3s, transform 0.3s;
    pointer-events: none;
    z-index: 9999;
}

.toast-message.show {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
}
``` 