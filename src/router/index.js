import Vue from 'vue'
import VueRouter from 'vue-router'
import { judgeSide } from '@/utils/index'
import constantCenterRoutes from '@/router/center'
import constantWxRoutes from '@/router/wx-side'

Vue.use(VueRouter)

const side = judgeSide()

const createRouter = () => new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: side === 1 ? constantCenterRoutes : constantWxRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
