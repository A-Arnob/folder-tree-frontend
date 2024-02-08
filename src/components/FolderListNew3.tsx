import axios, { CanceledError } from "axios";
import { useState, useEffect } from "react";
import DeleteChild from "./DeleteChild";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { FolderOutlined } from "@ant-design/icons";

interface Folder {
  _id: string;
  name: string;
  parent: string;
}

const Button = styled.button`
  color: black;
  margin: 10px 2px;
  border: none;
  background: none;
  font-size: 20px;
  font-weight: bolder;

  /* &:hover {
    background: rgb(170, 180, 223);
    border: 1px solid #ffffff;
    border-radius: 0.2em;
  } */
`;

const FolderLayout = styled.li`
  list-style-type: none;
  width: 12rem;
  border: 1px solid;
  border-color: #757575;
  border-radius: 4px;
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

  const [currentFolderName, setCurrentFolderName] = useState("");

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

    return () => controller.abort();
  }, [aaa, parent]);

  return (
    <>
      {console.log(
        "Current Folders:" + currentFolders.map((folder) => folder.name)
      )}
      <ul>
        {currentFolders.map((folder) => (
          <FolderLayout
            onDoubleClick={() => {
              setaaa(!aaa);
              navigate(`/${folder.name}`);
            }}
          >
            {/* <li> */}
            <FolderOutlined />
            <Button>{folder.name}</Button>
            {/* </li> */}
          </FolderLayout>
        ))}
      </ul>
    </>
  );
}

export default FolderListNew3;
