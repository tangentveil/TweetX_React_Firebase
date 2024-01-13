import React, { useEffect, useState } from "react";
import "./Feed.css";
import Navbar from "../../components/Navbar/Navbar";
import Posts from "../Posts/Posts";
import { addDoc, collection, getDocs, where, query, getDoc, doc } from "firebase/firestore";
import { auth, db } from "../../firebase";

const Feed = () => {
  const [text, setText] = useState("");
  const [postLists, setPostLists] = useState([]);
  const [followedUsers, setFollowedUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const postsCollectionRef = collection(db, "posts");
  const followsCollectionRef = collection(db, "users", auth.currentUser.uid, "follows");

  useEffect(() => {
    const getFollowedUsers = async () => {
      const followsData = await getDocs(followsCollectionRef);
      setFollowedUsers(followsData.docs.map((doc) => doc.id));
    };

    
    const getPosts = async () => {
      if (followedUsers.length === 0) {
        setPostLists([]);
        return;
      }

      // setLoading(true)
      const postsQuery = query(postsCollectionRef, where("id", "in", followedUsers));
      const data = await getDocs(postsQuery);

      setPostLists(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      // setLoading(false)
    };

    getFollowedUsers();
    getPosts();
  }, [followedUsers]);

  const handlePost = async () => {
    await addDoc(postsCollectionRef, {
      displayName: auth?.currentUser?.displayName,
      id: auth?.currentUser?.uid,
      text,
      created: Date.now(),
    });

    // getFollowedUsers(); // Refresh the list of followed users

    alert("Post Created");

    setText("");
  };

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
        {loading ? <h1>Loading...</h1> : <Posts postLists={postLists}></Posts>}
      </div>
    </div>
  );
};

export default Feed;
