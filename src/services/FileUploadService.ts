
import http from "../http-common";

const upload = (file: File, parent: string | undefined): Promise<any> => {

  if (parent == undefined) {
    parent = "mainroot";
  }

  let formData = new FormData();

  formData.append("file", file);
  formData.append("parent", parent);

  return http.post("/fileupload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const getFiles = (): Promise<any> => {
  return http.get("/files");
};

const fileuploadService = {
  upload,
  getFiles,
};

export default fileuploadService;
