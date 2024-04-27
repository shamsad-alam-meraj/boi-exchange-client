import React from "react";
import AnimatedText from "react-animated-text-content";

const AnimatedText1 = ({ text, animationStyle, type }) => {
  return (
    <>
      <AnimatedText
        type={type} // animate words or chars
        animation={{
          x: "200px",
          y: "-20px",
          scale: 1.1,
          ease: "ease-in-out",
        }}
        animationType={animationStyle}
        interval={0.04}
        duration={0.6}
        tag="p"
        className="animated-paragraph"
        includeWhiteSpaces
        threshold={0.1}
        rootMargin="20%"
      >
        {text}
      </AnimatedText>
    </>
  );
};

export default AnimatedText1;
