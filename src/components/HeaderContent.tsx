import { useState } from 'react'

import {  Layout, Menu, MenuProps,  } from 'antd';
import { FileAddOutlined, FolderAddOutlined } from '@ant-design/icons';
import {  useParams } from 'react-router-dom';
import FileUpload from './FileUpload';
import { useNavigate } from 'react-router-dom';
import AddFolder from './AddFolder';
import { useAuthContext } from '../context/AuthContext';




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

  },
]



const HeaderContent = () => {

  const { user, setUser } = useAuthContext();
  const nevigate = useNavigate();
  

  const userData: MenuProps['items'] = [
    {
      // label: (<Link to={`/${parent}/addfolder`}>Add Folder</Link>),
      label: user?.userName,
      key: 'userName',
      
    },
    {
      // label: (<Link to={`/${parent}/fileupload`}>Add File</Link>),
      label: "Log Out",
      key: 'logOut',
      
  
    },
  ]

  const { Header, } = Layout;

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
    }else if (e.key === "logOut"){
      setUser(null);
      localStorage.removeItem("user");
      nevigate("/");
    }


  }



  return (
    <>


      <Layout>
        <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className="demo-logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            // defaultSelectedKeys={['1']}
            selectedKeys={[currentClicked]}
            items={items}
            style={{ flex: 1, minWidth: 0, }}
            onClick={menuClickFunction}

          />
          <Menu
            theme="dark"
            mode="horizontal"
            // defaultSelectedKeys={['1']}
            selectedKeys={[currentClicked]}
            items={userData}
            style={{ flex: 1, minWidth: 0, justifyContent: "flex-end" }}
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