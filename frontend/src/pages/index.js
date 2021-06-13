import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/layout';
import Display from '../components/Display/Display';
import Upload from '../components/Upload/Upload';

import { codeStyles } from '../components/Layout/layout.module.css';
import { StaticImage } from 'gatsby-plugin-image';
import { upload, getFiles } from '../utils/http';

// markup
const IndexPage = () => {
    const [image, setImage] = useState({
        progress: 0,
        file: null,
        message: '',
        fileData: [],
        selection: null,
    });

    const handleSelect = (e) => {
        setImage({
            ...image,
            selection: e.target.files,
        });
    };
    const handleDirectory = () => {};

    const handleUpload = () => {
        alert('Hello!');
        let currentFile = image.selecton && image.selection[0];

        setImage({
            ...image,
            progress: 0,
            file: currentFile,
        });

        upload(currentFile, (event) => {
            setImage({
                ...image,
                progress: Math.round((100 * event.loaded) / event.total),
            });
        })
            .then((response) => {
                setImage({
                    ...image,
                    message: response.data.message,
                });
                return getFiles();
            })
            .then((files) => {
                setImage({
                    ...image,
                    fileData: files.data,
                });
            })
            .catch(() => {
                setImage({
                    ...image,
                    progress: 0,
                    message: 'Could not upload the file!',
                    file: undefined,
                });
            });

        setImage({
            ...image,
            selection: null,
        });

        console.log(image);
    };

    useEffect(() => {
        // getFiles().then((response) => {
        //     setImage({
        //         ...image,
        //         fileData: response.data,
        //     });
        // });
    }, []);

    return (
        <Layout pageTitle="home">
            <p className="text-gray-500 mt-2 mb-9">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <div className="flex items-center justify-center">
                <StaticImage
                    src="https://64.media.tumblr.com/df07a61f29d31be44c6f83a6150ba58a/2ed136e6c9887a0f-2c/s250x400/3a68f9be637f7766544d67dcb30e77d9258abd7c.png"
                    alt="Wolf emoji"
                    className="w-8 h-8 mr-3"
                />
                <h1 className={codeStyles}>determine a percentage!</h1>
            </div>
            <div className="flex flex-col items-center justify-center">
                <Display />
                <div className="my-3" disabled={!image.selection}>
                    <Upload handleClick={handleUpload} />
                    <input type="file" />
                    <Upload handleClick={handleDirectory} />
                </div>
            </div>
            <div>
                {image.file && (
                    <div className="progress">
                        <div
                            className="progress-bar progress-bar-info progress-bar-striped"
                            role="progressbar"
                            aria-valuenow={image.progress}
                            aria-valuemin="0"
                            aria-valuemax="100"
                            style={{ width: image.progress + '%' }}
                        >
                            {image.progress}%
                        </div>
                    </div>
                )}
            </div>
            <div className="card">
                <div className="card-header">List of Files</div>
                <ul className="list-group list-group-flush">
                    {image.fileData &&
                        image.fileData.map((file, index) => (
                            <li className="list-group-item" key={index}>
                                <a href={file.url}>{file.name}</a>
                            </li>
                        ))}
                </ul>
            </div>
            <p>Why?</p>
        </Layout>
    );
};

export default IndexPage;
