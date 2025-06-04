import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import CartModal from '../pages/closet/CartModal'
import avatarImg from '../assets/avatar.png'
import { useLogoutUserMutation } from '../redux/features/auth/authApi'
import { logout } from '../redux/features/auth/authSlice'

const Navbar = () => {
    const items = useSelector((state) => state.cart.items)
    const [isCartOpen, setIsCartOpen] = useState(false)
    const handleCartToggle = () => {
        setIsCartOpen(!isCartOpen)
    }

    // show if user is logged in
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const [logoutUser] = useLogoutUserMutation()
    const navigate = useNavigate()

    // dropdown menus
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen)
    }

    // admin dropdown menu
    const adminDropdownMenu = [
        { label: 'Dashboard', path: '/dashboard/admin' },
        { label: 'Manage Items', path: '/dashboard/manage-items' },
        { label: 'All Orders', path: '/dashboard/manage-orders' },
        { label: 'Add New Post', path: '/dashboard/add-new-post' },
    ]

    // user dropdown menu
    const userDropdownMenu = [
        { label: 'Dashboard', path: '/dashboard' },
        { label: 'Profile', path: '/dashboard/profile' },
        { label: 'Payments', path: '/dashboard/payments' },
        { label: 'Orders', path: '/dashboard/orders' },
    ]

    const dropdownMenus = user?.role === 'admin' ? [...adminDropdownMenu] : [...userDropdownMenu]

    const handleLogout = async () => {
        try {
            await logoutUser().unwrap()
            dispatch(logout())
            navigate('/')
        } catch (error) {
            console.error('Failed to log out', error)
        }
    }

    return (
        <header className='fixed-nav-bar w-nav'>
            <nav className='max-w-screen-2xl mx-auto px-4 flex justify-between items-center'>
                <ul className='nav__links'>
                    <li className='link'><Link to="/">Home</Link></li>
                    <li className='link'><Link to="/closet">Browse</Link></li>
                    <li className='link'><Link to="/contact">Contact</Link></li>
                </ul>

                {/* logo */}
                <div className='nav__logo'>
                    <Link to='/'>Wendy's Closet<span>.</span></Link>
                </div>

                {/* nav icons */}
                <div className='nav__icons relative'>
                    <span>
                        <Link to="/search">
                            <i className="ri-search-line"></i>
                        </Link>
                    </span>
                    <span hidden>
                        <button onClick={handleCartToggle} className='hover:text-primary'>
                            <i className="ri-shopping-cart-line"></i>
                            <sup className='text-sm inline-block px-1.5 text-white rounded-full bg-primary text-center'>{items.length}</sup>
                        </button>
                    </span>
                    <span>
                        {
                            user ? (<>
                                <img
                                    onClick={handleDropdownToggle}
                                    src={user?.profileImage || avatarImg} className='size-6 rounded-full cursor-pointer' />
                                {
                                    isDropdownOpen && (
                                        <div className='absolute right-0 mt-3 p-4 w-48 bg-white border 
                                        border-grey-200 rounded-lg shadow-lg z-50'>
                                            <ul className='font-medium space-y-4 p-2'>
                                                {dropdownMenus.map((menuItem, index) => (
                                                    <li key={index}>
                                                        <Link
                                                            onClick={() => setIsDropdownOpen(false)}
                                                            className='dropdown-items'
                                                            to={menuItem.path}>{menuItem.label}</Link>
                                                    </li>
                                                ))}
                                                <li><Link onClick={handleLogout} className='dropdown-items' >Logout</Link></li>
                                            </ul>
                                        </div>
                                    )
                                }
                            </>) : (<
                                Link to="login">
                                <i className="ri-user-line"></i>
                            </Link>
                            )
                        }
                    </span>
                </div>
            </nav>

            {
                isCartOpen && <CartModal items={items} isOpen={isCartOpen} onClose={handleCartToggle} />
            }
        </header>
    )
}

export default Navbar