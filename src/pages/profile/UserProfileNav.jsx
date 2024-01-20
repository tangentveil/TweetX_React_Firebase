import React from "react";
import { NavLink } from "react-router-dom";

const UserProfileNav = () => {
  return (
    <>
      <nav>
        <NavLink
          to="/profile/posts"
          className="nav-links"
          activeclassname="active"
        >
          <p>Posts</p>
        </NavLink>
        <NavLink
          to="/profile/followers"
          className="nav-links"
          activeclassname="active"
        >
          <p>Followers</p>
        </NavLink>
        <NavLink
          to="/profile/following"
          className="nav-links"
          activeclassname="active"
        >
          <p>Following</p>
        </NavLink>
      </nav>
    </>
  );
};

export default UserProfileNav;
