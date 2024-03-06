import { AxiosResponse } from "axios";
import { axiosInstance } from "../api/axios";

const DeleteChild = (name: string) => {
  // useEffect(() => {

  // }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return new Promise<AxiosResponse<any>>((resolve, reject) => {
    axiosInstance.post(`/folders/delete/${name}`, {
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

export default DeleteChild;
