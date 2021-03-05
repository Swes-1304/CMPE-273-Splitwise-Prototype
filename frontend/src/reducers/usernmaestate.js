/* eslint-disable no-param-reassign */
const usernamereducer = (state = { username: '' }, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      state = { username: action.payload }; // setting the state to username entered while signing up
      console.log(state);
      return state;
    case 'LOG_IN':
      state = { username: action.payload }; // setting the state to username returned from the database during login
      console.log(state);
      return state;
    case 'LOG_OUT':
      state = { username: '' }; // setting the state back to null after logout
      return state;
    default:
      return state;
  }
};

export default usernamereducer;
