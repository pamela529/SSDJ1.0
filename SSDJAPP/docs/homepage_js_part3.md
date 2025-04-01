# 首页JavaScript功能（第三部分）

以下是智能衣橱应用首页的JavaScript功能代码的第三部分，包括登录相关功能。这些代码需要保持不变，以确保应用的功能正常运行。

## 登录功能

```javascript
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
        loginSuccess('https://randomuser.me/api/portraits/women/68.jpg');
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
            'https://randomuser.me/api/portraits/women/32.jpg',
            'https://randomuser.me/api/portraits/women/44.jpg',
            'https://randomuser.me/api/portraits/men/32.jpg',
            'https://randomuser.me/api/portraits/men/36.jpg'
        ];
        const randomAvatar = randomAvatars[Math.floor(Math.random() * randomAvatars.length)];
        
        // 登录成功
        loginSuccess(randomAvatar);
    }, 1500);
}

/**
 * 登录成功处理
 * @param {string} avatarUrl - 用户头像URL
 */
function loginSuccess(avatarUrl) {
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
}
```

## 事件监听初始化

```javascript
// 初始化所有事件监听
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded - 初始化事件监听');
    
    // 设置默认显示首页
    showScreen('home');
    
    // 初始化底部导航按钮
    initNavButtons();
    
    // 立即初始化颜色选择器
    console.log('立即初始化颜色选择器');
    initColorSelect();
    
    // 初始化家庭搭配选项
    initFamilyStyleOption();
    
    // 初始化缩略图点击事件
    const thumbnails = document.querySelectorAll('.item-thumbnail');
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            showInfoModal(index + 1);
        });
    });

    // 初始化模态框点击关闭
    const modal = document.getElementById('infoModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeInfoModal();
            }
        });
    }
    
    // 测试个性化搭配推荐模式通知
    setTimeout(() => {
        console.log('显示个性化搭配推荐模式通知');
        showSystemNotification('已启用个性化搭配推荐模式');
    }, 1000);
    
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

    // 为首页的登录按钮添加点击事件
    const loginButton = document.getElementById('loginButton');
    if (loginButton) {
        loginButton.addEventListener('click', () => {
            const loginModal = document.getElementById('loginModal');
            if (loginModal) {
                loginModal.style.display = 'flex';
                setTimeout(() => {
                    loginModal.classList.add('active');
                }, 10);
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
});
```

## 图片和单品处理

```javascript
// 显示信息卡片弹窗
function showInfoModal(itemId) {
    const modal = document.getElementById('infoModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');

    if (modal && modalImage && modalTitle && modalDesc) {
        const thumbnail = document.querySelector(`.item-thumbnail:nth-child(${itemId}) img`);
        if (thumbnail) {
            modalImage.src = thumbnail.src;
            modalTitle.textContent = `单品${itemId}`;
            modalDesc.textContent = `这是单品${itemId}的详细描述信息。`;
            modal.classList.add('active');
        }
    }
}

// 关闭信息卡片弹窗
function closeInfoModal() {
    const modal = document.getElementById('infoModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// 打开相机
function openCamera() {
    // 创建一个input元素用于拍照
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'camera'; // 指定使用相机拍摄
    
    input.onchange = function(event) {
        const file = event.target.files[0];
        if (file) {
            // 处理拍摄的照片
            processSelectedImage(file);
        }
    };
    
    // 关闭当前弹窗
    closeUploadOptionsModal();
    
    // 触发点击事件
    input.click();
}

// 打开相册/文件选择
function openGallery() {
    // 创建一个input元素用于选择图片
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = false;
    
    input.onchange = function(event) {
        const file = event.target.files[0];
        if (file) {
            // 处理选择的图片
            processSelectedImage(file);
        }
    };
    
    // 关闭当前弹窗
    closeUploadOptionsModal();
    
    // 触发点击事件
    input.click();
}

// 处理选择的图片
function processSelectedImage(file) {
    console.log('处理上传的图片:', file.name);
    
    // 创建文件读取器
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const imageDataUrl = e.target.result;
        
        // 显示上传中提示
        showToast('正在上传图片...');
        
        // 模拟上传过程
        setTimeout(() => {
            // 上传成功提示
            showToast('图片上传成功！');
            
            // 模拟衣物添加到衣橱
            simulateAddToWardrobe(imageDataUrl);
        }, 1500);
    };
    
    // 读取文件
    reader.readAsDataURL(file);
}

// 模拟将衣物添加到衣橱
function simulateAddToWardrobe(imageUrl) {
    console.log('添加衣物到衣橱:', imageUrl.substring(0, 30) + '...');
    
    // 创建新的单品缩略图
    const itemsContent = document.querySelector('.items-content');
    if (itemsContent) {
        const newItem = document.createElement('div');
        newItem.className = 'item-thumbnail';
        
        const newItemImg = document.createElement('img');
        newItemImg.src = imageUrl;
        newItemImg.alt = '新上传单品';
        
        newItem.appendChild(newItemImg);
        
        // 将新单品插入到开头位置
        if (itemsContent.firstChild) {
            itemsContent.insertBefore(newItem, itemsContent.firstChild);
        } else {
            itemsContent.appendChild(newItem);
        }
        
        // 为新添加的单品添加点击事件
        newItem.addEventListener('click', () => {
            showInfoModal('new');
        });
        
        // 显示上传成功反馈
        setTimeout(() => {
            newItem.classList.add('highlight');
            
            // 移除高亮效果
            setTimeout(() => {
                newItem.classList.remove('highlight');
            }, 2000);
        }, 100);
    }
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
``` 