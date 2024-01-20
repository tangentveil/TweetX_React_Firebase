import { createContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import img from '../assets/auth.png'

import React from "react";

export const Context = createContext();

const MyContext = ({ children }) => {
  const User = auth.currentUser;

  // console.log(User);

  const [postLists, setPostLists] = useState([]);
  const [userLists, setUserLists] = useState([]);
  const [followedUsers, setFollowedUsers] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersLists, setFollowersLists] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [postCount, setPostCount] = useState(0);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [usersPosts, setUsersPosts] = useState([]);
  const [followingUsers, setFollowingUsers] = useState([]);

  
  const usersCollectionRef = collection(db, "users");
  const postsCollectionRef = collection(db, "posts");
  const followsCollectionRef = collection(db, "users", User.uid, "follows");
  const followersCollectionRef = collection(db, "users", User.uid, "followers");

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
      const postsQuery = query(
        postsCollectionRef,
        where("id", "in", followedUsers)
      );
      const data = await getDocs(postsQuery);

      setPostLists(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      // setLoading(false)
    };

    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      // console.log(data.docs)
      // console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      // console.log(data.docs.map((doc) => ({ ...doc.data(), docid: doc.id})));

      setUserLists(data.docs.map((doc) => ({ ...doc.data(), docId: doc.id })));
    };

    getFollowedUsers();
    getPosts();
    getUsers();
  }, []);

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

  //   const [isFollowing, setIsFollowing] = useState(false);

  //   const userFollowRef = collection(db, "users", User?.uid, "follows");
  //   const UserDocRef = doc(userFollowRef, users?.id);

  //   const userFollowerRef = collection(db, "users", users?.id, "followers");
  //   const followerRef = doc(userFollowerRef, User?.uid);

  //   useEffect(() => {
  //     const checkIfFollowing = async () => {
  //       try {
  //         const userDocSnapshot = await getDoc(UserDocRef);
  //         setIsFollowing(userDocSnapshot.exists());
  //       } catch (error) {
  //         console.error("Error checking if following:", error);
  //       }
  //     };

  //     checkIfFollowing();
  //   }, [UserDocRef, setIsFollowing, users?.id]);

  //   const handleFollow = async () => {
  //     try {
  //       if (User) {
  //         if (isFollowing) {
  //           await deleteDoc(UserDocRef);
  //           await deleteDoc(followerRef);
  //           setIsFollowing(false);
  //           // alert("User Unfollowed");
  //         } else {
  //           await setDoc(UserDocRef, {
  //             userId: users.id,
  //           });

  //           await setDoc(followerRef, {
  //             userId: User.uid,
  //           });

  //           setIsFollowing(true);
  //           // alert("User Followed")
  //         }
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  useEffect(() => {
    const getFollowersData = async () => {
      const followsData = await getDocs(followersCollectionRef);
      setFollowersLists(followsData.docs.map((doc) => doc.id));
    };

    const getFollowers = async () => {
      if (followersLists.length === 0) {
        setFollowersLists([]);
        return;
      }

      // setLoading(true)
      const followersQuery = query(
        usersCollectionRef,
        where("id", "in", followersLists)
      );
      const data = await getDocs(followersQuery);

      setFollowers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      // setLoading(false)
      setFollowersCount(followers.length)
    };

    getFollowersData();
    getFollowers();
  }, []);

  const handleFollow = async () => {
    try {
      if (User) {
        if (isFollowing) {
          await deleteDoc(usersCollectionRef);
          // await deleteDoc(followerRef);
          setIsFollowing(false);
          // alert("User Unfollowed");
        } else {
          await setDoc(usersCollectionRef, {
            // userId: users.id,
          });

          // await setDoc(followerRef, {
          //   userId: users.id,
          // });

          setIsFollowing(true);
          // alert("User Followed")
        }
      }
    } catch (error) {
      console.log(error);
    }
  };


  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDocs(postsCollectionRef);
        const posts = data.docs.map((doc) => ({ ...doc.data(), docId: doc.id }));
        // setPostLists(posts);

        const userPosts = posts.filter((user) => user?.id === auth?.currentUser?.uid);
        setUsersPosts(userPosts);
        setPostCount(userPosts.length)
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchData();
  }, []);

  const [userListFollowing, setUserListFollowing] = useState([]);
  
  useEffect(() => {
    const getFollowingUsers = async () => {
      const followsData = await getDocs(followsCollectionRef);
      setFollowingUsers(followsData.docs.map((doc) => doc.id));
    };

    const getUsers = async () => {
      if (followingUsers.length === 0) {
        setUserListFollowing([]);
        return;
      }

      // setLoading(true)
      const postsQuery = query(
        postsCollectionRef,
        where("id", "in", followingUsers)
      );
      const data = await getDocs(postsQuery);

      setUserListFollowing(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      // setLoading(false)
      setFollowingCount(userListFollowing.length)
    };

    getFollowingUsers();
    getUsers();
  }, [followingUsers]);

  // console.log(followers);

  return (
    <Context.Provider
      value={{
        postLists,
        userLists,
        setText,
        handlePost,
        followers,
        isFollowing,
        setIsFollowing,
        handleFollow,
        postCount,
        followersCount,
        followingCount,
        usersPosts,
        img,
        userListFollowing,
        loading, setLoading,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default MyContext;
