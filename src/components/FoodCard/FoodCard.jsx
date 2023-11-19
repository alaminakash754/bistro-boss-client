import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import UseCart from "../../Hooks/UseCart";




const FoodCard = ({items}) => {
    const {image, price, name, recipe, _id} = items;
    const {user} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const [ , refetch] = UseCart();

    const handleAddToCart = () => {
        
        if(user && user.email){
            const cartItem = {
                menuId: _id,
                email: user.email,
                name, 
                image,
                price
            }
            axiosSecure.post('/carts', cartItem)
            .then(res => {
                console.log(res.data)
                if(res.data.insertedId){
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${name} added to Your Cart`,
                        showConfirmButton: false,
                        timer: 1500
                      });
                    //   refetch cart to update the cart items
                    refetch();

                }
            })
        }
        else{
            Swal.fire({
                title: "please Logged In",
                text: "Are you login Now?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Login Now!"
              }).then((result) => {
                if (result.isConfirmed) {
                 
                   navigate('/login', {state: {from: location}})
                  
                }
              });
              
        }
    }

   

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src={image} alt="Shoes" /></figure>
            <p className="bg-slate-900 text-white absolute right-0 mr-4 mt-4 px-3">${price}</p>
            <div className="card-body flex flex-col items-center text-center">
                <h2 className="font-semibold text-xl">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-end">
                    <button 
                    onClick={handleAddToCart}
                     className="btn btn-outline border-0 border-b-4 border-orange-400 bg-slate-100">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;