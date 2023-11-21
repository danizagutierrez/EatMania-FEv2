import { useEffect, useState } from 'react';
import { Button, Carousel } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { RootState } from '../../store/store';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import ReviewCard from '../../shared/ReviewCard';
import { reviewItem } from '../../store/slices/review';
import axios from 'axios';
import { setReviews } from '../../store/slices/review';

const HomePage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [index, setIndex] = useState(0);
    const reviews = useAppSelector((state: RootState) => state.review.reviews);

    const handleSearch = () => {
        navigate('/search');
    };
    const handleSelect = (selectedIndex: number) => {
        setIndex(selectedIndex);
    };

    useEffect(() => {
        axios
            .get(process.env.REACT_APP_API_URL + '/api/GetAllReviews')
            .then((res) => {
                dispatch(setReviews(res.data));
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div>
            <Header />
            <section className="search_section ">
                <div className="search_section-container">
                    <Button
                        style={{ width: '150px' }}
                        onClick={handleSearch}
                        className="search-button"
                    >
                        Search Food <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </Button>
                </div>
            </section>
            <section className="food_section layout_padding-bottom">
                <div className="container">
                    <div className="filters-content">
                        <div className="row grid">
                            <div className="col-sm-6 col-lg-6 all pizza">
                                <div className="box">
                                    <div>
                                        <div className="img-box">
                                            <img src="/images/f1.png" alt="Image Not Found" />
                                        </div>
                                        <div className="detail-box">
                                            <h5>Delicious Pizza</h5>
                                            <p>
                                                Veniam debitis quaerat officiis quasi cupiditate
                                                quo, quisquam velit, magnam voluptatem repellendus
                                                sed eaque
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-6 col-lg-6 all burger">
                                <div className="box">
                                    <div>
                                        <div className="img-box">
                                            <img src="/images/f2.png" alt="Image Not Found" />
                                        </div>
                                        <div className="detail-box">
                                            <h5>Delicious Burger</h5>
                                            <p>
                                                Veniam debitis quaerat officiis quasi cupiditate
                                                quo, quisquam velit, magnam voluptatem repellendus
                                                sed eaque
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-lg-6 all pizza">
                                <div className="box">
                                    <div>
                                        <div className="img-box">
                                            <img src="/images/f3.png" alt="Image Not Found" />
                                        </div>
                                        <div className="detail-box">
                                            <h5>Delicious Pizza</h5>
                                            <p>
                                                Veniam debitis quaerat officiis quasi cupiditate
                                                quo, quisquam velit, magnam voluptatem repellendus
                                                sed eaque
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-lg-6 all pasta">
                                <div className="box">
                                    <div>
                                        <div className="img-box">
                                            <img src="/images/f4.png" alt="Image Not Found" />
                                        </div>
                                        <div className="detail-box">
                                            <h5>Delicious Pasta</h5>
                                            <p>
                                                Veniam debitis quaerat officiis quasi cupiditate
                                                quo, quisquam velit, magnam voluptatem repellendus
                                                sed eaque
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="reviews" className="client_section layout_padding-bottom">
                <div className="container">
                    <div className="heading_container heading_center psudo_white_primary mb_45">
                        <h2>What Says Our Customers</h2>
                    </div>
                    <div className="carousel-wrap row ">
                        <div className="owl-carousel client_owl-carousel">
                            <Carousel
                                activeIndex={index}
                                onSelect={handleSelect}
                                indicators={false}
                            >
                                {reviews.length > 0 &&
                                    reviews.map((r: reviewItem, ind: number) => (
                                        <Carousel.Item key={ind}>
                                            <ReviewCard
                                                description={r.review_content}
                                                foodId={r.food}
                                                user_id={r.user_id}
                                                rate={r.rating}
                                            />
                                        </Carousel.Item>
                                    ))}
                            </Carousel>
                        </div>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            width: '100%',
                            marginTop: '20px',
                            justifyContent: 'center'
                        }}
                    >
                        <button
                            onClick={() => {
                                navigate('/reviews');
                            }}
                            className="view_more"
                        >
                            View more
                        </button>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default HomePage;
