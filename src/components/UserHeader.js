import React from "react";
import { connect } from "react-redux";

const UserHeader = (props) => {
  const { user } = props;

  // The following part will move to mapStateToProps function
  // const user = users.find((user) => {
  //   return user.id === userId;
  // });

  if (!user) {
    return null;
  }

  return <div>user name: {user.name}</div>;
};

// ownProps allows to access props outside of component
const mapStateToProps = (state, ownProps) => {
  return { user: state.users.find((user) => user.id === ownProps.userId) };
};

export default connect(mapStateToProps)(UserHeader);
