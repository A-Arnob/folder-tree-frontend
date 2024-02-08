import axios, { CanceledError } from "axios";
import { useEffect, useState } from "react";
import FetchChild from "./FetchChild";
import DeleteChild from "./DeleteChild";

interface Folder {
  _id: string;
  name: string;
  parent: string;
}

const NestedFolder = ({ _id, name, parent }: Folder) => {
  const [showNested, setShowNested] = useState(false);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [currentFolders, setCurrentFolders] = useState<Folder[]>([]);
  const [deleteFolderState, setDeleteFolderState] = useState(false);
  //   const [pparent, setpparent] = useState("");
  //   setFolders(FetchChild(name));
  const foldersData: Folder[] = FetchChild(name);
  const currentFoldersData: Folder[] = FetchChild(parent);
  // setCurrentFolders(currentFoldersData);
  console.log(
    "Parent Folders:" + currentFoldersData.map((folder) => folder.name)
  );

  // if (deleteFolderState) {
  // }

  // console.log("Folders:" + folders.map((folder) => folder.name));
  const root: string = "root";

  // useEffect(() => {
  //   const controller = new AbortController();

  //   axios
  //     .get<Folder[]>(`http://localhost:8080/folders/${name}`, {
  //       // params: parent,
  //       signal: controller.signal,
  //     })
  //     .then((res) => {
  //       // console.log(res.data);
  //       setFolders(res.data);
  //     })
  //     .catch((err) => {
  //       if (err instanceof CanceledError) return;
  //     });

  //   return () => controller.abort();
  // }, [showNested]);

  // useEffect(() => {}, [deleteFolderState]);

  const deletefolder = async (name: string) => {
    const { status } = await DeleteChild(name);
    console.log(status);
    if (status === 200) {
      // setFolders(currentFoldersData);

      console.log("Folders:" + folders.map((folder) => folder.name));
    }
    return;
  };

  return (
    <>
      <ul>
        <li key={_id} style={{ marginBottom: 20 }}>
          {name} {parent}
          <button
            style={{ marginLeft: 10 }}
            onClick={() => {
              setShowNested(!showNested);
              setFolders(foldersData);
              // console.log("Folders:" + folders.map((folder) => folder.name));
              // console.log("Clicked Folder Name:" + name);
            }}
          >
            Click
          </button>
          {name != root && (
            <button
              style={{ marginLeft: 10 }}
              onClick={() => {
                // setFolders(folders.filter((folder) => {if (folder.name == name) {console.log(name); return name}}));
                setFolders([]);
                // deletefolder(name, parent);

                console.log("Folders:" + folders.map((folder) => folder.name));
                console.log("Clicked Folder Name:" + name);
                console.log("Clicked Parent Name:" + parent);
                setDeleteFolderState(!deleteFolderState);
              }}
            >
              Delete
            </button>
          )}
          <button style={{ marginLeft: 10 }}>Add Folder</button>
        </li>

        {deleteFolderState && <FolderList />}

        {showNested &&
          folders.length >= 0 &&
          folders.map((child) => (
            <NestedFolder
              key={child._id}
              _id={child._id}
              name={child.name}
              parent={child.parent}
            />
          ))}
      </ul>
    </>
  );
};

const FolderList = () => {
  const [folders, setFolders] = useState<Folder[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    axios
      .get<Folder[]>("http://localhost:8080/folders/mainroot", {
        // params: "mainroot",
        signal: controller.signal,
      })
      .then((res) => {
        setFolders(res.data);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
      });

    return () => controller.abort();
  }, []);
  return (
    <div>
      {folders.map((folder) => (
        <NestedFolder
          key={folder._id}
          _id={folder._id}
          name={folder.name}
          parent={folder.parent}
        />
      ))}
    </div>
  );
};

export default FolderList;
