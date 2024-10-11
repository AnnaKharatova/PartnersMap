import './CatalogFilters.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../../constants/constants.js'

function CatalogFilters({ maxWidth760, setFilteredData, clearFilters, selectedGroup, setSelectedGroup, selectedEngine, setSelectedEngine }) {
    const navigate = useNavigate()
    const [engines, setEngines] = useState([])
    const [groups, setGroups] = useState([])

    function getFilteredData(selectedGroup, selectedEngine) {
        fetch(`${BASE_URL}/catalog/catalog/?${selectedGroup && `group=${selectedGroup}&`}${selectedEngine && `engine_cat=${selectedEngine}`}`)
            .then(response => response.json())
            .then((data) => {
                setFilteredData(data.result);
            }).catch(res => {
                if (res.status == 500) {
                    navigate('./error')
                } else {
                    console.log("Ошибка при получении данных:", res.message);
                }
            });
    }

    const handleRadioEnginesChange = (event) => {
        const value = event.target.value;
        const name = event.target.name
        setSelectedEngine(value);
        getFilteredData(selectedGroup, value)

    };

    const handleRadioGroupChange = (event) => {
        const value = event.target.value;
        const name = event.target.name
        setSelectedGroup(value);
        getFilteredData(value, selectedEngine)
    };

    useEffect(() => {
        fetch(`${BASE_URL}/catalog/engine/`)
            .then(response => response.json())
            .then(data => {
                setEngines(data)
            })
            .catch(res => {
                if (res.status == 500) {
                    navigate('./error')
                } else {
                    console.log("Ошибка при получении данных:", error);
                }
            });
    }, [])

    useEffect(() => {
        fetch(`${BASE_URL}/catalog/group/`)
            .then(response => response.json())
            .then(data => {
                setGroups(data.reverse())
            })
            .catch(res => {
                if (res.status == 500) {
                    navigate('./error')
                } else {
                    console.log("Ошибка при получении данных:", error);
                }
            });
    }, [])

    return (
        <div className='catalog-filters'>
            {maxWidth760 && <h3 className='popup-filter__subtitle'>Типы Двигателя</h3>}

            <div className="catalog-filters__engine" id="catalog-engines">

                <>
                    <input
                        className='catalog-filters__engine-checkbox'
                        type="radio"
                        id='all-engines'
                        name="engines"
                        value=''
                        onChange={handleRadioEnginesChange}
                        onClick={clearFilters}
                    />
                    <label className='catalog-filters__engine-label' htmlFor='all-engines'>Вся продукция</label>
                </>
                {engines.map((engine) => (
                    <>
                        <input
                            key={engine.name}
                            className='catalog-filters__engine-checkbox'
                            type="radio"
                            id={`engine-${engine.id}`}
                            name="engines"
                            value={engine.id}
                            onChange={handleRadioEnginesChange}
                        />
                        <label className='catalog-filters__engine-label' htmlFor={`engine-${engine.id}`}>{engine.name}</label>
                    </>
                ))}
            </div>
            {maxWidth760 && <h3 className='popup-filter__subtitle'>Продукция завода</h3>}

            <div className="catalog-filters__group" id="catalog-group">
                {groups.map((group) => (
                    <>
                        <input
                            key={group.name}
                            className='catalog-filters__group-checkbox'
                            type="radio"
                            id={`group-${group.id}`}
                            name="group"
                            value={group.id}
                            onChange={handleRadioGroupChange}
                        />
                        <label className='catalog-filters__group-label' htmlFor={`group-${group.id}`}>{group.name}</label>
                    </>
                ))}
            </div>
        </div>
    )
}

export default CatalogFilters