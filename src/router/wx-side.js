const constantWxRoutes = [
  {
    path: '/wx',
    redirect: '/wx/index'
  },
  {
    path: '/wx/index',
    component: () => import('@/views/wx-side/home'),
    meta: { title: '首页' }
  },
]

export default constantWxRoutes
