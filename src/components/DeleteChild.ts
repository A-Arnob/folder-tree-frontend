import axios, { AxiosResponse } from "axios";
import { useEffect } from "react";
import { axiosInstance } from "../api/axios";

const DeleteChild = (name: string) => {
  // useEffect(() => {

  // }, []);

  return new Promise<AxiosResponse<any>>((resolve, reject) => {
    axiosInstance.post(`/folders/delete/${name}`, {}).then(
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

export default DeleteChild;
