// Header.js
import React, { useState } from 'react';
import { Layout, Menu, MenuProps } from 'antd';
import SignUp from './Signup';
import SignIn from './SignIn';

const { Header } = Layout;

const items: MenuProps['items'] = [
    {
        // label: (<Link to={`/${parent}/addfolder`}>Add Folder</Link>),
        label: 'Sign Up',
        key: 'signup',
    },
    {
        // label: (<Link to={`/${parent}/fileupload`}>Add File</Link>),
        label: "Sign In",
        key: 'signin',
    }]

// const SignUpHandler: MenuProps["onClick"] = () => {
//     console.log("Clicked");
//     return <SignUp />;
// }

// function SignInHandler() {
//     return <SignIn />;
// }

const SignUpHeader = () => {
    const [signType, setSignType] = useState("");

    const setSignTypeProps = (value:string)=>{
        setSignType(value);
    }

    const onClickHandler: MenuProps["onClick"] = (e) => {
        setSignType(e.key);
    }


    return (
        <>
            <Header>
                {/* <div className="logo">Your Logo</div> */}
                <Menu theme="dark" mode="horizontal" items={items} onClick={onClickHandler} />
            </Header>
            <h1 style={{ color: "red", textAlign: "center", margin: "40px auto" }}>Sign Up OR Sign In  </h1>
            {signType === "signup" && <SignUp setSignTypeProps={setSignTypeProps}/>}
            {signType === "signin" && <SignIn />}
        </>
    );
};

export default SignUpHeader;
