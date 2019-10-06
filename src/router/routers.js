import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/

export const constantRouterMap = [
  { path: '/login',
    meta: { title: '登录', noCache: true },
    component: () => import('@/views/login'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/features/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/features/401'),
    hidden: true
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/features/redirect')
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/home'),
        name: '首页',
        meta: { title: '首页', icon: 'index', noCache: true, affix: true }
      }
    ]
  },
  {
    path: '/orders',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'list',
        component: () => import('@/views/order/list'),
        name: '新增订单',
        meta: { title: '新增订单', icon: 'add' }
      },
      {
        path: 'list/:id',
        component: () => import('@/views/order/list'),
        name: '编辑订单',
        meta: { title: '编辑订单', icon: 'edit' }
      }
    ]
  },
  {
    path: '/deliveryOrders',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'list',
        component: () => import('@/views/order/deliveryOrderList'),
        name: '新增发货单',
        meta: { title: '新增发货单', icon: 'add' }
      },
      {
        path: 'list/:id',
        component: () => import('@/views/order/deliveryOrderList'),
        name: '编辑发货单',
        meta: { title: '编辑发货单', icon: 'add' }
      }
    ]
  },
  {
    path: '/outSourceProcessSheet',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'list',
        component: () => import('@/views/outSourceProcess/outSourceProcess/outSourceProcessList'),
        name: '新增委外加工单',
        meta: { title: '新增委外加工单', icon: 'add' }
      },
      {
        path: 'list/:id',
        component: () => import('@/views/outSourceProcess/outSourceProcess/outSourceProcessList'),
        name: '编辑委外加工单',
        meta: { title: '编辑委外加工单', icon: 'add' }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'center',
        component: () => import('@/views/system/user/center'),
        name: '个人中心',
        meta: { title: '个人中心', icon: 'user' }
      }
    ]
  }
  // { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
