import './CatalogItem.css'
import React from 'react'
import { Link } from 'react-router-dom'

function CatalogItem({ item }) {

    const BASE_URL = ` http://stroymashdevelop.ddns.net/api`
    const photo = `http://stroymashdevelop.ddns.net/${item.main_image}`

    function copyArticle() {
        navigator.clipboard.writeText(item.article)
            .then(() => {
                console.log('Article copied to clipboard!');
            })
            .catch((error) => {
                console.error('Failed to copy article to clipboard:', error);
            });
    }

    return (
        <div className='catalog-item'>
            <div className='catalog__img-container'>
                <img className='catalog-item__img' src={photo} />
            </div>
            <Link className='catalog-item__title' to={`/catalog/${item.id}`}>{item.name}</Link>
            <div className='catalog-item__article'>
                <p className='catalog-item__articke-p'>{item.article}</p>
                <button className='catalog-item__articke-copy' onClick={copyArticle}></button>
            </div>
            <button className='catalog-item__map-button'>Где купить</button>
        </div>
    )
}

export default CatalogItem