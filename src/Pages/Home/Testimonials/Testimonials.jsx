import SectionTitle from "../../../components/sectionTitle/SectionTitle";
import { Swiper, SwiperSlide } from 'swiper/react';
import '@smastrom/react-rating/style.css'
import { BsFillChatQuoteFill } from 'react-icons/bs';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";

const Testimonials = () => {
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/reviews')
            .then(res => res.json())
            .then(data => setReviews(data))
    }, [])

    return (
        <section className="my-20">
            <SectionTitle
                subHeading={'---What Our Clients Say---'}
                heading={'TESTIMONIALS'}
            ></SectionTitle>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">

                {
                    reviews.map(review => <SwiperSlide key={review._id}

                    >
                        <div className="mx-24 flex flex-col items-center my-16">
                            <Rating
                                style={{ maxWidth: 180 }}
                                value={review.rating}
                                readOnly
                            />
                            <p className="py-5"><BsFillChatQuoteFill className="text-4xl"></BsFillChatQuoteFill></p>
                            <p className="py-5">{review.details}</p>
                            <h2 className="text-2xl text-orange-500">{review.name}</h2>
                        </div>
                    </SwiperSlide>)
                }
            </Swiper>

        </section>
    );
};

export default Testimonials;