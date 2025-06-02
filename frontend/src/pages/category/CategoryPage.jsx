import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import items from '../../data/items.json'
import ItemCards from '../closet/ItemCards'

const CategoryPage = () => {
    const { categoryName } = useParams()
    const [filteredItems, setFilteredItems] = useState([])

    useEffect(() => {
        const filtered = items.filter(item => item.category === categoryName.toLowerCase()) // Check that value and type are equal
        setFilteredItems(filtered)
    }, [categoryName])

    useEffect(() => {
        window.scrollTo(0, 0)
    })

    return (
        <>
            <section className='section__container bg-primary-light'>
                <h2 className='section__header capitalize'>{categoryName}</h2>
                <p className='section__subheader'>This is a subheader.</p>
            </section>

            { /* items card */}
            <div className='section__container'>
                <ItemCards items={filteredItems} />
            </div>
        </>
    )
}

export default CategoryPage