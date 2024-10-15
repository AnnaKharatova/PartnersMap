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
import MyPagination from './MyPaginate/MyPaginate.jsx';

function Catalog({ maxWidth760 }) {
    const [filterCount, setFilterCount] = useState()
    const navigate = useNavigate()
    const [burgerMenuOpen, setBurgerMenuOpen] = useState(false)
    const [allCatalog, setAllCatalog] = useState([])
    const [fiteredData, setFilteredData] = useState([])
    const [inputValue, setInputValue] = useState('');
    const [dislayedItems, setDisplayedItems] = useState([])
    const storedValue = localStorage.getItem('inputValue');
    const storedEngineName = localStorage.getItem('engineName')
    const [selectedEngine, setSelectedEngine] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState([]);
    const [filtersPopupOpen, setFiltersPopupOpen] = useState(false)
    const storagedEngineId = localStorage.getItem('engineSort')
    const storagedEngineKitName = localStorage.getItem('repare-kit')
    const storagedEngineKitId = localStorage.getItem('engineKitSort')
    const [page, setPage] = useState(1);
    const [filterMark, setFilterMark] = useState([])

    const groups = selectedGroup ? selectedGroup.map(group => `group=${group}&`).join('') : '';
    const engins = selectedEngine ? selectedEngine.map(engine => `engine_cat=${engine}&`).join('') : '';
    const SEARCH_URL = `${BASE_URL}/catalog/catalog/?${groups}${engins}search=${inputValue}&page=${page}`;

    console.log(SEARCH_URL)

    useEffect(() => {
        if (!storagedEngineKitId) {
            getAllCatalog()
        }
    }, [storagedEngineKitId])

    function getAllCatalog() {
        fetch(SEARCH_URL)
            .then(res => res.json())
            .then(resData => {
                const fetchedData = JSON.parse(JSON.stringify(resData))
                setAllCatalog(fetchedData)
                setFilteredData(fetchedData)
                setDisplayedItems(fetchedData.results)
            }).catch(error => {
                console.error("Ошибка при получении данных:", error);
            });
    }

    function handleSubmit(page) {
        fetch(`${BASE_URL}/catalog/catalog/?${groups}${engins}search=${inputValue}&page=${page}`)
            .then(res => res.json())
            .then(resData => {
                const fetchedData = JSON.parse(JSON.stringify(resData))
                setFilteredData(fetchedData)
                setDisplayedItems(fetchedData.results)
            }).catch(res => {
                if (res.status == 500) {
                    navigate('./error')
                } else {
                    console.log("Ошибка при получении данных:", res.message)
                }
            });
    };

    function clearFilters() {
        setInputValue('')
        setSelectedEngine([])
        setSelectedGroup([])
        localStorage.clear()
        setFilteredData(allCatalog)
        setDisplayedItems(allCatalog.results)

    }

    useEffect(() => {
        if (storagedEngineId & storedEngineName) {
            setSelectedGroup([...selectedGroup, storagedEngineId]);
            setFilterMark([...filterMark, storedEngineName]);
            handleSubmit(page)
        }
    }, [storagedEngineId])

    useEffect(() => {
        if (storagedEngineKitId) {
            setSelectedEngine([...selectedEngine, storagedEngineKitId]);
            setFilterMark([...filterMark, storagedEngineKitName]);
            fetch(`${BASE_URL}/catalog/repair_kit/?engine_cat=${storagedEngineKitId}&page=1`)
                .then(res => res.json())
                .then(resData => {
                    const fetchedData = JSON.parse(JSON.stringify(resData))
                    setFilteredData(fetchedData)
                    setDisplayedItems(fetchedData.results)
                }).catch(res => {
                    if (res.status == 500) {
                        navigate('./error')
                    } else {
                        console.log("Ошибка при получении данных:", res.message);
                    }
                });
        }
    }, [storagedEngineId])

    function submitInput() {
        handleSubmit(page)
    }

    setTimeout(() => {
        localStorage.clear()
    }, 5000)

    useEffect(() => {
        if (storedValue && allCatalog) {
            setInputValue(storedValue)
        }
    }, [storedValue, allCatalog])


    useEffect(() => {
        setFilterCount(selectedEngine.length + selectedGroup.length)
    }, [selectedEngine, selectedGroup])

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
                        <button className='catalog__input-button' onClick={submitInput}>{!maxWidth760 ? 'Найти' : ''}</button>
                    </div>
                </div>
                <div className='catalog__main'>
                    {!maxWidth760 && <CatalogFilters filterMark={filterMark} setFilterMark={setFilterMark} handleSubmit={handleSubmit} maxWidth760={maxWidth760} setFilteredData={setFilteredData} clearFilters={clearFilters} selectedEngine={selectedEngine} setSelectedEngine={setSelectedEngine} selectedGroup={selectedGroup} setSelectedGroup={setSelectedGroup} />}
                    {(dislayedItems && dislayedItems.length > 0) ?
                        <>
                            <div className='catalog__span-group'>
                                {allCatalog&&<span className='catalog__span'>Показано {dislayedItems.length} из {allCatalog.count}</span>}

                                {(!maxWidth760 && (dislayedItems.length < fiteredData.results.length)) &&
                                    <button className='catalog__clear-button' onClick={clearFilters}>Сбросить фильтры</button>}
                                {maxWidth760 && <button className="catalog__popup-button" id="partner-filter-big" onClick={() => setFiltersPopupOpen(true)}>
                                    Фильтры
                                    <span className='catalog__button-item'>{filterCount}</span>
                                </button>}
                                {(maxWidth760 && filterCount > 0 && dislayedItems.length > 0) && <button className='catalog__cross-filters-button' onClick={clearFilters}></button>}
                            </div>
                            <div className='catalog__list'>
                                {dislayedItems && dislayedItems.map(item => (
                                    <CatalogItem item={item} key={`${item.id}` + `${item.name}`} />
                                ))}
                            </div>
                            <MyPagination handleSubmit={handleSubmit} fiteredData={fiteredData} page={page} setPage={setPage} />
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
                </div>
            </main>
            <Footer />
            {burgerMenuOpen && <BurgerMenu catalog={true} setBurgerMenuOpen={setBurgerMenuOpen} />}
            {filtersPopupOpen &&
                <div className='catalog-popup'>
                    <div className="popup-city__content">
                        <div className='catalog-popup__header'>
                            <h2 className="catalog-popup__title">Фильтры</h2>
                        </div>
                        <CatalogFilters filterMark={filterMark} setFilterMark={setFilterMark} handleSubmit={handleSubmit} maxWidth760={maxWidth760} setFilteredData={setFilteredData} clearFilters={clearFilters} selectedEngine={selectedEngine} setSelectedEngine={setSelectedEngine} selectedGroup={selectedGroup} setSelectedGroup={setSelectedGroup} />
                        <button className="catalog-popup__submit-button" id="filter-submit-button" type="submit" onClick={() => { setFiltersPopupOpen(false) }}>Готово</button>
                    </div>
                </div>
            }
        </>
    )
}

export default Catalog