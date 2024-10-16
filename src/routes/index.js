import { Suspense, lazy } from "react";
import SignUp from "../component/SignUp";
import LoginForm from "../component/Login";

export const Loadable = (Component) => (props) => {
    return (
        <Suspense>
            <Component {...props} />
        </Suspense>
    );
};

const PageNotFound = Loadable(lazy(() => import("../pages/PageNotFound")));
const Dashboard = Loadable(lazy(() => import("../pages/DashBoard")));


const publicRouteList = [

];

const authRoutes = [
    {
        path: "/signup",
        name: "Singup Page",
        element: <SignUp />,
    },
    {
        path: "/login",
        name: "Login Page",
        element: <LoginForm />,
    }
];

const privateRouteList = [
    {
        path: "/dashboard",
        name: "Dashboards",
        element: <Dashboard />,
    }
];

export { publicRouteList, privateRouteList, authRoutes };
