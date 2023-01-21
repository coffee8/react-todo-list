import React from "react";
import './styles/App.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Posts from "./pages/Posts";
import About from "./pages/About";
import Navbar from "./components/UI/navbar/Navbar";
import Error from "./pages/Error";


function App() {

    return (
        <BrowserRouter>
            <Navbar></Navbar>
            <Routes>
                <Route element={<About/>} path={'/about'}/>
                <Route element={<Posts/>} path={'/posts'}/>
                <Route element={<Error/>} path={'/error'}/>
                <Route element={<Navigate to={'/error'} replace/>} path={'/*'}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
