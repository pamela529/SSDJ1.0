# 首页HTML结构

以下是智能衣橱应用首页的HTML结构，包括所有必要的元素和结构。这些代码需要保持不变，以确保应用的功能正常运行。

```html
<!-- 首页原型 -->
<div class="iphone-container">
    <div class="iphone-notch"></div>
    <div class="container" id="home-screen">
        <!-- 原有的首页内容 -->
        <div class="header">
            <div class="title-weather">
                <div class="login-button" id="loginButton">
                    <span class="login-text">登录</span>
                    <span class="login-icon-default">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="#007AFF"/>
                        </svg>
                    </span>
                </div>
                <h1>今日推荐</h1>
                <div class="weather-info">
                    <span>北京</span>
                    <span>🌤</span>
                    <span>23°</span>
                </div>
            </div>
            <div class="identity-selector-container">
                <div class="identity-selector">
                    <select>
                        <option selected>本人</option>
                        <option>老公</option>
                        <option>孩子</option>
                        <option>宠物</option>
                    </select>
                </div>
                <label class="family-option">
                    <input type="checkbox" id="familyStyleCheck">
                    <span class="family-text">家庭</span>
                    <span class="help-icon">?
                        <span class="help-tooltip">勾选后，不同身份的推荐搭配将保持统一风格，为您的全家人提供协调的穿搭方案。不勾选则会根据每个成员的个性提供多样化的推荐。</span>
                    </span>
                </label>
            </div>
            <div class="items-header">
                <span class="items-title">单品</span>
                <button class="filter-btn" onclick="showFilterModal()">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 4h12M4 8h8M6 12h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                    </svg>
                </button>
            </div>
        </div>

        <main class="main-content">
            <div class="scene-selector">
                <button class="scene-btn active">适勤</button>
                <button class="scene-btn">商务</button>
                <button class="scene-btn">休闲</button>
                <button class="scene-btn">聚会</button>
            </div>

            <div class="model-display">
                <img class="model-image" src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=1200&fit=crop" alt="模特展示">
            </div>

            <div class="items-display">
                <div class="items-content">
                    <div class="item-thumbnail">
                        <img src="https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=120&h=120&fit=crop" alt="单品1">
                    </div>
                    <div class="item-thumbnail">
                        <img src="https://images.unsplash.com/photo-1521369909029-2afed882baee?w=120&h=120&fit=crop" alt="单品2">
                    </div>
                    <div class="item-thumbnail">
                        <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=120&h=120&fit=crop" alt="单品3">
                    </div>
                    <div class="item-thumbnail">
                        <img src="https://images.unsplash.com/photo-1518049362265-d5b2a6467637?w=120&h=120&fit=crop" alt="单品4">
                    </div>
                    <div class="item-thumbnail">
                        <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=120&h=120&fit=crop" alt="单品5">
                    </div>
                    <div class="item-thumbnail">
                        <img src="https://images.unsplash.com/photo-1521369909029-2afed882baee?w=120&h=120&fit=crop" alt="单品6">
                    </div>
                    <div class="item-thumbnail">
                        <img src="https://images.unsplash.com/photo-1518049362265-d5b2a6467637?w=120&h=120&fit=crop" alt="单品7">
                    </div>
                    <div class="item-thumbnail">
                        <img src="https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=120&h=120&fit=crop" alt="单品8">
                    </div>
                    <div class="item-thumbnail">
                        <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=120&h=120&fit=crop" alt="单品9">
                    </div>
                    <div class="item-thumbnail">
                        <img src="https://images.unsplash.com/photo-1521369909029-2afed882baee?w=120&h=120&fit=crop" alt="单品10">
                    </div>
                    <div class="item-thumbnail">
                        <img src="https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=120&h=120&fit=crop" alt="单品11">
                    </div>
                    <div class="item-thumbnail">
                        <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=120&h=120&fit=crop" alt="单品12">
                    </div>
                    <div class="item-thumbnail">
                        <img src="https://images.unsplash.com/photo-1518049362265-d5b2a6467637?w=120&h=120&fit=crop" alt="单品13">
                    </div>
                    <div class="item-thumbnail">
                        <img src="https://images.unsplash.com/photo-1521369909029-2afed882baee?w=120&h=120&fit=crop" alt="单品14">
                    </div>
                    <div class="item-thumbnail">
                        <img src="https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=120&h=120&fit=crop" alt="单品15">
                    </div>
                </div>
            </div>
        </main>

        <nav class="bottom-nav">
            <button class="nav-btn" id="uploadBtn">
                <span class="nav-icon">+</span>
            </button>
            <button class="nav-btn" id="aiBtn">
                <span class="nav-icon">AI</span>
            </button>
            <button class="nav-btn" id="wardrobeBtn">
                <span class="nav-icon wardrobe-icon">衣橱</span>
            </button>
        </nav>
    </div>
    
    <div class="iphone-home-indicator"></div>
    
    <!-- 筛选弹窗（移到iPhone容器内） -->
    <div class="filter-modal" id="filterModal" style="display: none;">
        <div class="filter-content">
            <div class="filter-header">
                <h3>筛选</h3>
                <button class="close-btn" onclick="closeFilterModal()">×</button>
            </div>
            <div class="filter-options">
                <div class="filter-group">
                    <h4>归属人</h4>
                    <div class="filter-select-container">
                        <select class="filter-select" id="owner-select">
                            <option value="全部" selected>全部</option>
                            <option value="本人">本人</option>
                            <option value="配偶">配偶</option>
                            <option value="孩子">孩子</option>
                            <option value="宠物">宠物</option>
                        </select>
                    </div>
                </div>
                <div class="filter-group">
                    <h4>类别</h4>
                    <div class="filter-select-container">
                        <select class="filter-select" id="category-select">
                            <option value="" selected>请选择</option>
                            <option value="上衣">上衣</option>
                            <option value="裤子">裤子</option>
                            <option value="裙子">裙子</option>
                            <option value="外套">外套</option>
                            <option value="礼服">礼服</option>
                            <option value="鞋履">鞋履</option>
                            <option value="配饰">配饰</option>
                        </select>
                    </div>
                </div>
                <div class="filter-group">
                    <h4>颜色</h4>
                    <div class="filter-select-container" id="color-select-container">
                        <select class="filter-select" id="color-select">
                            <option value="" selected>请选择</option>
                            <option value="#000000" data-color="#000000">黑色</option>
                            <option value="#FFFFFF" data-color="#FFFFFF">白色</option>
                            <option value="#FF3B30" data-color="#FF3B30">红色</option>
                            <option value="#FF9500" data-color="#FF9500">橙色</option>
                            <option value="#FFCC00" data-color="#FFCC00">黄色</option>
                            <option value="#34C759" data-color="#34C759">绿色</option>
                            <option value="#5AC8FA" data-color="#5AC8FA">浅蓝</option>
                            <option value="#007AFF" data-color="#007AFF">蓝色</option>
                            <option value="#5856D6" data-color="#5856D6">紫色</option>
                            <option value="#AF52DE" data-color="#AF52DE">紫红</option>
                            <option value="#FF2D55" data-color="#FF2D55">粉色</option>
                            <option value="#A2845E" data-color="#A2845E">棕色</option>
                        </select>
                    </div>
                </div>
                <div class="filter-group">
                    <h4>季节</h4>
                    <div class="filter-select-container">
                        <select class="filter-select" id="season-select">
                            <option value="" selected>请选择</option>
                            <option value="春季">春季</option>
                            <option value="夏季">夏季</option>
                            <option value="秋季">秋季</option>
                            <option value="冬季">冬季</option>
                            <option value="四季">四季</option>
                        </select>
                    </div>
                </div>
                <div class="filter-group">
                    <h4>场合</h4>
                    <div class="filter-select-container">
                        <select class="filter-select" id="occasion-select">
                            <option value="" selected>请选择</option>
                            <option value="正式">正式</option>
                            <option value="休闲">休闲</option>
                            <option value="职场">职场</option>
                            <option value="运动">运动</option>
                            <option value="家居">家居</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="filter-actions">
                <button class="reset-btn" onclick="resetFilters()">重置</button>
                <button class="confirm-btn" onclick="applyFilters()">确定</button>
            </div>
        </div>
    </div>

    <!-- 登录弹窗（放到iPhone容器内） -->
    <div class="login-modal" id="loginModal" style="display: none;">
        <div class="login-content">
            <div class="login-header">
                <h3>登录</h3>
                <button class="close-btn" onclick="closeLoginModal()">×</button>
            </div>
            <div class="login-methods">
                <button class="login-method-btn wechat-login-btn">
                    <span class="login-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.5,7C8.7,7,8,7.7,8,8.5V10H11V12H8V18H6V12H4V10H6V8.5C6,6.6,7.6,5,9.5,5H11V7H9.5M16,7C14.3,7,13,8.3,13,10V14C13,15.7,14.3,17,16,17H18C19.7,17,21,15.7,21,14V10C21,8.3,19.7,7,18,7H16M16,9H18C18.6,9,19,9.4,19,10V14C19,14.6,18.6,15,18,15H16C15.4,15,15,14.6,15,14V10C15,9.4,15.4,9,16,9Z" fill="#07C160"/>
                        </svg>
                    </span>
                    <span class="login-method-text">微信登录</span>
                </button>
                <button class="login-method-btn phone-login-btn">
                    <span class="login-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17,19H7V5H17M17,1H7C5.89,1 5,1.89 5,3V21A2,2 0 0,0 7,23H17A2,2 0 0,0 19,21V3C19,1.89 18.1,1 17,1Z" fill="#007AFF"/>
                        </svg>
                    </span>
                    <span class="login-method-text">手机号登录</span>
                </button>
            </div>
            <div class="avatar-selection" style="display: none;">
                <h4>选择头像</h4>
                <div class="avatar-options">
                    <div class="avatar-option" data-avatar="avatar1">
                        <img src="https://randomuser.me/api/portraits/women/32.jpg" alt="时尚头像1">
                    </div>
                    <div class="avatar-option" data-avatar="avatar2">
                        <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="时尚头像2">
                    </div>
                    <div class="avatar-option" data-avatar="avatar3">
                        <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="时尚头像3">
                    </div>
                    <div class="avatar-option" data-avatar="avatar4">
                        <img src="https://randomuser.me/api/portraits/men/36.jpg" alt="时尚头像4">
                    </div>
                    <div class="avatar-option custom-avatar">
                        <input type="file" id="avatarUpload" accept="image/*" style="display: none;">
                        <label for="avatarUpload" class="upload-avatar-label">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="#007AFF"/>
                            </svg>
                            <span>上传照片</span>
                        </label>
                    </div>
                </div>
            </div>
            <div class="phone-login-form" style="display: none;">
                <div class="input-group">
                    <input type="tel" id="phoneNumber" placeholder="请输入手机号" maxlength="11">
                </div>
                <div class="input-group verification-code-group">
                    <input type="text" id="verificationCode" placeholder="验证码" maxlength="6">
                    <button id="sendCodeBtn">获取验证码</button>
                </div>
                <button class="login-submit-btn" id="phoneLoginSubmitBtn">登录</button>
            </div>
        </div>
    </div>
</div>