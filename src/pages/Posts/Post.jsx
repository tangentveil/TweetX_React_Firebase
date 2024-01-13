import React from "react";
import "./Post.css";
import moment from "moment";

const Post = ({ post }) => {
  // console.log(post);
  const user = post?.displayName;

  return (
    <div className="PostContainer">
      <div className="SubPostContainer">
        <div className="user_time">
            <p className="user">{user}</p>
            <p>{moment(post?.created).fromNow()}</p>
        </div>

        <div className="text_cir">
            <p>{post?.text}</p>
            <div className="cir"></div>
        </div>
      </div>
    </div>
  );
};

export default Post;
