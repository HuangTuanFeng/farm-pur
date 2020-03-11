import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getCookie, get_s } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/forgetPass'] // no redirect whitelist
let flag = 0
router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getCookie('zs_token')
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      if (flag == 0) {
        try {
          const roles = store.getters.avatar
          console.log(roles)
          console.log({ roles })
          console.log(router)
          let accessRoutes = await store.dispatch('GenerateRoutes', { roles })
          router.options.routes = accessRoutes
          router.addRoutes(accessRoutes)
          
          flag++
          next({ ...to, replace: true })
          NProgress.done()
        } catch (error) {
          await store.dispatch('user/resetCookie')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      } else {
        const roles = store.getters.avatar
        await store.dispatch('GenerateRoutes', { roles })
        next()
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else {
      // 否则全部重定向到登录页
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
