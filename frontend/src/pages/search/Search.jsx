import React, { useState } from 'react'
import ItemCards from '../closet/ItemCards'
import { useFetchAllItemsQuery } from '../../redux/features/items/itemsApi'

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('')
    const [filteredItems, setFilteredItems] = useState([])
    const { data: { items = [], totalPages, totalItems } = {}, error, isLoading } = useFetchAllItemsQuery({})

    const handleSearch = () => {
        const query = searchQuery.toLowerCase()
        if (query === '') {
            setFilteredItems([])
        } else {
            const filtered = items.filter(item =>
                item.name.toLowerCase().includes(query) ||
                item.description?.toLowerCase().includes(query) ||
                item.color?.some(color => color.includes(query)) ||
                item.brand?.toLowerCase().includes(query) ||
                item.material?.some(material => material.toLowerCase().includes(query)) ||
                item.care?.toLowerCase().includes(query) ||
                item.origin?.store?.toLowerCase().includes(query) ||
                item.categoryTags.some(tag => tag.includes(query)))
            setFilteredItems(filtered)
        }
    }

    if (isLoading) return <div>Loading...</div>
    if (error) {
        console.log(error)
        return <div>Error loading items</div>
    }

    return (
        <>
            <section className='section__container bg-primary-light'>
                <h2 className='section__header capitalize'>Search</h2>
                <p className='section__subheader'>Find exactly what you're looking for!</p>
            </section>

            <section className='section__container'>
                <div className='w-full mb-12 flex flex-col md:flex-row items-center justify-center gap-4'>
                    <input type='text'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => {if (e.key === 'Enter') {handleSearch()}}}
                        className='search-bar w-full max-w-4xl p-2 border rounded'
                        placeholder='Search for items...' />

                    <button
                        onClick={handleSearch}
                        className='search-button w-full md:w-auto py-2 px-8 bg-primary text-white rounded'>
                        Search
                    </button>
                </div>

                <ItemCards items={filteredItems} />
            </section>
        </>
    )
}

export default Search