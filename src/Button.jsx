import { useState } from 'react';

export default function Button({message, type="", onButtonClick, isAsync=false, onSuccess=null, onFailure=null}){
  const [status, setStatus] = useState("default");
  const buttonClass = "styled-button " + status + (type === "light" ? " light":"");
  const clickFunc = isAsync ? handleClick:onButtonClick;

  //handle clicks with asynchronous callbacks
  function handleClick(e){
    e.preventDefault();
    setStatus("active");
    //set up promise?
    onButtonClick().then((resolved) => {
      onSuccess(resolved);
      setStatus("default");
    }).catch((error) => {
      onFailure(error.message);
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