import { Row, Col } from 'react-bootstrap';
import Header from '../Header';
import Footer from '../Footer';
import { useAppSelector } from '../../store/hooks';
import { RootState } from '../../store/store';
import ReviewCard from '../../shared/ReviewCard';
import { reviewItem } from '../../store/slices/review';

const ReivewsPage = () => {
    const reviews = useAppSelector((state: RootState) => state.review.reviews);

    return (
        <>
            <Header />
            <section style={{ marginTop: '20px' }} className="client_section layout_padding-bottom">
                <div className="container">
                    <div className="heading_container heading_center psudo_white_primary mb_45">
                        <h2>What Says Our Customers</h2>
                    </div>
                    <div className="carousel-wrap row ">
                        <div className="owl-carousel client_owl-carousel">
                            <Row>
                                {reviews.length > 0 &&
                                    reviews.map((r: reviewItem, ind: number) => (
                                        <Col key={ind} xs={12} md={6}>
                                            <ReviewCard
                                                description={r.review_content}
                                                foodId={r.food}
                                                user_id={r.user_id}
                                                rate={r.rating}
                                            />
                                        </Col>
                                    ))}
                            </Row>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default ReivewsPage;
