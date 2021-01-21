# mp-scan-login-demo
小程序扫码登录demo

## 使用技术
- vue:2.6.11
- vuex:3.1.2
- vue-router:3.1.5
- element-ui:2.13.0
- koa:2.11.0
- 小程序云开发

## 安装

### web端
env配置
```
VUE_APP_BASE_API = 'http://localhost:2002'
```

安装依赖
```
npm install
```

开发
```
npm run serve
```

访问
```
http://localhost:9556
```
web端默认使用9556端口

### 小程序修改
- 开通云开发
- 新建云函数[参考代码](https://github.com/xuedingmiaojun/blog_mp/tree/master/mp/static/functions/openid_login)
- 新建扫码处理页面[参考代码](https://github.com/xuedingmiaojun/blog_mp/tree/master/mp/src)

### 服务端
- koa

安装依赖
```
cd server
npm install
```

配置小程序，复制一份config.sample.js重命名为config.js填好如下配置  
```js
module.exports = {
  port: '', // 服务端端口号
  appId: '', // 小程序appid
  appSecret: '' // 小程序secrect
}
```

启动服务
```
node app.js
```

访问地址
```
http://localhost:2002
```
服务端接口使用2002端口

![](https://visitor-badge.glitch.me/badge?page_id=xuedingmiaojun.mp-scan-login-demo)

