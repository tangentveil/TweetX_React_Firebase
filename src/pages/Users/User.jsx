import React, { useContext, useEffect, useState } from "react";
import "./User.css";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "../../firebase";
import img from '../../assets/auth.png'
import { Context } from "../../Context/MyContext";

const User = ({ users }) => {
  // console.log(users)

  // const {isFollowing, setIsFollowing} = useContext(Context)

  const [isFollowing, setIsFollowing] = useState(false);
  const User = auth?.currentUser;

  const userFollowRef = collection(db, "users", User?.uid, "follows");
  const UserDocRef = doc(userFollowRef, users?.id);

  const userFollowerRef = collection(db, "users", users?.id, "followers");
  const followerRef = doc(userFollowerRef, User?.uid);

  useEffect(() => {
    const checkIfFollowing = async () => {
      try {
        const userDocSnapshot = await getDoc(UserDocRef);
        // console.log(userDocSnapshot)
        setIsFollowing(userDocSnapshot.exists());
      } catch (error) {
        console.error("Error checking if following:", error);
      }
    };

    checkIfFollowing();
  }, [UserDocRef, users.id, isFollowing]);

  const handleFollow = async () => {
    try {
      if (User) {
        if (isFollowing) {
          await deleteDoc(UserDocRef);
          await deleteDoc(followerRef);
          setIsFollowing(false);
          // alert("User Unfollowed");
        } else {
          await setDoc(UserDocRef, {
            userId: users.id,
          });

          await setDoc(followerRef, {
            userId: User.uid,
          });

          setIsFollowing(true);
          // alert("User Followed")
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="subContainer">
          <div className="image-user-foll">
            <div className="image">
              <img src={img} alt="" />
            </div>

            <div className="user-following">
              <p>{users?.displayName}</p>
              <p>Following: 200</p>
            </div>
          </div>

          <button className="follow-btn" onClick={handleFollow}>
            {isFollowing ? "Unfollow" : "Follow"}
          </button>
        </div>
        <div className="underline"></div>
      </div>
    </>
  );
};

export default User;
