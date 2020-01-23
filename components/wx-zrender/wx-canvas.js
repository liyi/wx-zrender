export default class WxCanvas {
  constructor(ctx) {
    this.ctx = ctx;
    this._initStyle(ctx);
  }

  getContext(contextType) {
    if (contextType === '2d') {
      return this.ctx;
    }
  }

  attachEvent () {
    // noop
  }

  detachEvent() {
    // noop
  }

  _initStyle(ctx) {
    var styles = ['fillStyle', 'strokeStyle', 'globalAlpha', 
      'textAlign', 'textBaseAlign', 'shadow', 'lineWidth',
      'lineCap', 'lineJoin', 'lineDash', 'miterLimit', 'fontSize'];

    styles.forEach(style => {
      Object.defineProperty(ctx, style, {
        set: value => {
          if (style !== 'fillStyle' && style !== 'strokeStyle' 
            || value !== 'none' && value !== null
          ) {
            ctx['set' + style.charAt(0).toUpperCase() + style.slice(1)](value);
          }
        }
      });
    });

    ctx.createRadialGradient = () => {
      return ctx.createCircularGradient(arguments);
    };
  }
}
