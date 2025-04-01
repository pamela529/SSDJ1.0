// detail.js
/**
 * 二奢电商详情页
 * @fileoverview 包含商品详情页面的业务逻辑，包括数据加载、Tab切换、购买等功能
 * @author Claude
 */

Page({
  data: {
    currentTime: '14:30',  // 默认时间
    activeTab: 'product',  // 默认激活的Tab
    productData: {
      id: '1001',
      name: 'LV路易威登 NIH老花邮差包',
      brand: 'Louis Vuitton',
      price: '16099',
      discount: '9.9新',
      monthlyPayment: '1442',
      imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&h=800&fit=crop',
      condition: '9.9新',
      service: '优品保障 该店铺已缴纳保证金',
      guarantee: '100%正品 验货满意再确认',
      description: '2025年2月全新Louis Vuitton/路易威登NIH老花 手柄 斜挎包',
      size: '约23*17',
      accessories: '手提袋 盒子 防尘袋 小票'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   * @returns {void}
   */
  onLoad: function(options) {
    console.log('详情页onLoad被调用', options);
    
    // 更新系统时间
    this.updateSystemTime();
    
    // 设置定时器每分钟更新一次时间
    this.timeInterval = setInterval(() => {
      this.updateSystemTime();
    }, 60000);
  },
  
  /**
   * 生命周期函数--监听页面显示
   * @returns {void}
   */
  onShow: function() {
    console.log('详情页onShow被调用');
  },

  /**
   * 生命周期函数--监听页面卸载
   * @returns {void}
   */
  onUnload: function() {
    console.log('详情页onUnload被调用');
    // 清除定时器
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
    }
  },

  /**
   * 更新系统时间
   * @returns {void}
   */
  updateSystemTime: function() {
    const date = new Date();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    this.setData({
      currentTime: `${hours}:${minutes}`
    });
  },

  /**
   * 切换Tab
   * @param {Object} event - 事件对象
   * @returns {void}
   */
  switchTab: function(event) {
    const tab = event.currentTarget.dataset.tab;
    this.setData({
      activeTab: tab
    });
  },

  /**
   * 联系卖家
   * @returns {void}
   */
  contactSeller: function() {
    wx.showModal({
      title: '联系卖家',
      content: '是否联系卖家咨询该款LV无忧包？',
      confirmText: '立即联系',
      success: (res) => {
        if (res.confirm) {
          wx.showToast({
            title: '已发送消息',
            icon: 'success',
            duration: 2000
          });
        }
      }
    });
  },

  /**
   * 立即购买
   * @returns {void}
   */
  buyNow: function() {
    wx.showLoading({
      title: '正在处理',
    });
    
    // 模拟网络请求
    setTimeout(() => {
      wx.hideLoading();
      wx.showModal({
        title: '下单确认',
        content: '确认以¥16099购买此款LV无忧二奢包？',
        confirmText: '确认购买',
        success: (res) => {
          if (res.confirm) {
            wx.showToast({
              title: '购买成功',
              icon: 'success',
              duration: 2000
            });
          }
        }
      });
    }, 1000);
  }
}) 