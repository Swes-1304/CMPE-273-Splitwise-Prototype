export const signinAction = (userName) => ({
  type: 'SIGN_IN',
  payload: userName,
});
export const loginAction = (userName) => ({
  type: 'LOG_IN',
  payload: userName,
});
export const logoutAction = () => ({
  type: 'LOG_OUT',
  payload: '',
});
