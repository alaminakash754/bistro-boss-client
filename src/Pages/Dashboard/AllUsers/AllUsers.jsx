import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaUsers } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";



const AllUsers = () => {
    
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })
    console.log(users)

    const handleMakeAdmin = user => {
        axiosSecure.patch(`/users/admin/${user._id}`)
        .then(res => {
            console.log(res.data)
            if(res.data.modifiedCount > 0){
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${user.name} is an Admin Now!`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        })
    }

    const handleDeleteUser = user => {
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
                axiosSecure.delete(`/users/${user._id}`)
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
            <div className="flex justify-evenly my-5">
                <h2 className="text-2xl">All Users</h2>
                <h2 className="text-2xl">Total Users: {users.length}</h2>
            </div>
            <div>

                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user, idx) => <tr key={user._id}>
                                    <th>{idx + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        { user.role === 'admin' ? 'Admin' : <button
                                            onClick={() => handleMakeAdmin(user)}
                                            className="btn btn-ghost btn-sm text-2xl text-white bg-orange-600"><FaUsers></FaUsers> </button>}
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleDeleteUser(user)}
                                            className="btn btn-ghost btn-sm text-2xl text-white bg-red-600"><MdDelete></MdDelete></button>
                                    </td>
                                </tr>)
                            }
                            {/* row 1 */}


                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllUsers;