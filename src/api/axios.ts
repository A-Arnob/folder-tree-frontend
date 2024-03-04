import axios, {  InternalAxiosRequestConfig } from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",

  },
})

axiosInstance.interceptors.request.use(
  (config): InternalAxiosRequestConfig => {
    const user = JSON.parse(localStorage.getItem("user") as string);
    const accessToken = user.accessTOken;
    if(accessToken){
      config.headers["x-access-token"] = accessToken
    }
    return config;
  },
  (error) => { 
    return Promise.reject(error);
  }
);


axiosInstance.interceptors.response.use(
  (res) =>{
    return res;
  },
  async (err) =>{
    const originalConfig = err.config;

    if(err.response){
      if(err.response.status === 401 && !originalConfig._retry){
        originalConfig._retry = true;

        try{
          const rs = await refreshTokenfn();
          const {accessToken } = rs.data;
          const { refreshToken } = rs.data;
          localStorage.setItem("access-token", accessToken);
          localStorage.setItem("refresh-token", refreshToken);
          axiosInstance.defaults.headers.common["x-access-token"] = accessToken;

          return axiosInstance(originalConfig);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch(_error: any){
          if(_error.response && _error.response.data){
            return Promise.reject(_error.response.data);
          }
          return Promise.reject(_error.response);
        }

      }

      if (err.response.status === 403 && err.response.data) {
        return Promise.reject(err.response.data);
      }
    }
    return Promise.reject(err);
  }
);

async function refreshTokenfn(){
  return axiosInstance.post("/refreshtoken",{
    refreshToken: localStorage.getItem("refresh-token")
  })
}