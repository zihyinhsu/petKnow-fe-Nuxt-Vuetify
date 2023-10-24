import axios from "axios";

const service = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
  },
});
service.interceptors.request.use(
  (config) => {
    // 這裡 accessToken 從 pinia 撈
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken && config.headers) {
      config.headers.Authorization = "Bearer " + accessToken;
    }
    console.log("axiosConfig", config);
    return config;
  },
  (error) => {
    // 在這裡加入您的邏輯
    console.log("error", error);
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    // 在這裡加入您的邏輯
    return response;
  },
  (error) => {
    // 在這裡加入您的邏輯
    return Promise.reject(error);
  }
);
const req = <T>(method: string, url: string, data: T | null = null) => {
  // url = import.meta.env.VITE_APP_BASE_API + url;
  method = method.toLowerCase();
  if (method === "post") {
    console.log(
      "method:" + method + " || url:" + url + " || data:" + JSON.stringify(data)
    );
    if (data) return service.post(url, data);
    return service.post(url);
  } else if (method === "upload") {
    console.log(
      "method:uploadPost || url:" + url + " || data:" + JSON.stringify(data)
    );
    return service.request({
      url,
      method: "post",
      headers: { "Content-Type": "multipart/form-data" },
      data,
    });
  } else if (method === "get") {
    console.log(
      "method:" + method + " || url:" + url + " || data:" + JSON.stringify(data)
    );
    if (data) return service.get(url, data);
    return service.get(url);
  } else if (method === "files") {
    console.log(
      "method:" + method + " || url:" + url + " || data:" + JSON.stringify(data)
    );
    return service.request({
      url,
      method: "get",
      responseType: "arraybuffer",
    });
  } else if (method === "delete") {
    console.log(
      "method:" + method + " || url:" + url + " || data:" + JSON.stringify(data)
    );
    if (data === null) {
      return service.delete(url);
    } else {
      return service.request({
        url,
        method: "delete",
        headers: { "Content-Type": "application/json" },
        data,
      });
    }
  } else if (method === "put") {
    console.log(
      "method:" + method + " || url:" + url + " || data:" + JSON.stringify(data)
    );
    return service.request({
      url,
      method: "put",
      headers: { "Content-Type": "application/json" },
      data,
    });
  } else if (method === "patch") {
    console.log(
      "method:" + method + " || url:" + url + " || data:" + JSON.stringify(data)
    );
    return service.patch(url, data);
  } else {
    console.error("未知的method:" + method);
    return false;
  }
};
export { service, req };
