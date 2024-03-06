// import axios from "axios";
import { User } from "../context/AuthContext";
import { axiosInstancePublic } from "../api/axios";

const API_URL = "http://localhost:8080/";

// const SignInService = (email: string, password: string, callback: (err: any, user?: User) => void) => {


//     axios.post(API_URL + "signin", {
//         email,
//         password,
//     }).then((res) => {
//         console.log(res.data);
//         callback(null, res.data)
//     }).catch((err) => {
//         console.log(err);
//         callback(err)
//     });
// }

const SignInService = (email: string, password: string) => {
    return new Promise<User>((resolve, reject) => {
        axiosInstancePublic.post(API_URL + "signin", {
            email,
            password,
        }).then((res) => {
            console.log(res.data);
            resolve(res.data)
        }).catch((err) => {
            if(err.response.status === 404){
                alert("Log In With Valid email & Password!");
            }
            // console.log(err);
            reject(err);
        });
    })

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