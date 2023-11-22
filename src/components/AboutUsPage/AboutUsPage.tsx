import { Image } from 'react-bootstrap';
import Footer from '../Footer';
import Header from '../Header';

const AboutUsPage = () => {
    return (
        <>
            <Header />


            <footer className="aboutUsHeader_section">
            <div className="container">
                <div className="row">
                    
                    </div>
                    <div className="-md-4 footer-ccolol">
                        <div className="footer_detail">
                           
                            
                            <p id="aboutUsHeader">
                            Welcome to the EatMania, where choosing your next delicious meal has never been easier! In a world filled with countless food options spread across various platforms
                             we've created a centralized and user-friendly solution. Our platform empowers you to effortlessly compare and order meals from a diverse range of restaurants with 
                             different third-party Delivery partners, all in one place. Say goodbye to menu overload and enjoy a simpler way to discover and savor great food online with us.

                            </p>
                        
                        </div>
                    </div>
                    
                </div>
                
           
        </footer>



            <section className="about-us-page mt-5 mb-5">
                <h1 className="text-center ">About Us</h1>
                <div className="member-list">
                    <div className="member">
                        <h2 className="text-center mb-4">CEO</h2>
                        <div className="member-details">
                            <Image
                                src="/images/client1.jpg"
                                alt="ceo"
                                rounded
                                className="member-image"
                            />
                            <span className="member-info">
                                Komal Kamboj
                                <br />
                                Software Engineer / Entrepreneur
                                <br />
                                Vancouver Canada
                                <br />
                                Komal@gmail.com
                                <br />
                            </span>
                        </div>
                    </div>
                    <div className="member">
                        <h2 className="text-center mb-4">Junior Developer</h2>
                        <div className="member-details">
                            <Image
                                src="/images/client1.jpg"
                                alt="ceo"
                                rounded
                                className="member-image"
                            />
                            <span className="member-info">
                                Evelyn Yang
                                <br />
                                BackEnd Software Developer
                                <br />
                                Vancouver Canada
                                <br />
                                yang@gmail.com
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
                                Awais Sadaqat
                                <br />
                                Business Developer
                                <br />
                                Vancouver Canada
                                <br />
                                Awais@gmail.com
                                <br />
                            </span>
                        </div>
                    </div>

                    <div className="member">
                        <h2 className="text-center mb-4">Senior Developer</h2>
                        <div className="member-details">
                            <Image
                                src="/images/client1.jpg"
                                alt="ceo"
                                rounded
                                className="member-image"
                            />
                            <span className="member-info">
                                Daniza Gutierrez Guisao
                                <br />
                                Senior Backend Developer
                                <br />
                                Surrey Canada
                                <br />
                                dani@gmail.com
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
