// let message = localStorage.getItem('inputs.message');

const state = {
  // console.log(message);
  id: localStorage.id || 0,
  dataId: localStorage.dataId || 0

  // other state
};
const getters = {
  id: state => {
    return state.id;
  },
  dataId: state => {
    return state.dataId;
  }

  // other getters
};

const actions = {
  setTemplate: ({ commit, state }, newidVal) => {
    commit("SET_TEMPLATE", newidVal);
    return state.id;
  },

  setdataId: ({ commit, state }, newdataIdVal) => {
    commit("SET_DATAID", newdataIdVal);
    return state.dataId;
  }

  // other actions
};
const mutations = {
  SET_TEMPLATE: (state, newidVal) => {
    state.id = newidVal;
    localStorage.id = newidVal;
  },
  SET_DATAID: (state, newdataIdVal) => {
    state.dataId = newdataIdVal;
    localStorage.dataId = newdataIdVal;
  }

  // other mutations
};

export default {
  state,
  getters,
  actions,
  mutations
};
