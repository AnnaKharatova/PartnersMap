import './Footer.css'

function Footer() {
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

    return (
        <footer className='footer'>
            <div className='footer__links'>
                <a className="footer__item" href="/">КАРТА ОФИЦИАЛЬНЫХ ПАРТНЁРОВ</a>
                <a className="footer__item" href="#">ДОБАВИТЬ ПАРТНЁРА</a>
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