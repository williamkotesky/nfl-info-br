import { useState, useEffect } from "react";
import styles from "./Popup.module.css";

function Popup() {
  const [showPopup, setShowPopup] = useState(false);
  const [showPopDown, setShowPopDown] = useState(false);

  useEffect(() => {
    const cookieConsent = localStorage.getItem("cookieConsent");
    if (!cookieConsent) {
      setShowPopup(true);
    }
  }, []);

  function handleAcceptCookie() {
    localStorage.setItem("cookieConsent", "accepted");
    setShowPopDown(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 500);
  }

  return (
    <>
      {showPopup && (
        <div className={`${styles.popup} ${showPopDown ? styles.popdown : ""}`}>
          <p>
            O site usa o localStorage para armazenar os times e notícias
            adicionados. Eles podem ser editados e apagados a vontade do
            usuário.
          </p>
          <button onClick={handleAcceptCookie}>OK</button>
        </div>
      )}
    </>
  );
}

export default Popup;
