// import axios from 'axios';
// import '@/libs/axios';
import Vue from 'vue'

export default {
    namespaced: true,
    state: {
      user: null
    },
    mutations: {
        setUserData (state, userData) {
            state.user = userData
            localStorage.setItem('user', JSON.stringify(userData))
            Vue.prototype.$http.defaults.headers.common.Authorization = `${userData.token_type} ${userData.access_token}`
        },
    
        clearUserData () {
            localStorage.removeItem('user')
            location.reload()
        }
    },
    actions: {
        login ({ commit }, credentials) {
            return Vue.prototype.$http
              .post('/api/auth/login', credentials)
              .then(({ data }) => {
                commit('setUserData', data)
            })
        },
        logout ({ commit }) {
            console.log('llegue')
            commit('clearUserData')
        }
    },
    getters: {
        isLogged: state => !!state.user
    }
  }
  