import './App.css';
import Auth from './pages/Auth/Auth';
import Home from './pages/Home/Home';
import Feed from './pages/Feed/Feed';
import Profile from './pages/profile/Profile'
import Posts from './pages/Posts/Posts'
import Users from './pages/Users/Users';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { auth } from './firebase';
import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  // console.log(auth.currentUser)
  // const navigate = useNavigate();
    const [authUser, setAuthUser] = useState(null);

    // console.log(authUser)

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if(user){
                setAuthUser(user);
            } else{
                setAuthUser(null);
            }
        });

        return () => {
            listen();
        }
    }, []);

  return (
    // <div className='App'>
      <Router>
        <Routes>
            {authUser !== null ? <>
              <Route path="/Home" element={<Home/>}/>
              <Route path='/feed' element={<Feed/>} />
              <Route path='/profile' element={<Profile/>} />
              <Route path='/posts' element={<Posts/>} />
              <Route path='/users' element={<Users/>} />
            </> : <Route path="/" element={<Auth/>}/>}
        </Routes>
      </Router>
    // </div>
  );
}

export default App;
