import './styling/App.css';
import { useState } from 'react';
import Button from './components/Button.jsx';
import Popup from './components/Popup.jsx';
import { addEmail } from './firebase-db.js';

//generic picture element used load a picture only on mobile or only on desktop (loads a transparent image otherwise)
function ResponsivePicture({src, mobile=true, classes="", alt=""}){
  const pictureClass = (mobile ? "mobile ":"desktop ") + classes;
  const mediaQuery = "(" + (mobile ? "max":"min") + "-width: 40rem)";
  //transparent pixel code taken from https://stackoverflow.com/questions/59089597/how-can-i-prevent-images-that-are-on-my-desktop-site-from-loading-on-mobile
  return (
    <picture className = {pictureClass}>
      <source media = {mediaQuery} srcSet = {src}/>
      <img src = "data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'/%3E" alt={alt}/>
    </picture>
  );
}

//header element at the top of the page
function Header(){
  return (
    <header>
      <a href = "https://apps.apple.com/us/app/badgrr/id6468092511" id = "header-logo" target="_blank">
        <img src = "./media/logo.png" alt = "Badger Logo"/>
        <span>Badger</span>
      </a>
    </header>
  );
}

//topmost page element
function Landing(){
  return (
    <section id = "landing-section">
      <img src = "./media/homepage-side-graphic.svg" alt = "Background graphic" id = "landing-back-img"/>
      <div id = "landing-wrapper" className = "content">
        <div id = "landing-text">
          <h1><span>Discover</span><span>Snap</span><span>Collect</span></h1>
          <a href = "https://apps.apple.com/us/app/badgrr/id6468092511" className = "styled-button download-button mobile" target = "_blank"><span className = "button-message">Download</span></a>
          <p>Designed with the modern adventurer in mind, Badger bridges the gap between digital socializing and real-world experiences, offering a novel way to document, share, and celebrate the places you've been and the events you've attended</p>
          <a href = "https://apps.apple.com/us/app/badgrr/id6468092511" className = "styled-button download-button desktop" target = "_blank"><span className = "button-message">Download</span></a>
        </div>
        <div className = "img-wrapper">
          <img srcSet = "data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'/%3E 1w, ./media/landing-graphic-400x600.jpg 400w, ./media/landing-graphic-700x1050.jpg 700w, ./media/landing-graphic-1000x1500.jpg 1000w, ./media/landing-graphic.jpg 3648w" 
          sizes = "(min-width: 93.75rem) 30rem, (min-width: 60rem) 24vw, (min-width: 40rem) 28vw, 1px" 
          alt = "Image of someone taking a photo of fireworks" 
          className = "desktop"/>
        </div>
      </div>
    </section>
  );
}

//features section
function Feature({heading, description, graphicSrc, alt=""}){
  return (
    <section className = "content feature">
      <div className = "feature-text">
        <img src = "./media/small-divider.svg" alt = "Divider"/>
        <p className = "feature-heading">{heading}</p>
        <p>{description}</p>
      </div>
      <img className = "feature-img" src = { "./media/" + graphicSrc } alt = {alt}/>
    </section>
  );
}

//call to action component
function CTASection(){
  return (
    <section id = "cta">
      <ResponsivePicture src = "./media/cta-background-large-left.svg" classes = "cta-back-image cta-left" mobile={false}></ResponsivePicture>
      <ResponsivePicture src = "./media/cta-background-large-right.svg" classes = "cta-back-image cta-right" mobile={false}></ResponsivePicture>
      <ResponsivePicture src = "./media/small-divider.svg" classes = "divider-img"></ResponsivePicture>
      <div className = "content-side">
        <p>Start turning your explorations into stories worth sharing</p>
      </div>
      <div id = "download-area">
        <ResponsivePicture src = "./media/cta-background-small-left.svg" classes = "cta-back-image cta-left"></ResponsivePicture>
        <ResponsivePicture src = "./media/cta-background-small-right.svg" classes = "cta-back-image cta-right"></ResponsivePicture>
        <a href = "https://apps.apple.com/us/app/badgrr/id6468092511" className = "styled-button download-button" target = "_blank"><span className = "button-message">Download</span></a>
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
        <span><a href = "./documents/privacy-policy.pdf" className = "text-link" target = "_blank">Privacy Policy</a></span>
        <span><a href = "./documents/terms-of-service.pdf" className = "text-link" target = "_blank">Terms and Conditions</a></span>
        <div id = "footer-icon-links">
          <a href = "https://www.instagram.com/badger.social/" className = "img-link" target = "_blank"><img src = "./media/instagram-icon.png" alt = "Instagram logo"/></a>
          <a href = "https://www.linkedin.com/company/badgersocial/" className = "img-link" target = "_blank"><img src = "./media/linkedin-icon.png" alt = "Linkedin logo"/></a>
        </div>
      </div>
    </footer>
  );
}

//full app
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
  
 return (
  <>
    <Header></Header>
    <Landing></Landing>
    <Feature heading = "Discover Your Next Adventure"
             description = "Badger presents a curated showcase of events and destinations ranging from vibrant local festivals to internationally renowned landmarks, all prioritized by your location."
             graphicSrc = "discover-graphic.svg"
             alt = "Graphic of a map with several pins and places labeled"></Feature>
    <Feature heading = "Snap Photos and Make Memories"
             description = "Every check-in builds up a personalized profile of your adventures you can choose to share with friends, creating both connection and community."
             graphicSrc = "snap-graphic.svg"
             alt = "Graphic of a camera with photos of scenery on top"></Feature>
    <Feature heading = "Collect Badges and Complete Challenges"
             description = "With Badgepoints and fun challenges, Badger fosters a friendly and competitive environment that propels you to your next unforgettable experience."
             graphicSrc = "badges-graphic.svg"
             alt = "Graphic of a mountain and a flag on top surrounded by three badges"></Feature>
    <Feature heading = "Redeem Rewards"
             description = "Our reward system allows for easy redemption of offers and discounts, making every exploration not just memorable but also rewarding."
             graphicSrc = "rewards-graphic.svg"
             alt = "Graphic of a hand holding an open present box"></Feature>
    <CTASection></CTASection>
    <Footer addPopup = {addPopup}></Footer>
    <div id = "popup-cont">
      {popupList}
    </div>
  </>
 )
}

export default App
