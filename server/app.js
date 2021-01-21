const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const router = new Router()
const bodyParser = require('koa-bodyparser')
const rp = require('request-promise')
const fs = require('fs')
const config = require('./config.js')

app.use(bodyParser())

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.body = {
      code: -1,
      data: ctx.data,
      msg: ctx.msg || err.message || '服务开小差了，请稍后再试',
      etime: Date.now(),
    }
  }
})

app.use(async (ctx, next) => {
  await next()
  if (!ctx.mimeType) {
    ctx.set('Content-Type', 'application/json')
    ctx.body = {
      code: ctx.code || 0,
      data: ctx.data,
      message: ctx.msg || 'success',
      etime: Date.now(),
    }
  } else {
    ctx.set('content-type', ctx.mimeType)
    ctx.body = ctx.data
  }
})

router.get('/', async (ctx, next) => {
  ctx.data = 'demo api'
  await next()
})

router.get('/uuid', async (ctx, next) => {
  let uuid = ctx.query.uuid,
    token = JSON.parse(fs.readFileSync('mp_token_info.json', 'utf-8')).access_token || ''

  const options = {
    method: 'POST',
    url: 'https://api.weixin.qq.com/tcb/databasequery?access_token=' + token,
    body: {
      env: config.env,
      query: 'db.collection("uuids").where({uuid:"' + uuid + '"}).get()',
    },
    json: true,
    encoding: null,
  }

  let uuids = await rp(options)
  let data = uuids.data.length > 0 ? JSON.parse(uuids.data[0]) : {}
  let nickname = data.userInfo ? data.userInfo.nickName || '' : ''
  let avatar = data.userInfo ? data.userInfo.avatarUrl || '' : ''
  let openid = data.openid ? data.openid : ''
  ctx.data = { nickname: nickname, avatar: avatar, openid: openid }
  await next()
})

// 获取小程序全局token
router.get('/getToken', async (ctx, next) => {
  let tokenFileName = 'mp_token_info.json'
  let tokenInfo = fs.existsSync(tokenFileName) ? JSON.parse(fs.readFileSync(tokenFileName, 'utf-8')) : null
  let expires_time = tokenInfo ? tokenInfo.expires_time : ''
  let cache_access_token = tokenInfo && tokenInfo.access_token ? tokenInfo.access_token : ''
  if (parseInt(Date.now() / 1000) > expires_time + 3600 || tokenInfo == null || cache_access_token == '') {
    let tokenForUrl =
      'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' +
      config.appId +
      '&secret=' +
      config.appSecret
    let tokenInfoNew = await rp({ url: tokenForUrl })
    tokenInfoNew = JSON.parse(tokenInfoNew)
    cache_access_token = tokenInfoNew.access_token
    expires_time = parseInt(Date.now() / 1000)
    fs.writeFileSync(
      tokenFileName,
      JSON.stringify({
        access_token: cache_access_token,
        expires_time: expires_time,
      })
    )
    ctx.data = { token: cache_access_token, expires_time: expires_time }
  } else {
    ctx.data = {
      token: tokenInfo.access_token,
      expires_time: tokenInfo.expires_time,
    }
  }
  await next()
})

// 生成小程序码
router.get('/getCode', async (ctx, next) => {
  let page = 'pages/scan_login/main',
    token = JSON.parse(fs.readFileSync('mp_token_info.json', 'utf-8')).access_token || ''

  let useAuth = ctx.query.useAuth
  // 获取随机uuid
  let scene = 'uuid=' + (ctx.query.uuid || 9999) + '&auth=' + useAuth
  // 获取小程序码配置
  const codeOptions = {
    method: 'POST',
    url: 'https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=' + token,
    body: {
      page: page,
      width: 230,
      scene: scene,
    },
    json: true,
    encoding: null,
  }
  // 获取小程序码图片Buffer
  let imgBuffer = await rp(codeOptions)
  ctx.mimeType = 'image/png'
  ctx.data = imgBuffer
  await next()
})

app.use(router.routes())
app.use(router.allowedMethods())

let server = app.listen(config.port, function () {
  let host = server.address().address
  let port = server.address().port
  console.log('应用实例，访问地址为 http://localhost:%s', port)
})
