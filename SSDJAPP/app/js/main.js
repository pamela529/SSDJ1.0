document.addEventListener('DOMContentLoaded', () => {
    // 场景按钮切换
    const sceneButtons = document.querySelectorAll('.scene-btn');
    sceneButtons.forEach(button => {
        button.addEventListener('click', () => {
            sceneButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            // TODO: 更新模特展示的场景
        });
    });

    // 身份选择器变化
    const identitySelector = document.getElementById('identity');
    identitySelector.addEventListener('change', (e) => {
        const selectedIdentity = e.target.value;
        // TODO: 根据选择的身份更新模特图片
    });

    // 单品缩略图点击处理
    const itemThumbnails = document.querySelectorAll('.item-thumbnail');
    const itemDetailModal = document.querySelector('.item-detail-modal');
    const modalCloseBtn = document.querySelector('.close-btn');

    itemThumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            const modal = document.querySelector('.item-detail-modal');
            const modalImage = modal.querySelector('.item-large-image');
            const itemCategory = modal.querySelector('.item-category span');
            const itemColor = modal.querySelector('.item-color span');
            const itemScene = modal.querySelector('.item-scene span');
            const itemLastWorn = modal.querySelector('.item-last-worn span');

            // 示例数据，实际应用中应该从数据库获取
            const itemData = {
                image: thumbnail.querySelector('img').src,
                category: thumbnail.querySelector('img').alt,
                color: '藏青色',
                scene: '通勤、商务',
                lastWorn: '3天前'
            };

            // 更新模态框内容
            modalImage.src = itemData.image;
            itemCategory.textContent = itemData.category;
            itemColor.textContent = itemData.color;
            itemScene.textContent = itemData.scene;
            itemLastWorn.textContent = itemData.lastWorn;

            modal.style.display = 'flex';
        });
    });

    // 关闭模态框
    modalCloseBtn.addEventListener('click', () => {
        itemDetailModal.style.display = 'none';
    });

    // 点击模态框外部关闭
    itemDetailModal.addEventListener('click', (e) => {
        if (e.target === itemDetailModal) {
            itemDetailModal.style.display = 'none';
        }
    });

    // 底部导航按钮点击处理
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const action = button.querySelector('span').textContent;
            switch(action) {
                case '上传':
                    // TODO: 实现上传功能
                    console.log('上传功能待实现');
                    break;
                case '衣橱':
                    // TODO: 跳转到衣橱管理页面
                    console.log('衣橱管理页面待实现');
                    break;
                case '我的':
                    // TODO: 跳转到个人中心页面
                    console.log('个人中心页面待实现');
                    break;
            }
        });
    });

    // 模拟获取天气信息
    const updateWeather = () => {
        // TODO: 实际项目中应该调用天气API
        const weatherInfo = {
            city: '北京',
            temperature: '23°',
            weather: '晴'
        };
        
        document.querySelector('.city').textContent = weatherInfo.city;
        document.querySelector('.temperature').textContent = weatherInfo.temperature;
    };

    // 初始化天气信息
    updateWeather();

    // 筛选功能
    function showFilterModal() {
        const modal = document.getElementById('filterModal');
        modal.style.display = 'flex';
    }

    function closeFilterModal() {
        const modal = document.getElementById('filterModal');
        modal.style.display = 'none';
    }

    // 点击筛选标签
    document.querySelectorAll('.filter-tag').forEach(tag => {
        tag.addEventListener('click', () => {
            tag.classList.toggle('active');
        });
    });

    // 点击重置按钮
    document.querySelector('.reset-btn').addEventListener('click', () => {
        document.querySelectorAll('.filter-tag').forEach(tag => {
            tag.classList.remove('active');
        });
    });

    // 点击确定按钮
    document.querySelector('.confirm-btn').addEventListener('click', () => {
        // 获取选中的筛选条件
        const selectedTags = Array.from(document.querySelectorAll('.filter-tag.active'))
            .map(tag => tag.textContent);
        
        // 这里可以根据选中的条件筛选衣物
        console.log('Selected filters:', selectedTags);
        
        // 关闭弹窗
        closeFilterModal();
    });

    // 点击弹窗外部关闭
    document.querySelector('.filter-modal').addEventListener('click', (e) => {
        if (e.target.classList.contains('filter-modal')) {
            closeFilterModal();
        }
    });

    // 登录功能
    const loginButton = document.getElementById('loginButton');
    const loginModal = document.getElementById('loginModal');
    let isLoggedIn = false;
    let selectedAvatar = null;
    let countdownInterval = null;

    // 显示登录弹窗
    function showLoginModal() {
        loginModal.style.display = 'flex';
        setTimeout(() => {
            loginModal.classList.add('active');
        }, 10);
    }

    // 关闭登录弹窗
    function closeLoginModal() {
        loginModal.classList.remove('active');
        setTimeout(() => {
            loginModal.style.display = 'none';
            resetLoginModal();
        }, 300);
    }

    // 重置登录弹窗状态
    function resetLoginModal() {
        document.querySelector('.login-methods').style.display = 'flex';
        document.querySelector('.avatar-selection').style.display = 'none';
        document.querySelector('.phone-login-form').style.display = 'none';
        
        // 清除选中的头像
        const avatarOptions = document.querySelectorAll('.avatar-option');
        avatarOptions.forEach(option => {
            option.classList.remove('selected');
        });
        
        // 重置手机表单
        const phoneForm = document.querySelector('.phone-login-form');
        if (phoneForm) {
            const inputs = phoneForm.querySelectorAll('input');
            inputs.forEach(input => {
                input.value = '';
            });
        }
        
        // 重置验证码按钮
        const sendCodeBtn = document.getElementById('sendCodeBtn');
        if (sendCodeBtn) {
            sendCodeBtn.textContent = '获取验证码';
            sendCodeBtn.classList.remove('disabled');
            sendCodeBtn.disabled = false;
        }
        
        // 清除倒计时
        if (countdownInterval) {
            clearInterval(countdownInterval);
            countdownInterval = null;
        }
    }

    // 初始化登录按钮点击事件
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
                // 使用全局切换函数跳转到个人中心
                if (typeof showScreen === 'function') {
                    showScreen('profile');
                } else {
                    // 如果没有全局跳转函数，则直接修改hash
                    window.location.hash = 'profile';
                    // 触发一个自定义事件，通知系统显示个人中心
                    const event = new CustomEvent('showProfile');
                    window.dispatchEvent(event);
                }
            }
        });
        
        // 添加鼠标悬停和离开效果
        loginButton.addEventListener('mouseenter', () => {
            if (isLoggedIn) {
                loginButton.title = '点击查看个人中心';
            }
        });
    }

    // 初始化关闭按钮
    const closeBtn = document.querySelector('.login-modal .close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeLoginModal);
    }

    // 点击空白区域关闭弹窗
    loginModal.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            closeLoginModal();
        }
    });

    // 微信登录按钮
    const wechatLoginBtn = document.querySelector('.wechat-login-btn');
    if (wechatLoginBtn) {
        wechatLoginBtn.addEventListener('click', () => {
            // 模拟微信授权登录，实际项目中应调用微信SDK
            setTimeout(() => {
                // 模拟获取到用户头像
                const wechatAvatar = 'https://randomuser.me/api/portraits/men/43.jpg';
                setLoggedIn(wechatAvatar);
                closeLoginModal();
                showToast('微信授权登录成功');
            }, 1000);
        });
    }

    // 手机登录按钮
    const phoneLoginBtn = document.querySelector('.phone-login-btn');
    if (phoneLoginBtn) {
        phoneLoginBtn.addEventListener('click', () => {
            document.querySelector('.login-methods').style.display = 'none';
            document.querySelector('.phone-login-form').style.display = 'block';
        });
    }

    // 发送验证码按钮
    const sendCodeBtn = document.getElementById('sendCodeBtn');
    if (sendCodeBtn) {
        sendCodeBtn.addEventListener('click', () => {
            const phoneInput = document.getElementById('phoneNumber');
            const phone = phoneInput.value.trim();
            
            if (phone.length !== 11) {
                showToast('请输入正确的手机号');
                return;
            }
            
            // 禁用按钮并开始倒计时
            sendCodeBtn.disabled = true;
            sendCodeBtn.classList.add('disabled');
            
            let countdown = 60;
            sendCodeBtn.textContent = `${countdown}s`;
            
            countdownInterval = setInterval(() => {
                countdown--;
                sendCodeBtn.textContent = `${countdown}s`;
                
                if (countdown <= 0) {
                    clearInterval(countdownInterval);
                    sendCodeBtn.textContent = '获取验证码';
                    sendCodeBtn.disabled = false;
                    sendCodeBtn.classList.remove('disabled');
                }
            }, 1000);
            
            // 模拟发送验证码
            showToast('验证码已发送');
        });
    }

    // 手机登录提交按钮
    const phoneLoginSubmitBtn = document.getElementById('phoneLoginSubmitBtn');
    if (phoneLoginSubmitBtn) {
        phoneLoginSubmitBtn.addEventListener('click', () => {
            const phoneInput = document.getElementById('phoneNumber');
            const codeInput = document.getElementById('verificationCode');
            const phone = phoneInput.value.trim();
            const code = codeInput.value.trim();
            
            if (phone.length !== 11) {
                showToast('请输入正确的手机号');
                return;
            }
            
            if (code.length !== 6) {
                showToast('请输入6位验证码');
                return;
            }
            
            // 模拟验证码验证成功，进入头像选择
            document.querySelector('.phone-login-form').style.display = 'none';
            document.querySelector('.avatar-selection').style.display = 'block';
        });
    }

    // 头像选择
    const avatarOptions = document.querySelectorAll('.avatar-option');
    avatarOptions.forEach(option => {
        if (!option.classList.contains('custom-avatar')) {
            option.addEventListener('click', () => {
                // 取消之前选中的头像
                avatarOptions.forEach(opt => opt.classList.remove('selected'));
                // 选中当前头像
                option.classList.add('selected');
                selectedAvatar = option.querySelector('img').src;
                
                // 设置登录状态并关闭弹窗
                setLoggedIn(selectedAvatar);
                closeLoginModal();
                showToast('登录成功');
            });
        }
    });

    // 自定义头像上传
    const avatarUpload = document.getElementById('avatarUpload');
    if (avatarUpload) {
        avatarUpload.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    // 设置头像为用户上传的图片
                    setLoggedIn(e.target.result);
                    closeLoginModal();
                    showToast('自定义头像设置成功');
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // 设置登录状态
    function setLoggedIn(avatarUrl) {
        isLoggedIn = true;
        
        // 清除内部文本和图标
        const loginText = loginButton.querySelector('.login-text');
        const loginIcon = loginButton.querySelector('.login-icon-default');
        if (loginText) loginText.style.display = 'none';
        if (loginIcon) loginIcon.style.display = 'none';
        
        loginButton.classList.add('logged-in');
        loginButton.style.backgroundImage = `url(${avatarUrl})`;
        
        // 添加登录成功动画
        loginButton.classList.add('animate');
        setTimeout(() => {
            loginButton.classList.remove('animate');
        }, 600);
        
        // 可以在这里将登录状态保存到本地存储
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userAvatar', avatarUrl);
    }

    // 退出登录
    function logout() {
        isLoggedIn = false;
        
        // 恢复内部文本和图标
        const loginText = loginButton.querySelector('.login-text');
        const loginIcon = loginButton.querySelector('.login-icon-default');
        if (loginText) loginText.style.display = '';
        if (loginIcon) loginIcon.style.display = '';
        
        loginButton.classList.remove('logged-in');
        loginButton.style.backgroundImage = '';
        
        // 清除本地存储的登录状态
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userAvatar');
        
        showToast('已退出登录');
    }

    // 检查是否已登录（页面加载时）
    function checkLoginStatus() {
        const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
        const storedUserAvatar = localStorage.getItem('userAvatar');
        
        if (storedIsLoggedIn === 'true' && storedUserAvatar) {
            setLoggedIn(storedUserAvatar);
        } else {
            // 确保未登录状态下按钮内容正确显示
            const loginText = loginButton.querySelector('.login-text');
            const loginIcon = loginButton.querySelector('.login-icon-default');
            if (loginText) loginText.style.display = '';
            if (loginIcon) loginIcon.style.display = '';
        }
    }

    // 显示提示信息
    function showToast(message) {
        let toast = document.querySelector('.toast-message');
        
        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'toast-message';
            document.body.appendChild(toast);
        }
        
        toast.textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2000);
    }

    // 检查登录状态
    checkLoginStatus();

    // 为登录弹窗关闭函数添加到全局作用域
    window.closeLoginModal = closeLoginModal;

    // 系统风格通知功能
    const systemNotification = document.getElementById('systemNotification');
    const closeNotificationBtn = document.getElementById('closeNotification');
    let notificationTimeout = null;
    
    // 确保通知容器在正确位置
    const notificationContainer = document.querySelector('.notification-container');
    if (notificationContainer) {
        // 不需要在这里设置bottom，由CSS控制
    }
    
    // 显示系统风格通知
    function showSystemNotification(message) {
        if (systemNotification) {
            // 如果已经提供了消息，则更新文本
            if (message) {
                const notificationText = systemNotification.querySelector('.notification-text');
                if (notificationText) {
                    notificationText.textContent = message;
                }
            }
            
            // 显示通知
            systemNotification.style.display = 'flex';
            
            setTimeout(() => {
                systemNotification.classList.add('active');
            }, 10);
            
            // 设置自动关闭定时器
            if (notificationTimeout) {
                clearTimeout(notificationTimeout);
            }
            
            notificationTimeout = setTimeout(() => {
                hideSystemNotification();
            }, 5000); // 5秒后自动隐藏
        }
    }
    
    // 隐藏系统风格通知
    function hideSystemNotification() {
        if (systemNotification) {
            systemNotification.classList.remove('active');
            systemNotification.classList.add('hiding');
            
            setTimeout(() => {
                systemNotification.style.display = 'none';
                systemNotification.classList.remove('hiding');
            }, 300);
        }
    }
    
    // 关闭按钮点击事件
    if (closeNotificationBtn) {
        closeNotificationBtn.addEventListener('click', () => {
            hideSystemNotification();
        });
    }
    
    // 家庭风格复选框变化事件
    const familyStyleCheck = document.getElementById('familyStyleCheck');
    if (familyStyleCheck) {
        // 记录初始状态，避免在页面加载时触发通知
        let isInitialState = true;
        
        familyStyleCheck.addEventListener('change', (e) => {
            // 只在非初始状态下显示通知
            if (!isInitialState) {
                if (e.target.checked) {
                    showSystemNotification('已启用系统统一风格搭配模式');
                } else {
                    showSystemNotification('已启用个性化搭配推荐模式');
                }
            }
            
            // 设置为非初始状态
            isInitialState = false;
        });
    }

    // 将通知函数添加到全局作用域
    window.showSystemNotification = showSystemNotification;
    window.hideSystemNotification = hideSystemNotification;
}); 