import './Header.css'
import React from 'react'

function Header({ maxWidth760, setBurgerMenuOpen }) {

  return (
    <header className="header">
      <div className="header__main">
        <div className="header__logo"></div>
        <p className="header__title">Имя сайта</p>
      </div>
      {maxWidth760 ? <button className="header__nav-burger" onClick={()=>{setBurgerMenuOpen(true)}} id="header-nav-burger"></button> :
        <nav className="header__nav">
          <a className="header__item-catalog" href="#">КАТАЛОГ</a>
          <a className="header__item" href="#">ДОБАВИТЬ ПАРТНЁРА</a>
        </nav>}
    </header>
  )
}

export default Header