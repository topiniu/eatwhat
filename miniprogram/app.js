//app.js
App({
  onLaunch: function () {
    this.renderBC();
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'dev-86d978',//填入自己云开发环境的id
        traceUser: true,//是否追踪用户
      })

      const db = wx.cloud.database({
        config: {
          env: 'dev-86d978',
        }
      });
      
      const tb = db.collection('foods');

      this.globalData.DB = db;
      this.globalData.TB = tb;
    }
  },

  globalData: {
    DB: null,
    TB: null,
    backColor: '',
    itemList: [],
    userInfo: {},
  },

  renderBC() {
    // 随机导航栏颜色
    var colors = [
      '#F6C555',
      '#8E354A',
      '#465D4C',
      '#0089A7',
      '#74673E',
      '#FC9F4D',
      '#F05E1C',
      '#CC543A',
      '#005CAF',
      '#33A6B8'
    ];
    var c = 9 - 0 + 1;
    var index = Math.floor(Math.random() * c + 0);
    this.globalData.backColor = colors[index];
  }
})
