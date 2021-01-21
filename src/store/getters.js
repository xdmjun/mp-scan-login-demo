const getters = {
  info: state => state.spamst,
  user: state => state.user,
  wxLoginStatus: state => state.user.wxLoginStatus
}
export default getters
