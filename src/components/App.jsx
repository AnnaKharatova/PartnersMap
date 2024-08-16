import './App.css'
import React, { useState, useEffect, useRef } from 'react';
import Header from './Header/Header.jsx'
import MyMap from './MyMap/MyMap.jsx'
import Footer from './Footer/Footer.jsx'
import PartnerElement from './PartnerElement/PartnerElement.jsx'
import PopupCitiesFilter from './PopupCitiesFilter/PopupCitiesFilter.jsx';
import PopupFilters from './PopupFilters/PopupFilters.jsx';
import PartnerDetails from './PartnerDetails/PartnerDetails.jsx'
import FilterMarkItem from './FilterMarkItem/FilterMarkItem.jsx';
import { YMaps } from '@pbe/react-yandex-maps';
import Bunner1440 from '../images/Banner_1440.png'
import Bunner1024 from '../images/Banner_1024.png'
import BurgerMenu from './BurgerMenu/BurgerMenu.jsx'
import Banner375 from './Banner375/Banner375.jsx'
import NothingFoundInFilter from './NothingFoundInFilter/NothingFoundInFilter.jsx';

function App() {
  const BASE_URL = `https://yurasstroy.ddns.net/api`
  const [citiesPopup, setCitiesPopup] = useState(false)
  const [filtersPopup, setFiltersPopup] = useState(false)
  const [selectedCity, setSelectedCity] = useState(null)
  const [allPartners, setAllPartners] = useState([])
  const [store, setStore] = useState(null)
  const [partnerInfo, setPartnerInfo] = useState()
  const [filterMark, setFilterMark] = useState([])
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedParts, setSelectedParts] = useState([]);
  const [filteredData, setFilteredData] = useState(allPartners)
  const [selectedPartner, setSelectedPartner] = useState(null)
  const [engines, setEngines] = useState([])
  const [tags, setTags] = useState([])
  const [maxWidth1024, setMaxWidth1024] = useState()
  const [maxWidth760, setMaxWidth760] = useState()
  const [burgerMenuOpen, setBurgerMenuOpen] = useState(false)
  const [popupPartnersListOpen, setPopupPartnersListOpen] = useState(false)
  const [banner375Open, setBanner375Open] = useState(true)
  const [showNoContentInfo, setshowNoContentInfo] = useState(false)
  const [showTitle, setShowTitle] = useState(false)
  const [buttonsShadow, setButtonsShadow] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector(".header"); // Добавьте свой селектор для фиксированной шапки
      const title = document.querySelector("h1"); // Добавьте свой селектор для заголовка

      if (header && title) {
        if (window.scrollY > title.offsetTop) {
          setShowTitle(true)
        } else {
          setShowTitle(false)
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const listRef = useRef(null);
  const listPopupRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      const list = listPopupRef.current;
      if (list) {
        setButtonsShadow(list.scrollTop > 0); // Проверяем, есть ли скролл
      }
    };
    if (listPopupRef.current) {
      listPopupRef.current.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (listPopupRef.current) {
        listPopupRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const list = listRef.current;
      if (list) {
        setButtonsShadow(list.scrollTop > 0); // Проверяем, есть ли скролл
      }
    };
    if (listRef.current) {
      listRef.current.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (listRef.current) {
        listRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const handleResize = () => {
    if (window.innerWidth < 760) {
      setMaxWidth1024(false);
      setMaxWidth760(true);
    } else if (window.innerWidth < 1024) {
      setMaxWidth1024(true);
      setMaxWidth760(false);
    } else {
      setMaxWidth1024(false);
      setMaxWidth760(false);
    }
  };
  window.addEventListener('resize', handleResize);

  useEffect(() => {
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [window.innerWidth]);

  function getAllPartners() {
    fetch(`${BASE_URL}/partners/`)
      .then(res => res.json())
      .then(resData => {
        const fetchedData = JSON.parse(JSON.stringify(resData))
        console.log(fetchedData)
        setAllPartners(fetchedData)
        setFilteredData(fetchedData)
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
    setSelectedCity(null)
    setSelectedParts([])
    setSelectedTags([])
  }

  function deleteFilterMark(name) {
    const tag = tags.find((tag) => tag.name === name);
    const part = engines.find((part) => part.name === name);
    if (tag) {
      const findTag = selectedTags.filter((i) => String(i) !== String(tag.id))
      setSelectedTags(findTag);
    } else if (part) {
      const findPart = selectedParts.filter((i) => String(i) !== String(part.id))
      setSelectedParts(findPart);
    }
  }

  function deleteMarkItem(item) {
    deleteFilterMark(item)
    setFilterMark(filterMark.filter((mark) => mark !== item));
    getQuery()
    if (selectedCity && (item === selectedCity.name)) {
      setSelectedCity(null)
    }
  }

  useEffect(() => {
    if (selectedCity) {
      getQuery()
    }
  }, [selectedCity])

  useEffect(() => {
    if (selectedParts) {
      getQuery()
    }
  }, [selectedParts])

  useEffect(() => {
    if (selectedTags) {
      getQuery()
    }
  }, [selectedTags])

  function getQuery() {
    if (selectedParts || selectedTags || selectedCity) {
      const queryParams = !selectedCity ? (selectedTags.map(tag => `tags=${tag}`).join('&') + `&` + selectedParts.map(id => `parts_available=${id}`).join('&')) : (`city=${selectedCity.id}` + `&` + selectedTags.map(tag => `tags=${tag}`).join('&') + `&` + selectedParts.map(id => `parts_available=${id}`).join('&'))
      const url = `${BASE_URL}/partners/?${queryParams}`
      console.log(url)
      fetch(url)
        .then(response => response.json())
        .then((data) => {
          setFilteredData(data);
        }).catch(error => {
          console.error("Ошибка при получении данных:", error);
        });
    }
    else {
      getAllPartners()
    }
  }

  function handleClearCityButton(e) {
    e.stopPropagation();
    setSelectedCity(null)
    if (filteredData.length > 0) {
      setAllPartners(filteredData)
    } else {
      getAllPartners()
    }
  }

  console.log(buttonsShadow)

  useEffect(() => {
    if ((selectedCity || filterMark) && filteredData.length == 0) {
      setshowNoContentInfo(true)
    } else if (filteredData || allPartners) {
      setshowNoContentInfo(false)
    }
  }, [selectedCity, filterMark, filteredData, allPartners])

  return (
    <>
      <Header maxWidth760={maxWidth760} setBurgerMenuOpen={setBurgerMenuOpen} showTitle={showTitle} />
      <main>
        <img alt='баннер' className="bunner" src={maxWidth1024 ? Bunner1440 : Bunner1024} />
        <h1 className="title">Официальные партнёры завода</h1>
        <div className="map">
          <div className="partners">
            <div className={!buttonsShadow ? "partners__filter-buttons" : "partners__filter-buttons buttons__box-shadow"}>
              <button className="filter-buttons__city-button" id="city-filter-big" onClick={() => setCitiesPopup(true)}>
                {selectedCity ? selectedCity.name : 'Город'}
                <div className="filter-buttons__delete-city" onClick={handleClearCityButton}>&times;</div>
              </button>
              <button className="filter-buttons__button" id="partner-filter-big" onClick={() => setFiltersPopup(true)}>
                Фильтры
                {filterMark.length > 0 ? <span className='filter-buttons__button-item'>{filterMark.length}</span> : null}
              </button>
            </div>
            <div className="partners__container" ref={listRef}>
              {partnerInfo ?
                <PartnerDetails partner={partnerInfo} setPartnerInfo={setPartnerInfo} setStore={setStore} /> :
                <ul className="popup-filter__partners-list">
                  {filteredData.length > 0 && filteredData.map((partner) => (
                    <PartnerElement setSelectedPartner={setSelectedPartner} partner={partner} setStore={setStore} key={partner.id} />
                  ))}
                </ul>
              }
              {showNoContentInfo ? <NothingFoundInFilter clearFilters={clearFilters} /> : null}
            </div>
          </div>
          <div className="map__container" id="map">
            {filterMark.length > 0 || selectedCity !== null ?
              <ul className='map__filters'>
                {filterMark.map((item, index) => (
                  <FilterMarkItem key={index} item={item} deleteMarkItem={deleteMarkItem} />
                ))}
                {selectedCity && <FilterMarkItem item={selectedCity.name} deleteMarkItem={deleteMarkItem} />}
                <button onClick={clearFilters} className='filter-marker'>
                  <div className="filter-marker__label-span" style={{ color: 'black' }}>Очистить все</div>
                  <span className='filter-marker__del-button' style={{ color: 'black' }}>x</span>
                </button>
              </ul> : null
            }
            <YMaps query={{
              apikey: '6fb19312-2127-40e5-8c22-75d1f84f2daa&lang=ru_RU',
              ns: "use-load-option",
              load: "Map,Placemark,control.FullscreenControl,geoObject.addon.balloon",
            }}>
              <MyMap setPopupPartnersListOpen={setPopupPartnersListOpen} maxWidth760={maxWidth760} selectedPartner={selectedPartner} partners={filteredData} partner={store} setPartnerInfo={setPartnerInfo} selectedCity={selectedCity} />
            </YMaps>
            {maxWidth760 && <button className="map__button" onClick={() => { setPopupPartnersListOpen(true) }}>Список партнеров</button>}
          </div>
        </div>
      </main >
      <Footer maxWidth760={maxWidth760} />
      {citiesPopup && <PopupCitiesFilter setCitiesPopup={setCitiesPopup} setSelectedCity={setSelectedCity} getQuery={getQuery} />}
      {filtersPopup && <PopupFilters tags={tags} setTags={setTags} engines={engines} setEngines={setEngines} filteredData={filteredData} setFilteredData={setFilteredData} getQuery={getQuery} selectedParts={selectedParts} setSelectedParts={setSelectedParts} selectedTags={selectedTags} setSelectedTags={setSelectedTags} setFiltersPopup={setFiltersPopup} setFilterMark={setFilterMark} filterMark={filterMark} />}
      {burgerMenuOpen && <BurgerMenu setBurgerMenuOpen={setBurgerMenuOpen} />}
      {popupPartnersListOpen &&
        <div className="popup-partners">
          <div className="popup-partners__container" >
            {!partnerInfo && <div className={!buttonsShadow ? "popup-partners__header" : "popup-partners__header buttons__box-shadow"}>
              <button className="popup-partners__close-button" onClick={() => { setPopupPartnersListOpen(false) }}>&times;</button>
            </div>}
            <div className='popup-partners__content' ref={listPopupRef} >
              {partnerInfo ?
                <PartnerDetails partner={partnerInfo} setPartnerInfo={setPartnerInfo} setStore={setStore} /> :
                <ul className="popup-filter__partners-list">
                  {filteredData.length > 0 && filteredData.map((partner) => (
                    <PartnerElement setPopupPartnersListOpen={setPopupPartnersListOpen} setSelectedPartner={setSelectedPartner} partner={partner} setStore={setStore} key={partner.id} />
                  ))}
                </ul>
              }
              {showNoContentInfo && <NothingFoundInFilter clearFilters={clearFilters} />}
            </div>
          </div>
        </div>}
      {(maxWidth760 && banner375Open) ? <Banner375 setBanner375Open={setBanner375Open} /> : null}
    </>
  )
}

export default App
