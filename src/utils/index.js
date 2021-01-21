export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time)
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
      '"}'
  )
}

export function judgeSide(path) {
  const url = path || window.location.pathname
  const centerSites = ['/index', '/login', '/logout']
  const wxSites = ['/wx', '/wx/index', '/wx_login', '/wx_bind']

  for (const w of wxSites) {
    if (url.indexOf(w) != -1) {
      return 2
      break
    }
  }

  if (isWeixin()) return 2

  for (const c of centerSites) {
    if (url.indexOf(c) != -1) {
      return 1
      break
    }
  }

  if (url === '/') {
    return 1
  }
}

export function GlobalGetUuid() {
  let d = new Date().getTime()
  let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c == 'x' ? r : (r & 0x7) | 0x8).toString(16)
  })
  return uuid
}

export function GlobalGetUuidShort() {
  return 'xxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

/**
 * 识别微信浏览器
 */
export const isWeixin = () => {
  let explorer = window.navigator.userAgent.toLowerCase()
  if (explorer.indexOf('micromessenger') >= 0) {
    return true
  } else {
    return false
  }
}

export const setWXTitle = t => {
  document.title = t
  var iframe = document.createElement('iframe')
  // iframe.style.visibility = 'hidden'
  iframe.style.height = 0
  iframe.style.display = 'none'
  // 替换成站标favicon路径或者任意存在的较小的图片即可
  //   iframe.setAttribute('src', 'pic.ico') //pic.ico为小图片url
  var iframeCallback = function() {
    setTimeout(function() {
      iframe.removeEventListener('load', iframeCallback)
      document.body.removeChild(iframe)
    }, 0)
  }
  iframe.addEventListener('load', iframeCallback)
  document.body.appendChild(iframe)
}

export function judgeSys(ua) {
  if (!ua) {
    return '未知'
  }
  if (ua.indexOf('Windows NT') !== -1) return 'Windows'
  if (ua.indexOf('Mac OS X') !== -1) return 'OSX 10.7'
  if (ua.indexOf('Linux') !== -1) return 'Linux'
  if (ua.indexOf('Android') !== -1) return 'Android'
  if (ua.indexOf('Windows Phone') !== -1) return 'Windows Phone'
  if (ua.match(/OS 7_[0-9_]+ like Mac OS X/i)) return 'iOS7'
  if (ua.match(/OS 6_[0-9_]+ like Mac OS X/i)) return 'iOS6'
  if (ua.match(/OS 5_[0-9_]+ like Mac OS X/i)) return 'iOS5'
  if (ua.match(/OS 4_[0-9_]+ like Mac OS X/i)) return 'iOS4'
}

export function judgeDevice(ua) {
  if (!ua) {
    return '未知'
  }
  let device = ua.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  )
    ? '移动端'
    : '网页端'
  return device
}
