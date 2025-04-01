// index.js
/**
 * 首页模块
 * @fileoverview 包含首页的业务逻辑，包括时间显示、用户信息和详情页显示切换功能
 * @author Claude
 */

const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    canIUseNicknameComp: false,
    currentTime: '14:30',  // 默认时间
    weatherTemp: '23°',     // 默认温度
    isDetailShow: false,    // 是否显示详情页
    activeTab: 'product',   // 详情页激活的Tab
    productData: {          // 商品数据
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
      description: '2023年2月全新Louis Vuitton/路易威登NIH老花 手柄 斜挎包',
      size: '约23*17',
      accessories: '手提袋 盒子 防尘袋 小票'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   * @returns {void}
   */
  onLoad() {
    // 检测获取用户信息的方式
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      });
    }

    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.setData({
        userInfo: userInfo,
        hasUserInfo: true
      });
    }

    // 更新系统时间
    this.updateSystemTime();
    
    // 设置定时器每分钟更新一次时间
    this.timeInterval = setInterval(() => {
      this.updateSystemTime();
    }, 60000);
  },

  /**
   * 生命周期函数--监听页面卸载
   * @returns {void}
   */
  onUnload: function() {
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
   * 获取用户资料
   * @returns {void}
   */
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    wx.getUserProfile({
      desc: '用于完善会员资料', 
      success: (res) => {
        const userInfo = res.userInfo;
        wx.setStorageSync('userInfo', userInfo);
        this.setData({
          userInfo: userInfo,
          hasUserInfo: true
        });
      }
    });
  },

  /**
   * 选择头像回调
   * @param {Object} e - 事件对象
   * @returns {void}
   */
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail;
    const userInfo = this.data.userInfo || {};
    userInfo.avatarUrl = avatarUrl;
    this.setData({
      userInfo: userInfo
    });
    wx.setStorageSync('userInfo', userInfo);
  },

  /**
   * 输入昵称回调
   * @param {Object} e - 事件对象
   * @returns {void}
   */
  onInputChange(e) {
    const nickname = e.detail.value;
    const userInfo = this.data.userInfo || {};
    userInfo.nickName = nickname;
    this.setData({
      userInfo: userInfo
    });
    wx.setStorageSync('userInfo', userInfo);
  },

  /**
   * 显示详情页
   * @param {Object} e - 事件对象
   * @returns {void}
   */
  showDetail(e) {
    console.log('显示商品详情');
    
    // 阻止事件冒泡（防止同时触发其他点击事件）
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }
    
    // 判断环境：如果是在小程序中，使用wx.navigateTo
    if (typeof wx !== 'undefined' && wx.navigateTo) {
      wx.navigateTo({
        url: '/pages/detail/detail',
        success: () => {
          console.log('成功跳转到电商详情页');
        },
        fail: (err) => {
          console.error('跳转电商详情页失败', err);
          // 如果跳转失败，回退到原来的方案(内部切换显示)
          this.setData({
            isDetailShow: true
          });
        }
      });
    } else {
      // 如果不是在小程序环境（例如在浏览器预览），则使用内部状态切换显示
      console.log('非小程序环境，使用内部状态切换');
      this.setData({
        isDetailShow: true
      });
      
      // 通知外部环境（如果在原型测试环境中）
      if (typeof window !== 'undefined' && window.showScreen) {
        try {
          // 尝试调用外部环境的电商详情页显示函数
          window.showScreen('productDetail');
          console.log('已调用外部环境的电商详情页显示');
        } catch(err) {
          console.error('调用外部环境函数失败', err);
        }
      }
    }
  },

  /**
   * 隐藏详情页，返回首页
   * @returns {void}
   */
  hideDetail() {
    console.log('隐藏商品详情');
    this.setData({
      isDetailShow: false
    });
  },

  /**
   * 切换详情页Tab
   * @param {Object} event - 事件对象
   * @returns {void}
   */
  switchTab(event) {
    const tab = event.currentTarget.dataset.tab;
    this.setData({
      activeTab: tab
    });
  },

  /**
   * 获取免费无忧包
   * @returns {void}
   */
  getFreeBag() {
    wx.showModal({
      title: '免费无忧包',
      content: '恭喜您获得此款二手LV无忧包，是否立即确认领取？',
      confirmText: '立即领取',
      success: (res) => {
        if (res.confirm) {
          wx.showToast({
            title: '领取成功',
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
  buyNow() {
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
  },

  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
})
