import React from 'react'
import instaImg1 from '../assets/instagram-1.jpg'
import instaImg2 from '../assets/instagram-2.jpg'
import instaImg3 from '../assets/instagram-3.jpg'
import instaImg4 from '../assets/instagram-4.jpg'
import instaImg5 from '../assets/instagram-5.jpg'
import instaImg6 from '../assets/instagram-6.jpg'

const Footer = () => {
    return (
        <>
            <footer className='section__container footer__container'>
                <div className='footer__col'>
                    <h4>Contact Info</h4>
                    <p>
                        <span><i className='ri-mail-fill'></i></span>
                        <a id='contact' href='mailto:wendy.lu464@gmail.com'>wendy.lu464@gmail.com</a>
                    </p>
                    <p>
                        <span><i className='ri-github-fill'></i></span>
                        <a id='contact' href='https://github.com/wendy-lu464'>wendy-lu464</a>
                    </p>
                    <p>
                        <span><i className='ri-linkedin-box-fill'></i></span>
                        <a id='contact' href='https://www.linkedin.com/in/wendy-lu464/'>wendy-lu464</a>
                    </p>
                </div>

                <div className='footer__col'>
                    <h4>Links</h4>
                    <p><a id='links' href='/'>Home</a></p>
                    <p><a id='links' href='/closet'>Browse</a></p>
                    <p><a id='links' href='/login'>Login</a></p>
                </div>

                <div className='footer__col'>
                    <h4>Instagram</h4>
                    <div className='instagram__grid'>
                        <img src={instaImg1} alt='' />
                        <img src={instaImg2} alt='' />
                        <img src={instaImg3} alt='' />
                        <img src={instaImg4} alt='' />
                        <img src={instaImg5} alt='' />
                        <img src={instaImg6} alt='' />
                    </div>
                </div>
            </footer>

            <div className='footer__bar'>
                Copyright 2025 by Wendy Lu. All rights reserved.
            </div>
        </>
    )
}

export default Footer