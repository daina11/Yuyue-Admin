import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '个人中心', icon: 'dashboard' }
    }]
  },

  {
    path: '/shopinfo',
    component: Layout,
    redirect: '/shopinfo',
    name: 'shopinfo',
    meta: { title: '商店信息', icon: 'el-icon-menu' },
    children: [
      {
        path: 'shopinfo',
        name: 'shopinfo',
        component: () => import('@/views/shopinfo/index'),
        meta: { title: '本店信息', icon: 'table' }
      },
      {
        path: 'fuwenben',
        name: 'fuwenben',
        component: () => import('@/views/shopinfo/fuwenben'),
        meta: { title: '商店介绍', icon: 'el-icon-edit' }
      },
    ]
  },

  {
    path: '/ttt',
    component: Layout,
    meta: { title: '订单管理', icon: 'el-icon-document-copy' },
    children: [
      {
        path: 'unfinished',
        name: 'ttt',
        component: () =>  import('@/views/yuyueguanli/unfinished'),
        meta: { title: '未完成订单', icon: 'form' }
      },
      {
        path: 'index',
        name: 'ttt',
        component: () =>  import('@/views/yuyueguanli/all'),
        meta: { title: '所有订单', icon: 'form' }
      },
      
      {
        path: 'finished',
        name: 'ttt',
        component: () =>  import('@/views/yuyueguanli/finished'),
        meta: { title: '已完成订单', icon: 'form' }
      }
    ]
  },



]



//异步挂载的路由
//动态需要根据权限加载的路由表 
export const asyncRouterMap = [{
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  children: [{
    path: 'dashboard',
    name: 'Dashboard',
    component: () => import('@/views/dashboard/index'),
    meta: { title: '个人中心', icon: 'dashboard' }
  }]
},
  {
    path: '/nested',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/nested/menu1/index'),
        name: 'nested',
        meta: {role:['admin'], title: '商家管理', icon: 'nested'}
      }
    ]
  },
  {
    path: '/super',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/nested/menu1/index'),
        name: 'nested',
        meta: {role:['admin'], title: '用户管理', icon: 'table'}
      }
    ]
  },  {
    path: '/yuyue',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/nested/menu1/index'),
        name: 'nested',
        meta: {role:['admin'], title: '用户预约信息管理', icon: 'form'}
      }
    ]
  },
  {
    path: '/lunbo',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/nested/menu1/index'),
        name: 'nested',
        meta: {role:['admin'], title: '轮播管理', icon: 'tree'}
      }
    ]
  },

   { path: '*', redirect: '/404', hidden: true }
    // 404 page must be placed at the end !!!
];

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
export default new Router({
  routes: constantRouterMap
});
