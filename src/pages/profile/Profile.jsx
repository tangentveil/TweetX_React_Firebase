import React, { useContext } from "react";
import "./Profile.css";
import Navbar from "../../components/Navbar/Navbar";
import UserProfileNav from "./UserProfileNav";
import { auth } from "../../firebase";
import { Context } from "../../Context/MyContext";

const Profile = () => {
  const user = auth.currentUser;
  const {postCount, followingCount, followersCount} = useContext(Context)

  return (
    <>
      <Navbar></Navbar>

      <div className="profileContainer">
        <h1>{user.displayName}</h1>

        <div className="post_follow">
          <p>Posts: {postCount}</p>
          <p>Followers : {followersCount}</p>
          <p>Following: {followingCount}</p>
        </div>
        <UserProfileNav />
      </div>
      <div>{/*  */}</div>
    </>
  );
};

export default Profile;
