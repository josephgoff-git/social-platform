import "./dropdown.scss";
import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { AiFillCheckCircle } from 'react-icons/ai';
import { FiChevronRight } from 'react-icons/fi';
import { QueryClient, useMutation, useQuery } from "react-query";
import { makeRequest } from "../../axios";
import { reRendered } from "../messageText/MessageText";
import moment from "moment";

export var clickedOutside = false;

function Dropdown({page, userId, isLoading, mainBody, setMainBody, addActivity}) {

  const { currentUser } = useContext(AuthContext);

  const usersQuery = useQuery(["users"], () =>
  makeRequest.get("/users/get").then((res) => {
    return res.data
  })
  );

  //Display image
  const { isLoading: pLoading, data: profileData } = useQuery(["user"], () =>
  makeRequest.get("/users/find/" + currentUser.id).then((res)=> {
     return res.data;
  })
  )

  //Get all messages
  const { isLoading: mLoading, error: mError, data: mData } = useQuery(["messages"], () =>
    makeRequest.get("/messages?userId=" + userId).then((res)=> {
      var filteredMessages = res.data.filter((item)=> item.userId === currentUser.id || item.receiverId === currentUser.id)
      return filteredMessages;
    })
  )
  
  var messageData = mData? mData : [];
  var messageDropArray = [];
  var recipients = []
  for (let i=0; i<messageData.length; i++) {
    var alreadyFound = false; 
    if (messageData[i].userId === currentUser.id) {
     for (let j=0;j<recipients.length;j++) {
        if (recipients[j] === messageData[i].receiverId) {alreadyFound = true;}
      }
    } else if (messageData[i].receiverId === currentUser.id) {
     for (let j=0;j<recipients.length;j++) {
        if (recipients[j] === messageData[i].userId) {alreadyFound = true;}
      }
    }
    if (!alreadyFound) {
      if (messageData[i].userId === currentUser.id) {recipients.push(messageData[i].receiverId)}
      else if (messageData[i].receiverId === currentUser.id) {recipients.push(messageData[i].userId)}
      messageDropArray.push(messageData[i]);
    }
  }

  const ref = useRef();
  clickedOutside = false;

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
    clickedOutside = true;
  });


  var title = "";
  if (page === 1) {title = "Account Settings"} 
  else if (page === 2) {title = "Messages"} 
  else if (page === 3) { title = "Notifications"} 


  const [bodyChanged, setBodyChanged] = useState(0);
  function handleClick(item) {
    if (item.type === "option") {
      if (mainBody[page-1][item.value - 1]) {
        var newMainBody = mainBody
        newMainBody[page-1][item.value - 1].clicked = !newMainBody[page-1][item.value - 1].clicked;
        setMainBody(newMainBody)
      }
      setBodyChanged(bodyChanged + 1)
    } 
    if (item.label === "Private Account") {
      var action = item.clicked? "Enabled" : "Disabled";
      addActivity({label: action +  " private account from the dropdown menu", moment: moment(), link: "/activity"})
    }
    if (item.label === "Show Online Status") {
      var action = item.clicked? "visible" : "hidden";
      addActivity({label: "Set online status to " + action + " from the dropdown menu", moment: moment(), link: "/activity"})
    }
    if (item.label === "Allow Sharing") {
      var action = item.clicked? "Enabled" : "Disabled";
      addActivity({label: action +  " sharing from the dropdown menu", moment: moment(), link: "/activity"})
    }
  }
 
  function handleAlert(item) {
    if (item.label === "Delete Account") {
      if (window.confirm(`Delete ${currentUser.username} ${currentUser.name}'s account?`)) {
        deleteMutation.mutate(currentUser.id);
        localStorage.clear();
        window.location.href = "http://localhost:3000/login"
      } 
    }
  }

  const deleteMutation = useMutation(
    (id) => {
      return makeRequest.delete("/users/" + id);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        QueryClient.invalidateQueries(["users"]);
      },
    }
  );


  return (
    <div className="dropdown-wrapper" ref={ref}>
      <div className="title">
        {title}
      </div>
      <hr />
      {page !== 2 ?
      <div className="body">
        {mainBody[page-1] && mainBody[page-1].map((item) => {
          let link = "/";
          let update = false;
          if (page === 1) {
            if (item.label === "Edit Profile" || item.label === "Change Password") {
              update = true;  
              link = `/profile/${currentUser.id}`
            } 
          } else if (page === 3) {
            clickedOutside = true;
          }

          return (
          <div key={item.value} onClick={() => {clickedOutside = true; handleClick(item)}}>
          {item.type==="click" ? (
            <Link 
            to={link}
            state={{
              update,
              firstRender: true
            }}
            style={{ textDecoration: "none", color: "inherit" }}>
              <div className="item" >
                <div className="left">
                  <div className="icon">
                    {pLoading? <></> : page === 1? <div>{item.icon}</div> : <></>}
                    {pLoading? <></> : page === 3? <img src={"/upload/" + profileData.profilePic} alt="" /> : <></>}
                  </div>
                  <div className="label">
                    {page === 1 ? <div>{item.label}</div> : <></>}
                    {page === 3 ? <div className="page3">{item.notification}</div> : <></>}
                  </div>
                </div>
                <div className="right">
                  {page === 3 ? <div className="text">5m</div> : <FiChevronRight fontSize={18}/>}
                </div>
              </div>
            </Link>
            ):(
            <div className="item" onClick={()=>{handleAlert(item)}}>
              <div className="left">
                <div className="icon">
                  {item.icon}
                </div>
                <div className="label">
                  {item.label}
                </div>
              </div>
              <div className="right">
                {isLoading? <></> : bodyChanged !== null? <div>
                  {item.label === "Private Account" ? item.clicked === false? <AiOutlineCheckCircle fontSize={18}/> : <AiFillCheckCircle fontSize={18}/> : <></>}
                  {item.label === "Show Online Status" ? item.clicked === false? <AiOutlineCheckCircle fontSize={18}/> : <AiFillCheckCircle fontSize={18}/> : <></>}
                  {item.label === "Allow Sharing" ? item.clicked === false? <AiOutlineCheckCircle fontSize={18}/> : <AiFillCheckCircle fontSize={18}/> : <></>}
                  {item.label === "Delete Account" ? <FiChevronRight fontSize={18}/> : <></>}
              </div> : <></>}
              </div>
            </div>
          )}</div>
          )
        })} 
      </div>
      : 
      <div className="body">
        {messageDropArray && messageDropArray.map((item, index) => {
          clickedOutside = true;
          var allUsers = usersQuery ? usersQuery.data : [];
          var friend = allUsers[0]
          for (let i=0;i<allUsers.length;i++) {
            if (allUsers[i].id === recipients[index]) {
              friend = allUsers[i];
            } 
          }
          
          return (
          <div key={item.id} onClick={() => {
            clickedOutside = true;
            reRendered(true)
          }}>
            <Link
            to="/messages"
            state={{
              receiverId: recipients[index]
            }}
            style={{textDecoration: "none", color: "inherit"}}
            >
              <div className="item" >
                <div className="left">
                  <div className="icon">
                    <img src={"/upload/" + friend.profilePic} alt="" /> 
                  </div>
                  <div className="label">
                    <div>
                      <div className="top">{friend.username} {friend.name}</div>
                      <div className="bottom">{item.desc}</div>
                    </div>         
                  </div>
                </div>
                <div className="right">
                  <FiChevronRight fontSize={18}/>
                </div>
              </div>
            </Link>
          </div>
          )
        })} 
      </div>
      
      }
    </div>
  )
}

export default Dropdown;