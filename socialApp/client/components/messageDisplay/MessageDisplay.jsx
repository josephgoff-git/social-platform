import Message from "../message/Message";
import "./messageDisplay.scss";
import { useQuery } from 'react-query'
import { makeRequest } from "../../axios";
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'

const MessageDisplay = ({userId}) => {

  const { isLoading, error, data } = useQuery(["messages"], () =>
    makeRequest.get("/messages?userId=" + userId).then((res)=> {
      return res.data;
    })
  )

  const messagesEndRef = useRef(null);

  useLayoutEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView();
    }
  });

  return (
    <div className="posts">
      {error
        ? "Something went wrong."
        : isLoading 
        ? "loading..." 
        : data.map(post=>(
          <Message post={post} key={post.id}/>
      ))}
      <div id="messageRef" ref={messagesEndRef} />
    </div>
  );
};

export default MessageDisplay;
