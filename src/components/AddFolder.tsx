import { FormEvent, useRef, useState } from "react";
import SendFolder from "./SendFolder";
import "./AddFolder.css";
import { useNavigate, useParams } from "react-router-dom";

// export const checkAddFolder = () => {
//   return true;
// };

// const AddFolder = ({ ParentFolderName }: { ParentFolderName: string }) => {
const AddFolder = () => {
  const { parent } = useParams();
  const nameRef = useRef<HTMLInputElement>(null);
  const newFolder = { name: "", parent: "" };
  const [showForm, setShowForm] = useState(true);
  const navigate = useNavigate();

  let ParentFolderName = parent;


  const handleSubmit = (event: FormEvent) => {
    if (ParentFolderName == undefined) {
      ParentFolderName = "root";
    }
    event.preventDefault();
    if (nameRef.current !== null) {
      //   console.log(nameRef.current.value);
      newFolder.name = nameRef.current.value;
      newFolder.parent = ParentFolderName;
    }

    // console.log(newFolder);

    SendFolder(newFolder);
    setShowForm(false);
    navigate(-1);
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
