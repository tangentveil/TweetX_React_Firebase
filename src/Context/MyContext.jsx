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
import img from "../assets/auth.png";

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
  const [userListFollowing, setUserListFollowing] = useState([]);

  const usersCollectionRef = collection(db, "users");
  const postsCollectionRef = collection(db, "posts");
  const followsCollectionRef = collection(db, "users", User.uid, "follows");
  const followersCollectionRef = collection(db, "users", User.uid, "followers");

  useEffect(() => {
    const fetchFollowedUsers = async () => {
      try {
        const followsData = await getDocs(followsCollectionRef);
        setFollowedUsers(followsData.docs.map((doc) => doc.id));
      } catch (error) {
        console.error("Error fetching followed users:", error);
      }
    };

    const fetchPostsFromFollowedUsers = async () => {
      try {
        if (followedUsers.length === 0) {
          setPostLists([]);
          return;
        }

        const postsQuery = query(
          postsCollectionRef,
          where("id", "in", followedUsers)
        );
        const postsData = await getDocs(postsQuery);
        setPostLists(
          postsData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      } catch (error) {
        console.error("Error fetching posts from followed users:", error);
      }
    };

    const fetchUsers = async () => {
      try {
        const usersData = await getDocs(usersCollectionRef);
        setUserLists(
          usersData.docs.map((doc) => ({ ...doc.data(), docId: doc.id }))
        );
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    const fetchFollowers = async () => {
      try {
        const followersData = await getDocs(followersCollectionRef);
        setFollowersLists(followersData.docs.map((doc) => doc.id));
      } catch (error) {
        console.error("Error fetching followers:", error);
      }
    };

    const fetchFollowersData = async () => {
      try {
        if (followersLists.length === 0) {
          setFollowers([]);
          return;
        }

        const followersQuery = query(
          usersCollectionRef,
          where("id", "in", followersLists)
        );
        const followersData = await getDocs(followersQuery);
        setFollowers(
          followersData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
        setFollowersCount(followers.length);
      } catch (error) {
        console.error("Error fetching followers' data:", error);
      }
    };

    const fetchUserSpecificPosts = async () => {
      try {
        const userPostsData = await getDocs(postsCollectionRef);
        const userPosts = userPostsData.docs.map((doc) => ({
          ...doc.data(),
          docId: doc.id,
        }));
        const currentUserPosts = userPosts.filter(
          (user) => user?.id === auth?.currentUser?.uid
        );
        setUsersPosts(currentUserPosts);
        setPostCount(currentUserPosts.length);
      } catch (error) {
        console.error("Error fetching user-specific posts:", error);
      }
    };

    const fetchFollowingUsers = async () => {
      try {
        const followingUsersData = await getDocs(followsCollectionRef);
        setFollowingUsers(followingUsersData.docs.map((doc) => doc.id));
      } catch (error) {
        console.error("Error fetching following users:", error);
      }
    };

    const fetchFollowingUsersPosts = async () => {
      try {
        if (followingUsers.length === 0) {
          setUserListFollowing([]);
          return;
        }

        const followingUsersQuery = query(
          postsCollectionRef,
          where("id", "in", followingUsers)
        );
        const followingUsersData = await getDocs(followingUsersQuery);
        setUserListFollowing(
          followingUsersData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
        setFollowingCount(userListFollowing.length);
      } catch (error) {
        console.error("Error fetching following users' posts:", error);
      }
    };

    const fetchData = async () => {
      setLoading(true);

      await Promise.all([
        fetchFollowedUsers(),
        fetchPostsFromFollowedUsers(),
        fetchUsers(),
        fetchFollowers(),
        fetchFollowersData(),
        fetchUserSpecificPosts(),
        fetchFollowingUsers(),
        fetchFollowingUsersPosts(),
      ]);

      setLoading(false);
    };

    fetchData();
  }, []); // Dependency array should be adjusted based on actual dependencies

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
        postCount,
        followersCount,
        followingCount,
        usersPosts,
        img,
        userListFollowing,
        loading,
        setLoading,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default MyContext;
