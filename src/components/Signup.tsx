// MyForm.js
import React from 'react';
import { Form, Input, Button } from 'antd';
import SignUpService from '../services/SignUpService';
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
    userName: string;
    email: string;
    password: string;
}

// interface setSignTypeProps{

// }

const SignUp = ({setSignTypeProps}) => {
    const nevigate = useNavigate();

    const onFinish = (values: userData) => {
        console.log('Form values:', values);
        // Handle form submission here
        SignUpService(values.userName, values.email, values.password);
        // nevigate("/signin");
        setSignTypeProps("signin")

    };

    return (
        <Form {...formItemLayout} variant="filled" style={{ maxWidth: 600, margin: "20px auto" }} onFinish={onFinish}>
            <Form.Item
                name="userName"
                label="Username"
                rules={[
                    { required: true, message: 'Please enter your username' },
                    // Add more validation rules as needed
                ]}
            >
                <Input />
            </Form.Item>

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

export default SignUp;
