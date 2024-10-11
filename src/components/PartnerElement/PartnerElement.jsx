import React from 'react';
import './PartnerElement.css'

const PartnerElement = ({ partner, setStore, setSelectedPartner, setPopupPartnersListOpen }) => {

    const tagsArray = partner.tags

    function handleClick() {
        setSelectedPartner(partner)
        if (setPopupPartnersListOpen) {
            setPopupPartnersListOpen(false)
        }
    }

    function handleRouteButton() {
        setStore(partner)
        if (setPopupPartnersListOpen) {
            setPopupPartnersListOpen(false)
        }
    }

    const handlePhoneClick = () => {
        e.preventDefault()
        if (navigator.userAgent.match(/Android|iPhone|iPad|iPod/i)) {
            window.location.href = `tel:${partner.phone}`;
        } else {
            window.location.href = `https://wa.me/${partner.phone}`;
        }
    };

    return (
        <li className='partner' onClick={handleClick}>
            <p className='partner__engines'> {partner.parts_available.map((part, index) => (
                <React.Fragment key={index}>
                    {part.name}
                    {index < partner.parts_available.length - 1 && <span className='partner__engines-dot'></span>}
                </React.Fragment>
            ))}</p>
            <h2 className='partner__name'>{partner.name}</h2>
            <p className='partner__engines'> {tagsArray.map((part, index) => (
                <React.Fragment key={index}>
                    {part.name}
                    {index < tagsArray.length - 1 && <span className='partner__engines-dot'></span>}
                </React.Fragment>
            ))}</p>
            <p className='partner__address'>{partner.address}</p>
            <div className='partner__block'>
                <div className='partner__contacts'>
                    {partner.phone && <a href='#' className="partner__phone" onClick={handlePhoneClick}>{partner.phone}</a>}
                    {partner.website && <a href={partner.website} className="partner__website" target="_blank">{partner.website}</a>}
                </div>
                {partner.time_open_weekdays || partner.time_open_saturday || partner.time_open_sunday ?
                    <div className='partner__open'>
                        {partner.time_open_weekdays ? <p className='partner__open-time'>c {partner.time_open_weekdays} до {partner.time_close_weekdays}</p> : <p></p>}
                        {partner.time_open_saturday ? <p className='partner__open-time'>cб: {partner.time_open_saturday} - {partner.time_close_saturday}</p> : <p></p>}
                        {partner.time_open_sunday ? <p className='partner__open-time'>воскр: {partner.time_open_sunday} - {partner.time_close_sunday}</p> : <p></p>}
                    </div> : <p></p>
                }
                <button className="route-button" onClick={handleRouteButton}>Маршрут</button>
            </div>
        </li >
    );
};

export default PartnerElement;