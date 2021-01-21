import cookies from 'js-cookie'
import storage from 'good-storage'
const LoginStatusKey = 'Login-Status' // 登录态 0未授权 1已授权
const TokenKey = 'Access-Token' // token
const UnionId = 'unionid' // unionid
const UserInfoKey = 'User-Info' // 用户信息 {} {...}
const Ip = 'ip' // ip
// 获取登录状态
export function loadWxLoginStatus() {
  return cookies.get(LoginStatusKey) || 0
}
// 保持登录状态
export function saveWxLoginStatus(status) {
  cookies.set(LoginStatusKey, status, {expires: 7})
  return status
}
// 获取ip
export function loadIp() {
  return cookies.get(Ip) || ''
}
// 保存ip
export function saveIp(ip) {
  cookies.set(Ip, ip, {expires: 7})
  return ip
}
// 删除登录状态
export function removeWxLoginStatus() {
  cookies.remove(LoginStatusKey)
  return ''
}
// 获取token
export function loadToken() {
  return storage.get(TokenKey, '')
}
// 保存token
export function saveToken(token) {
  storage.set(TokenKey, token)
  return token
}
// 删除token
export function removeToken() {
  storage.remove(TokenKey)
  return ''
}
// 获取用户信息
export function loadUserInfo() {
  return storage.get(UserInfoKey, {})
}
// 保存用户信息
export function saveUserInfo(userInfo) {
  storage.set(UserInfoKey, userInfo)
  return userInfo
}
// 删除用户信息
export function removeUserInfo() {
  storage.remove(UserInfoKey)
  return {}
}
// 保存unionid
export function saveUnionId(id) {
  storage.set(UnionId, id)
  return id
}
