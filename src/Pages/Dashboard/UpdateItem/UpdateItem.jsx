import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../../components/sectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import UsePublicApi from "../../../Hooks/UsePublicApi";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;

const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateItem = () => {
    const {name, category, recipe, price, _id} = useLoaderData();
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = UsePublicApi();
    const axiosSecure = useAxiosSecure();
    const onSubmit = async (data) => {
        // image upload to imgbb and then get an url
        const imageFile = {image: data.image[0]}
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if(res.data.success){
            // now send the menu item data to the server with the imagebb
            const menuItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: res.data.data.display_url
            }
            // 
            const menuResponse = await axiosSecure.patch(`/menu/${_id}`, menuItem);
            console.log(menuResponse.data);
            if(menuResponse.data.modifiedCount > 0){
                //  show success popup
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} is updated to the menu!`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        }
        // console.log(res.data)
    };
   
    return (
        <div>
            <SectionTitle heading='Update Item' subHeading='Refresh Info'></SectionTitle>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="form-control w-full mb-5">
                        <label className="label">
                            <span className="label-text">Recipe Name*</span>

                        </label>
                        <input {...register("name", { required: true })} defaultValue={name} type="text" placeholder="Recipe Name" className="input input-bordered w-full" />

                    </div>
                    <div className="flex gap-5">
                        {/* category  */}
                        <div className="form-control w-full mb-5">
                            <label className="label">
                                <span className="label-text">Category*</span>

                            </label>
                            <select defaultValue={category} {...register("category", { required: true })} 
                                className="select select-bordered w-full ">
                                <option disabled value='default'>Select a category</option>
                                <option value="salad">Salad</option>
                                <option value="pizza">Pizza</option>
                                <option value="soup">Soup</option>
                                <option value="dessert">Dessert</option>
                                <option value="drinks">Drinks</option>

                            </select>

                        </div>
                        {/* price  */}
                        <div className="form-control w-full mb-5">
                            <label className="label">
                                <span className="label-text">Price*</span>

                            </label>
                            <input {...register("price", { required: true })} defaultValue={price}  type="number" placeholder="Price " className="input input-bordered w-full" />

                        </div>
                    </div>

                    <div className="form-control mb-5">
                        <label className="label">
                            <span className="label-text">Recipe Details</span>

                        </label>
                        <textarea {...register('recipe', { required: true })} defaultValue={recipe} className="textarea textarea-bordered h-24" placeholder="Recipe Details"></textarea>

                    </div>
                    <div className="form-control w-full mb-5">
                        <input {...register('image')} type="file" className="file-input w-full max-w-xs" />
                    </div>

                    <button className="btn">Update Menu Items </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateItem;