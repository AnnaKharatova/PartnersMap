import './ElementPage.css'
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import BurgerMenu from '../BurgerMenu/BurgerMenu'
import Footer from '../Footer/Footer';
import MyInput from '../Catalog/MyInput/MyInput';
import RepairKitComplect from './RepairKitComplect/RepairKitComplect';
import { BASE_URL } from '../../constants/constants';

function ElementPage({ maxWidth760 }) {

    const navigate = useNavigate()
    const { type, id } = useParams();

    const [repairKit, setRepairKit] = useState()
    const [element, setElement] = useState()
    const [openInput, setOpenInput] = useState(false)
    const [burgerMenuOpen, setBurgerMenuOpen] = useState(false)
    const [mainImage, setMainImage] = useState()

    useEffect(() => {
        if (type == 'repair_kit') {
            setRepairKit(true)
        } else if (type == 'spare_part') {
            setRepairKit(false)
        }
    }, [type])

    function copyArticle() {
        navigator.clipboard.writeText(element.article)
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

    function getElement() {
        fetch(`${BASE_URL}/catalog/${type}/${id}/`)
            .then(res => res.json())
            .then(resData => {
                const fetchedData = JSON.parse(JSON.stringify(resData))
                setElement(fetchedData)
            }).catch(res => {
                if (res.status == 500) {
                    navigate('./error')
                } else {
                    console.log("Ошибка при получении данных:", res.message);
                }
            });
    }

    useEffect(() => {
        getElement()
    }, [])

    useEffect(() => {
        if (element) {
            setMainImage(element.images[0].image)
        }
    }, [element])

    if (!element) return;
    return (
        <>
            <Header maxWidth760={maxWidth760} setBurgerMenuOpen={setBurgerMenuOpen} showTitle={false} catalog={true} />
            <main className='element'>
                <div className='element__header'>
                    {!repairKit ? <p className='element__road'>{`Каталог продукции / ${element.engine_cat.name} / ${type} / ${element.name}`}</p>
                        : <p className='element__road'>{`Каталог продукции / ${element.engine_cat.name} / Ремкомплекты / ${element.name}`}</p>}
                    <button className='element__search-button' onClick={() => setOpenInput(true)}></button>
                </div>
                <div className='element__main'>
                    <div className='element__photo'>
                        <img className='element__photo-main' src={mainImage} />
                        <ul className='element__photo-list'>
                            {element.images.map(image => (
                                <img className='element__photo-item' src={image.image} key={image.image} onClick={() => { setMainImage(image.image) }} />
                            ))}
                            {repairKit && (element.parts.map((item) => (
                                <>
                                    <img className='element__photo-item' src={item.spare_part.main_image} key={item.id} onClick={() => { setMainImage(item.spare_part.main_image) }} />
                                </>
                            )))
                            }
                        </ul>
                    </div>
                    <div className='element__info'>
                        <h2 className='element__title'>{element.name}</h2>
                        <h4 className='element__subtitle'>АРТИКУЛ:</h4>
                        <div className='element__article'>
                            <p className='element__description'>{element.article}</p>
                            <button className='element__articke-copy' onClick={copyArticle}></button>
                        </div>
                        <button className='element__map-button'>Где купить</button>
                        {!repairKit ?
                            <>
                                {element.materials.length != 0 &&
                                    <>
                                        <h4 className='element__subtitle'>МАТЕРИАЛ:</h4>
                                        {element.materials.map(item => (
                                            <p className='element__description'>{item.name}</p>
                                        ))}
                                    </>}
                                {element.special_feature &&
                                    <>
                                        <h4 className='element__subtitle'>ОСОБЫЕ СВОЙСТВА:</h4>
                                        <p className='element__description'>{element.special_feature}</p>
                                    </>}
                                {element.material_properties &&
                                    <>
                                        <h4 className='element__subtitle'>СВОЙСТВА МАТЕРИАЛА:</h4>
                                        <p className='element__description'>{element.material_properties}</p>
                                    </>}
                            </>
                            : <RepairKitComplect element={element} />}
                    </div>
                </div>
            </main>
            <Footer />
            {burgerMenuOpen && <BurgerMenu setBurgerMenuOpen={setBurgerMenuOpen} />}
            {openInput && <MyInput setOpenInput={setOpenInput} />}
        </>
    )
}

export default ElementPage


