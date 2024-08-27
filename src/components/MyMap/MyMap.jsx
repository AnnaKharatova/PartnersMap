import React, { useState, useEffect, useRef } from 'react';
import { YMaps, useYMaps } from '@pbe/react-yandex-maps';
import DefaultIcon from '../../images/Map_default.svg'
import HoverIcon from '../../images/Map_hover.svg'

function AnotherMap({ partners, partner, setPartnerInfo, selectedPartner, selectedCity, setPopupPartnersListOpen, maxWidth760, partnerInfo }) {

    const mapRef = useRef(null);
    const multiRouteRef = useRef(null);
    const [userLocation, setUserLocation] = useState([]);
    const [map, setMap] = useState()
    const ymaps = useYMaps([
        'Map',
        'geocode',
        'Placemark',
        'geolocation',
        'multiRouter.MultiRoute',
        'control.RoutePanel',
        'control.ZoomControl',
        'control.GeolocationControl',
        'control.RouteButton'
    ]);


    useEffect (()=>{
        if(!partner) {

        }
    })

    function getCenter(city) {
        ymaps.geocode(city)
            .then(function (result) {
                const coords = result.geoObjects.get(0).geometry.getCoordinates();
                map.setCenter(coords, 10);
            })
            .catch(function (error) {
                console.log('Ошибка геокодирования:', error);
            });
    }

    // центрирование карты при клике на партнера
    useEffect(() => {
        if (selectedPartner && map) {
            map.setCenter([selectedPartner.latitude, selectedPartner.longitude], 12)
        }
    }, [selectedPartner, map])

    // Получение местоположения пользователя
    useEffect(() => {
        if (!selectedCity) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setUserLocation([position.coords.latitude, position.coords.longitude]);
                    },
                    (error) => {
                        console.error('Ошибка получения местоположения:', error);
                        // Установка значений по умолчанию, если geolocation не доступен
                        setUserLocation([55.7522, 37.6156]);
                    }
                );
            } else {
                setUserLocation([55.7522, 37.6156]);
            }
        } else {
            setUserLocation([selectedCity.latitude, selectedCity.longitude]);
        }
    }, [selectedCity]);

    // инициализация карты
    useEffect(() => {
        if (!ymaps || !mapRef.current) {
            return;
        }
        const mapInstance = new ymaps.Map(mapRef.current, {
            center: [55.76, 37.64],
            zoom: 8,
            controls: []
        });
        setMap(mapInstance);

    }, [mapRef, ymaps]);

    // метки
    useEffect(() => {
        if (map) {
            map.geoObjects.removeAll()
            getCenter(userLocation);
            partners.forEach(store => {
                const placemark = new ymaps.Placemark([store.latitude, store.longitude], {
                    balloonContentBody:
                        `<div class='ballon'>
                        <p class='ballon__header'>${store.name}</p>
                        <p class='balloon__text'>${store.tags.map(tag => tag.name)}</p>
                        <p class='balloon__text'>${store.address}</p> 
                        <div class='ballon__status'>
                            <div class='baloon__status-dot'></div>
                            <p class='balloon__text'>Открыто</p>
                        </div>
                    </div>`
                }, {
                    iconLayout: 'default#image',
                    iconImageHref: DefaultIcon,
                    iconImageSize: [25, 25],
                    iconImageOffset: [0, 0]
                });

                placemark.events.add('balloonopen', () => {
                    setStoreInfo(store)
                    if (maxWidth760) {
                        setPopupPartnersListOpen(true)
                    }
                })

                // Изменение маркера при наведении

                placemark.events.add('mouseenter', () => {
                    placemark.options.set('iconImageHref', HoverIcon);
                    placemark.options.set('iconImageSize', [35, 35])
                });

                placemark.events.add('mouseleave', () => {
                    placemark.options.set('iconImageHref', DefaultIcon);
                    placemark.options.set('iconImageSize', [25, 25])
                });
  
                placemark.events.add('click', (e) => {
                    e.preventDefault()
                    map.geoObjects.each((placemark) => {
                        if (placemark !== e.placemark) {
                            placemark.options.set('iconImageHref', DefaultIcon);
                            placemark.options.set('iconImageSize', [25, 25])

                        }
                    });
                    placemark.events.add('mouseenter', () => {
                        placemark.options.set('iconImageHref', HoverIcon);
                        placemark.options.set('iconImageSize', [30, 30])

                    });
                    placemark.events.add('mouseleave', () => {
                        placemark.options.set('iconImageHref', HoverIcon);
                        placemark.options.set('iconImageSize', [30, 30])

                    });
                    setStoreInfo(store);
                    if (maxWidth760) {
                        setPopupPartnersListOpen(true);
                    }
                    placemark.options.set('iconImageHref', HoverIcon);
                    placemark.options.set('iconImageSize', [30, 30])


                });
                map.geoObjects.add(placemark)
            });

            function setStoreInfo(store) {
                setPartnerInfo(store)
            }
        }
    }, [ymaps, partners, userLocation, map]);

    // Обработка обновлений маршрута (когда изменяется partner)
    useEffect(() => {
        if (map && partner && userLocation.length > 0) {
            console.log('userLocation:', userLocation);
            console.log('partner:', partner);
            console.log('multiRouteRef.current:', multiRouteRef.current);

            if (multiRouteRef.current) {
                console.log('Точки маршрута:', [
                    [userLocation],
                    [partner.latitude, partner.longitude],
                ]);
                multiRouteRef.current.model.setReferencePoints([
                    [userLocation],
                    [partner.latitude, partner.longitude],
                ]);
                multiRouteRef.current.model.getRoutes();
            } else {
                console.log('Создаем новый маршрут');
                const multiRoute = new ymaps.multiRouter.MultiRoute({
                    referencePoints: [
                        [userLocation],
                        [partner.latitude, partner.longitude],
                    ],
                    params: {
                        routingMode: 'auto',
                    },
                });

                const myRoutePanel = new ymaps.control.RouteButton({
                    options: {
                        float: 'none',
                        position: {
                            top: 450,
                            right: 5,
                        },
                        size: 'small'
                    },
                });

                myRoutePanel.routePanel.state.set({
                    fromEnabled: true,
                    from: userLocation,
                    toEnabled: true,
                    to: `${partner.latitude}, ${partner.longitude}`,
                    state: "expanded",

                })
                map.controls.add(myRoutePanel);
                map.geoObjects.add(multiRoute);
                multiRouteRef.current = multiRoute;
            }
        }
    }, [map, partner, userLocation])

    useEffect(() => {
        if (map) {
            const zoomControl = new ymaps.control.ZoomControl({
                options: {
                    size: "small",
                    float: 'none',
                    position: {
                        top: 375,
                        right: 5,
                    }
                }
            });

            const geoControl = new ymaps.control.GeolocationControl({
                options: {
                    float: 'none',
                    position: {
                        top: 335,
                        right: 5
                    },

                }
            })
            map.controls.add(zoomControl);
            map.controls.add(geoControl);
        }
    }, [map])

    return (
        <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
    );
}

export default AnotherMap;