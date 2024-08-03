import React, { useState, useEffect, useRef } from 'react';
import { YMaps, Map, GeolocationControl, Placemark, useYMaps } from '@pbe/react-yandex-maps';

const MyMap = ({ storedCity, partners, store }) => {
  const [userLocation, setUserLocation] = useState([])
  const [locationText, setLocationText] = useState(null);
  const mapRef = useRef(null);
      
  const ymaps = useYMaps();

  // определение геолокации
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


  // отражение выбранногоо города на карте (не работает)
  useEffect(() => {
    if (storedCity) {
      const getCityCoordinates = async (city) => {
        try {
          const response = await fetch(`https://geocode-maps.yandex.ru/1.x/?apikey=6fb19312-2127-40e5-8c22-75d1f84f2daa&lang=ru_RU&geocode=${city}&format=json`);
          const data = await response.json();

          const coordinates = data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ');
          const answer = [parseFloat(coordinates[1]), parseFloat(coordinates[0])];

          if (mapRef.current && mapRef.current.getMapInstance) { // Проверка доступности mapInstance
            const mapInstance = mapRef.current.getMapInstance();
            mapInstance.panTo(new ymaps.geometry.Point(answer), {
              duration: 1000
            });
          }
          console.log(answer)

        } catch (error) {
          console.error('Ошибка при получении координат:', error);
        }
      };

      getCityCoordinates(storedCity);
    }
  }, [storedCity]);

  useEffect(() => {
    const getRoute = async () => {
      try {
        const location = await ymaps.geolocation.get();
        setLocationText(location.geoObjects.get(0).properties.get('text')); 
      } catch (error) {
        console.error('Ошибка получения местоположения:', error);
      }
    };
    getRoute();
  }, []);

  useEffect(() => {
    if (mapRef.current && locationText && store) {
      const mapInstance = mapRef.current.getMapInstance(); 
      const multiRoute = new ymaps.multiRouter.MultiRoute({
        referencePoints: [
          [locationText], // Используйте полученный текст 
          [store.latitude, store.longitude],
        ],
        params: {
          routingMode: 'auto',
        },
      });

      mapInstance.geoObjects.add(multiRoute);
    }
  }, [locationText, store, mapRef.current]); //  Зависимости

  return (

    
      <Map
        instanceRef={mapRef}
        width="100%" height='100%'
        defaultState={{
          center: userLocation,
          zoom: 10,
          controls: ["zoomControl", "fullscreenControl"],
        }}
      >
        {partners && partners.map((point) => (
          <Placemark
            key={point.id}
            defaultGeometry={[point.latitude, point.longitude]}
            properties={{
              balloonContentBody:
                `<div class='ballon'>
                    <p class='ballon__header'>${point.name}</p>
                    <p class='balloon__text'>${point.tags.map(tag => tag.name)}</p>
                    <p class='balloon__text'>${point.address}</p> 
                    <div class='ballon__status'>
                        <div class='baloon__status-dot'></div>
                        <p class='balloon__text'>Открыто</p>
                    </div>
                </div>`,
            }}
          />
        ))}
        <GeolocationControl options={{ float: "right" }} />
      </Map>
  );
};

export default MyMap;