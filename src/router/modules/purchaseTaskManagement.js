import Layout from '@/layout'
export default {
  path: '/purchaseTaskManagement',
  component: Layout,
  alwaysShow: true,
  name: 'PurchaseTaskManagement',
  meta: { title: '采购任务管理', icon: 'informationManagement' },
  children: [
    {
      path: 'purchaseTaskList',
      name: 'PurchaseTaskList',
      component: () => import('@/views/purchaseTaskManagement/purchaseTaskList'),
      meta: { title: '采购任务列表', icon: 'addInformation' }
    },   
      {
      path: 'purchaseTaskInfo',
      name: 'PurchaseTaskInfo',
      hidden:true,
      component: () => import('@/views/purchaseTaskManagement/purchaseTaskInfo'),
      meta: { title: '采购任务明细', icon: 'addInformation' }
    }
  ]
}
