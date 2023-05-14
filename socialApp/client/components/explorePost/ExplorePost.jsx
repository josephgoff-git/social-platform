import React, { useContext, useEffect, useRef } from 'react';
import "./explorePost.scss";
import { makeRequest } from '../../axios';
import { useQuery } from 'react-query';
import { AuthContext } from '../../context/authContext';


export var clickedOutside2 = false;
export function pageClicked(value) {
  clickedOutside2 = value;
}

const ExplorePost = () => {

  const { currentUser } = useContext(AuthContext);

  //Display image
  const { isLoading: pLoading, data: profileData } = useQuery(["user"], () =>
  makeRequest.get("/users/find/" + currentUser.id).then((res)=> {
     return res.data;
  })
  )

  const ref = useRef();
  clickedOutside2 = false;

  const useOutsideClick = (ref, callback) => {
    const handleClick = e => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    };
  
    useEffect(() => {
      document.addEventListener("click", handleClick);
  
      return () => {
        document.removeEventListener("click", handleClick);
      };
    });
  };

  useOutsideClick(ref, () => {
    clickedOutside2 = true;
  });

  return (
    <div className="explorePost" ref={ref}>
        <div className="content">
        </div>
    </div>
  )
}

export default ExplorePost;