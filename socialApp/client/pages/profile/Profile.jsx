import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts"
import { useQuery, useMutation, useQueryClient} from 'react-query'
import { makeRequest } from "../../axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import Update from "../../components/update/Update";

const Profile = () => {
  const [openUpdate, setOpenUpdate] = useState(false);
  const { currentUser } = useContext(AuthContext)

  const location = useLocation()
  const userId = parseInt(location.pathname.split("/")[2])

  const { isLoading, error, data } = useQuery(["user"], () =>
    makeRequest.get("/users/find/" + userId).then((res)=> {
      return res.data;
    })
  )

  const { isLoading: rIsLoading, data: relationshipData } = useQuery(["relationship"], () =>
  makeRequest.get("/relationships?followedUserId=" + userId).then((res)=> {
    return res.data;
  })
)


const queryClient = useQueryClient();

  const mutation = useMutation(
    (following) => {
      if (following) return makeRequest.delete("/relationships?userId=" + userId);
      return makeRequest.post("/relationships", { userId });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["relationship"]);
      },
    }
  );

  const handleFollow = () => {
      mutation.mutate(relationshipData.includes(currentUser.id))
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
 
  var updatePage = false;
  useEffect(() => {
    updatePage = location.state;
    if (updatePage) {
      setOpenUpdate(true);
    }
    updatePage = false;
  }, [location.state, updatePage]);

  return (
    <div className="profile">
      {isLoading 
      ? "loading..." 
      : ( <> <div className="images">
        <img
          src={"/upload/" + data.coverPic}
          alt=""
          className="cover"
        />
        <img
          src={"/upload/" + data.profilePic}
          alt=""
          className="profilePic"
        />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          
          <div className="top">
            <span>{data.name}</span>
          </div>
          
          <div className="middle">
            <div className="info">
              <div className="city">
                <div className="city-div">
                  <PlaceIcon />
                  <span>{data.city}</span>
                </div>
              </div>
              <div className="website">
                <div className="website-div">
                  <LanguageIcon />
                  <span>{data.website}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="links">
            <a href="http://facebook.com">
              <FacebookTwoToneIcon />
            </a>
            <a href="http://instagram.com">
              <InstagramIcon />
            </a>
            <a href="http://twitter.com">
              <TwitterIcon />
            </a>
            <a href="http://linkedin.com">
              <LinkedInIcon />
            </a>
            <a href="http://pinterest.com">
              <PinterestIcon />
            </a>
          </div>

          <div className="bottom">
              {rIsLoading ? "loading..." : 
                userId === currentUser.id 
                ? (<button onClick={()=>setOpenUpdate(true)}>Update</button>) 
                : (<button onClick={handleFollow}>
                    {relationshipData.includes(currentUser.id) 
                      ? "Unfollow"
                      : "Follow"
                    } 
                  </button>)}
          </div>

        </div>
      <Posts userId={userId}/>
      </div></>)}
      {isLoading? <></> : <div>{openUpdate && <Update setOpenUpdate={setOpenUpdate} user={data}/>}</div>}
    </div>
  );
};

export default Profile;