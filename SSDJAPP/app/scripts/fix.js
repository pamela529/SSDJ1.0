/**
 * 修复社交页面大图显示问题的脚本
 * 1. 删除热点提示文字
 * 2. 确保手机界面尺寸一致
 * 3. 移除上方外部黑条
 */
document.addEventListener('DOMContentLoaded', function() {
    // 修复函数 - 移除热点提示和外部黑条
    function fixOutfitDetailDisplay() {
        console.log('正在应用显示修复...');
        
        // 1. 重写 openOutfitDetailModal 函数，移除热点提示
        window.originalOpenOutfitDetailModal = window.openOutfitDetailModal;
        window.openOutfitDetailModal = function(outfitData) {
            // 调用原函数
            window.originalOpenOutfitDetailModal(outfitData);
            
            // 移除热点提示区域
            const hintContainer = document.querySelector('.hotspot-hint-container');
            if (hintContainer) {
                hintContainer.remove();
            }
        };
        
        // 2. 删除外部黑条样式
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            .phone-frame-simulation:before {
                display: none !important;
            }
            
            /* 确保手机界面尺寸一致 */
            .phone-frame-simulation .outfit-detail-content {
                width: 390px !important;
                height: 844px !important;
                border-radius: 55px !important;
                border: 12px solid #1D1D1F !important;
                box-shadow: 0 0 20px rgba(0,0,0,0.1) !important;
                max-width: 390px !important;
                margin: 0 auto !important;
            }
        `;
        document.head.appendChild(styleElement);
        
        console.log('显示修复已应用');
    }
    
    // 应用修复
    fixOutfitDetailDisplay();
}); 