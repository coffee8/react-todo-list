import React from 'react';
import {getPagesArray} from "../../../utils/pages";

const Pagination = ({totalPages, changePage, page}) => {
    const pagesArray = getPagesArray(totalPages);

    return (
        <div className='page-wrapper'>
            {pagesArray.map(p =>
                <span onClick={() => changePage(p)}
                      className={page === p ? `page-button page-current` : 'page-button'}
                      key={p}>
                    {p}
                </span>
            )}
        </div>
    );
};

export default Pagination;