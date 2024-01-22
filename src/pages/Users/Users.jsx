import React, { useContext } from "react";
import "./Users.css";
import User from "./User";
import Navbar from "../../components/Navbar/Navbar";
import { auth } from "../../firebase";
import { Context } from "../../Context/MyContext";

const Users = () => {
  
  const {allUsers} = useContext(Context);

  // console.log(userLists);
  // if(allUsers.length === 0) setLoading(true);
  // else setLoading(false);

  return (
    <>
      <Navbar />
      <div className="Users-conatiner">

      {/* {loading ? (
        <h1>Loading...</h1>
      ) : (
        allUsers
          .filter((user) => user.id !== auth.currentUser.uid)
          .map((filteredUser) => (
            <User key={filteredUser.id} user={filteredUser} />
          ))
      )} */}

      {allUsers
        .filter((user) => user.id !== auth?.currentUser?.uid)
        .map((filteredUser) => (
          <User key={filteredUser.id} users={filteredUser} />
        ))}
    </div>
    </>
    
  );
};

export default Users;
