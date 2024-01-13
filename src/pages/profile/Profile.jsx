import React from 'react'
import './Profile.css'
import Navbar from '../../components/Navbar/Navbar'

const Profile = () => {
  return (
    <>
      <Navbar></Navbar>

      <div className='profileContainer'>
        <h1>Name</h1>

        <div className='post_follow'>
          <p>Posts: 511</p>
          <p>Followers : 511</p>
          <p>Followers: 511</p>
        </div>
      </div>

      <div>
        {/*  */}
      </div>
    </>
  )
}

export default Profile