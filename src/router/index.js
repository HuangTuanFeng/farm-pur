import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import purchaseOrderManagement from './modules/purchaseOrderManagement'
import purchaseTaskManagement from './modules/purchaseTaskManagement'
import productManagement from './modules/productManagement'
import supplierManagement from './modules/supplierManagement'
/**
 * Note: 子菜单仅在route children.length>=1时出现
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   如果设置为true，则项目将不会显示在侧边栏中（默认为false）
 * alwaysShow: true               如果设置为true，将始终显示根菜单
 *                                如果不始终设置Show，则当项具有多个子路由时，
 *                                它将成为嵌套模式，否则不显示根菜单
 * redirect: noRedirect           如果设置了no redirect，则noRedirect将不会在breadcrumb中重定向
 * name:'router-name'             <keep-alive> 使用设置
 * meta : {
    roles: ['admin','editor']    控制页面角色（可设置多个角色）
    title: 'title'               在侧边栏和面包屑中显示的名称
    icon: 'svg-name'             图标显示在侧栏中
    breadcrumb: false            如果设置为false，则该项将隐藏在breadcrumb中（默认为true）
    activeMenu: '/customerManagement/list'  如果设置路径，侧边栏将突出显示您设置的路径
  }
 */
export const constantRouterMap = [
  {
    path: '',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      hidden: true,
      meta: { title: '首页' }
    }]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/forgetPass',
    component: () => import('@/views/forgetPass/index'),
    hidden: true
  },  
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  }
]
export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  supplierManagement,
  purchaseTaskManagement,
  purchaseOrderManagement,
  productManagement,
  {
    path: '/newProductList',
    component: Layout,    
    children: [
      {
        path: 'newProductList',
        name: 'NewProductList',
        component: () => import('@/views/newProductManagement/newProductList'),
        meta: { title: '新品开发', icon: 'addInformation' }    
      }
    ],
  },  
  {
    path: '/accountSettings',
    component: Layout,
    children: [
      {
        path: 'accountSettings',
        name: 'AccountSettings',
        component: () => import('@/views/accountSettings'),
        meta: { title: '账号设置', icon: 'bannerManagement' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]