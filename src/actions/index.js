import _ from "underscore";
import jsonPlaceHolder from "../apis/jsonPlaceHolder";

export const fetchPosts = () => async (dispatch) => {
  const response = await jsonPlaceHolder.get("/posts");

  dispatch({ type: "FETCH_POSTS", payload: response.data });
};

// the origin written style with same meaning:

// export const fetchPosts = () => {
//   return async function (dispatch, getState) {
//     const response = await jsonPlaceHolder.get("/posts");

//     dispatch({ type: "FETCH_POSTS", payload: response });
//   };
// };

// How to solve the multiple request from same api? We'll have 2 solutions,
// Solution 1: use memoize funciton
// where to put memoize function would be a question:
// situation1: if put _.memoize before outer function - function(id), although memoize could remeber what the outer function return, which is a function, the return and memoized function still be invoked by redux thunk, so we still make a lot of api requests.
// situation2: if we put _.memoize before inner function - async function(dispatch), everytime we call fetchUser, fetchUser would return a brand new function, which means we _.memoize new function everytime, which makes memoize still not work.
// export const fetchUser = function (id) {
//   return async function (dispatch) {
//     const response = await jsonPlaceHolder.get(`/users/${id}`);

//     dispatch({ type: "FETCH_USER", payload: response.data });
//   };
// };
// Because of the premise, we are going to have the following. Here works because memoize essentially reference the same function
// export const fetchUser = (id) => (dispatch) => {
//   _fetchUser(id, dispatch);
// };

// const _fetchUser = _.memoize(async (id, dispatch) => {
//   const response = await jsonPlaceHolder.get(`/users/${id}`);

//   dispatch({ type: "FETCH_USER", payload: response.data });
// });
// The solution 1 might have a problem that if we change data of a user, we cannot get changed data since memoize only allows us to request the api for one time. So let's move on to Solution 2
export const fetchUser = (id) => async (dispatch) => {
  const response = await jsonPlaceHolder.get(`/users/${id}`);

  dispatch({ type: "FETCH_USER", payload: response.data });
};

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());

  const userIds = _.uniq(_.map(getState().posts, "userId"));
  userIds.forEach((id) => dispatch(fetchUser(id)));
};
