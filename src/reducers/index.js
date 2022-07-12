import { combineReducers } from "redux";
import postsReducer from "./postsReducer";
import userReducer from "./userReducer";

export default combineReducers({
  // these key names are refered by "state" argument in mapStateToProps function
  posts: postsReducer,
  users: userReducer,
});
