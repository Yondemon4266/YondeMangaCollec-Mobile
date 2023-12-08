import React from "react";
import Txt from "../components/Text/Txt";

const TextTruncate = (text, s) => {
  if (text.length > 21) {
    const truncatedText = text.substring(0, 21) + "...";
    return (
      <Txt
        styles={[{ textAlign: "center", fontFamily: "Literata-Regular" }, s]}
      >
        {truncatedText}
      </Txt>
    );
  } else {
    return (
      <Txt
        styles={[{ textAlign: "center", fontFamily: "Literata-Regular" }, s]}
      >
        {text}
      </Txt>
    );
  }
};

export default TextTruncate;
