import React from 'react';
import './NothingFoundInCity.css'
import SadFace from '../../images/Icon-sadFace.svg'

const NothingFoundInCity = () => {

    return (
        <div className='no-content__container'>
            <img className='no-content__image' alt='sad face' src={SadFace} />
            <h3 className='no-content__title'>Ничего не нашлось</h3>
            <p className='no-content__text'>В этом городе нет наших официальных представителей</p>
        </div>
    );
};
export default NothingFoundInCity;