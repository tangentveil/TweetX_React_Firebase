import React from "react";
import styles from "./UserProfileNav.module.css"
import { NavLink } from "react-router-dom";

const UserProfileNav = () => {
  return (
    <>
      <div className="nav-div">
        <div className={styles.underline}></div>
        
        <nav className={styles.profileNav}>
          <NavLink
            to="/profile/posts"
            className="nav-links"
            activeclassname={styles.active}
          >
            <p>Posts</p>
          </NavLink>
          <NavLink
            to="/profile/followers"
            className="nav-links"
            activeclassname={styles.active}
          >
            <p>Followers</p>
          </NavLink>
          <NavLink
            to="/profile/following"
            className="nav-links"
            activeclassname={styles.active}
          >
            <p>Following</p>
          </NavLink>
        </nav>
      </div>
    </>
  );
};

export default UserProfileNav;
