// MyForm.js
import React from 'react';
import { Form, Input, Button } from 'antd';
import SignInService from '../services/SignInService';


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

const SignIn = () => {
    const onFinish = (values: userData) => {
        console.log('Form values:', values);
        // Handle form submission here
        SignInService(values.email, values.password);
    };

    return (
        <Form {...formItemLayout} variant="filled" style={{ maxWidth: 600, margin: "0 auto" }} onFinish={onFinish}>

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
