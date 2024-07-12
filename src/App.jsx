/*import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'*/
import './App.css';
import { useState } from 'react';
import Button from './Button.jsx';
import Popup from './Popup.jsx';
import { addEmail } from './firebase-db.js';

function FooterForm({ addPopup }){
  const [inputVal, setInputVal] = useState("");
  const [error, setError] = useState("");

  //taken from https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email#validation
  const emailReg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  //functions relating to input change and validating email
  function handleInputChange(e){
    setInputVal(e.target.value);
  }
  function validateEmail(){
    if(inputVal === "" || !emailReg.test(inputVal)){
      setError("Please provide a valid email address");
    }
    else {
      setError("");
    }
  }

  //callback function for the button
  async function handleEmail(){
    //check for error first
    if(error !== ""){
      return Promise.reject(new Error(error));
    }
    //only without error will this be added to the database
    return addEmail(inputVal.toLowerCase());
  }

  //form element
  return (
    <form id = "footer-form">
      <div>
        <input type = "text" 
              className={ error === "" ? "":"error"} 
              onInput={handleInputChange} 
              onBlur={validateEmail} 
              placeholder = "Email">
        </input>
      </div>
      <Button message = "Subscribe" onButtonClick = {handleEmail} isAsync = {true}
              onSuccess = {(message) => addPopup("Thank you!", message)}
              onFailure = {(message) => addPopup("Error :(", message, true)}></Button>
    </form>
  );
}

function Footer({ addPopup }){
  return (
    <footer>
      <FooterForm addPopup = {addPopup}></FooterForm>
    </footer>
  );
}

function App() {
  //code dealing with adding and removing popups
  const [popups, setPopups] = useState([]);
  const popupList = popups.map((popup) => {
    return (
      <Popup  key={popup.id}
              messageHeading={popup.heading} 
              message={popup.message}
              isError={popup.isError}
              onRemove={() => removePopup(popup.id)}>
      </Popup>
    );
  });
  function addPopup(heading, message, error=false){
    setPopups([...popups, {
      id: Date.now() + "-" + message,
      heading: heading,
      message: message,
      isError: error
    }]);
  }
  function removePopup(id){
    setPopups(popups.filter((popup) => popup.id !== id ));
  }

  function testButtonClick(){
    addPopup("testPopup", "test message");
  }
  async function testEmail(){
    return addEmail("example@example.com");
  }

  /*
  const [count, setCount] = useState(0);
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )*/
 return (
  <>
    <h1>testing</h1>
    <Button message={"not async!"} onButtonClick={testButtonClick} isAsync={false}></Button>
    <Footer addPopup = {addPopup}></Footer>
    <div id = "popup-cont">
      {popupList}
    </div>
  </>
 )
}

export default App
