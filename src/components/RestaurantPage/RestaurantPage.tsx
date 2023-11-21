import { Button, Modal, Col, Row, Form, Container, ButtonGroup } from 'react-bootstrap';
import * as formik from 'formik';
import * as yup from 'yup';
import { useParams } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { RootState } from '../../store/store';
import { FoodCard } from './FoodCard';
import { deleteFoods, addFood, updateFood } from '../../store/slices/food';
import axios from 'axios';
import { toast } from 'react-toastify';

const RestaurantPage = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state: RootState) => state.auth.user);
    const foods = useAppSelector((state: RootState) => state.food.foods);
    const params = useParams();
    const { id } = params;
    const [show, setShow] = useState(false);
    const [editing, setEditing] = useState<number | null>(null);
    const [selectedFoods, setSelectedFoods] = useState<number[]>([]);
    const [thisFoods, setThisFoods] = useState<any[]>([]);

    useEffect(() => {
        if (id && foods) {
            setThisFoods(foods.filter((f) => f.restaurant.restaurantId === Number(id)));
        }
    }, [id, foods]);

    const handleShow = () => {
        setEditing(null);
        setShow(true);
    };
    const editFood = (value?: number) => {
        if (value) {
            setEditing(value);
            setShow(true);
        }
    };

    const handleCheckboxChange = (checked: boolean, value: string | number) => {
        if (checked) {
            setSelectedFoods((prevList) => [...prevList, Number(value)]); // Add value to the selected list
        } else {
            setSelectedFoods((prevList) => prevList.filter((item) => item !== Number(value))); // Remove value from the selected list
        }
    };
    const handleDelete = async () => {
        if (selectedFoods.length) {
            for (let i = 0; i < selectedFoods.length; i++) {
                try {
                    await axios.delete(
                        process.env.REACT_APP_API_URL +
                            '/api/admin/restaurants/' +
                            id +
                            '/fooditem/' +
                            selectedFoods[i]
                    );
                } catch (error) {
                    console.log('API Error: ', error);
                    throw error;
                }
            }
            toast.success('Deleted Successfully!');
            dispatch(deleteFoods(selectedFoods));
            setSelectedFoods([]);
        }
    };

    const { Formik } = formik;
    const schema = yup.object().shape({
        foodName: yup.string().required("Please Enter Food's Name"),
        description: yup.string().required('Please Enter Description'),
        foodPrice: yup
            .number()
            .typeError('Please enter proper value')
            .required('Please Enter Food Price')
    });

    const handleSubmitCustomer = (values: any) => {
        if (editing) {
            axios
                .put(
                    process.env.REACT_APP_API_URL +
                        '/api/admin/restaurants/' +
                        id +
                        '/fooditem/' +
                        editing,
                    {
                        foodName: values.foodName,
                        foodPrice: values.foodPrice,
                        description: values.description,
                        adminID: user.user_id
                    }
                )
                .then((res) => {
                    if (res.data) {
                        dispatch(updateFood(res.data));
                        toast.success('Updated Successfully!');
                        setShow(false);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            axios
                .post(
                    process.env.REACT_APP_API_URL + '/api/admin/restaurants/' + id + '/fooditem',
                    {
                        foodName: values.foodName,
                        foodPrice: values.foodPrice,
                        description: values.description,
                        adminID: user.user_id
                    }
                )
                .then((res) => {
                    dispatch(addFood(res.data));
                    setShow(false);
                    toast.success('Added Successfully!');
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };
    const handleCloseEditing = () => setShow(false);
    return (
        <>
            <Header />
            <section className="proper-min-height mt-2 mb-4 offer_section">
                <Container>
                    <div
                        className="management-header mb-3"
                        style={{ justifyContent: 'center', position: 'relative' }}
                    >
                        <h1>Menu Management</h1>
                        <ButtonGroup style={{ position: 'absolute', right: '0px' }}>
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
                    <Row>
                        {foods.length > 0 &&
                            thisFoods.map((r) => (
                                <Col sm={12} md={6} key={r.foodId} style={{ marginBottom: '20px' }}>
                                    <FoodCard
                                        handleCheckboxChange={handleCheckboxChange}
                                        editFood={editFood}
                                        food={r}
                                    />
                                </Col>
                            ))}
                    </Row>
                </Container>
            </section>
            <Modal show={show} onHide={handleCloseEditing}>
                <Modal.Header closeButton>
                    <Modal.Title>{editing ? "Edit Food's Info" : 'Add A Food'}</Modal.Title>
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
                                        foodName: editing
                                            ? foods.filter((r) => r.foodId === editing)[0]?.foodName
                                            : '',
                                        description: editing
                                            ? foods.filter((r) => r.foodId === editing)[0]
                                                  ?.description || ''
                                            : '',
                                        foodPrice: editing
                                            ? foods.filter((r) => r.foodId === editing)[0]
                                                  ?.foodPrice || ''
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
                                                            name="foodName"
                                                            value={values.foodName}
                                                            onChange={handleChange}
                                                            isInvalid={
                                                                touched.foodName && errors.foodName
                                                                    ? true
                                                                    : false
                                                            }
                                                        />
                                                        <Form.Control.Feedback type="invalid">
                                                            {errors.foodName}
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
                                                        Price
                                                    </Form.Label>
                                                    <Col sm="8">
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Price"
                                                            name="foodPrice"
                                                            value={values.foodPrice}
                                                            onChange={handleChange}
                                                            isInvalid={
                                                                touched.foodPrice &&
                                                                errors.foodPrice
                                                                    ? true
                                                                    : false
                                                            }
                                                        />
                                                        <Form.Control.Feedback type="invalid">
                                                            {errors.foodPrice}
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
            <Footer />
        </>
    );
};

export default RestaurantPage;
