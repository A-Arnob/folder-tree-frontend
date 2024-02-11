import React from 'react'

import { Breadcrumb, Layout, Menu, MenuProps, theme } from 'antd';
import { FileAddOutlined, FolderAddOutlined, MailOutlined } from '@ant-design/icons';
import { Link, Navigate, useParams } from 'react-router-dom';
import FileUpload from './FileUpload';
import { useNavigate } from 'react-router-dom';




function addFile() {
  return (<>
    {/* <FileUpload /> */}
    <div>Hello</div>
  </>)
}


const HeaderContent = () => {

  const { Header, Content, Footer } = Layout;

  const { parent } = useParams();

  console.log("Header Param:" + parent);
  // const navigate = useNavigate();

  const items: MenuProps['items'] = [
    {
      label: (<Link to={`/${parent}/addfolder`}>Add Folder</Link>),
      key: 'Folder',
      icon: <FolderAddOutlined />,
    },
    {
      label: (<Link to={`/${parent}/fileupload`}>Add File</Link>),
      // label: "Add file",
      key: 'File',
      icon: <FileAddOutlined />,
    }]
  // const {
  //   token: { colorBgContainer, borderRadiusLG },
  // } = theme.useToken();

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
    </Layout>
  )
}

export default HeaderContent;