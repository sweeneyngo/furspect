import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/layout';
import Display from '../components/Display/Display';
import Upload from '../components/Upload/Upload';
import Inspect from '../components/Inspect/Inspect';
import axios from 'axios';
import FormData from 'form-data';
import {
    codeStyles,
    inputStyles,
    fileStyles,
    header,
    circularChart,
    circleBg,
    circle,
    percentage,
} from '../components/Layout/layout.module.css';
// import { StaticImage } from 'gatsby-plugin-image';
// import { upload, getFiles } from '../utils/http';

// markup
const IndexPage = () => {
    const [image, setImage] = useState({
        progress: 0,
        file: null,
        message: '',
        fileData: [],
        selection: null,
        url: '',
        width: 0,
        height: 0,
    });
    const [accuracy, setAccuracy] = useState(0.0);

    const readFile = (input) => {
        if (input.target.files && input.target.files[0]) {
            if (image.selection) URL.revokeObjectURL(image.selection);
            // console.log(input.target.files);

            const reader = new FileReader();
            reader.onloadend = (e) => {
                let img = new Image();
                img.src = reader.result;

                img.onload = () => {
                    setImage({
                        ...image,
                        width: img.width,
                        height: img.height,
                        selection: input.target.files[0],
                        url: URL.createObjectURL(input.target.files[0]),
                    });
                };
            };
            reader.readAsDataURL(input.target.files[0]);
        }
    };
    const handleInspect = () => {
        // console.log(getFiles());
        if (image.selection === null) {
            alert('No image found. Aborting.');
            return;
        }

        let data = new FormData();
        data.append('file', image.selection, image.selection.name);

        const config = {
            method: 'post',
            url: 'http://127.0.0.1:5000/inspect',
            data: data,
            headers: {
                'User-Agent': 'Axios - console app',
                'Access-Control-Allow-Origin': 'http://127.0.0.1:5000',
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
            },
        };
        axios(config)
            .then((resp) => {
                console.log(resp);
                console.log(resp.data);

                if (resp.status === 200)
                    setAccuracy(Number(1.0 - resp.data.data[0]) * 100);
                return resp.data;
            })
            .catch((error) => console.log(error));

        // alert('Hello!');
        // let currentFile = image.selecton && image.selection[0];

        // setImage({
        //     ...image,
        //     progress: 0,
        //     file: currentFile,
        // });

        // upload(currentFile, (event) => {
        //     setImage({
        //         ...image,
        //         progress: Math.round((100 * event.loaded) / event.total),
        //     });
        // })
        //     .then((response) => {
        //         setImage({
        //             ...image,
        //             message: response.data.message,
        //         });
        //         return getFiles();
        //     })
        //     .then((files) => {
        //         setImage({
        //             ...image,
        //             fileData: files.data,
        //         });
        //     })
        //     .catch(() => {
        //         setImage({
        //             ...image,
        //             progress: 0,
        //             message: 'Could not upload the file!',
        //             file: undefined,
        //         });
        //     });

        // setImage({
        //     ...image,
        //     selection: null,
        // });
    };

    useEffect(() => {
        console.log(image);
    }, [image]);

    return (
        <Layout pageTitle="home">
            <p className="text-gray-500 mt-2 mb-14">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            {/* <div className="flex items-center justify-center">
                <StaticImage
                    src="https://64.media.tumblr.com/df07a61f29d31be44c6f83a6150ba58a/2ed136e6c9887a0f-2c/s250x400/3a68f9be637f7766544d67dcb30e77d9258abd7c.png"
                    alt="Wolf emoji"
                    className="w-8 h-8 mr-3"
                />
                <h1 className={codeStyles}>determine a percentage!</h1>
            </div> */}
            <div className="grid grid-cols-3 items-center">
                <div
                    className="my-3 h-72 flex-col flex items-center justify-center"
                    disabled={!image.selection}
                >
                    <label htmlFor="file-upload">
                        <Upload />
                    </label>
                    <div className="w-24 mb-5">
                        <p className="text-gray-400 text-xs mt-1 truncate">
                            {image.selection && image.selection.name}
                        </p>
                    </div>
                    <input
                        id="file-upload"
                        className={inputStyles}
                        type="file"
                        onChange={readFile}
                    />
                    <div onClick={handleInspect}>
                        <Inspect />
                    </div>
                </div>
                <div className="flex justify-center items-center">
                    <Display
                        file={image.selection}
                        url={image.url}
                        width={image.width}
                        height={image.height}
                    />
                </div>
                <div className="flex justify-center items-center text-white">
                    <div className="flex flex-nowrap">
                        <div className="justify-around bg-white">
                            <svg
                                viewBox="0 0 36 36"
                                style={{ stroke: '#ff9f00' }}
                                className={circularChart}
                            >
                                <path
                                    className={circleBg}
                                    d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                                <path
                                    className={circle}
                                    strokeDasharray={`${accuracy}, 100`}
                                    d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                                <text
                                    x={
                                        accuracy.toFixed(0) >= 10
                                            ? '13.5'
                                            : '15'
                                    }
                                    y="20.35"
                                    className={percentage}
                                >
                                    {accuracy
                                        .toFixed(2)
                                        .slice(
                                            0,
                                            accuracy.toFixed(2).indexOf('.')
                                        )}
                                </text>
                                <text
                                    x={accuracy.toFixed(0) >= 10 ? '19' : '17'}
                                    y="20.35"
                                    style={{
                                        stroke: 'none',
                                        fontSize: '0.25rem',
                                        fill: 'rgba(156, 163, 175, 1)',
                                    }}
                                >
                                    {accuracy
                                        .toFixed(2)
                                        .slice(
                                            accuracy.toFixed(2).indexOf('.')
                                        )}
                                    %
                                </text>
                            </svg>
                        </div>
                    </div>

                    {/* <p className="text-9xl">0%</p> */}
                </div>
            </div>
            <div className="mt-36">
                <h4 className={header}>🎉 why?</h4>
                <p className="text-gray-500 mt-2 mb-9">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum. Lorem ipsum dolor sit
                    amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi
                    ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                    proident, sunt in culpa qui officia deserunt mollit anim id
                    est laborum. Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis
                    nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                    commodo consequat. Duis aute irure dolor in reprehenderit in
                    voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum. Lorem
                    ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                    irure dolor in reprehenderit in voluptate velit esse cillum
                    dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                    cupidatat non proident, sunt in culpa qui officia deserunt
                    mollit anim id est laborum.
                </p>
            </div>
        </Layout>
    );
};

export default IndexPage;
