import { FC } from 'react';
// import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';

interface SidebarProps {
    expand: string;
    setSidebarActiveTab: (key: string) => void;
    activeTab: string;
}

const Sidebar: FC<SidebarProps> = ({ expand, setSidebarActiveTab, activeTab }) => {
    return (
        <Navbar expand={expand} className="bg-body-tertiary custom-sidebar">
            <Container fluid>
                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-${expand}`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                    placement="end"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                            Offcanvas
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav
                            fill
                            activeKey={activeTab}
                            onSelect={(selectKey) => {
                                if (selectKey !== null) {
                                    setSidebarActiveTab(selectKey);
                                }
                            }}
                            className="flex-column justify-content-end flex-grow-1 pe-3"
                        >
                            <Nav.Link eventKey="profile">Profile</Nav.Link>
                            <Nav.Link eventKey="subscription">Subscription</Nav.Link>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
};

export default Sidebar;
