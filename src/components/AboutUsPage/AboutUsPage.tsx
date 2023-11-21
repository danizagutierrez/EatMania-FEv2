import { Image } from 'react-bootstrap';
import Footer from '../Footer';
import Header from '../Header';

const AboutUsPage = () => {
    return (
        <>
            <Header />
            <section className="about-us-page mt-5 mb-5">
                <h1 className="text-center ">About Us</h1>
                <div className="member-list">
                    <div className="member">
                        <h2 className="text-center mb-4">CEO</h2>
                        <div className="member-details">
                            <Image
                                src="/images/client2.jpg"
                                alt="ceo"
                                rounded
                                className="member-image"
                            />
                            <span className="member-info">
                                List some details/benefits here
                                <br />
                                List some details/benefits here
                                <br />
                                List some details/benefits here
                                <br />
                                List some details/benefits here
                                <br />
                            </span>
                        </div>
                    </div>
                    <div className="member">
                        <h2 className="text-center mb-4">Junior Developer</h2>
                        <div className="member-details">
                            <Image
                                src="/images/client2.jpg"
                                alt="ceo"
                                rounded
                                className="member-image"
                            />
                            <span className="member-info">
                                List some details/benefits here
                                <br />
                                List some details/benefits here
                                <br />
                                List some details/benefits here
                                <br />
                                List some details/benefits here
                                <br />
                            </span>
                        </div>
                    </div>
                    <div className="member">
                        <h2 className="text-center mb-4">Project Manager</h2>
                        <div className="member-details">
                            <Image
                                src="/images/client2.jpg"
                                alt="ceo"
                                rounded
                                className="member-image"
                            />
                            <span className="member-info">
                                List some details/benefits here
                                <br />
                                List some details/benefits here
                                <br />
                                List some details/benefits here
                                <br />
                                List some details/benefits here
                                <br />
                            </span>
                        </div>
                    </div>

                    <div className="member">
                        <h2 className="text-center mb-4">Senior Developer</h2>
                        <div className="member-details">
                            <Image
                                src="/images/client2.jpg"
                                alt="ceo"
                                rounded
                                className="member-image"
                            />
                            <span className="member-info">
                                List some details/benefits here
                                <br />
                                List some details/benefits here
                                <br />
                                List some details/benefits here
                                <br />
                                List some details/benefits here
                                <br />
                            </span>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default AboutUsPage;
