import axios, { CanceledError } from "axios";
import { useState, useEffect } from "react";
import DeleteChild from "./DeleteChild";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { DeleteOutlined, FileOutlined, FolderOutlined } from "@ant-design/icons";
import fetchFile from "./fetchFile";
import DeleteFile from "./DeleteFile";

interface Folder {
  _id: string;
  name: string;
  parent: string;
}

interface File {
  _id: string;
  name: string;
  originalname: string;
  parent: string;
}

const Span = styled.button`
  color: black;
  margin: 10px 2px;
  padding: 2px, 20px;
  border: none;
  background: none;
  font-size: 20px;
  font-weight: bolder;

`;

const DeleteFolderButton = styled.button`
  color: black;
  /* margin: 8px 2px; */
  /* border: 1px solid; */
  /* border-radius: 6px; */
  /* background: #fcc6d6; */
  /* padding: 5px 2px; */
  font-size: 20px;
  font-weight: bolder;
  background:none;
  border: none;

  /* &:hover {
    background: #f54f80;
    border: 1px solid;
    border-radius: 0.2em;
  } */
  &:hover{
    cursor: pointer;
  }

`;

const FolderLayout = styled.li`
  list-style-type: none;
  width: 10rem;
  border: 1px solid;
  border-color: #757575;
  border-radius: 10px;
  padding: 2px 20px;
  margin-bottom: 20px;
  background-color: #e6e6e6;

  &:hover {
    background-color: #a5a5a5;
  }
`;

const FileLayout = styled.li`
  list-style-type: none;
  width: fit-content;
  border: 1px solid;
  border-color: #b4b4b4;
  border-radius: 4px;
  padding: 2px 20px;
  margin-bottom: 20px;
  background-color: #f0ecec;

  &:hover {
    background-color: #a5a5a5;
  }
`;

const DialogModal = styled.dialog`
  position: absolute;
  top: 25px; 
  left: 30rem; 
  width: fit-content; 
  height: fit-content;
  padding: 2px 10px;
  background: #eedee3;
  border: 1px solid;
  border-radius: 6px;

  &:hover{
    background: #f599bf;
      
  }
`;

function FolderListNew3() {
  const navigate = useNavigate();
  let { parent } = useParams();
  const goBack = () => navigate(-1);

  if (!parent) {
    parent = "mainroot";
  }

  const [aaa, setaaa] = useState(false);

  const [currentFolders, setCurrentFolders] = useState<Folder[]>([]);
  const [currentFiles, setCurrentFiles] = useState<File[]>([]);

  const [currentFolderName, setCurrentFolderName] = useState("");
  const [displayDelete, setDisplayDelete] = useState(false);
  const [deleteChildName, setDeleteChildName] = useState("");
  const [displayFileDelete, setDisplayFileDelete] = useState(false);

  async function DeleteFolder(name: string) {
    const { status } = await DeleteChild(name);
    console.log(status);
    console.log("Delete Button Clicked:  " + name);
    setCurrentFolders(currentFolders.filter((folder) => folder.name != name));
  }

  useEffect(() => {
    console.log("Calling get...");
    const controller = new AbortController();

    axios
      .get<Folder[]>(`http://localhost:8080/folders/${parent}`, {
        // params: "mainroot",
        signal: controller.signal,
      })
      .then((res) => {
        setCurrentFolders(res.data);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
      });



    return () => { controller.abort(); setDisplayDelete(false) }
  }, [aaa, parent]);

  useEffect(() => {
    console.log("Calling get...");
    const controller = new AbortController();

    axios
      .get<File[]>(`http://localhost:8080/files/${parent}`, {
        // params: "mainroot",
        signal: controller.signal,
      })
      .then((res) => {
        setCurrentFiles(res.data);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
      });

    return () => { controller.abort(); setDisplayDelete(false) }
  }, [aaa, parent]);


  return (
    <>
      {console.log(
        "Current Folders:" + currentFolders.map((folder) => folder.name)
      )}
      <header><h2 style={{ textAlign: "center" }}>{parent}</h2></header>
      <ul>

        {currentFolders.map((folder) => (

          <FolderLayout
            key={folder._id}
            onClick={() => { setDisplayDelete(true); setDeleteChildName(folder.name); setDisplayFileDelete(false) }}
            onDoubleClick={() => {
              setaaa(!aaa);
              setDisplayDelete(false);
              navigate(`/${folder.name}`);
            }}
          >
            {/* <li> */}
            <FolderOutlined /> {/* Folder Icon */}
            <Span>{folder.name}</Span>
            {/* </li> */}
          </FolderLayout>
        ))}

        {currentFiles.map((file) => (

          <FileLayout key={file._id} onClick={() => { setDeleteChildName(file.name); setDisplayDelete(false); setDisplayFileDelete(true) }} onDoubleClick={() => { fetchFile(file.name, file.originalname) }}> <FileOutlined /> <Span>{file.originalname}</Span></FileLayout>
        ))}

        {displayDelete && <DialogModal open onClick={() => setDisplayDelete(false)} >
          <div style={{ textAlign: "right" }}>
            <DeleteFolderButton onClick={() => { DeleteChild(deleteChildName); navigate(0) }}> <DeleteOutlined /> Delete {deleteChildName}</DeleteFolderButton>
          </div>
        </DialogModal>}

        {displayFileDelete && <DialogModal open onClick={() => setDisplayFileDelete(false)} >
          <div style={{ textAlign: "right" }}>
            <DeleteFolderButton onClick={() => { DeleteFile(deleteChildName); navigate(0) }}> <DeleteOutlined /> Delete {deleteChildName}</DeleteFolderButton>
          </div>
        </DialogModal>}
      </ul>
    </>
  );
}

export default FolderListNew3;
