import Vue from 'vue'
import { login as userLogin } from '@/api/auth'
import { ACCESS_TOKEN, USER, REQUEST_HEADERS } from '@/store/mutation-types'
import { getMenuList } from '../../api/home'

const user = {
  namespaced: true,
  state: {
    token: '',
    user: null,
    headers: {}
  },
  getters: {
    username (state) {
      return (state.user && state.user.userName) || ''
    }
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      Vue.ss.set(ACCESS_TOKEN, token, 7 * 24 * 60 * 60 * 1000)
      state.token = token
    },
    SET_USER: (state, user) => {
      Vue.ss.set(USER, user)
      state.user = user
    },
    SET_HEADERS: (state) => {

      // state.headers = { authorization: `Bearer ${Vue.get(ACCESS_TOKEN)}` }
    }
  },

  actions: {
    // 登录
    Login ({ commit, dispatch }, user) {
      return new Promise(async (resolve, reject) => {
        const res = await userLogin(user)
        if (res.code === '0') {
          commit('SET_TOKEN', res.data.token)
          commit('SET_USER', res.data.userInfo)
          resolve()
        } else {
          reject(res)
        }
      })
    },
    Logout ({ commit, state }) {
      return new Promise(async resolve => {
        commit('SET_TOKEN', '')
        Vue.ss.remove(ACCESS_TOKEN)
        Vue.ss.remove(REQUEST_HEADERS)
        resolve()
      })
    },
    GetMenuList ({ commit, state }) {
      return new Promise(async (resolve, reject) => {
        const res = await getMenuList()
        if (res.code === '0') {
          commit('permission/SET_MENUS', res.data, {
            root: true
          })
          resolve(res)
        } else {
          reject(res)
        }
      })
    }
  }
}

export default user
