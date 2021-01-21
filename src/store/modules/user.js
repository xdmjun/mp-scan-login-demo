import { saveWxLoginStatus, removeWxLoginStatus, loadWxLoginStatus } from '@/utils/cache'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    name: '',
    base: {
      id: '',
      name: ''
    },
    wxLoginStatus: loadWxLoginStatus()
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: state => {
    Object.assign(state, getDefaultState())
  },
  SET_BASE: (state, { key, value }) => {
    state.base[key] = value
  },
  SET_WX_LOGIN_STATUS: (state, wxLoginStatus) => {
    state.wxLoginStatus = wxLoginStatus
  }
}

const actions = {
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      resetRouter()
      removeWxLoginStatus()
      commit('RESET_STATE')
      resolve()
    })
  },
  changeName({ commit }, name) {
    commit('SET_BASE', { key: 'name', value: name })
  },
  changeOpenid({ commit }, openid) {
    commit('SET_BASE', { key: 'openid', value: openid })
  },
  changeUnionid({ commit }, unionid) {
    commit('SET_BASE', { key: 'unionid', value: unionid })
  },
  changeAvatar({ commit }, avatar) {
    commit('SET_BASE', { key: 'avatar', value: avatar })
  },
  // 设置状态
  setWxLoginStatus({ commit }, query) {
    if (query === 0 || query === 1) {
      // 上线打开注释，本地调试注释掉，保持信息最新
      removeWxLoginStatus()
    }
    // 设置不同的登录状态
    commit('SET_WX_LOGIN_STATUS', saveWxLoginStatus(query))
  },
  // 登出
  fedLogOut() {
    // 删除token，登陆状态
    removeWxLoginStatus()
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
