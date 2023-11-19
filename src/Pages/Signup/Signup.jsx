
import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import UsePublicApi from "../../Hooks/UsePublicApi";
import SocialLogin from "../../components/SocialLogin/SocialLogin";



const Signup = () => {
    const axiosPublic = UsePublicApi();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const { createUser, updateUserProfile } = useContext(AuthContext)
    const navigate = useNavigate();

    const onSubmit = (data) => {
        console.log(data);
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);

                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        const userInfo = {
                            name: data.name,
                            email: data.email
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('profile updated')
                                    reset();

                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'User created successfully & added to mongodb database',
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate('/');
                                }
                            })

                    })
                    .catch(error => console.log(error))

            })
    }


    // const [signUpError, setSignUpError] = useState('');
    // const [successSignUp, setSuccessSignUp] = useState('')


    // const { createUser, logOut } = useContext(AuthContext);

    // const handleSignUp = e => {

    //     e.preventDefault();
    //     const name = e.target.name.value;
    //     const photo = e.target.photo.value;
    //     const email = e.target.email.value;
    //     const password = e.target.password.value;
    //     console.log(name, photo, email, password);
    //     setSignUpError('');
    //     setSuccessSignUp('');

    //     if (password.length < 6) {
    //         Swal.fire({
    //             icon: 'error',
    //             title: 'Oops...',
    //             text: 'password must be more than six character',

    //         })
    //         setSignUpError();


    //         return;
    //     }
    //     else if (!/[A-Z]/.test(password)) {
    //         Swal.fire({
    //             icon: 'error',
    //             title: 'Oops...',
    //             text: 'password must be one capital letter',

    //         })
    //         setSignUpError();

    //         return;
    //     }
    //     else if (!/[!@#$%^&*(),.?":{}|<>\s]/.test(password)) {
    //         Swal.fire({
    //             icon: 'error',
    //             title: 'Oops...',
    //             text: 'password must be one capital letter',
    //         })
    //         setSignUpError();

    //         return;
    //     }

    //     createUser(email, password)
    //         .then(result => {
    //             console.log(result.user);
    //             const user = {email};
    //             fetch('https://book-wave-server.vercel.app/user', {
    //                 method: 'POST',
    //                 headers: {
    //                     'content-type' : 'application/json'
    //                 },
    //                 body: JSON.stringify(user)
    //             })
    //             .then(res => res.json())
    //             .then(data => {
    //                 console.log(data)
    //             })


    //             Swal.fire({
    //                 position: 'top-end',
    //                 icon: 'success',
    //                 title: 'User created successfully & added to mongodb database',
    //                 showConfirmButton: false,
    //                 timer: 1500
    //             })
    //             setSuccessSignUp()

    //             updateProfile(result.user, {
    //                 displayName: name,
    //                 photoURL: photo
    //             })
    //                 .then(() => {
    //                     console.log('Profile Updated')
    //                 })
    //                 .catch(error => {
    //                     console.error(error)
    //                 });
    //                 logOut();
    //                 navigate('/login');

    //         })
    //         .catch(error => {
    //             console.error(error);
    //             setSignUpError(error.message)
    //         })

    // }
    return (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 items-center gap-3 p-4">
            <Helmet>
                <title>Bistro Boss | SignUp</title>

            </Helmet>
            <div>
                <img className="rounded-lg h-[500px] transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300" src="https://i.ibb.co/yQwv7by/loginpage.jpg" alt="" />
            </div>
            <div className="hero  bg-base-200 rounded-lg">
                <div className=" flex-col ">
                    <div className="text-center ">
                        <h1 className="text-5xl font-bold text-gray-400 mb-3">SignUp Here now!</h1>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input type="text" defaultValue="test" {...register("name", { required: true })} name='name' placeholder="Name" className="input input-bordered" />
                                    {errors.name && <span>This name field is required</span>}
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Photo</span>
                                    </label>
                                    <input type="text" name='photo' {...register("photo", { required: true })} placeholder="Photo URL" required className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" name='email' defaultValue="test" {...register("email", { required: true })} placeholder="email" className="input input-bordered" />
                                    {errors.email && <span>This email field is required</span>}
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password" defaultValue="test" {...register("password", {
                                        required: true,
                                        minLength: 6,
                                        maxLength: 20,
                                        pattern: /(?=.*[A-Z])(?=.*[A-Z0-9!@#$%^&*])(?=.*[!@#$%^&*(),.?":{}|<>\s]){6,20}/
                                    })} name='password' required placeholder="password" className="input input-bordered" />
                                    {errors.password?.type === 'required' && <p>This password field is required</p>}
                                    {errors.password?.type === 'minLength' && <p>password must be 6 character required</p>}
                                    {errors.password?.type === 'maxLength' && <p>password must be 6 character required</p>}
                                    {errors.password?.type === 'pattern' && <p>password must be 1 uppercase, 1 lowercase, 1 numeric number, 1 special character and more than 6 and less than 20 words</p>}


                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn btn-primary">Sign Up</button>
                                </div>
                            </form>
                            <p>Already have an account? <Link to='/login'><button className="btn btn-link">Login</button></Link></p>
                            <SocialLogin></SocialLogin>
                            {/* <p className="text-center"><button onClick={handleGoogleSignIn} className="btn btn-ghost" > <FcGoogle className="text-2xl" /></button></p> */}
                        </div>
                        {/* {
                            signUpError && <p className="text-red-700">{signUpError}</p>
                        }
                        {
                            successSignUp && <p className="text-green-700">{successSignUp}</p>
                        } */}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;