import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import About from "../pages/About";
import Posts from "../pages/Posts";
import Error from "../pages/Error";
import PostIdPage from "../pages/PostIdPage";

const AppRouter = () => {
    return (
        <Routes>
            <Route element={<About/>} path={'/about'}/>
            <Route element={<Posts/>} path={'/posts'}/>
            <Route element={<PostIdPage/>} path={'/posts/:id'}/>
            <Route element={<Error/>} path={'/error'}/>
            <Route element={<Navigate to={'/error'} replace/>} path={'/*'}/>
        </Routes>
    );
};

export default AppRouter;