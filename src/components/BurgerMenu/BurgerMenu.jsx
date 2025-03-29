import "./BurgerMenu.css";
import React from "react";
import { email, phoneNumber, addPartner } from "../../constants/constants.js";
import Logo from "../../images/2.0/Group 2.svg";


function BurgerMenu({ setBurgerMenuOpen, catalog, setAgreementPopupOpen }) {

  const currentYear = new Date().getFullYear();

  const handleMailClick = () => {
    window.location.href = `mailto:${encodeURIComponent(email)}`;
  };

  const handlePhoneClick = () => {
    if (navigator.userAgent.match(/Android|iPhone|iPad|iPod/i)) {
      window.location.href = `tel:${phoneNumber}`;
    } else {
      window.location.href = `https://wa.me/${phoneNumber}`;
    }
  };


  const handleAgreementClick = () => {
    setAgreementPopupOpen(true)
  }

  return (
    <div className="popup-menu">
      <div className="popup-menu__content">
        <div className="popup-menu__header">
          <div className="header__main">
            <img src={Logo} alt="Логотип Строймаш" className="header__logo" />
          </div>
          <button
            className="popup-menu__close-button"
            onClick={() => {
              setBurgerMenuOpen(false);
            }}
          ></button>
        </div>
        <nav className="popup-menu__main">
          <a
            className="popup-menu__item"
            target="_blank"
            rel="noreferrer"
            href={addPartner}
          >
            ДОБАВИТЬ ПАРТНЕРА
          </a>
          <p className="popup-menu__item-contacts" href="#">
            КОНТАКТЫ
          </p>
          <a
            className="popup-menu__contacts"
            onClick={handlePhoneClick}
            href="#"
          >
            {phoneNumber}
          </a>
          <a
            className="popup-menu__contacts"
            onClick={handleMailClick}
            href="#"
          >
            {email}
          </a>
          <a className="footer__item" onClick={handleAgreementClick}>Пользовательское соглашение</a>
          <p className="footer__item" style={{ cursor: 'auto' }}>© {currentYear} "Строймаш"</p>
        </nav>
      </div>
    </div>
  );
}

export default BurgerMenu;
