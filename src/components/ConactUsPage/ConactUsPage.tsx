import Footer from '../Footer';
import Header from '../Header';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import * as formik from 'formik';
import * as yup from 'yup';

const ConactUsPage = () => {
    const { Formik } = formik;

    const schema = yup.object().shape({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        email: yup.string().email().required(),
        content: yup.string().required()
    });

    // const onSubmit = (values: { firstName: string; lastName: string; email: string; content: string; }) => {
    //     console.log(values);
    // };

    return (
        <>
            <Header />
            <section className="proper-min-height pt-5 pb-5 pe-3 ps-3 d-flex justify-content-center">
                <div style={{ maxWidth: '700px' }}>
                    <h1 className="text-center">Contact Us</h1>
                    <p className="text-center">Need to get in touch with us?</p>
                    <Formik
                        validationSchema={schema}
                        onSubmit={(values) => {
                            console.log(values);
                        }}
                        initialValues={{
                            firstName: '',
                            lastName: '',
                            email: '',
                            content: ''
                        }}
                    >
                        {({ handleSubmit, handleChange, values, touched, errors }) => (
                            <Form
                                className="rounded-4 border border-2 pt-3 pb-3 pe-5 ps-5"
                                noValidate
                                onSubmit={handleSubmit}
                            >
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="6" controlId="validationFormik01">
                                        <Form.Label>First name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="firstName"
                                            value={values.firstName}
                                            onChange={handleChange}
                                            isValid={touched.firstName && !errors.firstName}
                                            isInvalid={!!errors.firstName}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.firstName}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group as={Col} md="6" controlId="validationFormik02">
                                        <Form.Label>Last name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="lastName"
                                            value={values.lastName}
                                            onChange={handleChange}
                                            isInvalid={!!errors.lastName}
                                            isValid={touched.lastName && !errors.lastName}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.lastName}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="12" controlId="validationFormik03">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder=""
                                            name="email"
                                            value={values.email}
                                            onChange={handleChange}
                                            isInvalid={!!errors.email}
                                        />

                                        <Form.Control.Feedback type="invalid">
                                            {errors.email}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} md="12" controlId="validationFormik03">
                                        <Form.Label>What can we help you with</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            placeholder=""
                                            name="content"
                                            value={values.content}
                                            onChange={handleChange}
                                            isInvalid={!!errors.content}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.content}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Row>
                                <Button variant="outline-success" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default ConactUsPage;
