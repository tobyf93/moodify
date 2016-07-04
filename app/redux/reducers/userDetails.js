var cookie = require('cookie');

const initialState = () => {
  let parsedCookie = cookie.parse(document.cookie);

  return {
    loggedIn: !!parsedCookie.accessToken
  };
}

export default function userDetails(state = initialState(), action) {
  return state;
}
