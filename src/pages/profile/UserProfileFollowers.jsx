import React, { useContext } from "react";
import Profile from "./Profile";
import img from "../../assets/auth.png";
import { Context } from "../../Context/MyContext";
import UserProfileFollower from "./UserProfileFollower";

const UserProfileFollowers = () => {

  const {followers, loading, setLoading} = useContext(Context)

  // if(followers.length === 0){
  //   setLoading(true);
  // }

  // if(followers.length) setLoading(false);
  setLoading(false)

  return (
    <>
      <Profile />

{loading ? <h1>Loading...</h1> : (
        followers.map((users) => {
          return <UserProfileFollower key={users.id} users={users}/>
        })
)}
    </>
  );
};

export default UserProfileFollowers;
