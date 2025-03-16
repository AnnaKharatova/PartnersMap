import "./Footer.css";
import React from "react";
import { email, phoneNumber, addPartner } from "../../constants/constants.js";
import Logo from "../../images/2.0/Group 2.svg";
import LogoConnect from '../../images/2.0/main_logo.svg';


function Footer() {
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
    <footer className="footer">
      <div className="footer__logo">
        <img src={Logo} className="footer__logo-img" alt="Логотип Строймаш" />
        <p className="footer__logo-txt">Знаем цену надежности.</p>
      </div>
      <div className="footer__logo" style={{paddingRight: '5.7%'}}>
        <a target="_blank" href="https://play.google.com/store/apps/details?id=ru.retailsuite.scandr_tablet&pcampaignid=web_share"><img src={LogoConnect} className="footer__logo-connect" alt="Логотип Строймаш Коннект" /></a>
        <a className="footer__logo-tg" target="_blank" href="http://t.me/stroymashcheb">Наш Telegram-канал</a>
      </div>
      <a className="footer__connect" href="https://play.google.com/store/apps/details?id=ru.retailsuite.scandr_tablet&pcampaignid=web_share" target="_blank">Скачивайте приложение <span className="footer__connect-span">Строймаш Коннект</span></a>
      <div className="footer__links">
        <a className="footer__item" onClick={handlePhoneClick}>{phoneNumber}</a>
        <a className="footer__item" onClick={handleMailClick}>{email}</a>
        <p className="footer__item" style={{cursor: 'auto'}}>Пользовательское соглашение</p>
        <p className="footer__item" style={{cursor: 'auto'}}>© 2025 "Строймаш"</p>
      </div>
    </footer>
  );
}

export default Footer;
