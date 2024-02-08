import { FormEvent, useRef, useState } from "react";
import SendFolder from "./SendFolder";
import "./AddFolder.css";

// export const checkAddFolder = () => {
//   return true;
// };

const AddFolder = ({ ParentFolderName }: { ParentFolderName: string }) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const newFolder = { name: "", parent: "" };
  const [showForm, setShowForm] = useState(true);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (nameRef.current !== null) {
      //   console.log(nameRef.current.value);
      newFolder.name = nameRef.current.value;
      newFolder.parent = ParentFolderName;
    }

    // console.log(newFolder);

    SendFolder(newFolder);
    setShowForm(false);
    // checkAddFolder();
  };

  return (
    <div>
      {showForm && (
        <dialog id="dialog" open>
          <form method="dialog" onSubmit={handleSubmit}>
            <div style={{ textAlign: "center", marginTop: "10rem" }}>
              <label
                htmlFor="name"
                style={{ display: "block", marginBottom: "10px" }}
              >
                Add Folder in {ParentFolderName}
              </label>
              <input ref={nameRef} id="name" type="text" required />
            </div>
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <button onClick={() => setShowForm(false)}>Cancel</button>
              <button style={{ marginLeft: "10px" }} type="submit">
                Submit
              </button>
            </div>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default AddFolder;
