import React, { useState, useEffect, useRef } from 'react';
import './PartnerDetails.css'
import PartnerPhoto from '../../images/PartnerPhoto.png'

const PartnerDetails = ({ partner, setPartnerInfo, setStore }) => {

    function handleRouteButton() {
        setStore(partner)
    }


    return (
        <div className='partner-details'>
            <button className="partner-details__back-button" onClick={() => { setPartnerInfo(null) }}>Все партнеры</button>
            <img className='partner-details__photo' alt='Пример фото партнера' src={PartnerPhoto} />
            <p className='partner-details__engines'>
                {partner.parts_available.map((part, index) => (
                    <React.Fragment key={part.id}>
                        {part.name}
                        {index < partner.parts_available.length - 1 && <span className='partner-details__engines-dot'></span>}
                    </React.Fragment>
                ))}</p>
            <h2 className='partner__name'>{partner.name}</h2>
            <p className='partner-details__address'>{partner.address}</p>
            <div className='partner-details__contacts'>
                <a href={partner.phone} className="partner__phone">{partner.phone}</a>
                <a href={partner.website} className="partner__website" target="_blank">{partner.website}</a>
            </div>
            <div className='partner-details__block'>
                {partner.time_open_weekdays || partner.time_open_saturday || partner.time_open_sunday ?
                    <div className='partner__open'>
                        {partner.time_open_weekdays ? <p className='partner__open-time'>c {partner.time_open_weekdays} до {partner.time_close_weekdays}</p> : <p></p>}
                        {partner.time_open_saturday ? <p className='partner__open-time'>cб: {partner.time_open_saturday} - {partner.time_close_saturday}</p> : <p></p>}
                        {partner.time_open_sunday ? <p className='partner__open-time'>воскр: {partner.time_open_sunday} - {partner.time_close_sunday}</p> : <p></p>}
                    </div> : <p></p>
                }
                <button className="route-button" onClick={handleRouteButton}>Маршрут</button>
            </div>
        </div>
    );
};

export default PartnerDetails;