import React from 'react'
import { Link } from 'react-router-dom'

import bannerImg from '../../assets/header.png'

const Banner = () => {
  return (
    <div className='section__container header__container'>
        <div className='header__content z-30'>
            <h4 className='uppercase'>Welcome to</h4>
            <h1>Wendy's Closet</h1>
            <p>A celebration of my personal style</p>
            <button className='btn'><Link to='/closet'>BROWSE</Link></button>
        </div>
        <div className='header__image'>
            <img src={bannerImg} alt='banner image' />
        </div>
    </div>
  )
}

export default Banner