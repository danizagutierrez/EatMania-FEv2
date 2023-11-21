import { ButtonGroup, Button, Modal, Col, Container, Row, Form, Alert } from 'react-bootstrap';
import * as formik from 'formik';
import * as yup from 'yup';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { RootState } from '../../store/store';
import { useEffect, useState } from 'react';
import {
    deleteCustomers,
    registerUser,
    updateUserProfile,
    clearErrors,
    clearSuccess
} from '../../store/slices/auth';
import CustomerCard from './CustomerCard';

const CustomersTab = () => {
    const dispatch = useAppDispatch();

    const customers = useAppSelector((state: RootState) => state.auth.userList);
    const propErrors = useAppSelector((state: RootState) => state.auth.errors);
    const authSuccess = useAppSelector((state: RootState) => state.auth.authSuccess);

    const [selectedCustomers, setSelectedCustomers] = useState<number[]>([]);
    const [show, setShow] = useState(false);
    const [editing, setEditing] = useState<number | null>(null);

    useEffect(() => {
        setSelectedCustomers([]);
    }, [customers]);

    const handleDelete = () => {
        if (selectedCustomers.length) {
            dispatch(deleteCustomers(selectedCustomers));
        }
    };

    const handleCloseEditing = () => setShow(false);
    const handleShow = () => {
        dispatch(clearErrors());
        dispatch(clearSuccess());
        setEditing(null);
        setShow(true);
    };
    const editCustomer = (value?: number) => {
        if (value) {
            dispatch(clearSuccess());
            dispatch(clearErrors());
            setEditing(value);
            setShow(true);
        }
    };
    const handleCheckboxChange = (checked: boolean, value: string | number) => {
        if (checked) {
            setSelectedCustomers((prevList) => [...prevList, Number(value)]); // Add value to the selected list
        } else {
            setSelectedCustomers((prevList) => prevList.filter((item) => item !== Number(value))); // Remove value from the selected list
        }
    };

    const { Formik } = formik;
    const schema = yup.object().shape({
        lastname: yup.string().required('Please Enter Your Last Name'),
        firstname: yup.string().required('Please Enter Your First Name'),
        email: yup.string().email('Enter proper email').required('Please Enter Your Email'),
        birthday: yup.string().required('Please Select Your Birthday')
    });

    const handleSubmitCustomer = (values: any) => {
        if (editing) {
            dispatch(updateUserProfile({ ...values, user_id: editing }));
        } else {
            dispatch(registerUser(values));
        }
    };

    useEffect(() => {
        if (authSuccess) {
            setShow(false);
            setTimeout(() => {
                dispatch(clearSuccess());
            }, 5000);
        }
    }, [authSuccess]);

    return (
        <div>
            <div className="mb-5 management-header">
                <h1>Customer Management</h1>
                <ButtonGroup>
                    <Button
                        onClick={() => {
                            handleShow();
                        }}
                    >
                        Add
                    </Button>
                    <Button onClick={() => handleDelete()}>Delete</Button>
                </ButtonGroup>
            </div>
            {authSuccess && <Alert variant="success">Success!</Alert>}
            {customers.length &&
                customers
                    .filter((r) => !r.is_admin)
                    .map((r) => (
                        <CustomerCard
                            r={r}
                            key={r.user_id}
                            editCustomer={editCustomer}
                            handleCheckboxChange={handleCheckboxChange}
                        />
                    ))}
            <Modal show={show} onHide={handleCloseEditing}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {editing ? "Edit Customer's Profile" : 'Add A Customer'}
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
                                        firstname: editing
                                            ? customers.filter((r) => r.user_id === editing)[0]
                                                  ?.user_firstname
                                            : '',
                                        lastname: editing
                                            ? customers.filter((r) => r.user_id === editing)[0]
                                                  ?.user_lastname
                                            : '',
                                        email: editing
                                            ? customers.filter((r) => r.user_id === editing)[0]
                                                  ?.user_email
                                            : '',
                                        birthday: '1979-03-23'
                                    }}
                                >
                                    {({ handleSubmit, handleChange, values, touched, errors }) => (
                                        <Form noValidate onSubmit={handleSubmit}>
                                            <Row className="mb-3">
                                                <Form.Group
                                                    as={Row}
                                                    md="12"
                                                    controlId="validationFormik01"
                                                >
                                                    <Form.Label column sm="4">
                                                        First Name
                                                    </Form.Label>
                                                    <Col sm="8">
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="First Name"
                                                            name="firstname"
                                                            value={values.firstname}
                                                            onChange={handleChange}
                                                            isInvalid={
                                                                touched.firstname &&
                                                                errors.firstname
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
                                                <Form.Group
                                                    as={Row}
                                                    md="12"
                                                    controlId="validationFormik04"
                                                >
                                                    <Form.Label column sm="4">
                                                        Last Name
                                                    </Form.Label>
                                                    <Col sm="8">
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Last Name"
                                                            name="lastname"
                                                            value={values.lastname}
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
                                                <Form.Group
                                                    as={Row}
                                                    md="12"
                                                    controlId="validationFormik02"
                                                >
                                                    <Form.Label column sm="4">
                                                        Email
                                                    </Form.Label>
                                                    <Col sm="8">
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Email"
                                                            name="email"
                                                            value={values.email}
                                                            onChange={(e) => {
                                                                handleChange(e);
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
                                                <Form.Group
                                                    as={Row}
                                                    md="12"
                                                    controlId="validationFormik03"
                                                >
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
                                            <div className="float-center gap-2">
                                                <Button type="submit">
                                                    {editing ? 'Update' : 'Add'}
                                                </Button>
                                                <Button
                                                    variant="secondary"
                                                    onClick={handleCloseEditing}
                                                >
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
        </div>
    );
};

export default CustomersTab;
