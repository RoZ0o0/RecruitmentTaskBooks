function PaginationBar ({ pageSize, currentPage, total, pageChange }) {
    if ( currentPage === 0 || total <= pageSize) {
        return null;
    }

    const nextPage = () => {
        pageChange(currentPage + 1);
    }

    const previousPage = () => {
        pageChange(currentPage - 1);
    }

    const calculatePages = (size) => {
        let pages = 0;
        while (size > 0) {
            size -= this.pageSize;
            pages++;
        }

        return pages;
    }

    const pagesCount = calculatePages(total);

    return (
        <ul>
            <li onClick={previousPage}>
                c
            </li>
            {
            }
        </ul>
    );
}

export default PaginationBar;