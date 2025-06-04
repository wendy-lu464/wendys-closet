import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import ItemCards from '../closet/ItemCards'
import { useFetchAllItemsQuery } from '../../redux/features/items/itemsApi'

const CategoryPage = () => {
    const { categoryName } = useParams()

    const { data: { items = [], totalPages, totalItems } = {}, error, isLoading } = useFetchAllItemsQuery({
        category: categoryName,
        archived: false,
        limit: 8
    })

    useEffect(() => {
        window.scrollTo(0, 0)
    })

    if (isLoading) return <div>Loading...</div>
    if (error) {
        console.log(error)
        return <div>Error loading items</div>
    }

    return (
        <>
            <section className='section__container bg-primary-light'>
                <h2 className='section__header capitalize'>{categoryName}</h2>
                <p className='section__subheader'>This is a subheader.</p>
            </section>

            { /* items card */}
            <div className='section__container'>
                <ItemCards items={items} />
            </div>

            { /* Browse More button, TODO: add pagination and filters */}
            <div className='item__btn'>
                {<button className='btn' ><Link to='/closet'>Browse More</Link></button>
                }
            </div>
        </>
    )
}

export default CategoryPage