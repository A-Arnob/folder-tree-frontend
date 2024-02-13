import { FormEvent, useRef, useState } from "react";
import SendFolder from "./SendFolder";
import "./AddFolder.css";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Modal, Form } from "antd";
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
  const newFolder = { name: "test", parent: "" };
  const [showForm, setShowForm] = useState(true);
  const [showOk, setShowOk] = useState(false);
  const navigate = useNavigate();

  const [form] = Form.useForm();
  let ParentFolderName = parent;


  const handleSubmit = (event: FormEvent) => {
    if (ParentFolderName == undefined) {
      ParentFolderName = "root";
    }
    console.log("print Name Ref: " + nameRef.current?.value);
    event.defaultPrevented;

    const trimmedNameValue = nameRef.current?.value.trim();

    if (!trimmedNameValue) {
      console.log("Returning........");
      return;
    }

    newFolder.name = trimmedNameValue;
    newFolder.parent = ParentFolderName;

    SendFolder(newFolder);
    // console.log(newFolder);


    navigate(0);

    return;

    // checkAddFolder();
  };

  function okButtonHandler() {
    const trimmedNameValue = nameRef.current?.value.trim();

    if (trimmedNameValue) {
      setShowOk(true);
    } else {

      setShowOk(false);
    }
  }


  return (
    <div>
      {/* {showForm && ( */}
      <Modal title="Folder Add" open={showForm} onOk={form.submit} okButtonProps={{ disabled: !showOk }} onCancel={() => setShowForm(false)}>

        <Form form={form} onFinish={handleSubmit}>
          <div style={{ textAlign: "center", marginTop: "2rem", marginBottom: "1rem" }}>
            <label
              htmlFor="name"
              style={{ display: "block", marginBottom: "10px" }}
            >
              Add Folder in {ParentFolderName}
            </label>
            <input ref={nameRef} id="name" type="text" name="name" onChange={okButtonHandler} required />
          </div>
          {/* <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Button danger onClick={() => { setShowForm(false); }}>Cancel</Button>
            <SubmitButton type="submit">
              Submit
            </SubmitButton>
          </div> */}
        </Form>
      </Modal>

    </div>
  );
};

export default AddFolder;
