import React, { useState, useEffect } from 'react';
import { YMaps, Map, Placemark, GeolocationControl } from '@pbe/react-yandex-maps';

const MyMap = () => {
  const BASE_URL = `https://yurasstroy.ddns.net/api`
  const [fetchedData, setFetchedData] = useState()
  const [userLocation, setUserLocation] = useState([])

  console.log(fetchedData)

  useEffect(() => {
    fetch(`${BASE_URL}/partners/`)
      .then(res => res.json())
      .then(resData => {
        setFetchedData(JSON.parse(JSON.stringify(resData)))
      }).catch(error => {
        console.error("Ошибка при получении данных:", error);
      });
  }, [])

useState(()=> {
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
},[])


  return (
    <YMaps
      query={{
        apikey: '6fb19312-2127-40e5-8c22-75d1f84f2daa&lang=ru_RU',
        ns: "use-load-option",
        load: "Map,Placemark,control.ZoomControl,control.FullscreenControl,geoObject.addon.balloon",
      }}
    >
      <Map
        width="100%" height='100%'
        defaultState={{
          center: userLocation,
          zoom: 10,
          controls: ["zoomControl", "fullscreenControl"],
        }}
      >
        {fetchedData && fetchedData.map((point) => (
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
    </YMaps>
  );
};

export default MyMap;