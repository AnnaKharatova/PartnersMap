import "./CatalogFilters.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../constants/constants.js";

function CatalogFilters({
  handleSubmit,
  maxWidth760,
  selectedGroup,
  setSelectedGroup,
  selectedEngine,
  setSelectedEngine,
  filterMark,
  setFilterMark,
  storagedEngineId,
}) {
  const navigate = useNavigate();
  const [engines, setEngines] = useState([]);
  const [groups, setGroups] = useState([]);

  const handleEngineCheckboxChange = (event) => {
    localStorage.clear();
    const { value, checked, name } = event.target;
    if (checked) {
      setSelectedEngine([...selectedEngine, value]);

      if (filterMark.includes(name)) {
        setFilterMark(filterMark.filter((item) => item !== name));
      } else {
        setFilterMark([...filterMark, name]);
      }
    } else {
      setSelectedEngine(selectedEngine.filter((part) => part !== value));
      setFilterMark(filterMark.filter((item) => item !== name));
    }
  };

  const handleGroupCheckboxChange = (event) => {
    localStorage.clear();
    const { value, checked, name } = event.target;
    if (checked) {
      setSelectedGroup([...selectedGroup, value]);
      if (filterMark.includes(name)) {
        setFilterMark(filterMark.filter((item) => item !== name));
      } else {
        setFilterMark([...filterMark, name]);
      }
    } else {
      setSelectedGroup(selectedGroup.filter((part) => part !== value));
      setFilterMark(filterMark.filter((item) => item !== name));
    }
  };

  useEffect(() => {
    if (!storagedEngineId&&!maxWidth760) {
      if (selectedGroup || selectedEngine) {
        handleSubmit(1);
      }
    }
  }, [selectedGroup, selectedEngine, storagedEngineId, maxWidth760]);

  /* useEffect(()=> {
    if (!storagedEngineId&&maxWidth760) {
        handleSubmit(1);
    }
  }, [maxWidth760]) */

  useEffect(() => {
    fetch(`${BASE_URL}/catalog/engine/`)
      .then((response) => response.json())
      .then((data) => {
        setEngines(data);
      })
      .catch((error) => {
        console.log("Ошибка при получении данных:", error.message);
        if (error.status === 500) {
          navigate("./error");
        }
      });
  }, []);

  useEffect(() => {
    fetch(`${BASE_URL}/catalog/group/`)
      .then((response) => response.json())
      .then((data) => {
        setGroups(data);
      })
      .catch((error) => {
        console.log("Ошибка при получении данных:", error.message);
        if (error.status === 500) {
          navigate("./error");
        }
      });
  }, []);

  return (
    <div className="catalog-filters">
      {maxWidth760 && (
        <h3 className="catalog-popup__subtitle">Тип двигателя</h3>
      )}
      <div className="catalog-filters__engine" id="catalog-engines">
        {engines.map((engine) => (
          <label
            key={`engine-${engine.id}`}
            htmlFor={`engine-${engine.name.toString().toLowerCase()}`}
          >
            <input
              checked={filterMark.includes(engine.name)}
              onChange={handleEngineCheckboxChange}
              className="catalog-filters__engine-checkbox"
              type="checkbox"
              id={`engine-${engine.name.toString().toLowerCase()}`}
              name={engine.name}
              value={engine.id}
            />
            <span className="catalog-filters__engine-label">{engine.name}</span>
          </label>
        ))}
      </div>
      {maxWidth760 && (
        <h3 className="catalog-popup__subtitle">Продукция завода</h3>
      )}
      <div className="catalog-filters__group" id="catalog-group">
        {groups.map((group) => (
          <label
            key={`group-${group.id}`}
            htmlFor={`group-${group.name.toString().toLowerCase()}`}
          >
            <input
              checked={filterMark.includes(group.name)}
              onChange={handleGroupCheckboxChange}
              className="catalog-filters__group-checkbox"
              type="checkbox"
              id={`group-${group.name.toString().toLowerCase()}`}
              name={group.name}
              value={group.id}
            />
            <span className="catalog-filters__group-label">{group.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default CatalogFilters;
