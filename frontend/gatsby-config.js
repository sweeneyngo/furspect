module.exports = {
    siteMetadata: {
        title: 'furspect',
    },
    flags: { PRESERVE_WEBPACK_CACHE: true },
    plugins: [
        'gatsby-plugin-gatsby-cloud',
        'gatsby-plugin-postcss',
        'gatsby-plugin-gatsby-cloud',
        'gatsby-plugin-image',
        'gatsby-plugin-sharp',
        'gatsby-plugin-fontawesome-css',
        {
            resolve: 'gatsby-plugin-eslint',
            options: {
                test: /\.js$|\.jsx$|\.ts$|\.tsx$/,
                exclude: /(node_modules|.cache|public)/,
                stages: ['develop'],
                options: {
                    emitWarning: true,
                    failOnError: false,
                },
            },
        },
    ],
};
