import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as formik from 'formik';
import * as yup from 'yup';
import Header from '../Header';
import Footer from '../Footer';
import {
    loginUser,
    registerUser,
    setSignTab,
    clearErrors,
    clearSuccess
} from '../../store/slices/auth';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { RootState } from '../../store/store';
import { Alert } from 'react-bootstrap';
import apiService from '../../services/apiService';

const SignIn = () => {
    const navigate = useNavigate();
    const [isSign, setIsSign] = useState(true);
    const propErrors = useAppSelector((state: RootState) => state.auth.errors);
    const isAuthenticated = useAppSelector((state: RootState) => state.auth.isAuthenticated);
    const dispatch = useAppDispatch();

    const { Formik } = formik;
    const schema = yup.object().shape({
        email: yup.string().email('Enter proper email').required('Please Enter Your Email'),
        password: yup
            .string()
            .min(6, 'Must be at least 6 characters long')
            .required('Please Enter Your Password')
    });

    const signinUser = (values: any) => {
        const body = {
            email: values.email,
            password: values.password
        };

        // Make a registration API call using apiService.dataService
        apiService.dataService(body, 'LOGIN').then((data: any) => {
            if (data?.status == 200) {

                dispatch(loginUser(data));
                navigate('/user');
            } else {
                // Handle unsuccessful login
                setIsSign(false);
                console.error('Login failed:', data?.status);

                // Example: Show an error message to the user

                dispatch(clearErrors());
            }
        });
    };


    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated]);
    return (
        <div className="signin">
            <Formik
                validationSchema={schema}
                onSubmit={(values) => {
                    signinUser(values);
                }}
                initialValues={{
                    email: '',
                    password: ''
                }}
            >
                {({ handleSubmit, handleChange, values, touched, errors }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Form.Group as={Row} md="12" controlId="validationFormik01">
                                <Form.Label column sm="2">
                                    Email
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control
                                        type="text"
                                        placeholder="Email"
                                        name="email"
                                        value={values.email}
                                        onChange={(e) => {
                                            handleChange(e);
                                            dispatch(clearErrors());
                                        }}
                                        isInvalid={
                                            (touched.email && errors.email) || propErrors.email
                                                ? true
                                                : false
                                        }
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {propErrors.email ? 'Email not found' : errors.email}
                                    </Form.Control.Feedback>
                                </Col>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Row} md="12" controlId="validationFormik02">
                                <Form.Label column sm="2">
                                    Password
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                        value={values.password}
                                        onChange={(e) => {
                                            handleChange(e);
                                            dispatch(clearErrors());
                                        }}
                                        isInvalid={
                                            (touched.password && errors.password) ||
                                            propErrors.password
                                                ? true
                                                : false
                                        }
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {propErrors.password
                                            ? 'Password not matched'
                                            : errors.password}
                                    </Form.Control.Feedback>
                                </Col>
                            </Form.Group>
                        </Row>
                        {isSign==false && 'Login unsuccessfull'}
                        <div className="float-center">
                            <Button type="submit">Sign In</Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

const SignUp = () => {
    const propsErrors = useAppSelector((state: RootState) => state.auth.errors);
    const [isReg, setIsReg] = useState(false);
    const dispatch = useAppDispatch();

    const { Formik } = formik;
    const schema = yup.object().shape({
        firstname: yup.string().required('Please Enter Your First Name'),
        lastname: yup.string().required('Please Enter Your Last Name'),
        email: yup.string().email('Enter proper email').required('Please Enter Your Email'),
        password: yup
            .string()
            .min(6, 'Must be at least 6 characters long')
            .required('Please Enter Your Password')
    });

    const signupUser = (values: any) => {
        const body = {
            firstName: values?.firstname,
            lastName: values?.lastname,
            userEmail: values.email,
            password: values.password
        };
        // Make a registration API call using apiService.dataService
        apiService.dataService(body, 'REGISTER').then((data: any) => {
            if (data?.status == 200) {
                setIsReg(true);
            }
            dispatch(registerUser(data));
        });
    };

    return (
        <div className="signup">
            <Formik
                validationSchema={schema}
                onSubmit={(values) => {
                    signupUser(values);
                }}
                initialValues={{
                    firstname: '',
                    lastname: '',
                    email: '',
                    password: ''
                }}>
                {({ handleSubmit, handleChange, values, touched, errors }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Form.Group as={Row} md="12" controlId="validationFormik01">
                                <Form.Label column sm="2">
                                    First Name
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control
                                        type="text"
                                        placeholder="FirstName"
                                        name="firstname"
                                        value={values.firstname}
                                        onChange={(e) => {
                                            handleChange(e);
                                            dispatch(clearErrors());
                                        }}
                                        isInvalid={
                                            touched.firstname && errors.firstname ? true : false
                                        }
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.firstname}
                                    </Form.Control.Feedback>
                                </Col>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Row} md="12" controlId="validationFormik011">
                                <Form.Label column sm="2">
                                    Last Name
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control
                                        type="text"
                                        placeholder="Last Name"
                                        name="lastname"
                                        value={values.lastname}
                                        onChange={(e) => {
                                            handleChange(e);
                                            dispatch(clearErrors());
                                        }}
                                        isInvalid={
                                            touched.lastname && errors.lastname ? true : false
                                        }
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.lastname}
                                    </Form.Control.Feedback>
                                </Col>
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Row} md="12" controlId="validationFormik02">
                                <Form.Label column sm="2">
                                    Email
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control
                                        type="text"
                                        placeholder="Email"
                                        name="email"
                                        value={values.email}
                                        onChange={(e) => {
                                            handleChange(e);
                                            dispatch(clearErrors());
                                        }}
                                        isInvalid={
                                            (touched.email && errors.email) || propsErrors.email
                                                ? true
                                                : false
                                        }
                                    />
                                    <Form.Control.Feedback type="invalid">
                                    {propsErrors.email
                                            ? 'User Email already exists'
                                            : errors.email}
                                    </Form.Control.Feedback>
                                </Col>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Row} md="12" controlId="validationFormik03">
                                <Form.Label column sm="2">
                                    Password
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                        value={values.password}
                                        onChange={(e) => {
                                            handleChange(e);
                                            dispatch(clearErrors());
                                        }}
                                        isInvalid={
                                            touched.password && errors.password ? true : false
                                        }
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.password}
                                    </Form.Control.Feedback>
                                </Col>
                            </Form.Group>
                        </Row>
                        {isReg && 'Register Successfull'}
                        <div className="float-center">
                            <Button type="submit">Sign Up</Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

interface AlertType {
    type: string;
    msg: string;
}

const SignPage = () => {
    const dispatch = useAppDispatch();
    const authSuccess = useAppSelector((state: RootState) => state.auth.authSuccess);

    const [alert, setAlert] = useState<AlertType>({
        type: '',
        msg: ''
    });
    const [activeTab, setActiveTab] = useState<string>('signin');
    const tab = useAppSelector((state: RootState) => state.auth.tab);

    useEffect(() => {
        dispatch(clearErrors());
        dispatch(clearSuccess());
        setActiveTab(tab);
        setAlert({
            type: '',
            msg: ''
        });
    }, [tab]);

    useEffect(() => {
        if (authSuccess) {
            dispatch(setSignTab('signin'));
            setAlert({
                type: 'success',
                msg: 'Registered successfully!'
            });
        }
    }, [authSuccess]);

    return (
        <div>
            <Header query="sign" />
            <section className="sign">
                <div className="tab">
                    <Nav
                        variant="tabs"
                        activeKey={activeTab}
                        onSelect={(selectedKey: any) => {
                            dispatch(setSignTab(selectedKey));
                        }}
                    >
                        <Nav.Item>
                            <Nav.Link eventKey="signin">Login</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="signup">Sign up</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <div className="tab-content">
                        {alert.type && <Alert variant={alert.type}>{alert.msg}</Alert>}
                        {activeTab === 'signin' ? <SignIn /> : <SignUp />}
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default SignPage;
