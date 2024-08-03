import './App.css'
import React, { useState, useEffect } from 'react';
import Header from './Header/Header.jsx'
import AnotherMap from './AnotherMap/AnotherMap.jsx'
import Footer from './Footer/Footer.jsx'
import PartnerElement from './PartnerElement/PartnerElement.jsx'
import PopupCitiesFilter from './PopupCitiesFilter/PopupCitiesFilter.jsx';
import PopupFilters from './PopupFilters/PopupFilters.jsx';
import { YMaps } from '@pbe/react-yandex-maps';

function App() {
  const BASE_URL = `https://yurasstroy.ddns.net/api`
  const [citiesPopup, setCitiesPopup] = useState(false)
  const [filtersPopup, setFiltersPopup] = useState(false)
  const [storedCity, setStoredCity] = useState('')
  const [allPartners, setAllPartners] = useState([])
  const [store, setStore] = useState([])

  useEffect(() => {
    fetch(`${BASE_URL}/partners/`)
      .then(res => res.json())
      .then(resData => {
        const fetchedData = JSON.parse(JSON.stringify(resData))
        console.log(fetchedData)
        setAllPartners(fetchedData)
      }).catch(error => {
        console.error("Ошибка при получении данных:", error);
      });
  }, [])

  return (
    <>
      <Header />
      <main>
        <div className="bunner">Баннер</div>
        <h1 className="title">Официальные партнёры завода</h1>
        <div className="filter-buttons">
          <button className="filter-buttons__button" id="partner-filter">Фильтры</button>
          <button className="filter-buttons__button" id="city-filter">Город</button>
        </div>
        <div className="filters-checked">
          <ul className="filters-checked__partners"></ul>
          <p className="filters-checked__city"></p>
        </div>
        <div className="map">
          <div className="partners">
            <div className="partners__filter-buttons">
              <button className="filter-buttons__city-button" id="city-filter-big" onClick={() => setCitiesPopup(true)}>
                {storedCity ? storedCity : 'Город'}
                <div className="filter-buttons__delete-city">&times;</div>
              </button>
              <button className="filter-buttons__button" id="partner-filter-big" onClick={() => setFiltersPopup(true)}>
                Фильтры
                <span className='filter-buttons__button-item'></span>
              </button>
            </div>
            <div className="partners__container">
              <ul className="popup-filter__partners-list" id="partners-list-big">
                {allPartners && allPartners.map((partner) => (
                  <PartnerElement partner={partner} setStore={setStore} key={partner.id} />
                ))}

              </ul>
            </div>
          </div>
          <div className="map__container" id="map">
            <YMaps query={{
              apikey: '6fb19312-2127-40e5-8c22-75d1f84f2daa&lang=ru_RU',
              ns: "use-load-option",
              load: "Map,Placemark,control.ZoomControl,control.FullscreenControl,geoObject.addon.balloon",
            }}>
              <AnotherMap storedCity={storedCity} partners={allPartners} partner={store} />
            </YMaps>
            <button className="map__button" id="partners-list-button">Список партнеров</button>
          </div>
        </div>
      </main >
      <Footer />
      {citiesPopup && <PopupCitiesFilter setCitiesPopup={setCitiesPopup} setStoredCity={setStoredCity} />}
      {filtersPopup && <PopupFilters setFiltersPopup={setFiltersPopup} />}

    </>
  )
}

export default App
