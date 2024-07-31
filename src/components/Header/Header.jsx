import './Header.css'

function Header() {

  return (
    <header className="header">
      <div className="header__main">
        <div className="header__logo"></div>
        <p className="header__title">Имя сайта</p>
      </div>
      <button className="header__nav-burger" id="header-nav-burger"></button>
      <nav className="header__nav">
        <a className="header__item-catalog" href="#">КАТАЛОГ</a>
        <a className="header__item" href="#">ДОБАВИТЬ ПАРТНЁРА</a>
      </nav>
    </header>
  )
}

export default Header