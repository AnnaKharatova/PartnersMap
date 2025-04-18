import "./InfoBlock.css";
import React from "react";
import PackLogo from '../../images/2.0/logo_pack.png'
import QRLogo from '../../images/2.0/logo_qr-code.png'
import UVLogo from '../../images/2.0/logo_uv.png'
import Catalog from '../../images/2.0/catalog.png'

function InfoBlock({ setOpenForm, maxWidth760 }) {

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
                    <img className="info__item-img" style={{width: maxWidth760 ? '60px' : '90px'}} src={QRLogo} />
                    <p className="info__item-text" style={{ marginTop: '7px' }}>Проверьте подлинность изделий по QR-коду на упаковке через приложение «Строймаш Коннект»</p>
                </li>
                <li className="info__item">
                    <img className="info__item-img" style={{width: maxWidth760 ? '60px' : '110px'}}  src={UVLogo} />
                    <p className="info__item-text">Только настоящие изделия «Строймаш» светятся в ультрафиолетовом свете.</p>
                </li>
            </ul>
            <div className="info__catalog">
                <div className="info__catalog-block" id='catalog'>
                    <p className="info__catalog-text">Мы отправим вам наш фирменный каталог по почте.</p>
                    <button className="info__catalog-button" onClick={getCatalog}>Получить каталог</button>
                </div>
                <img className="info__catalog-img" alt='Каталог Строймаш' src={Catalog} />
            </div>

        </section>
    )
}

export default InfoBlock