import * as React from 'react';
import { Link } from 'gatsby';
import Nav from '../Nav/Nav';
import PropTypes from 'prop-types';
import { layoutStyles, pageStyles, header } from './layout.module.css';

const Layout = ({ pageTitle, children }) => {
    return (
        <main className={layoutStyles}>
            <title>{pageTitle}</title>
            <Nav />
            <div className={pageStyles}>
                <h1 className={header}>🎉 {pageTitle}</h1>
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
