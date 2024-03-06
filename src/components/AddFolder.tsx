import { FormEvent, useRef, useState } from "react";
import SendFolder from "./SendFolder";
import "./AddFolder.css";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Modal, Form, Input } from "antd";
import { styled } from "styled-components";
import FolderListNew3 from "./FolderListNew3";
import { useRefreshContext } from "../context/refreshContext";


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
  const {refresh,setRefresh} = useRefreshContext();

  const { parent } = useParams();
  const [nameRef, setNameRef] = useState("");
  const newFolder = { name: "test", parent: "" };
  const [showForm, setShowForm] = useState(true);
  const [showOk, setShowOk] = useState(false);
  const [test, setTest] = useState(false);
  const navigate = useNavigate();

  const [form] = Form.useForm();
  let ParentFolderName = parent;


  const handleSubmit = async (event: FormEvent) => {
    if (ParentFolderName == undefined) {
      ParentFolderName = "mainroot";
    }
    console.log("print Name Ref: " + nameRef);
    event.defaultPrevented;

    const trimmedNameValue = nameRef.trim();

    if (!trimmedNameValue) {
      console.log("Returning........");
      return;
    }

    newFolder.name = trimmedNameValue;
    newFolder.parent = ParentFolderName;

    await SendFolder(newFolder);
    // console.log(newFolder);


    // navigate(0);
    setTest(!test);
    setRefresh(!refresh);

    return;

    // checkAddFolder();
  };

  function okButtonHandler(name: string) {
    const trimmedNameValue = name.trim();

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
            <Input id="name" type="text" name="name" defaultValue={`New Folder`} onChange={(e) => { okButtonHandler(e.target.value); setNameRef(e.target.value) }} required />
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
