import './App.css'
import React, { useState, useEffect } from 'react';
import Header from './Header/Header.jsx'
import AnotherMap from './AnotherMap/AnotherMap.jsx'
import Footer from './Footer/Footer.jsx'
import PartnerElement from './PartnerElement/PartnerElement.jsx'
import PopupCitiesFilter from './PopupCitiesFilter/PopupCitiesFilter.jsx';
import PopupFilters from './PopupFilters/PopupFilters.jsx';
import PartnerDetails from './PartnerDetails/PartnerDetails.jsx'
import FilterMarkItem from './FilterMarkItem/FilterMarkItem.jsx';
import { YMaps } from '@pbe/react-yandex-maps';

function App() {
  const BASE_URL = `https://yurasstroy.ddns.net/api`
  const [citiesPopup, setCitiesPopup] = useState(false)
  const [filtersPopup, setFiltersPopup] = useState(false)
  const [storedCity, setStoredCity] = useState('')
  const [allPartners, setAllPartners] = useState([])
  const [store, setStore] = useState(null)
  const [partnerInfo, setPartnerInfo] = useState()
  const [filterMark, setFilterMark] = useState([])
  const [delFilterMark, setDelFilterMark] = useState(false)
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedParts, setSelectedParts] = useState([]);
  const [filteredData, setFilteredData] = useState([])
  const [selectedPartner, setSelectedPartner] = useState(null)

  useEffect(() => {
    if (filterMark.length < 1) {
      getAllPartners()
    }
  }, [filterMark])

  function getAllPartners() {
    fetch(`${BASE_URL}/partners/`)
      .then(res => res.json())
      .then(resData => {
        const fetchedData = JSON.parse(JSON.stringify(resData))
        console.log(fetchedData)
        setAllPartners(fetchedData)
      }).catch(error => {
        console.error("Ошибка при получении данных:", error);
      });
  }


  useEffect(() => {
    getAllPartners()
  }, [])

  function clearFilters() {
    setFilterMark([])
    getAllPartners()
  }

  function deleteMarkItem(item) {
    setFilterMark(filterMark.filter((mark) => mark !== item));
    console.log(filterMark)
    setDelFilterMark(true)
    getQuery()
  }

  function getQuery() {
    if (selectedParts || selectedTags) {
      const queryParams = selectedTags.map(tag => `tags=${tag}`).join('&') + `&` + selectedParts.map(id => `parts_available=${id}`).join('&')
      const url = `${BASE_URL}/partners/?${queryParams}`
      console.log(url)
      fetch(url)
        .then(response => response.json())
        .then((data) => {
          setFilteredData(data);
          setAllPartners(data)
        }).catch(error => {
          console.error("Ошибка при получении данных:", error);
        });
    } else {
      getAllPartners()
    }
  }

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
                {filterMark.length > 0 ? <span className='filter-buttons__button-item'>{filterMark.length}</span> : null}
              </button>
            </div>
            <div className="partners__container">
              {partnerInfo ?
                <PartnerDetails partner={partnerInfo} setPartnerInfo={setPartnerInfo} setStore={setStore} /> :
                <ul className="popup-filter__partners-list" id="partners-list-big">
                  {allPartners && allPartners.map((partner) => (
                    <PartnerElement  setSelectedPartner={setSelectedPartner}  partner={partner} setStore={setStore} key={partner.id} />
                  ))}
                </ul>
              }
            </div>
          </div>
          <div className="map__container" id="map">
            {filterMark.length > 0 &&
              <ul className='map__filters'>
                {filterMark.map((item, index) => (
                  <FilterMarkItem key={index} item={item} deleteMarkItem={deleteMarkItem} />
                ))}
                <button onClick={clearFilters} className='filter-marker'>
                  <div className="filter-marker__label-span" style={{ color: 'black' }}>Очистить все</div>
                  <span className='filter-marker__del-button' style={{ color: 'black' }}>x</span>
                </button>
              </ul>
            }
            <YMaps query={{
              apikey: '6fb19312-2127-40e5-8c22-75d1f84f2daa&lang=ru_RU',
              ns: "use-load-option",
              load: "Map,Placemark,control.ZoomControl,control.FullscreenControl,geoObject.addon.balloon",
            }}>
              <AnotherMap selectedPartner={selectedPartner} storedCity={storedCity} partners={allPartners} partner={store} setPartnerInfo={setPartnerInfo} />
            </YMaps>
            <button className="map__button" id="partners-list-button">Список партнеров</button>
          </div>
        </div>
      </main >
      <Footer />
      {citiesPopup && <PopupCitiesFilter setCitiesPopup={setCitiesPopup} setStoredCity={setStoredCity} />}
      {filtersPopup && <PopupFilters filteredData={filteredData} getQuery={getQuery} selectedParts={selectedParts} setSelectedParts={setSelectedParts} selectedTags={selectedTags} setSelectedTags={setSelectedTags} delFilterMark={delFilterMark} setDelFilterMark={setDelFilterMark} setFiltersPopup={setFiltersPopup} setAllPartners={setAllPartners} setFilterMark={setFilterMark} filterMark={filterMark} />}

    </>
  )
}

export default App
