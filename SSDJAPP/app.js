// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    
    // 检查是否有页面参数(用于从web环境启动时处理)
    const launchOptions = wx.getLaunchOptionsSync();
    console.log('小程序启动参数:', launchOptions);
    
    // 如果有指定页面参数，执行相应跳转
    if (launchOptions && launchOptions.query && launchOptions.query.target) {
      const target = launchOptions.query.target;
      if (target === 'productDetail') {
        // 延迟执行，确保首页已加载
        setTimeout(() => {
          wx.navigateTo({
            url: '/pages/detail/detail',
            fail: (err) => {
              console.error('启动时跳转详情页失败', err);
            }
          });
        }, 1000);
      }
    }
  },
  
  /**
   * 打开商品详情页
   * @returns {void}
   */
  openProductDetail() {
    wx.navigateTo({
      url: '/pages/detail/detail',
      fail: (err) => {
        console.error('打开商品详情页失败', err);
      }
    });
  },
  
  globalData: {
    userInfo: null
  }
})
