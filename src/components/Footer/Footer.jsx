import React from 'react'
import './Footer.css'

function Footer() {

    const email = `stroymash@fsilicone.ru`
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
        <footer className="footer">
            <div className="footer__nav footer-760__nav">
                <a className="footer__item" href="#">КАТАЛОГ</a>
                <a className="footer__item" href="#">ДОБАВИТЬ ПАРТНЁРА</a>
            </div>
            <div className="footer__nav">
                <p className='footer__text'>Контакты:</p>
                <a className="popup-menu__contacts" onClick={handlePhoneClick} href="#">{phoneNumber}</a>
                <a className="popup-menu__contacts" onClick={handleMailClick} href="#">{email}</a>
            </div>
            <div className="footer__nav">
                <a className="footer__item" href="#">Пользовательское соглашение</a>
                <p className="footer__copyright">© 2024 Название</p>
            </div>
        </footer>
    )
}

export default Footer