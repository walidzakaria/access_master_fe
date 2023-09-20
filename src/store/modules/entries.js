import axios from 'axios';

export default {
  namespaced: true,
  state: {
    branchEntries: [],
    branches: [],
    scanMessage: 'No QR code entered.',
  },
  mutations: {
    updateBranchEntries(state, newData) {
      state.branchEntries = newData;
    },
    updateBranches(state, newData) {
      state.branches = newData;
    },
    updateScanMessage(state, newInfo) {
      state.scanMessage = newInfo;
    },
  },
  actions: {
    changeScanMessage(context, newMessage) {
      console.log('data changed', newMessage);
      context.commit('updateScanMessage', newMessage);
    },
    getBranchEntries(context) {
      return new Promise((resolve, reject) => {
        axios({
          url: '/api/entry/branch-entries/',
          method: 'get',
        }).then((response) => {
          context.commit('updateBranchEntries', response.data);
          resolve(response.data);
        }).catch((error) => {
          context.commit('updateBranchEntries', []);
          reject(error.response.data);
        });
      });
    },
    createCodes() {
      return new Promise((resolve, reject) => {
        axios({
          url: '/api/entry/create/',
          method: 'get',
          responseType: 'blob',
        }).then((response) => {
          resolve(response);
        }).catch((error) => {
          reject(error.response.data);
        });
      });
    },
    postEntry(context, entryInfo) {
      return new Promise((resolve, reject) => {
        axios({
          url: '/api/entry/enter/',
          method: 'post',
          data: entryInfo,
        })
          .then((response) => {
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  getters: {
    branchEntries(state) {
      return state.branchEntries;
    },
    branches(state) {
      return state.branches;
    },
    scanMessage(state) {
      return state.scanMessage;
    },
  },
};
