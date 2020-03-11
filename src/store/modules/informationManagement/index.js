export default {
  namespaced: true,
  state: {
    typeManagementDialog: {
      isShow: false, //是否显示dialog
      id: '', //类型id
      name: '', //类型名称
      state: '0', //类型发布状态0隐藏，1已发布
      type: 'add', //类型状态名
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
