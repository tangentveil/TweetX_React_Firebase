import React, { useEffect, useState } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from '../../firebase'
import {useNavigate} from 'react-router-dom'

const AuthDetails = () => {
    const navigate = useNavigate();
    const [authUser, setAuthUser] = useState(null);

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

    const usersignOut = () =>{
        signOut(auth).then(() => {
            console.log("Sign Out")
            navigate('/')
        }).catch(error => console.log(error))
    }

  return (
    <div>
        <button onClick={usersignOut}>SignOut</button>
    </div>
  )
}

export default AuthDetails