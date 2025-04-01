/**
 * 图像分割处理模块
 * 用于实现服装和饰品的自动抠图功能
 */

// 添加标志避免循环调用
let isCallingToast = false;
let isCallingStatus = false;
let isCallingHideStatus = false;

// 安全调用toast函数
function showToast(message) {
    // 防止循环调用
    if (isCallingToast) {
        console.log('[Toast Fallback]', message);
        return;
    }
    
    // 检查window.showToast是否存在
    if (window.showToast) {
        isCallingToast = true;
        try {
            window.showToast(message);
        } finally {
            isCallingToast = false;
        }
    } else {
        // fallback到console
        console.log('[Toast]', message);
    }
}

// 安全显示处理状态
function showStatus(message) {
    // 防止循环调用
    if (isCallingStatus) {
        console.log('[Status Fallback]', message);
        return null;
    }
    
    if (window.showProcessingStatus) {
        isCallingStatus = true;
        try {
            return window.showProcessingStatus(message);
        } finally {
            isCallingStatus = false;
        }
    } else {
        console.log('[Processing Status]', message);
        return null;
    }
}

// 安全隐藏处理状态
function hideStatus() {
    // 防止循环调用
    if (isCallingHideStatus) {
        console.log('[Hide Status Fallback]');
        return;
    }
    
    if (window.hideProcessingStatus) {
        isCallingHideStatus = true;
        try {
            window.hideProcessingStatus();
        } finally {
            isCallingHideStatus = false;
        }
    } else {
        console.log('[Hide Processing Status]');
    }
}

// 存储bodyPix模型实例
let bodyPixModel = null;
let isModelLoading = false;
let isProcessing = false;
let modelLoadingPromise = null;

// 配置参数
const segmentationConfig = {
    flipHorizontal: false,
    internalResolution: 'medium',
    segmentationThreshold: 0.5,  // 降低阈值，增加检测敏感度
    scoreThreshold: 0.2,
    nmsRadius: 20,
    minDetectionConfidence: 0.2, // 降低检测置信度要求
    minKeypointScore: 0.3
};

/**
 * 初始化BodyPix模型
 * @param {number} [timeout=15000] - 加载超时时间(毫秒)
 * @returns {Promise<object>} - 返回加载好的模型
 */
async function initializeBodyPixModel(timeout = 15000) {
    // 如果模型已加载，直接返回
    if (bodyPixModel) {
        return bodyPixModel;
    }

    // 如果正在加载，等待加载完成
    if (isModelLoading && modelLoadingPromise) {
        return modelLoadingPromise;
    }

    // 开始加载模型
    isModelLoading = true;
    
    // 创建加载Promise
    modelLoadingPromise = new Promise(async (resolve, reject) => {
        // 设置超时
        const timeoutId = setTimeout(() => {
            isModelLoading = false;
            modelLoadingPromise = null;
            reject(new Error('模型加载超时，请检查网络连接并刷新页面重试'));
        }, timeout);

        try {
            console.log("开始加载BodyPix模型...");
            // 加载模型
            const model = await bodyPix.load({
                architecture: 'MobileNetV1',
                outputStride: 16,
                multiplier: 0.75,
                quantBytes: 2
            });
            
            // 清除超时
            clearTimeout(timeoutId);
            
            console.log("BodyPix模型加载完成");
            bodyPixModel = model;
            isModelLoading = false;
            resolve(model);
        } catch (error) {
            // 清除超时
            clearTimeout(timeoutId);
            
            console.error("BodyPix模型加载失败:", error);
            isModelLoading = false;
            modelLoadingPromise = null;
            reject(error);
        }
    });

    return modelLoadingPromise;
}

/**
 * 处理图像，进行分割
 * @param {HTMLImageElement} image - 要处理的图像
 * @returns {Promise<HTMLCanvasElement>} 处理后的Canvas
 */
async function processImage(image) {
    if (isProcessing) {
        console.log('已有图像正在处理中，请稍后再试');
        showToast('正在处理其他图像，请稍候');
        return null;
    }
    
    isProcessing = true;
    
    try {
        console.log('开始处理图像:', image.width, 'x', image.height);
        showStatus('图像分析中...');
        
        // 创建结果画布
        const resultCanvas = document.createElement('canvas');
        resultCanvas.width = image.width;
        resultCanvas.height = image.height;
        const ctx = resultCanvas.getContext('2d');
        
        // 检查图像有效性
        if (!image || image.width === 0 || image.height === 0) {
            throw new Error('无效的图像数据');
        }
        
        // 检查环境
        const isTFAvailable = typeof tf !== 'undefined' && tf.ready && await tf.ready();
        const isBodyPixAvailable = typeof bodyPix !== 'undefined' && bodyPix.load;
        
        console.log('环境检查:', {
            tf: isTFAvailable ? '可用' : '不可用',
            bodyPix: isBodyPixAvailable ? '可用' : '不可用'
        });
        
        // --------- 无需模型的独立处理模式 ---------
        // 首先检查图像宽高比，判断是否可能是服装单品图片
        const aspectRatio = image.width / image.height;
        const isLikelyClothing = (aspectRatio > 0.5 && aspectRatio < 2.0);
        
        // 如果形状看起来像服装单品，或者检测到环境不完整，使用替代方法
        if (isLikelyClothing || !isTFAvailable || !isBodyPixAvailable) {
            console.log('使用独立图像处理模式...');
            ctx.drawImage(image, 0, 0);
            return await processImageWithoutPerson(image);
        }
        
        // --------- 以下是有模型时的处理 ---------
        // 确保模型已加载
        if (!bodyPixModel) {
            try {
                console.log('尝试加载BodyPix模型...');
                showStatus('加载AI模型...');
                bodyPixModel = await initializeBodyPixModel();
                if (!bodyPixModel) {
                    throw new Error('模型加载失败');
                }
                console.log('BodyPix模型加载成功');
            } catch (modelError) {
                console.error('模型加载失败:', modelError);
                showToast('AI模型加载失败，使用替代方法');
                
                // 回退到替代处理方法
                ctx.drawImage(image, 0, 0);
                hideStatus();
                isProcessing = false;
                return processImageWithoutPerson(image);
            }
        }
        
        // 使用BodyPix进行人物分割
        updateProgress(20, 'AI分析中...');
        let segmentation = null;
        try {
            // 设置超时保护
            const segmentationPromise = bodyPixModel.segmentPerson(image, segmentationConfig);
            const timeoutPromise = new Promise((_, reject) => 
                setTimeout(() => reject(new Error('分割超时')), 15000));
            
            segmentation = await Promise.race([segmentationPromise, timeoutPromise]);
            
            if (!segmentation || !segmentation.data) {
                throw new Error('分割结果无效');
            }
        } catch (error) {
            console.error('人物分割失败:', error);
            showToast('人物分割失败，使用替代算法');
            return processImageWithoutPerson(image);
        }
        
        // 判断是否检测到人物
        const hasPersonDetected = segmentation && segmentation.allPoses && 
                                segmentation.allPoses.length > 0 && 
                                segmentation.data.some(val => val !== -1);
        
        if (!hasPersonDetected) {
            console.log('未检测到人物，使用服装单品处理算法');
            return processImageWithoutPerson(image);
        }
        
        console.log('检测到人物，提取服装部分');
        updateProgress(40, '提取人物服装...');
        
        // 绘制原始图像到Canvas
        ctx.drawImage(image, 0, 0);
        
        // 获取图像数据
        const imageData = ctx.getImageData(0, 0, resultCanvas.width, resultCanvas.height);
        const data = imageData.data;
        
        // 创建服装掩码
        const clothingMask = new Uint8Array(segmentation.data.length);
        
        // 定义要保留的部分（服装和配饰）
        let clothingParts = [];
        try {
            if (typeof bodyPix !== 'undefined') {
                clothingParts = [
                    12, 13, // 躯干
                    14, 15, 16, 17, // 上臂
                    18, 19, 20, 21, // 下臂
                    22, 23, 24, 25  // 腿部
                ];
            }
        } catch (error) {
            console.error('获取服装部位定义失败:', error);
        }
        
        // 生成服装掩码
        for (let i = 0; i < segmentation.data.length; i++) {
            const partId = segmentation.data[i];
            clothingMask[i] = (partId !== -1 && clothingParts.includes(partId)) ? 1 : 0;
        }
        
        // 应用掩码到图像数据
        updateProgress(80, '应用分割结果...');
        
        // 应用服装掩码到图像
        for (let i = 0; i < clothingMask.length; i++) {
            const pixelIndex = i * 4;
            if (clothingMask[i] === 0) {
                data[pixelIndex + 3] = 0; // 完全透明
            }
        }
        
        // 增强服装部分处理
        enhanceClothingSegmentation(data, clothingMask, resultCanvas.width, resultCanvas.height);
        
        // 如果没有检测到足够的服装部分，回退到无人物处理方式
        const clothingPixelCount = clothingMask.filter(pixel => pixel === 1).length;
        const totalPixels = clothingMask.length;
        const clothingRatio = clothingPixelCount / totalPixels;
        
        if (clothingRatio < 0.05) { // 如果服装像素少于5%
            console.log('检测到的服装部分太少，回退到无人物处理模式');
            return processImageWithoutPerson(image);
        }
        
        // 应用处理后的数据到Canvas
        ctx.putImageData(imageData, 0, 0);
        
        // 后处理：平滑边缘
        updateProgress(90, '优化边缘...');
        ctx.filter = 'blur(0.8px)';
        ctx.globalCompositeOperation = 'source-over';
        ctx.drawImage(resultCanvas, 0, 0);
        ctx.filter = 'none';
        
        // 填充服装中的空洞
        fillHoles(resultCanvas);
        
        updateProgress(100, '处理完成!');
        setTimeout(() => {
            hideStatus();
            isProcessing = false;
        }, 500);
        
        return resultCanvas;
    } catch (error) {
        console.error('图像处理失败:', error);
        isProcessing = false;
        hideStatus();
        showToast('图像处理失败: ' + (error.message || '请尝试其他图片'));
        throw error;
    }
}

/**
 * 判断部位ID是否为服装部分
 * @param {number} partId - 部位ID
 * @returns {boolean} 是否为服装部分
 */
function isClothingPart(partId) {
    // 安全检查：如果bodyPix不可用，则返回true
    if (typeof bodyPix === 'undefined') {
        return true;
    }
    
    // 定义服装部分的ID列表
    try {
        const clothingPartIds = [
            // 躯干
            bodyPix.Part.TORSO_FRONT !== undefined ? bodyPix.Part.TORSO_FRONT : 12,
            bodyPix.Part.TORSO_BACK !== undefined ? bodyPix.Part.TORSO_BACK : 13,
            // 上臂
            bodyPix.Part.LEFT_UPPER_ARM_FRONT !== undefined ? bodyPix.Part.LEFT_UPPER_ARM_FRONT : 14,
            bodyPix.Part.LEFT_UPPER_ARM_BACK !== undefined ? bodyPix.Part.LEFT_UPPER_ARM_BACK : 15,
            bodyPix.Part.RIGHT_UPPER_ARM_FRONT !== undefined ? bodyPix.Part.RIGHT_UPPER_ARM_FRONT : 16,
            bodyPix.Part.RIGHT_UPPER_ARM_BACK !== undefined ? bodyPix.Part.RIGHT_UPPER_ARM_BACK : 17,
            // 前臂
            bodyPix.Part.LEFT_LOWER_ARM_FRONT !== undefined ? bodyPix.Part.LEFT_LOWER_ARM_FRONT : 18,
            bodyPix.Part.LEFT_LOWER_ARM_BACK !== undefined ? bodyPix.Part.LEFT_LOWER_ARM_BACK : 19,
            bodyPix.Part.RIGHT_LOWER_ARM_FRONT !== undefined ? bodyPix.Part.RIGHT_LOWER_ARM_FRONT : 20,
            bodyPix.Part.RIGHT_LOWER_ARM_BACK !== undefined ? bodyPix.Part.RIGHT_LOWER_ARM_BACK : 21,
            // 大腿
            bodyPix.Part.LEFT_UPPER_LEG_FRONT !== undefined ? bodyPix.Part.LEFT_UPPER_LEG_FRONT : 22,
            bodyPix.Part.LEFT_UPPER_LEG_BACK !== undefined ? bodyPix.Part.LEFT_UPPER_LEG_BACK : 23,
            // 小腿
            bodyPix.Part.LEFT_LOWER_LEG_FRONT !== undefined ? bodyPix.Part.LEFT_LOWER_LEG_FRONT : 26,
            bodyPix.Part.LEFT_LOWER_LEG_BACK !== undefined ? bodyPix.Part.LEFT_LOWER_LEG_BACK : 27
        ];
        
        // 将输入的partId转换为正确的格式后判断
        let convertedPartId = partId;
        if (bodyPix.toOutputStride) {
            try {
                convertedPartId = bodyPix.toOutputStride(partId);
            } catch (e) {
                console.log('转换partId失败', e);
            }
        }
        
        return clothingPartIds.includes(convertedPartId);
    } catch (error) {
        console.error('检查服装部分时出错:', error);
        // 出错时默认返回true，避免过滤掉有效部分
        return true;
    }
}

/**
 * 增强服装分割效果
 * @param {Uint8ClampedArray} data - 图像数据
 * @param {Uint8Array} clothingMask - 服装掩码
 * @param {number} width - 图像宽度
 * @param {number} height - 图像高度
 */
function enhanceClothingSegmentation(data, clothingMask, width, height) {
    // 移除肤色区域
    for (let i = 0; i < clothingMask.length; i++) {
        if (clothingMask[i] === 1) { // 只处理被标记为服装的部分
            const pixelIndex = i * 4;
            const r = data[pixelIndex];
            const g = data[pixelIndex + 1];
            const b = data[pixelIndex + 2];
            
            // 简单的肤色检测
            if (isSkinTone(r, g, b)) {
                data[pixelIndex + 3] = 0; // 将肤色部分设为透明
                clothingMask[i] = 0;
            }
        }
    }
    
    // 平滑边缘
    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
            const i = y * width + x;
            const pixelIndex = i * 4;
            
            if (clothingMask[i] === 1) {
                let neighborBgCount = 0;
                
                // 检查周围8个像素
                for (let dy = -1; dy <= 1; dy++) {
                    for (let dx = -1; dx <= 1; dx++) {
                        if (dx === 0 && dy === 0) continue;
                        
                        const ni = (y + dy) * width + (x + dx);
                        if (clothingMask[ni] === 0) {
                            neighborBgCount++;
                        }
                    }
                }
                
                // 如果是边缘像素（周围有背景），降低不透明度
                if (neighborBgCount > 0) {
                    // 边缘像素透明度随着背景邻居数量增加而减少
                    data[pixelIndex + 3] = Math.max(50, 255 - (neighborBgCount * 25));
                }
            }
        }
    }
}

/**
 * 判断是否为肤色
 * @param {number} r - 红色通道值
 * @param {number} g - 绿色通道值
 * @param {number} b - 蓝色通道值
 * @returns {boolean} 是否为肤色
 */
function isSkinTone(r, g, b) {
    // 肤色检测的简化方法
    return (r > 95 && g > 40 && b > 20) && 
           (Math.max(r, g, b) - Math.min(r, g, b) > 15) &&
           (r > g && r > b && Math.abs(r - g) > 15);
}

/**
 * 填充图像中的小孔洞
 * @param {HTMLCanvasElement} canvas - 画布
 */
function fillHoles(canvas) {
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const width = canvas.width;
    const height = canvas.height;
    
    // 创建透明度掩码
    const alphaMask = new Uint8Array(width * height);
    for (let i = 0; i < width * height; i++) {
        alphaMask[i] = data[i * 4 + 3] > 128 ? 1 : 0;
    }
    
    // 检测并填充小孔洞
    for (let y = 2; y < height - 2; y++) {
        for (let x = 2; x < width - 2; x++) {
            const idx = y * width + x;
            
            // 如果当前像素是透明的
            if (alphaMask[idx] === 0) {
                // 检查周围是否被不透明像素包围
                let surroundingCount = 0;
                
                // 检查周围8个方向
                for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 4) {
                    let foundOpaque = false;
                    
                    // 从当前像素沿着该方向检查
                    for (let dist = 1; dist <= 20; dist++) { // 距离限制，防止检查太远
                        const nx = Math.round(x + Math.cos(angle) * dist);
                        const ny = Math.round(y + Math.sin(angle) * dist);
                        
                        // 确保在图像范围内
                        if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                            const nidx = ny * width + nx;
                            
                            if (alphaMask[nidx] === 1) {
                                foundOpaque = true;
                                break;
                            }
                        } else {
                            break; // 超出边界
                        }
                    }
                    
                    if (foundOpaque) {
                        surroundingCount++;
                    }
                }
                
                // 如果在大多数方向上都被不透明像素包围，则认为是孔洞
                if (surroundingCount >= 6) { // 8个方向中的6个以上
                    // 找出周围的平均颜色
                    let totalR = 0, totalG = 0, totalB = 0, count = 0;
                    
                    for (let dy = -2; dy <= 2; dy++) {
                        for (let dx = -2; dx <= 2; dx++) {
                            if (dx === 0 && dy === 0) continue;
                            
                            const nx = x + dx;
                            const ny = y + dy;
                            
                            if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                                const nidx = (ny * width + nx) * 4;
                                
                                // 只使用不透明像素的颜色
                                if (data[nidx + 3] > 128) {
                                    totalR += data[nidx];
                                    totalG += data[nidx + 1];
                                    totalB += data[nidx + 2];
                                    count++;
                                }
                            }
                        }
                    }
                    
                    // 如果有足够的不透明邻居，填充该像素
                    if (count > 0) {
                        const avgR = Math.round(totalR / count);
                        const avgG = Math.round(totalG / count);
                        const avgB = Math.round(totalB / count);
                        
                        // 填充孔洞
                        data[idx * 4] = avgR;
                        data[idx * 4 + 1] = avgG;
                        data[idx * 4 + 2] = avgB;
                        data[idx * 4 + 3] = 255; // 完全不透明
                    }
                }
            }
        }
    }
    
    // 应用修改
    ctx.putImageData(imageData, 0, 0);
    
    // 轻微模糊以平滑填充区域的边缘
    ctx.filter = 'blur(0.5px)';
    ctx.drawImage(canvas, 0, 0);
    ctx.filter = 'none';
}

/**
 * 处理没有人物的图像或服装单品图像
 * @param {HTMLImageElement} image - 图像元素
 * @returns {Promise<HTMLCanvasElement>} 处理后的Canvas
 */
async function processImageWithoutPerson(image) {
    console.log('使用服装单品处理模式');
    
    try {
        // 创建结果画布
        updateProgress(30, '分析图像...');
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext('2d');
        
        // 绘制原始图像
        ctx.drawImage(image, 0, 0);
        
        // 获取图像数据
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        // 检查是否已有透明背景
        let hasTransparentBg = false;
        for (let i = 0; i < data.length; i += 4) {
            if (data[i + 3] < 250) {
                hasTransparentBg = true;
                break;
            }
        }
        
        // 如果已经有透明背景，直接返回
        if (hasTransparentBg) {
            console.log('图像已有透明背景，无需处理');
            updateProgress(100, '处理完成!');
            setTimeout(() => {
                hideStatus();
                isProcessing = false;
            }, 300);
            return canvas;
        }
        
        updateProgress(40, '分析图像边缘...');
        
        // 获取图像边缘和中心区域
        const edgeSize = Math.min(50, Math.floor(canvas.width * 0.1), Math.floor(canvas.height * 0.1));
        const edgePixels = []; // 边缘像素
        const cornerPixels = []; // 角落像素
        const centerPixels = []; // 中心像素
        
        // 收集边缘和中心像素
        for (let y = 0; y < canvas.height; y++) {
            for (let x = 0; x < canvas.width; x++) {
                const idx = (y * canvas.width + x) * 4;
                const pixel = {
                    r: data[idx],
                    g: data[idx + 1],
                    b: data[idx + 2],
                    a: data[idx + 3]
                };
                
                // 收集角落像素
                if ((x < edgeSize && y < edgeSize) || 
                    (x < edgeSize && y > canvas.height - edgeSize) ||
                    (x > canvas.width - edgeSize && y < edgeSize) ||
                    (x > canvas.width - edgeSize && y > canvas.height - edgeSize)) {
                    cornerPixels.push(pixel);
                }
                // 收集边缘像素
                else if (x < edgeSize || x > canvas.width - edgeSize || 
                         y < edgeSize || y > canvas.height - edgeSize) {
                    edgePixels.push(pixel);
                }
                // 收集中心像素（采样）
                else if (x % 5 === 0 && y % 5 === 0) {
                    centerPixels.push(pixel);
                }
            }
        }
        
        updateProgress(50, '分析背景颜色...');
        
        // 计算背景颜色
        const avgCornerColor = calculateAverageColor(cornerPixels);
        const avgEdgeColor = calculateAverageColor(edgePixels);
        const avgCenterColor = calculateAverageColor(centerPixels);
        
        // 计算颜色方差
        const cornerVariance = calculateColorVariance(cornerPixels);
        const edgeVariance = calculateColorVariance(edgePixels);
        const centerVariance = calculateColorVariance(centerPixels);
        
        console.log('颜色分析:', {
            corner: { color: avgCornerColor, variance: cornerVariance },
            edge: { color: avgEdgeColor, variance: edgeVariance },
            center: { color: avgCenterColor, variance: centerVariance }
        });
        
        // 确定背景颜色和容差
        let bgColor;
        let tolerance;
        
        // 如果中心区域方差明显大于边缘，说明中心是物体
        if (centerVariance > edgeVariance * 1.5) {
            bgColor = avgEdgeColor;
            tolerance = Math.max(25, Math.min(50, edgeVariance * 0.5));
        } else {
            // 否则使用角落颜色作为背景
            bgColor = avgCornerColor;
            tolerance = Math.max(25, Math.min(50, cornerVariance * 0.5));
        }
        
        // 如果背景复杂度高，增加容差
        if (cornerVariance > 1000 || edgeVariance > 1000) {
            tolerance *= 1.5;
        }
        
        console.log('使用背景颜色:', bgColor, '容差:', tolerance);
        
        updateProgress(70, '分离前景和背景...');
        
        // 创建掩码
        const width = canvas.width;
        const height = canvas.height;
        const mask = new Uint8Array(width * height);
        
        // 应用掩码
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const idx = (y * width + x) * 4;
                const pixel = {
                    r: data[idx],
                    g: data[idx + 1],
                    b: data[idx + 2]
                };
                
                // 计算与背景的差异
                const diff = calculateColorDifference(pixel, bgColor);
                
                // 根据位置调整容差
                const centerX = width / 2;
                const centerY = height / 2;
                const distanceToCenter = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
                const maxDistance = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
                const distanceFactor = 1 - (distanceToCenter / maxDistance) * 0.5;
                
                // 中心区域使用更低的容差
                const adjustedTolerance = tolerance * (1 / distanceFactor);
                
                if (diff > adjustedTolerance) {
                    mask[y * width + x] = 1; // 前景
                } else {
                    mask[y * width + x] = 0; // 背景
                }
            }
        }
        
        updateProgress(80, '优化边缘...');
        
        // 形态学操作改进掩码
        enhanceMaskWithMorphology(mask, width, height);
        
        // 应用掩码到图像
        for (let i = 0; i < mask.length; i++) {
            const idx = i * 4;
            if (mask[i] === 0) {
                data[idx + 3] = 0; // 将背景设为透明
            }
        }
        
        // 应用更新后的图像数据
        ctx.putImageData(imageData, 0, 0);
        
        // 平滑边缘
        updateProgress(90, '平滑边缘...');
        ctx.globalCompositeOperation = 'source-over';
        ctx.filter = 'blur(0.8px)';
        ctx.drawImage(canvas, 0, 0);
        ctx.filter = 'none';
        
        updateProgress(100, '处理完成!');
        setTimeout(() => {
            hideStatus();
            isProcessing = false;
        }, 300);
        
        return canvas;
    } catch (error) {
        console.error('服装单品处理失败:', error);
        isProcessing = false;
        hideStatus();
        throw error;
    }
}

/**
 * 通过形态学操作增强掩码
 * @param {Uint8Array} mask - 掩码
 * @param {number} width - 图像宽度
 * @param {number} height - 图像高度
 */
function enhanceMaskWithMorphology(mask, width, height) {
    // 复制原始掩码
    const tmpMask = new Uint8Array(mask);
    
    // 腐蚀操作（去噪）
    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
            // 如果当前像素是前景
            if (mask[y * width + x] === 1) {
                // 检查3x3邻域
                let foregroundCount = 0;
                for (let dy = -1; dy <= 1; dy++) {
                    for (let dx = -1; dx <= 1; dx++) {
                        if (mask[(y + dy) * width + (x + dx)] === 1) {
                            foregroundCount++;
                        }
                    }
                }
                // 如果周围前景像素少于5个，设为背景
                if (foregroundCount < 5) {
                    tmpMask[y * width + x] = 0;
                }
            }
        }
    }
    
    // 膨胀操作（填充孔洞）
    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
            // 如果当前像素是背景
            if (tmpMask[y * width + x] === 0) {
                // 检查3x3邻域
                let foregroundCount = 0;
                for (let dy = -1; dy <= 1; dy++) {
                    for (let dx = -1; dx <= 1; dx++) {
                        if (tmpMask[(y + dy) * width + (x + dx)] === 1) {
                            foregroundCount++;
                        }
                    }
                }
                // 如果周围前景像素超过5个，设为前景
                if (foregroundCount > 5) {
                    mask[y * width + x] = 1;
                } else {
                    mask[y * width + x] = tmpMask[y * width + x];
                }
            }
        }
    }
}

/**
 * 计算平均颜色
 * @param {Array} pixels - 像素数组
 * @returns {Object} 平均颜色 {r, g, b}
 */
function calculateAverageColor(pixels) {
    if (pixels.length === 0) {
        return { r: 0, g: 0, b: 0 };
    }
    
    let totalR = 0, totalG = 0, totalB = 0;
    
    for (const pixel of pixels) {
        totalR += pixel.r;
        totalG += pixel.g;
        totalB += pixel.b;
    }
    
    return {
        r: Math.round(totalR / pixels.length),
        g: Math.round(totalG / pixels.length),
        b: Math.round(totalB / pixels.length)
    };
}

/**
 * 计算颜色方差
 * @param {Array} pixels - 像素数组
 * @returns {number} 颜色方差
 */
function calculateColorVariance(pixels) {
    if (pixels.length < 2) {
        return 0;
    }
    
    const avgColor = calculateAverageColor(pixels);
    let sumSquaredDiff = 0;
    
    for (const pixel of pixels) {
        const diff = calculateColorDifference(pixel, avgColor);
        sumSquaredDiff += diff * diff;
    }
    
    return sumSquaredDiff / pixels.length;
}

/**
 * 计算颜色差异
 * @param {Object} color1 - 第一个颜色 {r,g,b}
 * @param {Object} color2 - 第二个颜色 {r,g,b}
 * @returns {number} 颜色差异值
 */
function calculateColorDifference(color1, color2) {
    return Math.sqrt(
        Math.pow(color1.r - color2.r, 2) +
        Math.pow(color1.g - color2.g, 2) +
        Math.pow(color1.b - color2.b, 2)
    );
}

/**
 * 平滑图像边缘
 * @param {HTMLCanvasElement} canvas - 画布元素
 */
function smoothEdges(canvas) {
    const ctx = canvas.getContext('2d');
    
    // 应用轻微的高斯模糊
    ctx.filter = 'blur(1px)';
    ctx.drawImage(canvas, 0, 0);
    ctx.filter = 'none';
}

/**
 * 处理从文件上传的图像
 * @param {File} file - 用户上传的图像文件
 * @returns {Promise<HTMLCanvasElement>} 返回处理后的Canvas元素
 */
async function handleUploadedImage(file) {
    // 如果当前正在处理图像，则返回错误
    if (isProcessing) {
        throw new Error('正在处理图像，请稍后再试');
    }

    try {
        // 设置处理状态
        isProcessing = true;
        console.log('开始处理图像...');

        // 从文件创建图像元素
        const img = await createImageFromFile(file);
        
        // 确保模型已加载
        if (!bodyPixModel) {
            await initializeBodyPixModel();
        }
        
        // 处理图像
        const canvas = await processImage(img);
        console.log('图像处理完成');
        
        return canvas;
    } catch (error) {
        console.error('图像处理失败:', error);
        throw error;
    } finally {
        // 重置处理状态
        isProcessing = false;
    }
}

/**
 * 从文件创建图像元素
 * @param {File} file - 图像文件
 * @param {number} [timeout=10000] - 加载超时时间(毫秒)
 * @returns {Promise<HTMLImageElement>} - 返回加载好的图像元素
 */
function createImageFromFile(file, timeout = 10000) {
    return new Promise((resolve, reject) => {
        // 检查文件是否为图像
        if (!file.type.startsWith('image/')) {
            reject(new Error('文件类型错误，请上传图片文件'));
            return;
        }

        // 创建图像元素
        const img = new Image();
        const objectUrl = URL.createObjectURL(file);

        // 设置超时
        const timeoutId = setTimeout(() => {
            URL.revokeObjectURL(objectUrl);
            reject(new Error('图像加载超时，请尝试压缩图片后重试'));
        }, timeout);

        // 加载成功处理
        img.onload = () => {
            clearTimeout(timeoutId);
            URL.revokeObjectURL(objectUrl);
            resolve(img);
        };

        // 加载失败处理
        img.onerror = () => {
            clearTimeout(timeoutId);
            URL.revokeObjectURL(objectUrl);
            reject(new Error('图像加载失败，请检查图片是否损坏'));
        };

        img.src = objectUrl;
    });
}

/**
 * 显示加载指示器
 * @param {string} message - 要显示的消息
 */
function showLoadingIndicator(message) {
    // 使用安全函数
    showStatus(message);
}

/**
 * 更新进度条
 * @param {number} percent - 进度百分比 (0-100)
 * @param {string} [message] - 进度消息
 */
function updateProgress(percent, message) {
    const loadingIndicator = document.getElementById('loadingIndicator');
    if (!loadingIndicator) return;
    
    // 更新进度条
    const progressBar = loadingIndicator.querySelector('.progress-bar');
    if (progressBar) {
        progressBar.style.width = `${percent}%`;
    }
    
    // 更新进度文本
    const progressText = loadingIndicator.querySelector('.progress-text');
    if (progressText) {
        progressText.textContent = `${percent}%`;
    }
    
    // 如果提供了消息，更新消息文本
    if (message) {
        const messageElement = loadingIndicator.querySelector('.loading-message');
        if (messageElement) {
            messageElement.textContent = message;
        }
    }
}

/**
 * 隐藏加载指示器
 */
function hideLoadingIndicator() {
    // 使用安全函数
    hideStatus();
}

/**
 * 获取图像的主色调
 * @param {Uint8ClampedArray} data - 图像数据
 * @returns {Object} - 主色调 {r, g, b}
 */
function getDominantColor(data) {
    // 采样图像的中心部分，假设物品在中心
    const samples = [];
    const pixelCount = data.length / 4;
    const samplingRate = 20; // 每20个像素采样一次
    
    for (let i = 0; i < data.length; i += 4 * samplingRate) {
        samples.push({
            r: data[i],
            g: data[i + 1],
            b: data[i + 2]
        });
    }
    
    // 简单的方法：取样本的平均颜色作为主色调
    return calculateAverageColor(samples);
}

/**
 * 计算动态阈值，用于背景区分
 * @param {Uint8ClampedArray} data - 图像数据
 * @param {Object} dominantColor - 主色调
 * @returns {number} - 颜色差异阈值
 */
function calculateDynamicThreshold(data, dominantColor) {
    // 基于图像的整体对比度和颜色分布计算
    let totalDiff = 0;
    let maxDiff = 0;
    const sampleSize = Math.min(1000, data.length / 4);
    const step = Math.floor(data.length / 4 / sampleSize);
    
    for (let i = 0; i < data.length; i += 4 * step) {
        const pixel = {
            r: data[i],
            g: data[i + 1],
            b: data[i + 2]
        };
        
        const diff = calculateColorDifference(pixel, dominantColor);
        totalDiff += diff;
        maxDiff = Math.max(maxDiff, diff);
    }
    
    const avgDiff = totalDiff / sampleSize;
    
    // 根据图像的平均差异计算阈值
    // 复杂图像需要更高的阈值
    if (avgDiff > 50) {
        return avgDiff * 0.5; // 高对比度图像
    } else if (avgDiff > 30) {
        return avgDiff * 0.65; // 中等对比度
    } else {
        return avgDiff * 0.8; // 低对比度
    }
}

/**
 * 创建颜色掩码，分离背景和前景
 * @param {Uint8ClampedArray} data - 图像数据
 * @param {Object} dominantColor - 主色调
 * @param {number} threshold - 颜色差异阈值
 * @returns {boolean[][]} - 二维掩码，true为前景，false为背景
 */
function createColorMask(data, dominantColor, threshold) {
    // 假设图像数据是RGBA格式，每个像素4个字节
    const pixelCount = data.length / 4;
    const width = Math.sqrt(pixelCount); // 假设图像是方形的，简化处理
    const height = width;
    
    // 创建二维掩码
    const mask = Array(height).fill().map(() => Array(width).fill(false));
    
    // 标记前景/背景
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const i = (y * width + x) * 4;
            const pixel = {
                r: data[i],
                g: data[i + 1],
                b: data[i + 2]
            };
            
            const diff = calculateColorDifference(pixel, dominantColor);
            
            // 差异大于阈值，标记为前景
            if (diff > threshold) {
                mask[y][x] = true;
            }
        }
    }
    
    return mask;
}

/**
 * 增强掩码效果，填充小孔，去除噪点
 * @param {boolean[][]} mask - 原始掩码
 * @param {number} width - 图像宽度
 * @param {number} height - 图像高度
 * @returns {boolean[][]} - 增强后的掩码
 */
function enhanceMask(mask, width, height) {
    // 创建副本，避免修改原始掩码
    const enhancedMask = Array(height).fill().map((_, y) => [...mask[y]]);
    
    // 简单的形态学操作：填充小孔
    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
            // 统计周围8个像素的前景数量
            let foregroundCount = 0;
            for (let dy = -1; dy <= 1; dy++) {
                for (let dx = -1; dx <= 1; dx++) {
                    if (dx === 0 && dy === 0) continue;
                    if (mask[y + dy][x + dx]) {
                        foregroundCount++;
                    }
                }
            }
            
            // 如果周围有大多数是前景像素，则该像素也标记为前景
            if (foregroundCount >= 5) {
                enhancedMask[y][x] = true;
            }
            // 如果周围几乎没有前景像素，则该像素可能是噪点
            else if (foregroundCount <= 1 && mask[y][x]) {
                enhancedMask[y][x] = false;
            }
        }
    }
    
    return enhancedMask;
}

// 导出函数
export {
    initializeBodyPixModel,
    processImage,
    processImageWithoutPerson,
    handleUploadedImage,
    createImageFromFile
};

// 为了兼容旧代码，将模块导出到全局作用域
if (typeof window !== 'undefined') {
    window.imageSegmentation = {
        initializeBodyPixModel,
        processImage,
        processImageWithoutPerson,
        handleUploadedImage,
        createImageFromFile
    };
    
    // 文档加载完成后初始化模型
    document.addEventListener('DOMContentLoaded', () => {
        console.log('自动初始化图像分割模块');
        initializeBodyPixModel().catch(err => {
            console.warn('自动初始化图像分割模块失败:', err);
        });
    });
} 