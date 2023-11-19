import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import img1 from '../../../assets/home/slide1.jpg';
import img2 from '../../../assets/home/slide2.jpg';
import img3 from '../../../assets/home/slide3.jpg';
import img4 from '../../../assets/home/slide4.jpg';
import img5 from '../../../assets/home/slide5.jpg';
import SectionTitle from '../../../components/sectionTitle/SectionTitle';


const FoodCtaegory = () => {
    return (
        <section>
            <SectionTitle
            subHeading={'---From 11:00am to 10:00pm---'}
            heading={'ORDER ONLINE'}
            >

            </SectionTitle>
            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                centeredSlides={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper mb-10"
            >
                <SwiperSlide>
                    <img src={img1} alt="" />
                    <h3 className='text-2xl uppercase text-center -mt-16 shadow-slate-100 text-white'>Salads</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={img2} alt="" />
                    <h3 className='text-2xl uppercase text-center -mt-16 shadow-slate-100 text-white'>Pizzas</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={img3} alt="" />
                    
                    <h3 className='text-2xl uppercase text-center -mt-16 shadow-slate-100 text-white'>Soups</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={img4} alt="" />
                    <h3 className='text-2xl uppercase text-center -mt-16 shadow-slate-100 text-white'>Deserts</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={img5} alt="" />
                    <h3 className='text-2xl uppercase text-center -mt-16 shadow-slate-100 text-white'>Salads</h3>
                </SwiperSlide>

            </Swiper>
        </section>
    );
};

export default FoodCtaegory;