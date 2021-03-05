export const signinAction = (userName) => ({
  type: 'SIGN_IN',
  payload: userName, // setting the state to username entered while signing up
});
export const loginAction = (userName) => ({
  type: 'LOG_IN',
  payload: userName, // setting the state to username returned from the database during login
});
export const logoutAction = () => ({
  type: 'LOG_OUT',
  payload: '', // setting the state back to null after logout
});
