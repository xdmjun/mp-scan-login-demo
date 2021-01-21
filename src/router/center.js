const constantCenterRoutes = [
  {
    path: '/',
    component: () => import('@/views/center/login'),
    hidden: true,
    meta: { title: '用户登录' },
  },
  {
    path: '/index',
    component: () => import('@/views/center/index'),
    hidden: true,
    meta: { title: '首页' },
  },
  {
    path: '/logout',
    redirect: '/login',
    component: () => import('@/views/center/login'),
    hidden: true,
  },
]

export default constantCenterRoutes
