import React, { useEffect, useState } from 'react'
import './Posts.css'
import Post from './Post'

const Posts = ({postLists}) => {

  return (
    <>
      {/* <h1>Posts</h1> */}

      <div className="mainPostContainer">
        {postLists.map((item) => (
          <Post post={item} key={item.id} />
        ))}
      </div>
    </>
  )
}

export default Posts