import { createStore } from 'vuex';
import users from './modules/users';
import entries from './modules/entries';

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    users,
    entries,
  },
});
