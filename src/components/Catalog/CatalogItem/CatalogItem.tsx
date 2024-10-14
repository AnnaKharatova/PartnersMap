import './CatalogItem.css'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CopyToClipboard } from 'react-copy-to-clipboard';

function CatalogItem({ item }) {
    const navigate = useNavigate()
    const photo = `http://stroymashdevelop.ddns.net${item.main_image}`




    function handleMapFilter() {
        const value = item.engine_cat.id
        const name = item.engine_cat.name
        localStorage.setItem('engineSort', value)
        localStorage.setItem('engineName', name)
        navigate('/')
    }

    return (
        <div className='catalog-item'>

            <div className='catalog__img-container'>
                <img className='catalog-item__img' src={photo} alt='изображение детали' />
            </div>

            <Link className='catalog-item__title' to={`/catalog/${item.type}/${item.id}`}>{item.name}</Link>
            <div className='catalog-item__article'>
                <p className='catalog-item__articke-p'>{item.article}</p>
                <CopyToClipboard text={item.article}>
                    <button className='catalog-item__articke-copy'></button>
                </CopyToClipboard>
            </div>
            <button className='catalog-item__map-button' onClick={handleMapFilter}>Где купить</button>
        </div>
    )
}

export default CatalogItem