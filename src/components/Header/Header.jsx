import './Header.css'
import React, { useState, useEffect, useRef } from 'react'
import Logo from '../../images/Logo.svg'

function Header({ maxWidth760, setBurgerMenuOpen, showTitle, catalog }) {

  const [contactsOpen, setContactsOpen] = useState(false)

  const email = `stroymash@fsilicone.ru`
  const phoneNumber = `+7(8352)24-32-33`

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

  const menuRef = useRef(null); // Ссылка на меню
  const buttonRef = useRef(null); // Ссылка на кнопку

  const handleMouseOver = () => {
    setContactsOpen(true);
  };

  const handleMouseOut = () => {
    setContactsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && !buttonRef.current.contains(event.target)) {
        setContactsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="header">
      <div className="header__main">
        <img src={Logo} alt="Логотип Строймаш" className="header__logo" />

        {!maxWidth760 ? <p className="header__title">Строймаш</p> : <p style={{ display: 'none' }}></p>}
        {!maxWidth760 & showTitle ? <p className="header__title">ОФИЦИАЛЬНЫЕ ПАРТНЕРЫ</p > : <p style={{ display: 'none' }}></p>}

        {maxWidth760 & !showTitle ? <p className="header__title">Строймаш</p> : <p style={{ display: 'none' }}></p>}
        {maxWidth760 & showTitle ? <p className="header__title" style={{ paddingRight: '0' }}>Официальные партнеры АО Строймаш</p> : <p></p>}

      </div>
      {maxWidth760 ? <button className="header__nav-burger" onClick={() => { setBurgerMenuOpen(true) }} id="header-nav-burger"></button> :
        <nav className="header__nav">
          {!catalog ?
            <a className="header__item" href="/catalog">КАТАЛОГ</a> :
            <a className="header__item" href="/">КАРТА ОФИЦИАЛЬНЫХ ПАРТНЁРОВ</a>
          }
          <a className="header__item" href="#">ДОБАВИТЬ ПАРТНЁРА</a>
          <button className="header__item-contacts" ref={buttonRef} onMouseOver={handleMouseOver}>КОНТАКТЫ</button>
        </nav>}
      {contactsOpen &&
        <div className='header__contacts' ref={menuRef} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
          <a className="header__contact" onClick={handleMailClick} href="#">{email}</a>
          <a className="header__contact" onClick={handlePhoneClick} href="#">{phoneNumber}</a>
        </div>}
    </header>
  )
}

export default Header