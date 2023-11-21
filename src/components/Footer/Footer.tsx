import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Footer = () => {
    return (
        <footer className="footer_section">
            <div className="container">
                <div className="row">
                    <div className="col-md-4 footer-col">
                        <div className="footer_contact">
                            <h4>Contact Us</h4>
                            <div className="contact_link_box">
                                <a href="">
                                    <i className="fa fa-map-marker" aria-hidden="true"></i>
                                    <span>Location</span>
                                </a>
                                <a href="">
                                    <i className="fa fa-phone" aria-hidden="true"></i>
                                    <span>Call +01 1234567890</span>
                                </a>
                                <a href="">
                                    <i className="fa fa-envelope" aria-hidden="true"></i>
                                    <span>demo@gmail.com</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 footer-col">
                        <div className="footer_detail">
                            <a href="" className="footer-logo">
                                Eat Mania
                            </a>
                            <p>
                                Necessary, making this the first true generator on the Internet. It
                                uses a dictionary of over 200 Latin words, combined with
                            </p>
                            <div className="footer_social">
                                <a href="">
                                    <FontAwesomeIcon icon={['fab', 'facebook']} />
                                </a>
                                <a href="">
                                    <FontAwesomeIcon icon={['fab', 'twitter']} />
                                </a>
                                <a href="">
                                    <FontAwesomeIcon icon={['fab', 'linkedin-in']} />
                                </a>
                                <a href="">
                                    <FontAwesomeIcon icon={['fab', 'instagram']} />
                                </a>
                                <a href="">
                                    <FontAwesomeIcon icon={['fab', 'pinterest']} />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 footer-col">
                        <h4>Opening Hours</h4>
                        <p>Everyday</p>
                        <p>10.00 Am -10.00 Pm</p>
                    </div>
                </div>
                <div className="footer-info">
                    <p>
                        &copy; <span id="displayYear"></span> All Rights Reserved By&nbsp;{' '}
                        <a href="https://html.design/">Free Html Templates</a>
                        <br />
                        <br />
                        &copy; <span id="displayYear"></span> Distributed By&nbsp;{' '}
                        <a href="https://themewagon.com/" target="_blank">
                            ThemeWagon
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
