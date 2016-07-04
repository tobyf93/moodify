import { ADD_MOODS } from '../actions/moods';

export default function moods(state = {}, action) {
  switch(action.type) {
    case ADD_MOODS:
      return { ...action.moods };
    default:
      return state;
  }
}
