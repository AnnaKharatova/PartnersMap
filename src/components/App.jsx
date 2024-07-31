import './App.css'
import React, { useState } from 'react';
import Header from './Header/Header.jsx'
import MyMap from './Map/MyMap.jsx'
import Footer from './Footer/Footer.jsx'
import PopupCitiesFilter from './PopupCitiesFilter/PopupCitiesFilter.jsx';
import PopupFilters from './PopupFilters/PopupFilters.jsx';

function App() {

  const [citiesPopup, setCitiesPopup] = useState(false)
  const [filtersPopup, setFiltersPopup] = useState(false)

  

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
                Город
                <div className="filter-buttons__delete-city">&times;</div>
              </button>
              <button className="filter-buttons__button" id="partner-filter-big" onClick={() => setFiltersPopup(true)}>
                Фильтры
                <span className='filter-buttons__button-item'></span>
              </button>
            </div>
            <div className="partners__container">
              <ul className="popup-filter__partners-list" id="partners-list-big"></ul>
            </div>
          </div>
          <div className="map__container" id="map">
            <MyMap />
            <button className="map__button" id="partners-list-button">Список партнеров</button>
          </div>
        </div>
      </main >
      <Footer />
      {citiesPopup&&<PopupCitiesFilter setCitiesPopup={setCitiesPopup}/>}
      {filtersPopup&&<PopupFilters setFiltersPopup={setFiltersPopup}/>}

    </>
  )
}

export default App
