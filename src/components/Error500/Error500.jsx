import "./Error500.css";
import React from "react";
import Footer from "../Footer/Footer";
import Logo from "../../images/Logo.svg";

function Error500() {
  return (
    <>
      <header className="header">
        <div className="header__main">
          <img src={Logo} alt="Логотип Строймаш" className="header__logo" />
          <p className="header__title">Строймаш</p>
        </div>
      </header>
      <main className="error">
        <h4 className="error__code">500</h4>
        <p className="error__subtitle">На сервере возникла ошибка.</p>
        <p className="error__subtitle">Подождите, пока мы её исправим</p>
      </main>
      <Footer />
    </>
  );
}

export default Error500;
