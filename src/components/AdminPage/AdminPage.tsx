import Sidebar from './Sidebar';
// import { useAppSelector } from '../../store/hooks';
// import { RootState } from '../../store/store';
import { Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import ProfileTab from '../UserPage/ProfileTab';
import CustomersTab from './CustomersTab';
import RestaurantTab from './RestaurantTab';

const AdminPage = () => {
    // const user = useAppSelector((state: RootState) => state.auth.user);
    const [activeTab, setActiveTab] = useState('profile');
    return (
        <>
            <Header />
            <Row>
                <Col md={12} lg={3} style={{ display: 'flex', alignItems: 'center' }}>
                    <Sidebar expand="lg" activeTab={activeTab} setSidebarActiveTab={setActiveTab} />
                </Col>
                <Col md={12} lg={9}>
                    <div className="proper-min-height p-5">
                        {activeTab === 'profile' && <ProfileTab />}
                        {activeTab === 'customers' && <CustomersTab />}
                        {activeTab === 'restaurant' && <RestaurantTab />}
                    </div>
                </Col>
            </Row>
            <Footer />
        </>
    );
};

export default AdminPage;
