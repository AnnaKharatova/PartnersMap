import './PopupCitiesFilter.css'
import React, { useState, useEffect } from 'react';
import BackIcon from '../../images/Icon arrow-back.svg'
import NothingFoundInCity from '../NothingFoundInCity/NothingFoundInCity';

function PopupCitiesFilter({ setCitiesPopup, setSelectedCity, getQuery }) {
    const BASE_URL = `https://yurasstroy.ddns.net/api`
    const [cities, setCities] = useState([])
    const [searchCities, setSearchCities] = useState(null)
    const [displayedCities, setDisplayedCities] = useState([])
    const [searchValue, setSearchValue] = useState(null)

    useEffect(() => {
        fetch(`${BASE_URL}/cities`)
            .then(response => response.json())
            .then(data => {
                setCities(data)
                setDisplayedCities(data)
            })
            .catch(error => {
                console.error("Ошибка при получении данных:", error);
            });

    }, [])

    useEffect(() => {
        if (!searchCities) {
            setDisplayedCities(cities)
        } else {
            setDisplayedCities(searchCities)
        }
    }, [searchCities])

    function selectCity(selectedCity) {
        setSelectedCity(selectedCity);
        setCitiesPopup(false);
    }



    const handleChange = (event) => {
        const results = cities.filter(city => city.name.toLowerCase().startsWith(event.target.value.toLowerCase()))
        setSearchValue(event.target.value)
        setSearchCities(results)
        console.log(results)
    };

    return (
        <div className="popup-filter" id="popup-city-filter">
            <div className="popup-filter__content">
                <button className="popup-filter__back-button" onClick={() => { setCitiesPopup(false) }}><img src={BackIcon} /></button>
                <h2 className="popup-filter__title">Выберите город</h2>
                <input className="popup-filter__input" id="city-input" placeholder="Поиск" onChange={handleChange} />
                {searchValue && searchCities.length == 0 ?
                    < NothingFoundInCity /> :
                    <ul className="popup-filter__cities-list" id="cities-list">
                        {displayedCities.map((city) => (
                            <li key={city.id} className='popup-filter__city' onClick={() => { selectCity(city) }}>{city.name}</li>
                        ))}
                    </ul>}
            </div>
        </div>
    )
}

export default PopupCitiesFilter
