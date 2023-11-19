import { NavLink, Outlet } from "react-router-dom";
import { FaAd, FaBook, FaCalculator, FaCartPlus, FaEnvelope, FaHome, FaList, FaSearch, FaUser, FaUtensilSpoon } from 'react-icons/fa';
import UseCart from "../Hooks/UseCart";
import { MdOutlineFoodBank } from "react-icons/md";
import UseAdmin from "../Hooks/UseAdmin";

const DashBoard = () => {
    const [cart] = UseCart();
    const [isAdmin] = UseAdmin();
    return (
        <div className="flex">
            {/* dashboard side bar  */}
            <div className="w-64 min-h-screen bg-orange-400">
                <ul className="menu">
                    {
                        isAdmin ? <>
                            <li><NavLink to='/dashboard/adminHome'><FaHome></FaHome> Admin Home</NavLink></li>
                            <li><NavLink to='/dashboard/addItems'><FaUtensilSpoon></FaUtensilSpoon> Add Items</NavLink></li>
                            <li><NavLink to='/dashboard/manageItems'><FaList></FaList> Manage Items</NavLink></li>
                            <li><NavLink to='/dashboard/manageBookings'><FaBook></FaBook> Manage Bookings</NavLink></li>
                            <li><NavLink to='/dashboard/users'><FaUser></FaUser> All Users</NavLink></li>

                            <div className="divider"></div>
                            <li><NavLink to='/'><FaHome></FaHome>Home</NavLink></li>
                            <li><NavLink to='/menu'><FaSearch></FaSearch> Our Menu</NavLink></li>
                            <li><NavLink to='/order/salad'><MdOutlineFoodBank></MdOutlineFoodBank> Order Food</NavLink></li>
                            <li><NavLink to='/order/contact'><FaEnvelope></FaEnvelope>Contact</NavLink></li>
                        </>
                            :
                            <>
                                <li><NavLink to='/dashboard/userHome'><FaHome></FaHome> User Home</NavLink></li>
                                <li><NavLink to='/dashboard/reservation'><FaCalculator></FaCalculator> My Reservation</NavLink></li>
                                <li><NavLink to='/dashboard/cart'><FaCartPlus></FaCartPlus> My Cart  ({cart.length})</NavLink></li>
                                <li><NavLink to='/dashboard/bookings'><FaList></FaList> My Bookings</NavLink></li>
                                <li><NavLink to='/dashboard/reviews'><FaAd></FaAd> Add a Review</NavLink></li>

                                <div className="divider"></div>
                                <li><NavLink to='/'><FaHome></FaHome>Home</NavLink></li>
                                <li><NavLink to='/menu'><FaSearch></FaSearch> Our Menu</NavLink></li>
                                <li><NavLink to='/order/salad'><MdOutlineFoodBank></MdOutlineFoodBank> Order Food</NavLink></li>
                                <li><NavLink to='/order/contact'><FaEnvelope></FaEnvelope>Contact</NavLink></li>
                            </>

                    }
                </ul>

            </div>
            {/* dashboard content  */}
            <div className="flex-1 p-10">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashBoard;