import Swal from "sweetalert2";
import UseCart from "../../../Hooks/UseCart";
import { MdDelete } from "react-icons/md";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const Cart = () => {
    const [cart, refetch] = UseCart();
    const totalPrice = cart.reduce((total, currentItem) => total + currentItem.price, 0);
    const axiosSecure = useAxiosSecure();

    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/carts/${id}`)
                .then(res => {
                    if(res.data.deletedCount > 0){
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                          });
                    }
                    refetch();
                })
             
            }
          });
    }
    return (
        <div>
            <div className="flex justify-evenly mb-10">
                <h2 className="text-2xl">Items: {cart.length}</h2>
                <h2 className="text-2xl">Price: {totalPrice}</h2>
                <button className="btn btn-primary">Pay</button>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                               #
                            </th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart.map((item, idx) => <tr key={item._id}>
                                <th>
                                    {idx + 1}
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        
                                    </div>
                                </td>
                                <td className="text-2xl">
                                   {item.name}
                                </td>
                                <td className="text-2xl">${item.price}</td>
                                <th>
                                    <button
                                    onClick={() =>  handleDelete(item._id)}
                                    className="btn btn-ghost btn-lg text-2xl text-orange-600"><MdDelete></MdDelete></button>
                                </th>
                            </tr>)
                        }
                        {/* row 1 */}
                        
                        
                       
                    </tbody>
                    

                </table>
            </div>
        </div>
    );
};

export default Cart;