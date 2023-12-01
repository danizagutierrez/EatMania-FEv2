import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { setSearchKey } from '../../store/slices/food';
import { useAppDispatch } from '../../store/hooks';
import Header from '../Header';
import Footer from '../Footer';

const HomePage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleSearch = () => {
        navigate('/search');
    };
    return (
        <div>
            <Header />
            <section className="search_section ">
                <div className="search_section-container">
                    <input
                        type="text"
                        onChange={(e) => {
                            dispatch(setSearchKey(e.target.value));
                        }}
                        className="search-input"
                        placeholder="What kind of food are you craving for?"
                    />
                    <Button onClick={handleSearch} className="search-button">
                        Search
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
                                            <h5>Coming Soon</h5>
                                            <p>
                                                
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
                                        <h5>Coming Soon</h5>
                                            <p>
                                                
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
                                        <h5>Coming Soon</h5>
                                            <p>
                                                
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
                                        <h5>Coming Soon</h5>
                                            <p>
                                                
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default HomePage;
