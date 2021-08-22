import React, { useEffect, useState } from 'react';
import { Link } from 'gatsby';
import Nav from '../Nav/Nav';
import PropTypes from 'prop-types';
import { layoutStyles, pageStyles, header } from './layout.module.css';
import '@fontsource/poppins/500.css'; // Weight 500.
import '@fontsource/poppins/900.css'; // Loads the italic variant.

// import { withAuthenticator } from 'aws-amplify-react';
import { Auth } from 'aws-amplify';
import { navigate } from 'gatsby';
import Loading from '../Auth/Loading';

const Layout = ({ pageTitle, children }) => {
    const [auth, setAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    const redirectAuth = () => {
        console.log('Redirecting to login...');
        navigate('/enter');
    };

    useEffect(async () => {
        try {
            const { attributes } = await Auth.currentAuthenticatedUser({
                bypassCache: false,
            });
            console.log(attributes);

            setAuth(true);
            setLoading(false);
        } catch (err) {
            console.log('[ERR]: ' + err);
            setLoading(false);
        }
    }, []);

    if (loading) return <Loading />;
    if (auth)
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
    redirectAuth();
    return <Loading />;
};

Layout.propTypes = {
    pageTitle: PropTypes.string,
    children: PropTypes.node,
};

export default Layout;
