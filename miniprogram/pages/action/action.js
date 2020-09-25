let ajax = require('../../unilt/ajax.js')
Page({
  data:{
    foodList: [],
    openid: '',
  },
  onShow(){
    this.loadData();
  },
  loadData(){
    let self = this;
    wx.cloud.callFunction({
      name: 'queryInfo',
      complete: (w) => {
        console.log(w)
        ajax.getAllFood({}).then(res => {
          self.setData({
            openid: w.result.openid,
            foodList: res
          })
          console.log(res)
        })
      }
    })
  },
  delItem(e){
   ajax.deleteFood(e.currentTarget.dataset.id).then(res=>{
     if (res.stats && res.stats.removed > 0){
        wx.showToast({
          title: '删除成功',
          icon: 'none',
          duration: 1000,
          complete: this.loadData
        })
     }else{
       wx.showToast({
        title: '删除失败，请重试',
        icon: 'none',
        duration: 1000,
        complete: function () {
          return
        }
      })
     }
   })
  },

  onReachBottom: function () {

  },

  
})
