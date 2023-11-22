import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";
import { FaCartPlus } from 'react-icons/fa';
import UseCart from "../../../Hooks/UseCart";
import UseAdmin from "../../../Hooks/UseAdmin";

const NavBar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isAdmin] = UseAdmin();
    const [cart] = UseCart();
    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error))
    }
    const navLinks = <>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/menu'>Our Menus</Link></li>
        <li><Link to='/order/salad'>Order Food</Link></li>
        {
            user && isAdmin && <li><Link to='/dashboard/adminHome'>Dashboard</Link></li>
        }
        {
            user && !isAdmin && <li><Link to='/dashboard/userHome'>Dashboard</Link></li>
        }
        <li><Link to='/dashboard/cart'><button className="btn">
        <FaCartPlus className="mr-2"></FaCartPlus>
            <div className="badge badge-secondary">+{cart.length}</div>
        </button></Link></li>



    </>
    return (
        <>
            <div className="navbar fixed z-10 bg-opacity-30 text-white w-[1150px] bg-black">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navLinks}
                        </ul>
                    </div>
                    <a className="btn btn-ghost normal-case text-xl">BistroBoss  <br />Restaurant</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navLinks}
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user ?
                            <>
                                <h3 className="mr-5">{user.displayName
                                }</h3>
                                <img className="w-10 h-10 rounded-full mr-2" src={user.photoURL} />
                                <button onClick={handleLogOut} className="btn btn-sm">Sign out</button>

                            </>
                            :
                            <Link to='/login'><button className="btn btn-sm">Login</button></Link>
                    }

                </div>
            </div>
        </>
    );
};

export default NavBar;