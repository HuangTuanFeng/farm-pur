/*import Layout from '@/layout'
export default {
  path: '/newProductManagement',
  component: Layout,
  alwayShow:true,
   name: 'NewProductManagement',
   meta: { title: '新品开发', icon: 'banner' },
  children: [
    {
      path: 'newProductList',
      name: 'NewProductList',
      component: () => import('@/views/newProductManagement/newProductList'),
      meta: { title: '新品开发列表', icon: 'banner' }
    },
    {
      path: 'addNewProduct',
      name: 'addNewProduct',
      component: () => import('@/views/newProductManagement/AddNewProduct'),
      meta: { title: '新增新品', icon: 'banner' }
    }
  ]
}*/

import Layout from '@/layout'
export default {
  path: '/newProductManagement',
  component: Layout,
  alwayShow:true,
  name: 'NewProductManagement',
  meta: { title: '新品开发', icon: 'informationManagement' },
  children: [
    {
      path: 'newProductList',
      name: 'NewProductList',
      component: () => import('@/views/newProductManagement/newProductList'),
      meta: { title: '新品列表', icon: 'addInformation' }
    },  
    {
      path: 'addNewProduct',
      name: 'AddNewProduct',
      component: () => import('@/views/newProductManagement/addNewProduct'),
      meta: { title: '新增新品', icon: 'addInformation' }
    }
  ]
}

