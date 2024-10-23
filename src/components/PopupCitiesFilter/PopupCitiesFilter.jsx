import "./PopupCitiesFilter.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BackIcon from "../../images/Icon arrow-back.svg";
import NothingFoundInCity from "../NothingFoundInCity/NothingFoundInCity";
import { BASE_URL } from "../../constants/constants";

function PopupCitiesFilter({
  setCitiesPopup,
  setSelectedCity,
  setPartnerInfo,
  getQuery,
}) {
  const navigate = useNavigate();
  const [cities, setCities] = useState([]);
  const [searchCities, setSearchCities] = useState(null);
  const [displayedCities, setDisplayedCities] = useState([]);
  const [searchValue, setSearchValue] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}/cities`)
      .then((response) => response.json())
      .then((data) => {
        setCities(data);
        setDisplayedCities(data);
      })
      .catch((res) => {
        if (res.status == 500) {
          navigate("./error");
        } else {
          console.log("Ошибка при получении данных:", res.message);
        }
      });
  }, []);

  useEffect(() => {
    if (!searchCities) {
      setDisplayedCities(cities);
    } else {
      setDisplayedCities(searchCities);
    }
  }, [searchCities]);

  function selectCity(selectedCity) {
    setSelectedCity(selectedCity);
    setCitiesPopup(false);
    setPartnerInfo(null);
  }

  const handleChange = (event) => {
    const results = cities.filter((city) =>
      city.name.toLowerCase().startsWith(event.target.value.toLowerCase()),
    );
    setSearchValue(event.target.value);
    setSearchCities(results);
  };


  
  function handleAllPartners() {
    getQuery();
    selectCity(null);
  }

  return (
    <div className="popup-city" id="popup-city-filter">
      <div className="popup-city__content">
        <button
          className="popup-filter__back-button"
          onClick={() => {
            setCitiesPopup(false);
          }}
        >
          <img src={BackIcon} />
        </button>
        <h2 className="popup-filter__title">Выберите город</h2>
        <input
          className="popup-filter__input"
          id="city-input"
          placeholder="Поиск"
          onChange={handleChange}
        />
        {searchValue && searchCities.length == 0 ? (
          <NothingFoundInCity />
        ) : (
          <ul className="popup-filter__cities-list" id="cities-list">
            <li
              className="popup-filter__all-partners"
              onClick={handleAllPartners}
            >
              Все партнеры
            </li>

            {displayedCities.map((city) => (
              <li
                key={city.id}
                className="popup-filter__city"
                onClick={() => {
                  selectCity(city);
                }}
              >
                {city.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default PopupCitiesFilter;
