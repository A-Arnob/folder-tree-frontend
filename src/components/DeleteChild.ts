import axios, { AxiosResponse } from "axios";
import { useEffect } from "react";

const DeleteChild = (name: string) => {
  // useEffect(() => {

  // }, []);

  return new Promise<AxiosResponse<any>>((resolve, reject) => {
    axios.post(`http://localhost:8080/folders/delete/${name}`, {}).then(
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
