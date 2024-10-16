import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import * as API from '../../../utils/api.service'
import Cookies from 'js-cookie';

const Header = () => {
    const navigate = useNavigate();
    const user = Cookies.get('token') ?  JSON.parse(Cookies.get('userDetails'))  : {} || {};
    const handleLogout = async () => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You will be logged out!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, logout!',
            cancelButtonText: 'Cancel'
        });

        if (result.isConfirmed) {
            await API.logout().then(
                
                responce => {
                    Cookies.remove('token');
                    Cookies.remove('userDetails');

                    return responce ;
                }
                
            )

            navigate("/login");
        }
    };

    return (
        <header className="d-flex justify-content-between align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">Welcome, {user?.user_name}</h1>
            <div className="btn-toolbar mb-2 mb-md-0">
                <button
                    className="btn btn-danger"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </header>
    );
};

export default Header;
