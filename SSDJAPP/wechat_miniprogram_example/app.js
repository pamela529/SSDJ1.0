/**
 * 小程序入口文件
 */
App({
  // 全局数据
  globalData: {
    userInfo: null,
    hasLogin: false,
    systemInfo: null,
    sceneData: {},
    outfits: [],
    customScenes: []
  },
  
  /**
   * 小程序初始化时触发
   */
  onLaunch: function() {
    // 获取系统信息
    this.getSystemInfo();
    
    // 检查登录状态
    this.checkLoginStatus();
    
    // 初始化数据
    this.initData();
  },
  
  /**
   * 获取系统信息
   */
  getSystemInfo: function() {
    try {
      const systemInfo = wx.getSystemInfo();
      this.globalData.systemInfo = systemInfo;
      console.log('系统信息获取成功', systemInfo);
    } catch (e) {
      console.error('获取系统信息失败', e);
    }
  },
  
  /**
   * 检查登录状态
   */
  checkLoginStatus: function() {
    try {
      const token = wx.getStorageSync('token');
      if (token) {
        this.globalData.hasLogin = true;
        this.getUserInfo();
      }
    } catch (e) {
      console.error('检查登录状态失败', e);
    }
  },
  
  /**
   * 获取用户信息
   */
  getUserInfo: function() {
    if (this.globalData.hasLogin) {
      // 模拟获取用户信息
      const userInfo = wx.getStorageSync('userInfo') || {
        nickName: '时尚达人',
        avatarUrl: '/images/women_32.jpg',
        gender: 1
      };
      
      this.globalData.userInfo = userInfo;
    }
  },
  
  /**
   * 初始化应用数据
   */
  initData: function() {
    // 初始化场景数据
    this.initSceneData();
    
    // 初始化服装数据
    this.initOutfitData();
    
    // 获取自定义场景
    this.getCustomScenes();
  },
  
  /**
   * 初始化场景数据
   */
  initSceneData: function() {
    this.globalData.sceneData = {
      casual: {
        id: 'casual',
        name: '休闲',
        outfits: [0, 1, 2]
      },
      business: {
        id: 'business',
        name: '商务',
        outfits: [3, 4, 5]
      },
      leisure: {
        id: 'leisure',
        name: '休闲',
        outfits: [1, 2, 6]
      },
      party: {
        id: 'party',
        name: '派对',
        outfits: [7, 8, 9]
      },
      travel: {
        id: 'travel',
        name: '旅行',
        outfits: [10, 11, 12]
      }
    };
  },
  
  /**
   * 初始化服装数据
   */
  initOutfitData: function() {
    // 模拟服装数据
    this.globalData.outfits = [
      {
        id: 0,
        image: '/images/women_32.jpg',
        type: 'women',
        items: [
          { id: 1, name: '白色衬衫', position: { top: '30%', left: '50%' } },
          { id: 2, name: '牛仔裤', position: { top: '60%', left: '50%' } }
        ],
        isFavorite: false
      },
      {
        id: 1,
        image: '/images/women_44.jpg',
        type: 'women',
        items: [
          { id: 3, name: '黑色连衣裙', position: { top: '40%', left: '50%' } },
          { id: 4, name: 'LV包包', position: { top: '70%', left: '30%' } }
        ],
        isFavorite: true
      },
      {
        id: 2,
        image: '/images/men_32.jpg',
        type: 'men',
        items: [
          { id: 5, name: '黑色T恤', position: { top: '30%', left: '50%' } },
          { id: 6, name: '灰色休闲裤', position: { top: '60%', left: '50%' } }
        ],
        isFavorite: false
      }
    ];
  },
  
  /**
   * 获取自定义场景
   */
  getCustomScenes: function() {
    try {
      const customScenes = wx.getStorageSync('customScenes') || [];
      this.globalData.customScenes = customScenes;
    } catch (e) {
      console.error('获取自定义场景失败', e);
    }
  },
  
  /**
   * 保存自定义场景
   * @param {Object} scene 场景对象
   */
  saveCustomScene: function(scene) {
    try {
      const customScenes = this.globalData.customScenes;
      customScenes.push(scene);
      this.globalData.customScenes = customScenes;
      wx.setStorageSync('customScenes', customScenes);
      return true;
    } catch (e) {
      console.error('保存自定义场景失败', e);
      return false;
    }
  },
  
  /**
   * 删除自定义场景
   * @param {String} sceneId 场景ID
   */
  deleteCustomScene: function(sceneId) {
    try {
      let customScenes = this.globalData.customScenes;
      customScenes = customScenes.filter(scene => scene.id !== sceneId);
      this.globalData.customScenes = customScenes;
      wx.setStorageSync('customScenes', customScenes);
      return true;
    } catch (e) {
      console.error('删除自定义场景失败', e);
      return false;
    }
  }
}); 