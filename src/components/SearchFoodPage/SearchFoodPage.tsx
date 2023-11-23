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
    pricelow: boolean;
    priceHigh: boolean;
    Ratings: boolean;
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
        pricelow: false,
        priceHigh: false,
        Ratings: false
    });


    function orderFoodsByPriceAsc(food2: FoodItem[], ascending: boolean = true): FoodItem[] {
        // Use the sort method with a compare function
        food2.sort((a, b) => {
            if (ascending) {
            return a.foodPrice - b.foodPrice;
          } else {
            return b.foodPrice - a.foodPrice;
          }
        });
        // Return the sorted array
        return food2;
      }

    function orderFoodsByPriceDesc(food2: FoodItem[], descending: boolean = true): FoodItem[] {
        // Use the sort method with a compare function
        food2.sort((a, b) => {
          if (descending) {
            return b.foodPrice - a.foodPrice;
          } else {
            return a.foodPrice - b.foodPrice;
          }
        });
      
        // Return the sorted array
        return food2;
      }

      function orderFoodsByRating(food2: FoodItem[], descending: boolean = true): FoodItem[] {
        // Use the sort method with a compare function
        food2.sort((a, b) => {
          if (descending) {
            return b.rating - a.rating;
          } else {
            return a.rating - b.rating;
          }
        });
        // Return the sorted array
        return food2;
      }

    const searchFood = () => {

        if (searchKeyWord) {
            const newFoodList = foods.filter((food: FoodItem) => {
                // Perform case-insensitive search on food name
                return food.foodName.toLowerCase().includes(searchKeyWord.toLowerCase());
            });
            setFoodList(newFoodList);
        } else {
            // If no search keyword, set foodList to the original list (foods)
            setFoodList(foods);
            console.log(foods)
        }
    };
    

    const filterFood = () => {
        setFoodList((prevFoodList) => {
            let newFoodList = [...prevFoodList];
    
            if (filter.pricelow) {
                newFoodList = orderFoodsByPriceAsc(newFoodList, true);
            } else if (filter.priceHigh) {
                newFoodList = orderFoodsByPriceDesc(newFoodList, true);
            } else if (filter.Ratings) {
                newFoodList = orderFoodsByRating(newFoodList, true);
            }
    
            return newFoodList;
        });
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
        }
        else {
            setFoodList(foods);
        }
    }, [filter]);

    useEffect(() => {
        if(filter){
            filterFood() 
        }  
    }, [filter]);

    const { Formik } = formik;
    const schema = yup.object().shape({
        rating: yup.number(),
        review_content: yup.string().required('Please describe your review')
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
                    <div>Sort by</div>
                        <Form.Group>
                            <Form.Check
                                label="Price(Lower to Higher)"
                                checked={filter.pricelow}
                                onChange={(e) => {
                                    setFilter({ ...filter, pricelow: e.target.checked });
                                }}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Check
                                label="Price(Higher to Lower)"
                                checked={filter.priceHigh}
                                onChange={(e) => {
                                    setFilter({ ...filter, priceHigh: e.target.checked });
                                }}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Check
                                label="Rating(Higher to lower)"
                                checked={filter.Ratings}
                                onChange={(e) => {
                                    setFilter({ ...filter, Ratings: e.target.checked });
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
