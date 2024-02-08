import axios, { CanceledError } from "axios";
import { useEffect, useState } from "react";
import FetchChild from "./FetchChild";
import DeleteChild from "./DeleteChild";
import AddFolder from "./AddFolder";
import { Link, useParams } from "react-router-dom";

interface Folder {
  _id: string;
  name: string;
  parent: string;
}

interface NestedProps {
  name: string;
  DeleteFolder: (a: string) => any;
  // addNewFolder: (a: string) => any;
}

function NestedFolder({ name, DeleteFolder }: NestedProps) {
  const [displayNested, setDisplayNested] = useState(false);
  const [isAddFolder, setIsAddFolder] = useState(false);

  return (
    <>
      {isAddFolder && <AddFolder ParentFolderName={name} />}
      <li style={{ marginBottom: 20 }}>
        <Link to={`/${name}`}>{name}</Link>

        <button
          style={{ marginLeft: 10 }}
          onClick={() => {
            setDisplayNested(!displayNested);
            console.log("Clicked Folder: " + name);
            // setCurrentFolderName(folder.name);
          }}
        >
          Click
        </button>
        {name != "root" && (
          <button style={{ marginLeft: 10 }} onClick={() => DeleteFolder(name)}>
            Delete
          </button>
        )}
        <button
          style={{ marginLeft: 10 }}
          onClick={() => {
            setIsAddFolder(!isAddFolder);
            setDisplayNested(false);
          }}
        >
          Add Folder
        </button>
      </li>

      {displayNested && <FolderListNew2 parent={name} />}
    </>
  );
}

function FolderListNew2({ parent }: { parent: string }) {
  const { id } = useParams();
  console.log("params: " + id);
  const [currentFolders, setCurrentFolders] = useState<Folder[]>([]);

  const [currentFolderName, setCurrentFolderName] = useState("");

  async function DeleteFolder(name: string) {
    const { status } = await DeleteChild(name);
    console.log(status);
    console.log("Delete Button Clicked:  " + name);
    setCurrentFolders(currentFolders.filter((folder) => folder.name != name));
  }

  // function addNewFolder(name: string) {
  //   // setCurrentFolders(currentFolders)
  //   setIsAddFolder(true);

  // }

  useEffect(() => {
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
  }, []);

  return (
    <>
      {/* <div>FolderListNew2</div>; */}
      {console.log(
        "Current Folders:" + currentFolders.map((folder) => folder.name)
      )}
      <ul>
        {currentFolders.map((folder) => (
          <div>
            <NestedFolder
              key={folder._id}
              name={folder.name}
              DeleteFolder={DeleteFolder}
              // addNewFolder={addNewFolder}
            />
          </div>
        ))}
      </ul>
      {/* {displayNested &&  currentFolders.map} */}
    </>
  );
}

export default FolderListNew2;
