import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../static/images/glitch-logo.webp';

function FooterLayout() {
    return (
        <div className="container">
            <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                {/* Logo */}
                <p className="col-md-4 mb-0 text-muted">
                    <Link to="/flask/static"
                          className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
                        <img src={logo} height="50" width="auto" alt="GLITCH-logo"/>
                    </Link>
                </p>

                {/* Copyright */}
                <Link
                    to="/flask/static"
                    className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-auto me-md-auto link-dark text-decoration-none"
                >
                    © {new Date().getFullYear()} GLITCH, Inc
                </Link>

                {/* Navigatie */}
                <ul className="nav col-md-4 justify-content-end">
                    <li className="nav-item">
                        <Link to="/home" className="nav-link px-2 text-muted">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/features" className="nav-link px-2 text-muted">Features</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/pricing" className="nav-link px-2 text-muted">Pricing</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/faqs" className="nav-link px-2 text-muted">FAQs</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/about" className="nav-link px-2 text-muted">About</Link>
                    </li>
                </ul>
            </footer>
        </div>
    );
}

export default FooterLayout;
