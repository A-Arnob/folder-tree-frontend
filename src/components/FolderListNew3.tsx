import  { CanceledError } from "axios";
import { useState, useEffect } from "react";
import DeleteChild from "./DeleteChild";
import {  useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { AppstoreOutlined, CloseCircleOutlined, DeleteOutlined, FileOutlined, FolderOutlined, MenuOutlined } from "@ant-design/icons";
import fetchFile from "./fetchFile";
import DeleteFile from "./DeleteFile";
import { useAuthContext } from "../context/AuthContext";
import { axiosInstance } from "../api/axios";
import { useRefreshContext } from "../context/refreshContext";

interface Folder {
  _id: string;
  name: string;
  originalName: string;
  parent: string;
}

interface File {
  _id: string;
  name: string;
  originalname: string;
  parent: string;
}

const SpanButton = styled.button`
  color: black;
  margin: 10px 2px;
  padding: 2px, 20px;
  border: none;
  background: none;
  font-size: 16px;
  font-weight: bolder;

  &:hover{
    cursor: pointer;
  }

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
    /* cursor: pointer; */
  }

`;

const FolderLayout = styled.li`
  list-style-type: none;
  display:flex;
  max-width: 10rem;
  border: 1px solid;
  border-color: #757575;
  border-radius: 10px;
  padding: 2px 20px;
  margin: 15px 10px;
  background-color: #e6e6e6;  

  &:hover {
    background-color: #a5a5a5;
  }
`;

const FileLayout = styled(FolderLayout)`

  width: fit-content;
  border-color: #b4b4b4;
  border-radius: 4px;


`;

const DialogModal = styled.dialog`
  /* position: static; */
  /* top: 0px;  */
  right: 2px;
  /* margin-left: 1rem;  */
  margin-right: 1rem;
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

const GridViewUl = styled.ul<{ $isShowGrid: boolean }>`

display: ${({ $isShowGrid }) => $isShowGrid ? 'grid' : 'list'};
padding: 10px 40px;
grid-template-columns: repeat(1, 1fr);
grid-template-rows: repeat(2, 100px);
grid-gap: 10px;

@media(min-width: 380px){
  grid-template-columns: repeat(2, 1fr);
}
@media(min-width: 600px){
  grid-template-columns: repeat(3, 1fr);
}
@media(min-width: 850px){
  grid-template-columns: repeat(4, 1fr);
}
@media(min-width: 1080px){
  grid-template-columns: repeat(5, 1fr);
}

`;




function FolderListNew3() {
  const {refresh, setRefresh} = useRefreshContext();

  const navigate = useNavigate();
  let { parent } = useParams();
  // const goBack = () => navigate(-1);

  const { user } = useAuthContext();
  console.log("Auth asas", user);

  if (!parent) {
    parent = "mainroot";
  }

  const [aaa, setaaa] = useState(false);

  const [currentFolders, setCurrentFolders] = useState<Folder[]>([]);
  const [currentFiles, setCurrentFiles] = useState<File[]>([]);

  // const [currentFolderName, setCurrentFolderName] = useState("");
  const [displayDelete, setDisplayDelete] = useState(false);
  const [deleteChildName, setDeleteChildName] = useState("");
  const [displayFileDelete, setDisplayFileDelete] = useState(false);
  // const [activeButton, setActiveButton] = useState(false);
  const [isShowGrid, setIsShowGrid] = useState(false);

  // async function DeleteFolder(name: string) {
  //   const { status } = await DeleteChild(name);
  //   console.log(status);
  //   console.log("Delete Button Clicked:  " + name);
  //   setCurrentFolders(currentFolders.filter((folder) => folder.name != name));
  // }


  useEffect(() => {
    console.log("Calling get...");
    const controller = new AbortController();
    // console.log(authHeader());

    axiosInstance
      .get<Folder[]>(`/folders/${parent}`, {
        signal: controller.signal,
      })
      .then((res) => {
        setCurrentFolders(res.data);
        console.log(res.data);
      })
      .catch((err) => {

        console.log("Into Errooor");
        // if (err.response.status === 401) {
        //   navigate("/");
        //   console.log("Error Status: ...", err.response.status);
        // }
        if (err instanceof CanceledError) return;

      });

    console.log("Into last of use effect....");

    return () => { controller.abort(); setDisplayDelete(false) }
  }, [aaa, parent, refresh]);

  useEffect(() => {
    console.log("Calling get...");
    const controller = new AbortController();

    axiosInstance
      .get<File[]>(`/files/${parent}`, {
        // params: "mainroot",
        // headers: { "x-access-token": user?.accessToken },
        signal: controller.signal,
      })
      .then((res) => {
        setCurrentFiles(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
      });

    return () => { controller.abort(); setDisplayDelete(false) }
  }, [aaa, parent, refresh]);


  const slicedParent = parent.slice(24);


  return (
    <>
      {console.log(
        "Current Folders:" + currentFolders.map((folder) => folder.name)
      )}
      <header style={{ display: "flex", justifyContent: 'space-between' }} onClick={() => { setDisplayDelete(false); setDisplayFileDelete(false); setDeleteChildName(""); }}>
        {displayDelete && <DialogModal open onClick={() => setDisplayDelete(false)} >
          <div style={{ textAlign: "right" }}>
            <DeleteFolderButton ><CloseCircleOutlined onClick={() => { setDisplayDelete(false); setDisplayFileDelete(false); setDeleteChildName(""); }} />  Delete?  <DeleteOutlined onClick={async () => { await DeleteChild(deleteChildName); navigate(0) }} /></DeleteFolderButton>
          </div>
        </DialogModal>}

        {displayFileDelete && <DialogModal open onClick={() => setDisplayFileDelete(false)} >
          <div style={{ textAlign: "right" }}>
            <DeleteFolderButton ><CloseCircleOutlined onClick={() => { setDisplayDelete(false); setDisplayFileDelete(false); setDeleteChildName(""); }} />  Delete File?  <DeleteOutlined onClick={async () => { await DeleteFile(deleteChildName); navigate(0) }} /> </DeleteFolderButton>
          </div>
        </DialogModal>}

        <h2 style={{ textAlign: "left", margin: "10px 20px", display: "inline" }}>{slicedParent}/</h2>
        {!isShowGrid && <SpanButton onClick={() => setIsShowGrid(true)}><AppstoreOutlined /></SpanButton>}
        {isShowGrid && <SpanButton onClick={() => setIsShowGrid(false)}><MenuOutlined /></SpanButton>}
      </header>



      <GridViewUl $isShowGrid={isShowGrid} >

        {currentFolders.map((folder) => (
          <FolderLayout
            key={folder._id}
            onClick={() => { setDisplayDelete(true); setDeleteChildName(folder.name); setDisplayFileDelete(false); }}
            onDoubleClick={() => {
              setaaa(!aaa);
              setDisplayDelete(false);
              navigate(`/${folder.name}`);
            }}
            style={{ backgroundColor: (deleteChildName === folder.name) ? "#a5a5a5" : "" }}
          >
            {/* <li> */}
            <FolderOutlined /> {/* Folder Icon */}
            <SpanButton>{folder.originalName}</SpanButton>
            {/* </li> */}
          </FolderLayout>
        ))}

        {currentFiles.map((file) => (

          <FileLayout
            key={file._id}
            onClick={() => { setDeleteChildName(file.name); setDisplayDelete(false); setDisplayFileDelete(true) }}
            onDoubleClick={() => { fetchFile(file.name, file.originalname) }}
            style={{ backgroundColor: (deleteChildName === file.name) ? "#a5a5a5" : "" }}
          >
            <FileOutlined /> <SpanButton>{file.originalname}</SpanButton></FileLayout>
        ))}


      </GridViewUl>
    </>
  );
}

export default FolderListNew3;
