// import axios from "axios";

// // const NAVER_API_URL = "https://openapi.naver.com/v1/search/local.json";
// const NAVER_API_URL =
//   "https://cors-anywhere.herokuapp.com/https://openapi.naver.com/v1/search/local.json";

// export const searchRestaurants = async (query) => {
//   try {
//     const response = await axios.get(NAVER_API_URL, {
//       params: {
//         query,
//         display: 5,
//         start: 1,
//         sort: "random", // "comment" = 업체 및 기관에 대한 카페, 블로그의 리뷰 개수순으로 내림차순
//       },
//       headers: {
//         "X-Naver-Client-Id": process.env.REACT_APP_NAVER_CLIENT_ID,
//         "X-Naver-Client-Secret": process.env.REACT_APP_NAVER_CLIENT_SECRET,
//       },
//     });
//     console.log("response.data.items: ", response.data.items);
//     return response.data.items;
//   } catch (error) {
//     console.error("Error fetching data from Naver API", error);
//     return [];
//   }
// };

import axios from "axios";

const NAVER_API_URL =
  "https://cors-anywhere.herokuapp.com/https://openapi.naver.com/v1/search/local.json";

export const searchRestaurants = async (query) => {
  try {
    const response = await axios.get(NAVER_API_URL, {
      params: {
        query,
        display: 5,
        start: 1,
        sort: "comment",
      },
      headers: {
        "X-Naver-Client-Id": process.env.REACT_APP_NAVER_CLIENT_ID,
        "X-Naver-Client-Secret": process.env.REACT_APP_NAVER_CLIENT_SECRET,
      },
    });
    return response.data.items;
  } catch (error) {
    console.error("Error fetching data from Naver API", error);
    return [];
  }
};

// // KATECH 좌표계 정의
// const katechProj =
//   "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs";
// const wgs84Proj = proj4.WGS84;
// export const convertToLatLong = (x, y) => {
//   const normalizedX = x / 1000000;
//   const normalizedY = y / 1000000;

//   if (!isFinite(normalizedX) || !isFinite(normalizedY)) {
//     console.error("Invalid normalized coordinates:", normalizedX, normalizedY);
//     return null;
//   }

//   const [longitude, latitude] = proj4(katechProj, wgs84Proj, [
//     normalizedX,
//     normalizedY,
//   ]);
//   console.log("lat: ", latitude);
//   console.log("lng: ", longitude);
//   return { lat: latitude, lng: longitude };
// };

// KATECH 좌표를 위도/경도로 변환
export const convertToLatLong = async (x, y) => {
  const url = `https://cors-anywhere.herokuapp.com/https://naveropenapi.apigw.ntruss.com/map-trans/v1/coord?x=${x}&y=${y}&output=epsg:4326&orders=latlong`;
  try {
    const response = await axios.get(url, {
      headers: {
        "X-NCP-APIGW-API-KEY-ID": process.env.REACT_APP_NAVER_CLIENT_ID,
        "X-NCP-APIGW-API-KEY": process.env.REACT_APP_NAVER_CLIENT_SECRET,
      },
    });
    const { lat, lng } = response.data.result;
    console.log(lat, lng);
    return { lat, lng };
  } catch (error) {
    console.error("Error converting coordinates", error);
    return null;
  }
};

// Directions15 API 사용
export const getRouteInfo = async (start, goal) => {
  const url = `https://cors-anywhere.herokuapp.com/https://naveropenapi.apigw.ntruss.com/map-direction-15/v1/driving?start=${start.lng},${start.lat}&goal=${goal.lng},${goal.lat}`;
  try {
    const response = await axios.get(url, {
      headers: {
        "X-NCP-APIGW-API-KEY-ID": process.env.REACT_APP_NAVER_MAPS_API_KEY,
        "X-NCP-APIGW-API-KEY": process.env.REACT_APP_NAVER_MAPS_SECRET_KEY,
      },
    });
    return response.data.route.traoptimal[0].summary;
  } catch (error) {
    console.error("Error fetching route info", error);
    return null;
  }
};
