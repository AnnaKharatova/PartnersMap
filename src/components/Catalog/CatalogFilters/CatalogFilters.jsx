import './CatalogFilters.css'
import { useEffect, useState } from 'react'

function CatalogFilters() {
    const BASE_URL = ` http://stroymashdevelop.ddns.net/api`

    const [engines, setEngines] = useState([])
    const [selectedParts, setSelectedParts] = useState([])
    const [groups, setGroups] = useState([])
    const [selectedEngine, setSelectedEngine] = useState(null);
    const [selectedGrour, setSelectedGroup] = useState(null);

    console.log(selectedEngine)
    console.log(selectedGrour)


    const handleRadioEnginesChange = (event) => {
        const value = event.target.value;
        setSelectedEngine(value);
    };

    const handleRadioGroupChange = (event) => {
        const value = event.target.value;
        setSelectedGroup(value);
    };

    useEffect(() => {
        fetch(`${BASE_URL}/catalog/engines/`)
            .then(response => response.json())
            .then(data => {
                setEngines(data)
            })
            .catch(error => {
                console.error("Ошибка при получении данных:", error);
            });
    }, [])

    useEffect(() => {
        fetch(`${BASE_URL}/catalog/groups/`)
            .then(response => response.json())
            .then(data => {
                setGroups(data)
            })
            .catch(error => {
                console.error("Ошибка при получении данных:", error);
            });
    }, [])

    return (
        <div className='catalog-filters'>
            <div className="catalog-filters__engine" id="catalog-engines">
                {engines.map((engine) => (
                    <>
                        <input
                            key={`engine-key-${engine.name}`}
                            className='catalog-filters__engine-checkbox'
                            type="radio"
                            id={`engine-${engine.id}`}
                            name="radioGroup"
                            value={engine.id}
                            onChange={handleRadioEnginesChange}
                        />
                        <label className='catalog-filters__engine-label' htmlFor={`engine-${engine.id}`}>{engine.name}</label>
                    </>
                ))}
            </div>
            <div className="catalog-filters__group" id="catalog-group">
                {groups.map((group) => (
                    <>
                        <input
                            key={`group-key-${group.name}`}
                            className='catalog-filters__group-checkbox'
                            type="radio"
                            id={`group-${group.id}`}
                            name="radioGroup"
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