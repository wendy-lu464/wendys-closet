import React from 'react'
import instaImg1 from '../assets/instagram-1.jpg'

const Footer = () => {
  return (
    <>
    <footer className='section__container footer__container'>
        <div className='footer__col'>
            <h4>Contact Info</h4>
            <p>
                <span><i className='ri-map-pin-2-fill'/></span>
                123, London, London
            </p>
            <p>
                <span><i className='ri-map-pin-2-fill'/></span>
                123, London, London
            </p>
            <p>
                <span><i className='ri-map-pin-2-fill'/></span>
                123, London, London
            </p>
        </div>

        <div className='footer__col'>
            <h4>COMPANY</h4>
            <a href='/'>Home</a>
            <a href='/'>Home</a>
            <a href='/'>Home</a>
            <a href='/'>Home</a>
        </div>
        
        <div className='footer__col'>
            <h4>USEFUL LINKS</h4>
            <a href='/'>Help</a>
            <a href='/'>Track My Order</a>
            <a href='/'>Home</a>
            <a href='/'>Home</a>
        </div>
        
        <div className='footer__col'>
            <h4>INSTAGRAM</h4>
            <div className='instagram__grid'>
                <img src={instaImg1} alt=''/>
                <img src={instaImg1} alt=''/>
                <img src={instaImg1} alt=''/>
                <img src={instaImg1} alt=''/>
                <img src={instaImg1} alt=''/>
                <img src={instaImg1} alt=''/>
            </div>
        </div>
    </footer>

    <div className='footer__bar'>
        Copyright ... 2025 by .... All rights reserved.
    </div>
    </>
  )
}

export default Footer