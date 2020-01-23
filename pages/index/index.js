//index.js

//获取应用实例
const app = getApp()

Page({
  data: {
    windowWidth: 0,
    windowHeight: 0
  },
  onReady: function () {
    this.onResize()
  },
  onResize: function () {
    let sysInfo = wx.getSystemInfoSync()
    let windowWidth = sysInfo.windowWidth
    let windowHeight = sysInfo.windowHeight
    this.setData({
      windowWidth,
      windowHeight
    })
  },
  draw (e) {
    let { ctx, zr, zrender } = e.detail
    console.log('context上下文：', ctx)
    console.log('zrender实例：', zr)
    console.log('zrender库：', zrender)
    var circle = new zrender.Circle({
      shape: {
          cx: 150,
          cy: 50,
          r: 40
      },
      style: {
          fill: '#FCF',
          stroke: '#000'
      }
    });
    zr.add(circle);

    circle.animateTo({
      shape: {
        cx: 50,
        cy: 100
      }
    }, 2000, 2000)
    circle.on('click', function () {
      circle.animateTo({
        style: {
          fill: '#FFC'
        }
      }, 1000)
    })
  }
})
