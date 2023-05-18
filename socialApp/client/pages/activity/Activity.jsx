import { Link } from "react-router-dom";
import "./activity.scss";
import { makeRequest } from "../../axios";
import { useQuery } from "react-query";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
const Activity = ({newNotifications}) => {

  const { currentUser } = useContext(AuthContext);

  var followingIds = []
  const { isLoading: isLoading2, error: error2, data: data2 } = useQuery(["relationships"], () =>
    makeRequest.get("/relationships/find").then((res)=> {
      for (let i=0; i<res.data.length; i++) {
        if (res.data[i].followerUserId === currentUser.id) {
          followingIds.push(res.data[i].followedUserId)
        }
      }
      console.log(followingIds)
      return res.data;
    })
  )

  var notifications = [
    {label: "Joseph Goff started following you", time: "5m", key: 0},
    {label: "Joseph Goff started following you", time: "5m", key: 1},
    {label: "Joseph Goff started following you", time: "5m", key: 2},
    {label: "Joseph Goff started following you", time: "5m", key: 3},
    {label: "Joseph Goff started following you", time: "5m", key: 4},
    {label: "Joseph Goff started following you", time: "5m", key: 5},
    {label: "Joseph Goff started following you", time: "5m", key: 6},
    {label: "Joseph Goff started following you", time: "5m", key: 7},
    {label: "Joseph Goff started following you", time: "5m", key: 8},
    {label: "Joseph Goff started following you", time: "5m", key: 9},
    {label: "Joseph Goff started following you", time: "5m", key: 10},
    {label: "Joseph Goff started following you", time: "5m", key: 11},
    {label: "Joseph Goff started following you", time: "5m", key: 12},
    {label: "Joseph Goff started following you", time: "5m", key: 13},
    {label: "Joseph Goff started following you", time: "5m", key: 14},
    {label: "Joseph Goff started following you", time: "5m", key: 15},
    {label: "Joseph Goff2 started following you", time: "5m", key: 16}
  ]
 
  //Display image
  const { isLoading: pLoading, data: profileData } = useQuery(["user"], () =>
  makeRequest.get("/users/find/" + currentUser.id).then((res)=> {
      return res.data;
  })
  )

  function handleClick() {

  }


  return (
    <div className="activity">
      <div className="title">
        Latest Activity
      </div>
      
      <div className="container">
        {notifications && notifications.reverse().map((item) => (
          <Link to="/" key={item.key} onClick={() => {handleClick(item)}} className="item">
            <div className="left">
                <div className="icon">
                {pLoading? <></> : <img src={"/upload/" + profileData.profilePic} alt="" />}
                </div>
                <div className="label">
                  {item.label}
                </div>
              </div>
              <div className="right">
                {item.time}
              </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Activity;
