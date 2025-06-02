import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/features/cart/cartSlice'

const ItemCards = ({ items }) => {
    const dispatch = useDispatch()

    const handleAddToCart = (item) => {
        dispatch(addToCart(item))
    }

    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
            {
                items.map((item, index) => (
                    <div key={index} className='item__card'>
                        <div className='relative'>
                            <Link to={`/closet/${item._id}`}>
                                <img src={item.mainImage} alt='item image' className='max-h-96 md:h-64 w-full object-cover hover:scale-105 transition-all duration-300' />
                            </Link>

                            <div className='hover:block absolute top-3 right-3'>
                                <button onClick={(e) => {
                                    e.stopPropagation()
                                    handleAddToCart(item)
                                }}>
                                    <i className='ri-shopping-cart-2-line bg-primary p-1.5 text-white hover:bg-primary-dark'></i>
                                </button>
                            </div>
                        </div>


                        {/* item desciption */}
                        <div className='item__card__content'>
                            <h4>{item.name}</h4>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default ItemCards