import Layout from '@/layout'
export default {
  path: '/supplierManagement',
  component: Layout,
  alwayShow:true,
  name: 'SupplierManagement',
  meta: { title: '供应商管理', icon: 'informationManagement' },
  children: [
    {
      path: 'supplierList',
      name: 'SupplierList',
      component: () => import('@/views/supplierManagement/supplierList'),
      meta: { title: '供应商列表', icon: 'addInformation' }
    },  
    {
      path: 'supplierInfo',
      name: 'SupplierInfo',
      hidden:true,
      component: () => import('@/views/supplierManagement/supplierInfo'),
      meta: { title: '供应商详细信息', icon: 'addInformation' }
    },  
    {
      path: 'addSupplier',
      name: 'AddSupplier',
      component: () => import('@/views/supplierManagement/addSupplier'),
      meta: { title: '新增供应商', icon: 'informationManagement' }
    }
  ]
}
