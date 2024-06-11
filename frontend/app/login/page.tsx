'use client'
import React, { useState } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";

const Login = () => {
    const [dappAddress, setDappAddress] = useState<string>(
        "0xab7528bb862fb57e8a2bcd567a2e929a0be56a5e"
    );
    
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100 shadow-md">
            <div className="bg-gray-100 p-5 rounded-lg">
            <LoginForm dappAddress={dappAddress} />
            </div>
        </div>
    );
};

export default Login;
