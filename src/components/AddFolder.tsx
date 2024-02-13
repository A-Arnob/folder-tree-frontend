import { FormEvent, useRef, useState } from "react";
import SendFolder from "./SendFolder";
import "./AddFolder.css";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "antd";
import { styled } from "styled-components";


const SubmitButton = styled.button`
  color: white;
  margin: 10px 10px;
  border: 1px solid blue;
  border-radius: 6px;
  background: #3780c4;
  font-size: 14px;
  line-height: 1.5714285714285714;
  height: 32px;
  padding: 4px 15px;
  
  

  &:hover {
    background: #6a9bc9;
    border: 1px solid blue;
    
    
  }
`;



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
    navigate(0);
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
              <Button danger onClick={() => { setShowForm(false); }}>Cancel</Button>
              <SubmitButton type="submit">
                Submit
              </SubmitButton>
            </div>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default AddFolder;
