import * as React from 'react';
import { Link } from 'gatsby';
import Nav from '../Nav/Nav';
import PropTypes from 'prop-types';
import { layoutStyles, pageStyles, header } from './layout.module.css';
import '@fontsource/poppins/500.css'; // Weight 500.
import '@fontsource/poppins/900.css'; // Loads the italic variant.

const Layout = ({ pageTitle, children }) => {
    return (
        <main className={layoutStyles}>
            <title>{pageTitle}</title>
            <Nav />
            <div className={pageStyles}>
                <h1 className={header}>{pageTitle}</h1>
                <div className="ml w-8 border-b-2 border-gray-800"></div>
                {children}
            </div>
        </main>
    );
};

Layout.propTypes = {
    pageTitle: PropTypes.string,
    children: PropTypes.node,
};

export default Layout;
