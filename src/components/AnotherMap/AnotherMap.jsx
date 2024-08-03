import React, { useState, useEffect, useRef } from 'react';
import { YMaps, useYMaps } from '@pbe/react-yandex-maps';

function AnotherMap({ partners, partner  }) {
    const mapRef = useRef(null);
    const ymaps = useYMaps(['Map', 'geocode', 'Placemark', 'geolocation', 'multiRouter.MultiRoute']);
    const [userLocation, setUserLocation] = useState([])


    useState(() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setUserLocation([position.coords.latitude, position.coords.longitude]);
            },
            (error) => {
              console.error("Ошибка получения местоположения:", error);
            }
          );
        } else {
          setUserLocation([55.7522, 37.6156]);
        }
      }, [])

    useEffect(() => {
        if (!ymaps || !mapRef.current) {
            return;
        }

        const map = new ymaps.Map(mapRef.current, {
            center: [55.76, 37.64],
            zoom: 10,
            controls: ["zoomControl", "fullscreenControl"]
        });

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
        getCenter(userLocation)

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
                console.log(store.latitude, store.longitude)
            })

            map.geoObjects.add(placemark)
        });

         /* if(partner) {
            const control = map.controls.get('RouteButton');
                control.routePanel.state.set({
                    state: "expanded",
                    from: userLocation,
                    to: `${partner.latitude},${partner.longitude}`,
                });
                const multiRoute = new ymaps.multiRouter.MultiRoute({
                    referencePoints: [
                        [userLocation],
                        [partner.latitude, partner.longitude]
                    ],
                    params: {
                        routingMode: 'auto'
                    }
                });
                map.geoObjects.add(multiRoute);
        }; */
        

    }, [ymaps, partners, partner]);

    return (
        <div ref={mapRef} style={{ width: '100%', height: '100%' }} />

    )
}

export default AnotherMap;