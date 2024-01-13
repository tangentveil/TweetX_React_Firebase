import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  const usersignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Sign Out");
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <header>
        <h2>TweetX</h2>

        <nav>
          <NavLink to="/feed" className="nav-links" activeclassname="active">
            <p>Feed</p>
          </NavLink>
          <NavLink to="/users" className="nav-links" activeclassname="active">
            <p>Users</p>
          </NavLink>
          <NavLink to="/profile" className="nav-links" activeclassname="active">
            <p>Profile</p>
          </NavLink>

          <div className="btn-div">
            <button onClick={usersignOut}>Sign Out</button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
