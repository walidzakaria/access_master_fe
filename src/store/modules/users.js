import axios from 'axios';
import Cookies from 'js-cookie';

export default {
  namespaced: true,
  state: {
    userInfo: {
      id: 0,
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      userType: 0,
      groups: [],
      lastLogin: null,
      user_photo: '',
    },
    token: Cookies.get('tokenKey') || null,
  },
  mutations: {
    updateUserInfo(state, newInfo) {
      if (!newInfo) {
        state.userInfo = {
          id: 0,
          username: '',
          firstName: '',
          lastName: '',
          email: '',
          userType: '',
          groups: [],
          lastLogin: null,
          user_photo: '',
        };
      } else {
        state.userInfo = newInfo;
      }
    },
    retrieveToken(state, token) {
      Cookies.set('tokenKey', token, { expires: 30 });
      state.token = token;
    },
    updateUserProfile(state, newProfile) {
      state.userInfo.user_photo = newProfile;
    },
  },
  actions: {
    checkToken(context) {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common.Authorization = `Token ${context.state.token}`;
        axios({
          method: 'get',
          url: '/api/auth/check-token/',
        }).then((response) => {
          console.log('valid token', response.data);
          resolve(response);
        }).catch((error) => {
          delete axios.defaults.headers.common.Authorization;
          Cookies.set('tokenKey', '', { expires: 30 });
          context.commit('retrieveToken', '');
          console.log('invalid token', error);
          reject(error);
        });
      });
    },
    retrieveToken(context, credentials) {
      return new Promise((resolve, reject) => {
        delete axios.defaults.headers.common.Authorization;
        axios({
          method: 'post',
          url: '/api/auth/token/login/',
          data: {
            password: credentials.password,
            email: credentials.email,
          },
        })
          .then((response) => {
            const token = response.data.auth_token;
            context.commit('retrieveToken', token);
            axios.defaults.headers.common.Authorization = `Token ${context.state.token}`;
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    setUnauthenticated(context) {
      console.log('setUnauthenticated invoked');
      Cookies.remove('tokenKey');
      context.commit('retrieveToken', '');
      delete axios.defaults.headers.common.Authorization;
      context.commit('updateUserInfo', null);
    },
    destroyToken(context) {
      axios.defaults.headers.common.Authorization = `Token ${context.state.token}`;
      return new Promise((resolve, reject) => {
        axios({
          url: '/api/auth/token/logout/',
          method: 'post',
        })
          .then((response) => {
            Cookies.remove('tokenKey');
            context.commit('retrieveToken', '');
            delete axios.defaults.headers.common.Authorization;
            context.commit('updateUserInfo', null);
            resolve(response);
          })
          .catch((error) => {
            Cookies.remove('tokenKey');
            context.commit('retrieveToken', '');
            delete axios.defaults.headers.common.Authorization;
            reject(error);
          });
      });
    },
    retrieveUserData(context) {
      return new Promise((resolve, reject) => {
        axios({
          url: '/api/auth/get-info/',
          method: 'get',
        })
          .then((result) => {
            const resultInfo = {
              id: result.data.id,
              username: result.data.username,
              firstName: result.data.first_name,
              lastName: result.data.last_name,
              email: result.data.email,
              lastLogin: result.data.last_login,
              groups: result.data.groups,
              userType: result.data.user_type,
              user_photo: result.data.user_photo,
            };
            context.commit('updateUserInfo', resultInfo);
            resolve(result);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    resetPassword(context, email) {
      return new Promise((resolve, reject) => {
        console.log(email);
        axios({
          method: 'post',
          url: '/api/auth/users/reset_password/',
          data: email,
        })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    setPassword(context, info) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          url: '/api/auth/users/set_password/',
          data: info,
        })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error.response.data);
          });
      });
    },
    setEmail(context, info) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          url: '/api/auth/users/set_email/',
          data: info,
        })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error.response.data);
          });
      });
    },
    resetPasswordConfirm(context, data) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          url: '/api/auth/users/reset_password_confirm/',
          data,
        })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    changePasswordConfirm(context, data) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'post',
          url: '/api/auth/users/set_password/',
          data,
        })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    updateUserProfile(context, newProfile) {
      context.commit('updateUserProfile', newProfile);
    },
    resetData({ commit }) {
      return new Promise((resolve, reject) => {
        axios({
          method: 'get',
          url: '/reset/',
        })
          .then((response) => {
            console.log(commit);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  getters: {
    userInfo(state) {
      return state.userInfo;
    },
    token(state) {
      return state.token;
    },
    isAuthenticated(state) {
      const result = !!state.token;
      if (result) {
        axios.defaults.headers.common.Authorization = `Token ${state.token}`;
      }
      return result;
    },
    loginName(state) {
      return state.firstName;
    },
    userAdmin(state) {
      return state.userInfo?.userType === 'admin';
    },
  },
};
