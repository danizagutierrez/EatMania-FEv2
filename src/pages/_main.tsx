import { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './home';
import Sign from './sign';
import Search from './search';
import User from './user';
import Admin from './admin';
import ContactUs from './contactus';
import Subscription from './subscription';
import UserRoute from '../components/routing/UserRoute';
import AdminRoute from '../components/routing/AdminRoute';
import PublicRoute from '../components/routing/PublicRoute';
import AboutUs from './aboutus';
import Faq from './faq';

const Main = () => (
    <BrowserRouter>
        <Suspense fallback={<div />}>
            <Routes>
                <Route
                    path="/*"
                    element={
                        <div
                            style={{
                                height: '100vh',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column'
                            }}
                        >
                            <h2>Page Not Found</h2>
                            <h1>404</h1>
                            <Link to="/">Go Home</Link>
                        </div>
                    }
                />

                <Route path="/" element={<Home />} />
                <Route
                    path="/sign"
                    element={
                        <PublicRoute>
                            <Sign />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/user"
                    element={
                        <UserRoute>
                            <User />
                        </UserRoute>
                    }
                />
                <Route
                    path="/admin"
                    element={
                        <AdminRoute>
                            <Admin />
                        </AdminRoute>
                    }
                />
                <Route path="/search" element={<Search />} />
                <Route path="/subscription" element={<Subscription />} />
                <Route path="/contactus" element={<ContactUs />} />
                <Route path="/aboutus" element={<AboutUs />} />
                <Route path="/faq" element={<Faq />} />
            </Routes>
        </Suspense>
    </BrowserRouter>
);

export default Main;
