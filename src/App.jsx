/*import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'*/
import './App.css';
import { useState } from 'react';
import Button from './Button.jsx';
import Popup from './Popup.jsx';
import { addEmail } from './firebase-db.js';

//generic element to load a picture only on mobile or only on desktop
function ResponsivePicture({src, mobile=true, classes="", alt=""}){
  const pictureClass = (mobile ? "mobile ":"") + classes;
  const pictureSrc = "./media/" + src;
  const mediaQuery = "(" + (mobile ? "max":"min") + "-width: 40em)";
  //transparent pixel code taken from https://stackoverflow.com/questions/59089597/how-can-i-prevent-images-that-are-on-my-desktop-site-from-loading-on-mobile
  return (
    <picture className = {pictureClass}>
      <source media = {mediaQuery} srcSet = {pictureSrc}/>
      <img src = "data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'/%3E" alt={alt}/>
    </picture>
  );
}

//header element at the top of the page
function Header(){
  return (
    <header>
      <a href = "#" id = "header-logo">
        <img src = "./media/logo.png" alt = "Badger Logo"/>
        <span>Badger</span>
      </a>
    </header>
  );
}

//topmost page element
function Landing(){
  return (
    <section className = "content" id = "landing-section">
      <img src = "./media/homepage-side-graphic.svg" alt = "Background graphic" id = "landing-back-img"/>
      <div id = "landing-wrapper">
        <div id = "landing-text">
          <h1><span>Discover</span><span>Snap</span><span>Collect</span></h1>
          <a href = "#" className = "styled-button download-button mobile"><span className = "button-message">Download</span></a>
          <p>Designed with the modern adventurer in mind, Badger bridges the gap between digital socializing and real-world experiences, offering a novel way to document, share, and celebrate the places you've been and the events you've attended</p>
          <a href = "#" className = "styled-button download-button desktop"><span className = "button-message">Download</span></a>
        </div>
        <div className = "img-wrapper">
          <ResponsivePicture src = "landing-graphic.jpg" alt = "Image of someone taking a photo of fireworks" mobile={false}></ResponsivePicture>
        </div>
      </div>
    </section>
  );
}

//call to action component
function CTASection(){
  return (
    <section id = "cta">
      <ResponsivePicture src = "cta-background-large-left.svg" classes = "cta-back-image cta-left" mobile={false}></ResponsivePicture>
      <ResponsivePicture src = "cta-background-large-right.svg" classes = "cta-back-image cta-right" mobile={false}></ResponsivePicture>
      <ResponsivePicture src = "small-divider.svg" classes = "divider-img"></ResponsivePicture>
      <div className = "content-side">
        <p>Start turning your explorations into stories worth sharing</p>
      </div>
      <div id = "download-area">
        <ResponsivePicture src = "cta-background-small-left.svg" classes = "cta-back-image cta-left"></ResponsivePicture>
        <ResponsivePicture src = "cta-background-small-right.svg" classes = "cta-back-image cta-right"></ResponsivePicture>
        <a href = "#" className = "styled-button download-button"><span className = "button-message">Download</span></a>
      </div>
    </section>
  );
}

//subscribe form in the footer
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
      <input type = "text" 
            className={ error === "" ? "":"error"} 
            onInput={handleInputChange} 
            onBlur={validateEmail} 
            placeholder = "Email">
      </input>
      <Button message = "Subscribe" 
              type = "light"
              onButtonClick = {handleEmail} isAsync = {true}
              onSuccess = {(message) => addPopup("Thank you!", message)}
              onFailure = {(message) => addPopup("Error :(", message, true)}></Button>
    </form>
  );
}

//entire footer element, including links, etc.
function Footer({ addPopup }){
  return (
    <footer>
      <div id = "footer-text">
        <div>
          <p className = "footer-heading">Stay up to date with us!</p>
          <FooterForm addPopup = {addPopup}></FooterForm>
        </div>
        <div>
          <p className = "footer-heading">Have a question or a story to share?</p>
          <p>We'd love to hear from you! Send us an email at <a href = "mailto:phil@badger-app.com" className = "text-link">phil@badger-app.com</a> and we'll get back to you soon.</p>
        </div>
      </div>
      <div id = "footer-links">
        <span><a href = "#" className = "text-link">Privacy Policy</a></span>
        <span><a href = "#" className = "text-link">Terms and Conditions</a></span>
        <div id = "footer-icon-links">
          <a href = "#" className = "img-link"><img src = "./media/instagram-icon.png" alt = "Instagram logo"/></a>
          <a href = "#" className = "img-link"><img src = "./media/linkedin-icon.png" alt = "Linkedin logo"/></a>
        </div>
      </div>
    </footer>
  );
}

//full app
function App() {
  //code dealing with adding and removing popups
  const [popups, setPopups] = useState([{ id: "xxxx", heading: "testHeading", message: "Hi there! Successfully subscribed!", isError: false }]);
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
    <Header></Header>
    <Landing></Landing>
    <CTASection></CTASection>
    <Footer addPopup = {addPopup}></Footer>
    <div id = "popup-cont">
      {popupList}
    </div>
  </>
 )
}

export default App
