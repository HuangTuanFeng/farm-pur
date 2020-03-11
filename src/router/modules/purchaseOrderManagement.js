import Layout from '@/layout'
export default {
  path: '/purchaseOrderManagement',
  component: Layout,
  alwaysShow: true,
  name: 'PurchaseOrderManagement',
  meta: { title: '采购订单管理', icon: 'informationManagement' },
  children: [
    {
      path: 'purchaseOrderList',
      name: 'PurchaseOrderList',
      component: () => import('@/views/purchaseOrderManagement/purchaseOrderList'),
      meta: { title: '采购订单列表', icon: 'addInformation' }
    },   
      {
      path: 'purchaseOrderInfo',
      name: 'PurchaseOrderInfo',
      hidden: true,
      component: () => import('@/views/purchaseOrderManagement/purchaseOrderInfo'),
      meta: { title: '采购订单明细', icon: 'addInformation' }
    },   
    {
      path: 'addPurchaseOrder',
      name: 'AddPurchaseOrder',
      hidden: true,
      component: () => import('@/views/purchaseOrderManagement/addPurchaseOrder'),
      meta: { title: '新增采购订单', icon: 'informationManagement' }
    }
  ]
}
