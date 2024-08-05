import './PopupFilters.css'
import React, { useState, useEffect } from 'react';

function PopupFilters({ setFiltersPopup, setAllPartners }) {
    const BASE_URL = `https://yurasstroy.ddns.net/api`
    const [engines, setEngines] = useState([])
    const [tags, setTags] = useState([])
    const [selectedParts, setSelectedParts] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [filteredData, setFilteredData] = useState([])

    const handleEngineCheckboxChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setSelectedParts([...selectedParts, value]);
        } else {
            setSelectedParts(selectedParts.filter(part => part !== value));
        }
    };

    const handleTagsCheckboxChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setSelectedTags([...selectedTags, value]);
        } else {
            setSelectedTags(selectedTags.filter(part => part !== value));
        }
    };

    const handleOpenChange = (event) => {
        const { checked } = event.target;
        if (checked) {
            const opened = getOpenStores(filteredData)
            setAllPartners(opened)
        }
    }


    useEffect(() => {
        fetch(`${BASE_URL}/tags/`)
            .then(response => response.json())
            .then(data => {
                setTags(data)
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
        setFiltersPopup(false);
    }

    useEffect(() => {
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
            console.log('фильтры не выбраны')
        }
    }, [selectedParts, selectedTags])


    function getOpenStores(stores) {
        const currentDate = new Date();
        const currentDay = currentDate.getDay(); // 0 - воскресенье, 6 - суббота
        const currentHour = currentDate.getHours();
        const currentMinute = currentDate.getMinutes();
        return stores.filter(store => {
            let openTime, closeTime;
            if (currentDay === 0) { // Воскресенье
                openTime = store.time_open_sunday;
                closeTime = store.time_close_sunday;
            } else if (currentDay === 6) { // Суббота
                openTime = store.time_open_saturday;
                closeTime = store.time_close_saturday;
            } else { // Будние дни
                openTime = store.time_open_weekdays;
                closeTime = store.time_close_weekdays;
            }
            if (openTime) {
                const [openHour, openMinute] = openTime.split(':').map(Number);
                const [closeHour, closeMinute] = closeTime.split(':').map(Number);
                return (currentHour > openHour || (currentHour === openHour && currentMinute >= openMinute))
                    && (currentHour < closeHour || (currentHour === closeHour && currentMinute < closeMinute));
            }
        });
}

return (
    <div className="popup-filter" id="popup-city-filter">
        <div className="popup-filter__content">
            <button className="popup-filter__close-button" onClick={() => { setFiltersPopup(false) }}>&times;</button>
            <h2 className="popup-filter__title">Фильтры</h2>
            <form className="popup-filter__form" onSubmit={submitFilters}>
                <h3>Типы двигателя</h3>
                <section className="popup-filter__section" id="engines-section">
                    {engines.length > 0 && engines.map((engine) => (
                        <label key={engine.id} className="popup-filter__label" htmlFor={`engine-${engine.name.toString().toLowerCase()}`}>
                            <input onChange={handleEngineCheckboxChange} className="popup-filter__engine-checkbox" type="checkbox" id={`engine-${engine.name.toString().toLowerCase()}`} name={engine.name} value={engine.id} />
                            <span className="popup-filter__label-span">{engine.name}</span>
                        </label>
                    ))}
                </section>

                <h3>Партнеры</h3>
                <section className="popup-filter__section" id="partners-section">
                    {tags.length > 0 && tags.map((tag) => (
                        <label key={tag.id} className="popup-filter__label" htmlFor={`partner-${tag.id.toString().toLowerCase()}`}>
                            <input onChange={handleTagsCheckboxChange} className="popup-filter__partners-checkbox" type="checkbox" id={`partner-${tag.id.toString().toLowerCase()}`} name={tag.name} value={tag.id} />
                            <span className="popup-filter__label-span">{tag.name}</span>
                        </label>
                    ))}
                </section>

                <div className="popup-filter__item">
                    <label className="popup-filter__toggle">
                        <input onClick={handleOpenChange} className="popup-filter__input-slider" type="checkbox" id="toggleButton"
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
