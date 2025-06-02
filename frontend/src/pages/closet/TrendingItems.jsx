import { React, useState } from 'react'
import ItemCards from './ItemCards'
import items from '../../data/items.json'

const TrendingItems = () => {
    const [visibleItems, setVisibleItems] = useState(8);
    const loadMoreItems = () => {
        setVisibleItems(prevCount => prevCount + 4)
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