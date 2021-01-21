import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { judgeSide } from '@/utils/index'
import getPageTitle from '@/utils/get-page-title'
import qs from 'qs'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/index', '/logout', '/wx']

const wxWhiteList = ['/wx/index']

router.beforeEach(async (to, from, next) => {
  // 页面定位到顶部
  // chrome
  document.body.scrollTop = 0
  // firefox
  document.documentElement.scrollTop = 0
  // safari
  window.pageYOffset = 0

  // start progress bar
  NProgress.start()
  // set page title
  document.title = getPageTitle(to.meta.title)

  const side = judgeSide(to.path)

  if (side == 1) {
    if (whiteList.indexOf(to.path) !== -1 || to.path === '/') {
      next()
    } else {
      next(`/`)
      NProgress.done()
    }
  } else {
    if (to.path === '/') {
      return next('/wx')
    }

    if (wxWhiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next({ path: '/wx/index', replace: true })
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})

router.onError(error => {
  const pattern = /Loading chunk (\d)+ failed/g
  const isChunkLoadFailed = error.message.match(pattern)
  const targetPath = router.history.pending.fullPath
  if (isChunkLoadFailed) {
    router.replace(targetPath)
  }
})
