
import { axiosInstance } from "../api/axios";
// import http from "../http-common";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getFiles = (): Promise<any> => {
  return axiosInstance.get("/files");
};

const fileuploadService = {
  upload,
  getFiles,
};

export default fileuploadService;
