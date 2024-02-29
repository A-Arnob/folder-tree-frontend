// MyForm.js
import React, { useContext } from 'react';
import { Form, Input, Button } from 'antd';
import signedServices from '../services/SignInService';
import { User, useAuthContext } from '../context/AuthContext';


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
            }
        }

    };

    return (
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
    );
};

export default SignIn;
