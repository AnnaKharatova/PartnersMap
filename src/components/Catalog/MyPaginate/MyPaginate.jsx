import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';

const MyPagination = ({ }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [data, setData] = useState([]);
    const itemsPerPage = 10;

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    const offset = currentPage * itemsPerPage;
    const paginatedData = data.slice(offset, offset + itemsPerPage);

    return (
        <div>
            {/* Display paginated data */}
            {paginatedData.map((item) => (
                <div key={item.id}>{item.name}</div>
            ))}

            {/* Pagination component */}
            <ReactPaginate
                pageCount={Math.ceil(data.length / itemsPerPage)}
                onPageChange={handlePageChange}
                containerClassName="pagination"
                activeClassName="active"
                pageRangeDisplayed={5}
                marginPagesDisplayed={2}
            />
        </div>
    );
};

export default MyPagination;
