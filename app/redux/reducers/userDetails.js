var cookie = require('cookie');

let initialState = function() {
  let parsedCookie = cookie.parse(document.cookie);

  return {
    loggedIn: !!parsedCookie.accessToken
  };
}

export function userDetails(state = initialState(), action) {
  return state;
}
