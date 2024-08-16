import React, { useState, useEffect, useRef } from 'react';
import './Banner375.css'
import Banner from '../../images/Banner-375.png'

const Banner375 = ({setBanner375Open}) => {

      return (
        <div className='banner__container'>
            <button className="banner__close-button" onClick={() => { setBanner375Open(false) }}>&times;</button>
            <img className='banner__image' alt='баннер' src={Banner} />
        </div>
    );
};

export default Banner375;