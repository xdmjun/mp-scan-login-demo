/* eslint-disable */
/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/** 验证用户名 */
export function validateName(rule, value, callback) {
  const reg = /^\S*$/
  const title = rule.title || ''

  if (!reg.test(value)) {
    callback(new Error(title + '中不得包含空格'))
  } else if (value == '') {
    callback(new Error(title + '不得为空'))
  } else {
    callback()
  }
}

export function validateEmail(rule, value, callback) {
  const reg = /^([a-zA-Z\d])(\w|\-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/
  const title = rule.title || '邮箱'

  if (!reg.test(value)) {
    callback(new Error('邮箱格式不正确'))
  } else {
    callback()
  }
}

/** 验证密码 */
/**
 * 1.密码不得为空
 * 2.密码不得包含空格
 * 3.密码不得包含汉字
 * 4.必须包含大写、小写字母及数字，8-20位
 * @export
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
export function validatePwd(rule, value, callback) {
  const regSpace = /^\S*$/
  const regChinese = /.*[\u4e00-\u9fa5]+.*$/
  const regRule = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)\S{8,20}$/
  const title = rule.title || '密码'

  if (!!rule.required && value.trim() === '') {
    callback(new Error(title + '不得为空'))
  } else if (!regSpace.test(value)) {
    callback(new Error(title + '不得包含空格'))
  } else if (regChinese.test(value)) {
    callback(new Error(title + '不得包含汉字'))
  } else if (!!rule.required && !regRule.test(value)) {
    callback(new Error(title + '必须包含大写、小写字母及数字，8-20位'))
  } else {
    callback()
  }
}

/**
 * 验证身份证号码
 * @export
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
export function validateCard(rule, value, callback) {
  const reg = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0-9]{2})([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X|x])$/
  const title = rule.title || '证件号码'

  if (!!rule.required && value.trim() === '') {
    callback(new Error(title + '不得为空'))
  } else if (!reg.test(value)) {
    callback(new Error(title + '格式不正确'))
  } else {
    callback()
  }
}

/**
 * 验证其他证件
 * @export
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
export function validateCert(rule, value, callback) {
  const reg = /^[A-Za-z0-9]{8,18}$/
  const title = rule.title || '证件号码'

  if (!!rule.required && value.trim() === '') {
    callback(new Error(title + '不得为空'))
  } else if (!reg.test(value)) {
    callback(new Error(title + '格式不正确'))
  } else {
    callback()
  }
}

/**
 * 账号激活部分的证件号码验证，身份证或者其他证件一起验证
 * @export
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
export function validateCards(rule, value, callback) {
  const reg = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0-9]{2})([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X|x])$/
  const regOther = /^[A-Za-z0-9]{8,18}$/
  const title = rule.title || '证件号码'

  if (!!rule.required && value.trim() === '') {
    callback(new Error(title + '不得为空'))
  } else if (!reg.test(value) && !regOther.test(value)) {
    callback(new Error(title + '格式不正确'))
  } else {
    callback()
  }
}

/** 验证手机号 */
export function validateMobile(rule, value, callback) {
  const reg = /^1\d{10}$/
  const title = rule.title || '手机号码'

  if (!!rule.required && value.trim() === '') {
    callback(new Error(title + '不得为空'))
  } else if (!reg.test(value)) {
    callback(new Error(title + '格式不正确'))
  } else {
    callback()
  }
}

/**
 * 是否是电话号码
 * @param {String} val 电话号码
 */
export function isMobile(val){
  return /^1\d{10}$/.test(val);
}

/**
 * 是否是正确的证件号码
 * @param {String} val 证件号码
 */
export function isCard(val){
  return /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0-9]{2})([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X|x])$/.test(val) || /^[A-Za-z0-9]{8,18}$/.test(val);
}
/**
 * 判断是否有空白字符
 * @param {String}} 
 */
export function isContainsSpace(val){
  return /^\s*$/.test(val);
}

/**
 *  判断是否是验证码(默认是数字)
 * @param {String} val 
 */
export function isVcode(val){
  return /^\d{4,6}$/.test(val)
}
/**
 * 简单的判断是否是正确的url
 * @param {String} str_url 
 */
export function isURL(str_url){
  let _URL = require('url');
  var _url = str_url
  //简单的协议头判断
  if(!/^[a-z]{3,9}:\/\//.test(str_url)){
    _url = 'http://' + str_url;
  }
  var _$url
  try{
    if(window.URL){
      _$url = new URL(_url);
    }else{
      _$url = _URL.parse(_url)
    }
  }catch(e){
      return false;
  }
  var hostname = _$url.hostname || '';
  if(hostname.length === 0){
    return false;
  }
  if(/^((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)$/.test(hostname)){
    return true
  }
  //域名判断: 
  var re = /^[a-z0-9]+[a-z0-9\.-]{0,}\.[a-z]{1,}$/i
  return (re.test(hostname) && !/\.\./.test(hostname)) 
}

export function strTrim(str){
  if(typeof(String.prototype.trim) === 'undefined'){
    return str.repace(/^\s+|\s+$/g,'');
  }
  return str.trim();
}

/** 是否是合法的身份证  */
export function isID(val){
  const reg = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0-9]{2})([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X|x])$/
  return reg.test(val)
}
/** 非中国身份证 */
export function isCert(val){
  const reg = /^[A-Za-z0-9]{8,18}$/
  return reg.test(val);
}