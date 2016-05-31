var cookie = require('cookie');

const initialState = () => {
  let parsedCookie = cookie.parse(document.cookie);

  return {
    loggedIn: !!parsedCookie.accessToken
  };
}

export function userDetails(state = initialState(), action) {
  return state;
}
