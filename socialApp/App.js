import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import LeftBar from "./components/leftBar/LeftBar";
import RightBar from "./components/rightBar/RightBar";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Activity from "./pages/activity/Activity";
import Events from "./pages/events/Events";
import Explore from "./pages/explore/Explore";
import Friends from "./pages/friends/Friends";
import Groups from "./pages/groups/Groups";
import Market from "./pages/market/Market";
import Messages from "./pages/message/Messages";
import Saved from "./pages/saved/Saved";
import Settings from "./pages/settings/Settings";


import "./style.scss";
import { useContext, useState } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/authContext";
import { QueryClient, QueryClientProvider } from 'react-query'
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { RxLockClosed } from 'react-icons/rx';
import { HiOutlineStatusOnline } from 'react-icons/hi';
import { BsPersonLinesFill } from 'react-icons/bs';
import { Si1Password } from 'react-icons/si';
import { IoTrashOutline } from 'react-icons/io5';

function App() {
  const {currentUser} = useContext(AuthContext);

  const { darkMode } = useContext(DarkModeContext);

  const queryClient = new QueryClient()

  const [mainBody, setMainBody] = useState([
    [
      {icon: <RxLockClosed fontSize={20}/>,  label: "Private Account", value: "1", type: "option", clicked: false},
      {icon: <HiOutlineStatusOnline fontSize={24}/>,  label: "Show Online Status", value: "2", type: "option", clicked: false},
      {icon: <ShareOutlinedIcon/>,  label: "Allow Sharing", value: "3", type: "option", clicked: false},
      {icon: <BsPersonLinesFill fontSize={20}/>,  label: "Edit Profile", value: "4", type: "click"},
      {icon: <Si1Password fontSize={20}/>,  label: "Change Password", value: "5", type: "click"},
      {icon: <IoTrashOutline fontSize={20}/>, label: "Delete Account", value: "6", type: "click"}
    ],[
      {label: "Alex", value: "1", type: "click", lastMessage: "Hey are you free tomorrow? I thought we could grab a coffee!", type: "click"},
      {label: "Ryan", value: "2", type: "click", lastMessage: "Hey are you free tomorrow? I thought we could grab a coffee!", type: "click"},
      {label: "Haley", value: "3", type: "click", lastMessage: "Hey are you free tomorrow? I thought we could grab a coffee!", type: "click"},
      {label: "John", value: "4", type: "click", lastMessage: "Hey are you free tomorrow? I thought we could grab a coffee!", type: "click"},
      {label: "Connor", value: "5", type: "click", lastMessage: "Hey are you free tomorrow? I thought we could grab a coffee!", type: "click"},
      {label: "Sarah", value: "6", type: "click", lastMessage: "Hey are you free tomorrow? I thought we could grab a coffee!", type: "click"},
      {label: "Alex", value: "7", type: "click", lastMessage: "Hey are you free tomorrow? I thought we could grab a coffee!", type: "click"},
      {label: "Ryan", value: "8", type: "click", lastMessage: "Hey are you free tomorrow? I thought we could grab a coffee!", type: "click"},
      {label: "Haley", value: "9", type: "click", lastMessage: "Hey are you free tomorrow? I thought we could grab a coffee!", type: "click"},
      {label: "John", value: "10", type: "click", lastMessage: "Hey are you free tomorrow? I thought we could grab a coffee!", type: "click"},
      {label: "Connor", value: "11", type: "click", lastMessage: "Hey are you free tomorrow? I thought we could grab a coffee!", type: "click"},
      {label: "Sarah", value: "12", type: "click", lastMessage: "Hey are you free tomorrow? I thought we could grab a coffee!", type: "click"}
    ],[
      {value: "1", type: "click", notification: "Joseph Goff liked your photoooo photo phtoooo ophpoen"},
      {value: "2", type: "click", notification: "Joseph Goff liked your photo"},
      {value: "3", type: "click", notification: "Joseph Goff liked your photo"},
      {value: "4", type: "click", notification: "Joseph Goff liked your photo"},
      {value: "5", type: "click", notification: "Joseph Goff liked your photo"},
      {value: "6", type: "click", notification: "Joseph Goff liked your photo"},
      {value: "7", type: "click", notification: "Joseph Goff liked your photo"},
      {value: "8", type: "click", notification: "Joseph Goff liked your photo"},
      {value: "9", type: "click", notification: "Joseph Goff liked your photo"},
      {value: "10", type: "click", notification: "Joseph Goff liked your photo"},
      {value: "11", type: "click", notification: "Joseph Goff liked your photo"},
      {value: "12", type: "click", notification: "Joseph Goff liked your photo"}
    ]])

  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <div className={`theme-${darkMode ? "dark" : "light"}`}>
          <Navbar mainBody={mainBody} setMainBody={setMainBody}/>
          <div style={{ display: "flex" }}>
            <LeftBar />
            <div style={{ flex: 6 }}>
              <Outlet />
            </div>
            <RightBar />
          </div>
        </div>
      </QueryClientProvider>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/profile/:id",
          element: <Profile />,
        },
        {
          path: "/activity",
          element: <Activity/>,
        },
        {
          path: "/events",
          element: <Events />,
        },
        {
          path: "/explore",
          element: <Explore />,
        },
        {
          path: "/friends",
          element: <Friends />,
        },
        {
          path: "/groups",
          element: <Groups />,
        },
        {
          path: "/market",
          element: <Market />,
        },
        {
          path: "/messages",
          element: <Messages/>,
        },
        {
          path: "/saved",
          element: <Saved />,
        },
        {
          path: "/settings",
          element: <Settings />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
