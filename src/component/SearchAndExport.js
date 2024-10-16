import React, { memo } from 'react';
import { useLocation } from 'react-router-dom';

const SearchAndExport = memo(function SearchAndExport({ path, setSearch, searchFieldName = '', setShowModal ,setSelectedStartUp,setIsViewMode}) {
    const location = useLocation();
    const pathname = location.pathname.split('/')[1];

    return (
        <>
            <div className="row align-items-center mb-3">
                {/* Left side: Search bar */}
                <div className="col-md-6 col-lg-8">
                    <div className="app-search">
                        <form>
                            {pathname !== "manage_advertisement" && (
                                <div className="input-group">
                                    <input
                                        type="search"
                                        className="form-control"
                                        placeholder={`Search ${searchFieldName}...`}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                    {/* <span className="ri-search-line search-icon text-muted"></span> */}
                                </div>
                            )}
                        </form>
                    </div>
                </div>

                {/* Right side: Add button */}
                <div className="col-md-6 col-lg-4 text-end">
                    <button
                        className="btn btn-outline-primary"
                        type="button"
                        onClick={() => {setShowModal(true) ,  setSelectedStartUp(null) ,setIsViewMode(false)} }
                    >
                        + Add StartUp
                    </button>
                </div>
            </div>
        </>
    );
});

export default SearchAndExport;
