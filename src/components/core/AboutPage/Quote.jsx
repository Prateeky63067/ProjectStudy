import React from "react";
import HighlightText from "../HomePage/HighlightText";

const Quote = () => {
  return (
    <div>
      We are passionate about revolutionizing the way we learn. Our innovation
      platform <HighlightText text={"combine technology"} />
      <span className="text-brown-500"> expertise</span>
      , and community to create an
      <span className="text-brown-500">
        {" "}
        unparalled educational experience
      </span>
    </div>
  );
};

export default Quote;
