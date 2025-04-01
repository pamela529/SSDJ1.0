# 首页JavaScript功能（第一部分）

以下是智能衣橱应用首页的JavaScript功能代码的第一部分，包括场景切换、屏幕切换、底部导航等核心功能。这些代码需要保持不变，以确保应用的功能正常运行。

## 场景和屏幕切换功能

```javascript
// 场景图片数组
const sceneImages = {
    '适勤': 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=1200&fit=crop',
    '商务': 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&h=1200&fit=crop',
    '休闲': 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&h=1200&fit=crop',
    '聚会': 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=800&h=1200&fit=crop'
};

// 屏幕切换功能
function showScreen(screenId) {
    const screens = document.querySelectorAll('.container');
    screens.forEach(screen => {
        screen.style.display = 'none';
    });
    
    const targetScreen = document.getElementById(screenId + '-screen');
    if (targetScreen) {
        targetScreen.style.display = 'flex';
    }
}

// 场景切换功能
function switchScene(sceneName) {
    console.log('Switching to scene:', sceneName);
    
    const modelImage = document.querySelector('.model-image');
    const sceneBtns = document.querySelectorAll('.scene-btn');
    
    if (!modelImage) {
        console.error('Model image element not found!');
        return;
    }
    
    // 更新按钮状态
    sceneBtns.forEach(btn => {
        if (btn.textContent.trim() === sceneName) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // 更新图片
    if (sceneImages[sceneName]) {
        modelImage.style.opacity = '0';
        setTimeout(() => {
            modelImage.src = sceneImages[sceneName];
            modelImage.onload = () => {
                modelImage.style.opacity = '1';
                console.log('Image loaded for scene:', sceneName);
            };
        }, 300);
    }
}
```

## 底部导航功能

```javascript
// 初始化底部导航按钮
function initNavButtons() {
    // 移除嵌套的DOMContentLoaded事件监听器，避免多次绑定或绑定不生效
    
    // 场景按钮事件
    const sceneBtns = document.querySelectorAll('.scene-btn');
    sceneBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            switchScene(btn.textContent.trim());
        });
    });
    
    // 添加按钮事件 - 使用ID精确定位
    const addBtn = document.getElementById('uploadBtn');
    console.log('找到添加按钮:', addBtn);
    if (addBtn) {
        // 移除旧的事件监听器（如果有）
        addBtn.removeEventListener('click', showUploadOptions);
        // 添加新的事件监听器
        addBtn.addEventListener('click', function() {
            console.log('点击了添加按钮');
            showUploadOptions();
        });
    } else {
        console.error('未找到添加按钮');
    }
    
    // AI按钮点击事件
    const aiBtn = document.getElementById('aiBtn');
    if (aiBtn) {
        aiBtn.addEventListener('click', function() {
            console.log('点击了AI按钮');
            // 显示首页
            showScreen('home');
            
            // 高亮AI按钮
            const navBtns = document.querySelectorAll('.nav-btn');
            navBtns.forEach(btn => {
                btn.classList.remove('active');
            });
            aiBtn.classList.add('active');
        });
    }
    
    // 衣橱按钮事件
    const wardrobeBtn = document.getElementById('wardrobeBtn');
    if (wardrobeBtn) {
        wardrobeBtn.addEventListener('click', function() {
            console.log('点击了衣橱按钮');
            showScreen('wardrobe');
        });
    }
}
```

## 上传功能

```javascript
// 显示上传选项弹窗
function showUploadOptions() {
    console.log('显示上传选项弹窗');
    
    // 先关闭可能存在的弹窗，避免多次叠加
    const existingModal = document.getElementById('uploadOptionsModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // 创建弹窗元素
    const uploadModal = document.createElement('div');
    uploadModal.id = 'uploadOptionsModal';
    uploadModal.className = 'upload-options-modal';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'upload-options-content';
    
    // 添加选项标题
    const title = document.createElement('h3');
    title.textContent = '选择上传方式';
    modalContent.appendChild(title);
    
    // 添加选项
    const options = [
        { icon: '📷', text: '拍照上传', id: 'camera' },
        { icon: '🖼️', text: '相册图片', id: 'gallery' },
        { icon: '🛍️', text: '第三方平台获取', id: 'thirdparty' }
    ];
    
    options.forEach(option => {
        const optionBtn = document.createElement('button');
        optionBtn.className = 'upload-option-btn';
        optionBtn.id = `option-${option.id}`;
        
        const optionIcon = document.createElement('span');
        optionIcon.className = 'option-icon';
        optionIcon.textContent = option.icon;
        
        const optionText = document.createElement('span');
        optionText.className = 'option-text';
        optionText.textContent = option.text;
        
        optionBtn.appendChild(optionIcon);
        optionBtn.appendChild(optionText);
        modalContent.appendChild(optionBtn);
        
        // 为每个选项添加点击事件
        optionBtn.addEventListener('click', function() {
            console.log(`选择了上传选项: ${option.text}`);
            handleUploadOption(option.id);
        });
    });
    
    // 添加关闭按钮
    const closeBtn = document.createElement('button');
    closeBtn.className = 'close-upload-modal';
    closeBtn.textContent = '取消';
    closeBtn.addEventListener('click', closeUploadOptionsModal);
    modalContent.appendChild(closeBtn);
    
    uploadModal.appendChild(modalContent);
    
    // 获取当前活动的屏幕容器
    const activeScreen = document.querySelector('.container:not([style*="display: none"])');
    
    if (activeScreen) {
        console.log('将上传弹窗添加到活动屏幕:', activeScreen.id);
        activeScreen.appendChild(uploadModal);
    } else {
        // 如果找不到活动屏幕，默认添加到首页
        const homeScreen = document.getElementById('home-screen');
        if (homeScreen) {
            console.log('将上传弹窗添加到首页');
            homeScreen.appendChild(uploadModal);
        } else {
            console.error('无法找到有效的屏幕容器');
            return; // 如果找不到容器，则退出函数
        }
    }
    
    // 点击空白区域关闭
    uploadModal.addEventListener('click', function(e) {
        if (e.target === uploadModal) {
            closeUploadOptionsModal();
        }
    });
    
    // 显示弹窗
    uploadModal.style.display = 'flex';
    
    // 添加活动类，触发动画
    setTimeout(() => {
        uploadModal.classList.add('active');
    }, 10);
}

// 处理上传选项
function handleUploadOption(optionId) {
    switch (optionId) {
        case 'camera':
            // 调用相机
            openCamera();
            break;
        case 'gallery':
            // 调用相册/文件选择
            openGallery();
            break;
        case 'thirdparty':
            // 显示第三方平台选项
            showThirdPartyOptions();
            break;
    }
}

// 关闭上传选项弹窗
function closeUploadOptionsModal() {
    const modal = document.getElementById('uploadOptionsModal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
}

// 初始化场景按钮
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    
    // 设置默认显示首页
    showScreen('home');
    
    // 初始化底部导航按钮
    initNavButtons();
    
    const sceneBtns = document.querySelectorAll('.scene-btn');
    console.log('Found scene buttons:', sceneBtns.length);
    
    sceneBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const sceneName = btn.textContent.trim();
            console.log('Scene button clicked:', sceneName);
            switchScene(sceneName);
        });
    });
    
    // 设置初始场景
    const activeBtn = document.querySelector('.scene-btn.active');
    if (activeBtn) {
        const initialScene = activeBtn.textContent.trim();
        console.log('Setting initial scene:', initialScene);
        switchScene(initialScene);
    }
}); 