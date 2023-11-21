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
                        <span>list some details/benefits here</span>
                        <span>list some details/benefits here</span>
                        <span>list some details/benefits here</span>
                        <span>list some details/benefits here</span>
                        <span>list some details/benefits here</span>
                    </div>
                    <div className="d-flex flex-column justify-content-center align-items-center border border-2 p-4">
                        <h2 className="m-2 text-center">Subscription Fees</h2>
                        <span>list some details/benefits here</span>
                        <span>list some details/benefits here</span>
                        <span>list some details/benefits here</span>
                        <span>list some details/benefits here</span>
                        <span>list some details/benefits here</span>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default SubscriptionPage;
