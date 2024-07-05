import { useState } from 'react';

export function Button({message, type="", onButtonClick, isAsync=false}){
  const [status, setStatus] = useState("default");
  const buttonClass = "styled-button " + status + (type === "light" ? " light":"");
  const clickFunc = isAsync ? handleClick:onButtonClick;

  //handle clicks with asynchronous callbacks
  function handleClick(){
    setStatus("active");
    //set up promise?
    onButtonClick().then((resolved) => {
      console.log("no error!");
      setStatus("default");
    }).catch((error) => {
      console.error(error);
      console.log("[handleClick error]")
      setStatus("default");
    });
  }

  return (
    <button className = {buttonClass} onClick = {clickFunc}>
      <span>{message}</span>
      <div className = "button-load">
        <span className = "button-load-symbol"></span>
      </div>
    </button>
  );
}