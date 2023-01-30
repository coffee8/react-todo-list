import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../router";

const AppRouter = () => {
    const isAuth = true;
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