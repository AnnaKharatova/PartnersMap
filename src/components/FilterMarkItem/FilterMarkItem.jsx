import './FilterMarkItem.css'
import React from 'react';

function FilterMarkItem({ item, deleteMarkItem }) {

    function handleMarkItem() {
        deleteMarkItem(item)
    }

    return (
        <li className='filter-marker'>
            <div className="filter-marker__label-span" id="popup-city-filter">{item}</div>
            <button className='filter-marker__del-button' onClick={handleMarkItem}>&times;</button>
        </li>
    )
}

export default FilterMarkItem
