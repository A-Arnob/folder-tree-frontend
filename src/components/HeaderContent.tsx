import React, { useState } from 'react'

import { Breadcrumb, Layout, Menu, MenuProps, theme } from 'antd';
import { FileAddOutlined, FolderAddOutlined, MailOutlined } from '@ant-design/icons';
import { Link, Navigate, useParams } from 'react-router-dom';
import FileUpload from './FileUpload';
import { useNavigate } from 'react-router-dom';
import AddFolder from './AddFolder';




function addFile() {
  return (<>
    {/* <FileUpload /> */}
    <div>Hello</div>
  </>)
}

const items: MenuProps['items'] = [
  {
    // label: (<Link to={`/${parent}/addfolder`}>Add Folder</Link>),
    label: 'Add Folder',
    key: 'Folder',
    icon: <FolderAddOutlined />,
  },
  {
    // label: (<Link to={`/${parent}/fileupload`}>Add File</Link>),
    label: "Add file",
    key: 'File',
    icon: <FileAddOutlined />,
  }]

const HeaderContent = () => {

  const { Header, Content, Footer } = Layout;

  const { parent } = useParams();
  const [currentClicked, setCurrentClicked] = useState("");
  const [isAddFolder, setIsAddFolder] = useState(false);
  const [isAddFile, setIsAddFile] = useState(false);

  console.log("Header Param:" + parent);
  // const navigate = useNavigate();

  const menuClickFunction: MenuProps['onClick'] = (e) => {

    setCurrentClicked(e.key);

    if (e.key == "Folder") {
      setIsAddFolder(!isAddFolder);
      setIsAddFile(false);
    } else if (e.key == "File") {
      setIsAddFile(!isAddFile);
      setIsAddFolder(false);
    }

  }



  return (
    <>
      <Layout>
        <Header style={{ display: 'flex', alignItems: 'center' }}>
          <div className="demo-logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            // defaultSelectedKeys={['1']}
            selectedKeys={[currentClicked]}
            items={items}
            style={{ flex: 1, minWidth: 0 }}
            onClick={menuClickFunction}
          />
        </Header>
      </Layout>

      {isAddFolder && <AddFolder />}
      {isAddFile && <FileUpload />}
    </>

  )
}

export default HeaderContent;