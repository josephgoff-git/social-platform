import "./messages.scss";
import MessageDisplay from "../../components/messageDisplay/MessageDisplay"
import MessageText from "../../components/messageText/MessageText"
import { useRef } from "react";

const Messages = () => { 

  var barHeight = 60;
  function setBar(value) {
    barHeight = value; 
    const messageD = document.getElementById("messageD")
    messageD.style.marginBottom = barHeight + "px";
    scrollToBottom()
  }

  const messagesEndRef = useRef(null)

  function scrollToBottom() {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }

  return ( 
    <div className="messages">
      <div className="messageDisplay" id="messageD">
        <div className="display">
          <MessageDisplay/>
          <div ref={messagesEndRef} />
        </div>
      </div> 
      <div className="messageText">
        <MessageText setBar={setBar}/>
      </div>
    </div>
  );
};

export default Messages;
