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
