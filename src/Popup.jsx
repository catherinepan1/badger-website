import { Transition } from 'react-transition-group';
import { useState, useRef } from 'react';

export default function Popup({ messageHeading, message, isError, onRemove }){
  const [shown, setShown] = useState(true);
  const [elHeight, setHeight] = useState(0);
  const [timer, setTimer] = useState(null);
  const nodeRef = useRef(null);
  const transDuration = 500;
  const showDuration = 4000;
  const iconClass = "popup-icon " + (isError ? "error":"no-error");

  //used to get the scrollheight of the popup to properly animate
  //drawback is that maxHeight is always set and may cause overflow on resize
  function setScrollHeight(){
    setHeight(nodeRef.current.scrollHeight + "px");
  }

  //function to start the timer on how long to show the popup
  function startTimer(){
    setTimer(setTimeout(startClose, showDuration));
  }
  
  //functions involved with closing the element; startclose is what triggers
  //the exiting animation, and close should be called when the element has
  //exited and is going to be removed from the DOM
  function startClose(){
    setShown(false);
  }
  function close(){
    if(timer !== null){
      clearTimeout(timer);
    }
    onRemove();
  }

  //stylings for different states during the transition
  const defaultStyle = {
    maxHeight: elHeight,
    margin: 0,
    transform: "scale(0)",
    transition: transDuration + "ms ease"
  };
  const transitionStyles = {
    entering: {
      maxHeight: elHeight,
      margin: "0.5em 0",
      transform: "scale(1)",
      opacity: 1
    },
    entered: {
      maxHeight: elHeight,
      margin: "0.5em 0",
      transform: "scale(1)"
    },
    exiting: {
      maxHeight: 0,
      margin: 0,
      transform: "scale(0)"
    },
    exited: {
      maxHeight: 0,
      transform: "scale(0)"
    }
  };

  return (
    <Transition nodeRef = {nodeRef} in = {shown} timeout = {transDuration} appear = {true}
                onEnter = {setScrollHeight}
                onEntered = {startTimer}
                onExited = {close}>
      { (state) => (
        <div ref = {nodeRef} className = "popup-height-cont" style = {{...defaultStyle, ...transitionStyles[state]}}>
          <div className = "popup">
            <div className = {iconClass}>
              <span className = "icon"></span>
            </div>
            <div className = "popup-message">
              <p>{messageHeading}</p>
              <p>{message}</p>
            </div>
            <span className = "popup-close" aria-label="Close popup" title = "Close popup" onClick = {startClose}></span>
          </div>
        </div>
      )}
    </Transition>
  );
}