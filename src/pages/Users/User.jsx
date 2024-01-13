import React, { useEffect, useState } from "react";
import "./User.css";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "../../firebase";
import img from '../../assets/auth.png'

const User = ({ users }) => {
  // console.log(users.id)

  const [isFollowing, setIsFollowing] = useState(false);
  const User = auth?.currentUser;

  const userFollowRef = collection(db, "users", User?.uid, "follows");
  const UserDocRef = doc(userFollowRef, users?.id);

  const userFollowerRef = collection(db, "users", User?.uid, "followers");
  const followerRef = doc(userFollowerRef, users?.id);

  useEffect(() => {
    const checkIfFollowing = async () => {
      try {
        const userDocSnapshot = await getDoc(UserDocRef);
        setIsFollowing(userDocSnapshot.exists());
      } catch (error) {
        console.error("Error checking if following:", error);
      }
    };

    checkIfFollowing();
  }, [UserDocRef, setIsFollowing, users?.id]);

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
            userId: users.id,
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
