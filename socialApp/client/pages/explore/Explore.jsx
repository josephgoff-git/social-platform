import ExplorePost from "../../components/explorePost/ExplorePost";
import "./explore.scss";
import React, { useContext, useEffect, useRef, useState } from 'react';
import { makeRequest } from '../../axios';
import { useQuery } from 'react-query';
import { AuthContext } from '../../context/authContext';
import {BsFillSuitHeartFill} from 'react-icons/bs';
import { FaComment } from 'react-icons/fa';

const Explore = () => {
  const { currentUser } = useContext(AuthContext);

  // Display image
  const { isLoading: pLoading, data: profileData } = useQuery(["user"], () =>
    makeRequest.get("/users/find/" + currentUser.id).then((res)=> {
      return res.data;
    })
  )

  const [popupOpen, setPopupOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClick = (event) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target) 
      ) {
        setPopupOpen(false);
        const grid = document.getElementById("grid")
        grid.style.filter = "brightness(100%)";
        const boxes = document.getElementsByClassName("box");
        Array.from(boxes).forEach((box) => {
          box.style.cursor = "pointer";
          box.style.pointerEvents = "all";
        });
      }
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  const handleBoxClick = () => {
    setPopupOpen(!popupOpen);
    const grid = document.getElementById("grid")
    const boxes = document.getElementsByClassName("box");
    if (popupOpen) {
      grid.style.webkitFilter = "brightness(100%)";
      grid.style.filter = "brightness(100%)";
      Array.from(boxes).forEach((box) => {
        box.style.cursor = "pointer";
        box.style.pointerEvents = "all";
      });
    } else {
      grid.style.webkitFilter = "brightness(50%)";
      grid.style.filter = "brightness(50%)";
      Array.from(boxes).forEach((box) => {
        box.style.cursor = "auto";
        box.style.pointerEvents = "none";
      });
    }
  };

  return (
    <div className="explore">
      <div className="grid" id="grid">
        {[...Array(81)].map((_, index) => (
          <div
            key={index}
            className="box bin"
            id="box"
            onClick={(event) => {
              event.stopPropagation();
              handleBoxClick();
            }}
          >
            {pLoading ? (
              <></>
            ) : (
              <img src={"/upload/" + profileData.profilePic} alt="" />
            )}
            <div className="p">
              <BsFillSuitHeartFill style={{marginTop: "4.3px", fontSize: "17px"}}/> 
              <p> 203    </p>
              <FaComment style={{marginTop: "3px"}}/> 
              <p> 10</p>
            </div>
          </div>
        ))}
      </div>

      {popupOpen ? (
        <div ref={wrapperRef}>
          <ExplorePost />
        </div>
      ) : null}
    </div>
  );
};

export default Explore;
