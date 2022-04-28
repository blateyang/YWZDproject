import Vue from 'vue'
import Vuex from 'vuex'

import { createPersistedState, createSharedMutations } from 'vuex-electron'

import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  modules,
  plugins: [
    //运行报错Storage is not vaild跟这个插件有关
    // createPersistedState(),是用于localStorage持久化store中数据
    // createSharedMutations()//是多进程间共享vuex Store的状态的
  ],
  strict: process.env.NODE_ENV !== 'production'
})
