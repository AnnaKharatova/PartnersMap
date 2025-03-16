import "./Header.css";
import React, { useState } from "react";
import Logo from "../../images/2.0/Group 2.svg";
import { email, phoneNumber, addPartner } from "../../constants/constants.js";

function Header({ maxWidth760, setBurgerMenuOpen, catalog }) {

  const [contactsOpen, setContactsOpen] = useState(false);

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

  return (
    <header className="header">
      <div className="header__main">
        <img src={Logo} alt="Логотип Строймаш" className="header__logo" />
      </div>
      {maxWidth760 ? (
        <button
          className="header__nav-burger"
          onClick={() => {
            setBurgerMenuOpen(true);
          }}
          id="header-nav-burger"
        ></button>
      ) : (
        <nav className="header__nav">
            <a
              className="header__item"
              href="#catalog"
              onClick={() => {
                localStorage.clear();
              }}
            >
              КАТАЛОГ
            </a>
            <a
              className="header__item"
              href="#map"
              onClick={() => {
                localStorage.clear();
              }}
            >
              КАРТА ПАРТНЕРОВ
            </a>
          
          <a className="header__item" target="_blank" href={addPartner}>
            СТАТЬ ПАРТНЕРОМ
          </a>
          <button
            className={!contactsOpen ? "header__item-contacts" : "header__item-contacts header__item-contacts_open"}
            onClick={()=>setContactsOpen(!contactsOpen)}
          >
            КОНТАКТЫ
          </button>
        </nav>
      )}
      {contactsOpen && (
        <div
          className="header__contacts"
        >
          <a className="header__contact" onClick={handleMailClick} href="#">
            {email}
          </a>
          <a className="header__contact" onClick={handlePhoneClick} href="#">
            {phoneNumber}
          </a>
        </div>
      )}
    </header>
  );
}

export default Header;