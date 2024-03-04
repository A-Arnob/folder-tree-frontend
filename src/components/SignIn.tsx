// MyForm.js
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useContext } from 'react';
import { Form, Input, Button } from 'antd';
import signedServices from '../services/SignInService';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { User, useAuthContext } from '../context/AuthContext';
import { axiosInstance } from '../api/axios';
import { useNavigate } from 'react-router-dom';


const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
    },
};

interface userData {
    email: string;
    password: string;
}

// export let userTokenData: User;

const SignIn = () => {

    const { setUser } = useAuthContext();
    const nevigate = useNavigate();

    const onFinish = async (values: userData) => {
        console.log('Form values:', values);
        // Handle form submission here
        // const userTokenData = signedServices.SignInService(values.email, values.password, (_error, userTokenData) => {
        //     if (userTokenData) {
        //         if (userTokenData.accessToken && userTokenData.refreshToken) {
        //             localStorage.setItem("user", JSON.stringify(userTokenData));
        //             setUser(userTokenData);
        //         }
        //     }
        // });

        const userTokenData = await signedServices.SignInService(values.email, values.password);

        if (userTokenData) {
            if (userTokenData.accessToken && userTokenData.refreshToken) {
                localStorage.setItem("user", JSON.stringify(userTokenData));
                setUser(userTokenData);
                axiosInstance.defaults.headers["x-access-token"] = userTokenData.accessToken;
                nevigate("/mainroot");
            }
        }

    };

    return (
        <>
        <h2 style={{margin:"20px auto", textAlign:"center"}}>Sign In First</h2>
        <Form {...formItemLayout} variant="filled" style={{ maxWidth: 600, margin: "20px auto" }} onFinish={onFinish}>

            <Form.Item
                name="email"
                label="email"
                rules={[
                    { required: true, message: 'Please enter your email' },
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                    // Add more validation rules as needed
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="password"
                label="Password"
                rules={[
                    { required: true, message: 'Please enter your password' },
                    // Add more validation rules as needed
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
        </>
    );
};

export default SignIn;
