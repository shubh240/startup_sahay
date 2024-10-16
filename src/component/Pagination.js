import React, { useEffect, useState, memo } from 'react';
import { useTranslation } from 'react-i18next';

const Pagination = memo(function Pagination({ per_page, pageCount, onPageChange, page, lableName }) {
    const { t } = useTranslation();
    const [currentPage, setCurrentPage] = useState(page);
    const totalPages = Math.ceil(pageCount / per_page) || 4;

    useEffect(() => {
        setCurrentPage(page);
    }, [page]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
            onPageChange(newPage);
        }
    };

    const renderPageItems = () => {
        const pageItems = [];
        const maxVisiblePages = 3;
        let startPage = currentPage - Math.floor(maxVisiblePages / 2);
        startPage = Math.max(startPage, 1);
        const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

        pageItems.push(
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>{t("Previous")}</button>
            </li>
        );

        for (let onepage = startPage; onepage <= endPage; onepage++) {
            const isActive = currentPage === onepage;
            pageItems.push(
                <li key={onepage} className={`page-item ${isActive ? 'active' : ''}`}>
                    <button
                        className="page-link"
                        onClick={() => handlePageChange(onepage)}
                        disabled={isActive}
                    >
                        {onepage}
                    </button>
                </li>
            );
        }

        pageItems.push(
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>{t("Next")}</button>
            </li>
        );

        return pageItems;
    };

    return (
        <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center">
                {renderPageItems()}
            </ul>
        </nav>
    );
});

export default Pagination;
