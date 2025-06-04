import { React, useState } from 'react'
import ItemCards from './ItemCards'
import { useFetchAllItemsQuery } from '../../redux/features/items/itemsApi'

const TrendingItems = () => {
    const [visibleItems, setVisibleItems] = useState(8);

    const { data: { items = [] } = {}, error, isLoading } = useFetchAllItemsQuery({
        archived: false,
        limit: 12
    })

    const loadMoreItems = () => {
        setVisibleItems(prevCount => prevCount + 4)
    }

    if (isLoading) return <div>Loading...</div>
    if (error) {
        console.log(error)
        return <div>Error loading items</div>
    }

    return (
        <section className='section__container item__container'>
            <h2 className='section__header'>Trending Items</h2>
            <p className='section__subheader mb-12'>Some text here</p>

            {/* items cards */}
            <div className='mt-12'>
                <ItemCards items={items.slice(0, visibleItems)} />
            </div>

            {/* load more btn */}
            <div className='item__btn'>
                {
                    visibleItems < items.length && (
                        <button className='btn' onClick={loadMoreItems}>Load More</button>
                    )
                }
            </div>
        </section>
    )
}

export default TrendingItems