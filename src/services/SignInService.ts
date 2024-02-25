import axios from "axios";

const API_URL = "http://localhost:8080/";

const SignInService = (email: string, password: string) => {
    return axios.post(API_URL + "signin", {
        email,
        password,
    }).then((res) => {
        console.log(res.data);
        if (res.data.accessToken && res.data.refreshToken) {
            localStorage.setItem("user", JSON.stringify(res.data));
        }
    }).catch((err) => {
        console.log(err);
    });
}

const LogOut = () => {
    localStorage.removeItem("user");
}

const getCurrentUser = () => {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);

    return null;
}

const signedServices = {
    SignInService,
    LogOut,
    getCurrentUser
}

export default signedServices;