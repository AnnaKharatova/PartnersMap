import './CatalogItem.css'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function CatalogItem({ item }) {
    const navigate = useNavigate()
    const photo = `http://stroymashdevelop.ddns.net/${item.main_image}`

    function copyArticle() {
        navigator.clipboard.writeText(item.article)
            .then(() => {
                console.log('Article copied to clipboard!');
            })
            .catch(res => {
                if (res.status == 500) {
                    navigate('./error')
                } else {
                    console.log("Ошибка при получении данных:", res.message);
                }
            });
    }

    console.log(item)

    return (
        <div className='catalog-item'>
            <div className='catalog__img-container'>
                <img className='catalog-item__img' src={photo} />
            </div>
            <Link className='catalog-item__title' to={`/catalog/${item.type}/${item.id}`}>{item.name}</Link>
            <div className='catalog-item__article'>
                <p className='catalog-item__articke-p'>{item.article}</p>
                <button className='catalog-item__articke-copy' onClick={copyArticle}></button>
            </div>
            <button className='catalog-item__map-button'>Где купить</button>
        </div>
    )
}

export default CatalogItem