import './BurgerMenu.css'
import React from 'react'

function BurgerMenu({ setBurgerMenuOpen }) {

    const email =   `stroymash@fsilicone.ru`
    const phoneNumber = `+7(8352)24-32-33`

    const handleMailClick = () => {
        window.location.href = `mailto:${encodeURIComponent(email)}`;
    };

    const handlePhoneClick = () => {
        // Проверка на наличие приложения по умолчанию для телефонных номеров
        if (navigator.userAgent.match(/Android|iPhone|iPad|iPod/i)) { 
          // На мобильном устройстве:
          window.location.href = `tel:${phoneNumber}`; 
        } else {
          // На настольном компьютере:
          window.location.href = `https://wa.me/${phoneNumber}`; // Переход на WhatsApp
          // Либо, если нужно просто открыть приложение:
          // alert('Для вызова номера телефона, пожалуйста, используйте приложение для звонков.');
        }
      };

    return (
        <div className="popup-menu">
            <div className="popup-menu__content">
                <div className='popup-menu__header'>
                    <div className="header__main">
                        <div className="header__logo"></div>
                        <p className="header__title">Имя сайта</p>
                    </div>
                    <button className="popup-menu__close-button" onClick={() => { setBurgerMenuOpen(false) }}>&times;</button>
                </div>
                <nav className="popup-menu__main">
                    <p className="popup-menu__item" href="#">КАТАЛОГ</p>
                    <p className="popup-menu__item" href="#">ДОБАВИТЬ ПАРТНЕРА</p>
                    <p className="popup-menu__item" href="#">КОНТАКТЫ</p>
                    <a className="popup-menu__contacts" onClick={handlePhoneClick} href="#">{phoneNumber}</a>
                    <a className="popup-menu__contacts" onClick={handleMailClick} href="#">{email}</a>
                    <p className="popup-menu__item" href="#">Пользовательское соглашение</p>
                </nav>
            </div>
        </div>

    )
}

export default BurgerMenu