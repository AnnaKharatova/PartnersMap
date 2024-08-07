import './PopupFilters.css'
import React, { useState, useEffect } from 'react';

function PopupFilters({ engines, setEngines, tags, setTags, filteredData, setFilteredData, setFiltersPopup, getQuery, setFilterMark, filterMark, selectedTags, setSelectedTags, selectedParts, setSelectedParts }) {
    const BASE_URL = `https://yurasstroy.ddns.net/api`

    const [allEnginesChecked, setAllEnginesChecked] = useState(true)

    const handleEngineCheckboxChange = (event) => {
        const { value, checked, name } = event.target;

        if (checked) {
            setAllEnginesChecked(false)
            setSelectedParts([...selectedParts, value]);
            if (filterMark.includes(name)) {
                setFilterMark(filterMark.filter((item) => item !== name));
            } else {
                setFilterMark([...filterMark, name]);
            }
        } else {
            setSelectedParts(selectedParts.filter((part) => part !== value));
            setFilterMark(filterMark.filter((item) => item !== name));
        }
    }

    const handleTagsCheckboxChange = (event) => {
        const { value, checked, name } = event.target;
        if (checked) {
            setSelectedTags([...selectedTags, value]);
            if (filterMark.includes(name)) {
                setFilterMark(filterMark.filter((item) => item !== name));
            } else {
                setFilterMark([...filterMark, name]);
            }
        } else {
            setSelectedTags(selectedTags.filter(part => part !== value));
            setFilterMark(filterMark.filter((item) => item !== name));
        }
    };

    const handleOpenChange = (event) => {
        const { checked } = event.target;
        if (checked) {
            const opened = getOpenStores(filteredData)
            setFilteredData(opened)
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
        getQuery()
    }

    /* function handleAllEngines(event) {
        const { value, checked } = event.target;
        if (allEnginesChecked) {
            setSelectedParts([...value]);
            setAllEnginesChecked(false)
        } else {
            setAllEnginesChecked(true)
        }
    } */


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
                    <h3 className='popup-filter__subtitle'>Типы двигателя</h3>
                    <section className="popup-filter__section" id="engines-section">
                        {/*<label className="popup-filter__label" htmlFor='all-engines'>
                            <input checked={allEnginesChecked} onChange={handleAllEngines} className="popup-filter__partners-checkbox" type="checkbox" id='all-engines' name='all-engines' value={engines.map((engine) => (engine.id))} />
                            <span className="popup-filter__label-span">Все</span>
                        </label>*/}
                        {engines.length > 0 && engines.map((engine) => (
                            <label key={engine.id} className="popup-filter__label" htmlFor={`engine-${engine.name.toString().toLowerCase()}`}>
                                <input checked={filterMark.includes(engine.name)} onChange={handleEngineCheckboxChange} className="popup-filter__engine-checkbox" type="checkbox" id={`engine-${engine.name.toString().toLowerCase()}`} name={engine.name} value={engine.id} />
                                <span className="popup-filter__label-span">{engine.name}</span>
                            </label>
                        ))}
                    </section>

                    <h3 className='popup-filter__subtitle'>Партнеры</h3>
                    <section className="popup-filter__section" id="partners-section">
                        {tags.length > 0 && tags.map((tag) => (
                            <label key={tag.id} className="popup-filter__label" htmlFor={`partner-${tag.id.toString().toLowerCase()}`}>
                                <input checked={filterMark.includes(tag.name)} onChange={handleTagsCheckboxChange} className="popup-filter__partners-checkbox" type="checkbox" id={`partner-${tag.id.toString().toLowerCase()}`} name={tag.name} value={tag.id} />
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
