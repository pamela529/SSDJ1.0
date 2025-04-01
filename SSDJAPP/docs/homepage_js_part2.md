# 首页JavaScript功能（第二部分）

以下是智能衣橱应用首页的JavaScript功能代码的第二部分，包括筛选功能、通知、颜色选择器等功能。这些代码需要保持不变，以确保应用的功能正常运行。

## 筛选功能

```javascript
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
```

## 通知和提示功能

```javascript
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
 * 初始化家庭搭配选项
 */
function initFamilyStyleOption() {
    const familyStyleCheck = document.getElementById('familyStyleCheck');
    if (familyStyleCheck) {
        // 默认不勾选
        familyStyleCheck.checked = false;
        
        // 添加变更事件监听
        familyStyleCheck.addEventListener('change', (e) => {
            const isChecked = e.target.checked;
            console.log('家庭选项变更:', isChecked);
            
            // 当选项变更时，更新推荐搭配的展示
            // 使用相同的通知方式处理，确保所有通知都在手机界面内
            if (isChecked) {
                showSystemNotification('已启用家庭统一风格搭配模式');
            } else {
                showSystemNotification('已启用个性化搭配推荐模式');
            }
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
```

## 颜色选择器功能

```javascript
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
``` 