import { login, logout } from '@/api/user'
import { categoryList} from '@/api/common'
import { customerTypesList,customerNameList,manageInfo} from '@/api/customerManagement'
import { getCookie, removeCookie, setCookie, set_s, remove_s, get_s } from '@/utils/auth'

const state = {
  manageInfo:[],
  customerNameList:[],
  categoryList:[],
  customerTypes:[],
  token: getCookie('zs_token'),
  name: getCookie('nickName'),
  avatar: get_s('avatar')
}

const mutations = {
   SET_MANAGEINFO: (state, list) => {
    state.manageInfo = list
  },
   SET_CUSTOMERNAMELIST: (state, list) => {
    state.customerNameList = list
  },
   SET_CUSTOMERTYPES: (state, list) => {
    state.customerTypes = list
  },
  SET_CATEGORYLIST: (state, list) => {
    state.categoryList = list
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  login ({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      login(userInfo).then(response => {
        // setCookie('nickName', response.data.user.mobile)
        setCookie('zs_token', response.data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout ({ commit, state }) {
    return new Promise((resolve, reject) => {
      const token = state.token || getCookie('zs_token')
      commit('SET_TOKEN', '')
      removeCookie('zs_token')
      removeCookie('nickName')
      remove_s('avatar')
      resolve()
    })
  },

   // 获取货物品类列表
  getCategoryList ({ commit, state }) {
    return new Promise((resolve, reject) => {
      categoryList().then((res) => {
        commit('SET_CATEGORYLIST', res.data.categoryList)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取客户行业列表
  getCustomerTypes ({ commit, state }) {
    return new Promise((resolve, reject) => {
      customerTypesList().then((res) => {
        console.log(res)
        commit('SET_CUSTOMERTYPES', res.data.customerTypes)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 获取客户全部名称
  getCustomerNameList ({ commit, state }) {
    return new Promise((resolve, reject) => {
      customerNameList().then((res) => {
        console.log(res)
        commit('SET_CUSTOMERNAMELIST', res.data.categoryList)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

    // 获取客户管理信息
  getManageInfo ({ commit, state }) {
    return new Promise((resolve, reject) => {
      manageInfo().then((res) => {
        console.log(res)
        commit('SET_MANAGEINFO', res.data.categoryList)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetCookie ({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeCookie('zs_token')
      removeCookie('nickName')
      remove_s('avatar')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

