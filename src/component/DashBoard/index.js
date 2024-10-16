import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../../index.css';
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import Pagination from "../Pagination"
import useDebounce from "../../hooks/useDebounce";
import SearchAndExport from "../SearchAndExport";
import { getStartUpDetails } from "../../store/slice/startUpListSlice";
import { SEARCH_DELAY } from "../../app.config";
import { setLoader } from "../../store/slice/masterSlice";
import AddStartupModal from "../AddStartupModal";
import Swal from 'sweetalert2';
import * as API from '../../utils/api.service';

const Dashboard = () => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const [search, setSearch] = useState("");
    const debounce = useDebounce(search, SEARCH_DELAY);
    const { StartUpList: { data: StartUpList } } = useSelector((state) => state.startUp);
    const handlePageChange = (newPage) => { setPage(newPage) };
    const [showModal, setShowModal] = useState(false);
    const [selectedStartUp, setSelectedStartUp] = useState(null);
    const [isViewMode, setIsViewMode] = useState(false);

    const handleStartUpAPI = () => {
        dispatch(setLoader(true));
        let submitData = {
            search: debounce,
            page: page
        }
        dispatch(getStartUpDetails(submitData));
        dispatch(setLoader(false));
    };

    // Open modal for editing
    const handleEdit = (startup) => {
        setSelectedStartUp(startup);
        setShowModal(true);
        setIsViewMode(false);
    };

      // Open modal for viewing details
      const handleView = (startUpData) => {
        setSelectedStartUp(startUpData);
        setIsViewMode(true);
        setShowModal(true);
    };

    // delete startup
    const handleDelete = async (id) => {
        const { value: confirmDelete } = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        });

        if (confirmDelete) {
            try {
                const body = { id };
                await API.deleteStarUpApi(body);
                dispatch(getStartUpDetails());

                Swal.fire(
                    'Deleted!',
                    'Your startup has been deleted.',
                    'success'
                );
            } catch (error) {
                Swal.fire(
                    'Error!',
                    error.message || 'Failed to delete the startup.',
                    'error'
                );
            }
        }
    };

    const startUpListData = useMemo(() => {
        return StartUpList?.map((item, index) => (
            <tr key={index}>
                <td>{item?.id}</td>
                <td>{item?.startup_name}</td>
                <td>{item?.created_at}</td>
                <td>{item?.state}</td>
                <td>{item?.phone_number}</td>
                <td>
                    <a
                        className="text-primary fs-5 mx-2 cursor_pointer action-icon"
                        onClick={() => handleView(item)}
                    >
                        <i className="ri-eye-line"></i>
                    </a>

                    <a
                        className="text-warning fs-5 mx-2 cursor_pointer action-icon"
                        onClick={() => handleEdit(item)}
                    >
                        <i className="ri-edit-line"></i>
                    </a>

                    <a
                        className="text-danger fs-5 mx-2 cursor_pointer action-icon"
                        onClick={() => handleDelete(item?.id)}
                    >
                        <i className="ri-delete-bin-6-line"></i>
                    </a>
                </td>
            </tr>
        ));
    }, [StartUpList]);

    useEffect(() => {
        handleStartUpAPI();
    }, [page, debounce]);

    return (
        <main className="page_wrepper">
            <div className="content">
                <div className="container-fluid">
                    <div className="card rounded-3">
                        <div className="card-body">
                            <div className="rounded-3 mb-3">
                                <SearchAndExport searchFieldName="Start up name , Founder name ..." setSearch={setSearch} setShowModal={setShowModal} setSelectedStartUp={setSelectedStartUp} setIsViewMode={setIsViewMode}/>
                            </div>
                            <div className="responsive-table-plugin">
                                <div className="table-rep-plugin">
                                    <div className="table-responsive mb-3" data-pattern="priority-columns">
                                        {StartUpList?.length > 0 ? (
                                            <table className="table table-hover table-centered mb-0">
                                                <thead>
                                                    <tr>
                                                        <th>Id</th>
                                                        <th>StartUp Name</th>
                                                        <th>Incorporation Date</th>
                                                        <th>State</th>
                                                        <th>Phone Number</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {startUpListData}
                                                </tbody>
                                            </table>
                                        ) : (
                                            <p className="text-center">No Data Found</p>
                                        )}
                                    </div>

                                    {/* Pagination */}
                                    {StartUpList?.length > 0 && (
                                        <Pagination
                                            className='mt-5'
                                            per_page={StartUpList[0]?.per_page}
                                            pageCount={StartUpList[0]?.startup_count}
                                            onPageChange={handlePageChange}
                                            page={page}
                                            lableName="StartUpData"
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add Startup Modal */}
              <AddStartupModal
                showModal={showModal}
                setShowModal={setShowModal}
                selectedStartUp={selectedStartUp}
                isViewMode={isViewMode}
            />
        </main>
    );
}

export default Dashboard;
