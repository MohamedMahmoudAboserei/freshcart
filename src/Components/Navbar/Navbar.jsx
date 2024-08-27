import React, { useContext, useEffect, useState } from "react";
import classes from "./Navbar.module.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IonIcon } from "@ionic/react";
import { menuOutline, closeOutline } from "ionicons/icons";
import { UserContext } from "../../context/UserContext";
import { CartContext } from "../../context/CartContext";
import { WishListContext } from '../../context/WishlistContext.jsx';

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const { userData, setUserData } = useContext(UserContext);
    const { cartItems } = useContext(CartContext)
    const { wishlist } = useContext(WishListContext);
    const navigate = useNavigate();
    function logOut() {
        localStorage.removeItem("userToken");
        setUserData(null);
        navigate("/login");
    }

    return (
        <>
            <nav className="bg-gray-700 w-full fixed z-50">
                <div className="container text-white p-6 flex justify-around items-center font-bold mx-auto">
                    <h2 className="text-white text-2xl uppercase">
                        <Link to="">Fresh Cart</Link>
                    </h2>
                    <div
                        className={`md:flex bg-gray-700 md:items-center md:z-auto md:static absolute w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7 transition-all ease-in duration-500 ${menuOpen
                            ? "top-[70px] opacity-100"
                            : "top-[-400px] opacity-0 md:opacity-100 md:top-0"
                            }`}
                    >
                        {userData && (
                            <ul className="md:flex justify-center">
                                <li className="mx-4 my-6 md:my-0">
                                    <NavLink
                                        to="cart"
                                        className="text-base hover:text-green-600 duration-500"
                                    >
                                        Cart
                                    </NavLink>
                                </li>
                                <li className="mx-4 my-6 md:my-0">
                                    <NavLink
                                        to="brands"
                                        className="text-base hover:text-green-600 duration-500"
                                    >
                                        Brand
                                    </NavLink>
                                </li>
                                <li className="mx-4 my-6 md:my-0">
                                    <NavLink
                                        to="products"
                                        className="text-base hover:text-green-600 duration-500"
                                    >
                                        Products
                                    </NavLink>
                                </li>
                                <li className="mx-4 my-6 md:my-0">
                                    <NavLink
                                        to="categories"
                                        className="text-base hover:text-green-600 duration-500"
                                    >
                                        Categories
                                    </NavLink>
                                </li>
                            </ul>
                        )}
                        <ul className="md:flex items-center">
                            {userData ? (
                                <>
                                    <li className='relative mx-2'><Link to="cart"><i className='max-md:my-8 relative fa-solid text-main fa-cart-shopping text-base'></i> <span className='absolute w-5 h-5 text-sm text-white rounded-full bg-green-400 flex items-center justify-center max-md:top-4 max-md:-left-2 md:-top-4 md:right-2'>{cartItems?.numOfCartItems}</span></Link></li>
                                    <Link
                                        to="/wishlist"
                                        className="mx-2 text-black relative cursor-pointer px-1 group"
                                    >
                                        <i className="text-red-700 fa-solid fa-heart text-base relative max-md:my-8">
                                            <span className='absolute w-5 h-5 text-sm text-white rounded-full bg-red-700 flex items-center justify-center -top-4 right-2'>{wishlist?.count}</span>
                                        </i>
                                    </Link>
                                    <li
                                        onClick={() => logOut()}
                                        className="mx-2 text-base hover:text-green-600 duration-500 cursor-pointer"
                                    >
                                        log Out
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="mx-4 my-6 md:my-0">
                                        <NavLink
                                            to="register"
                                            className="text-xs hover:text-green-600 duration-500"
                                        >
                                            register
                                        </NavLink>
                                    </li>
                                    <li className="mx-4 my-6 md:my-0">
                                        <NavLink
                                            to="login"
                                            className="text-xs hover:text-green-600 duration-500"
                                        >
                                            login
                                        </NavLink>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                    <span
                        className="text-3xl cursor-pointer mx-3 md:hidden block"
                        onClick={toggleMenu}
                    >
                        <IonIcon icon={menuOpen ? closeOutline : menuOutline} />
                    </span>
                </div>
            </nav>
        </>
    );
}
