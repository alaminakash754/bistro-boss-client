import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../Pages/shared/NavBar/NavBar";
import Footer from "../Pages/shared/Footer/Footer";


const MainLayout = () => {
    const location = useLocation();
    const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('signup')
    return (
        <div>
            {noHeaderFooter || <NavBar></NavBar>}
            <Outlet></Outlet>
            {noHeaderFooter || <Footer></Footer>}
        </div>
    );
};

export default MainLayout;