import { useEffect, useState } from 'react';
import { Button, Modal, Row, Col, Container, Form } from 'react-bootstrap';
import * as formik from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { setSearchKey } from '../../store/slices/food';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import Header from '../Header';
import Footer from '../Footer';
import { FoodCard } from '../../shared/FoodCard';
import type { FoodItem } from '../../store/slices/food';
import { RootState } from '../../store/store';
import { ReactComponent as NoDataSvg } from '../../assets/icons/NoData.svg';
import PaginationEle from '../../shared/Pagination';
import { Rating } from 'react-simple-star-rating';
import { toast } from 'react-toastify';

interface Filters {
    price: boolean;
    reviews: boolean;
    spice: boolean;
}

const SearchFoodPage = () => {
    const foods = useAppSelector((state: RootState) => state.food.foods);
    const user = useAppSelector((state: RootState) => state.auth.user);
    const searchKey = useAppSelector((state: RootState) => state.food.searchKey);
    const dispatch = useAppDispatch();

    const [foodList, setFoodList] = useState<FoodItem[]>([]);
    const [pageActive, setPageActive] = useState<number>(1);
    const [show, setShow] = useState(false);
    const [editing, setEditing] = useState<number | null>(null);
    const [rating, setRating] = useState(0);
    const [searchKeyWord, setSearchKeyWord] = useState<string>('');

    const handleClose = () => setShow(false);
    const handleShow = (value: number) => {
        setEditing(value);
        setShow(true);
    };
    const handleRating = (rate: number) => {
        setRating(rate);
    };

    const [filter, setFilter] = useState<Filters>({
        price: false,
        reviews: false,
        spice: false
    });

    const searchFood = () => {
        const newFoodList = foods.filter((food: FoodItem) => {
            let flag = false;
            if (filter.price) {
                flag = food.foodPrice.toLowerCase().includes(searchKeyWord.toLowerCase());
            }
            // if (!flag && filter.reviews) {
            //     flag = food.reviews.toLowerCase().includes(searchKeyWord.toLowerCase());
            // }
            // if (!flag && filter.spice) {
            //     flag = food.spice.toLowerCase().includes(searchKeyWord.toLowerCase());
            // }
            if (!flag) {
                flag = food.foodName.toLowerCase().includes(searchKeyWord.toLowerCase());
            }
            return flag;
        });
        setFoodList(newFoodList);
    };

    const handleSearch = () => {
        if (searchKeyWord) {
            searchFood();
        } else {
            setFoodList(foods);
        }
    };

    useEffect(() => {
        if (foods) {
            setFoodList(foods);
        }
    }, [foods]);
    useEffect(() => {
        if (searchKeyWord) {
            searchFood();
        } else {
            setFoodList(foods);
        }
    }, [searchKeyWord]);
    useEffect(() => {
        if (searchKey) {
            setSearchKeyWord(searchKey);
            dispatch(setSearchKey(''));
        }
    }, [searchKey]);
    useEffect(() => {
        if (searchKeyWord) {
            searchFood();
        } else {
            setFoodList(foods);
        }
    }, [filter]);

    const { Formik } = formik;
    const schema = yup.object().shape({
        rating: yup.number(),
        review_content: yup.string().required('Please descripbe your review')
    });

    const handleSubmitCustomer = (values: any) => {
        axios
            .post(
                process.env.REACT_APP_API_URL +
                    '/api/' +
                    user.user_id +
                    '/fooditem/' +
                    editing +
                    '/review',
                {
                    review_content: values.review_content,
                    rating: rating
                }
            )
            .then((res) => {
                setShow(false);
                setEditing(null);
                console.log(res.data.food);
                toast.success('Your review has been submitted. Thank you for your contribution.', {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
            <Header />
            <section className="search_section ">
                <div className="search_section-container">
                    <input
                        type="text"
                        value={searchKeyWord}
                        onChange={(e) => {
                            setSearchKeyWord(e.target.value);
                        }}
                        className="search-input"
                        placeholder="What kind of food are you craving for?"
                    />
                    <Button onClick={handleSearch} className="search-button">
                        Search
                    </Button>
                </div>
            </section>
            <Container>
                <Row>
                    <Col md={12} lg={2} className="filter-class">
                        <div>Filters</div>
                        <Form.Group>
                            <Form.Check
                                label="Price"
                                checked={filter.price}
                                onChange={(e) => {
                                    setFilter({ ...filter, price: e.target.checked });
                                }}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Check
                                label="Reviews"
                                checked={filter.reviews}
                                onChange={(e) => {
                                    setFilter({ ...filter, reviews: e.target.checked });
                                }}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Check
                                label="Spice"
                                checked={filter.spice}
                                onChange={(e) => {
                                    setFilter({ ...filter, spice: e.target.checked });
                                }}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={12} lg={10}>
                        <section className="offer_section layout_padding-bottom pt-0">
                            <div className="offer_container">
                                <div className="pagination">
                                    <PaginationEle
                                        items={foodList}
                                        currentPage={pageActive}
                                        setPageActive={(page) => {
                                            setPageActive(page);
                                        }}
                                    />
                                </div>
                                <Container>
                                    <Row>
                                        {foodList &&
                                            foodList
                                                .slice((pageActive - 1) * 4, pageActive * 4)
                                                .map((food, i) => (
                                                    <Col sm={12} md={6} key={i}>
                                                        <FoodCard
                                                            addReview={handleShow}
                                                            food={food}
                                                        />
                                                    </Col>
                                                ))}

                                        {foodList.length === 0 && (
                                            <div className="no-data">
                                                No Data Found
                                                <NoDataSvg
                                                    style={{ height: '90px', width: '90px' }}
                                                />
                                            </div>
                                        )}
                                    </Row>
                                </Container>
                            </div>
                        </section>
                    </Col>
                </Row>
            </Container>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Leave a review for{' '}
                        {foods.filter((f) => f.foodId === editing)[0]?.foodName || ''}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col md={12}>
                                <Formik
                                    validationSchema={schema}
                                    onSubmit={(values) => {
                                        handleSubmitCustomer(values);
                                    }}
                                    initialValues={{
                                        rating: 0,
                                        review_content: ''
                                    }}
                                >
                                    {({ handleSubmit, handleChange, values, touched, errors }) => (
                                        <Form noValidate onSubmit={handleSubmit}>
                                            <Row className="mb-3">
                                                <Form.Group
                                                    as={Row}
                                                    md="12"
                                                    controlId="validationFormik06"
                                                >
                                                    <Form.Label column sm="4">
                                                        Rate
                                                    </Form.Label>
                                                    <Col sm="8">
                                                        <Rating onClick={handleRating} />
                                                    </Col>
                                                </Form.Group>
                                            </Row>
                                            <Row className="mb-3">
                                                <Form.Group
                                                    as={Col}
                                                    md="12"
                                                    controlId="validationFormik05"
                                                >
                                                    <Form.Label>Description</Form.Label>
                                                    <Form.Control
                                                        as="textarea"
                                                        rows={3}
                                                        placeholder=""
                                                        name="review_content"
                                                        value={values.review_content}
                                                        onChange={handleChange}
                                                        isInvalid={
                                                            touched.review_content &&
                                                            !!errors.review_content
                                                        }
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.review_content}
                                                    </Form.Control.Feedback>
                                                </Form.Group>
                                            </Row>
                                            <div className="float-center gap-2">
                                                <Button type="submit">Submit</Button>
                                                <Button variant="secondary" onClick={handleClose}>
                                                    Close
                                                </Button>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>

            <Footer />
        </div>
    );
};

export default SearchFoodPage;
