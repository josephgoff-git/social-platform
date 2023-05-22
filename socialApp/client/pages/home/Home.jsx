import Stories from "../../components/stories/Stories"
import Posts from "../../components/posts/Posts"
import Share from "../../components/share/Share"
import "./home.scss"
import { useEffect } from "react"

const Home = ({addActivity}) => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="home">
      {/* <Stories addActivity={addActivity}/> */}
      <Share addActivity={addActivity}/>
      <Posts addActivity={addActivity}/>
    </div>
  )
}

export default Home