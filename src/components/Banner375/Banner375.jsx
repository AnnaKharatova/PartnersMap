import React, { useState, useEffect, useRef } from 'react';
import './Banner375.css'
import Banner from '../../images/Banner-375.png'

const Banner375 = ({setBanner375Open}) => {

    const windowHeight = window.innerHeight;

// Определение высоты документа
const documentHeight = document.documentElement.clientHeight;

// Определение координаты нижнего края окна
const bottomEdge = window.scrollY + window.innerHeight;

// Вывод результатов
console.log("Высота окна:", windowHeight);
console.log("Высота документа:", documentHeight);
console.log("Координата нижнего края окна:", bottomEdge);

    return (
        <div className='banner__container'>
            <button className="banner__close-button" onClick={() => { setBanner375Open(false) }}>&times;</button>
            <img className='banner__image' alt='рекламный баннер' src={Banner} />
        </div>
    );
};

export default Banner375;