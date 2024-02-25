import axios from "axios";

const API_URL = "http://localhost:8080/";

const SignInService = (email: string, password: string) => {
    return axios.post(API_URL + "signin", {
        email,
        password,
    }).then((res) => {
        console.log(res);
    }).catch((err) => {
        console.log(err);
    });
}

export default SignInService;