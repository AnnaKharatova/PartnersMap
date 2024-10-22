import React from "react";
import "./PartnerDetails.css";
import PartnerPhoto from "../../images/PartnerPhoto.png";

const PartnerDetails = ({
  partner,
  setPartnerInfo,
  maxWidth760,
  setStore,
  setPopupPartnersListOpen,
}) => {
  function handleRouteButton() {
    setStore(partner);
    if (maxWidth760) {
      setPartnerInfo(null);
    }
    if (setPopupPartnersListOpen) {
      setPopupPartnersListOpen(false);
    }
  }

  const handlePhoneClick = (e) => {
    e.preventDefault();
    if (navigator.userAgent.match(/Android|iPhone|iPad|iPod/i)) {
      window.location.href = `tel:${partner.phone}`;
    } else {
      window.location.href = `https://wa.me/${partner.phone}`;
    }
  };

  return (
    <div className="partner-details">
      <button
        className="partner-details__back-button"
        onClick={() => {
          setPartnerInfo(null);
        }}
      >
        Все партнеры
      </button>
      <img
        className="partner-details__photo"
        alt="Фото точки продаж"
        src={PartnerPhoto}
      />
      <p className="partner-details__engines">
        {partner.parts_available.map((part, index) => (
          <React.Fragment key={part.id}>
            {part.name}
            {index < partner.parts_available.length - 1 && (
              <span className="partner-details__engines-dot"></span>
            )}
          </React.Fragment>
        ))}
      </p>
      <h2 className="partner-details__name">{partner.name}</h2>
      <div className="partner-details__tags">
        {partner.tags.map((part) => (
          <p className="partner-details__tag">{part.name}</p>
        ))}
      </div>
      <p className="partner-details__address">{partner.address}</p>
      <div className="partner-details__contacts">
        {partner.phone && (
          <a
            href="#"
            className="partner-details__phone"
            onClick={handlePhoneClick}
          >
            {partner.phone}
          </a>
        )}
        {partner.website && (
          <a
            href={partner.website}
            className="partner-details__website"
            target="_blank"
          >
            {partner.website}
          </a>
        )}
      </div>
      <div className="partner-details__block">
        {partner.time_open_weekdays ||
        partner.time_open_saturday ||
        partner.time_open_sunday ? (
          <div className="partner-details__open">
            {partner.time_open_weekdays ? (
              <p className="partner-details__open-time">
                c {partner.time_open_weekdays} до {partner.time_close_weekdays}
              </p>
            ) : (
              <p></p>
            )}
            {partner.time_open_saturday ? (
              <p className="partner-details__open-time">
                cб: {partner.time_open_saturday} - {partner.time_close_saturday}
              </p>
            ) : (
              <p></p>
            )}
            {partner.time_open_sunday ? (
              <p className="partner-details__open-time">
                воскр: {partner.time_open_sunday} - {partner.time_close_sunday}
              </p>
            ) : (
              <p></p>
            )}
          </div>
        ) : (
          <p></p>
        )}
        <button
          className="partner-details__route-button "
          onClick={handleRouteButton}
        >
          Маршрут
        </button>
      </div>
    </div>
  );
};

export default PartnerDetails;
