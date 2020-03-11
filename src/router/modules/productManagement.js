import Layout from '@/layout'
export default {
  path: '/productManagement',
  component: Layout,
  children: [
    {
      path: 'productList',
      name: 'productList',
      component: () => import('@/views/productManagement/productList'),
      meta: { title: '货物列表', icon: 'banner' }
    }
  ]
}
