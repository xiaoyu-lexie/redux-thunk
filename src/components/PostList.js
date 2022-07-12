import React, { useEffect } from "react";
import { connect } from "react-redux";

import { fetchPostsAndUsers } from "../actions";
import UserHeader from "./UserHeader";

const PostList = (props) => {
  const { fetchPostsAndUsers, posts } = props;

  useEffect(() => {
    fetchPostsAndUsers();
  }, [fetchPostsAndUsers]);

  return posts.map((post) => {
    return (
      <div key={post.id}>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
        <div>
          <UserHeader userId={post.userId} />
        </div>
      </div>
    );
  });
};

const mapStateToProps = (state) => {
  return { posts: state.posts };
};

export default connect(mapStateToProps, {
  fetchPostsAndUsers: fetchPostsAndUsers,
})(PostList);
