import React, { useState, useEffect, useRef } from 'react';
import { YMaps, useYMaps } from '@pbe/react-yandex-maps';

function AnotherMap({ partners, partner, setPartnerInfo, selectedPartner, selectedCity }) {
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
    ]);

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
            zoom: 10,
            controls: ['zoomControl', 'fullscreenControl',],
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
                    iconImageSize: [25, 25],
                    iconImageOffset: [0, 0]
                });

                placemark.events.add('balloonopen', () => {
                    setStoreInfo(store)
                })

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
                console.log('Обновляем маршрут');
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

                const routePanel = new ymaps.control.RoutePanel({
                    options: {
                        float: 'right',
                    },
                });

                map.controls.add(routePanel);
                map.geoObjects.add(multiRoute);
                multiRouteRef.current = multiRoute;
            }
        }
    }, [map, partner, userLocation])

    return (
        <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
    );
}

export default AnotherMap;