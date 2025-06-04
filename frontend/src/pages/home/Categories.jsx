import React from 'react'
import { Link } from 'react-router-dom'
import category1 from '../../assets/category-1.jpg'
import category2 from '../../assets/category-2.jpg'
import category3 from '../../assets/category-3.jpg'
import category4 from '../../assets/category-4.jpg'

const Categories = () => {
    const categories = [
        {name: 'top', path: 'top', image: category3},
        {name: 'bottom', path: 'bottom', image: category4},
        {name: 'accessory', path: 'accessory', image: category1},
        {name: 'one-piece', path: 'one-piece', image: category2}
    ]
  return (
    <>
    <div className='item__grid'>
        {
            categories.map((category) => (
                <Link key={category.name} to={`/categories/${category.path}`} className='categories__card'>
                    <img src={category.image} alt={category.name} />
                    <h4>{category.name}</h4>
                </Link>
            ))
        }
    </div>
    </>
  )
}

export default Categories