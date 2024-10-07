import './BurgerMenu.css'
import React from 'react'
import Logo from '../../images/Logo.svg'
import { email, phoneNumber } from '../../constants/constants.js'

function BurgerMenu({ setBurgerMenuOpen }) {

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
        <div className="popup-menu">
            <div className="popup-menu__content">
                <div className='popup-menu__header'>
                    <div className="header__main">
                        <img src={Logo} alt="Логотип Строймаш" className="header__logo" />
                        <p className="header__title">Строймаш</p>
                    </div>
                    <button className="popup-menu__close-button" onClick={() => { setBurgerMenuOpen(false) }}></button>
                </div>
                <nav className="popup-menu__main">
                    <a className="popup-menu__item" href="/catalog">КАТАЛОГ</a>
                    <a className="popup-menu__item" href="#">ДОБАВИТЬ ПАРТНЕРА</a>
                    <p className="popup-menu__item-contacts" href="#">КОНТАКТЫ</p>
                    <a className="popup-menu__contacts" onClick={handlePhoneClick} href="#">{phoneNumber}</a>
                    <a className="popup-menu__contacts" onClick={handleMailClick} href="#">{email}</a>
                    <a className="popup-menu__item-copyright" href="#">Пользовательское соглашение</a>
                    <p className="popup-menu__copyright">© 2024 Название</p>
                </nav>
            </div>
        </div>
    )
}

export default BurgerMenu