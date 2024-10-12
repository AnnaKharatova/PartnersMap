import './MyPaginate.css'
import ReactPaginate from 'react-paginate';

const MyPagination = ({ handleSubmit, fiteredData, page, setPage }) => {

    const pages = Math.ceil(fiteredData.count / 2)
    const handleNumberClick = (number) => {
        setPage(number);
        handleSubmit(number);
    };

    return (
        <div>
            <ReactPaginate
                pageCount={pages}
                breakLabel="..."
                nextLabel={pages != page ? ">" : ''}
                onPageChange={(event) => handleNumberClick((event.selected + 1))}
                pageRangeDisplayed={3}
                previousLabel={page > 1 ? "<" : ''}
                renderOnZeroPageCount={null}
                containerClassName="pagination"
                activeClassName="pagination__active"
            />
        </div>
    );
};

export default MyPagination;
