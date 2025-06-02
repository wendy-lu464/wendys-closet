import React from 'react'
import { Link } from 'react-router-dom'

import bannerImg from '../../assets/header.png'

const Banner = () => {
  return (
    <div className='section__container header__container'>
        <div className='header__content z-30'>
            <h4 className='uppercase'>Up to 20% discount on</h4>
            <h1>fashion</h1>
            <p>Some text</p>
            <button className='btn'><Link to='/closet'>BROWSE</Link></button>
        </div>
        <div className='header__image'>
            <img src={bannerImg} alt='banner image' />
        </div>
    </div>
  )
}

export default Banner