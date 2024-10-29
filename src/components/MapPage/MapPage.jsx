import "./MapPage.css";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { YMaps } from "@pbe/react-yandex-maps";
import Header from "../Header/Header.jsx";
import MyMap from "../MyMap/MyMap.jsx";
import PartnerElement from "../PartnerElement/PartnerElement.jsx";
import PopupCitiesFilter from "../PopupCitiesFilter/PopupCitiesFilter.jsx";
import PopupFilters from "../PopupFilters/PopupFilters.jsx";
import PartnerDetails from "../PartnerDetails/PartnerDetails.jsx";
import FilterMarkItem from "../FilterMarkItem/FilterMarkItem.jsx";
import BurgerMenu from "../BurgerMenu/BurgerMenu.jsx";
import NothingFoundInFilter from "../NothingFoundInFilter/NothingFoundInFilter.jsx";
import NothingFoundInCity from "../NothingFoundInCity/NothingFoundInCity.jsx";
import { BASE_URL } from "../../constants/constants.js";

function MapPage({ maxWidth1024, maxWidth760 }) {
  const listRef = useRef(null);
  const listPopupRef = useRef(null);
  const navigate = useNavigate();

  const storagedEngineId = localStorage.getItem("engineMapSort");
  // const storagedEngineName = localStorage.getItem("engineMapName");

  const [citiesPopup, setCitiesPopup] = useState(false);
  const [filtersPopup, setFiltersPopup] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);
  const [allPartners, setAllPartners] = useState([]);
  const [store, setStore] = useState(null);
  const [partnerInfo, setPartnerInfo] = useState();
  const [filterMark, setFilterMark] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedParts, setSelectedParts] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [engines, setEngines] = useState([]);
  const [tags, setTags] = useState([]);
  const [burgerMenuOpen, setBurgerMenuOpen] = useState(false);
  const [popupPartnersListOpen, setPopupPartnersListOpen] = useState(false);
  const [showNoContentInfo, setshowNoContentInfo] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [buttonsShadow, setButtonsShadow] = useState(false);
  const [bunner, setBunner] = useState(null)

  const tagsQuery =  selectedTags&&selectedTags.map((tag) => `tags=${tag}`).join("&")
  const partsQuery =  selectedParts&&selectedParts.map((id) => `parts_available=${id}`).join("&")
  const cityQuery = selectedCity&&`city=${selectedCity.id}`
  const url =  `${BASE_URL}/partners/?${tagsQuery}&${partsQuery}&${cityQuery}`;

  useEffect(()=> {
    fetch(`${BASE_URL}/banner/`)
    .then((res) => res.json())
    .then((resData) => {
      const fetchedData = JSON.parse(JSON.stringify(resData));
      setBunner(fetchedData.image);
    })
    .catch((res) => {
      if (res.status == 500) {
        navigate("./error");
      } else {
        console.log("Ошибка при получении данных:", res.message);
      }
    });
  },[])

  /* useEffect(() => {
    if (storagedEngineId) {
      setFilterMark([...filterMark, storagedEngineName]);
      setSelectedParts([...selectedParts, storagedEngineId]);
      const url = `${BASE_URL}/partners/?parts_available=${storagedEngineId}`;
      fetch(url)
        .then((res) => res.json())
        .then((resData) => {
          const fetchedData = JSON.parse(JSON.stringify(resData));
          setFilteredData(fetchedData);
        })
        .catch((res) => {
          if (res.status == 500) {
            navigate("./error");
          } else {
            console.log("Ошибка при получении данных:", res.message);
          }
        });
    }
  }, []); */

  useEffect(() => {
    if (filterMark) {
      getQuery()
    }
  }, [filterMark])

  useEffect(()=> {
    if (selectedCity) {
      getQuery()
    } else {
      getQuery()
    }
  }, [selectedCity])

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector(".header");
      const title = document.querySelector("h1");
      if (header && title) {
        if (window.scrollY > title.offsetTop) {
          setShowTitle(true);
        } else {
          setShowTitle(false);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const list = listPopupRef.current;
      if (list) {
        setButtonsShadow(list.scrollTop > 0);
      }
    };
    if (listPopupRef.current) {
      listPopupRef.current.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (listPopupRef.current) {
        listPopupRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const list = listRef.current;
      if (list) {
        setButtonsShadow(list.scrollTop > 0);
      }
    };
    if (listRef.current) {
      listRef.current.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (listRef.current) {
        listRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  function getAllPartners() {
    fetch(`${BASE_URL}/partners/`)
      .then((res) => res.json())
      .then((resData) => {
        const fetchedData = JSON.parse(JSON.stringify(resData));
        setAllPartners(fetchedData);
        setFilteredData(fetchedData);
      })
      .catch((res) => {
        if (res.status == 500) {
          navigate("/error");
        } else {
          console.error("Ошибка при получении данных:", res.message);
        }
      });
  }

  useEffect(() => {
    if (!storagedEngineId) {
      getAllPartners();
    }
  }, []);

  function clearFilters() {
    setFilterMark([]);
    getAllPartners();
    setSelectedParts([]);
    setSelectedTags([]);
    localStorage.clear()
  }

  function deleteFilterMark(name) {
    const tag = tags.find((tag) => tag.name === name);
    const part = engines.find((part) => part.name === name);
    if (tag) {
      const findTag = selectedTags.filter((i) => String(i) !== String(tag.id));
      setSelectedTags(findTag);
    } else if (part) {
      const findPart = selectedParts.filter(
        (i) => String(i) !== String(part.id),
      );
      setSelectedParts(findPart);
    }
  }

  function deleteMarkItem(item) {
    deleteFilterMark(item);
    setFilterMark(filterMark.filter((mark) => mark !== item));
    if (selectedCity && item === selectedCity.name) {
      setSelectedCity(null);
      if (filterMark.length == 0) {
        getAllPartners();
      }
    }
  }

  function getQuery() {
    if (selectedParts || selectedTags || selectedCity) {
      console.log(url)
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setFilteredData(data);
        })
        .catch((res) => {
          if (res.status == 500) {
            navigate("/error");
          } else {
            console.error("Ошибка при получении данных:", res.message);
          }
        });
    } else {
      getAllPartners();
    }
  }

  useEffect(() => {
    if ((selectedCity || filterMark) && filteredData.length == 0) {
      setshowNoContentInfo(true);
    } else if (filteredData || allPartners) {
      setshowNoContentInfo(false);
    }
  }, [selectedCity, filterMark, filteredData, allPartners]);

  useEffect(() => {
    if (partnerInfo) {
      setCitiesPopup(false);
      setFiltersPopup(false);
    }
  }, [partnerInfo]);

  function handleFiltersCityOpen() {
    setCitiesPopup(true);
    setFiltersPopup(false);
  }

  function handleFiltersOpen() {
    setCitiesPopup(false);
    setFiltersPopup(true);
  }

  useEffect(() => {
    if (partnerInfo) {
      setPopupPartnersListOpen(true);
    }
  }, [partnerInfo]);

  return (
    <>
      <Header
        maxWidth760={maxWidth760}
        setBurgerMenuOpen={setBurgerMenuOpen}
        showTitle={showTitle}
        catalog={false}
      />
      <main>
        {bunner&&<img alt="баннер" className="bunner" src={bunner} />}
        <h1 className="title">
          {!maxWidth760
            ? `Официальные партнёры АО Строймаш`
            : "Официальные партнёры завода"}
        </h1>
        <div className="map">
          <div className="partners">
            <div
              className={
                !buttonsShadow
                  ? "partners__filter-buttons"
                  : "partners__filter-buttons buttons__box-shadow"
              }
            >
              <button
                className="filter-buttons__city-button"
                id="city-filter-big"
                onClick={handleFiltersCityOpen}
              >
                {selectedCity ? selectedCity.name : "Выберите город"}
              </button>
              <button
                className="filter-buttons__button"
                id="partner-filter-big"
                onClick={handleFiltersOpen}
              >
                Фильтры
                {filterMark.length > 0 ? (
                  <span className="filter-buttons__button-item">
                    {filterMark.length}
                  </span>
                ) : (
                  <span className="filter-buttons__button-item"></span>
                )}
              </button>
            </div>
            {citiesPopup ? (
              <PopupCitiesFilter
                getQuery={getQuery}
                setPartnerInfo={setPartnerInfo}
                setCitiesPopup={setCitiesPopup}
                setSelectedCity={setSelectedCity}
              />
            ) : (
              <>
                {filtersPopup ? (
                  <PopupFilters
                    setPartnerInfo={setPartnerInfo}
                    tags={tags}
                    setTags={setTags}
                    engines={engines}
                    setEngines={setEngines}
                    filteredData={filteredData}
                    setFilteredData={setFilteredData}
                    getQuery={getQuery}
                    selectedParts={selectedParts}
                    setSelectedParts={setSelectedParts}
                    selectedTags={selectedTags}
                    setSelectedTags={setSelectedTags}
                    setFiltersPopup={setFiltersPopup}
                    setFilterMark={setFilterMark}
                    filterMark={filterMark}
                  />
                ) : (
                  <>
                    <div className="partners__container" ref={listRef}>
                      {partnerInfo ? (
                        <PartnerDetails
                          maxWidth760={maxWidth760}
                          setPopupPartnersListOpen={setPopupPartnersListOpen}
                          partner={partnerInfo}
                          setPartnerInfo={setPartnerInfo}
                          setStore={setStore}
                        />
                      ) : (
                        <ul className="popup-filter__partners-list">
                          {filteredData.length > 0 &&
                            filteredData.map((partner) => (
                              <PartnerElement
                                setPartnerInfo={setPartnerInfo}
                                setSelectedPartner={setSelectedPartner}
                                selectedPartner
                                partner={partner}
                                setStore={setStore}
                                key={partner.id}
                                setPopupPartnersListOpen={setPopupPartnersListOpen}
                              />
                            ))}
                        </ul>
                      )}
                      {showNoContentInfo &&
                        selectedCity &&
                        filterMark.length == 0 && <NothingFoundInCity />}
                      {showNoContentInfo && filterMark.length !== 0 ? (
                        <NothingFoundInFilter clearFilters={clearFilters} />
                      ) : null}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
          <div className="map__container" id="map">
            {(filterMark.length > 0) & !maxWidth760 ? (
              <ul className="map__filters">
                {filterMark.map((item, index) => (
                  <FilterMarkItem
                    getQuery={getQuery}
                    key={index}
                    item={item}
                    deleteMarkItem={deleteMarkItem}
                  />
                ))}
                <button onClick={clearFilters} className="filter-marker">
                  <div
                    className="filter-marker__label-span"
                    style={{ color: "black" }}
                  >
                    Очистить все
                  </div>
                  <span
                    className="filter-marker__del-button"
                    style={{ color: "black" }}
                  >
                    &times;
                  </span>
                </button>
              </ul>
            ) : null}
            <YMaps
              query={{
                apikey: "6fb19312-2127-40e5-8c22-75d1f84f2daa",
                lang: "ru_RU",
                ns: "use-load-option",
                load: "Map,Placemark,control.FullscreenControl,geoObject.addon.balloon",
              }}
            >
              <MyMap
                setStore={setStore}
                setPopupPartnersListOpen={setPopupPartnersListOpen}
                maxWidth760={maxWidth760}
                selectedPartner={selectedPartner}
                partners={filteredData}
                partner={store}
                setPartnerInfo={setPartnerInfo}
                selectedCity={selectedCity}
              />
            </YMaps>
            <div className="map__footer-nav">
              <a className="map__footer-item" href="#">
                Пользовательское соглашение
              </a>
              <p className="map__copyright">© 2024 Название</p>
            </div>
            {maxWidth760 && (
              <button
                className="map__button"
                onClick={() => {
                  setPopupPartnersListOpen(true);
                }}
              >
                Список партнеров
              </button>
            )}
          </div>
        </div>
      </main>

      {citiesPopup && maxWidth760 && (
        <PopupCitiesFilter
          setPartnerInfo={setPartnerInfo}
          setCitiesPopup={setCitiesPopup}
          setSelectedCity={setSelectedCity}
          getQuery={getQuery}
        />
      )}
      {filtersPopup && maxWidth760 && (
        <PopupFilters
          setPartnerInfo={setPartnerInfo}
          tags={tags}
          setTags={setTags}
          engines={engines}
          setEngines={setEngines}
          filteredData={filteredData}
          setFilteredData={setFilteredData}
          getQuery={getQuery}
          selectedParts={selectedParts}
          setSelectedParts={setSelectedParts}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          setFiltersPopup={setFiltersPopup}
          setFilterMark={setFilterMark}
          filterMark={filterMark}
        />
      )}
      {burgerMenuOpen && (
        <BurgerMenu catalog={false} setBurgerMenuOpen={setBurgerMenuOpen} />
      )}
      {popupPartnersListOpen && maxWidth760 && (
        <div className="popup-partners__container">
          {!partnerInfo && (
            <div
              className={
                !buttonsShadow
                  ? "popup-partners__header"
                  : "popup-partners__header buttons__box-shadow"
              }
            >
              <button
                className="popup-partners__close-button"
                onClick={() => {
                  setPopupPartnersListOpen(false);
                }}
              ></button>
            </div>
          )}
          <div className="popup-partners__content" ref={listPopupRef}>
            {partnerInfo ? (
              <PartnerDetails
                maxWidth760={maxWidth760}
                setPopupPartnersListOpen={setPopupPartnersListOpen}
                partner={partnerInfo}
                setPartnerInfo={setPartnerInfo}
                setStore={setStore}
              />
            ) : (
              <ul className="popup-filter__partners-list">
                {filteredData.length > 0 &&
                  filteredData.map((partner) => (
                    <PartnerElement
                    setPartnerInfo={setPartnerInfo}
                    setSelectedPartner={setSelectedPartner}
                    selectedPartner
                    partner={partner}
                    setStore={setStore}
                    key={partner.id}
                    setPopupPartnersListOpen={setPopupPartnersListOpen}
                    />
                  ))}
              </ul>
            )}
            {showNoContentInfo && selectedCity && filterMark.length == 0 && (
              <NothingFoundInCity />
            )}
            {showNoContentInfo && filterMark.length !== 0 && (
              <NothingFoundInFilter clearFilters={clearFilters} />
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default MapPage;
