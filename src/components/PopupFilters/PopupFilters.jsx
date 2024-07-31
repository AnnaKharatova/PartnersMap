import './PopupFilters.css'
import React, { useState, useEffect } from 'react';

function PopupFilters({ setFiltersPopup }) {
    const BASE_URL = `https://yurasstroy.ddns.net/api`
    const [engines, setEngines] = useState([])
    const [partners, setPartners] = useState([])

    useEffect(() => {
        fetch(`${BASE_URL}/tags/`)
            .then(response => response.json())
            .then(data => {
                setPartners(data)
            })
            .catch(error => {
                console.error("Ошибка при получении данных:", error);
            });
    }, [])

    useEffect(() => {
        fetch(`${BASE_URL}/engines/`)
            .then(response => response.json())
            .then(data => {
                setEngines(data)
            })
            .catch(error => {
                console.error("Ошибка при получении данных:", error);
            });
    }, [])

    function submitFilters(e) {
        e.preventDefault()
        console.log('click-click')
        setFiltersPopup(false)
    }

    return (
        <div className="popup-filter" id="popup-city-filter">
            <div className="popup-filter__content">
                <button className="popup-filter__close-button" onClick={() => { setFiltersPopup(false) }}>&times;</button>
                <h2 className="popup-filter__title">Фильтры</h2>
                <form className="popup-filter__form" onSubmit={submitFilters}>
                    <h3>Типы двигателя</h3>
                    <section className="popup-filter__section" id="engines-section">
                        {engines.length > 0&&engines.map((engine) => (
                            <label className="popup-filter__label" htmlFor={`engine-${engine.name.toString().toLowerCase()}`}>
                                <input className="popup-filter__engine-checkbox" type="checkbox" id={`engine-${engine.name.toString().toLowerCase()}`} name={engine.name} value={engine.id} />
                                <span className="popup-filter__label-span">{engine.name}</span>
                            </label>
                        ))}
                    </section>

                    <h3>Партнеры</h3>
                    <section className="popup-filter__section" id="partners-section">
                        {partners.length > 0&&partners.map((tag) => (
                            <label className="popup-filter__label" htmlFor={`partner-${tag.id.toString().toLowerCase()}`}>
                                <input className="popup-filter__partners-checkbox" type="checkbox" id={`partner-${tag.id.toString().toLowerCase()}`} name={tag.name} value={tag.id} />
                                <span className="popup-filter__label-span">{tag.name}</span>
                            </label>
                        ))}
                    </section>

                    <div className="popup-filter__item">
                        <label className="popup-filter__toggle">
                            <input className="popup-filter__input-slider" type="checkbox" id="toggleButton"
                                value="Открыто сейчас" name="Открыто сейчас" />
                            <span className="popup-filter__slider popup-filter__round"></span>
                        </label>
                        <span className="popup-filter__slider-title">Открыто сейчас</span>
                    </div>

                    <button className="popup-filter__submit-button" id="filter-submit-button" type="submit" >Применить</button>
                </form>
            </div>
        </div>
    )
}

export default PopupFilters
