
import { axiosInstance } from "../api/axios";
// import http from "../http-common";

const upload = (file: File, parent: string | undefined): Promise<any> => {

  if (parent == undefined) {
    parent = "mainroot";
  }

  const formData = new FormData();

  formData.append("file", file);
  formData.append("parent", parent);

  return axiosInstance.post("/fileupload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const getFiles = (): Promise<any> => {
  return axiosInstance.get("/files");
};

const fileuploadService = {
  upload,
  getFiles,
};

export default fileuploadService;
