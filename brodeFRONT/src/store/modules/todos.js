// let message = localStorage.getItem('inputs.message');

const state = {
  message: JSON.parse(localStorage.getItem("message")) || "",
  // console.log(message);
  sec: localStorage.sec || 0

  // other state
};
const getters = {
  message: state => {
    // console.log(this.state.message);

    return state.message;
  },

  sec: state => {
    return state.sec;
  }

  // other getters
};

const actions = {
  setMessage: ({ commit, state }, inputs) => {
    commit("SET_MESSAGE", inputs.map(input => input.message));

    return state.message;
  },

  setSec: ({ commit, state }, newSecVal) => {
    commit("SET_TIMEOUT", newSecVal);
    return state.sec;
  }

  // other actions
};
const mutations = {
  SET_MESSAGE: (state, newValue) => {
    state.message = newValue;
    localStorage.setItem("message", JSON.stringify(newValue));
  },

  SET_TIMEOUT: (state, newSecVal) => {
    state.sec = newSecVal;
    localStorage.sec = newSecVal;
  }

  // other mutations
};

export default {
  state,
  getters,
  actions,
  mutations
};
