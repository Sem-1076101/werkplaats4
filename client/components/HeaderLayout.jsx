import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../static/images/glitch-logo.webp';
import theme_switch from '../static/images/circle-half-stroke-solid.svg';
import '../static/css/header.css';
function HeaderLayout() {
    return (
        <div className="container">
            <header
                className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                <Link to="/"
                      className="col-md-3 d-flex align-items-center mb-2 mb-md-0 text-dark text-decoration-none">
                    <img src={logo} height="50" width="auto" alt="GLITCH-logo"/>
                </Link>

                <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                </ul>

                <div className="col-md-9 text-end">
                    <Link className="btn btn-outline-primary login-button me-1" to="/login" role="button">Inloggen</Link>
                    <Link className="btn btn-primary register-button me-2" to="/register"
                          role="button">Registreren</Link>
                    <button className="btn btn-primary" id="btnSwitch">
                        <img src={theme_switch} width="20px" height="20px"
                             alt="Icon"/>
                    </button>
                </div>
            </header>
        </div>
    );
}

export default HeaderLayout;
