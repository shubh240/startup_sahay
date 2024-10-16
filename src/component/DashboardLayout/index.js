import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";

const DashboardLayout = ({ children }) => {
    const navigate = useNavigate();
    const [isRender, setIsRender] = useState(false);

    const isLoggedIn = Cookies.get('token');

    useEffect(() => {
        if (!isLoggedIn?.length) {
            navigate("/login");
        } else {
            setIsRender(true);
        }
    }, [isLoggedIn, navigate]);

    return (
        <div className="container-fluid">
            <div className="row">
                {/* Sidebar */}
                <nav className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
                    <div className="position-sticky">
                        {/* Logo */}
                        <div className="d-flex align-items-center p-3">
                            <img src="/assets/images/indialogo.jpg" alt="Logo" className="img-fluid circle-rounded" style={{ height: '40px' }} />
                        </div>

                        {/* Navigation Links */}
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <Link className="nav-link active" to="/dashboard">Dashboard</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                {/* Main content */}
                <main className="col-md-9 ms-sm-auto col-lg-10 px-4">
                    <Header />
                    <div className="content">
                        {children}
                        <Outlet />
                    </div>
                    {/* <Footer /> */}
                </main>
            </div>
        </div>

    )
}

export default DashboardLayout;