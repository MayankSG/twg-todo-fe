import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

instance.interceptors.request.use(function (response) {
  const token = localStorage.getItem("token");
  if (token !== undefined && token !== null) {
    response.headers["Authorization"] = `Bearer ${token}`;
    // response.headers["Content-Type"] = "application/json";
  }
  return response;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const islogin = localStorage.getItem("token");
    if (error.code === "ERR_NETWORK") {
    }
    if (islogin && error.response?.status === 401) {
      window.location =
        window.location.protocol + "//" + window.location.host + "/login";
      localStorage.clear();
    }
    return Promise.reject(error);
  }
);

export default instance;
