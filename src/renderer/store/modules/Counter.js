const state = {
  main: 0,
  id:null,
  dialogStatus:0,
}

const mutations = {
  DECREMENT_MAIN_COUNTER (state) {
    state.main--
  },
  INCREMENT_MAIN_COUNTER (state) {
    state.main++
  },
  //保留跳转id
  saveId(state,id) {
    state.id = id
  },
    //保存会话状态 vuex不能多页面使用同一个store
    // saveDialogStatus(state,status) {
    //   state.dialogStatus = status
    // },
}

const actions = {
  someAsyncTask ({ commit }) {
    // do something async
    commit('INCREMENT_MAIN_COUNTER')
    commit('saveDialogStatus')
  },


}

export default {
  state,
  mutations,
  actions
}
