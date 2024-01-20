import React, { useContext } from "react";
import "./Feed.css";
import Navbar from "../../components/Navbar/Navbar";
import Posts from "../Posts/Posts";
import { Context } from "../../Context/MyContext";

const Feed = () => {
  const {postLists, setText, handlePost} = useContext(Context); 

  return (
    <div className="feed-container">
      <Navbar></Navbar>
      <div className="content-post">
        <div className="ContentUploadContainer">
          <div className="input-div">
            <input
              type="text"
              className="contentWritingpart"
              placeholder="Write your real thought....."
              onChange={(e) => setText(e.target.value)}
            />
            <button className="btn" onClick={handlePost}>
              Post
            </button>
          </div>
        </div>
        <Posts postLists={postLists}></Posts>
      </div>
    </div>
  );
};

export default Feed;
