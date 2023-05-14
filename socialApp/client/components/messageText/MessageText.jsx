import "./messageText.scss";
import { useContext, useEffect, useState, useRef, useLayoutEffect } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { makeRequest } from "../../axios";
import { BsFillImageFill } from 'react-icons/bs';
import { FiSend } from 'react-icons/fi';

export var fill = "";
export var barHeight = 25;
export var rendered = false;
export function reRendered(value) {
  rendered = value
};

const MessageText = ({setBar}) => {
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");


  useEffect(() => {
    if (rendered) {
      fill = "";
      reRendered(false)
    } else {
      if (fill !== "") {
        setDesc(fill)
      }
    }
  }, []); 

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const { currentUser } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newPost) => {
      return makeRequest.post("/posts", newPost);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const handleClick = async e => {
    e.preventDefault();
    let imgUrl = "";
    if (file) imgUrl = await upload();
    mutation.mutate({ desc, img: imgUrl });
    setFile(null);
    setDesc("")
  };
 
  useLayoutEffect(() => {
    textarea_height()
  });

  function textarea_height() {
    var textarea = document.getElementById("textarea");
    var container = document.getElementById("container");

    textarea.style.width = "calc(1/2 * (100% - 9px))"
    textarea.style.height = "auto";
    if (textarea.scrollHeight === 44) {
      textarea.style.width = "calc(100% - 9px)"
      textarea.style.height = "25px";
      container.style.height = "60px";
      setBar(60)
    } else {
      textarea.style.width = "calc(100% - 9px)"
      textarea.style.height = "auto";
      var height;
      if (textarea.scrollHeight <= 176) {height = textarea.scrollHeight} 
      else { height = 176}
      var containerHeight = height + 38;
      textarea.style.height = height + "px";
      container.style.height = containerHeight + "px";
      setBar(containerHeight);
    }
  }

  return (
    <div className="messageText" id="container">
      <div className="container">
        <div className="left">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="file">
              <div className="item">
                <BsFillImageFill size={24} color="rgb(183, 183, 183)" title="Add Image"/>
              </div>
            </label>
        </div>
        <div className="center">
            <textarea 
              id="textarea" 
              placeholder="Message..." 
              onChange={(e)=>{
                textarea_height(); 
                fill=e.target.value
                setDesc(e.target.value)}}
              value={desc}
            ></textarea>
        </div>
        <div className="right">
          <button onClick={handleClick}><FiSend/></button>
        </div>
      </div>
    </div>
  );
};

export default MessageText;