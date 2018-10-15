## 基于Koa2的中间件加载器

安装:
> npm i koa-load-middlewares

使用：

```
const koa = require('koa');
const app = new koa();
const loadMiddlewares = require('koa-load-middlewares');

let load = new loadMiddlewares({
  path: __dirname + '/middlewares'  // 中间件存放目录，使用绝对路径
});

load.use([]/*中间件列表，Array或String*/).run(app);

let port = process.env.PORT || 3000;

app.listen(port,() =>{
  console.log('服务启动 %d',port)
})

```

## 方法参数

> **use**接收单独中间件名字或者数组中存放的中间件列表，需要和中间件存放目录的文件名字保持一致

> **run**接收Koa对象，将来可以在中间中使用


## 定义中间件文件

在所指定的目录下定义中间件文件，本例子中使用目录为 *middlewares*，定义文件为 *test.js*:

```
// test.js
// 导出一个函数，此函数就是要加载的中间件
module.exports = (ctx,next) => {
  // ctx.app 拿到Koa的对象
  
  next();
}
```
