import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { fetchFood, setSearchKey } from '../../store/slices/food';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import Header from '../Header';
import Footer from '../Footer';
import { FoodCard } from '../../shared/FoodCard';
import type { FoodItem } from '../../store/slices/food';
import { RootState } from '../../store/store';
import { ReactComponent as NoDataSvg } from '../../assets/icons/NoData.svg';
import PaginationEle from '../../shared/Pagination';

interface Filters {
    pricelow: boolean;
    priceHigh: boolean;
    Ratings: boolean;
}

const SearchFoodPage = () => {
    const dispatch = useAppDispatch();
    // const navigate = useNavigate();
    const foods = useAppSelector((state: RootState) => state.food.foods);
    const searchKey = useAppSelector((state: RootState) => state.food.searchKey);
    

    const [foodList, setFoodList] = useState<FoodItem[]>([]);
    const [pageActive, setPageActive] = useState<number>(1);

    const [searchKeyWord, setSearchKeyWord] = useState<string>('');
    const [filter, setFilter] = useState<Filters>({
        pricelow: false,
        priceHigh: false,
        Ratings: false
    });

    useEffect(() => {
        dispatch(fetchFood())
    }, [dispatch]);


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
        const newFoodList = foods.filter((food: FoodItem) => {
            let flag = false;
            if (filter.pricelow) {
                // flag = food.foodPrice.toLowerCase().includes(searchKeyWord.toLowerCase());
                flag = food.foodPrice.toString().toLowerCase().includes(searchKeyWord.toLowerCase());

            }
            // if (!flag && filter.reviews) {
            //     flag = food.rating 
            //     //.includes(searchKeyWord.toLowerCase());
            // }
            // if (!flag && filter.Ratings) {
            //     flag = food.spice.toLowerCase().includes(searchKeyWord.toLowerCase());
            // }
            if (!flag) {
                flag = food.foodName.toLowerCase().includes(searchKeyWord.toLowerCase());
            }
            return flag;
        });
        setFoodList(newFoodList);
    };

    const filterFood = () => {
    
            setFoodList(foodList);
            let newFoodList:FoodItem[] = [];
            if (filter.pricelow) {
                
                newFoodList = orderFoodsByPriceAsc([...foodList], true)
            }
            else{
                newFoodList = foodList;
            }
            if(filter.priceHigh){
                newFoodList = orderFoodsByPriceDesc([...foodList], true)
            }
            else if(filter.Ratings){
                newFoodList = orderFoodsByRating([...foodList], true)
            }
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
    useEffect(() => {
        filterFood();
    }, [filter]);

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
                                                        <FoodCard food={food} />
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
            <Footer />
        </div>
    );
};

export default SearchFoodPage;
