import "./InfoBlock.css";
import React, { useState, useEffect, useRef } from "react";
import PackLogo from '../../images/2.0/logo_pack.png'
import QRLogo from '../../images/2.0/logo_qr-code.png'
import UVLogo from '../../images/2.0/logo_uv.png'

function InfoBlock({setOpenForm}) {

    function getCatalog() {
        setOpenForm(true)
    }

    return (
        <section className="info">
            <h2 className="info__title">"Строймаш" гарантирует защиту от подделок и контрафакта.</h2>
            <h3 className="info__subtitle">Помните о трёх важных аспектах защиты:</h3>
            <ul className="info__list">
                <li className="info__item">
                    <img className="info__item-img" src={PackLogo} />
                    <p className="info__item-text">Детали «Строймаш» поставляются только в фирменной упаковке и маркируются товарным знаком</p>
                </li>
                <li className="info__item">
                    <img className="info__item-img" src={QRLogo} />
                    <p className="info__item-text" style={{marginTop: '7px'}}>Проверьте подлинность изделий по QR-коду на упаковке через приложение «Строймаш Коннект»</p>
                </li>
                <li className="info__item">
                    <img className="info__item-img" src={UVLogo}/>
                    <p className="info__item-text">Только настоящие изделия «Строймаш» светятся в ультрафиолетовом свете.</p>
                </li>
            </ul>
            <div className="info__catalog" id='catalog'>
                <p className="info__catalog-text">Мы отправим вам наш фирменный каталог по почте.</p>
                <button className="info__catalog-button" onClick={getCatalog}>Получить каталог</button>
            </div>
        </section>
    )
}

export default InfoBlock