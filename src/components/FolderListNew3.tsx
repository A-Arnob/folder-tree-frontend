import axios, { CanceledError } from "axios";
import { useState, useEffect } from "react";
import DeleteChild from "./DeleteChild";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { DeleteOutlined, FileOutlined, FolderOutlined } from "@ant-design/icons";
import fetchFile from "./fetchFile";

interface Folder {
  _id: string;
  name: string;
  parent: string;
}

interface File {
  name: string;
  originalname: string;
  parent: string;
  path: string;
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

const Button = styled.button`
  color: black;
  margin: 10px 2px;
  border: 1px solid;
  border-radius: 6px;
  background: #fcc6d6;
  font-size: 20px;
  font-weight: bolder;

  &:hover {
    background: #f54f80;
    border: 1px solid;
    border-radius: 0.2em;
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
      <ul>

        {currentFolders.map((folder) => (

          <FolderLayout
            onClick={() => { setDisplayDelete(true); setDeleteChildName(folder.name) }}
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

          <FolderLayout onDoubleClick={() => { fetchFile(file.name) }}> <FileOutlined /> <Span>{file.originalname}</Span></FolderLayout>
        ))}

        <div style={{ textAlign: "right" }}>
          {displayDelete && <Button onClick={() => { DeleteChild(deleteChildName); navigate(0) }}> <DeleteOutlined /> Delete {deleteChildName}</Button>}
        </div>
      </ul>
    </>
  );
}

export default FolderListNew3;
