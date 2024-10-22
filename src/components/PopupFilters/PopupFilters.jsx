import "./PopupFilters.css";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constants/constants";

function PopupFilters({
  setPartnerInfo,
  engines,
  setEngines,
  tags,
  setTags,
  filteredData,
  setFilteredData,
  setFiltersPopup,
  getQuery,
  setFilterMark,
  filterMark,
  selectedTags,
  setSelectedTags,
  selectedParts,
  setSelectedParts,
}) {
  const navigate = useNavigate();

  const handleEngineCheckboxChange = (event) => {
    const { value, checked, name } = event.target;
    if (checked) {
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
  };

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
      setSelectedTags(selectedTags.filter((part) => part !== value));
      setFilterMark(filterMark.filter((item) => item !== name));
    }
  };

  const handleOpenChange = (event) => {
    const { checked } = event.target;
    if (checked) {
      const opened = getOpenStores(filteredData);
      setFilteredData(opened);
    }
  };

  useEffect(() => {
    fetch(`${BASE_URL}/tags/`)
      .then((response) => response.json())
      .then((data) => {
        setTags(data);
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
    fetch(`${BASE_URL}/engines/`)
      .then((response) => response.json())
      .then((data) => {
        setEngines(data);
      })
      .catch((res) => {
        if (res.status == 500) {
          navigate("./error");
        } else {
          console.log("Ошибка при получении данных:", res.message);
        }
      });
  }, []);

  function submitFilters(e) {
    e.preventDefault();
    setFiltersPopup(false);
    getQuery();
    setPartnerInfo(null);
  }

  function getOpenStores(stores) {
    const currentDate = new Date();
    const currentDay = currentDate.getDay(); // 0 - воскресенье, 6 - суббота
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();
    return stores.filter((store) => {
      let openTime, closeTime;
      if (currentDay === 0) {
        // Воскресенье
        openTime = store.time_open_sunday;
        closeTime = store.time_close_sunday;
      } else if (currentDay === 6) {
        // Суббота
        openTime = store.time_open_saturday;
        closeTime = store.time_close_saturday;
      } else {
        // Будние дни
        openTime = store.time_open_weekdays;
        closeTime = store.time_close_weekdays;
      }
      if (openTime) {
        const [openHour, openMinute] = openTime.split(":").map(Number);
        const [closeHour, closeMinute] = closeTime.split(":").map(Number);
        return (
          (currentHour > openHour ||
            (currentHour === openHour && currentMinute >= openMinute)) &&
          (currentHour < closeHour ||
            (currentHour === closeHour && currentMinute < closeMinute))
        );
      }
    });
  }

  return (
    <div className="popup-filter" id="popup-city-filter">
      <div className="popup-filter__content">
        <h2 className="popup-filter__title">Фильтры</h2>
        <form className="popup-filter__form" onSubmit={submitFilters}>
          <h3 className="popup-filter__subtitle">Тип двигателя</h3>
          <section className="popup-filter__section" id="engines-section">
            {engines.length > 0 &&
              engines.map((engine) => (
                <label
                  key={engine.id}
                  className="popup-filter__label"
                  htmlFor={`engine-${engine.name.toString().toLowerCase()}`}
                >
                  <input
                    checked={filterMark.includes(engine.name)}
                    onChange={handleEngineCheckboxChange}
                    className="popup-filter__engine-checkbox"
                    type="checkbox"
                    id={`engine-${engine.name.toString().toLowerCase()}`}
                    name={engine.name}
                    value={engine.id}
                  />
                  <span className="popup-filter__label-span">
                    {engine.name}
                  </span>
                </label>
              ))}
          </section>

          <h3 className="popup-filter__subtitle">Партнеры завода</h3>
          <section className="popup-filter__section" id="partners-section">
            {tags.length > 0 &&
              tags.map((tag) => (
                <label
                  key={tag.id}
                  className="popup-filter__label"
                  htmlFor={`partner-${tag.id.toString().toLowerCase()}`}
                >
                  <input
                    checked={filterMark.includes(tag.name)}
                    onChange={handleTagsCheckboxChange}
                    className="popup-filter__partners-checkbox"
                    type="checkbox"
                    id={`partner-${tag.id.toString().toLowerCase()}`}
                    name={tag.name}
                    value={tag.id}
                  />
                  <span className="popup-filter__label-span">{tag.name}</span>
                </label>
              ))}
          </section>

          {/* <div className="popup-filter__item">
            <label className="popup-filter__toggle">
              <input
                onClick={handleOpenChange}
                className="popup-filter__input-slider"
                type="checkbox"
                id="toggleButton"
                value="Открыто сейчас"
                name="Открыто сейчас"
              />
              <span className="popup-filter__slider popup-filter__round"></span>
            </label>
            <span className="popup-filter__slider-title">Открыто сейчас</span>
          </div> */}

          <button
            className="popup-filter__submit-button"
            id="filter-submit-button"
            type="submit"
          >
            Готово
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupFilters;
