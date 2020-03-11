export default {
  namespaced: true,
  state: {
    userManagementDialog: {
      isShow: false, //是否显示dialog
      phone: '', //手机号
      nickName: '', //昵称
      password: '', //密码,
      type: 'add', //add新增，edit编辑
    },
  },
  mutations: {
    setData (state, obj) {
      state[obj.key] = obj.value;
    },
  },
  actions: {
    setData ({ commit }, obj) {
      commit('setData', obj);
    },
  },
  getters: {
    getData: (state) => (key) => {
      return state[key]
    }
  }
}
