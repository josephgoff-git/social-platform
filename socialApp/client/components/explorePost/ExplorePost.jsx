import React, { useContext, useState } from 'react';
import "./explorePost.scss";
import { makeRequest } from '../../axios';
import { useQuery } from 'react-query';
import { AuthContext } from '../../context/authContext';
import { FiSend } from 'react-icons/fi';
import { Link } from 'react-router-dom'
import { IoMdHeartEmpty } from 'react-icons/io';
import { IoMdHeart } from 'react-icons/io';


const ExplorePost = () => {

  const { currentUser } = useContext(AuthContext);

  //Display image
  const { isLoading: pLoading, data: profileData } = useQuery(["user"], () =>
  makeRequest.get("/users/find/" + currentUser.id).then((res)=> {
     return res.data;
  })
  )

  const [desc, setDesc] = useState("")

  function handleClick() {
    setDesc("")
  }

  // const [like, setLike] = useState(false)
  var like = false;

  return (
    <div className="explorePost">
      
      <div className="content">
        <div className="left">
          <div className="top">
            <Link
              className="link"
              to={`/profile/${currentUser.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {pLoading ? (<></> ) : (<img src={"/upload/" + profileData.profilePic} alt="" />)}
              <p>Username</p>
            </Link>
          </div>
        
          <div className="img">
            <div className="content">
              {pLoading ? (<></> ) : (<img src={"/upload/" + profileData.profilePic} alt="" />)}
              <div className="desc">
              {like ? (
              <IoMdHeart
                style={{ color: "red" }}
                onClick={()=>{like = false;}}
                className='heart'
              />
            ) : (
              <IoMdHeartEmpty className='heart' onClick={()=>{like = true;}}/>
            )}
                <p>This was me when I was 8, I was so cute!</p>
              </div>
            </div>
          </div>
        
        </div>
       
        <div className="right">
          <div className="comments">
             {[...Array(15)].map((_, index) => (
                <div className="commentBox" key={index}>
                  {pLoading ? (<></> ) : (<img src={"/upload/" + profileData.profilePic} alt="" />)}
                  <div className="info">
                      <span>Test User</span>
                      <p>You look so good!</p>
                    </div>
                    <span className="date">
                      5m
                    </span>
                </div>
              ))}
          </div>
          <div className="addComment">
            <input
            type="text"
            placeholder="Write a comment..."
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            />
            <button onClick={( )=> {handleClick()}}><FiSend fontSize={18} className="send"/></button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ExplorePost;