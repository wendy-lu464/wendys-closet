import React, { useState } from 'react'
import ItemCards from './ItemCards'
import ClosetFiltering from './ClosetFiltering'
import { useFetchAllItemsQuery } from '../../redux/features/items/itemsApi'

const filters = {
    categories: ['all', 'top', 'bottom', 'one-piece', 'shoes', 'accessory'],
    colors: ['all', 'black', 'grey', 'white', 'cream', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'gold', 'silver'],
}

const ClosetPage = () => {
    const defaultFilters = {
        category: 'all',
        color: 'all',
        archived: false
    }

    const [filtersState, setFiltersState] = useState(defaultFilters)

    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(8)

    const { category, color } = filtersState

    const { data: { items = [], totalPages, totalItems } = {}, error, isLoading } = useFetchAllItemsQuery({
        category: category !== 'all' ? category : '',
        color: color !== 'all' ? color : '',
        archived: false,
        page: currentPage,
        limit: itemsPerPage
    })

    const clearFilters = () => {
        setFiltersState(defaultFilters)
    }

    const handleFilterChange = (newFiltersState) => {
        setFiltersState(newFiltersState)
        setCurrentPage(1) // stop currentPage from being too large for totalItems
    }

    const handlePageChange = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber)
        }
    }

    if (isLoading) return <div>Loading...</div>
    if (error) {
        console.log(error)
        return <div>Error loading items</div>
    }

    const startItem = (currentPage - 1) * itemsPerPage + 1
    const endItem = startItem + items.length - 1

    return (
        <>
            <section className='section__container bg-primary-light'>
                <h2 className='section__header capitalize'>Browse</h2>
                <p className='section__subheader'>This is a subheader.</p>
            </section>

            <section className='section__container'>
                <div className='flex flex-col md:flex-row md:gap-12 gap-8'>
                    {/* filters */}
                    <ClosetFiltering
                        filters={filters}
                        filtersState={filtersState}
                        setFiltersState={handleFilterChange}
                        clearFilters={clearFilters}
                    />

                    {/* items */}
                    {
                        items.length === 0 ? (<div><h3 className='text-xl font-medium mb-4'>No results</h3></div>) : (
                            <div>
                                <h3 className='text-xl font-medium mb-4'>
                                    Showing {startItem} to {endItem} of {totalItems} items</h3>
                                <ItemCards items={items} />

                                { /* pagination controls */}
                                <div className='mt-6 flex justify-center'>
                                    <button
                                        disabled={currentPage === 1}
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2'>Previous</button>
                                    {
                                        [...Array(totalPages)].map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handlePageChange(index + 1)}
                                                className={`px-4 py-2 
                                                    ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'} 
                                                    rounded-md mx-1`}>{index + 1}
                                            </button>
                                        ))
                                    }
                                    <button
                                        disabled={currentPage === totalPages}
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md ml-2'>Next</button>
                                </div>

                            </div>
                        )
                    }
                </div>
            </section>
        </>
    )
}

export default ClosetPage