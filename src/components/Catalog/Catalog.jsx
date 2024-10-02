import './Catalog.css'
import React, { useState } from 'react';
import Header from '../Header/Header.jsx'
import BurgerMenu from '../BurgerMenu/BurgerMenu.jsx'
import EngineFilters from './EngineFilters/EngineFilters.jsx';

function Catalog({ maxWidth760 }) {

    const [burgerMenuOpen, setBurgerMenuOpen] = useState(false)

    return (
        <>
            <Header maxWidth760={maxWidth760} setBurgerMenuOpen={setBurgerMenuOpen} showTitle={false} catalog={true} />
            <main className='catalog'>
                <div className='catalog__intro'>
                    <h1 className='catalog__title'>Каталог продукции АО Строймаш</h1>
                    <div className='catalog__input-group'>
                        <input className='catalog__input' placeholder='Поиск по названию или артикулу' />
                        <button className='catalog__input-button'>Найти</button>
                    </div>
                </div>
                <EngineFilters />
            </main>
            {burgerMenuOpen && <BurgerMenu setBurgerMenuOpen={setBurgerMenuOpen} />}
        </>
    )
}

export default Catalog