import React from "react";
import { useRoutes } from "react-router-dom";

import {
    authRoutes,
    privateRouteList
} from "./index";

import PublicLayouts from "./PublicLayout";
import DashboardLayout from "../component/DashboardLayout";


const AllRoutes = (props) => {

    const routes = [
        {
            path: "/",
            element: <PublicLayouts />,
            children: authRoutes,
        },

        {
            path: "/",
            element: <DashboardLayout />,
            children: privateRouteList,
        },
    ];

    const routing = useRoutes(routes);

    return <>{routing}</>;
};

export default AllRoutes;


