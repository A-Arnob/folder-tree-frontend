import axios, {  InternalAxiosRequestConfig } from "axios";
import mem from "mem";

export const axiosInstancePublic = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",

  },
})

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    

  },
})

axiosInstance.interceptors.request.use(
  (config): InternalAxiosRequestConfig => {
    const user = JSON.parse(localStorage.getItem("user") as string);
    const accessToken = user.accessToken;
    if(accessToken){
      config.headers["x-access-token"] = accessToken;
    }
    console.log("Sent Data into request: ",config);
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
    console.log("Data into error:  ", err.config);

    if(err.response){
      if(err.response.status === 401 && !originalConfig._retry){
        originalConfig._retry = true;

        try{
          const rs = await refreshTokenfn();
          const {accessToken } = rs.data;
          const { refreshToken } = rs.data;

          const user = JSON.parse(localStorage.getItem("user") as string);
          user.accessToken = accessToken;
          user.refreshToken = refreshToken;
          localStorage.setItem("user", JSON.stringify(user));

          // localStorage.setItem("access-token", accessToken);
          // localStorage.setItem("refresh-token", refreshToken);
          axiosInstance.defaults.headers.common["x-access-token"] = accessToken;

          return axiosInstance(originalConfig);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch(_error: any){
          if(_error.response && _error.response.data){
            console.log(_error.response.data);
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

  const user = JSON.parse(localStorage.getItem("user") as string);

  return axiosInstance.post("/refreshtoken",{
    refreshToken: user.refreshToken
  })
}

// const maxAge = 10000;

// const memorizedRefreshTokenFn = mem(refreshTokenfn, {
//   maxAge,
// });