import './Catalog.css'
import React, { useState, useEffect } from 'react';
import Header from '../Header/Header.jsx'
import BurgerMenu from '../BurgerMenu/BurgerMenu.jsx'
import EngineFilters from './CatalogFilters/CatalogFilters.jsx';
import CatalogItem from './CatalogItem/CatalogItem';
import Footer from './Footer/Footer.jsx'

function Catalog({ maxWidth760 }) {

    const [burgerMenuOpen, setBurgerMenuOpen] = useState(false)
    const [allCatalog, setAllCatalog] = useState([])
    const [fiteredData, setFilteredData] = useState([])

    const BASE_URL = ` http://stroymashdevelop.ddns.net/api`

    console.log(allCatalog)

    function getAllCatalog() {
        fetch(`${BASE_URL}/catalog/catalog`)
            .then(res => res.json())
            .then(resData => {
                const fetchedData = JSON.parse(JSON.stringify(resData))
                setAllCatalog(fetchedData)
                setFilteredData(fetchedData)
            }).catch(error => {
                console.error("Ошибка при получении данных:", error);
            });
    }

    useEffect(() => {
        getAllCatalog()
    }, [])

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
                <div className='catalog__span-group'>
                    <span className='catalog__span'>Показано {fiteredData.length} из {allCatalog.length}</span>
                    <button className='catalog__clear-button'>Сбросить фильтры</button>
                </div>
                <div className='catalog__list'>
                {allCatalog.map(item => (
                    <CatalogItem item={item} key={item.name+item.id}/>
                ))}
                </div>
            </main>
            <Footer />
            {burgerMenuOpen && <BurgerMenu setBurgerMenuOpen={setBurgerMenuOpen} />}
        </>
    )
}

export default Catalog