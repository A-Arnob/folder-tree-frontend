import axios, { AxiosResponse } from "axios";
import { useEffect } from "react";
import { axiosInstance } from "../api/axios";

const DeleteFile = (name: string) => {
    // useEffect(() => {

    // }, []);

    return new Promise<AxiosResponse<any>>((resolve, reject) => {
        axiosInstance.post(`/file/delete/${name}`, {
            headers:{
                "Content-Type": "application/json"
              }
        }).then(
            (response) => {
                console.log(response);
                resolve(response);
            },
            (error) => {
                console.log(error);
                reject(error);
            }
        );
    });
};

export default DeleteFile;
