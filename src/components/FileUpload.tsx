import React, { useEffect, useState } from "react";
import UploadService from "../services/FileUploadService";
import { Button } from "antd";
import { Layout, Flex } from "antd";

const { Header } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#000000",
  height: "11rem",
  width: "30rem",
  margin: "5rem auto",
  padding: "10px 10px",
  paddingInline: 48,
  lineHeight: "50px",
  backgroundColor: "#d3d1d1",
  borderRadius: "5px",
};

interface IFile {
  url: string;
  name: string;
}

const FileUpload: React.FC = () => {
  const [currentFile, setCurrentFile] = useState<File>();
  // const [progress, setProgress] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const [fileInfos, setFileInfos] = useState<Array<IFile>>([]);

  const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    const selectedFiles = files as FileList;
    setCurrentFile(selectedFiles?.[0]);
  };

  const upload = () => {
    if (!currentFile) return;

    UploadService.upload(currentFile)
      .then((response) => {
        setMessage(response.data.message);
        console.log(response.data.message);
        // return UploadService.getFiles();
      })
      // .then((files) => {
      //   // setFileInfos(files.data);
      // })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.message) {
          setMessage(err.response.data.message);
        } else {
          //   setMessage("Could not upload the File!");
          setCurrentFile(undefined);
        }
      });
    console.log("Helllllo");
    setCurrentFile(undefined);

    // useEffect(() => {
    //   UploadService.getFiles().then((response) => {
    //     setFileInfos(response.data);
    //   });
    // }, []);
  };

  return (
    <Header style={headerStyle}>
      <div>
        <label>
          <p></p>
          <input type="file" onChange={selectFile} />
        </label>
      </div>
      <div>
        {/* {currentFile && ( */}
        <Button type="primary" disabled={!currentFile} onClick={upload}>
          Upload
        </Button>
      </div>

      {message && <div>{message}</div>}
    </Header>
  );
};

export default FileUpload;
