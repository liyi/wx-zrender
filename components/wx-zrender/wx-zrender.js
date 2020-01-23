// components/zrender/zrender.js
import WxCanvas from './wx-canvas'
import zrender from 'zrender'

Component({
  lifetimes: {
    ready: function () {
      this.init()
    }
  },
  methods: {
    // 初始化
    init: function () {
      this.ctx = wx.createCanvasContext('canvas', this)
      let wxCanvas = new WxCanvas(this.ctx)
      this.zr = zrender.init(wxCanvas)
      this.zrender = zrender
      this.triggerEvent('init', {
        ctx: this.ctx,
        zr: this.zr,
        zrender
      })
    },

    touchStart (e) {
      if (this.zr && e.touches.length > 0) {
        var touch = e.touches[0];
        var handler = this.zr.handler;
        handler.dispatch('mousedown', {
          zrX: touch.x,
          zrY: touch.y
        });
        handler.dispatch('mousemove', {
          zrX: touch.x,
          zrY: touch.y
        });
        handler.processGesture(wrapTouch(e), 'start');
      }
    },
    touchMove (e) {
      if (this.zr && e.touches.length > 0) {
        var touch = e.touches[0];
        var handler = this.zr.handler;
        handler.dispatch('mousemove', {
          zrX: touch.x,
          zrY: touch.y
        });
        handler.processGesture(wrapTouch(e), 'change');
      }
    },
    touchEnd (e) {
      if (this.zr) {
        const touch = e.changedTouches ? e.changedTouches[0] : {};
        var handler = this.zr.handler;
        handler.dispatch('mouseup', {
          zrX: touch.x,
          zrY: touch.y
        });
        handler.dispatch('click', {
          zrX: touch.x,
          zrY: touch.y
        });
        handler.processGesture(wrapTouch(e), 'end');
      }
    }
  }
})

function wrapTouch(event) {
  for (let i = 0; i < event.touches.length; ++i) {
    const touch = event.touches[i];
    touch.offsetX = touch.x;
    touch.offsetY = touch.y;
  }
  return event;
}
