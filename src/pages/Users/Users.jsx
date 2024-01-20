import React, { useContext } from "react";
import "./Users.css";
import User from "./User";
import Navbar from "../../components/Navbar/Navbar";
import { auth } from "../../firebase";
import { Context } from "../../Context/MyContext";

const Users = () => {
  
  const {userLists} = useContext(Context);

  // console.log(userLists);

  return (
    <>
      <Navbar />
      <div className="Users-conatiner">

      {/* {loading ? (
        <h1>Loading...</h1>
      ) : (
        userLists
          .filter((user) => user.id !== auth?.currentUser?.uid)
          .map((filteredUser) => (
            <User key={filteredUser.id} user={filteredUser} />
          ))
      )} */}

      {userLists
        .filter((user) => user.id !== auth?.currentUser?.uid)
        .map((filteredUser) => (
          <User key={filteredUser.id} users={filteredUser} />
        ))}
    </div>
    </>
    
  );
};

export default Users;
