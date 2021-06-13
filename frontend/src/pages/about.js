import * as React from 'react';
import Layout from '../components/Layout/layout';
import {
    pageStyles,
    headingStyles,
    headingAccentStyles,
    paragraphStyles,
    codeStyles,
} from '../components/Layout/layout.module.css';

// markup
const AboutPage = () => {
    return (
        <Layout pageTitle="about">
            <h1 className={headingStyles}>
                Congratulations
                <br />
            </h1>
            <h1>Welcome to my Gatsby site!</h1>
            <p>I&apos;m making this by following the Gatsby Tutorial.</p>
        </Layout>
    );
};

export default AboutPage;
