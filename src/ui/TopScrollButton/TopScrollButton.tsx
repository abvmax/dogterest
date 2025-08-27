import "./TopScrollButton.scss";
import { useState } from "react";
import svg from "../../assets/img/sprite.svg";
import { handlerTop } from "../../utils/utils";

export const TopScrollButton = () => {
  const [visible, setVisible] = useState(false);

  window.addEventListener(
    "scroll",
    function () {
      if (this.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    },
    { passive: true }
  );

  return (
    <button
      onClick={handlerTop}
      className={visible ? "scroll-top show" : "scroll-top"}
    >
      <svg className="scroll-top__icon" width="100%" height="100%" viewBox="0 0 50 50">
        <use xlinkHref={`${svg}#top-scroll`}></use>
      </svg>
    </button>
  );
};
