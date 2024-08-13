import React from 'react'
import './Footer.css'

function Footer() {

    return (
        <footer className="footer">
            <div className="footer__nav footer-760__nav">
                <a className="footer__item" href="#">КАТАЛОГ</a>
                <a className="footer__item" href="#">ДОБАВИТЬ ПАРТНЁРА</a>
            </div>
            <div className="footer__nav">
                <p className='footer__text'>Контакты:</p>
                <p className="footer__text">+7 (8352) 24-32-33</p>
                <p className="footer__text">stroymash@fsilicone.ru</p>
            </div>
            <div className="footer__nav">
                <a className="footer__item" href="#">Пользовательское соглашение</a>
                <p className="footer__copyright">© 2024 Название</p>
            </div>
        </footer>
    )
}

export default Footer