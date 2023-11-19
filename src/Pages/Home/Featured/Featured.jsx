import SectionTitle from "../../../components/sectionTitle/SectionTitle";
import featuredImg from '../../../assets/home/featured.jpg'
import './Featured.css';
const Featured = () => {
    return ( 
        <div className="featured-item bg-fixed text-white pt-8 mb-5">
            <SectionTitle
            subHeading={'---Check it out---'}
            heading={'FROM OUR MENU'}
            ></SectionTitle>
            <div className="md:flex justify-center items-center pb-24 bg-slate-500 opacity-60 pt-12 px-36">
                <div>
                    <img src={featuredImg} alt="" />
                </div>
                <div className="md:ml-10">
                    <p>March 20, 2023</p>
                    <p className="uppercase">WHERE CAN I GET SOME?</p>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi, in aperiam ut debitis quisquam fugiat recusandae animi, molestias sapiente dolorem nulla dolorum, quo est veniam?</p>
                    <button className="btn btn-outline border-0 border-b-4 ">Order Now</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;