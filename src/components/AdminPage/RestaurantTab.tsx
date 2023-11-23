import { ButtonGroup, Button, Modal, Col, Row, Form, Container } from 'react-bootstrap';
import * as formik from 'formik';
import * as yup from 'yup';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { RootState } from '../../store/store';
import { useEffect, useState } from 'react';
import {
    deleteRestaurants,
    clearSuccess,
    updateRestaurant,
    addRestaurant,
    fetchRestaurant
} from '../../store/slices/restaurants';
import RestaurantCard from './RestaurantCard';

const RestaurantTab = () => {
    const dispatch = useAppDispatch();

    const restaurants = useAppSelector((state: RootState) => state.restaurant.restaurants);
    const success = useAppSelector((state: RootState) => state.restaurant.success);

    const [selectedRestaurants, setSelectedRestaurants] = useState<number[]>([]);
    const [show, setShow] = useState(false);
    const [editing, setEditing] = useState<number | null>(null);

    useEffect(() => {
        setSelectedRestaurants([]);
    }, [restaurants]);
    
    useEffect(() => {
        dispatch(fetchRestaurant())
    }, [dispatch]);

    const handleDelete = () => {
        if (selectedRestaurants.length) {
            dispatch(deleteRestaurants(selectedRestaurants));
        }
    };

    const handleCloseEditing = () => setShow(false);
    const handleShow = () => {
        dispatch(clearSuccess());
        setEditing(null);
        setShow(true);
    };
    const editRestaurant = (value?: number) => {
        if (value) {
            dispatch(clearSuccess());
            setEditing(value);
            setShow(true);
        }
    };

    const handleCheckboxChange = (checked: boolean, value: string | number) => {
        if (checked) {
            setSelectedRestaurants((prevList) => [...prevList, Number(value)]); // Add value to the selected list
        } else {
            setSelectedRestaurants((prevList) => prevList.filter((item) => item !== Number(value))); // Remove value from the selected list
        }
    };

    const { Formik } = formik;
    const schema = yup.object().shape({
        name: yup.string().required("Please Enter Restaurant's Name"),
        cuisine_type: yup.string().required('Please Enter Cuisine Type'),
        description: yup.string().required('Please Enter Description'),
        phone_number: yup.string().required('Please Enter Phone Number'),
        website: yup.string().required('Please Enter Website URL')
    });

    const handleSubmitCustomer = (values: any) => {
        if (editing) {
            dispatch(updateRestaurant({ ...values, restaurant_id: editing }));
        } else {
            dispatch(addRestaurant(values));
        }
    };

    useEffect(() => {
        if (success) {
            setShow(false);
            setTimeout(() => {
                dispatch(clearSuccess());
            }, 5000);
        }
    }, [success]);

    return (
        <div>
            <div className="management-header mb-5">
                <h1>Restaurant Management</h1>
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
            {restaurants.length > 0 &&
                restaurants.map((r) => (
                    <RestaurantCard
                        editRestaurant={editRestaurant}
                        r={r}
                        key={r.restaurant_id}
                        handleCheckboxChange={handleCheckboxChange}
                    />
                ))}
            <Modal show={show} onHide={handleCloseEditing}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {editing ? "Edit Restaurant's Info" : 'Add A Restaurant'}
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
                                        name: editing
                                            ? restaurants.filter(
                                                  (r) => r.restaurant_id === editing
                                              )[0]?.name
                                            : '',
                                        cuisine_type: editing
                                            ? restaurants.filter(
                                                  (r) => r.restaurant_id === editing
                                              )[0]?.cuisine_type || ''
                                            : '',
                                        description: editing
                                            ? restaurants.filter(
                                                  (r) => r.restaurant_id === editing
                                              )[0]?.description || ''
                                            : '',
                                        phone_number: editing
                                            ? restaurants.filter(
                                                  (r) => r.restaurant_id === editing
                                              )[0]?.phone_number || ''
                                            : '',
                                        website: editing
                                            ? restaurants.filter(
                                                  (r) => r.restaurant_id === editing
                                              )[0]?.website || ''
                                            : ''
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
                                                        Name
                                                    </Form.Label>
                                                    <Col sm="8">
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Name"
                                                            name="name"
                                                            value={values.name}
                                                            onChange={handleChange}
                                                            isInvalid={
                                                                touched.name && errors.name
                                                                    ? true
                                                                    : false
                                                            }
                                                        />
                                                        <Form.Control.Feedback type="invalid">
                                                            {errors.name}
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
                                                        Cuisine Type
                                                    </Form.Label>
                                                    <Col sm="8">
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Cuisine Type"
                                                            name="cuisine_type"
                                                            value={values.cuisine_type}
                                                            onChange={handleChange}
                                                            isInvalid={
                                                                touched.cuisine_type &&
                                                                errors.cuisine_type
                                                                    ? true
                                                                    : false
                                                            }
                                                        />
                                                        <Form.Control.Feedback type="invalid">
                                                            {errors.cuisine_type}
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
                                                        Phone Number
                                                    </Form.Label>
                                                    <Col sm="8">
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Phone Number"
                                                            name="phone_number"
                                                            value={values.phone_number}
                                                            onChange={handleChange}
                                                            isInvalid={
                                                                touched.phone_number &&
                                                                errors.phone_number
                                                                    ? true
                                                                    : false
                                                            }
                                                        />
                                                        <Form.Control.Feedback type="invalid">
                                                            {errors.phone_number}
                                                        </Form.Control.Feedback>
                                                    </Col>
                                                </Form.Group>
                                            </Row>
                                            <Row className="mb-3">
                                                <Form.Group
                                                    as={Row}
                                                    md="12"
                                                    controlId="validationFormik06"
                                                >
                                                    <Form.Label column sm="4">
                                                        WebSite
                                                    </Form.Label>
                                                    <Col sm="8">
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Web Site URL"
                                                            name="website"
                                                            value={values.website}
                                                            onChange={handleChange}
                                                            isInvalid={
                                                                touched.website && errors.website
                                                                    ? true
                                                                    : false
                                                            }
                                                        />
                                                        <Form.Control.Feedback type="invalid">
                                                            {errors.website}
                                                        </Form.Control.Feedback>
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
                                                        name="description"
                                                        value={values.description}
                                                        onChange={handleChange}
                                                        isInvalid={
                                                            touched.description &&
                                                            !!errors.description
                                                        }
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        {errors.description}
                                                    </Form.Control.Feedback>
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

export default RestaurantTab;
