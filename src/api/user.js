import request from '@/utils/request'
import qs from 'qs'

/**
 * 获取小程序全局token
 * @export
 * @param {*} data
 * @returns
 */
export function getToken(data) {
  return request.get('/getToken', { params: data })
}

/**
 * 获取小程序码
 * @export
 * @param {*} data
 * @returns
 */
export function getCode(data) {
  return request.get('/getCode', { params: data })
}

/**
 * 获取微信uuid状态
 * @export
 * @param {*} data
 * @returns
 */
export function getUUid(data) {
  return request.get('/uuid', { params: data })
}

/**
 * 登录
 * @export
 * @param {*} data
 * @returns
 */
export function login(data) {
  return request.post('/login', qs.stringify(data))
}
