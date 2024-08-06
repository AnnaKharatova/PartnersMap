import './PopupCitiesFilter.css'
import React, { useState, useEffect } from 'react';
import BackIcon from '../../images/Icon arrow-back.svg'

function PopupCitiesFilter({ setCitiesPopup, setSelectedCity, setFilterMark, filterMark}) {
    const BASE_URL = `https://yurasstroy.ddns.net/api`
    const [cities, setCities] = useState([])

    useEffect(() => {
        fetch(`${BASE_URL}/cities`)
            .then(response => response.json())
            .then(data => {
                setCities(data)
            })
            .catch(error => {
                console.error("Ошибка при получении данных:", error);
            });

    }), []


    function selectCity(selectedCity) {
        setSelectedCity(selectedCity); // Сохраняем выбранный город в состояние
        setCitiesPopup(false);
        if (filterMark.includes(selectedCity.name)) {
            setFilterMark(filterMark.filter((item) => item !== selectedCity.name));
        } else {
            setFilterMark([...filterMark, selectedCity.name]);
        }

    }

    return (
        <div className="popup-filter" id="popup-city-filter">
            <div className="popup-filter__content">
                <button className="popup-filter__back-button" onClick={() => { setCitiesPopup(false) }}><img src={BackIcon} /></button>
                <h2 className="popup-filter__title">Выберите город</h2>
                <input className="popup-filter__input" id="city-input" placeholder="Поиск" />
                <ul className="popup-filter__cities-list" id="cities-list">
                    {cities.map((city) => (
                        <li key={city.id} className='popup-filter__city' onClick={() => { selectCity(city) }}>{city.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default PopupCitiesFilter
