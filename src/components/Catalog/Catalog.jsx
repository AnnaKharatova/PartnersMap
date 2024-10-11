import './Catalog.css'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import Header from '../Header/Header.jsx'
import BurgerMenu from '../BurgerMenu/BurgerMenu.jsx'
import CatalogFilters from './CatalogFilters/CatalogFilters.jsx';
import CatalogItem from './CatalogItem/CatalogItem';
import Footer from '../Footer/Footer.jsx'
import NothingFound from './NothingFound/NothingFound.jsx';
import { BASE_URL } from '../../constants/constants.js';

function Catalog({ maxWidth760 }) {
    const page = 2
    const [filterCount, setFilterCount] = useState()
    const navigate = useNavigate()
    const [burgerMenuOpen, setBurgerMenuOpen] = useState(false)
    const [allCatalog, setAllCatalog] = useState([])
    const [fiteredData, setFilteredData] = useState([])
    const [inputValue, setInputValue] = useState('');
    const storedValue = localStorage.getItem('inputValue');
    const [selectedEngine, setSelectedEngine] = useState('');
    const [selectedGroup, setSelectedGroup] = useState('');
    const [filtersPopupOpen, setFiltersPopupOpen] = useState(false)
    const SEARCH_URL = `${BASE_URL}/catalog/catalog/?${selectedGroup && `group=${selectedGroup}&&`}${selectedEngine && `engine_cat=${selectedEngine}`}search=${inputValue}&page=${page}`
    const storagedEngineId = localStorage.getItem('engineSort')
    const storagedType = localStorage.getItem('repare-kit')
    const storagedEngineKitId = localStorage.getItem('engineKitSort')

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
        localStorage.clear()
        setFilteredData(allCatalog)
        setSelectedEngine('')
        setSelectedGroup('')
    }

    useEffect(() => {
        setFilterCount(Boolean(selectedEngine) + Boolean(selectedGroup))
    }, [selectedEngine, selectedGroup])

    function handleSubmit() {
        fetch(SEARCH_URL)
            .then(res => res.json())
            .then(resData => {
                const fetchedData = JSON.parse(JSON.stringify(resData))
                setFilteredData(fetchedData.results)
            }).catch(res => {
                if (res.status == 500) {
                    navigate('./error')
                } else {
                    console.log("Ошибка при получении данных:", res.message);
                }
            });
    };

    useEffect(() => {
        if (storagedEngineId) {
            fetch((`${BASE_URL}/catalog/catalog/?engine_cat=${storagedEngineId}&page=1`)) 
                .then(res => res.json())
                .then(resData => {
                    const fetchedData = JSON.parse(JSON.stringify(resData))
                    setFilteredData(fetchedData.results)
                }).catch(res => {
                    if (res.status == 500) {
                        navigate('./error')
                    } else {
                        console.log("Ошибка при получении данных:", res.message);
                    }
                });
        }
        console.log(`${BASE_URL}/catalog/catalog/?engine_cat=${storagedEngineId}&page=1`)
    }, [storagedEngineId])

    useEffect(() => {
        if (storagedType && storagedEngineKitId) {
            fetch(`${BASE_URL}/catalog/repair_kit/?engine_cat=${storagedEngineKitId}&page=1`) //новый путь будет catalog/
                .then(res => res.json())
                .then(resData => {
                    const fetchedData = JSON.parse(JSON.stringify(resData))
                    setFilteredData(fetchedData.results)
                }).catch(res => {
                    if (res.status == 500) {
                        navigate('./error')
                    } else {
                        console.log("Ошибка при получении данных:", res.message);
                    }
                });
            localStorage.clear()
        }
    }, [storagedType, storagedEngineKitId])

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
                        <button className='catalog__input-button' onClick={handleSubmit}>{!maxWidth760 ? 'Найти' : ''}</button>
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
                                <span className='catalog__button-item'>{filterCount}</span>
                            </button>}
                            {(maxWidth760 && filterCount > 0 && fiteredData.length > 0) && <button className='catalog__cross-filters-button' onClick={clearFilters}></button>}
                        </div>
                        <div className='catalog__list'>
                            {fiteredData && fiteredData.map(item => (
                                <CatalogItem item={item} key={`${item.id}` + `${item.name}`} />
                            ))}
                        </div>
                    </>
                    :
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
                        </div>
                        <CatalogFilters maxWidth760={maxWidth760} setFilteredData={setFilteredData} clearFilters={clearFilters} selectedEngine={selectedEngine} setSelectedEngine={setSelectedEngine} selectedGroup={selectedGroup} setSelectedGroup={setSelectedGroup} />
                        <button className="catalog-popup__submit-button" id="filter-submit-button" type="submit" onClick={() => { setFiltersPopupOpen(false) }}>Готово</button>
                    </div>
                </div>
            }
        </>
    )
}

export default Catalog