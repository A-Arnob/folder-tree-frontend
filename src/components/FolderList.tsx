import axios, { CanceledError } from "axios";
import { useEffect, useState } from "react";

interface Folder {
  _id: "string";
  name: "string";
  children: Folder[];
}

const NestedFolder = ({ _id, name, children }: Folder) => {
  const [showNested, setShowNested] = useState(false);

  const root: string = "root";

  return (
    <>
      <ul>
        <li key={_id} style={{ marginBottom: 20 }}>
          {name}
          <button
            style={{ marginLeft: 10 }}
            onClick={() => setShowNested(!showNested)}
          >
            Click
          </button>
          {name != root && <button style={{ marginLeft: 10 }}>Delete</button>}
          <button style={{ marginLeft: 10 }}>Add Folder</button>
        </li>

        {showNested &&
          children.length >= 0 &&
          children.map((child) => (
            <NestedFolder
              _id={child._id}
              name={child.name}
              children={child.children}
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
      .get<Folder[]>("http://localhost:8080/folders", {
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
          _id={folder._id}
          name={folder.name}
          children={folder.children}
        />
      ))}
    </div>
  );
};

export default FolderList;
