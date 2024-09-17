import React, { useState, useEffect, useRef } from 'react';
import '../NothingFoundInCity/NothingFoundInCity.css'
import EmptySearch from '../../images/Icon-no-found.svg'

const NothingFoundInFilter = ({clearFilters}) => {

    function handleClick() {
        clearFilters()
    }

    return (
        <div className='no-content__container'>
            <img className='no-content__image-loop' alt='ничего не найдено' src={EmptySearch} />
            <h3 className='no-content__title'>Ничего не нашлось</h3>
            <p className='no-content__text'>Попробуйте изменить или очистить фильтры</p>
            <button className="no-content__clear-button" onClick={handleClick}>Очистить фильтры</button>
        </div>
    );
};
export default NothingFoundInFilter;