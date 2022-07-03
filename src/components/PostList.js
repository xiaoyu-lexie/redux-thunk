import React, { useEffect } from "react";
import { connect } from "react-redux";

import { fetchPosts } from "../actions";

const PostList = (props) => {
  const { fetchPosts, posts } = props;

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return posts.map((post) => {
    return (
      <div key={post.id}>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </div>
    );
  });
};

const mapStateToProps = (state) => {
  return { posts: state.posts };
};

export default connect(mapStateToProps, { fetchPosts: fetchPosts })(PostList);
