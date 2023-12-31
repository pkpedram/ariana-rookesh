import React from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import { FiChevronRight } from 'react-icons/fi';
import { filterActions } from '../../redux/actions';
import { connect } from 'react-redux';
import { useEffect } from 'react';

const Pagination = ({postsPerPage, totalPosts, paginate,  currentPage, setCurrentPage}) => {

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }
    useEffect(() => {
        // paginate(0, postsPerPage);
    }, [])

    const prevPage = () => {
       if(currentPage !== 1){
        // paginate(currentPage - 1, postsPerPage); setCurrentPage(currentPage - 1)
       }
    }

    const nextPage = () => {
        if(currentPage !== pageNumbers[pageNumbers.length - 1]){
            // paginate(currentPage + 1, postsPerPage); setCurrentPage(currentPage + 1)
        }
    }

    return (
        <div className='flex items-center justify-start w-max bg-navyLight rounded py-2 px-4'>
            <ul className='  flex items-center justify-center'>
            <span onClick={prevPage} className="text-white h-6 w-8 bg-navy rounded-r flex items-center justify-center cursor-pointer hover:bg-navy/70 transition-all">
                    <FiChevronRight />
                </span>
                {pageNumbers.map((number) => (
                    <li key={number} className='inline-block cursor-pointer'>
                        <a className={currentPage === number ? `text-xs bg-navyLight text-white w-6 h-6 flex items-center justify-center select-none ` : 'text-xs border-x border-navyLight text-gray-300 w-6 h-6 flex  bg-navy items-center justify-center select-none'} onClick={() => {paginate(number - 1, postsPerPage); setCurrentPage(number)}}>
                            {number.toLocaleString('fa-ir')}
                        </a>
                    </li>
                ))}
              

                <span onClick={nextPage} className="text-white h-6 w-8 bg-navy rounded-l flex items-center justify-center cursor-pointer hover:bg-navy/70 transition-all">
                    <FiChevronLeft />
                </span>
            </ul>

            <p className='text-xs text-gray-400 mr-3'>
                نمایش {(currentPage - 1) * postsPerPage + 1} تا {totalPosts < postsPerPage ? totalPosts : currentPage * postsPerPage} از {totalPosts}
            </p>
        </div>
    );
};
const mapStateToProps = state => ({

})
const mapDispatchToProps = {
    paginate: filterActions.paginate
}

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);