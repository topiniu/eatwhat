var ajax = require('../../unilt/ajax.js');

Page({
  data:{
    input: '',
  },
  handleInput(val){
    this.data.input = val.detail.value;
  },
  handleSave(){

    const params = {
      "name": this.data.input
    };
    ajax.addFood(params);
  },
})