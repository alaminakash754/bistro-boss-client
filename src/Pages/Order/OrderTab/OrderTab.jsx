import FoodCard from "../../../components/FoodCard/FoodCard";


const OrderTab = ({ items }) => {
    return (
        <div className='grid md:grid-cols-3 gap-5 sm:grid-cols-1'>
            {
                items.map(item => <FoodCard key={item._id} items={item}></FoodCard>)
            }
        </div>
    );
};

export default OrderTab;