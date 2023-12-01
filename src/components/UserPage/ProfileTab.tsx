import { Col, Container, Row, Button, Form, Alert } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { RootState } from '../../store/store';
// import { useNavigate } from 'react-router-dom';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import * as formik from 'formik';
import * as yup from 'yup';
import { updateUserProfile, clearSuccess, clearErrors } from '../../store/slices/auth';

const ProfileTab = () => {
    const user = useAppSelector((state: RootState) => state.auth.user);
    const authSuccess = useAppSelector((state: RootState) => state.auth.authSuccess);
    const propErrors = useAppSelector((state: RootState) => state.auth.errors);

    const inputRef = useRef(null);
    const dispatch = useAppDispatch();
    const [userImg, setUserImg] = useState<any>('/images/client1.jpg');
    const [show, setShow] = useState<boolean>(false);
    const [isEditable, setIsEditable] = useState<boolean>(false);
    const [alert, setAlert] = useState({
        type: '',
        msg: ''
    });
    const handleClick = () => {
        if (inputRef.current) {
            (inputRef.current as HTMLInputElement).click();
        }
    }
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            const file = e.target.files[0];
            const reader = new FileReader();

            reader.onload = (event) => {
                // To get the data URL of the image file
                const dataURL = event.target!.result as string;
                setUserImg(dataURL);
            };
            reader.readAsDataURL(file);
        }
    }
    const { Formik } = formik;
    const schema = yup.object().shape({
        lastname: yup.string().required('Please Enter Your Last Name'),
        firstname: yup.string().required('Please Enter Your First Name'),
        email: yup.string().email('Enter proper email').required('Please Enter Your Email'),
        birthday: yup.string().required('Please Select Your Birthday')
    });

    const upateUser = (values: any) => {
        dispatch(updateUserProfile(values));
    };

    useEffect(() => {
        if (authSuccess) {
            setIsEditable(false);
            setAlert({
                type: 'success',
                msg: 'Updated successfully!'
            });
            setShow(true);
            dispatch(clearSuccess());
        }
    }, [authSuccess]);
    return (
        <>
            <h1 className="mb-5">Hi! {user.user_firstname + ' ' + user.user_lastname}</h1>
            <Container>
                <Row>
                    <Col md={12} lg={6}>
                        {show && (
                            <Alert
                                variant={alert.type}
                                onClose={() => {
                                    setShow(false);
                                    setAlert({ type: '', msg: '' });
                                }}
                                dismissible
                            >
                                {alert.msg}
                            </Alert>
                        )}
                        <Formik
                            validationSchema={schema}
                            onSubmit={(values) => {
                                upateUser(values);
                            }}
                            initialValues={{
                                firstname: user.user_firstname,
                                lastname: user.user_lastname,
                                email: user.user_email,
                                birthday: '1979-03-23'
                            }}
                        >
                            {({ handleSubmit, handleChange, values, touched, errors }) => (
                                <Form noValidate onSubmit={handleSubmit}>
                                    <Row className="mb-3">
                                        <Form.Group as={Row} md="12" controlId="validationFormik01">
                                            <Form.Label column sm="4">
                                                First Name
                                            </Form.Label>
                                            <Col sm="8">
                                                <Form.Control
                                                    type="text"
                                                    placeholder="First Name"
                                                    name="firstname"
                                                    value={values.firstname}
                                                    disabled={!isEditable}
                                                    onChange={handleChange}
                                                    isInvalid={
                                                        touched.firstname && errors.firstname
                                                            ? true
                                                            : false
                                                    }
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.firstname}
                                                </Form.Control.Feedback>
                                            </Col>
                                        </Form.Group>
                                    </Row>
                                    <Row className="mb-3">
                                        <Form.Group as={Row} md="12" controlId="validationFormik04">
                                            <Form.Label column sm="4">
                                                Last Name
                                            </Form.Label>
                                            <Col sm="8">
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Last Name"
                                                    name="lastname"
                                                    value={values.lastname}
                                                    disabled={!isEditable}
                                                    onChange={handleChange}
                                                    isInvalid={
                                                        touched.lastname && errors.lastname
                                                            ? true
                                                            : false
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
                                            <Form.Label column sm="4">
                                                Email
                                            </Form.Label>
                                            <Col sm="8">
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Email"
                                                    name="email"
                                                    value={values.email}
                                                    disabled={!isEditable}
                                                    onChange={(e) => {
                                                        handleChange(e);
                                                        dispatch(clearErrors());
                                                    }}
                                                    isInvalid={
                                                        (touched.email && errors.email) ||
                                                            propErrors.email
                                                            ? true
                                                            : false
                                                    }
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {propErrors.email
                                                        ? 'Email duplicate'
                                                        : errors.email}
                                                </Form.Control.Feedback>
                                            </Col>
                                        </Form.Group>
                                    </Row>
                                    <Row className="mb-3">
                                        <Form.Group as={Row} md="12" controlId="validationFormik03">
                                            <Form.Label column sm="4">
                                                Date of Birth
                                            </Form.Label>
                                            <Col sm="8">
                                                <Form.Control
                                                    type="date"
                                                    placeholder="Date of Birth"
                                                    name="birthday"
                                                    value={values.birthday}
                                                    onChange={handleChange}
                                                    disabled={!isEditable}
                                                    isInvalid={
                                                        touched.birthday && errors.birthday
                                                            ? true
                                                            : false
                                                    }
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.birthday}
                                                </Form.Control.Feedback>
                                            </Col>
                                        </Form.Group>
                                    </Row>
                                    <div
                                        style={{ display: `${isEditable ? '' : 'none'}` }}
                                        className="float-center"
                                    >
                                        <Button type="submit">Update</Button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                        <Button
                            className="mb-3"
                            variant="outline-primary"
                            onClick={() => {
                                setIsEditable(!isEditable);
                            }}
                        >
                            Edit Profile
                        </Button>
                    </Col>
                    <Col md={12} lg={6}>
                        <Button onClick={handleClick} variant='primary' >Change</Button>
                        <img className='img-thumbnail' src={userImg} alt="userimg" />
                        <input ref={inputRef} type='file' accept='image/*' id="imgUpload" style={{ display: 'none' }} onChange={handleFileChange} />
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default ProfileTab;
