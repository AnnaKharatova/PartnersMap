import './CatalogFilters.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../../constants/constants.js'

function CatalogFilters({
    handleSubmit,
    maxWidth760,
    clearFilters,
    selectedGroup,
    setSelectedGroup,
    selectedEngine,
    setSelectedEngine
}) {
    const navigate = useNavigate()
    const [engines, setEngines] = useState([])
    const [groups, setGroups] = useState([])

    const handleEngineCheckboxChange = (event) => {
        const { value } = event.target;
        setSelectedEngine(value || null);
        handleSubmit(1);
    };

    const handleGroupCheckboxChange = (event) => {
        const { value } = event.target;
        setSelectedGroup(value || null);
        handleSubmit(1);
    };

    function clearAll() {
        setSelectedEngine(null);
        setSelectedGroup(null);
        clearFilters();
        handleSubmit(1);
    }

    useEffect(() => {
        fetch(`${BASE_URL}/catalog/engine/`)
            .then(response => response.json())
            .then(data => {
                setEngines(data)
            })
            .catch(error => {
                console.log("Ошибка при получении данных:", error.message);
                if (error.status === 500) {
                    navigate('./error')
                }
            });
    }, [])

    useEffect(() => {
        fetch(`${BASE_URL}/catalog/group/`)
            .then(response => response.json())
            .then(data => {
                setGroups(data)
            })
            .catch(error => {
                console.log("Ошибка при получении данных:", error.message);
                if (error.status === 500) {
                    navigate('./error')
                }
            });
    }, [])
    return (
        <div className='catalog-filters'>
            {maxWidth760 && <h3 className='catalog-popup__subtitle'>Тип двигателя</h3>}
            <div className="catalog-filters__engine" id="catalog-engines">
                <div>
                    <input
                        className='catalog-filters__engine-checkbox'
                        type="radio"
                        name="engines"
                        id='engine-all'
                        value=''
                        onChange={clearAll}
                        onClick={clearAll} // Добавлено
                        checked={!selectedEngine}
                    />
                    <label className='catalog-filters__engine-label' htmlFor='engine-all'>Вся продукция</label>
                </div>
                {engines.map((engine) => (
                    <div key={engine.id}>
                        <input
                            className='catalog-filters__engine-checkbox'
                            type="radio"
                            id={`engine-${engine.id}`}
                            name="engines"
                            value={engine.id}
                            onChange={handleEngineCheckboxChange}
                            checked={selectedEngine == engine.id}
                        />
                        <label className='catalog-filters__engine-label' htmlFor={`engine-${engine.id}`}>{engine.name}</label>
                    </div>
                ))}
            </div>
            {maxWidth760 && <h3 className='catalog-popup__subtitle'>Продукция завода</h3>}
            <div className="catalog-filters__group" id="catalog-group">
                {groups.map((group) => (
                    <div key={group.id}>
                        <input
                            className='catalog-filters__group-checkbox'
                            type="radio"
                            id={`group-${group.id}`}
                            name="group"
                            value={group.id}
                            onChange={handleGroupCheckboxChange}
                            checked={selectedGroup == group.id}
                        />
                        <label className='catalog-filters__group-label' htmlFor={`group-${group.id}`}>{group.name}</label>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CatalogFilters