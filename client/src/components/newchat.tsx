import React from "react";
import Logo from "../images/logo1.png";
import Card from "./card";
import { samplechat } from "../interface/interface";
const Newchat: React.FC<samplechat> = (props) => {
  const { sampletext, changenewchat } = props;
  return (
    <div className="newchatdesign">
      <div className="welcome">
        <img src={Logo} alt="" />
        <h1>How can I help you today?</h1>
      </div>
      <div className="sample">
        {Card.map((item, key) => (
          <div
            key={key}
            className="item"
            onClick={(e) => {
              e.preventDefault();
              sampletext(item.query);
              changenewchat(false);
            }}
          >
            <h2>{item.heading}</h2>
            <p>{item.subhead}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Newchat;
