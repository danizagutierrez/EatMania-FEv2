import { useState, FC } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Nav } from 'react-bootstrap';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Bg from '../../assets/images/hero-bg.jpg';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setSignTab } from '../../store/slices/auth';
import { RootState } from '../../store/store';
import { logout } from '../../store/slices/auth';

interface HeaderProps {
    query?: string;
}

const Header: FC<HeaderProps> = ({ query }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector((state: RootState) => state.auth.isAuthenticated);
    const user = useAppSelector((state: RootState) => state.auth.user);

    const [isShowMenu, setIsShowMenu] = useState(false);
    const goToSignPage = (location: string) => {
        dispatch(setSignTab(location));
        navigate('/sign');
    };
    const toggleMenu = () => {
        setIsShowMenu(!isShowMenu);
    };

    return (
        <div className="sub_page hero_area">
            <div className="bg-box">
                <img src={Bg} alt="Home_Bg" />
            </div>
            <header className="header_section">
                <div className="container">
                    <nav className="navbar navbar-expand-lg custom_nav-container ">
                        <Link className="navbar-brand" to="/">
                            <span>EAT MANIA</span>
                        </Link>

                        <button
                            onClick={toggleMenu}
                            className={`navbar-toggler ${isShowMenu ? 'expanded' : ''}`}
                        >
                            <span className=""> </span>
                        </button>

                        <div className={`collapse navbar-collapse ${isShowMenu ? 'show' : ''}`}>
                            <Nav className="navbar-nav  mx-auto " activeKey="/">
                                <Nav.Item className="nav-item">
                                    <Link className="nav-link" to="/aboutus">
                                        About Us
                                    </Link>
                                </Nav.Item>
                                <Nav.Item className="nav-item">
                                    <Link className="nav-link" to="/subscription">
                                        Subscriptions
                                    </Link>
                                </Nav.Item>
                                <Nav.Item className="nav-item">
                                    <Link className="nav-link" to="/faq">
                                        FAQs
                                    </Link>
                                </Nav.Item>
                                <Nav.Item className="nav-item">
                                    <Link className="nav-link" to="/contactus">
                                        Contact Us
                                    </Link>
                                </Nav.Item>
                            </Nav>
                            {!((query && query === 'sign') || isAuthenticated) && (
                                <>
                                    <Button
                                        onClick={() => {
                                            goToSignPage('signin');
                                        }}
                                        variant="outline-light"
                                    >
                                        Login
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            goToSignPage('signup');
                                        }}
                                        style={{ marginLeft: '10px' }}
                                        variant="outline-light"
                                    >
                                        SignUp
                                    </Button>
                                </>
                            )}
                            {isAuthenticated && (
                                <Dropdown as={ButtonGroup}>
                                    <span
                                        className="userLink"
                                        onClick={() => {
                                            if (user.is_admin) {
                                                navigate('/admin');
                                            } else {
                                                navigate('/user');
                                            }
                                        }}
                                    >
                                        <img
                                            style={{
                                                width: '40px',
                                                borderRadius: '50%',
                                                border: '2px solid white',
                                                marginRight: '5px'
                                            }}
                                            src="/images/client1.jpg"
                                            alt="Not found iamge"
                                        />
                                        {user.user_firstname} {user.user_lastname}
                                    </span>
                                    <Dropdown.Toggle split className="userLink" />
                                    <Dropdown.Menu>
                                        <Dropdown.Item
                                            onClick={() => {
                                                dispatch(logout());
                                            }}
                                        >
                                            Sign Out
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            )}
                        </div>
                    </nav>
                </div>
            </header>
        </div>
    );
};

export default Header;
