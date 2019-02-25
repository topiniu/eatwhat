
// 添加
function addFood(params) {
  console.log(getApp().globalData)
  getApp().globalData.TB.add({
    data: params,
    success: function (res) {
      wx.showToast({
        title: '添加成功',
        icon: 'success',
        duration: 1500,
        complete() {
          setTimeout(() => {
            wx.navigateBack()
          }, 1000)
        }
      })
    },
    error: function (res) {
      console.log(err);
      wx.showToast({
        title: '保存失败',
        icon: 'none',
        duration: 1500
      })
    }
  })
}

//根据id获取food
function getFood(id) {
  const promise = new Promise(function (resolve, reject) {
    getApp().globalData.TB.where({ id: id }).get({
      success: function (res) {
        console.log('get success:', res)
        resolve(res.data)
      },
      fail: function (res) {
        console.log('get fail:', res)
        reject(res.data)
      }
    })
  })
  return promise
}


// 根据条件、页码、每页大小获取数据
function findFood(params, page, size) {
  console.log(params, page, size)
  var p = new Promise(function (resolve, reject) {
    page = page - 1;
    if (page > 0)
      getApp().globalData.TB.where(params)
        .skip(page * size)
        .limit(size)
        .get().then(res => { resolve(res.data) })
    else
      getApp().globalData.TB.where(params)
        .limit(size)
        .get().then(res => { resolve(res.data) })
  })
  return p;
}


function getCount(params) {
  var p = new Promise(
    function (resolve, reject) {
      getApp().globalData.TB.where(params).count({
        success: (res) => {
          resolve(res.total)
        }
      })
    }
  )
  return p;
}

function getAllFood(params) {
  var fn = new Promise(
    function (resolve, reject) {
      let p = [];
      getCount(params).then((res) => {
        console.log(res)
        let page = Math.ceil(res / 20, 10);
        console.log(page)
        flag_pop(params, 20, page, []).then(res => {
          resolve(res)
        })
      })
    }
  )
  return fn
}

function flag_pop(params, size, page, result) {
  return new Promise(
    function (resolve, reject) {
      findFood(params, page, 20).then((e) => {
        result = result.concat(e);
        console.log(result)
        if (page - 1 > 0) {
          resolve(flag_pop(params, 20, page - 1, result))
        } else {
          resolve(result);
        }
      })
    }
  )
}


// 删除
function deleteFood(id){
  var p = new Promise(
    function(resolve, reject) {
      getApp().globalData.TB.doc(id).remove({
        success: (e) => { resolve(e) },
        fail: (e) => { resolve(e) }
      })
    }
  )
  return p;
}



exports.addFood = addFood
exports.getAllFood = getAllFood
exports.deleteFood = deleteFood