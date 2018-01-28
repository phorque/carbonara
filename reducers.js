import { combineReducers } from "redux";
import { reducer as formReducer, actionTypes as formActionTypes } from 'redux-form';
import route from "./reducers/route";
import weights from "./reducers/weights";
import selectedWeight from "./reducers/selectedWeight";

export default combineReducers({
  route,
  weights,
  selectedWeight,
  form: formReducer
})
