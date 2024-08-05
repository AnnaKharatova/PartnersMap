import './FilterMarkItem.css'
import React, { useState, useEffect } from 'react';

function FilterMarkItem({ item, deleteMarkItem }) {

    function handleMarkItem(){
        deleteMarkItem(item)
    }

    return (
        <li className='filter-marker'>
            <div className="filter-marker__label-span" id="popup-city-filter">{item}</div>
            <button className='filter-marker__del-button' onClick={handleMarkItem}>x</button>
        </li>
    )
}

export default FilterMarkItem
