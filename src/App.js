import "./App.css";
import MyContext from "./Context/MyContext";
import Auth from "./pages/Auth/Auth";
import Home from "./pages/Home/Home";
import Feed from "./pages/Feed/Feed";
import Profile from "./pages/profile/Profile";
import Posts from "./pages/Posts/Posts";
import Users from "./pages/Users/Users";
import UserProfilePosts from "./pages/profile/UserProfilePosts";
import UserProfileFollowers from "./pages/profile/UserProfileFollowers";
import UserProfileFollowing from "./pages/profile/UserProfileFollowing";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { auth } from "./firebase";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  // console.log(auth.currentUser)
  // const navigate = useNavigate();
  const [authUser, setAuthUser] = useState(null);

  // console.log(authUser)

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

  return (
    // <div className='App'>
    <MyContext>
      <Router>
        <Routes>
          <Route path="/" element={<Auth />} />
          {authUser !== null ? (
            <>
              <Route path="/Home" element={<Home />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/profile/posts" element={<UserProfilePosts />} />
              <Route path="/posts" element={<Posts />} />
              <Route path="/users" element={<Users />} />
              {/* <Route path='/profile/posts' element={<UserProfilePosts/>} /> */}
              <Route
                path="/profile/followers"
                element={<UserProfileFollowers />}
              />
              <Route
                path="/profile/following"
                element={<UserProfileFollowing />}
              />
            </>
          ) : (
            <Route path="/" element={<Auth />} />
          )}
        </Routes>
      </Router>
    </MyContext>
    // </div>
  );
}

export default App;
