import { FcGoogle } from "react-icons/fc";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
const SocialLogin = () => {
    const {googleLogin} = useAuth()
    const axiosPublic = useAxiosSecure();
    const navigate = useNavigate();

    const handleGoogleSignIn = () =>{
        googleLogin()
        .then(result => {
            console.log(result.user);
            const userInfo = {
                email: result.user?.email,
                name: result.user?.displayName
            }
            axiosPublic.post('/users', userInfo)
            .then(res => {
                console.log(res.data)
                navigate('/');
            })
        })
    }
    return (
        
        <div>
            <div className="text-center">
                <button onClick={handleGoogleSignIn} className="btn p-3">
                    <FcGoogle className="text-3xl"></FcGoogle>
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;