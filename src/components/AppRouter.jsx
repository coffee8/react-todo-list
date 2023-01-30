import React, {useContext} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../router";
import {AuthContext} from "../context";
import Loader from "./UI/loader/Loader";

const AppRouter = () => {

    const {isAuth, isLoading} = useContext(AuthContext);

    if(isLoading) {
        return <Loader/>
    }

    return (
        isAuth
            ? <Routes>
                {privateRoutes.map(route =>
                    <Route
                        element={<route.component/>}
                        path={route.path}
                    />
                )}
                <Route element={<Navigate to={'/posts'} replace/>} path={'/*'}/>
            </Routes>
            : <Routes>
                {publicRoutes.map(route =>
                    <Route
                        element={<route.component/>}
                        path={route.path}
                    />
                )}
                <Route element={<Navigate to={'/login'} replace/>} path={'/*'}/>
            </Routes>

    );
};

export default AppRouter;