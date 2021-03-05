/* eslint-disable no-param-reassign */
const usernamereducer = (state = { username: '' }, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      state = { username: action.payload };
      console.log(state);
      return state;
    case 'LOG_IN':
      state = { username: action.payload };
      console.log(state);
      return state;
    case 'LOG_OUT':
      state = { username: '' };
      return state;
    default:
      return state;
  }
};

export default usernamereducer;
