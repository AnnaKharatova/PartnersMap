import './App.css'
import React, { useState, useEffect } from 'react';
import Header from './Header/Header.jsx'
import MyMap from './Map/MyMap.jsx'
import Footer from './Footer/Footer.jsx'

function App() {

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
              <button className="filter-buttons__city-button" id="city-filter-big">
                Город
                <div className="filter-buttons__delete-city">&times;</div>
              </button>
              <button className="filter-buttons__button" id="partner-filter-big">
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
    </>
  )
}

export default App
