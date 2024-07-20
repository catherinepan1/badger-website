import { useInView } from "react-intersection-observer";
import { Transition } from 'react-transition-group';

export default function ScrollElement({children, type="fade", transitionDuration=500, transitionDelay=0, transitionMode="ease"}){
  const [ ref, inView, entry ] = useInView({ 
    threshold: 0.10,
  });
  let styles = {
    "default": {
      transition: transitionDuration + "ms " + transitionMode
    }, 
    "entering": {
      transition: transitionDuration + "ms " + transitionDelay + "ms " + transitionMode
    },
    "exiting": {}
  };
  if(type.includes("slide")){
    let offsetX = 0, offsetY = 0;
    if(type.includes("left")){
      offsetX = "50%";
    }
    else if(type.includes("right")){
      offsetX = "-50%";
    }
    if(type.includes("up")){
      offsetY = "50%";
    }
    else if(type.includes("down")){
      offsetY = "-50%";
    }
    styles.default.transform = "translate(" + offsetX + "," + offsetY + ")";
    styles.entering.transform = "translate(0, 0)";
    styles.exiting.transform = styles.default.transform;
  }
  if(type.includes("fade")){
    styles.default.opacity = 0;
    styles.entering.opacity = 1;
    styles.exiting.opacity = 0;
  }
  styles["entered"] = styles["entering"];
  styles["exited"] = styles["exiting"];
  return (
    <Transition nodeRef = {ref} in = {inView} timeout = {transitionDuration} appear = {true}>
      { (state) => (
        <div ref = {ref} style = {{...styles["default"], ...styles[state]}} className = "scroll-container">
          {children}
        </div>
      )}
    </Transition>
  );
}