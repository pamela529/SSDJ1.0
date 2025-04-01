// 场景图片数组
const sceneImages = {
    '适勤': 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=1200&fit=crop',
    '商务': 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&h=1200&fit=crop',
    '休闲': 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&h=1200&fit=crop',
    '聚会': 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=800&h=1200&fit=crop'
};

// 全局变量，记录登录状态
let isLoggedIn = false;

/**
 * 检查用户是否已登录
 * @returns {boolean} 用户登录状态
 */
function checkLoginStatus() {
    return isLoggedIn;
}

/**
 * 需要登录才能执行的操作
 * @param {Function} callback - 登录成功后执行的回调函数
 */
function requireLogin(callback) {
    if (checkLoginStatus()) {
        // 已登录，直接执行回调
        callback();
    } else {
        // 未登录，显示登录弹窗
        showLoginModal(() => {
            // 登录成功后执行回调
            callback();
        });
    }
}

/**
 * 显示登录弹窗
 * @param {Function} successCallback - 登录成功后的回调函数
 */
function showLoginModal(successCallback) {
    const loginModal = document.getElementById('loginModal');
    if (!loginModal) {
        // 如果登录弹窗不存在，创建一个
        createLoginModal(successCallback);
    } else {
        // 存储成功回调
        window.loginSuccessCallback = successCallback;
        
        // 显示登录弹窗
        loginModal.style.display = 'flex';
        setTimeout(() => {
            loginModal.classList.add('active');
        }, 10);
    }
}

/**
 * 创建登录弹窗
 * @param {Function} successCallback - 登录成功后的回调函数
 */
function createLoginModal(successCallback) {
    // 存储成功回调
    window.loginSuccessCallback = successCallback;
    
    // 查找容器
    const iPhoneContainer = document.querySelector('.iphone-container:not([style*="display: none"])');
    if (!iPhoneContainer) return;
    
    // 创建登录弹窗
    const loginModal = document.createElement('div');
    loginModal.id = 'loginModal';
    loginModal.className = 'login-modal';
    
    // 创建弹窗内容
    loginModal.innerHTML = `
        <div class="login-content">
            <div class="login-header">
                <h3>登录账号</h3>
                <button class="close-btn">&times;</button>
            </div>
            <div class="login-methods">
                <button class="login-method-btn wechat-login-btn">
                    <span class="login-icon">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.1667 7.50008C14.1667 4.73758 11.3083 2.50008 7.91667 2.50008C4.525 2.50008 1.66667 4.73758 1.66667 7.50008C1.66667 10.2626 4.525 12.5001 7.91667 12.5001C8.63333 12.5001 9.325 12.3917 9.96667 12.1959L12.5 13.3334L11.95 11.2501C13.3083 10.2209 14.1667 8.95425 14.1667 7.50008ZM7.08333 6.25008C6.625 6.25008 6.25 5.87508 6.25 5.41675C6.25 4.95841 6.625 4.58341 7.08333 4.58341C7.54167 4.58341 7.91667 4.95841 7.91667 5.41675C7.91667 5.87508 7.54167 6.25008 7.08333 6.25008ZM10.8333 6.25008C10.375 6.25008 10 5.87508 10 5.41675C10 4.95841 10.375 4.58341 10.8333 4.58341C11.2917 4.58341 11.6667 4.95841 11.6667 5.41675C11.6667 5.87508 11.2917 6.25008 10.8333 6.25008Z" fill="#07C160"/>
                            <path d="M18.3333 13.3333C18.3333 11.5 16.5 9.99996 14.1667 9.99996C11.8333 9.99996 10 11.5 10 13.3333C10 15.1666 11.8333 16.6666 14.1667 16.6666C14.6667 16.6666 15.15 16.6 15.6 16.4666L17.5 17.5L17.0833 15.8333C17.9167 15.1333 18.3333 14.2833 18.3333 13.3333ZM13.3333 12.5C13.0583 12.5 12.8333 12.275 12.8333 12C12.8333 11.725 13.0583 11.5 13.3333 11.5C13.6083 11.5 13.8333 11.725 13.8333 12C13.8333 12.275 13.6083 12.5 13.3333 12.5ZM15 12.5C14.725 12.5 14.5 12.275 14.5 12C14.5 11.725 14.725 11.5 15 11.5C15.275 11.5 15.5 11.725 15.5 12C15.5 12.275 15.275 12.5 15 12.5Z" fill="#07C160"/>
                        </svg>
                    </span>
                    <span class="login-method-text">微信一键登录</span>
                </button>
                <button class="login-method-btn phone-login-btn">
                    <span class="login-icon">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.1667 1.66675H5.83333C4.91286 1.66675 4.16667 2.41294 4.16667 3.33341V16.6667C4.16667 17.5872 4.91286 18.3334 5.83333 18.3334H14.1667C15.0871 18.3334 15.8333 17.5872 15.8333 16.6667V3.33341C15.8333 2.41294 15.0871 1.66675 14.1667 1.66675Z" stroke="#007AFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M10 15H10.0083" stroke="#007AFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </span>
                    <span class="login-method-text">手机号登录</span>
                </button>
            </div>
            <div class="phone-login-form">
                <div class="input-group">
                    <input type="tel" id="phoneNumber" placeholder="请输入手机号" maxlength="11">
                </div>
                <div class="input-group verification-code-group">
                    <input type="text" id="verificationCode" placeholder="请输入验证码" maxlength="6">
                    <button id="sendCodeBtn">获取验证码</button>
                </div>
                <button class="login-submit-btn" id="phoneLoginSubmitBtn">登录</button>
            </div>
            <div class="avatar-selection">
                <h4>请选择头像</h4>
                <div class="avatar-options">
                    <div class="avatar-option" data-src="images/women_32.jpg">
                        <img src="images/women_32.jpg" alt="头像1">
                    </div>
                    <div class="avatar-option" data-src="images/women_44.jpg">
                        <img src="images/women_44.jpg" alt="头像2">
                    </div>
                    <div class="avatar-option" data-src="images/men_32.jpg">
                        <img src="images/men_32.jpg" alt="头像3">
                    </div>
                    <div class="avatar-option custom-avatar">
                        <label class="upload-avatar-label">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 5V19M5 12H19" stroke="#007AFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <span>自定义</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // 添加到容器
    iPhoneContainer.appendChild(loginModal);
    
    // 绑定事件
    const closeBtn = loginModal.querySelector('.close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            closeLoginModal();
            // 用户关闭登录框，取消后续操作
            window.loginSuccessCallback = null;
        });
    }
    
    // 微信登录按钮
    const wechatLoginBtn = loginModal.querySelector('.wechat-login-btn');
    if (wechatLoginBtn) {
        wechatLoginBtn.addEventListener('click', handleWechatLogin);
    }
    
    // 手机号登录按钮
    const phoneLoginBtn = loginModal.querySelector('.phone-login-btn');
    if (phoneLoginBtn) {
        phoneLoginBtn.addEventListener('click', showPhoneLoginForm);
    }
    
    // 发送验证码按钮
    const sendCodeBtn = loginModal.querySelector('#sendCodeBtn');
    if (sendCodeBtn) {
        sendCodeBtn.addEventListener('click', sendVerificationCode);
    }
    
    // 手机登录提交按钮
    const phoneLoginSubmitBtn = loginModal.querySelector('#phoneLoginSubmitBtn');
    if (phoneLoginSubmitBtn) {
        phoneLoginSubmitBtn.addEventListener('click', submitPhoneLogin);
    }
    
    // 显示登录弹窗
    loginModal.style.display = 'flex';
    setTimeout(() => {
        loginModal.classList.add('active');
    }, 10);
}

/**
 * 登录成功处理
 * @param {string} avatarUrl - 用户头像URL
 */
function loginSuccess(avatarUrl) {
    // 更新登录状态
    isLoggedIn = true;
    
    // 关闭登录弹窗
    closeLoginModal();
    
    // 更新登录按钮为已登录状态
    const loginButton = document.getElementById('loginButton');
    if (loginButton) {
        loginButton.classList.add('logged-in');
        loginButton.style.backgroundImage = `url(${avatarUrl})`;
        
        // 移除登录文本和图标
        const loginText = loginButton.querySelector('.login-text');
        const loginIcon = loginButton.querySelector('.login-icon-default');
        
        if (loginText) loginText.style.display = 'none';
        if (loginIcon) loginIcon.style.display = 'none';
    }
    
    showToast('登录成功');
    
    // 执行登录成功回调
    if (typeof window.loginSuccessCallback === 'function') {
        const callback = window.loginSuccessCallback;
        window.loginSuccessCallback = null; // 清除回调引用
        setTimeout(() => callback(), 500); // 延迟执行，让用户看到登录成功提示
    }
}

// 屏幕切换功能
function showScreen(screenName) {
    console.log(`切换屏幕到: ${screenName}`);
    
    // 隐藏所有屏幕
    const screens = document.querySelectorAll('.iphone-container');
    screens.forEach(screen => {
        screen.style.display = 'none';
    });
    
    // 移除所有导航按钮的激活状态
    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => {
        btn.classList.remove('active');
    });
    
    // 显示对应的屏幕
    let targetScreen;
    let activeButton;
    
    switch(screenName) {
        case 'home':
            targetScreen = document.getElementById('home-screen')?.closest('.iphone-container');
            activeButton = document.querySelector('#aiBtn'); // AI按钮在首页高亮
            break;
        case 'wardrobe':
            targetScreen = document.getElementById('wardrobe-screen')?.closest('.iphone-container');
            if (!targetScreen) {
                console.error('找不到衣橱屏幕元素');
                // 尝试找到第二个iphone容器作为备选
                const containers = document.querySelectorAll('.iphone-container');
                if (containers.length > 1) {
                    targetScreen = containers[1];
                    console.log('使用备选衣橱屏幕元素');
                }
            }
            activeButton = document.querySelector('#wardrobeBtn'); // 衣橱按钮在衣橱页面高亮
            
            // 确保每次显示时都初始化
            setTimeout(function() {
                console.log('延迟初始化衣橱页面');
                if (typeof initWardrobePage === 'function') {
                    initWardrobePage();
                }
            }, 100);
            break;
        case 'social':
            targetScreen = document.getElementById('social-screen')?.closest('.iphone-container');
            activeButton = document.querySelector('#socialBtn'); // 社交按钮在社交页面高亮
            break;
        case 'profile':
            // 添加个人中心页面处理
            targetScreen = document.querySelector('.iphone-container .container#profile-screen')?.closest('.iphone-container');
            activeButton = document.querySelector('#profileBtn'); // 个人中心按钮高亮
            break;
        default:
            targetScreen = document.getElementById('home-screen')?.closest('.iphone-container');
            activeButton = document.querySelector('#aiBtn'); // AI按钮在首页高亮
    }
    
    if (targetScreen) {
        targetScreen.style.display = 'block';
        console.log(`显示屏幕: ${screenName}`);
    } else {
        console.error(`找不到屏幕: ${screenName}`);
    }
    
    if (activeButton) {
        activeButton.classList.add('active');
        console.log(`激活按钮: ${activeButton.id}`);
    } else {
        console.error(`找不到对应的激活按钮`);
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

/**
 * 处理图片上传
 * @param {File} file - 上传的图片文件
 * @returns {Promise<void>}
 */
async function handleImageUpload(file) {
    try {
        // 检查文件类型和大小
        if (!file || !file.type.startsWith('image/')) {
            showToast('请选择有效的图片文件');
            return;
        }
        
        // 检查文件大小（限制为20MB）
        if (file.size > 20 * 1024 * 1024) {
            showToast('图片大小超过限制，请选择小于20MB的图片');
            return;
        }

        console.log('开始处理图片:', file.name, '大小:', (file.size / 1024 / 1024).toFixed(2) + 'MB');
        showStatus('正在处理图片...');
        
        // 创建图像元素以供处理
        let img = null;
        try {
            img = await createImageElement(file);
            
            if (!img || img.width === 0 || img.height === 0) {
                throw new Error('加载的图像无效');
            }
            
            // 检查图像尺寸
            if (img.width > 4096 || img.height > 4096) {
                throw new Error('图像尺寸过大，请使用较小的图片');
            }
            
            console.log('图像已加载，大小:', img.width, 'x', img.height);
        } catch (error) {
            console.error('图像加载失败:', error);
            showToast(`图像加载失败: ${error.message || '请检查图片格式'}`);
            hideStatus();
            return;
        }
        
        // 确保图像处理模块可用
        if (!window.imageSegmentation || !window.imageSegmentation.processImage) {
            console.error('图像分割模块未加载');
            showToast('图像处理模块未就绪，请稍后重试');
            hideStatus();
            return;
        }
        
        // 处理图像
        let resultCanvas = null;
        try {
            // 使用processImageWithoutPerson处理，因为这是单品图片
            resultCanvas = await window.imageSegmentation.processImageWithoutPerson(img);
            
            if (!resultCanvas) {
                throw new Error('处理结果无效');
            }
        } catch (error) {
            console.error('图像处理失败:', error);
            showToast(`图像处理失败: ${error.message || '请尝试其他图片'}`);
            hideStatus();
            return;
        }
        
        // 隐藏处理状态
        hideStatus();
        
        // 显示处理后的图像预览
        showImagePreview(resultCanvas, file);
        console.log('图像处理完成，显示预览');
        
    } catch (error) {
        console.error('图像上传处理过程中错误:', error);
        showToast('图片处理过程中出错，请重试');
        hideStatus();
    }
}

/**
 * 创建图像元素
 * @param {File} file - 图像文件
 * @param {number} [timeout=10000] - 超时时间(毫秒)
 * @returns {Promise<HTMLImageElement>} 
 */
function createImageElement(file, timeout = 10000) {
    return new Promise((resolve, reject) => {
        // 检查文件类型
        if (!file.type.startsWith('image/')) {
            reject(new Error('不是有效的图像文件'));
            return;
        }
        
        // 检查文件大小
        if (file.size === 0) {
            reject(new Error('文件大小为0，可能已损坏'));
            return;
        }
        
        const img = new Image();
        let objectUrl = null;
        
        // 设置图像加载选项
        img.crossOrigin = 'anonymous';  // 允许跨域
        img.decoding = 'async';         // 使用异步解码
        
        // 清理函数
        const cleanup = () => {
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
                objectUrl = null;
            }
        };
        
        // 设置超时
        const timeoutId = setTimeout(() => {
            cleanup();
            reject(new Error('图像加载超时，请尝试压缩图片后重试'));
        }, timeout);
        
        // 加载错误处理
        img.onerror = (error) => {
            clearTimeout(timeoutId);
            cleanup();
            reject(new Error('图像加载失败: ' + (error.message || '未知错误')));
        };
        
        // 加载成功处理
        img.onload = () => {
            clearTimeout(timeoutId);
            cleanup();
            
            // 验证加载的图像
            if (img.width === 0 || img.height === 0) {
                reject(new Error('加载的图像无效'));
                return;
            }
            
            // 检查图像是否过大
            if (img.width * img.height > 16777216) { // 4096 * 4096
                reject(new Error('图像分辨率过高，请使用较小的图片'));
                return;
            }
            
            resolve(img);
        };
        
        try {
            // 创建object URL
            objectUrl = URL.createObjectURL(file);
            img.src = objectUrl;
        } catch (error) {
            clearTimeout(timeoutId);
            cleanup();
            reject(new Error('创建图像URL失败: ' + error.message));
        }
    });
}

/**
 * 显示图像处理结果预览
 * @param {HTMLCanvasElement} canvas - 处理后的canvas
 * @param {File} originalFile - 原始文件
 */
function showImagePreview(canvas, originalFile) {
    // 创建预览容器
    const previewContainer = document.createElement('div');
    previewContainer.className = 'image-preview-container';
    previewContainer.style.position = 'fixed';
    previewContainer.style.top = '0';
    previewContainer.style.left = '0';
    previewContainer.style.width = '100%';
    previewContainer.style.height = '100%';
    previewContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    previewContainer.style.zIndex = '9999';
    previewContainer.style.display = 'flex';
    previewContainer.style.flexDirection = 'column';
    previewContainer.style.alignItems = 'center';
    previewContainer.style.justifyContent = 'center';
    previewContainer.style.padding = '20px';
    
    // 预览标题
        const title = document.createElement('h3');
    title.textContent = '图像处理结果预览';
    title.style.color = 'white';
    title.style.marginBottom = '15px';
    
    // 预览图像容器
    const imageContainer = document.createElement('div');
    imageContainer.style.maxWidth = '90%';
    imageContainer.style.maxHeight = '70%';
    imageContainer.style.overflow = 'auto';
    imageContainer.style.backgroundColor = '#f0f0f0';
    imageContainer.style.borderRadius = '8px';
    imageContainer.style.padding = '10px';
    imageContainer.style.display = 'flex';
    imageContainer.style.justifyContent = 'center';
    imageContainer.style.alignItems = 'center';
    
    // 添加图像
    const img = document.createElement('img');
    img.src = canvas.toDataURL('image/png');
    img.style.maxWidth = '100%';
    img.style.maxHeight = '100%';
    img.style.objectFit = 'contain';
    
    // 按钮容器
    const buttonContainer = document.createElement('div');
    buttonContainer.style.marginTop = '20px';
    buttonContainer.style.display = 'flex';
    buttonContainer.style.gap = '15px';
    
    // 使用按钮
    const useButton = createButton('使用这个图像', '#4CAF50');
    useButton.addEventListener('click', () => {
        // 将处理后的图像添加到库中
        try {
            addProcessedImageToLibrary(canvas, originalFile.name);
            // 关闭预览
            document.body.removeChild(previewContainer);
            showToast('图像已添加到您的库中');
        } catch (error) {
            console.error('添加图像到库中失败:', error);
            showToast('添加图像失败: ' + error.message);
        }
    });
    
    // 取消按钮
    const cancelButton = createButton('取消', '#f44336');
    cancelButton.addEventListener('click', () => {
        document.body.removeChild(previewContainer);
    });
    
    // 组装UI
    imageContainer.appendChild(img);
    buttonContainer.appendChild(useButton);
    buttonContainer.appendChild(cancelButton);
    
    previewContainer.appendChild(title);
    previewContainer.appendChild(imageContainer);
    previewContainer.appendChild(buttonContainer);
    
    // 添加到页面
    document.body.appendChild(previewContainer);
}

/**
 * 创建按钮元素
 * @param {string} text - 按钮文本
 * @param {string} bgColor - 背景颜色
 * @returns {HTMLButtonElement} 按钮元素
 */
function createButton(text, bgColor) {
    const button = document.createElement('button');
    button.textContent = text;
    button.style.padding = '10px 20px';
    button.style.backgroundColor = bgColor;
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.borderRadius = '5px';
    button.style.fontSize = '16px';
    button.style.cursor = 'pointer';
    button.style.transition = 'opacity 0.2s';
    
    // 悬停效果
    button.addEventListener('mouseover', () => {
        button.style.opacity = '0.8';
    });
    button.addEventListener('mouseout', () => {
        button.style.opacity = '1';
    });
    
    return button;
}

/**
 * 添加处理后的图像到用户库
 * @param {HTMLCanvasElement} canvas - 处理后的canvas
 * @param {string} fileName - 原始文件名
 */
function addProcessedImageToLibrary(canvas, fileName) {
    const timestamp = new Date().getTime();
    const itemName = `处理后的图像 ${timestamp}`;
    
    // 转换Canvas为Blob对象
    canvas.toBlob(blob => {
        // 创建File对象
        const file = new File([blob], fileName, { type: 'image/png' });
        
        // 如果存在添加物品的函数，则调用它
        if (typeof addItemToLibrary === 'function') {
            addItemToLibrary({
                name: itemName,
                type: '服装配饰',
                file: file,
                url: URL.createObjectURL(file),
                isProcessed: true,
                date: new Date().toISOString()
            });
        } else if (typeof addNewClothingItem === 'function') {
            addNewClothingItem(file, itemName);
        } else {
            console.warn('没有找到适合添加图像到库的函数');
            showToast('图像处理成功，但无法添加到库中');
            
            // 提供下载选项
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = fileName || 'processed-image.png';
            link.click();
        }
    }, 'image/png', 0.9);
}

/**
 * 添加新的单品到列表
 * @param {string} imageUrl - 图片的URL或DataURL
 */
function addNewItemWithImage(imageUrl) {
    // 找到单品显示区域
    const itemsContainer = document.querySelector('.items-content');
    if (!itemsContainer) return;
    
    // 创建新的单品缩略图
    const newItem = document.createElement('div');
    newItem.className = 'item-thumbnail highlight';
    
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = '新上传单品';
    
    newItem.appendChild(img);
    
    // 添加到容器的开头
    if (itemsContainer.firstChild) {
        itemsContainer.insertBefore(newItem, itemsContainer.firstChild);
    } else {
        itemsContainer.appendChild(newItem);
    }
    
    // 为新添加的单品添加点击事件
    newItem.addEventListener('click', () => {
        requireLogin(() => {
            showInfoModal('单品', '这是新上传单品的详细描述信息。', imageUrl);
        });
    });
    
    // 2秒后移除高亮效果
    setTimeout(() => {
        newItem.classList.remove('highlight');
    }, 2000);
}

/**
 * 显示上传选项弹窗
 * @description 在iPhone容器内显示上传选项弹窗
 */
function showUploadOptions() {
    console.log('显示上传选项弹窗');
    const modal = document.getElementById('uploadOptionsModal');
    if (modal) {
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
    } else {
        console.error('上传选项弹窗元素未找到');
    }
}

/**
 * 关闭上传选项弹窗
 */
function closeUploadOptionsModal() {
    console.log('关闭上传选项弹窗');
    const modal = document.getElementById('uploadOptionsModal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
}

// 处理相机拍照
function handleCamera() {
    // 关闭上传选项弹窗
    closeUploadOptionsModal();
    
    // 检查浏览器是否支持getUserMedia
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        showToast('您的浏览器不支持拍照功能');
        return;
    }
    
    // 找到当前显示的iPhone容器
    const iPhoneContainer = document.querySelector('.iphone-container:not([style*="display: none"])');
    if (!iPhoneContainer) return;
    
    // 创建相机界面
    const cameraContainer = document.createElement('div');
    cameraContainer.id = 'cameraContainer';
    cameraContainer.className = 'modal-overlay';
    cameraContainer.style.display = 'flex';
    cameraContainer.style.flexDirection = 'column';
    cameraContainer.style.justifyContent = 'center';
    cameraContainer.style.alignItems = 'center';
    cameraContainer.style.position = 'absolute';
    cameraContainer.style.top = '0';
    cameraContainer.style.left = '0';
    cameraContainer.style.width = '100%';
    cameraContainer.style.height = '100%';
    cameraContainer.style.backgroundColor = '#000';
    cameraContainer.style.zIndex = '1500';
    
    // 相机视频元素
    const video = document.createElement('video');
    video.id = 'cameraVideo';
    video.autoplay = true;
    video.style.width = '100%';
    video.style.height = 'auto';
    video.style.maxHeight = '70%';
    
    // 相机控制按钮
    const controls = document.createElement('div');
    controls.style.display = 'flex';
    controls.style.justifyContent = 'center';
    controls.style.alignItems = 'center';
    controls.style.gap = '20px';
    controls.style.marginTop = '20px';
    
    // 拍照按钮
    const captureBtn = document.createElement('button');
    captureBtn.textContent = '拍照';
    captureBtn.style.padding = '15px 30px';
    captureBtn.style.backgroundColor = '#fff';
    captureBtn.style.color = '#000';
    captureBtn.style.border = 'none';
    captureBtn.style.borderRadius = '30px';
    captureBtn.style.fontSize = '16px';
    
    // 取消按钮
    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = '取消';
    cancelBtn.style.padding = '10px 20px';
    cancelBtn.style.backgroundColor = 'transparent';
    cancelBtn.style.color = '#fff';
    cancelBtn.style.border = '1px solid #fff';
    cancelBtn.style.borderRadius = '20px';
    cancelBtn.style.fontSize = '14px';
    
    // 添加按钮事件
    captureBtn.onclick = () => {
        // 创建Canvas来捕获视频帧
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // 停止视频流
        const stream = video.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        
        // 移除相机界面
        cameraContainer.remove();
        
        // 将Canvas转换为File对象
        canvas.toBlob(async (blob) => {
            const file = new File([blob], "photo.jpg", { type: "image/jpeg" });
            
            // 处理图片
            await handleImageUpload(file);
        }, 'image/jpeg');
    };
    
    cancelBtn.onclick = () => {
        // 停止视频流
        const stream = video.srcObject;
        if (stream) {
            const tracks = stream.getTracks();
            tracks.forEach(track => track.stop());
        }
        
        // 移除相机界面
        cameraContainer.remove();
    };
    
    // 组装界面
    controls.appendChild(captureBtn);
    controls.appendChild(cancelBtn);
    
    cameraContainer.appendChild(video);
    cameraContainer.appendChild(controls);
    
    // 添加到容器
    iPhoneContainer.appendChild(cameraContainer);
    
    // 获取相机权限并显示视频流
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            video.srcObject = stream;
        })
        .catch(error => {
            console.error('获取相机权限失败:', error);
            cameraContainer.remove();
            showToast('无法访问相机，请检查权限设置');
        });
}

// 处理从相册选择图片
function handleGallery() {
    // 关闭上传选项弹窗
    closeUploadOptionsModal();
    
    // 尝试预加载图像分割模块
    if (window.imageSegmentation && window.imageSegmentation.initializeBodyPixModel) {
        window.imageSegmentation.initializeBodyPixModel().catch(err => {
            console.warn('预加载模型失败，将在处理图像时重试:', err);
        });
    }
    
    // 创建隐藏的文件输入框
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.style.display = 'none';
    
    // 监听文件选择
    input.onchange = async (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            try {
                await handleImageUpload(file);
            } catch (error) {
                console.error('图片处理失败:', error);
                showToast('图片处理过程中出错，请重试');
            }
        }
        // 移除临时创建的input元素
        document.body.removeChild(input);
    };
    
    // 添加到body并触发点击
    document.body.appendChild(input);
    input.click();
}

// 显示第三方平台选项
function showThirdPartyOptions() {
    // 关闭当前弹窗
    closeUploadOptionsModal();
    
    // 创建第三方平台选择弹窗
    let thirdPartyModal = document.getElementById('thirdPartyModal');
    
    if (!thirdPartyModal) {
        thirdPartyModal = document.createElement('div');
        thirdPartyModal.id = 'thirdPartyModal';
        thirdPartyModal.className = 'upload-options-modal';
        
        const modalContent = document.createElement('div');
        modalContent.className = 'upload-options-content';
        
        // 添加选项标题
        const title = document.createElement('h3');
        title.textContent = '选择第三方平台';
        modalContent.appendChild(title);
        
        // 添加平台选项
        const platforms = [
            { name: '淘宝', icon: '🛒' },
            { name: '抖音', icon: '🎵' },
            { name: '拼多多', icon: '🛍️' }
        ];
        
        platforms.forEach(platform => {
            const platformBtn = document.createElement('button');
            platformBtn.className = 'upload-option-btn';
            
            const platformIcon = document.createElement('span');
            platformIcon.className = 'option-icon';
            platformIcon.textContent = platform.icon;
            
            const platformText = document.createElement('span');
            platformText.className = 'option-text';
            platformText.textContent = platform.name;
            
            platformBtn.appendChild(platformIcon);
            platformBtn.appendChild(platformText);
            modalContent.appendChild(platformBtn);
            
            // 为每个平台添加点击事件
            platformBtn.addEventListener('click', () => {
                alert(`您选择了从${platform.name}获取商品图片`);
                closeThirdPartyModal();
            });
        });
        
        // 添加关闭按钮
        const closeBtn = document.createElement('button');
        closeBtn.className = 'close-upload-modal';
        closeBtn.textContent = '返回';
        closeBtn.addEventListener('click', () => {
            closeThirdPartyModal();
            showUploadOptions();
        });
        modalContent.appendChild(closeBtn);
        
        thirdPartyModal.appendChild(modalContent);
        
        // 将弹窗添加到当前活动的屏幕容器中
        const activeScreen = document.getElementById('home-screen');
        if (activeScreen) {
            activeScreen.appendChild(thirdPartyModal);
        }
        
        // 点击空白区域关闭
        thirdPartyModal.addEventListener('click', (e) => {
            if (e.target === thirdPartyModal) {
                closeThirdPartyModal();
            }
        });
    }
    
    // 显示弹窗
    thirdPartyModal.style.display = 'flex';
    setTimeout(() => {
        thirdPartyModal.classList.add('active');
    }, 10);
}

// 关闭第三方平台弹窗
function closeThirdPartyModal() {
    const modal = document.getElementById('thirdPartyModal');
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
    
    // 不再调用initNavButtons，避免重复绑定
    // initNavButtons();
    
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

// 初始化非底部导航按钮
function initNavButtons() {
    console.log('初始化非底部导航按钮 - 不处理底部导航栏');
    
    // 场景按钮事件
    const sceneBtns = document.querySelectorAll('.scene-btn');
    sceneBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            switchScene(btn.textContent.trim());
        });
    });
    
    // 移除底部导航相关代码，避免重复绑定
    // 这部分逻辑已经移至initBottomNav函数
}

/**
 * 显示筛选弹窗
 */
function showFilterModal() {
    console.log('显示筛选弹窗');
    const filterModal = document.getElementById('filterModal');
    if (filterModal) {
        // 确保筛选弹窗在当前活跃的iPhone容器内
        const activeIphone = document.querySelector('.iphone-container:not([style*="display: none"])');
        if (activeIphone && !activeIphone.contains(filterModal)) {
            console.log('移动筛选弹窗到活跃的iPhone容器内');
            
            // 移除旧的筛选弹窗（如果存在）
            const oldFilterModal = activeIphone.querySelector('.filter-modal');
            if (oldFilterModal) {
                oldFilterModal.remove();
            }
            
            // 将筛选弹窗移动到当前活跃的iPhone容器内
            activeIphone.appendChild(filterModal);
        }
        
        // 显示筛选弹窗
        filterModal.style.display = 'flex';
        
        // 弹窗显示后立即初始化颜色选择器
        console.log('初始化颜色选择器');
        initColorSelect();
    }
}

/**
 * 关闭筛选弹窗
 */
function closeFilterModal() {
    const filterModal = document.getElementById('filterModal');
    if (filterModal) {
        filterModal.style.display = 'none';
    }
}

/**
 * 重置所有筛选条件
 */
function resetFilters() {
    // 重置所有下拉框为默认值
    document.getElementById('owner-select').value = '全部';
    document.getElementById('category-select').value = '';
    document.getElementById('color-select').value = '';
    document.getElementById('season-select').value = '';
    document.getElementById('occasion-select').value = '';
}

/**
 * 应用筛选条件
 */
function applyFilters() {
    // 收集所有选中的筛选条件
    const activeFilters = {
        owner: document.getElementById('owner-select').value,
        category: document.getElementById('category-select').value,
        color: document.getElementById('color-select').value,
        season: document.getElementById('season-select').value,
        occasion: document.getElementById('occasion-select').value
    };
    
    console.log('应用筛选条件:', activeFilters);
    
    // 在实际应用中，这里应该调用过滤单品的函数
    // filterClothingItems(activeFilters);
    
    // 统计已选择的筛选条件数量（排除空值和"全部"）
    const appliedFiltersCount = Object.values(activeFilters).filter(value => 
        value && value !== '' && value !== '全部').length;
    
    if (appliedFiltersCount > 0) {
        const message = `已应用${appliedFiltersCount}个筛选条件`;
        showToast(message);
    }
    
    // 关闭筛选弹窗
    closeFilterModal();
}

// 显示轻提示
function showToast(message) {
    // 查找当前活跃的iPhone容器
    const phoneContainer = document.querySelector('.iphone-container:not([style*="display: none"])') || 
                          document.querySelector('.iphone-container');
    
    if (!phoneContainer) {
        console.error('未找到iPhone容器');
        return;
    }
    
    // 查找或创建toast元素
    let toast = phoneContainer.querySelector('.toast-message');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast-message';
        phoneContainer.appendChild(toast);
        console.log('在iPhone容器内创建toast元素');
    }
    
    // 设置消息内容
    toast.textContent = message;
    console.log('显示消息:', message);
    
    // 显示toast
    toast.classList.add('show');
    
    // 3秒后自动隐藏
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

/**
 * 显示处理中状态
 * @param {string} message - 提示消息
 * @returns {HTMLElement} - 返回创建的处理中提示元素
 */
function showProcessingStatus(message) {
    // 查找当前活跃的iPhone容器
    const phoneContainer = document.querySelector('.iphone-container:not([style*="display: none"])') || 
                          document.querySelector('.iphone-container');
    
    if (!phoneContainer) {
        console.error('未找到iPhone容器');
        return null;
    }
    
    // 先查找已有的底部状态提示
    let processingToast = document.getElementById('bottomProcessingStatus');
    
    // 如果找到了已有元素，检查它是否在当前活跃的iPhone容器内
    if (processingToast && !phoneContainer.contains(processingToast)) {
        // 如果不在当前容器内，则移除它
        if (processingToast.parentNode) {
            processingToast.parentNode.removeChild(processingToast);
        }
        processingToast = null; // 重置为null以便重新创建
    }
    
    // 如果找不到已有元素，则创建新的
    if (!processingToast) {
        processingToast = document.createElement('div');
        processingToast.id = 'bottomProcessingStatus';
        processingToast.className = 'processing-toast';
        
        // 创建加载图标
        const spinner = document.createElement('div');
        spinner.className = 'processing-spinner';
        processingToast.appendChild(spinner);
        
        // 创建文本元素
        const textElem = document.createElement('span');
        processingToast.appendChild(textElem);
        
        // 将处理状态提示添加到iPhone容器内，放在home indicator之前
        const homeIndicator = phoneContainer.querySelector('.iphone-home-indicator');
        if (homeIndicator) {
            phoneContainer.insertBefore(processingToast, homeIndicator);
        } else {
            phoneContainer.appendChild(processingToast);
        }
        console.log('处理状态提示已添加到iPhone容器内');
    }
    
    // 设置消息内容
    const textElem = processingToast.querySelector('span');
    if (textElem) {
        textElem.textContent = message || '处理中...';
    }
    
    // 显示处理状态
    processingToast.style.display = 'flex';
    
    return processingToast;
}

/**
 * 隐藏处理中状态
 */
function hideProcessingStatus() {
    const processingToast = document.getElementById('bottomProcessingStatus');
    if (processingToast) {
        processingToast.style.display = 'none';
    }
}

// 信息卡弹窗功能
function showInfoModal(title, description, imageUrl) {
    // 确保信息卡显示在iPhone容器内
    initInfoModal();
    
    // 填充信息卡内容
    document.querySelector('.info-card img').src = imageUrl;
    document.querySelector('.info-card h3').textContent = title;
    document.querySelector('.info-card p').textContent = description;
    
    // 显示弹窗
    document.querySelector('.info-modal').classList.add('active');
}

// 初始化信息卡位置
function initInfoModal() {
    const infoModal = document.querySelector('.info-modal');
    const iphoneContainer = document.querySelector('.iphone-container');
    
    // 检查信息卡是否已在iPhone容器内
    if (!iphoneContainer.contains(infoModal)) {
        // 如果不在，则将其移入iPhone容器
        if (infoModal.parentNode) {
            infoModal.parentNode.removeChild(infoModal);
        }
        
        // 将信息卡插入到iPhone容器内，放在home indicator之前
        const homeIndicator = document.querySelector('.iphone-home-indicator');
        iphoneContainer.insertBefore(infoModal, homeIndicator);
        console.log("信息卡已移动到iPhone容器内");
    }
}

// 关闭信息卡弹窗
document.querySelector('.close-modal').addEventListener('click', function() {
    document.querySelector('.info-modal').classList.remove('active');
});

/**
 * 初始化颜色下拉框
 */
function initColorSelect() {
    console.log('正在初始化颜色选择器...');
    const colorSelect = document.getElementById('color-select');
    const colorContainer = document.getElementById('color-select-container');
    
    if (!colorSelect || !colorContainer) {
        console.error('颜色选择器元素未找到');
        return;
    }
    
    console.log('找到颜色选择器元素');
    
    // 移除旧的下拉框（如果存在）
    const oldDropdown = colorContainer.querySelector('.color-dropdown-container');
    if (oldDropdown) {
        colorContainer.removeChild(oldDropdown);
        console.log('已移除旧的下拉框');
    }
    
    // 强制应用样式，确保颜色区块显示
    if (colorSelect.value) {
        colorContainer.style.setProperty('--selected-color', colorSelect.value);
        colorContainer.classList.add('has-color');
        console.log('应用初始颜色:', colorSelect.value);
    } else {
        // 即使没有选择颜色，也显示颜色指示器（透明背景）
        colorContainer.classList.remove('has-color');
        colorContainer.style.setProperty('--selected-color', 'transparent');
        console.log('应用默认透明颜色指示器');
    }
    
    // 创建自定义下拉框
    createCustomColorDropdown(colorSelect, colorContainer);
    
    // 监听颜色选择变化
    colorSelect.addEventListener('change', function() {
        console.log('颜色选择已更改');
        updateSelectedColor(this, colorContainer);
    });
    
    console.log('颜色选择器初始化完成');
}

/**
 * 创建自定义颜色下拉框
 * @param {HTMLSelectElement} selectElement - 原始select元素
 * @param {HTMLElement} container - 下拉框容器
 */
function createCustomColorDropdown(selectElement, container) {
    console.log('创建自定义颜色下拉框');
    
    // 创建自定义下拉框容器
    const dropdownContainer = document.createElement('div');
    dropdownContainer.className = 'color-dropdown-container';
    
    // 从select元素获取所有选项
    const options = Array.from(selectElement.options);
    console.log(`找到 ${options.length} 个颜色选项`);
    
    // 为每个选项创建自定义选项元素
    options.forEach((option, index) => {
        if (index === 0) return; // 跳过"请选择"选项
        
        const colorOption = document.createElement('div');
        colorOption.className = 'color-option';
        colorOption.setAttribute('data-value', option.value);
        
        // 创建颜色指示器
        const colorIndicator = document.createElement('span');
        colorIndicator.className = 'color-option-indicator';
        colorIndicator.style.backgroundColor = option.value;
        
        // 创建选项文本
        const colorText = document.createElement('span');
        colorText.className = 'color-option-text';
        colorText.textContent = option.textContent;
        
        // 组合选项
        colorOption.appendChild(colorIndicator);
        colorOption.appendChild(colorText);
        
        // 添加点击事件
        colorOption.addEventListener('click', function(e) {
            e.stopPropagation();
            console.log(`选择颜色: ${option.textContent} (${option.value})`);
            
            // 应用选中的颜色
            selectElement.value = this.getAttribute('data-value');
            container.style.setProperty('--selected-color', option.value);
            container.classList.add('has-color');
            
            // 更新选中状态
            updateSelectedColor(selectElement, container);
            
            dropdownContainer.classList.remove('active');
            
            // 触发change事件
            const event = new Event('change');
            selectElement.dispatchEvent(event);
        });
        
        dropdownContainer.appendChild(colorOption);
    });
    
    // 将自定义下拉框添加到容器
    container.appendChild(dropdownContainer);
    console.log('添加下拉框到容器');
    
    // 阻止在下拉框内的点击事件冒泡
    dropdownContainer.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // 处理select元素被点击的情况
    selectElement.addEventListener('mousedown', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('点击下拉框，显示颜色选项');
        
        // 关闭所有其他可能打开的下拉框
        document.querySelectorAll('.color-dropdown-container.active').forEach(dropdown => {
            if (dropdown !== dropdownContainer) {
                dropdown.classList.remove('active');
            }
        });
        
        // 切换显示下拉框
        dropdownContainer.classList.toggle('active');
        
        // 确保下拉框在视口内
        ensureDropdownVisibility(dropdownContainer);
        
        // 阻止默认行为
        return false;
    });
    
    // 点击其他区域关闭下拉框
    document.addEventListener('click', function(e) {
        if (!container.contains(e.target)) {
            dropdownContainer.classList.remove('active');
        }
    });
}

/**
 * 更新选中的颜色
 * @param {HTMLSelectElement} selectElement - 原始select元素
 * @param {HTMLElement} container - 下拉框容器
 */
function updateSelectedColor(selectElement, container) {
    // 获取选中的选项
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    console.log('更新选中颜色:', selectedOption.textContent);
    
    if (selectedOption.value) {
        // 应用选中的颜色
        container.style.setProperty('--selected-color', selectedOption.value);
        container.classList.add('has-color');
    } else {
        // 如果没有选择颜色，则移除颜色指示器
        container.classList.remove('has-color');
    }
        
    // 更新下拉选项的选中状态
        const colorOptions = container.querySelectorAll('.color-option');
        colorOptions.forEach(option => {
        if (option.getAttribute('data-value') === selectedOption.value) {
                option.classList.add('selected');
            } else {
                option.classList.remove('selected');
            }
        });
}

/**
 * 确保下拉框在视口内可见
 * @param {HTMLElement} dropdown - 下拉框元素
 */
function ensureDropdownVisibility(dropdown) {
    // 获取下拉框的位置信息
    const rect = dropdown.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    
    // 如果下拉框底部超出视口，向上调整位置
    if (rect.bottom > viewportHeight - 20) {
        // 计算新的偏移量，使其底部在视口内
        const offset = rect.bottom - viewportHeight + 20;
        dropdown.style.top = 'auto';
        dropdown.style.bottom = '100%';
        console.log('调整下拉框位置以确保可见');
    }
}

/**
 * 判断颜色是否为浅色
 * @param {string} color - 十六进制颜色值
 * @returns {boolean} 是否为浅色
 */
function isLightColor(color) {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const brightness = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return brightness > 128;
}

/**
 * 初始化家庭搭配选项
 */
function initFamilyStyleOption() {
    const familyStyleCheck = document.getElementById('familyStyleCheck');
    if (familyStyleCheck) {
        // 默认不勾选
        familyStyleCheck.checked = false;
        
        // 记录初始状态，用于判断是否是用户操作导致的变更
        let isInitialState = true;
        
        // 添加变更事件监听
        familyStyleCheck.addEventListener('change', (e) => {
            // 如果用户试图勾选但未登录，则先要求登录
            if (e.target.checked && !isLoggedIn) {
                // 阻止默认勾选行为
                e.preventDefault();
                e.target.checked = false;
                
                requireLogin(() => {
                    // 登录成功后再勾选
                    e.target.checked = true;
                    // 执行后续操作
                    const isChecked = true;
                    // 只在非初始状态下显示通知
                    if (isChecked && !isInitialState) {
                        showSystemNotification('已启用家庭统一风格搭配模式');
                    }
                });
            } else if (isLoggedIn) {
                // 已登录，正常处理
            const isChecked = e.target.checked;
                // 只在非初始状态下显示通知
                if (!isInitialState) {
                    if (isChecked) {
                        showSystemNotification('已启用家庭统一风格搭配模式');
                    } else {
                        showSystemNotification('已启用个性化搭配推荐模式');
                    }
                }
            }
            
            // 初始状态设置完成后标记为非初始状态
            isInitialState = false;
        });
    }
}

/**
 * 显示系统风格通知
 * @param {string} message - 通知消息内容
 */
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
    
    console.log('找到活动屏幕:', activeScreen.id);
    
    // 查找或创建通知容器
    let notificationContainer = activeScreen.querySelector('.notification-container');
    if (!notificationContainer) {
        console.log('在活动屏幕中创建新的通知容器');
        
        // 移除所有已存在的通知容器
        document.querySelectorAll('.notification-container').forEach(container => {
            if (container.parentElement) {
                container.parentElement.removeChild(container);
            }
        });
        
        // 创建新的通知容器
        notificationContainer = document.createElement('div');
        notificationContainer.className = 'notification-container';
        activeScreen.appendChild(notificationContainer);
        
        // 创建系统通知元素
        const systemNotification = document.createElement('div');
        systemNotification.id = 'systemNotification';
        systemNotification.className = 'system-notification';
        
        // 创建通知文本
        const notificationText = document.createElement('span');
        notificationText.className = 'notification-text';
        
        // 创建关闭按钮
        const closeButton = document.createElement('button');
        closeButton.className = 'notification-close';
        closeButton.textContent = '×';
        closeButton.onclick = hideSystemNotification;
        
        // 组装通知元素
        systemNotification.appendChild(notificationText);
        systemNotification.appendChild(closeButton);
        notificationContainer.appendChild(systemNotification);
    }
    
    // 获取通知元素
    const systemNotification = notificationContainer.querySelector('#systemNotification');
    const notificationText = systemNotification.querySelector('.notification-text');
    
    if (systemNotification && notificationText) {
        // 更新消息文本
        notificationText.textContent = message;
        console.log('设置通知文本:', message);
        
        // 显示通知
        systemNotification.style.display = 'flex';
        
        // 添加活动类，触发动画
        setTimeout(() => {
            systemNotification.classList.add('active');
        }, 10);
        
        // 设置自动隐藏定时器
        if (window.notificationTimeout) {
            clearTimeout(window.notificationTimeout);
        }
        
        window.notificationTimeout = setTimeout(() => {
            hideSystemNotification();
        }, 5000);
    }
}

/**
 * 隐藏系统风格通知
 */
function hideSystemNotification() {
    // 在所有可能的容器中查找通知
    const systemNotifications = document.querySelectorAll('#systemNotification');
    systemNotifications.forEach(notification => {
        notification.classList.remove('active');
        notification.classList.add('hiding');
        
        setTimeout(() => {
            notification.style.display = 'none';
            notification.classList.remove('hiding');
        }, 300);
    });
}

/**
 * 根据家庭搭配选项更新推荐内容
 * @param {boolean} useUnifiedStyle - 是否使用统一风格
 */
function updateRecommendations(useUnifiedStyle) {
    // 不再在这里显示通知，避免重复
    console.log('更新搭配推荐，统一风格:', useUnifiedStyle);
}

/**
 * 关闭登录弹窗
 */
function closeLoginModal() {
    const loginModal = document.getElementById('loginModal');
    if (loginModal) {
        loginModal.classList.remove('active');
        setTimeout(() => {
            loginModal.style.display = 'none';
            // 重置登录弹窗状态
            resetLoginModal();
        }, 300);
    }
}

/**
 * 重置登录弹窗状态
 */
function resetLoginModal() {
    // 显示登录方式选择
    const loginMethods = document.querySelector('.login-methods');
    const phoneLoginForm = document.querySelector('.phone-login-form');
    const avatarSelection = document.querySelector('.avatar-selection');
    
    if (loginMethods) loginMethods.style.display = 'flex';
    if (phoneLoginForm) phoneLoginForm.style.display = 'none';
    if (avatarSelection) avatarSelection.style.display = 'none';
    
    // 清空手机号和验证码输入
    const phoneInput = document.getElementById('phoneNumber');
    const codeInput = document.getElementById('verificationCode');
    if (phoneInput) phoneInput.value = '';
    if (codeInput) codeInput.value = '';
}

/**
 * 处理微信登录
 */
function handleWechatLogin() {
    console.log('微信授权登录');
    // 在实际开发中，这里会调用微信小程序的 wx.login() 和 wx.getUserInfo() API
    // 为了原型演示，我们模拟获取用户头像
    simulateWechatLogin();
}

/**
 * 模拟微信登录过程
 */
function simulateWechatLogin() {
    // 模拟微信授权登录过程
    showToast('正在获取微信授权...');
    
    setTimeout(() => {
        // 模拟已获取微信头像
        loginSuccess('images/women_68.jpg');
    }, 1500);
}

/**
 * 显示手机号登录表单
 */
function showPhoneLoginForm() {
    const loginMethods = document.querySelector('.login-methods');
    const phoneLoginForm = document.querySelector('.phone-login-form');
    
    if (loginMethods && phoneLoginForm) {
        loginMethods.style.display = 'none';
        phoneLoginForm.style.display = 'block';
    }
}

/**
 * 处理手机验证码发送
 */
function sendVerificationCode() {
    const phoneInput = document.getElementById('phoneNumber');
    const sendCodeBtn = document.getElementById('sendCodeBtn');
    
    if (!phoneInput || !sendCodeBtn) return;
    
    const phoneNumber = phoneInput.value.trim();
    if (!phoneNumber || phoneNumber.length !== 11) {
        showToast('请输入有效的手机号');
        return;
    }
    
    // 禁用按钮并开始倒计时
    let countdown = 60;
    sendCodeBtn.disabled = true;
    sendCodeBtn.textContent = `${countdown}秒后重发`;
    
    const timer = setInterval(() => {
        countdown--;
        if (countdown <= 0) {
            clearInterval(timer);
            sendCodeBtn.disabled = false;
            sendCodeBtn.textContent = '获取验证码';
    } else {
            sendCodeBtn.textContent = `${countdown}秒后重发`;
        }
    }, 1000);
    
    // 模拟发送验证码
    showToast('验证码已发送');
}

/**
 * 处理手机号登录提交
 */
function submitPhoneLogin() {
    const phoneInput = document.getElementById('phoneNumber');
    const codeInput = document.getElementById('verificationCode');
    
    if (!phoneInput || !codeInput) return;
    
    const phoneNumber = phoneInput.value.trim();
    const verificationCode = codeInput.value.trim();
    
    if (!phoneNumber || phoneNumber.length !== 11) {
        showToast('请输入有效的手机号');
        return;
    }
    
    if (!verificationCode || verificationCode.length !== 6) {
        showToast('请输入完整的验证码');
        return;
    }
    
    // 模拟验证过程
    showToast('正在验证...');
    
    setTimeout(() => {
        // 随机选择一个系统头像
        const randomAvatars = [
            'images/women_32.jpg',
            'images/women_44.jpg',
            'images/men_32.jpg',
            'images/men_36.jpg'
        ];
        const randomAvatar = randomAvatars[Math.floor(Math.random() * randomAvatars.length)];
        
        // 登录成功
        loginSuccess(randomAvatar);
    }, 1500);
}

// 初始化所有事件监听器
function initEventListeners() {
    console.log('初始化所有事件监听器');
    
    // 设置默认显示首页
    showScreen('home');
    
    // 初始化底部导航按钮
    initNavButtons();
    
    // 立即初始化颜色选择器
    console.log('立即初始化颜色选择器');
    initColorSelect();
    
    // 初始化家庭搭配选项
    initFamilyStyleOption();
    
    // 初始化缩略图点击事件 - 添加登录拦截
    const thumbnails = document.querySelectorAll('.item-thumbnail');
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            requireLogin(() => {
                showInfoModal(`单品${index + 1}`, `这是单品${index + 1}的详细描述信息。`, thumbnail.querySelector('img').src);
            });
        });
    });
    
    // 初始化模态框点击关闭
    const modal = document.querySelector('.info-modal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }
    
    // 初始化触摸滑动
    const itemsDisplay = document.querySelector('.items-display');
    if (itemsDisplay) {
        let startY;
        let scrollTop;

        itemsDisplay.addEventListener('touchstart', (e) => {
            startY = e.touches[0].pageY;
            scrollTop = itemsDisplay.scrollTop;
        }, { passive: true });

        itemsDisplay.addEventListener('touchmove', (e) => {
            const touch = e.touches[0];
            const deltaY = startY - touch.pageY;
            itemsDisplay.scrollTop = scrollTop + deltaY;
        }, { passive: true });
    }

    // 为首页的登录按钮添加点击事件 - 直接显示登录弹窗
    const loginButton = document.getElementById('loginButton');
    if (loginButton) {
        loginButton.addEventListener('click', () => {
            // 添加点击动画效果
            loginButton.classList.add('animate');
            
            // 动画结束后移除类名
            setTimeout(() => {
                loginButton.classList.remove('animate');
            }, 600);
            
            if (!isLoggedIn) {
                // 未登录状态，显示登录弹窗
                showLoginModal();
            } else {
                // 已登录状态，跳转到个人中心页面
                showScreen('profile');
            }
        });
        
        // 添加鼠标悬停和离开效果
        loginButton.addEventListener('mouseenter', () => {
            if (isLoggedIn) {
                loginButton.title = '点击查看个人中心';
            }
        });
    }
    
    // 为登录弹窗的关闭按钮添加点击事件
    const closeLoginBtn = document.querySelector('.login-modal .close-btn');
    if (closeLoginBtn) {
        closeLoginBtn.addEventListener('click', closeLoginModal);
    }
    
    // 为微信登录按钮添加点击事件
    const wechatLoginBtn = document.querySelector('.wechat-login-btn');
    if (wechatLoginBtn) {
        wechatLoginBtn.addEventListener('click', handleWechatLogin);
    }
    
    // 为手机登录按钮添加点击事件
    const phoneLoginBtn = document.querySelector('.phone-login-btn');
    if (phoneLoginBtn) {
        phoneLoginBtn.addEventListener('click', showPhoneLoginForm);
    }
    
    // 为发送验证码按钮添加点击事件
    const sendCodeBtn = document.getElementById('sendCodeBtn');
    if (sendCodeBtn) {
        sendCodeBtn.addEventListener('click', sendVerificationCode);
    }
    
    // 为手机登录提交按钮添加点击事件
    const phoneLoginSubmitBtn = document.getElementById('phoneLoginSubmitBtn');
    if (phoneLoginSubmitBtn) {
        phoneLoginSubmitBtn.addEventListener('click', submitPhoneLogin);
    }
    
    // 为信息卡关闭按钮添加点击事件
    const closeModalBtn = document.querySelector('.close-modal');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            document.querySelector('.info-modal').classList.remove('active');
        });
    }
    
    // 为信息卡添加滑动关闭功能
    const infoCard = document.querySelector('.info-card');
    if (infoCard) {
        let startY = 0;
        let currentY = 0;
        
        function touchStart(e) {
            startY = e.touches[0].clientY;
            infoCard.style.transition = 'none';
        }
        
        function touchMove(e) {
            currentY = e.touches[0].clientY;
            const deltaY = currentY - startY;
            
            // 只允许向下滑动关闭
            if (deltaY > 0) {
                infoCard.style.transform = `translateY(${deltaY}px)`;
                
                // 随着滑动距离增加，降低不透明度
                const opacity = 1 - (deltaY / 300);
                document.querySelector('.info-modal').style.background = `rgba(0,0,0,${Math.max(0.1, opacity * 0.5)})`;
            }
        }
        
        function touchEnd(e) {
            const deltaY = currentY - startY;
            infoCard.style.transition = 'all 0.3s ease';
            
            // 如果向下滑动超过100px，关闭弹窗
            if (deltaY > 100) {
                infoCard.style.transform = 'translateY(100%)';
                document.querySelector('.info-modal').style.background = 'rgba(0,0,0,0)';
                setTimeout(() => {
                    document.querySelector('.info-modal').classList.remove('active');
                    resetCardStyle();
                }, 300);
            } else {
                // 否则恢复原位
                resetCardStyle();
            }
        }
        
        function resetCardStyle() {
            infoCard.style.transform = '';
            document.querySelector('.info-modal').style.background = '';
        }
        
        // 移除可能的旧事件监听器，避免重复绑定
        infoCard.removeEventListener('touchstart', touchStart);
        infoCard.removeEventListener('touchmove', touchMove);
        infoCard.removeEventListener('touchend', touchEnd);
        
        // 添加新的事件监听器
        infoCard.addEventListener('touchstart', touchStart);
        infoCard.addEventListener('touchmove', touchMove);
        infoCard.addEventListener('touchend', touchEnd);
    }
    
    // 场景按钮添加登录拦截
    const sceneBtns = document.querySelectorAll('.scene-btn');
    sceneBtns.forEach(btn => {
        const originalClickHandler = btn.onclick;
        btn.onclick = null;
        
        btn.addEventListener('click', () => {
            requireLogin(() => {
                const sceneName = btn.textContent.trim();
                switchScene(sceneName);
            });
        });
    });
    
    // 家庭选项添加登录拦截
    const familyStyleCheck = document.getElementById('familyStyleCheck');
    if (familyStyleCheck) {
        const originalChangeHandler = familyStyleCheck.onchange;
        familyStyleCheck.onchange = null;
        
        // 记录初始状态，用于判断是否是用户操作导致的变更
        let isInitialState = true;
        
        familyStyleCheck.addEventListener('change', (e) => {
            // 如果用户试图勾选但未登录，则先要求登录
            if (e.target.checked && !isLoggedIn) {
                // 阻止默认勾选行为
                e.preventDefault();
                e.target.checked = false;
                
                requireLogin(() => {
                    // 登录成功后再勾选
                    e.target.checked = true;
                    // 执行后续操作
                    const isChecked = true;
                    // 只在非初始状态下显示通知
                    if (isChecked && !isInitialState) {
                        showSystemNotification('已启用家庭统一风格搭配模式');
                    }
                });
            } else if (isLoggedIn) {
                // 已登录，正常处理
                const isChecked = e.target.checked;
                // 只在非初始状态下显示通知
                if (!isInitialState) {
                    if (isChecked) {
                        showSystemNotification('已启用家庭统一风格搭配模式');
                    } else {
                        showSystemNotification('已启用个性化搭配推荐模式');
                    }
                }
            }
            
            // 初始状态设置完成后标记为非初始状态
            isInitialState = false;
        });
    }
    
    // 筛选按钮添加登录拦截
    const filterBtn = document.querySelector('.filter-btn');
    if (filterBtn) {
        const originalClickHandler = filterBtn.onclick;
        filterBtn.onclick = null;
        
        filterBtn.addEventListener('click', () => {
            requireLogin(() => {
                showFilterModal();
            });
        });
    }
    
    // 底部导航添加登录拦截
    const aiBtn = document.getElementById('aiBtn');
    if (aiBtn) {
        const originalClickHandler = aiBtn.onclick;
        aiBtn.onclick = null;
        
        aiBtn.addEventListener('click', () => {
            requireLogin(() => {
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
        });
    }
    
    // 衣橱按钮添加登录拦截
    const wardrobeBtn = document.getElementById('wardrobeBtn');
    if (wardrobeBtn) {
        const originalClickHandler = wardrobeBtn.onclick;
        wardrobeBtn.onclick = null;
        
        wardrobeBtn.addEventListener('click', () => {
            requireLogin(() => {
                console.log('点击了衣橱按钮');
                showScreen('wardrobe');
            });
        });
    }
    
    // 上传按钮添加登录拦截
    const uploadBtn = document.getElementById('uploadBtn');
    if (uploadBtn) {
        const originalClickHandler = uploadBtn.onclick;
        uploadBtn.onclick = null;
        
        uploadBtn.addEventListener('click', () => {
            requireLogin(() => {
                console.log('点击了添加按钮');
                showUploadOptions();
            });
        });
    }
    
    // 身份选择器添加登录拦截
    const identitySelector = document.querySelector('.identity-selector select');
    if (identitySelector) {
        const originalChangeHandler = identitySelector.onchange;
        identitySelector.onchange = null;
        
        identitySelector.addEventListener('change', (e) => {
            if (!isLoggedIn) {
                // 记录用户选择的值
                const selectedValue = e.target.value;
                // 重置为原始值
                e.target.selectedIndex = 0;
                
                requireLogin(() => {
                    // 登录成功后设置为用户选择的值
                    e.target.value = selectedValue;
                    showToast(`已切换身份至: ${selectedValue}`);
                });
            } else {
                // 已登录，正常处理
                showToast(`已切换身份至: ${e.target.value}`);
            }
        });
    }
}

/**
 * 初始化头部区域
 */
function initHeader() {
    console.log('初始化头部区域');
    // 初始化信息卡位置
    initInfoModal();
}

/**
 * 初始化场景选择器
 */
function initSceneSelector() {
    console.log('初始化场景选择器');
    
    // 初始化自定义场景按钮
    const sceneAddBtn = document.querySelector('.scene-add-btn');
    if (sceneAddBtn) {
        sceneAddBtn.addEventListener('click', () => {
            // 需要登录才能添加自定义场景
            requireLogin(() => {
                showAddCustomSceneModal();
            });
        });
    }
}

/**
 * 显示添加自定义场景的弹窗
 */
function showAddCustomSceneModal() {
    // 检查是否已存在弹窗，如果存在则先移除
    let existingModal = document.getElementById('customSceneModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // 创建自定义场景弹窗
    const modal = document.createElement('div');
    modal.id = 'customSceneModal';
    modal.className = 'custom-scene-modal';
    
    // 设置弹窗内容
    modal.innerHTML = `
        <div class="custom-scene-content">
            <div class="custom-scene-header">
                <h3>添加自定义场景</h3>
                <button class="close-btn" onclick="closeCustomSceneModal()">×</button>
            </div>
            <div class="custom-scene-form">
                <div class="form-group">
                    <label for="sceneName">场景名称</label>
                    <input type="text" id="sceneName" placeholder="例如：旅行、约会、户外" maxlength="4">
                    <small>建议4个字以内</small>
                </div>
                <div class="form-group">
                    <label for="sceneDescription">场景描述（可选）</label>
                    <textarea id="sceneDescription" placeholder="描述这个场景的特点和穿搭需求"></textarea>
                </div>
                <div class="form-actions">
                    <button class="cancel-btn" onclick="closeCustomSceneModal()">取消</button>
                    <button class="confirm-btn" onclick="saveCustomScene()">添加</button>
                </div>
            </div>
        </div>
    `;
    
    // 将弹窗添加到iPhone容器中
    const iphoneContainer = document.querySelector('.iphone-container');
    iphoneContainer.appendChild(modal);
    
    // 显示弹窗
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    // 聚焦到输入框
    setTimeout(() => {
        document.getElementById('sceneName').focus();
    }, 300);
}

/**
 * 关闭自定义场景弹窗
 */
function closeCustomSceneModal() {
    const modal = document.getElementById('customSceneModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

/**
 * 保存自定义场景
 */
function saveCustomScene() {
    const sceneName = document.getElementById('sceneName').value.trim();
    const sceneDescription = document.getElementById('sceneDescription').value.trim();
    
    if (!sceneName) {
        showToast('请输入场景名称');
        return;
    }
    
    // 获取已有的自定义场景
    let customScenes = JSON.parse(localStorage.getItem('customScenes')) || [];
    
    // 限制最多添加5个自定义场景
    if (customScenes.length >= 5) {
        showToast('最多添加5个自定义场景');
        return;
    }
    
    // 检查场景名称是否已存在
    if (customScenes.some(scene => scene.name === sceneName)) {
        showToast('该场景名称已存在');
        return;
    }
    
    // 添加新场景
    const newScene = {
        id: Date.now(),
        name: sceneName,
        description: sceneDescription
    };
    
    customScenes.push(newScene);
    
    // 保存到本地存储
    localStorage.setItem('customScenes', JSON.stringify(customScenes));
    
    // 添加到场景选择器
    addSceneToSelector(newScene);
    
    // 关闭弹窗
    closeCustomSceneModal();
    
    // 显示成功提示
    showToast('自定义场景添加成功');
}

/**
 * 将场景添加到选择器中
 * @param {Object} scene 场景对象
 */
function addSceneToSelector(scene) {
    const sceneSelector = document.querySelector('.scene-selector');
    const customSceneArea = document.querySelector('.custom-scene-area');
    
    // 创建新的场景按钮
    const sceneBtn = document.createElement('button');
    sceneBtn.className = 'scene-btn custom';
    sceneBtn.textContent = scene.name;
    sceneBtn.dataset.sceneId = scene.id;
    
    // 添加长按删除功能
    let pressTimer;
    sceneBtn.addEventListener('touchstart', (e) => {
        pressTimer = setTimeout(() => {
            confirmDeleteScene(scene.id, scene.name);
        }, 800);
    });
    
    sceneBtn.addEventListener('touchend', () => {
        clearTimeout(pressTimer);
    });
    
    sceneBtn.addEventListener('touchmove', () => {
        clearTimeout(pressTimer);
    });
    
    // 点击切换场景
    sceneBtn.addEventListener('click', () => {
        switchScene(scene.name);
    });
    
    // 插入到自定义场景区域前面
    sceneSelector.insertBefore(sceneBtn, customSceneArea);
}

/**
 * 确认删除场景
 * @param {number} sceneId 场景ID
 * @param {string} sceneName 场景名称
 */
function confirmDeleteScene(sceneId, sceneName) {
    // 创建确认删除弹窗
    const modal = document.createElement('div');
    modal.className = 'confirm-delete-modal';
    modal.innerHTML = `
        <div class="confirm-delete-content">
            <h4>删除自定义场景</h4>
            <p>是否确认删除"${sceneName}"场景？</p>
            <div class="confirm-actions">
                <button class="cancel-btn" onclick="closeDeleteConfirm()">取消</button>
                <button class="delete-btn" onclick="deleteCustomScene(${sceneId})">删除</button>
            </div>
        </div>
    `;
    
    // 添加到页面
    document.body.appendChild(modal);
    
    // 显示弹窗
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

/**
 * 关闭删除确认弹窗
 */
function closeDeleteConfirm() {
    const modal = document.querySelector('.confirm-delete-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

/**
 * 删除自定义场景
 * @param {number} sceneId 场景ID
 */
function deleteCustomScene(sceneId) {
    // 获取已有的自定义场景
    let customScenes = JSON.parse(localStorage.getItem('customScenes')) || [];
    
    // 移除指定ID的场景
    customScenes = customScenes.filter(scene => scene.id !== sceneId);
    
    // 保存到本地存储
    localStorage.setItem('customScenes', JSON.stringify(customScenes));
    
    // 从页面中移除场景按钮
    const sceneBtn = document.querySelector(`.scene-btn[data-scene-id="${sceneId}"]`);
    if (sceneBtn) {
        sceneBtn.remove();
    }
    
    // 关闭确认弹窗
    closeDeleteConfirm();
    
    // 显示成功提示
    showToast('自定义场景已删除');
    
    // 如果删除的是当前选中的场景，则切换到默认场景
    const activeBtn = document.querySelector('.scene-btn.active');
    if (!activeBtn) {
        const defaultBtn = document.querySelector('.scene-btn:not(.custom)');
        if (defaultBtn) {
            defaultBtn.click();
        }
    }
}

/**
 * 初始化自定义场景
 */
function initCustomScenes() {
    // 获取已保存的自定义场景
    const customScenes = JSON.parse(localStorage.getItem('customScenes')) || [];
    
    // 添加到场景选择器
    customScenes.forEach(scene => {
        addSceneToSelector(scene);
    });
}

/**
 * 初始化状态
 */
function initState() {
    console.log('初始化应用状态');
    // 初始化自定义场景
    initCustomScenes();
}

/**
 * 初始化收藏和分享功能
 */
function initFavoriteAndShare() {
    // 获取相关DOM元素
    const favoriteBtn = document.getElementById('favoriteBtn');
    const shareBtn = document.getElementById('shareBtn');
    const favoriteOutfitsCard = document.getElementById('favoriteOutfitsCard');
    const sharedOutfitsCard = document.getElementById('sharedOutfitsCard');
    
    // 从本地存储中获取收藏数据
    let favoriteOutfits = JSON.parse(localStorage.getItem('favoriteOutfits')) || [];
    let sharedOutfits = JSON.parse(localStorage.getItem('sharedOutfits')) || [];
    
    // 更新收藏卡片数量显示
    updateFavoriteCount();
    updateSharedCount();
    
    // 检查当前搭配是否已收藏或分享
    updateButtonState();
    
    // 收藏按钮点击事件
    if (favoriteBtn) {
        favoriteBtn.addEventListener('click', function() {
            // 需要登录才能收藏
            requireLogin(function() {
                // 获取当前搭配信息（实际应用中应该获取真实数据）
                const currentOutfit = {
                    id: Date.now(),
                    image: document.querySelector('.model-image').src,
                    date: new Date().toISOString(),
                    description: '时尚搭配方案'
                };
                
                // 切换收藏状态
                const isFavorite = favoriteBtn.classList.contains('active');
                
                if (isFavorite) {
                    // 取消收藏
                    favoriteBtn.classList.remove('active');
                    // 从收藏列表中移除
                    favoriteOutfits = favoriteOutfits.filter(outfit => outfit.id !== currentOutfit.id);
                    showToast('已取消收藏');
                } else {
                    // 添加收藏
                    favoriteBtn.classList.add('active');
                    favoriteBtn.classList.add('animate');
                    // 添加到收藏列表
                    favoriteOutfits.push(currentOutfit);
                    showToast('已添加到收藏');
                    
                    // 动画结束后移除动画类
                    setTimeout(() => {
                        favoriteBtn.classList.remove('animate');
                    }, 500);
                }
                
                // 保存到本地存储
                localStorage.setItem('favoriteOutfits', JSON.stringify(favoriteOutfits));
                
                // 更新收藏数量显示
                updateFavoriteCount();
            });
        });
    }
    
    // 分享按钮点击事件
    if (shareBtn) {
        shareBtn.addEventListener('click', function() {
            // 需要登录才能分享
            requireLogin(function() {
                // 获取当前搭配信息
                const currentOutfit = {
                    id: Date.now(),
                    image: document.querySelector('.model-image').src,
                    date: new Date().toISOString(),
                    description: '分享的搭配方案',
                    sharedBy: '我' // 实际中应该是用户信息
                };
                
                // 判断是否已分享，通过检查按钮状态
                const isShared = shareBtn.classList.contains('active');
                
                if (isShared) {
                    // 取消分享
                    shareBtn.classList.remove('active');
                    // 从分享列表中移除
                    sharedOutfits = sharedOutfits.filter(outfit => outfit.id !== currentOutfit.id);
                    showToast('已取消分享');
                } else {
                    // 添加分享
                    shareBtn.classList.add('active');
                    // 添加到分享列表
                    sharedOutfits.push(currentOutfit);
                    showToast('搭配已分享到公共区域');
                }
                
                // 保存到本地存储
                localStorage.setItem('sharedOutfits', JSON.stringify(sharedOutfits));
                
                // 更新分享数量显示
                updateSharedCount();
            });
        });
    }
    
    // 收藏搭配卡片点击事件
    if (favoriteOutfitsCard) {
        favoriteOutfitsCard.addEventListener('click', function() {
            // 需要登录才能查看
            requireLogin(function() {
                // 实际应用中应该跳转到收藏页面
                showToast('查看收藏的搭配');
                
                // 这里只是简单演示
                if (favoriteOutfits.length === 0) {
                    showToast('暂无收藏的搭配');
                } else {
                    showToast(`共有${favoriteOutfits.length}个收藏的搭配`);
                }
            });
        });
    }
    
    // 别人的搭配卡片点击事件
    if (sharedOutfitsCard) {
        sharedOutfitsCard.addEventListener('click', function() {
            // 需要登录才能查看
            requireLogin(function() {
                // 实际应用中应该跳转到分享页面
                showToast('查看别人分享的搭配');
                
                // 这里只是简单演示
                if (sharedOutfits.length === 0) {
                    showToast('暂无分享的搭配');
                } else {
                    showToast(`共有${sharedOutfits.length}个分享的搭配`);
                }
            });
        });
    }
    
    /**
     * 根据当前搭配检查按钮状态
     */
    function updateButtonState() {
        if (checkLoginStatus()) {
            const currentImage = document.querySelector('.model-image')?.src;
            
            // 检查当前搭配是否已收藏
            const isFavorite = favoriteOutfits.some(outfit => outfit.image === currentImage);
            if (isFavorite && favoriteBtn) {
                favoriteBtn.classList.add('active');
            } else if (favoriteBtn) {
                favoriteBtn.classList.remove('active');
            }
            
            // 检查当前搭配是否已分享
            const isShared = sharedOutfits.some(outfit => outfit.image === currentImage);
            if (isShared && shareBtn) {
                shareBtn.classList.add('active');
            } else if (shareBtn) {
                shareBtn.classList.remove('active');
            }
        }
    }
    
    /**
     * 更新收藏数量显示
     */
    function updateFavoriteCount() {
        const countElement = favoriteOutfitsCard?.querySelector('.category-info span');
        if (countElement) {
            countElement.textContent = `${favoriteOutfits.length}套`;
        }
    }
    
    /**
     * 更新分享数量显示
     */
    function updateSharedCount() {
        const countElement = sharedOutfitsCard?.querySelector('.category-info span');
        if (countElement) {
            countElement.textContent = `${sharedOutfits.length}套`;
        }
    }
}

// 初始化收藏和分享功能
document.addEventListener('DOMContentLoaded', function() {
    // ... 其他初始化代码 ...
    
    // 初始化收藏和分享功能
    initFavoriteAndShare();
});

// 初始化单品热区点击事件
document.addEventListener('DOMContentLoaded', function() {
    // ... 其他初始化代码 ...
    
    // 初始化单品热区点击事件
    initItemHotspots();
    
    // ... 其他初始化代码 ...
});

/**
 * 初始化单品热区点击事件
 */
function initItemHotspots() {
    // 获取所有热区元素
    const hotspots = document.querySelectorAll('.item-hotspot');
    
    // 为每个热区添加点击事件
    hotspots.forEach(hotspot => {
        hotspot.addEventListener('click', function() {
            // 获取单品信息
            const itemId = this.dataset.itemId;
            const itemName = this.dataset.itemName;
            const itemType = this.dataset.itemType;
            const itemDesc = this.dataset.itemDesc;
            
            // 获取或设置图片URL（这里使用了一个预设图片，实际应用中应该有对应的图片）
            let imageUrl;
            switch(itemId) {
                case '1':
                    imageUrl = 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=300&h=300&fit=crop';
                    break;
                case '2':
                    imageUrl = 'https://images.unsplash.com/photo-1548883354-94bcfe321cbb?w=300&h=300&fit=crop';
                    break;
                case '3':
                    imageUrl = 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=300&fit=crop';
                    break;
                case '4':
                    imageUrl = 'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=300&h=300&fit=crop';
                    break;
                case '5':
                    imageUrl = 'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=300&h=300&fit=crop';
                    break;
                default:
                    imageUrl = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300&h=300&fit=crop';
            }
            
            // 显示信息弹窗
            showItemModal(itemName, imageUrl, itemDesc, itemType, this.dataset);
        });
    });
}

/**
 * 显示单品信息弹窗
 * @param {string} title - 单品名称
 * @param {string} imageUrl - 单品图片URL
 * @param {string} description - 单品描述
 * @param {string} itemType - 单品类型（self: 自有单品, ai: AI推荐单品）
 * @param {DOMStringMap} data - 单品数据
 */
function showItemModal(title, imageUrl, description, itemType, data) {
    // 获取弹窗元素
    const modal = document.getElementById('infoModal');
    const modalImg = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    
    // 获取详细信息元素
    const selfItemInfo = document.getElementById('selfItemInfo');
    const aiItemInfo = document.getElementById('aiItemInfo');
    const itemLocation = document.getElementById('itemLocation');
    const itemDate = document.getElementById('itemDate');
    const itemPrice = document.getElementById('itemPrice');
    const itemBrand = document.getElementById('itemBrand');
    const itemLink = document.getElementById('itemLink');
    
    // 设置基本信息
    modalImg.src = imageUrl;
    modalTitle.textContent = title;
    modalDesc.textContent = description;
    
    // 根据单品类型显示不同的信息
    if (itemType === 'self') {
        // 自有单品
        selfItemInfo.style.display = 'block';
        aiItemInfo.style.display = 'none';
        
        // 设置详细信息
        itemLocation.textContent = data.itemLocation || '未设置';
        itemDate.textContent = data.itemDate || '未知';
    } else {
        // AI推荐单品
        selfItemInfo.style.display = 'none';
        aiItemInfo.style.display = 'block';
        
        // 设置详细信息
        itemPrice.textContent = data.itemPrice || '未知';
        itemBrand.textContent = data.itemBrand || '未知';
        
        // 设置链接
        if (data.itemLink) {
            itemLink.href = data.itemLink;
            itemLink.style.display = 'inline-block';
        } else {
            itemLink.style.display = 'none';
        }
    }
    
    // 显示弹窗
    modal.classList.add('active');
}

/**
 * 关闭单品信息弹窗
 */
function closeInfoModal() {
    const modal = document.getElementById('infoModal');
    modal.classList.remove('active');
}

/**
 * 初始化衣橱页面
 */
function initWardrobePage() {
    console.log('初始化衣橱页面');
    
    // 清除可能存在的本地存储排序（临时解决方案，可以移除）
    // 这将重置排序，确保所有标签按照原始顺序显示
    localStorage.removeItem('categoryOrder');
    
    // 初始化图表
    initWardroveCharts();
    
    // 初始化分类标签点击事件和拖拽排序
    setTimeout(function() {
        initCategoryTabs();
        
        // 特殊处理：强制确保配饰标签可见
        setTimeout(ensureAllCategoriesVisible, 100);
    }, 200);
    
    // 初始化单品点击事件
    initWardrobeItems();
    
    // 初始化搜索功能
    initWardrobeSearch();
    
    // 初始化底部导航栏
    initBottomNav();
    
    // 延迟一点时间后，再次确保标签栏滑动功能正常
    setTimeout(function() {
        // 手动触发一次滚动更新，确保按钮状态正确
        const tabsContainer = document.querySelector('.category-tabs');
        if (tabsContainer) {
            console.log('触发滚动事件');
            tabsContainer.dispatchEvent(new Event('scroll'));
        }
    }, 800);
}

/**
 * 初始化衣橱统计图表
 */
function initWardroveCharts() {
    // 确保已加载Chart.js
    if (typeof Chart === 'undefined') {
        // 加载Chart.js
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        script.onload = function() {
            // 加载 Chart.js 数据标签插件
            const datalabelsScript = document.createElement('script');
            datalabelsScript.src = 'https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.0.0';
            datalabelsScript.onload = function() {
                Chart.register(ChartDataLabels);
                createCharts();
            };
            document.head.appendChild(datalabelsScript);
        };
        document.head.appendChild(script);
    } else {
        // 如果Chart.js已加载，检查是否需要加载datalabels插件
        if (!Chart.registry.plugins.get('datalabels')) {
            const datalabelsScript = document.createElement('script');
            datalabelsScript.src = 'https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.0.0';
            datalabelsScript.onload = function() {
                Chart.register(ChartDataLabels);
                createCharts();
            };
            document.head.appendChild(datalabelsScript);
        } else {
            createCharts();
        }
    }
}

function createCharts() {
    // 分类统计图表
    const categoryCtx = document.getElementById('categoryChart').getContext('2d');
    new Chart(categoryCtx, {
        type: 'pie',
        data: {
            labels: ['上衣', '裤子', '鞋子', '包包', '配饰'],
            datasets: [{
                data: [42, 38, 24, 16, 8],
                backgroundColor: [
                    '#FF3B30', '#FF9500', '#34C759', '#007AFF', '#5856D6'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: true // 保留悬浮提示以显示百分比
                },
                datalabels: {
                    color: '#FFFFFF',
                    font: function(context) {
                        // 根据数据值动态调整字体大小
                        const value = context.dataset.data[context.dataIndex];
                        const total = context.dataset.data.reduce((acc, val) => acc + val, 0);
                        const percentage = value / total;
                        
                        // 基础大小10px，根据占比增加字体大小，最大14px
                        const fontSize = Math.max(10, Math.min(14, 10 + percentage * 10));
                        
                        return {
                            weight: 'bold',
                            size: fontSize
                        };
                    },
                    formatter: function(value, context) {
                        // 只返回分类名称，不显示百分比
                        return context.chart.data.labels[context.dataIndex];
                    },
                    anchor: 'center',
                    align: 'center',
                    offset: 0,
                    display: true,
                    // 为较小的扇区提供文字轮廓以增强可读性
                    textStrokeColor: function(context) {
                        const value = context.dataset.data[context.dataIndex];
                        // 如果是小扇区，添加文字轮廓
                        return value < 20 ? 'rgba(0, 0, 0, 0.5)' : 'transparent';
                    },
                    textStrokeWidth: function(context) {
                        const value = context.dataset.data[context.dataIndex];
                        return value < 20 ? 1 : 0;
                    }
                }
            }
        },
        plugins: [ChartDataLabels]
    });
    
    // 颜色分布图表
    const colorCtx = document.getElementById('colorChart').getContext('2d');
    new Chart(colorCtx, {
        type: 'bar',
        data: {
            labels: ['黑色', '白色', '蓝色', '灰色', '红色', '其他'],
            datasets: [{
                data: [32, 28, 22, 18, 12, 16],
                backgroundColor: [
                    '#1D1D1F', '#FFFFFF', '#007AFF', '#86868B', '#FF3B30', '#FF9500'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    display: false
                },
                x: {
                    display: false
                }
            },
            backgroundColor: '#f5f5f7' // 添加灰色背景
        }
    });
}

/**
 * 初始化分类标签点击事件和拖拽排序
 */
function initCategoryTabs() {
    const tabs = document.querySelectorAll('.category-tab');
    const items = document.querySelectorAll('.wardrobe-item');
    
    // 点击事件
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // 移除其他标签的激活状态
            tabs.forEach(t => t.classList.remove('active'));
            
            // 激活当前标签
            this.classList.add('active');
            
            // 获取当前分类
            const category = this.dataset.category;
            
            // 根据分类筛选单品
            items.forEach(item => {
                if (category === 'all' || item.dataset.category === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // 初始化标签滑动功能
    initCategoryScroll();
    
    // 初始化拖拽排序 (如果Sortable库可用)
    initSortableTabs();
}

/**
 * 初始化标签滑动功能
 */
function initCategoryScroll() {
    console.log('重新初始化标签滑动功能');
    
    // 1. 获取DOM元素
    const tabsContainer = document.querySelector('.category-tabs');
    const scrollLeftBtn = document.getElementById('scrollLeftBtn');
    const scrollRightBtn = document.getElementById('scrollRightBtn');
    
    // 检查DOM元素是否存在
    if (!tabsContainer) {
        console.error('致命错误: 找不到标签容器 .category-tabs');
        return;
    }
    
    if (!scrollLeftBtn) {
        console.error('致命错误: 找不到左侧滑动按钮 #scrollLeftBtn');
        return;
    }
    
    if (!scrollRightBtn) {
        console.error('致命错误: 找不到右侧滑动按钮 #scrollRightBtn');
        return;
    }
    
    // 2. 确保标签容器宽度足够滑动
    const tabs = Array.from(tabsContainer.querySelectorAll('.category-tab'));
    if (tabs.length === 0) {
        console.error('致命错误: 标签容器中没有标签');
        return;
    }
    
    // 3. 确保所有标签都显示出来
    tabs.forEach(tab => {
        tab.style.display = 'flex';
        tab.style.visibility = 'visible';
        tab.style.opacity = '1';
        console.log(`标签 ${tab.dataset.category} 已设置为可见`);
    });
    
    // 4. 计算标签总宽度，确保需要滚动
    const tabsWidth = tabs.reduce((total, tab) => total + tab.offsetWidth + 6, 0);
    console.log('标签总宽度:', tabsWidth, '容器宽度:', tabsContainer.clientWidth);
    
    // 5. 重新设置容器样式，确保可以滚动
    tabsContainer.style.overflowX = 'auto';
    tabsContainer.style.whiteSpace = 'nowrap';
    tabsContainer.style.scrollBehavior = 'smooth';
    tabsContainer.style.webkitOverflowScrolling = 'touch';
    
    // 6. 更新滚动按钮状态的函数
    function updateScrollButtons() {
        const isAtStart = tabsContainer.scrollLeft <= 10;
        const isAtEnd = tabsContainer.scrollLeft >= tabsContainer.scrollWidth - tabsContainer.clientWidth - 10;
        
        console.log('滚动位置更新:', {
            scrollLeft: tabsContainer.scrollLeft,
            scrollWidth: tabsContainer.scrollWidth,
            clientWidth: tabsContainer.clientWidth,
            isAtStart,
            isAtEnd
        });
        
        scrollLeftBtn.style.display = 'flex';
        scrollRightBtn.style.display = 'flex';
        
        scrollLeftBtn.style.opacity = isAtStart ? '0.3' : '1';
        scrollLeftBtn.style.pointerEvents = isAtStart ? 'none' : 'auto';
        
        scrollRightBtn.style.opacity = isAtEnd ? '0.3' : '1';
        scrollRightBtn.style.pointerEvents = isAtEnd ? 'none' : 'auto';
    }
    
    // 7. 清除所有现有的事件监听器
    const newLeftBtn = scrollLeftBtn.cloneNode(true);
    const newRightBtn = scrollRightBtn.cloneNode(true);
    scrollLeftBtn.parentNode.replaceChild(newLeftBtn, scrollLeftBtn);
    scrollRightBtn.parentNode.replaceChild(newRightBtn, scrollRightBtn);
    
    // 8. 添加新的事件监听器
    newLeftBtn.addEventListener('click', function(e) {
        console.log('点击左侧滑动按钮');
        e.stopPropagation();
        tabsContainer.scrollBy({
            left: -150,
            behavior: 'smooth'
        });
    });
    
    newRightBtn.addEventListener('click', function(e) {
        console.log('点击右侧滑动按钮');
        e.stopPropagation();
        tabsContainer.scrollBy({
            left: 150,
            behavior: 'smooth'
        });
    });
    
    // 9. 调整箭头按钮样式以确保可点击
    newLeftBtn.style.zIndex = '100';
    newRightBtn.style.zIndex = '100';
    newLeftBtn.style.cursor = 'pointer';
    newRightBtn.style.cursor = 'pointer';
    
    // 10. 添加其他事件监听器
    tabsContainer.addEventListener('scroll', updateScrollButtons);
    tabsContainer.addEventListener('touchend', updateScrollButtons);
    window.addEventListener('resize', updateScrollButtons);
    
    // 11. 立即更新一次按钮状态
    updateScrollButtons();
    
    // 12. 每100ms检查一次滚动状态，直到按钮状态更新
    let checkCount = 0;
    const checkInterval = setInterval(function() {
        updateScrollButtons();
        checkCount++;
        console.log(`第${checkCount}次检查滚动状态`);
        if (checkCount >= 20) {
            clearInterval(checkInterval);
        }
    }, 100);
    
    console.log('标签滑动功能初始化完成');
}

/**
 * 确保所有分类标签都可见
 */
function ensureAllCategoriesVisible() {
    console.log('强制确保所有分类标签可见');
    
    // 获取所有标签
    const tabs = document.querySelectorAll('.category-tab');
    if (tabs.length === 0) {
        console.error('找不到任何分类标签');
        return;
    }
    
    // 确保所有标签都可见
    tabs.forEach(tab => {
        const category = tab.dataset.category;
        console.log(`处理标签: ${category}`);
        
        // 强制显示
        tab.style.display = 'flex';
        tab.style.visibility = 'visible';
        tab.style.opacity = '1';
        tab.style.position = 'relative';
        
        // 确保标签名称和数量显示
        const nameEl = tab.querySelector('.category-name');
        const countEl = tab.querySelector('.category-count');
        
        if (nameEl) {
            nameEl.style.display = 'block';
            nameEl.style.visibility = 'visible';
        }
        
        if (countEl) {
            countEl.style.display = 'block';
            countEl.style.visibility = 'visible';
        }
    });
    
    // 特别处理配饰标签
    const accessoriesTab = Array.from(tabs).find(tab => tab.dataset.category === 'accessories');
    if (accessoriesTab) {
        console.log('找到配饰标签，确保其可见');
        accessoriesTab.style.display = 'flex';
        accessoriesTab.style.visibility = 'visible';
        accessoriesTab.style.opacity = '1';
        
        // 确保其在标签栏中可见
        const tabsContainer = document.querySelector('.category-tabs');
        if (tabsContainer) {
            // 如果配饰标签不在可见区域，滚动到它
            const tabRect = accessoriesTab.getBoundingClientRect();
            const containerRect = tabsContainer.getBoundingClientRect();
            
            if (tabRect.right > containerRect.right) {
                console.log('配饰标签不在可见区域，滚动到它');
                tabsContainer.scrollLeft += (tabRect.right - containerRect.right + 20);
            }
        }
    } else {
        console.warn('找不到配饰标签');
    }
}

// 修改加载保存的排序顺序函数，确保所有标签都存在
function loadCategoryOrder() {
    const saved = localStorage.getItem('categoryOrder');
    if (saved) {
        try {
            const order = JSON.parse(saved);
            const tabsContainer = document.querySelector('.category-tabs');
            const tabs = Array.from(document.querySelectorAll('.category-tab'));
            
            // 检查保存的顺序中是否包含所有分类
            const allCategories = tabs.map(tab => tab.dataset.category);
            const missingCategories = allCategories.filter(cat => !order.includes(cat));
            
            if (missingCategories.length > 0) {
                console.warn('保存的排序中缺少以下分类:', missingCategories);
                // 将缺失的分类添加到排序末尾
                order.push(...missingCategories);
            }
            
            // 根据保存的顺序重排标签
            order.forEach(category => {
                const tab = tabs.find(t => t.dataset.category === category);
                if (tab) {
                    tabsContainer.appendChild(tab);
                }
            });
            
            // 确保所有标签都可见
            setTimeout(ensureAllCategoriesVisible, 200);
        } catch (e) {
            console.error('加载分类排序时出错:', e);
        }
    }
}

/**
 * 初始化标签拖拽排序
 */
function initSortableTabs() {
    // 检查是否已加载Sortable.js
    if (typeof Sortable === 'undefined') {
        // 动态加载Sortable.js
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/sortablejs@1.14.0/Sortable.min.js';
        script.onload = setupSortable;
        document.head.appendChild(script);
    } else {
        setupSortable();
    }
    
    // 设置拖拽排序
    function setupSortable() {
        const tabsContainer = document.querySelector('.category-tabs');
        if (tabsContainer) {
            new Sortable(tabsContainer, {
                animation: 150,
                ghostClass: 'sortable-ghost',
                chosenClass: 'sortable-chosen',
                dragClass: 'sortable-drag',
                handle: '.category-tab',
                onEnd: function(evt) {
                    // 保存排序顺序到本地存储
                    saveCategoryOrder();
                }
            });
            
            // 加载保存的排序顺序
            loadCategoryOrder();
        }
    }
}

/**
 * 保存分类排序顺序到本地存储
 */
function saveCategoryOrder() {
    const tabs = document.querySelectorAll('.category-tab');
    const order = Array.from(tabs).map(tab => tab.dataset.category);
    localStorage.setItem('categoryOrder', JSON.stringify(order));
}

/**
 * 初始化底部导航栏
 * 为所有按钮添加点击事件监听器
 */
function initBottomNav() {
    console.log('执行initBottomNav函数 - 为底部导航按钮绑定事件');
    
    // 查找所有底部导航栏
    document.querySelectorAll('.bottom-nav').forEach(nav => {
        console.log('找到底部导航栏:', nav);
        
        // 上传按钮
        const uploadBtn = nav.querySelector('#uploadBtn');
        if (uploadBtn) {
            console.log('找到上传按钮:', uploadBtn);
            // 移除可能存在的旧事件监听器
            const newUploadBtn = uploadBtn.cloneNode(true);
            uploadBtn.parentNode.replaceChild(newUploadBtn, uploadBtn);
            
            // 添加新的事件监听器
            newUploadBtn.addEventListener('click', function(event) {
                console.log('点击了上传按钮 - 显示上传选项');
                event.preventDefault();
                event.stopPropagation();
                showUploadOptions(); // 直接显示上传单品界面
            });
        } else {
            console.error('未找到上传按钮');
        }
        
        // AI按钮
        const aiBtn = nav.querySelector('#aiBtn');
        if (aiBtn) {
            console.log('找到AI按钮:', aiBtn);
            // 移除可能存在的旧事件监听器
            const newAiBtn = aiBtn.cloneNode(true);
            aiBtn.parentNode.replaceChild(newAiBtn, aiBtn);
            
            // 添加新的事件监听器 - 只跳转到首页
            newAiBtn.addEventListener('click', function(event) {
                console.log('点击了AI按钮 - 跳转到首页');
                event.preventDefault();
                event.stopPropagation();
                showScreen('home'); // 仅跳转首页
            });
        } else {
            console.error('未找到AI按钮');
        }
        
        // 衣橱按钮
        const wardrobeBtn = nav.querySelector('#wardrobeBtn');
        if (wardrobeBtn) {
            console.log('找到衣橱按钮:', wardrobeBtn);
            // 移除可能存在的旧事件监听器
            const newWardrobeBtn = wardrobeBtn.cloneNode(true);
            wardrobeBtn.parentNode.replaceChild(newWardrobeBtn, wardrobeBtn);
            
            // 添加新的事件监听器
            newWardrobeBtn.addEventListener('click', function(event) {
                console.log('点击了衣橱按钮 - 跳转到衣橱页面');
                event.preventDefault();
                event.stopPropagation();
                showScreen('wardrobe');
            });
        } else {
            console.error('未找到衣橱按钮');
        }
        
        // 社交按钮
        const socialBtn = nav.querySelector('#socialBtn');
        if (socialBtn) {
            console.log('找到社交按钮:', socialBtn);
            // 移除可能存在的旧事件监听器
            const newSocialBtn = socialBtn.cloneNode(true);
            socialBtn.parentNode.replaceChild(newSocialBtn, socialBtn);
            
            // 添加新的事件监听器
            newSocialBtn.addEventListener('click', function(event) {
                console.log('点击了社交按钮 - 跳转到社交页面');
                event.preventDefault();
                event.stopPropagation();
                showScreen('social');
            });
        } else {
            console.error('未找到社交按钮');
        }
    });
    
    console.log('底部导航栏初始化完成');
}

/**
 * 切换显示的屏幕
 * @param {string} screenName - 屏幕名称
 */
function showScreen(screenName) {
    console.log(`切换屏幕到: ${screenName}`);
    
    // 隐藏所有屏幕
    const screens = document.querySelectorAll('.iphone-container');
    screens.forEach(screen => {
        screen.style.display = 'none';
    });
    
    // 移除所有导航按钮的激活状态
    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => {
        btn.classList.remove('active');
    });
    
    // 显示对应的屏幕
    let targetScreen;
    let activeButton;
    
    switch(screenName) {
        case 'home':
            targetScreen = document.getElementById('home-screen')?.closest('.iphone-container');
            activeButton = document.querySelector('#aiBtn'); // AI按钮在首页高亮
            break;
        case 'wardrobe':
            targetScreen = document.getElementById('wardrobe-screen')?.closest('.iphone-container');
            if (!targetScreen) {
                console.error('找不到衣橱屏幕元素');
                // 尝试找到第二个iphone容器作为备选
                const containers = document.querySelectorAll('.iphone-container');
                if (containers.length > 1) {
                    targetScreen = containers[1];
                    console.log('使用备选衣橱屏幕元素');
                }
            }
            activeButton = document.querySelector('#wardrobeBtn'); // 衣橱按钮在衣橱页面高亮
            
            // 确保每次显示时都初始化
            setTimeout(function() {
                console.log('延迟初始化衣橱页面');
                if (typeof initWardrobePage === 'function') {
                    initWardrobePage();
                }
            }, 100);
            break;
        case 'social':
            targetScreen = document.getElementById('social-screen')?.closest('.iphone-container');
            activeButton = document.querySelector('#socialBtn'); // 社交按钮在社交页面高亮
            break;
        default:
            targetScreen = document.getElementById('home-screen')?.closest('.iphone-container');
            activeButton = document.querySelector('#aiBtn'); // AI按钮在首页高亮
    }
    
    if (targetScreen) {
        targetScreen.style.display = 'block';
        console.log(`显示屏幕: ${screenName}`);
    } else {
        console.error(`找不到屏幕: ${screenName}`);
    }
    
    if (activeButton) {
        activeButton.classList.add('active');
        console.log(`激活按钮: ${activeButton.id}`);
    } else {
        console.error(`找不到对应的激活按钮`);
    }
}

/**
 * 在页面加载完成后初始化功能
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('主应用初始化...');
    
    // 初始化事件监听器
    if (typeof initEventListeners === 'function') {
        initEventListeners();
    }
    
    // 初始化头部区域
    if (typeof initHeader === 'function') {
        initHeader();
    }
    
    // 初始化场景选择器
    if (typeof initSceneSelector === 'function') {
        initSceneSelector();
    }
    
    // 初始化家庭搭配选项
    if (typeof initFamilyStyleOption === 'function') {
        initFamilyStyleOption();
    }
    
    // 初始化状态
    if (typeof initState === 'function') {
        initState();
    }
    
    // 初始化衣橱页面
    if (typeof initWardrobePage === 'function') {
        initWardrobePage();
    }
    
    // 初始化搜索功能
    if (typeof initSearch === 'function') {
        initSearch();
    }
    
    // 导出全局函数，供其他模块使用
    window.showToast = showToast;
    window.showProcessingStatus = showProcessingStatus;
    window.hideProcessingStatus = hideProcessingStatus;
    
    // 延迟检查标签栏状态
    setTimeout(function() {
        console.log('检查标签栏状态...');
        
        // 检查标签栏容器
        const tabsContainer = document.querySelector('.category-tabs');
        const scrollLeftBtn = document.getElementById('scrollLeftBtn');
        const scrollRightBtn = document.getElementById('scrollRightBtn');
        
        if (tabsContainer) {
            console.log('找到标签栏容器:', {
                width: tabsContainer.offsetWidth,
                scrollWidth: tabsContainer.scrollWidth,
                childCount: tabsContainer.children.length
            });
            
            // 检查所有标签
            const tabs = Array.from(tabsContainer.querySelectorAll('.category-tab'));
            console.log(`找到${tabs.length}个标签`);
            
            // 检查配饰标签
            const accessoriesTab = tabs.find(tab => tab.dataset.category === 'accessories');
            if (accessoriesTab) {
                console.log('配饰标签:', {
                    display: window.getComputedStyle(accessoriesTab).display,
                    visibility: window.getComputedStyle(accessoriesTab).visibility,
                    opacity: window.getComputedStyle(accessoriesTab).opacity
                });
            } else {
                console.error('找不到配饰标签!');
            }
        } else {
            console.error('找不到标签栏容器!');
        }
        
        // 检查滚动箭头按钮
        if (scrollLeftBtn && scrollRightBtn) {
            console.log('滚动箭头按钮状态:', {
                left: {
                    display: window.getComputedStyle(scrollLeftBtn).display,
                    visibility: window.getComputedStyle(scrollLeftBtn).visibility,
                    opacity: window.getComputedStyle(scrollLeftBtn).opacity,
                    zIndex: window.getComputedStyle(scrollLeftBtn).zIndex
                },
                right: {
                    display: window.getComputedStyle(scrollRightBtn).display,
                    visibility: window.getComputedStyle(scrollRightBtn).visibility,
                    opacity: window.getComputedStyle(scrollRightBtn).opacity,
                    zIndex: window.getComputedStyle(scrollRightBtn).zIndex
                }
            });
        } else {
            console.error('找不到滚动箭头按钮!');
        }
        
        // 如果发现问题，尝试强制重新初始化
        if (tabsContainer) {
            const accessoriesTab = Array.from(tabsContainer.querySelectorAll('.category-tab')).find(tab => tab.dataset.category === 'accessories');
            if (!accessoriesTab || window.getComputedStyle(accessoriesTab).display === 'none') {
                console.log('检测到问题，强制重新初始化标签栏...');
                initCategoryTabs();
                setTimeout(ensureAllCategoriesVisible, 100);
            }
        }
    }, 1500);
    
    console.log('主应用初始化完成');
});

// 辅助函数：获取分类名称
function getCategoryName(category) {
    const categoryNames = {
        'tops': '上衣',
        'bottoms': '裤子',
        'shoes': '鞋子',
        'bags': '包包',
        'accessories': '配饰'
    };
    
    return categoryNames[category] || '未分类';
}

// 辅助函数：获取随机颜色
function getRandomColor() {
    const colors = ['黑色', '白色', '灰色', '蓝色', '红色', '绿色', '黄色', '紫色', '棕色', '粉色'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// 辅助函数：获取随机状态
function getRandomCondition() {
    const conditions = ['全新', '几乎全新', '良好', '正常使用痕迹', '需要维修'];
    return conditions[Math.floor(Math.random() * conditions.length)];
}

// 辅助函数：获取随机存放位置
function getRandomLocation() {
    const locations = ['卧室衣柜第一层', '卧室衣柜第二层', '客厅储物柜', '鞋柜', '衣帽间', '箱子里'];
    return locations[Math.floor(Math.random() * locations.length)];
}

// 辅助函数：获取随机季节
function getRandomSeason() {
    const seasons = ['春季', '夏季', '秋季', '冬季', '四季'];
    return seasons[Math.floor(Math.random() * seasons.length)];
}

// 辅助函数：获取随机品牌
function getRandomBrand() {
    const brands = ['H&M', 'ZARA', 'UNIQLO', 'Adidas', 'Nike', 'Muji', 'GAP', 'COS', 'LV', '自制'];
    return brands[Math.floor(Math.random() * brands.length)];
}

// 辅助函数：获取随机尺码
function getRandomSize() {
    const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '38', '39', '40', '41', '42', '43'];
    return sizes[Math.floor(Math.random() * sizes.length)];
}

// 辅助函数：获取随机日期
function getRandomDate(daysAgo) {
    const today = new Date();
    const pastDate = new Date(today);
    pastDate.setDate(today.getDate() - Math.floor(Math.random() * daysAgo));
    
    return pastDate.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
}

/**
 * 检查图片URL是否有效
 * @param {string} url - 图片URL
 * @returns {Promise<boolean>} - 图片是否有效
 */
function checkImageUrl(url) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            console.log(`✅ 图片加载成功: ${url}`);
            resolve(true);
        };
        img.onerror = () => {
            console.error(`❌ 图片加载失败: ${url}`);
            resolve(false);
        };
        img.src = url;
    });
}

/**
 * 检查所有图片并输出到控制台
 */
async function checkAllImages() {
    console.log('正在检查所有单品图片...');
    
    // 检查衣橱管理中的图片
    const wardrobeItems = document.querySelectorAll('.wardrobe-item img');
    console.log(`找到衣橱管理单品图片 ${wardrobeItems.length} 张`);
    
    for (const img of wardrobeItems) {
        const url = img.src;
        const isValid = await checkImageUrl(url);
        if (!isValid) {
            console.warn(`衣橱管理中的图片加载失败: ${url}, alt: ${img.alt}`);
        }
    }
    
    // 检查首页单品区的图片
    const homeThumbnails = document.querySelectorAll('.item-thumbnail img');
    console.log(`找到首页单品区图片 ${homeThumbnails.length} 张`);
    
    for (const img of homeThumbnails) {
        const url = img.src;
        const isValid = await checkImageUrl(url);
        if (!isValid) {
            console.warn(`首页单品区的图片加载失败: ${url}, alt: ${img.alt}`);
        }
    }
    
    console.log('所有图片检查完成');
}

/**
 * 设置图片加载错误处理
 * @param {HTMLImageElement} img - 图片元素
 */
function setImageErrorHandler(img) {
    // 备用图片URL，确保这些图片能够正常加载
    const fallbackImages = [
        'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=150&h=150&fit=crop',
        'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=150&h=150&fit=crop',
        'https://images.unsplash.com/photo-1588359348343-8ebdea9fcb91?w=150&h=150&fit=crop',
        'https://images.unsplash.com/photo-1542272604-787c3835535d?w=150&h=150&fit=crop',
        'https://images.unsplash.com/photo-1605812860427-4024433a70fd?w=150&h=150&fit=crop'
    ];
    
    // 图片加载失败时的处理
    img.onerror = function() {
        console.warn(`图片加载失败，正在替换: ${this.src}`);
        // 选择一个随机的备用图片
        const randomIndex = Math.floor(Math.random() * fallbackImages.length);
        this.src = fallbackImages[randomIndex];
        console.log(`已替换为备用图片: ${this.src}`);
    };
}

/**
 * 初始化单品点击事件
 */
function initWardrobeItems() {
    const items = document.querySelectorAll('.wardrobe-item');
    
    items.forEach(item => {
        item.addEventListener('click', function() {
            showItemDetailModal(this);
        });
        
        // 为每个单品图片添加错误处理
        const img = item.querySelector('img');
        if (img) {
            setImageErrorHandler(img);
        }
    });
    
    // 在初始化完成后，检查所有图片
    setTimeout(checkAllImages, 1000);
}

/**
 * 显示单品详情弹窗
 * @param {HTMLElement} item - 单品元素
 */
function showItemDetailModal(item) {
    // 获取弹窗元素
    const modal = document.getElementById('wardrobeItemModal');
    
    // 获取单品信息
    const itemImg = item.querySelector('img');
    const itemName = itemImg ? itemImg.getAttribute('alt') : '未命名单品'; // 使用alt属性作为名称
    const itemImgSrc = itemImg ? itemImg.src : '';
    const category = item.dataset.category;
    
    // 示例数据，实际应用中应该从数据库获取
    const itemDetails = {
        name: itemName,
        category: getCategoryName(category),
        color: getRandomColor(),
        condition: getRandomCondition(),
        location: getRandomLocation(),
        season: getRandomSeason(),
        brand: getRandomBrand(),
        size: getRandomSize(),
        wash: '手洗或30°C机洗',
        price: '¥' + (Math.floor(Math.random() * 1000) + 100),
        purchaseDate: getRandomDate(365 * 2), // 2年内的随机日期
        uploadDate: getRandomDate(30), // 30天内的随机日期
        purchaseLink: 'https://example.com/item/' + Math.floor(Math.random() * 1000000)
    };
    
    // 设置弹窗内容
    document.getElementById('modalItemImage').src = itemImgSrc;
    document.getElementById('modalItemName').textContent = itemDetails.name;
    document.getElementById('modalItemCategory').textContent = itemDetails.category;
    document.getElementById('modalItemColor').textContent = itemDetails.color;
    document.getElementById('modalItemCondition').textContent = itemDetails.condition;
    document.getElementById('modalItemLocation').textContent = itemDetails.location;
    document.getElementById('modalItemSeason').textContent = itemDetails.season;
    document.getElementById('modalItemBrand').textContent = itemDetails.brand;
    document.getElementById('modalItemSize').textContent = itemDetails.size;
    document.getElementById('modalItemWash').textContent = itemDetails.wash;
    document.getElementById('modalItemPrice').textContent = itemDetails.price;
    document.getElementById('modalItemPurchaseDate').textContent = itemDetails.purchaseDate;
    document.getElementById('modalItemUploadDate').textContent = itemDetails.uploadDate;
    document.getElementById('modalItemPurchaseLink').href = itemDetails.purchaseLink;
    
    // 显示弹窗
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
}

/**
 * 关闭单品详情弹窗
 */
function closeItemDetailModal() {
    const modal = document.getElementById('wardrobeItemModal');
    modal.classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

/**
 * 初始化衣橱搜索功能
 */
function initWardrobeSearch() {
    const searchInput = document.getElementById('wardrobeSearch');
    const items = document.querySelectorAll('.wardrobe-item');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        
        items.forEach(item => {
            const itemName = item.querySelector('.item-name').textContent.toLowerCase();
            
            if (searchTerm === '' || itemName.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
}

/**
 * 显示上传选项弹窗
 */
function showUploadModal() {
    // 检查是否已有上传弹窗
    let uploadModal = document.getElementById('uploadOptionsModal');
    
    // 如果没有，创建一个
    if (!uploadModal) {
        uploadModal = document.createElement('div');
        uploadModal.id = 'uploadOptionsModal';
        uploadModal.className = 'upload-options-modal';
        
        const modalContent = `
            <div class="upload-options-content">
                <h3>添加单品</h3>
                <button id="option-camera" class="upload-option-btn">
                    <span class="option-icon">📷</span>
                    <span class="option-text">拍照上传</span>
                </button>
                <button id="option-gallery" class="upload-option-btn">
                    <span class="option-icon">🖼️</span>
                    <span class="option-text">从相册选择</span>
                </button>
                <button id="option-thirdparty" class="upload-option-btn">
                    <span class="option-icon">🛒</span>
                    <span class="option-text">从购物平台导入</span>
                </button>
                <button class="close-upload-modal">取消</button>
            </div>
        `;
        
        uploadModal.innerHTML = modalContent;
        document.body.appendChild(uploadModal);
        
        // 添加事件监听
        const closeBtn = uploadModal.querySelector('.close-upload-modal');
        closeBtn.addEventListener('click', () => {
            uploadModal.classList.remove('active');
            setTimeout(() => {
                uploadModal.style.display = 'none';
            }, 300);
        });
        
        // 添加选项按钮事件
        const cameraBtn = uploadModal.querySelector('#option-camera');
        cameraBtn.addEventListener('click', () => {
            alert('启动相机功能');
            uploadModal.classList.remove('active');
            setTimeout(() => {
                uploadModal.style.display = 'none';
            }, 300);
        });
        
        const galleryBtn = uploadModal.querySelector('#option-gallery');
        galleryBtn.addEventListener('click', () => {
            alert('打开相册选择');
            uploadModal.classList.remove('active');
            setTimeout(() => {
                uploadModal.style.display = 'none';
            }, 300);
        });
        
        const thirdpartyBtn = uploadModal.querySelector('#option-thirdparty');
        thirdpartyBtn.addEventListener('click', () => {
            alert('打开购物平台导入');
            uploadModal.classList.remove('active');
            setTimeout(() => {
                uploadModal.style.display = 'none';
            }, 300);
        });
    }
    
    // 显示弹窗
    uploadModal.style.display = 'flex';
    setTimeout(() => {
        uploadModal.classList.add('active');
    }, 10);
}

/**
 * 切换搜索弹窗的显示状态
 */
function toggleSearch() {
    const searchModal = document.getElementById('searchModal');
    
    if (searchModal.classList.contains('active')) {
        searchModal.classList.remove('active');
    } else {
        searchModal.classList.add('active');
        
        // 自动聚焦到搜索输入框
        setTimeout(() => {
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                searchInput.focus();
            }
        }, 300);
    }
}

/**
 * 初始化搜索功能
 */
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.querySelector('.search-action-btn');
    const filterOptions = document.querySelectorAll('.filter-option');
    const colorOptions = document.querySelectorAll('.color-option');
    const resetBtn = document.querySelector('.reset-btn');
    const confirmBtn = document.querySelector('.confirm-btn');
    
    // 搜索按钮点击事件
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            performSearch();
        });
    }
    
    // 搜索输入框回车事件
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    // 筛选选项点击事件
    filterOptions.forEach(option => {
        option.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    });
    
    // 颜色选项点击事件
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    });
    
    // 重置按钮点击事件
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            // 清空搜索输入
            if (searchInput) {
                searchInput.value = '';
            }
            
            // 清除所有选中状态
            filterOptions.forEach(option => {
                option.classList.remove('active');
            });
            
            colorOptions.forEach(option => {
                option.classList.remove('active');
            });
        });
    }
    
    // 确定按钮点击事件
    if (confirmBtn) {
        confirmBtn.addEventListener('click', function() {
            performSearch();
            toggleSearch(); // 关闭搜索弹窗
        });
    }
}

/**
 * 执行搜索
 */
function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const activeFilters = document.querySelectorAll('.filter-option.active');
    const activeColors = document.querySelectorAll('.color-option.active');
    
    let searchTerm = '';
    if (searchInput && searchInput.value.trim()) {
        searchTerm = searchInput.value.trim().toLowerCase();
    }
    
    const filters = Array.from(activeFilters).map(filter => filter.textContent.trim());
    const colors = Array.from(activeColors).map(color => {
        const bgColor = color.style.backgroundColor;
        return bgColor;
    });
    
    console.log('搜索词:', searchTerm);
    console.log('筛选条件:', filters);
    console.log('颜色筛选:', colors);
    
    // 在这里执行实际的搜索逻辑
    // 例如: 更新单品列表，筛选匹配的项目等
    
    // 示例: 简单的筛选逻辑
    const items = document.querySelectorAll('.wardrobe-item');
    
    items.forEach(item => {
        const itemName = item.querySelector('.item-name').textContent.toLowerCase();
        const categoryMatches = filters.length === 0 || filters.some(filter => {
            return getCategoryName(item.dataset.category).includes(filter);
        });
        
        // 这里需要补充颜色匹配逻辑
        
        if ((searchTerm === '' || itemName.includes(searchTerm)) && categoryMatches) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

/**
 * 在页面加载完成后初始化功能
 */
document.addEventListener('DOMContentLoaded', function() {
    // ... 其他初始化代码 ...
    
    // 初始化衣橱页面
    initWardrobePage();
    
    // 初始化搜索功能
    initSearch();
    
    // ... 其他初始化代码 ...
});

/**
 * 编辑单品信息
 */
function editItem() {
    // 获取当前单品信息
    const itemName = document.getElementById('modalItemName').textContent;
    const itemCategory = document.getElementById('modalItemCategory').textContent;
    const itemColor = document.getElementById('modalItemColor').textContent;
    
    // 关闭当前详情弹窗
    closeItemDetailModal();
    
    // 显示编辑弹窗
    showItemEditModal(itemName, itemCategory, itemColor);
}

/**
 * 显示单品编辑弹窗
 */
function showItemEditModal(itemName, category, color) {
    // 检查编辑弹窗是否已存在
    let editModal = document.getElementById('itemEditModal');
    
    // 如果不存在，创建一个
    if (!editModal) {
        editModal = document.createElement('div');
        editModal.id = 'itemEditModal';
        editModal.className = 'item-edit-modal';
        
        // 创建弹窗内容
        const modalContent = `
            <div class="edit-modal-content">
                <div class="edit-modal-header">
                    <h3>编辑单品</h3>
                    <button class="close-btn" onclick="closeItemEditModal()">×</button>
                </div>
                <div class="edit-modal-body">
                    <div class="edit-form">
                        <div class="form-group">
                            <label for="editItemName">名称</label>
                            <input type="text" id="editItemName" placeholder="单品名称">
                        </div>
                        <div class="form-group">
                            <label for="editItemCategory">分类</label>
                            <select id="editItemCategory">
                                <option value="上衣">上衣</option>
                                <option value="裤子">裤子</option>
                                <option value="鞋子">鞋子</option>
                                <option value="包包">包包</option>
                                <option value="配饰">配饰</option>
                                <option value="外套">外套</option>
                                <option value="连衣裙">连衣裙</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="editItemColor">颜色</label>
                            <select id="editItemColor">
                                <option value="黑色">黑色</option>
                                <option value="白色">白色</option>
                                <option value="红色">红色</option>
                                <option value="蓝色">蓝色</option>
                                <option value="绿色">绿色</option>
                                <option value="黄色">黄色</option>
                                <option value="紫色">紫色</option>
                                <option value="灰色">灰色</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="editItemCondition">状态</label>
                            <select id="editItemCondition">
                                <option value="极新">极新</option>
                                <option value="良好">良好</option>
                                <option value="一般">一般</option>
                                <option value="差">差</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="editItemLocation">存放位置</label>
                            <input type="text" id="editItemLocation" placeholder="例如：衣柜第一层">
                        </div>
                        <div class="form-group">
                            <label for="editItemSeason">季节</label>
                            <select id="editItemSeason">
                                <option value="春季">春季</option>
                                <option value="夏季">夏季</option>
                                <option value="秋季">秋季</option>
                                <option value="冬季">冬季</option>
                                <option value="四季">四季</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="editItemBrand">品牌</label>
                            <input type="text" id="editItemBrand" placeholder="品牌名称">
                        </div>
                        <div class="form-group">
                            <label for="editItemSize">尺码</label>
                            <input type="text" id="editItemSize" placeholder="尺码">
                        </div>
                        <div class="form-group">
                            <label for="editItemWash">洗涤方式</label>
                            <input type="text" id="editItemWash" placeholder="洗涤方式">
                        </div>
                        <div class="form-group">
                            <label for="editItemPrice">购买价格</label>
                            <input type="text" id="editItemPrice" placeholder="例如：¥299">
                        </div>
                        <div class="form-group">
                            <label for="editItemPurchaseDate">购买时间</label>
                            <input type="date" id="editItemPurchaseDate">
                        </div>
                        <div class="form-group">
                            <label for="editItemPurchaseLink">购买链接</label>
                            <input type="url" id="editItemPurchaseLink" placeholder="https://...">
                        </div>
                    </div>
                </div>
                <div class="edit-modal-footer">
                    <button class="cancel-btn" onclick="closeItemEditModal()">取消</button>
                    <button class="save-btn" onclick="saveItemChanges()">保存</button>
                </div>
            </div>
        `;
        
        editModal.innerHTML = modalContent;
        document.body.appendChild(editModal);
    }
    
    // 填充表单数据
    document.getElementById('editItemName').value = itemName;
    
    // 选择匹配的分类选项
    const categorySelect = document.getElementById('editItemCategory');
    for (let i = 0; i < categorySelect.options.length; i++) {
        if (categorySelect.options[i].value === category) {
            categorySelect.selectedIndex = i;
            break;
        }
    }
    
    // 选择匹配的颜色选项
    const colorSelect = document.getElementById('editItemColor');
    for (let i = 0; i < colorSelect.options.length; i++) {
        if (colorSelect.options[i].value === color) {
            colorSelect.selectedIndex = i;
            break;
        }
    }
    
    // 填充其他信息
    document.getElementById('editItemCondition').value = document.getElementById('modalItemCondition').textContent;
    document.getElementById('editItemLocation').value = document.getElementById('modalItemLocation').textContent;
    document.getElementById('editItemSeason').value = document.getElementById('modalItemSeason').textContent;
    document.getElementById('editItemBrand').value = document.getElementById('modalItemBrand').textContent;
    document.getElementById('editItemSize').value = document.getElementById('modalItemSize').textContent;
    document.getElementById('editItemWash').value = document.getElementById('modalItemWash').textContent;
    document.getElementById('editItemPrice').value = document.getElementById('modalItemPrice').textContent;
    
    // 处理日期格式
    const purchaseDate = document.getElementById('modalItemPurchaseDate').textContent;
    if (purchaseDate) {
        const dateParts = purchaseDate.split('/');
        if (dateParts.length === 3) {
            // 转换为yyyy-mm-dd格式
            const formattedDate = `${dateParts[2]}-${dateParts[0].padStart(2, '0')}-${dateParts[1].padStart(2, '0')}`;
            document.getElementById('editItemPurchaseDate').value = formattedDate;
        }
    }
    
    // 设置购买链接
    const purchaseLink = document.getElementById('modalItemPurchaseLink').href;
    document.getElementById('editItemPurchaseLink').value = purchaseLink;
    
    // 显示弹窗
    editModal.style.display = 'flex';
    setTimeout(() => {
        editModal.classList.add('active');
    }, 10);
}

/**
 * 关闭单品编辑弹窗
 */
function closeItemEditModal() {
    const modal = document.getElementById('itemEditModal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
}

/**
 * 保存单品修改
 */
function saveItemChanges() {
    // 获取表单数据
    const itemName = document.getElementById('editItemName').value;
    const category = document.getElementById('editItemCategory').value;
    const color = document.getElementById('editItemColor').value;
    
    // 在实际应用中，这里应该把数据保存到后端
    console.log('保存单品修改:', {
        name: itemName,
        category: category,
        color: color,
        // 其他字段也可以类似获取
    });
    
    // 显示保存成功提示
    showToast('单品信息已更新');
    
    // 关闭编辑弹窗
    closeItemEditModal();
}

/**
 * 确保首页和衣橱管理中的单品图片一致性
 */
function ensureConsistentImages() {
    console.log('正在确保图片一致性...');
    
    // 创建有效图片URL数组
    const validImageUrls = [
        'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=150&h=150&fit=crop', // 白色衬衫
        'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=150&h=150&fit=crop', // 黑色T恤
        'https://images.unsplash.com/photo-1588359348343-8ebdea9fcb91?w=150&h=150&fit=crop', // 灰色卫衣
        'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=150&h=150&fit=crop', // 条纹衫
        'https://images.unsplash.com/photo-1542272604-787c3835535d?w=150&h=150&fit=crop', // 黑色长裤
        'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=150&h=150&fit=crop', // 牛仔裤
        'https://images.unsplash.com/photo-1605812860427-4024433a70fd?w=150&h=150&fit=crop', // 黑色皮鞋
        'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=150&h=150&fit=crop', // 红色运动鞋
        'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=150&h=150&fit=crop', // 手提包
        'https://images.unsplash.com/photo-1619946794135-5bc917a27793?w=150&h=150&fit=crop', // 腕表
        'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=150&h=150&fit=crop', // 项链
        'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=150&h=150&fit=crop', // 太阳镜
        'https://images.unsplash.com/photo-1518049362265-d5b2a6467637?w=150&h=150&fit=crop', // 围巾
        'https://images.unsplash.com/photo-1613152184920-bc1c4ab468f6?w=150&h=150&fit=crop', // 耳环
        'https://images.unsplash.com/photo-1620625515032-6ed0c1790c75?w=150&h=150&fit=crop'  // 手链
    ];
    
    // 替换衣橱管理中的图片
    const wardrobeItems = document.querySelectorAll('.wardrobe-item img');
    wardrobeItems.forEach((img, index) => {
        const validIndex = index % validImageUrls.length;
        const validUrl = validImageUrls[validIndex];
        
        // 只有当图片URL与有效URL不一致时才替换
        if (img.src !== validUrl) {
            console.log(`替换衣橱管理中的图片: ${img.src} -> ${validUrl}`);
            img.src = validUrl;
            
            // 根据图片更新alt文本
            const altTexts = [
                '白色衬衫', '黑色T恤', '灰色卫衣', '条纹衫', '黑色长裤',
                '牛仔裤', '黑色皮鞋', '红色运动鞋', '手提包', '腕表',
                '项链', '太阳镜', '围巾', '耳环', '手链'
            ];
            img.alt = altTexts[validIndex];
        }
    });
    
    // 替换首页单品区的图片
    const homeThumbnails = document.querySelectorAll('.item-thumbnail img');
    homeThumbnails.forEach((img, index) => {
        const validIndex = index % validImageUrls.length;
        const validUrl = validImageUrls[validIndex];
        
        // 根据有效URL构造缩略图URL（调整尺寸）
        const thumbnailUrl = validUrl.replace('w=150&h=150', 'w=120&h=120');
        
        // 只有当图片URL与有效URL不一致时才替换
        if (img.src !== thumbnailUrl) {
            console.log(`替换首页单品图片: ${img.src} -> ${thumbnailUrl}`);
            img.src = thumbnailUrl;
            
            // 根据图片更新alt文本
            const altTexts = [
                '白色衬衫', '黑色T恤', '灰色卫衣', '条纹衫', '黑色长裤',
                '牛仔裤', '黑色皮鞋', '红色运动鞋', '手提包', '腕表',
                '项链', '太阳镜', '围巾', '耳环', '手链'
            ];
            img.alt = `单品${index + 1}: ${altTexts[validIndex]}`;
        }
    });
    
    console.log('图片一致性确保完成');
}

/**
 * 初始化主页并添加图片错误处理
 */
function initHomePage() {
    console.log('初始化首页...');
    
    // 初始化缩略图点击事件和错误处理
    const thumbnails = document.querySelectorAll('.item-thumbnail');
    thumbnails.forEach((thumbnail, index) => {
        // 为缩略图添加点击事件
        thumbnail.addEventListener('click', () => {
            requireLogin(() => {
                const img = thumbnail.querySelector('img');
                const imgSrc = img ? img.src : '';
                const imgAlt = img ? img.alt : `单品${index + 1}`;
                showInfoModal(imgAlt, `这是${imgAlt}的详细描述信息。`, imgSrc);
            });
        });
        
        // 为图片添加错误处理
        const img = thumbnail.querySelector('img');
        if (img) {
            setImageErrorHandler(img);
        }
    });
    
    // 确保图片一致性
    setTimeout(ensureConsistentImages, 500);
    
    // 检查所有图片
    setTimeout(checkAllImages, 1000);
    
    console.log('首页初始化完成');
}

/**
 * 初始化页面功能
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('主应用初始化...');
    
    // 初始化事件监听器
    if (typeof initEventListeners === 'function') {
        initEventListeners();
    }
    
    // 初始化头部区域
    if (typeof initHeader === 'function') {
        initHeader();
    }
    
    // 初始化场景选择器
    if (typeof initSceneSelector === 'function') {
        initSceneSelector();
    }
    
    // 初始化家庭搭配选项
    if (typeof initFamilyStyleOption === 'function') {
        initFamilyStyleOption();
    }
    
    // 初始化状态
    if (typeof initState === 'function') {
        initState();
    }
    
    // 初始化衣橱页面
    if (typeof initWardrobePage === 'function') {
        initWardrobePage();
    }
    
    // 初始化首页
    if (typeof initHomePage === 'function') {
        initHomePage();
    }
    
    // 初始化搜索功能
    if (typeof initSearch === 'function') {
        initSearch();
    }
    
    // 导出全局函数，供其他模块使用
    window.showToast = showToast;
    window.showProcessingStatus = showProcessingStatus;
    window.hideProcessingStatus = hideProcessingStatus;
    
    // 延迟检查标签栏状态
    setTimeout(function() {
        console.log('检查标签栏状态...');
        
        // 检查标签栏容器
        const tabsContainer = document.querySelector('.category-tabs');
        const scrollLeftBtn = document.getElementById('scrollLeftBtn');
        const scrollRightBtn = document.getElementById('scrollRightBtn');
        
        if (tabsContainer) {
            console.log('找到标签栏容器:', {
                width: tabsContainer.offsetWidth,
                scrollWidth: tabsContainer.scrollWidth,
                childCount: tabsContainer.children.length
            });
            
            // 检查所有标签
            const tabs = Array.from(tabsContainer.querySelectorAll('.category-tab'));
            console.log(`找到${tabs.length}个标签`);
            
            // 检查配饰标签
            const accessoriesTab = tabs.find(tab => tab.dataset.category === 'accessories');
            if (accessoriesTab) {
                console.log('配饰标签:', {
                    display: window.getComputedStyle(accessoriesTab).display,
                    visibility: window.getComputedStyle(accessoriesTab).visibility,
                    opacity: window.getComputedStyle(accessoriesTab).opacity
                });
            } else {
                console.error('找不到配饰标签!');
            }
        } else {
            console.error('找不到标签栏容器!');
        }
        
        // 检查滚动箭头按钮
        if (scrollLeftBtn && scrollRightBtn) {
            console.log('滚动箭头按钮状态:', {
                left: {
                    display: window.getComputedStyle(scrollLeftBtn).display,
                    visibility: window.getComputedStyle(scrollLeftBtn).visibility,
                    opacity: window.getComputedStyle(scrollLeftBtn).opacity,
                    zIndex: window.getComputedStyle(scrollLeftBtn).zIndex
                },
                right: {
                    display: window.getComputedStyle(scrollRightBtn).display,
                    visibility: window.getComputedStyle(scrollRightBtn).visibility,
                    opacity: window.getComputedStyle(scrollRightBtn).opacity,
                    zIndex: window.getComputedStyle(scrollRightBtn).zIndex
                }
            });
        } else {
            console.error('找不到滚动箭头按钮!');
        }
        
        // 如果发现问题，尝试强制重新初始化
        if (tabsContainer) {
            const accessoriesTab = Array.from(tabsContainer.querySelectorAll('.category-tab')).find(tab => tab.dataset.category === 'accessories');
            if (!accessoriesTab || window.getComputedStyle(accessoriesTab).display === 'none') {
                console.log('检测到问题，强制重新初始化标签栏...');
                initCategoryTabs();
                setTimeout(ensureAllCategoriesVisible, 100);
            }
        }
    }, 1500);
    
    console.log('主应用初始化完成');
}); 

// 检查URL参数并显示相应的页面
function checkUrlParameters() {
    // 首先检查URL的hash部分
    if (window.location.hash === '#profile') {
        console.log('从URL hash检测到需要显示个人中心页面');
        
        // 延迟执行，确保DOM完全加载
        setTimeout(() => {
            showProfilePage();
        }, 300);
        return;
    }
    
    // 原有的localStorage检查仍然保留
    if (localStorage.getItem('showProfileScreen') === 'true') {
        console.log('从localStorage检测到需要显示个人中心页面');
        // 显示个人中心页面
        showProfilePage();
        // 移除标记，避免下次刷新页面时再次自动进入个人中心
        localStorage.removeItem('showProfileScreen');
        return;
    }
    
    const urlParams = new URLSearchParams(window.location.search);
    const section = urlParams.get('section');
    
    if (section) {
        console.log(`从URL参数检测到section: ${section}`);
        if (section === 'profile') {
            showProfilePage();
        } else {
            // 对于其他section，使用原始的showScreen函数
            showScreen(section);
        }
    }
}

// 专门用于显示个人中心页面的函数，不影响原有的showScreen函数
function showProfilePage() {
    console.log('专门显示个人中心页面');
    
    // 隐藏所有容器
    const allContainers = document.querySelectorAll('.iphone-container');
    allContainers.forEach(container => {
        container.style.display = 'none';
    });
    
    // 找到并显示个人中心页面
    const profileScreenContainer = document.querySelector('.container#profile-screen').closest('.iphone-container');
    if (profileScreenContainer) {
        profileScreenContainer.style.display = 'block';
        console.log('成功显示个人中心页面容器');
    } else {
        console.error('找不到个人中心页面容器');
    }
    
    // 激活个人中心底部导航按钮
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    const profileBtn = document.querySelector('#profileBtn');
    if (profileBtn) {
        profileBtn.classList.add('active');
    }
}

// 在页面加载完成后检查URL参数
document.addEventListener('DOMContentLoaded', function() {
    // 检查URL hash
    if (window.location.hash === '#profile') {
        // 如果URL中包含#profile，则显示个人中心页面
        setTimeout(function() {
            showProfilePage();
        }, 300);
    } else {
        // 否则显示首页（优先级最高）
        setTimeout(function() {
            showScreen('home');
        }, 100);
    }
});

// 监听hash变化，便于在页面已加载后通过修改hash显示个人中心
window.addEventListener('hashchange', function() {
    // 如果hash是#profile，则显示个人中心
    if (window.location.hash === '#profile') {
        showProfilePage();
    }
});

/**
 * 打开尺码档案页面
 */
function openSizeProfile() {
    console.log('打开尺码档案页面');
    // 使用showScreen函数直接在手机界面内切换到尺码档案页面
    if (typeof showScreen === 'function') {
        showScreen('size-profile');
    } else {
        console.error('showScreen函数不可用，无法切换到尺码档案页面');
    }
}