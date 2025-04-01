/**
 * 首页逻辑
 */
const app = getApp();

Page({
  // 页面数据
  data: {
    hasLogin: false,
    userInfo: null,
    identities: ['女士', '男士', '儿童'],
    selectedIdentity: 0,
    isFamilyStyle: false,
    currentScene: 'casual',
    scenes: {
      casual: { id: 'casual', name: '休闲' },
      business: { id: 'business', name: '商务' },
      leisure: { id: 'leisure', name: '休闲' },
      party: { id: 'party', name: '派对' },
      travel: { id: 'travel', name: '旅行' }
    },
    customScenes: [],
    currentOutfit: null,
    outfits: [],
    showSceneHelpTooltip: false,
    showAddSceneModal: false,
    showDeleteModal: false,
    newSceneName: '',
    sceneToDelete: null,
    activeTab: 0,
    weather: {
      city: '北京',
      temperature: '25°C',
      condition: '晴'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    // 检查登录状态
    this.checkLoginStatus();
    
    // 获取场景数据
    this.getSceneData();
    
    // 获取服装数据
    this.getOutfitData();
    
    // 获取自定义场景
    this.getCustomScenes();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 更新登录状态
    this.checkLoginStatus();
    
    // 获取天气信息
    this.getWeatherInfo();
  },

  /**
   * 检查登录状态
   */
  checkLoginStatus: function () {
    const hasLogin = app.globalData.hasLogin;
    const userInfo = app.globalData.userInfo;
    
    this.setData({
      hasLogin,
      userInfo
    });
  },

  /**
   * 获取场景数据
   */
  getSceneData: function () {
    const sceneData = app.globalData.sceneData;
    
    this.setData({
      scenes: sceneData
    });
  },

  /**
   * 获取服装数据
   */
  getOutfitData: function () {
    const outfits = app.globalData.outfits;
    
    // 根据当前场景筛选服装
    this.filterOutfitsByScene(this.data.currentScene);
  },

  /**
   * 根据场景筛选服装
   * @param {String} sceneId 场景ID
   */
  filterOutfitsByScene: function (sceneId) {
    const sceneData = app.globalData.sceneData[sceneId];
    const allOutfits = app.globalData.outfits;
    let filteredOutfits = [];
    
    if (sceneData && sceneData.outfits) {
      filteredOutfits = sceneData.outfits.map(id => {
        return allOutfits.find(outfit => outfit.id === id);
      }).filter(outfit => outfit);
    }
    
    // 根据所选身份筛选
    filteredOutfits = this.filterOutfitsByIdentity(filteredOutfits);
    
    this.setData({
      outfits: filteredOutfits,
      currentOutfit: filteredOutfits.length > 0 ? filteredOutfits[0] : null
    });
  },

  /**
   * 根据身份筛选服装
   * @param {Array} outfits 服装数组
   * @returns {Array} 筛选后的服装数组
   */
  filterOutfitsByIdentity: function (outfits) {
    const identityTypes = ['women', 'men', 'children'];
    const selectedType = identityTypes[this.data.selectedIdentity];
    
    if (this.data.isFamilyStyle) {
      return outfits; // 家庭风格不筛选
    }
    
    return outfits.filter(outfit => outfit.type === selectedType);
  },

  /**
   * 获取自定义场景
   */
  getCustomScenes: function () {
    const customScenes = app.globalData.customScenes;
    
    this.setData({
      customScenes
    });
  },

  /**
   * 获取天气信息
   */
  getWeatherInfo: function () {
    // 模拟获取天气信息
    const weather = {
      city: '北京',
      temperature: '25°C',
      condition: '晴'
    };
    
    this.setData({
      weather
    });
  },

  /**
   * 切换场景
   * @param {Object} e 事件对象
   */
  onSceneChange: function (e) {
    const sceneId = e.currentTarget.dataset.scene;
    
    this.setData({
      currentScene: sceneId
    });
    
    // 根据场景筛选服装
    this.filterOutfitsByScene(sceneId);
  },

  /**
   * 点击自定义场景
   * @param {Object} e 事件对象
   */
  onCustomSceneClick: function (e) {
    const sceneId = e.currentTarget.dataset.id;
    
    this.setData({
      currentScene: sceneId
    });
    
    // 根据场景筛选服装
    this.filterOutfitsByScene(sceneId);
  },

  /**
   * 切换身份
   * @param {Object} e 事件对象
   */
  onIdentityChange: function (e) {
    const index = e.detail.value;
    
    this.setData({
      selectedIdentity: index
    });
    
    // 重新筛选服装
    this.filterOutfitsByScene(this.data.currentScene);
  },

  /**
   * 切换家庭风格
   * @param {Object} e 事件对象
   */
  onFamilyStyleChange: function (e) {
    const value = e.detail.value;
    
    this.setData({
      isFamilyStyle: value
    });
    
    // 重新筛选服装
    this.filterOutfitsByScene(this.data.currentScene);
  },

  /**
   * 显示/隐藏场景帮助提示
   */
  toggleSceneHelpTooltip: function () {
    this.setData({
      showSceneHelpTooltip: !this.data.showSceneHelpTooltip
    });
  },

  /**
   * 显示添加场景模态框
   */
  showAddSceneModal: function () {
    this.setData({
      showAddSceneModal: true,
      newSceneName: ''
    });
  },

  /**
   * 关闭添加场景模态框
   */
  hideAddSceneModal: function () {
    this.setData({
      showAddSceneModal: false
    });
  },

  /**
   * 输入场景名称
   * @param {Object} e 事件对象
   */
  inputSceneName: function (e) {
    this.setData({
      newSceneName: e.detail.value
    });
  },

  /**
   * 保存自定义场景
   */
  saveCustomScene: function () {
    const name = this.data.newSceneName.trim();
    
    if (!name) {
      wx.showToast({
        title: '请输入场景名称',
        icon: 'none'
      });
      return;
    }
    
    const newScene = {
      id: 'custom_' + Date.now(),
      name: name,
      outfits: []
    };
    
    const result = app.saveCustomScene(newScene);
    
    if (result) {
      this.getCustomScenes();
      this.hideAddSceneModal();
      
      wx.showToast({
        title: '添加成功',
        icon: 'success'
      });
    } else {
      wx.showToast({
        title: '添加失败',
        icon: 'none'
      });
    }
  },

  /**
   * 显示删除场景确认框
   * @param {Object} e 事件对象
   */
  showDeleteConfirm: function (e) {
    const sceneId = e.currentTarget.dataset.id;
    
    this.setData({
      showDeleteModal: true,
      sceneToDelete: sceneId
    });
  },

  /**
   * 关闭删除确认框
   */
  hideDeleteModal: function () {
    this.setData({
      showDeleteModal: false,
      sceneToDelete: null
    });
  },

  /**
   * 删除自定义场景
   */
  deleteCustomScene: function () {
    const sceneId = this.data.sceneToDelete;
    
    if (!sceneId) {
      return;
    }
    
    const result = app.deleteCustomScene(sceneId);
    
    if (result) {
      // 如果删除的是当前场景，切换到默认场景
      if (this.data.currentScene === sceneId) {
        this.setData({
          currentScene: 'casual'
        });
        
        this.filterOutfitsByScene('casual');
      }
      
      this.getCustomScenes();
      this.hideDeleteModal();
      
      wx.showToast({
        title: '删除成功',
        icon: 'success'
      });
    } else {
      wx.showToast({
        title: '删除失败',
        icon: 'none'
      });
    }
  },

  /**
   * 切换收藏状态
   */
  toggleFavorite: function () {
    const outfit = this.data.currentOutfit;
    
    if (!outfit) {
      return;
    }
    
    outfit.isFavorite = !outfit.isFavorite;
    
    this.setData({
      currentOutfit: outfit
    });
    
    wx.showToast({
      title: outfit.isFavorite ? '已收藏' : '已取消收藏',
      icon: 'success'
    });
  },

  /**
   * 点击热区查看商品详情
   * @param {Object} e 事件对象
   */
  onHotspotClick: function (e) {
    const itemId = e.currentTarget.dataset.itemId;
    
    // 跳转到商品详情页
    wx.navigateTo({
      url: '/pages/item-detail/index?id=' + itemId
    });
  },

  /**
   * 切换底部标签
   * @param {Object} e 事件对象
   */
  switchTab: function (e) {
    const index = e.currentTarget.dataset.index;
    const tabs = [
      '/pages/index/index',
      '/pages/wardrobe/index',
      '/pages/ai-recommend/index',
      '/pages/community/index',
      '/pages/user/index'
    ];
    
    if (index === 0) {
      return; // 当前已经是首页
    }
    
    wx.switchTab({
      url: tabs[index]
    });
  },

  /**
   * 登录/个人中心
   */
  onLoginOrProfile: function () {
    if (this.data.hasLogin) {
      // 跳转到个人中心
      wx.switchTab({
        url: '/pages/user/index'
      });
    } else {
      // 显示登录界面
      wx.navigateTo({
        url: '/pages/login/index'
      });
    }
  }
}); 