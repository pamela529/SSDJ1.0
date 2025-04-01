# 首页JavaScript功能（第四部分）

以下是智能衣橱应用首页的JavaScript功能代码的第四部分，包括上传相关功能。这些代码需要保持不变，以确保应用的功能正常运行。

## 上传功能

```javascript
/**
 * 显示上传选项弹窗
 */
function showUploadOptions() {
    console.log('显示上传选项');
    
    // 查找当前活动的屏幕容器
    const activeScreen = document.getElementById('home-screen');
    
    if (!activeScreen) {
        console.error('未找到活动屏幕容器');
        return;
    }
    
    console.log('找到活动屏幕容器:', activeScreen.id);
    
    // 创建上传选项弹窗
    let uploadOptionsModal = document.getElementById('uploadOptionsModal');
    
    if (!uploadOptionsModal) {
        console.log('创建上传选项弹窗');
        uploadOptionsModal = document.createElement('div');
        uploadOptionsModal.id = 'uploadOptionsModal';
        uploadOptionsModal.className = 'upload-options-modal';
        
        const modalContent = document.createElement('div');
        modalContent.className = 'upload-options-content';
        
        // 添加选项标题
        const title = document.createElement('h3');
        title.textContent = '上传单品';
        modalContent.appendChild(title);
        
        // 添加拍照上传选项
        const cameraBtn = document.createElement('button');
        cameraBtn.className = 'upload-option-btn';
        
        const cameraIcon = document.createElement('span');
        cameraIcon.className = 'option-icon';
        cameraIcon.textContent = '📷';
        
        const cameraText = document.createElement('span');
        cameraText.className = 'option-text';
        cameraText.textContent = '拍照上传';
        
        cameraBtn.appendChild(cameraIcon);
        cameraBtn.appendChild(cameraText);
        modalContent.appendChild(cameraBtn);
        
        // 为拍照按钮添加点击事件
        cameraBtn.addEventListener('click', openCamera);
        
        // 添加相册选择选项
        const galleryBtn = document.createElement('button');
        galleryBtn.className = 'upload-option-btn';
        
        const galleryIcon = document.createElement('span');
        galleryIcon.className = 'option-icon';
        galleryIcon.textContent = '🖼️';
        
        const galleryText = document.createElement('span');
        galleryText.className = 'option-text';
        galleryText.textContent = '从相册选择';
        
        galleryBtn.appendChild(galleryIcon);
        galleryBtn.appendChild(galleryText);
        modalContent.appendChild(galleryBtn);
        
        // 为相册按钮添加点击事件
        galleryBtn.addEventListener('click', openGallery);
        
        // 添加第三方选项
        const thirdPartyBtn = document.createElement('button');
        thirdPartyBtn.className = 'upload-option-btn';
        
        const thirdPartyIcon = document.createElement('span');
        thirdPartyIcon.className = 'option-icon';
        thirdPartyIcon.textContent = '🛍️';
        
        const thirdPartyText = document.createElement('span');
        thirdPartyText.className = 'option-text';
        thirdPartyText.textContent = '第三方平台获取';
        
        thirdPartyBtn.appendChild(thirdPartyIcon);
        thirdPartyBtn.appendChild(thirdPartyText);
        modalContent.appendChild(thirdPartyBtn);
        
        // 为第三方按钮添加点击事件
        thirdPartyBtn.addEventListener('click', showThirdPartyOptions);
        
        // 添加关闭按钮
        const closeBtn = document.createElement('button');
        closeBtn.className = 'close-upload-modal';
        closeBtn.textContent = '取消';
        closeBtn.addEventListener('click', closeUploadOptionsModal);
        modalContent.appendChild(closeBtn);
        
        uploadOptionsModal.appendChild(modalContent);
        
        // 在活动屏幕内添加弹窗
        activeScreen.appendChild(uploadOptionsModal);
        
        // 点击空白区域关闭
        uploadOptionsModal.addEventListener('click', (e) => {
            if (e.target === uploadOptionsModal) {
                closeUploadOptionsModal();
            }
        });
    }
    
    // 显示弹窗
    uploadOptionsModal.style.display = 'flex';
    setTimeout(() => {
        uploadOptionsModal.classList.add('active');
    }, 10);
}

/**
 * 关闭上传选项弹窗
 */
function closeUploadOptionsModal() {
    const modal = document.getElementById('uploadOptionsModal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
}
```

## 场景切换和导航功能

```javascript
/**
 * 显示指定的屏幕并隐藏其他屏幕
 * @param {string} screenId - 屏幕ID
 */
function showScreen(screenId) {
    const screens = document.querySelectorAll('.container');
    
    screens.forEach(screen => {
        if (screen.id === screenId + '-screen') {
            console.log(`显示屏幕: ${screenId}`);
            screen.style.display = 'block';
            
            // 标记当前活动的场景
            if (window.currentScene) {
                document.body.classList.remove('scene-' + window.currentScene);
            }
            window.currentScene = screenId;
            document.body.classList.add('scene-' + screenId);
            
            // 设置底部导航栏的选中状态
            if (screenId === 'home') {
                document.getElementById('homeBtn').classList.add('active');
                document.getElementById('aiBtn').classList.remove('active');
                document.getElementById('wardrobeBtn').classList.remove('active');
            } else if (screenId === 'ai') {
                document.getElementById('homeBtn').classList.remove('active');
                document.getElementById('aiBtn').classList.add('active');
                document.getElementById('wardrobeBtn').classList.remove('active');
            } else if (screenId === 'wardrobe') {
                document.getElementById('homeBtn').classList.remove('active');
                document.getElementById('aiBtn').classList.remove('active');
                document.getElementById('wardrobeBtn').classList.add('active');
            }
        } else {
            screen.style.display = 'none';
        }
    });
}

/**
 * 初始化底部导航按钮
 */
function initNavButtons() {
    console.log('初始化底部导航按钮');
    
    // 获取按钮元素
    const uploadBtn = document.getElementById('uploadBtn');
    const homeBtn = document.getElementById('homeBtn');
    const aiBtn = document.getElementById('aiBtn');
    const wardrobeBtn = document.getElementById('wardrobeBtn');
    
    // 默认选中首页按钮
    if (homeBtn) {
        homeBtn.classList.add('active');
        
        // 添加首页按钮点击事件
        homeBtn.addEventListener('click', () => {
            console.log('点击了首页按钮');
            showScreen('home');
        });
    }
    
    // 为上传按钮添加点击事件
    if (uploadBtn) {
        uploadBtn.addEventListener('click', () => {
            console.log('点击了上传按钮');
            showUploadOptions();
        });
    }
    
    // 为AI按钮添加点击事件
    if (aiBtn) {
        aiBtn.addEventListener('click', () => {
            console.log('点击了AI按钮');
            showScreen('ai');
        });
    }
    
    // 为衣橱按钮添加点击事件
    if (wardrobeBtn) {
        wardrobeBtn.addEventListener('click', () => {
            console.log('点击了衣橱按钮');
            showScreen('wardrobe');
        });
    }
}
``` 