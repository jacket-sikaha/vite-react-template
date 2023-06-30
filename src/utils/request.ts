import { message } from "antd";
import axios from "axios";

const request = axios.create({
  //   baseURL: "https://127.0.0.1/api/",
  timeout: 3000,
  // headers: { "X-Custom-Header": "foobar" },
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 在发送请求之前对请求配置进行处理
    // 可以添加请求头、验证等操作
    // 从 localStorage 中获取最新的 token
    // if (!["/api/auth/login", "/"].includes(config.url ?? "")) {
    if (
      "/api/auth/login" !== config.url &&
      (config.url ?? "").indexOf("/api/note/get/notes") < 0
    ) {
      console.log("localStorage", localStorage);
      const newToken = localStorage.getItem("sikara-note-token");
      // config.headers.Authorization = `Bearer ${newToken}`;
      config.headers.Authorization = newToken;
    }
    console.log("config", config);
    return config;
  },
  (error) => {
    // 请求错误处理
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    // 对响应数据进行处理
    // 可以进行数据转换、错误处理等操作
    console.log("response", response);
    if (response.data.result.token) {
      localStorage.setItem("sikara-note-token", response.data.result.token);
    }
    return response.data;
  },
  (error) => {
    // 响应错误处理
    console.error("Response interceptor error:", error);
    if (error.response.data.errMessage === "token 不合法!") {
      message.info("请重新登陆！！！");
      setTimeout(() => {
        window.location.href = "/signup";
      }, 1500);
      return Promise.reject(error.response.data.errMessage);
    }
    return Promise.reject(error.response.data);
  }
);

export default request;
