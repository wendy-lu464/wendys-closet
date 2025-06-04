import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useFetchItemByIdQuery } from '../../../redux/features/items/itemsApi'
import { addToCart } from '../../../redux/features/cart/cartSlice'

const SingleItem = () => {
    const { id } = useParams()

    const dispatch = useDispatch()
    const { data, error, isLoading } = useFetchItemByIdQuery(id)

    const singleItem = data?.item || {}

    const handleAddToCart = (item) => {
        dispatch(addToCart(item))
    }
    
    function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
    }

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error loading item details.</p>
    

    return (
        <>
            <section className='section__container bg-primary-light'>
                <h2 className='section__header capitalize'>Single Item Page</h2>
                <div className='section__subheader space-x-2'>
                    <span className='hover:text-primary'><Link to="/">Home</Link></span>
                    <i className='ri-arrow-right-s-line'></i>
                    <span className='hover:text-primary'><Link to="/closet">Closet</Link></span>
                    <i className='ri-arrow-right-s-line'></i>
                    <span className='hover:text-primary'>{singleItem?.name}</span>
                </div>
            </section>

            <section className='section__container mt-8'>
                <div className='flex flex-col items-center md:flex-row gap-8'>
                    {/* item image */}
                    <div className='md:w-1/2 w-full'>
                        <img src={singleItem?.mainImage}
                            alt=""
                            className='rounded-md w-full h-auto' />
                    </div>

                    <div className='md:w-1/2 w-full'>
                        <h3 className='text-2xl font-semibold mb-4'>{singleItem?.name}</h3>
                        <p className='text-gray-700 mb-4'>{singleItem?.description}</p>

                        {/* additional item info */}
                        <div className='flex flex-col space-y-2'> 
                            { singleItem?.brand ? (<p><strong>Brand:</strong> {singleItem.brand}</p>) : (null) }
                            { singleItem?.material.length > 0 ? (<p><strong>Material:</strong> {singleItem.material.join(', ')}</p>) : (null) }
                            { singleItem?.care ? (<p><strong>Care:</strong> {singleItem.care}</p>) : (null) }
                            { singleItem?.purchasePrice ? (<p><strong>Purchase Price:</strong> ${singleItem.purchasePrice.toFixed(2)}</p>) : (null) }
                            { singleItem?.purchaseDate ? (<p><strong>Purchase Date:</strong> {singleItem.purchaseDate.toString().substring(0, 10)}</p>) : (null) }
                            { singleItem?.origin ? (<p><strong>Origin:</strong> {capitalize(singleItem.origin.originType)} - {singleItem.origin.store}</p>) : (null) }
                            <div className='flex gap-1 items-center'></div>
                        </div>

                        <button hidden
                            onClick={(e) => {
                                e.stopPropagation()
                                handleAddToCart(singleItem)
                            }}
                            className='mt-6 px-6 py-3 bg-primary text-white rounded-md'>
                            Add to cart
                        </button>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SingleItem