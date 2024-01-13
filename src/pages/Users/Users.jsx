import React, { useEffect, useState } from "react";
import "./Users.css";
import User from "./User";
import Navbar from "../../components/Navbar/Navbar";
import { getDocs, collection } from "firebase/firestore";
import { auth, db } from "../../firebase";

const Users = () => {
  const [userLists, setUserLists] = useState([]);
  const [loading, setLoading] = useState(false);
  const usersCollectionRef = collection(db, "users");

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      // console.log(data.docs)
      console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      // console.log(data.docs.map((doc) => ({ ...doc.data(), docid: doc.id})));

      setUserLists(data.docs.map((doc) => ({ ...doc.data(), docId: doc.id })));
    };

    getUsers();
  }, []);

  console.log(userLists);

  return (
    <div className="conatiner">
      <Navbar />

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
  );
};

export default Users;
