import axios from "axios";
import { axiosInstance } from "../api/axios";

const API_URL = "http://localhost:8080/";

const SignUpService = (userName: string, email: string, password: string) => {
    return axiosInstance.post(API_URL + "signup", {
        userName,
        email,
        password,
    }).then((res) => {
        console.log(res.data);
    }).catch((err) => {
        console.log(err);
    });
}

export default SignUpService;