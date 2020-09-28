var ajax = require('../../unilt/ajax.js');

Page({
  data:{
    input: '',
  },
  handleInput(val){
    this.data.input = val.detail.value;
  },
  handleSave(){
    if(this.data.input === ''){
        wx.showToast({
          title: '不能提交空内容',
          icon: 'none'
        })
        return
    }
    const params = {
      "name": this.data.input
    };
    wx.showLoading({
      title: '',
    })
    ajax.addFood(params).then(res => {
      this.setData({
        input: ''
      })
      wx.hideLoading({
        success: (res) => {},
      })
    });
  },
})