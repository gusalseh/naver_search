import axios from "axios";

// const NAVER_API_URL = "https://openapi.naver.com/v1/search/local.json";
const NAVER_API_URL =
  "https://cors-anywhere.herokuapp.com/https://openapi.naver.com/v1/search/local.json";

export const searchRestaurants = async (query) => {
  try {
    const response = await axios.get(NAVER_API_URL, {
      params: {
        query,
        display: 5,
        start: 1,
        sort: "random", // "comment" = 업체 및 기관에 대한 카페, 블로그의 리뷰 개수순으로 내림차순
      },
      headers: {
        "X-Naver-Client-Id": process.env.REACT_APP_NAVER_CLIENT_ID,
        "X-Naver-Client-Secret": process.env.REACT_APP_NAVER_CLIENT_SECRET,
      },
    });
    console.log("response.data.items: ", response.data.items);
    return response.data.items;
  } catch (error) {
    console.error("Error fetching data from Naver API", error);
    return [];
  }
};
