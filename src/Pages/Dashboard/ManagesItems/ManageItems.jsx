import { MdDelete, MdEdit } from "react-icons/md";
import useMenu from "../../../Hooks/useMenu";
import SectionTitle from "../../../components/sectionTitle/SectionTitle";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";


const ManageItems = () => {
    const [menu, ,refetch] = useMenu();
    const axiosSecure = useAxiosSecure();

    const handleDeleteItem = (item) => {
        console.log(item)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then(async(result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/menu/${item._id}`)
                console.log(res.data);
                if(res.data.deletedCount > 0){
                    refetch();
                    Swal.fire({
                        title: "Deleted!",
                        text: `${item.name} has been deleted successfully`,
                        icon: "success"
                      });
                }
              
            }
          });
    }
    return (
        <div>
            <SectionTitle heading='Manage all items' subHeading='Hurry up'></SectionTitle>
            <div>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>Image</th>
                                <th>Item Name</th>
                                <th>Price</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                menu.map((item, idx) => <tr key={item._id}>
                                    <td>
                                        {idx + 1}
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>

                                        </div>
                                    </td>
                                    <td>
                                        {item.name}
                                    </td>
                                    <td>${item.price}</td>
                                    
                                    <td>
                                        <Link to={`/dashboard/updateItem/${item._id}`}><button
                                            className="btn  btn-ghost btn-sm text-xl text-white bg-orange-600"><MdEdit></MdEdit></button></Link>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleDeleteItem(item)}
                                            className="btn btn-ghost btn-sm text-2xl text-red-600"><MdDelete></MdDelete></button>
                                    </td>
                                </tr>)
                            }



                        </tbody>


                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageItems;