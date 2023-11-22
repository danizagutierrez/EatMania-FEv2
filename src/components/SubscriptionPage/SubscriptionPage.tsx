import Header from '../Header';
import Footer from '../Footer';

const SubscriptionPage = () => {
    return (
        <div>
            <Header />
            <section className="proper-min-height">
                <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Subscription Page</h1>
                <div className="subscription-container mb-3">
                    <div className="d-flex flex-column justify-content-center align-items-center border border-2 p-4">
                        <h2 className="m-2 text-center">Free Trial</h2>
                        <span>We're excited to announce that, as a new startup, we've decided to provide our services free of charge to our users.<br></br> 
                            This approach is part of our commitment to making our platform accessible to as many people as possible. <br></br>
                            By offering our services for free, we aim to attract a wide audience, gather valuable feedback, <br></br> 
                            and establish a strong presence in the market. As we grow and gain momentum, we'll explore different monetization models <br></br> 
                            and potentially introduce premium features.Our focus is on creating a positive user experience and <br></br> building lasting relationships with our community.
                            <br></br> We appreciate the support as we embark on this journey, and we're eager to evolve and enhance our offerings in the future</span>
                        
                    </div>
                    <br></br>
                    <br></br>
                 
                </div>
                <div className="subscription-container mb-3">
                <div className="d-flex flex-column justify-content-center align-items-center border border-2 p-4">
                        <h2 className="m-2 text-center">Subscription Fees</h2>
                        <span>As a new startup, we're excited to provide our services for free during the initial six months as part of our free trial offer.<br></br>
                         This enables us to introduce our platform to a wide audience and gather valuable feedback.<br></br>
                          Following this period, we plan to implement a nominal fee to sustain and expand our services, offering an even larger variety of options to our users.<br></br>
                           We believe this approach will contribute to the continued growth and enhancement of our platform. <br></br>
                           We appreciate the support of our community and look forward to evolving together in the coming months</span>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default SubscriptionPage;
