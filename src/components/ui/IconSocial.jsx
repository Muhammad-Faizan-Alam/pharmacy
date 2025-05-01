import React from "react";
import { FaGithub, FaLinkedin,FaWhatsapp , FaYoutube, FaTwitch } from "react-icons/fa";

const icons = [
  { icon: <FaGithub />, path: "https://github.com/AliUsman143" },
  { icon: <FaLinkedin />, path: "https://www.linkedin.com/in/muhammad-ali-usman-652061317/" },
  { icon: <FaWhatsapp  />, path: "https://wa.me/9203051023906" },
];

const IconSocial = ({ containerstyle, iconstyle }) => {
  return (
    <div className={containerstyle}>
      {icons.map((item, index) => (
        <a
          key={index}
          href={item.path}
          target="_blank"
          rel="noopener noreferrer"
          className={iconstyle}
        >
          {item.icon}
        </a>
      ))}
    </div>
  );
};

export default IconSocial;
