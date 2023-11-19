import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import Featured from "../Featured/Featured";
import PopularMenu from "../Menu/PopularMenu";
import Testimonials from "../Testimonials/Testimonials";
import FoodCtaegory from "../category/FoodCtaegory";



const Home = () => {
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Home</title>

            </Helmet>
           <Banner></Banner>
           <FoodCtaegory></FoodCtaegory>
           <PopularMenu></PopularMenu>
           <Featured></Featured>
           <Testimonials></Testimonials>
        </div>
    );
};

export default Home;