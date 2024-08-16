import './Header.css'
import React from 'react'

function Header({ maxWidth760, setBurgerMenuOpen, showTitle }) {

  return (
    <header className="header">
      <div className="header__main">
        <div className="header__logo"></div>

        {!maxWidth760 ? <p className="header__title">Имя сайта</p> : <p style={{display:'none'}}></p>}
        {!maxWidth760 & showTitle ? <p className="header__title">ОФИЦИАЛЬНЫЕ ПАРТНЕРЫ ЗАВОДА</p >:<p style={{display:'none'}}></p>}


        {maxWidth760 & !showTitle ? <p className="header__title">Имя сайта</p> : <p style={{display:'none'}}></p>}
        {maxWidth760 & showTitle ? <p className="header__title">Официальные партнеры завода</p> : <p></p>}

      </div>
      {maxWidth760 ? <button className="header__nav-burger" onClick={() => { setBurgerMenuOpen(true) }} id="header-nav-burger"></button> :
        <nav className="header__nav">
          <a className="header__item-catalog" href="#">КАТАЛОГ</a>
          <a className="header__item" href="#">ДОБАВИТЬ ПАРТНЁРА</a>
        </nav>}
    </header>
  )
}

export default Header