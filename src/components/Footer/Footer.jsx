import './Footer.css'
import { email, phoneNumber, addPartner } from '../../constants/constants.js'

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
        <footer className='footer'>
            <div className='footer__links'>
                <a className="footer__item" href="/">КАРТА ОФИЦИАЛЬНЫХ ПАРТНЁРОВ</a>
                <a className="footer__item" target="_blank" href={addPartner}>ДОБАВИТЬ ПАРТНЁРА</a>
            </div>
            <div className='footer__links'>
                <a className="footer__item" onClick={handlePhoneClick}>{phoneNumber}</a>
                <a className="footer__item" onClick={handleMailClick}>{email}</a>
            </div>
            <div className='footer__links'>
                <a className="footer__item">Пользовательское соглашение</a>
                <p className="footer__copyright">© 2024 Название</p>
            </div>
        </footer>
    )
}

export default Footer