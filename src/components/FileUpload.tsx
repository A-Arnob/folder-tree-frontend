import React, { useState } from "react";
import UploadService from "../services/FileUploadService";
import { Modal } from "antd";
import { Layout } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useRefreshContext } from "../context/refreshContext";

const { Header } = Layout;

// const headerStyle: React.CSSProperties = {
//   textAlign: "center",
//   color: "#000000",
//   height: "11rem",
//   width: "30rem",
//   margin: "5rem auto",
//   padding: "10px 10px",
//   paddingInline: 48,
//   lineHeight: "50px",
//   backgroundColor: "#d3d1d1",
//   borderRadius: "5px",
// };

interface IFile {
  url: string;
  name: string;
}

const FileUpload = () => {
  let { parent } = useParams();
  const {refresh, setRefresh} = useRefreshContext();

  const [currentFile, setCurrentFile] = useState<File>();
  const [showFileUpload, setShowFileUpload] = useState(true);
  // const [progress, setProgress] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  // const [fileInfos, setFileInfos] = useState<Array<IFile>>([]);
  const navigate = useNavigate();

  const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    const selectedFiles = files as FileList;
    setCurrentFile(selectedFiles?.[0]);
  };

  const upload = () => {
    if (!currentFile) return;

    UploadService.upload(currentFile, parent)
      .then((response) => {
        setMessage(response.data.message);
        console.log(response.data.message);
        // return UploadService.getFiles();
        // navigate(0);
        setRefresh(!refresh);
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
    // navigate(0);

    // useEffect(() => {
    //   UploadService.getFiles().then((response) => {
    //     setFileInfos(response.data);
    //   });
    // }, []);
  };

  return (
    <>
      {/* {showFileUpload && */}
      <Modal
        title="File Upload"
        open={showFileUpload}
        onOk={upload}
        okButtonProps={{ disabled: !currentFile }}
        onCancel={() => setShowFileUpload(false)}
      >
        {/* <div style={headerStyle}> */}
        <div>
          <label>
            <p>Enter File in {parent}</p>
            <input type="file" onChange={selectFile} />
          </label>
        </div>
        {/* <div>
          <Button danger onClick={() => { setShowFileUpload(false); }}>
            Cancel
          </Button>
          <Button type="primary" style={{ marginLeft: "10px" }} disabled={!currentFile} onClick={upload}>
            Upload
          </Button>
        </div> */}

        {message && <div>{message}</div>}
        {/* </div> */}
      </Modal>
    </>
  );
};

export default FileUpload;
