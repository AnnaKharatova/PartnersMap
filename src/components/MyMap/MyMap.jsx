import React, { useState, useEffect, useRef } from "react";
import { useYMaps } from "@pbe/react-yandex-maps";
import DefaultIcon from "../../images/Map_default.svg";
import HoverIcon from "../../images/Map_hover.svg";

function AnotherMap({
  partners,
  partner,
  setPartnerInfo,
  selectedPartner,
  selectedCity,
  setPopupPartnersListOpen,
  maxWidth760,
  setStore,
}) {
  const mapRef = useRef(null);
  const multiRouteRef = useRef(null);
  const myRoutePanelRef = useRef(null);
  const resetButtonRef = useRef(null);
  const [userLocation, setUserLocation] = useState([55.7522, 37.6156]);
  const [activeMarkCoords, setActiveMarkCoords] = useState()
  const [map, setMap] = useState();
  const ymaps = useYMaps([
    "Map",
    "Clusterer",
    "geocode",
    "Placemark",
    "geolocation",
    "multiRouter.MultiRoute",
    "control.RoutePanel",
    "control.ZoomControl",
    "control.GeolocationControl",
    "control.RouteButton",
    "control.Button",
  ]);

  function getCenter(city) {
    ymaps
      .geocode(city)
      .then(function (result) {
        const coords = result.geoObjects.get(0).geometry.getCoordinates();
        map.setCenter(coords, 6);
      })
      .catch(function (error) { });
  }

  useEffect(() => {
    if (selectedPartner && map) {
      map.setCenter([selectedPartner.latitude, selectedPartner.longitude], 10);
      setActiveMarkCoords(selectedPartner.latitude)
    }
  }, [selectedPartner, map]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([
            position.coords.latitude,
            position.coords.longitude,
          ]);
          if (map) {
            map.setCenter(userLocation, 10);
          }
        },
        (error) => {
          setUserLocation([55.7522, 37.6156]);
        }
      );
    } else {
      setUserLocation([55.7522, 37.6156]);
    }
  }, []);

  useEffect(() => {
    if (selectedCity) {
      map.setCenter([selectedCity.latitude, selectedCity.longitude], 10);
    }
  }, [selectedCity]);

  useEffect(() => {
    if (!ymaps || !mapRef.current) {
      return;
    }
    const mapInstance = new ymaps.Map(mapRef.current, {
      center: [55.76, 37.64],
      zoom: 8,
      minZoom: 5,
      maxZoom: 15,
      controls: [],
    });
    setMap(mapInstance);
  }, [mapRef, ymaps]);

  useEffect(() => {
    if (map) {
      getCenter(userLocation);
    }
  }, [map]);

  useEffect(() => {
    if (map) {
      map.geoObjects.removeAll();

      const clusterer = new ymaps.Clusterer({
        preset: "islands#darkBlueClusterIcons",
        groupByCoordinates: false,
        clusterDisableClickZoom: true,
        clusterHideIconOnBalloonOpen: false,
        geoObjectHideIconOnBalloonOpen: false,
      });

      clusterer.options.set({
        gridSize: 80,
        clusterDisableClickZoom: true,
      });

      if (partners && partners.length > 0) {
        partners.forEach((store) => {
          const placemark = new ymaps.Placemark(
            [store.latitude, store.longitude],
            {
              balloonContentBody: `<div class='ballon'>
                         <p class='ballon__header'>${store.name}</p>
                         <p class='balloon__text'>${store.tags
                  .map((tag) => tag.name)
                  .join(", ")}</p>
                         <p class='balloon__text'>${store.address}</p> 
                         <div class='ballon__status'>
                             <div class='baloon__status-dot'></div>
                             <p class='balloon__text'>Открыто</p>
                         </div>
                     </div>`,
            },
            {
              iconLayout: "default#image",
              iconImageHref: DefaultIcon,
              iconImageSize: [25, 25],
              iconImageOffset: [0, 0],
            }
          );

            placemark.options.set((activeMarkCoords === store.latitude)&&"iconImageHref", HoverIcon);
            placemark.options.set((activeMarkCoords === store.latitude)&&"iconImageSize", [30, 30]);
         
          
          placemark.events.add("mouseenter", () => {
            placemark.options.set("iconImageHref", HoverIcon);
            placemark.options.set("iconImageSize", [30, 30]);
          });
          placemark.events.add("mouseleave", () => {
            placemark.options.set("iconImageHref", DefaultIcon);
            placemark.options.set("iconImageSize", [25, 25]);
          });

          placemark.events.add("click", (e) => {
            e.preventDefault();
            map.geoObjects.each((p) => {
              if (p !== e.placemark) {
                p.options.set("iconImageHref", DefaultIcon);
                p.options.set("iconImageSize", [25, 25]);
              }
            });
          
            placemark.options.set("iconImageHref", HoverIcon);
            placemark.options.set("iconImageSize", [30, 30]);
            setStoreInfo(store);
            if (maxWidth760) {
              setPopupPartnersListOpen(true);
            }
          });
          map.geoObjects.add(placemark);
          clusterer.add(placemark);
        });

        const bounds = clusterer.getBounds();
        if (bounds) {
          map.setBounds(bounds, {
            checkZoomRange: true,
          });
        } else {
          map.setCenter([55.76, 37.64], 8);
        }
      } else {
        map.setCenter([55.76, 37.64], 8);
      }

      map.geoObjects.add(clusterer);

      function setStoreInfo(store) {
        setPartnerInfo(store);
      }
    }
  }, [ymaps, partners, userLocation, map]);

  useEffect(() => {
    if (map && partner && userLocation.length > 0) {
      if (multiRouteRef.current) {
        map.geoObjects.remove(multiRouteRef.current);
        multiRouteRef.current = null;
      }

      if (resetButtonRef.current) {
        map.controls.remove(resetButtonRef.current);
        resetButtonRef.current = null;
      }

      const multiRoute = new ymaps.multiRouter.MultiRoute({
        referencePoints: [userLocation, [partner.latitude, partner.longitude]],
        params: {
          routingMode: "auto",
        },
      });

      map.geoObjects.add(multiRoute);
      multiRouteRef.current = multiRoute;

      const button = new ymaps.control.Button({
        data: {
          content: "Сбросить маршрут",
          title: "Очистить данные маршрута",
        },
        options: {
          selectOnClick: false,
          maxWidth: [30, 100, 150],
          float: "none",
          position: { bottom: 55, right: 20 },
          floatIndex: 100,
        },
      });

      map.controls.add(button);
      resetButtonRef.current = button;

      button.events.add("click", () => {
        map.geoObjects.remove(multiRoute);
        map.controls.remove(button);
        setStore(null);
        multiRouteRef.current = null;
        resetButtonRef.current = null;
      });
    }
  }, [map, partner, userLocation]);

  useEffect(() => {
    if (map) {
      const zoomControl = new ymaps.control.ZoomControl({
        options: { size: "small", float: "none", position: { top: 375, right: 5 } },
      });

      const geoControl = new ymaps.control.GeolocationControl({
        options: { float: "none", position: { top: 335, right: 5 } },
      });

      map.controls.add(zoomControl);
      map.controls.add(geoControl);
    }
  }, [map]);

  return <div ref={mapRef} style={{ width: "100%", height: "100%" }} />;
}

export default AnotherMap;