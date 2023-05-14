import "./leftBar.scss";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import { useQuery } from "react-query";
import { makeRequest } from "../../axios";
import { Link } from "react-router-dom";
import { AiFillHome } from 'react-icons/ai';
import { FaUserFriends } from 'react-icons/fa';
import { MdOutlineExplore } from 'react-icons/md';
import { RiDownloadCloudLine } from 'react-icons/ri';
import { RiSettings5Fill } from 'react-icons/ri';
import { IoPersonCircle } from 'react-icons/io5';
import { GoDashboard } from 'react-icons/go';
import { MdEventAvailable } from 'react-icons/md';
import { GiShoppingBag } from 'react-icons/gi';
import { MdOutlineChat } from 'react-icons/md';

import { useState, useEffect } from 'react';

const LeftBar = () => {

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
      setTitles([profile, home, explore, saved, friends, groups, events, market, activity, settings, logout])
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });

  let profile = windowWidth < 700 ? "Profile" : "";
  let home = windowWidth < 700 ? "Home" : "";
  let explore = windowWidth < 700 ? "Explore" : "";
  let saved = windowWidth < 700 ? "Saved" : "";
  let friends = windowWidth < 700 ? "Friends" : "";
  let groups = windowWidth < 700 ? "Groups" : "";
  let events = windowWidth < 700 ? "Events" : "";
  let market = windowWidth < 700 ? "Market" : "";
  let activity = windowWidth < 700 ? "Activity" : "";
  let settings = windowWidth < 700 ? "Settings" : "";
  let logout = windowWidth < 700 ? "Logout" : "";

  const [titles, setTitles] = useState([home, explore, saved, friends, groups, events, market, activity, settings, logout])


  const { currentUser } = useContext(AuthContext);

  // Display image
  const { isLoading: pLoading, data: profileData } = useQuery(["user"], () =>
  makeRequest.get("/users/find/" + currentUser.id).then((res)=> {
     return res.data;
  })
  )


  return (
    <div className="leftBar">
      {/* Irrelevant line to enact screen width */}
      {windowWidth < 700 ? <div/> : <div/> }
      <div className="container">
        <div className="menu">
          <Link
            to={`/profile/${currentUser.id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="item" title={profile}>
              {pLoading? <img src="" alt="" /> : <img src={"/upload/" + profileData.profilePic} alt="" />}
              <span>{currentUser.name}</span>
            </div>       
          </Link>   
          <Link
            to="/"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="item" title={home}>
              <AiFillHome size={24} color="white"/>
              <span>Home</span>
            </div>
          </Link> 
          <Link
            to="/explore"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="item" title={explore}>
              <MdOutlineExplore size={24} color="white"/>
              <span>Explore</span>
            </div>
          </Link> 
          <Link
            to="/saved"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="item" title={saved}>
              <RiDownloadCloudLine size={24} color="white"/>
              <span>Saved</span>
            </div>
          </Link>        
        </div>
        <hr />
        <div className="menu">
          <span>Social</span>
          <Link
            to="/friends"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="item" title={friends}>
              <FaUserFriends size={24} color="white"/>
              <span>Friends</span>
            </div>
          </Link> 
          <Link
          to="/groups"
          style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="item" title={groups}>
              <MdOutlineChat size={24} color="white"/>
              <span>Groups</span>
            </div>
          </Link> 
          <Link
            to="/events"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="item" title={events}>
              <MdEventAvailable size={24} color="white"/>
              <span>Events</span>
            </div>
          </Link> 
          <Link
            to="/market"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="item" title={market}>
              <GiShoppingBag size={24} color="white"/>
              <span>Market</span>
            </div>
          </Link> 
        </div>
        
        <hr />
        
        <div className="menu">
          <span>Account</span>  
          <Link
            to="/activity"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="item" title={activity}>
              <GoDashboard size={24} color="white"/>
              <span>Your Activity</span>
            </div>
          </Link> 
          <Link
            to="/settings"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="item" title={settings}>
              <RiSettings5Fill size={24} color="white"/>
              <span>Settings</span>
            </div>
          </Link> 
          <Link
            to="/"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="item" title={logout}>
              <IoPersonCircle size={24} color="white"/>
              <span>Logout</span>
            </div>
          </Link> 

        </div>
      </div>
    </div>
  );
};

export default LeftBar;
