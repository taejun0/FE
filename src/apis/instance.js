import axios from "axios";
// Axios 인스턴스 생성
export const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,

  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// 요청 인터셉터 추가
instance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// 응답 인터셉터 추가
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === "CUSTOM_ERRORCODE") {
      console.log("Request timeout");
      window.location.href = "/error"; // 타임아웃 시 에러 페이지로 리디렉션
    }
    return Promise.reject(error);
  }
);
