import React, { useState } from 'react'
import ProductCards from './ProductCards'
import ShopFiltering from './ShopFiltering'
import { useFetchAllProductsQuery } from '../../redux/features/products/productsApi'

const filters = {
    categories: ['all', 'accessories', 'dress', 'jewellery', 'cosmetics'], // etc.
    colors: ['all', 'black', 'red', 'gold', 'blue', 'silver'], // etc.
}

const ClosetPage = () => {
    const defaultFilters = {
        category: 'all',
        color: 'all',
        archived: false
    }

    const [filtersState, setFiltersState] = useState(defaultFilters)

    const [currentPage, setCurrentPage] = useState(1)
    const [productsPerPage] = useState(8)

    const { category, color } = filtersState

    const { data: { products = [], totalPages, totalProducts } = {}, error, isLoading } = useFetchAllProductsQuery({
        category: category !== 'all' ? category : '',
        color: color !== 'all' ? color : '',
        archived: false,
        page: currentPage,
        limit: productsPerPage
    })

    // clear the filters
    const clearFilters = () => {
        setFiltersState(defaultFilters)
    }

    // handle page change
    const handlePageChange = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber)
        }
    }

    if (isLoading) return <div>Loading...</div>
    if (error) {
        console.log(error)
        return <div>Error loading products</div>
    }

    const startProduct = (currentPage - 1) * productsPerPage + 1
    const endProduct = startProduct + products.length - 1

    return (
        <>
            <section className='section__container bg-primary-light'>
                <h2 className='section__header capitalize'>Browse</h2>
                <p className='section__subheader'>This is a subheader.</p>
            </section>

            <section className='section__container'>
                <div className='flex flex-col md:flex-row md:gap-12 gap-8'>
                    {/* filters */}
                    <ShopFiltering
                        filters={filters}
                        filtersState={filtersState}
                        setFiltersState={setFiltersState}
                        clearFilters={clearFilters}
                    />

                    {/* products */}
                    {
                        products.length === 0 ? (<div><h3 className='text-xl font-medium mb-4'>No results</h3></div>) : (
                            <div>
                                <h3 className='text-xl font-medium mb-4'>
                                    Showing {startProduct} to {endProduct} of {totalProducts} products</h3>
                                <ProductCards products={products} />

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