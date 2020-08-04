// let message = localStorage.getItem('inputs.message');

const state = {
  // console.log(message);
  id: localStorage.id || 0

  // other state
};
const getters = {
  id: state => {
    return state.id;
  }

  // other getters
};

const actions = {
  setTemplate: ({ commit, state }, newidVal) => {
    commit("SET_TEMPLATE", newidVal);
    return state.id;
  }

  // other actions
};
const mutations = {
  SET_TEMPLATE: (state, newidVal) => {
    state.id = newidVal;
    localStorage.id = newidVal;
  }

  // other mutations
};

export default {
  state,
  getters,
  actions,
  mutations
};
