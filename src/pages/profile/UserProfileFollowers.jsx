import React, { useContext } from "react";
import Profile from "./Profile";
import img from "../../assets/auth.png";
import { Context } from "../../Context/MyContext";
import UserProfileFollower from "./UserProfileFollower";

const UserProfileFollowers = () => {
  const { followers, loading, setLoading } = useContext(Context);

  return (
    <>
      <Profile />

      {followers.map((users) => {
        return <UserProfileFollower key={users.id} users={users} />;
      })}
    </>
  );
};

export default UserProfileFollowers;
