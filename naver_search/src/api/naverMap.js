import React, { useEffect, useState } from "react";

const NaverMap = ({ latitude, longitude }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadNaverMapScript = () => {
      return new Promise((resolve) => {
        const existingScript = document.getElementById("naver-map-script");
        if (!existingScript) {
          const script = document.createElement("script");
          script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.REACT_APP_NAVER_MAPS_API_KEY}`;
          script.id = "naver-map-script";
          script.async = true;
          script.onload = () => resolve();
          document.body.appendChild(script);
        } else {
          resolve();
        }
      });
    };

    loadNaverMapScript().then(() => {
      if (window.naver && window.naver.maps) {
        setIsLoaded(true);
      }
    });
  }, []);

  useEffect(() => {
    if (isLoaded) {
      const mapOptions = {
        center: new window.naver.maps.LatLng(latitude, longitude),
        zoom: 10,
      };
      const map = new window.naver.maps.Map("map", mapOptions);

      new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(latitude, longitude),
        map,
      });
    }
  }, [isLoaded, latitude, longitude]);

  return <div id="map" style={{ width: "100%", height: "100%" }} />;
};

export default NaverMap;
