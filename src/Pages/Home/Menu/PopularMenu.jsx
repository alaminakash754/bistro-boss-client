
import SectionTitle from "../../../components/sectionTitle/SectionTitle";
import MenuItem from "../../shared/MenuItem/MenuItem";
import useMenu from "../../../Hooks/useMenu";


const PopularMenu = () => {
    // const [menu, setMenu] = useState([])
    // useEffect(() => {
    //     fetch('menu.json')
    //     .then(res => res.json())
    //     .then(data => {
    //         const popularItems = data.filter(item => item.category === 'popular')
    //         setMenu(popularItems)
    //     })
    // },[])
    const [menu] = useMenu();
    const popular = menu.filter(item => item.category === 'popular')
    return (
       <section className="mb-14">
        <SectionTitle
        heading={'FROM OUR MENU'}
        subHeading={'---Check it out---'}
        >
        </SectionTitle>

        <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-5">
            {
                popular.map(item => <MenuItem key={item._id} item={item}></MenuItem>)
            }
        </div>
       </section>
    );
};

export default PopularMenu;