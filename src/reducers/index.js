import { combineReducers } from "redux";
import postsReducer from "./postsReducer";

export default combineReducers({
  // these key names are refered by "state" argument in mapStateToProps function
  posts: postsReducer,
});
