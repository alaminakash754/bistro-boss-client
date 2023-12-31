import { Helmet } from 'react-helmet-async';
import Cover from '../../shared/cover/Cover';
import coverImg from '../../../assets/menu/banner3.jpg'
import dessertImg from '../../../assets/menu/dessert-bg.jpeg'
import pizzaImg from '../../../assets/menu/pizza-bg.jpg'
import soupImg from '../../../assets/menu/soup-bg.jpg'
import saladImg from '../../../assets/menu/salad-bg.jpg'

import useMenu from '../../../Hooks/useMenu';
import SectionTitle from '../../../components/sectionTitle/SectionTitle';
import MenuCategory from './MenuCategory/MenuCategory';
const Menu = () => {
    const [menu] = useMenu();
    const desserts = menu.filter(item => item.category === 'dessert')
    const pizza = menu.filter(item => item.category === 'pizza')
    const soup = menu.filter(item => item.category === 'soup')
    const salad = menu.filter(item => item.category === 'salad')
    const offered = menu.filter(item => item.category === 'offered')
    // console.log(offered)
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Menu</title>

            </Helmet>
            <Cover img={coverImg} title='our menu'></Cover>
            {/* main cover  */}
            <SectionTitle subHeading="Don't Miss" heading="Today's Offer"></SectionTitle>
            {/* offered menu  */}
            <MenuCategory items={offered}></MenuCategory>
            {/* dessert menu  */}
            <MenuCategory 
            items={desserts}
            title='dessert'
            img={dessertImg}
            ></MenuCategory>
            {/* pizza menu  */}
            <MenuCategory items={pizza}
            title='pizza'
            img={pizzaImg}></MenuCategory>
            {/* soup menu  */}
            <MenuCategory items={soup}
            title='soup'
            img={soupImg}></MenuCategory>
            {/* salad menu  */}
            <MenuCategory items={salad}
            title='salad'
            img={saladImg}></MenuCategory>
        </div>
    );
};

export default Menu;