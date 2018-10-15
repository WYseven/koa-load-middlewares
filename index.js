const {join} = require('path');

// 判断是否为绝对路径，参考express源码：https://github.com/expressjs/express/blob/master/lib/utils.js#L56
const isAbsolute = (path) => {
  if ('/' === path[0]) return true;
  if (':' === path[1] && ('\\' === path[2] || '/' === path[2])) return true; // Windows device path
  if ('\\\\' === path.substring(0, 2)) return true; // Microsoft Azure absolute path
};

class KoaLoadMiddlewares {
  constructor(options) {
    let defaults = {
      path: '',
      ...options
    }

    if (!defaults.path.trim()){
      throw new Error('path must be required!')
    }
    if (!isAbsolute(defaults.path)){
      throw new Error('path must be absolute path!')
    }
    this.middlewares = [];
    this.middlewaresPath = options.path;
  }
  use(middlewares){
    
    if (typeof middlewares === 'string') {
      this.middlewares.push(join(this.middlewaresPath, middlewares));
      return this;
    }
    if (Array.isArray(middlewares)) {
      middlewares.forEach((item) => {
        this.middlewares.push(join(this.middlewaresPath, item))
      })
    }
    return this;
  }

  run(app){
    let middlewareFunc;
    for(let item of this.middlewares){
      middlewareFunc = require(item);
      if(typeof middlewareFunc === 'function'){
        app.context.app = app;
        app.use(middlewareFunc)
      }
    }
  }
}

module.exports = KoaLoadMiddlewares;