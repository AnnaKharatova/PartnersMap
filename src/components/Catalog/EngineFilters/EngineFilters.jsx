import './EngineFilters.css'
import { useEffect, useState } from 'react'


function EngineFilters() {

    const [engines, setEngines] = useState([])
    const [selectedParts, setSelectedParts] = useState([])
    console.log(selectedParts)

    const BASE_URL = ` http://stroymashdevelop.ddns.net/api`


    const handleEngineCheckboxChange = (event) => {
        const { value, checked, name } = event.target;

        if (checked) {
            setSelectedParts([...selectedParts, value]);

        } else {
            setSelectedParts(selectedParts.filter((part) => part !== value));
        }
    }

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


    return (
        <div className="engine-filters" id="catalog-engines">
            {engines && engines.map((engine) => (
                <label key={engine.id} className="engine-filters__label" htmlFor={`catalog-engine-${engine.name.toString().toLowerCase()}`}>
                    <input onChange={handleEngineCheckboxChange} className="engine-filters__engine-checkbox" type="checkbox" id={`catalog-engine-${engine.name.toString().toLowerCase()}`} name={engine.name} value={engine.id} />
                    <span className="engine-filters__label-span">{engine.name}</span>
                </label>
            ))}
        </div>
    )
}

export default EngineFilters