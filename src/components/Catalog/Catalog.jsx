import './Catalog.css'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header.jsx'
import BurgerMenu from '../BurgerMenu/BurgerMenu.jsx'
import CatalogFilters from './CatalogFilters/CatalogFilters.jsx';
import CatalogItem from './CatalogItem/CatalogItem';
import Footer from '../Footer/Footer.jsx'
import NothingFound from './NothingFound/NothingFound.jsx';
import { BASE_URL } from '../../constants/constants.js';
import CloseCross from '../../images/Icon-close-cross.svg'

function Catalog({ maxWidth760 }) {
    const navigate = useNavigate()
    const [burgerMenuOpen, setBurgerMenuOpen] = useState(false)
    const [allCatalog, setAllCatalog] = useState([])
    const [fiteredData, setFilteredData] = useState([])
    const [inputValue, setInputValue] = useState('');
    const storedValue = sessionStorage.getItem('inputValue');
    const [selectedEngine, setSelectedEngine] = useState('');
    const [selectedGroup, setSelectedGroup] = useState('');
    const [filtersPopupOpen, setFiltersPopupOpen] = useState(false)

    const SEARCH_URL = `${BASE_URL}/catalog/catalog/?search=${inputValue}`

    useEffect(() => {
        getAllCatalog()
    }, [])

    function clearFilters() {
        const radios = document.querySelectorAll('input[type="radio"]');
        radios.forEach(radio => {
            if (radio.value == '') {
                radio.checked = true;
            } else {
                radio.checked = false;
            }
        });
        setInputValue('')
        sessionStorage.clear()
        setFilteredData(allCatalog)
        setSelectedEngine('')
        setSelectedGroup('')
    }

    function handleSubmit() {
        fetch(SEARCH_URL)
            .then(res => res.json())
            .then(resData => {
                const fetchedData = JSON.parse(JSON.stringify(resData))
                setFilteredData(fetchedData)
            }).catch(res => {
                if (res.status == 500) {
                    navigate('./error')
                } else {
                    console.log("Ошибка при получении данных:", res.message);
                }
            });
        sessionStorage.clear()
    };

    useEffect(() => {
        if (storedValue && allCatalog) {
            setInputValue(storedValue)
        }
        handleSubmit()
    }, [storedValue, allCatalog])

    function getAllCatalog() {
        fetch(`${BASE_URL}/catalog/catalog`)
            .then(res => res.json())
            .then(resData => {
                const fetchedData = JSON.parse(JSON.stringify(resData))
                setAllCatalog(fetchedData.results)
                setFilteredData(fetchedData.results)
            }).catch(error => {
                console.error("Ошибка при получении данных:", error);
            });
    }

    console.log(fiteredData)

    return (
        <>
            <Header maxWidth760={maxWidth760} setBurgerMenuOpen={setBurgerMenuOpen} showTitle={false} catalog={true} />
            <main className='catalog'>
                <div className='catalog__intro'>
                    <h1 className='catalog__title'>Каталог продукции АО&nbsp;Строймаш</h1>
                    <div className='catalog__input-group'>
                        <input className='catalog__input'
                            type='text'
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder='Поиск по названию или артикулу' />
                        <button className='catalog__input-button' onClick={handleSubmit}>{!maxWidth760? 'Найти' : ''}</button>
                    </div>
                </div>
                {!maxWidth760 && <CatalogFilters maxWidth760={maxWidth760} setFilteredData={setFilteredData} clearFilters={clearFilters} selectedEngine={selectedEngine} setSelectedEngine={setSelectedEngine} selectedGroup={selectedGroup} setSelectedGroup={setSelectedGroup} />}
                {(fiteredData && fiteredData.length > 0) ?
                    <>
                        <div className='catalog__span-group'>
                            <span className='catalog__span'>Показано {fiteredData.length} из {allCatalog.length}</span>

                            {(!maxWidth760 && fiteredData && fiteredData.length < allCatalog.length) &&
                                <button className='catalog__clear-button' onClick={clearFilters}>Сбросить фильтры</button>}
                            {maxWidth760 && <button className="catalog__popup-button" id="partner-filter-big" onClick={() => setFiltersPopupOpen(true)}>
                                Фильтры
                                <span className='catalog__button-item'>0</span>
                            </button>}
                        </div>
                        <div className='catalog__list'>
                            {fiteredData && fiteredData.map(item => (
                                <CatalogItem item={item} key={`${item.id}`} />
                            ))}
                        </div>
                    </> :
                    <>
                        {maxWidth760 && 
                        <button className="catalog__popup-button" id="partner-filter-big" onClick={() => setFiltersPopupOpen(true)}>
                            Фильтры
                            <span className='catalog__button-item'>0</span>
                        </button>
                        }
                        <NothingFound handleDisableRadios={clearFilters} />
                    </>
                }

            </main>
            <Footer />
            {burgerMenuOpen && <BurgerMenu catalog={true} setBurgerMenuOpen={setBurgerMenuOpen} />}
            {filtersPopupOpen &&
                <div className='catalog-popup'>
                    <div className="popup-city__content">
                        <div className='catalog-popup__header'>
                            <h2 className="catalog-popup__title">Фильтры</h2>
                            <button className="catalog-popup__close-button" onClick={() => { setFiltersPopupOpen(false) }}><img src={CloseCross} /></button>
                        </div>
                        <CatalogFilters maxWidth760={maxWidth760} setFilteredData={setFilteredData} clearFilters={clearFilters} selectedEngine={selectedEngine} setSelectedEngine={setSelectedEngine} selectedGroup={selectedGroup} setSelectedGroup={setSelectedGroup} />
                        <button className="popup-filter__submit-button" id="filter-submit-button" type="submit">Готово</button>
                    </div>
                </div>
            }
        </>
    )
}

export default Catalog