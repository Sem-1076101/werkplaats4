import React from 'react';
import {Helmet} from 'react-helmet';
import HeaderLayout from './HeaderLayout';
import FooterLayout from './FooterLayout';
import '../static/css/base.css';

function BaseLayout({children}) {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <title>GLITCH</title>
                <link
                    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
                    rel="stylesheet"
                    integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
                    crossOrigin="anonymous"
                />
            </Helmet>
            <HeaderLayout/>
            <div className="container">
                {children}
            </div>
            <FooterLayout/>
            <script
                src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
                integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
                crossOrigin="anonymous"
            ></script>
            <script src="/static/javascript/base.js"></script>
        </div>
    );
}

export default BaseLayout;
