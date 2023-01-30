import React from 'react';
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";

const Login = () => {
    return (
        <div>
            <h1>Login page</h1>
            <form >
                <MyInput placehorder={"enter login"}></MyInput>
                <MyInput placehorder={"enter password"}></MyInput>
                <MyButton>Login</MyButton>
            </form>
        </div>
    );
};

export default Login;