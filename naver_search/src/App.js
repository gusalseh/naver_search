// // src/App.js
// import React, { useState } from "react";
// import { searchRestaurants } from "./api/naverSearch";

// function App() {
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState([]);

//   const handleSearch = async () => {
//     const data = await searchRestaurants(query);
//     console.log("data: ", data);
//     setResults(data);
//   };

//   const handleKeyPress = (event) => {
//     if (event.key === "Enter") {
//       handleSearch();
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>네이버 지역검색 API 되냐?</h1>
//       <input
//         className="search_input"
//         type="text"
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         onKeyPress={handleKeyPress}
//         placeholder="Search for restaurants..."
//         style={{ padding: "10px", width: "300px" }}
//       />
//       <button
//         onClick={handleSearch}
//         style={{ padding: "10px", marginLeft: "10px" }}
//       >
//         검색
//       </button>
//       <div style={{ marginTop: "20px" }}>
//         {results.length > 0 ? (
//           <ul>
//             {results.map((item, index) => (
//               <li key={index} style={{ marginBottom: "10px" }}>
//                 <h2>{item.title.replace(/<\/?[^>]+(>|$)/g, "")}</h2>
//                 <p>{item.address}</p>
//                 <p>{item.category}</p>
//                 <p>{item.description}</p>
//                 <p>{item.roadAddress}</p>
//                 <p>{item.mapx}</p>
//                 <p>{item.mapy}</p>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No results found</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;

// 디벨롭
// import React, { useState } from "react";
// import {
//   searchRestaurants,
//   convertToLatLong,
//   getRouteInfo,
// } from "./api/naverSearch";

// function App() {
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState([]);
//   const [routeInfo, setRouteInfo] = useState(null);

//   const handleSearch = async () => {
//     const data = await searchRestaurants(query);
//     setResults(data);
//   };

//   const handleCalculateRoute = async (mapx, mapy) => {
//     const destination = await convertToLatLong(mapx, mapy);
//     if (destination) {
//       navigator.geolocation.getCurrentPosition(async (position) => {
//         const start = {
//           lat: position.coords.latitude,
//           lng: position.coords.longitude,
//         };
//         const info = await getRouteInfo(start, destination);
//         setRouteInfo(info);
//       });
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>네이버 지역검색 API 되냐?</h1>
//       <input
//         type="text"
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         onKeyPress={(e) => e.key === "Enter" && handleSearch()}
//         placeholder="Search for restaurants..."
//         style={{ padding: "10px", width: "300px" }}
//       />
//       <button
//         onClick={handleSearch}
//         style={{ padding: "10px", marginLeft: "10px" }}
//       >
//         검색
//       </button>
//       <div style={{ marginTop: "20px" }}>
//         {results.length > 0 ? (
//           <ul>
//             {results.map((item, index) => (
//               <li key={index} style={{ marginBottom: "10px" }}>
//                 <h2>{item.title.replace(/<\/?[^>]+(>|$)/g, "")}</h2>
//                 <p>{item.address}</p>
//                 <p>{item.category}</p>
//                 <p>{item.description}</p>
//                 <button
//                   onClick={() => handleCalculateRoute(item.mapx, item.mapy)}
//                 >
//                   소요 시간 및 거리 계산
//                 </button>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No results found</p>
//         )}
//         {routeInfo && (
//           <div>
//             <h3>소요 시간: {Math.ceil(routeInfo.duration / 60)}분</h3>
//             <h3>총 거리: {(routeInfo.distance / 1000).toFixed(2)}km</h3>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;

import React, { useState } from "react";
import {
  searchRestaurants,
  convertToLatLong,
  getRouteInfo,
} from "./api/naverSearch";
import NaverMap from "./api/naverMap"; // 새로 만든 지도 컴포넌트

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [routeInfo, setRouteInfo] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState({
    lat: 37.5665,
    lng: 126.978,
  }); // 초기 위치 서울

  const handleSearch = async () => {
    const data = await searchRestaurants(query);
    setResults(data);
  };

  const handleCalculateRoute = async (mapx, mapy) => {
    const destination = await convertToLatLong(mapx, mapy);
    if (destination) {
      setSelectedLocation(destination); // 선택된 위치 지도에 반영
      navigator.geolocation.getCurrentPosition(async (position) => {
        const start = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        const info = await getRouteInfo(start, destination);
        setRouteInfo(info);
      });
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "50%", padding: "20px" }}>
        <h1>네이버 지역검색 API 되냐?</h1>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Search for restaurants..."
          style={{ padding: "10px", width: "300px" }}
        />
        <button
          onClick={handleSearch}
          style={{ padding: "10px", marginLeft: "10px" }}
        >
          검색
        </button>
        <div style={{ marginTop: "20px" }}>
          {results.length > 0 ? (
            <ul>
              {results.map((item, index) => (
                <li key={index} style={{ marginBottom: "10px" }}>
                  <h2>{item.title.replace(/<\/?[^>]+(>|$)/g, "")}</h2>
                  <p>{item.address}</p>
                  <p>{item.category}</p>
                  <p>{item.description}</p>
                  <button
                    onClick={() => handleCalculateRoute(item.mapx, item.mapy)}
                  >
                    소요 시간 및 거리 계산
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No results found</p>
          )}
          {routeInfo && (
            <div>
              <h3>소요 시간: {Math.ceil(routeInfo.duration / 60)}분</h3>
              <h3>총 거리: {(routeInfo.distance / 1000).toFixed(2)}km</h3>
            </div>
          )}
        </div>
      </div>
      <div style={{ width: "50%", height: "100vh" }}>
        <NaverMap
          latitude={selectedLocation.lat}
          longitude={selectedLocation.lng}
        />
      </div>
    </div>
  );
}

export default App;
