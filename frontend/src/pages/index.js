import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/layout';
import Display from '../components/Display/Display';
import Button from '../components/utils/Button/Button';
import Radial from '../components/utils/Radial/Radial';
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
    radialGrid,
    typewriter,
    stepStyles,
    stepCircle,
    type,
    animatedCircle,
} from '../components/Layout/layout.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronDown,
    faUpload,
    faSearch,
    faCloudUploadAlt,
} from '@fortawesome/free-solid-svg-icons';

import { Link, useStaticQuery, graphql } from 'gatsby';

// markup
const IndexPage = () => {
    const [image, setImage] = useState({
        progress: false,
        file: null,
        message: '',
        fileData: [],
        selection: null,
        url: '',
        width: 0,
        height: 0,
    });
    const [acc, setAccuracy] = useState(0.0);
    const [step, setStep] = useState('Upload');

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
                    setStep('Inspect');
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
                'Access-Control-Allow-Origin': '*',
                'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
            },
        };

        setImage({
            ...image,
            progress: true,
        });
        axios(config)
            .then((resp) => {
                setImage({
                    ...image,
                    progress: false,
                });
                console.log(resp);
                console.log(resp.data);

                if (resp.status === 200) {
                    setAccuracy(Number(1.0 - resp.data.data[0]) * 100);
                    console.log(acc);
                    setStep('Submit');
                }
                return resp.data;
            })
            .catch((error) => console.log(error));
    };
    const handleSubmit = () => {
        console.log(acc);
        let name = image.selection.name;
        let accuracy = acc;
        let width = image.width;
        let height = image.height;
        let favcount = 0;
        let data = new FormData();

        if (!image.selection) {
            alert('No image found. Aborting!');
            return;
        }
        data.append('name', name);
        data.append('accuracy', accuracy);
        data.append('width', width);
        data.append('height', height);
        data.append('favcount', favcount);
        data.append('file', image.selection, image.selection.name);

        // console.log(JSON.stringify(info));
        const config = {
            method: 'post',
            url: 'http://127.0.0.1:5000/files',
            data: data,
            headers: {
                'User-Agent': 'Axios - console app',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': `multipart/form-data`,
            },
        };

        setImage({
            ...image,
            progress: true,
        });
        axios(config)
            .then((resp) => {
                setImage({
                    ...image,
                    progress: false,
                });
                setStep('Upload');
                console.log(resp);
                console.log(resp.data);

                // if (resp.status === 200)
                //     setAccuracy(Number(1.0 - resp.data.data[0]) * 100);
                return resp.data;
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        console.log(image);
    }, [image]);

    return (
        <Layout pageTitle="home">
            <div className="border-gray-200 relative border-b-2 overflow-hidden">
                <img
                    className="absolute inset-y-0 right-0 z-10"
                    src="rabbit640.png"
                />
                <div className={radialGrid}></div>
                <div className="flex relative">
                    <div className="flex flex-col">
                        <p className="text-gray-300 text-md mt-8 transform translate-y-3">
                            /fər&apos;spekt/
                        </p>
                        <h1 className="text-gray-300 text-7xl mb-8">
                            an inspection of
                            <br />
                            anthromorphism.
                        </h1>
                        <p className="text-gray-t-10 500 mt-2 mb-14 w-2/5">
                            Welcome to furspect! You&apos;re welcome to explore
                            and investigate the ultimate dilemna of whether your
                            favorite character/figure is a furry or not (we are
                            not responsible for any relationships that may be
                            broken as a result of our analysis). For the
                            inspection process, upload an image or photo and
                            we&apos;ll determine if it&apos;s certainly an
                            anthromorphic animal or not!
                        </p>
                    </div>
                </div>
            </div>

            <div className="text-gray-500 my-1 text-xs flex flex-col items-center justify-center">
                scroll down
                <div className="pb-0 text-gray-400">
                    <FontAwesomeIcon icon={faChevronDown} />
                </div>
            </div>

            <div className="flex items-center justify-center">
                <div className={typewriter}>
                    <h1 className={type}>inspect & dissect.</h1>
                </div>
            </div>

            <div className="flex items-center justify-center">
                <div className={stepStyles}>
                    <div className="relative flex items-center justify-center overflow-none w-16 h-16">
                        <div id="step-one" className={stepCircle}>
                            <FontAwesomeIcon icon={faCloudUploadAlt} />
                        </div>
                        {step == 'Upload' && <Radial />}
                        <h4 className="text-xs text-gray-500 absolute top-16">
                            upload
                        </h4>
                    </div>
                    <div className="relative flex items-center justify-center overflow-none w-16 h-16">
                        <div id="step-one" className={stepCircle}>
                            <FontAwesomeIcon icon={faSearch} />
                        </div>
                        {step == 'Inspect' && <Radial />}
                        <h4 className="text-xs text-gray-500 absolute top-16">
                            inspect
                        </h4>
                    </div>
                    <div className="relative flex items-center justify-center overflow-none w-16 h-16">
                        <div id="step-one" className={stepCircle}>
                            <FontAwesomeIcon icon={faUpload} />
                        </div>
                        {step == 'Submit' && <Radial />}
                        <h4 className="text-xs text-gray-500 absolute top-16">
                            submit
                        </h4>
                    </div>
                </div>
            </div>
            <div
                style={{ backgroundColor: '#f9f9f9' }}
                className="grid grid-cols-3 items-center my-24"
            >
                <div
                    className="my-3 h-72 flex-col flex items-center justify-center"
                    disabled={!image.selection}
                >
                    <label
                        className="mb-5"
                        htmlFor="file-upload"
                        style={{
                            pointerEvents: step == 'Upload' ? '' : 'none',
                            opacity: step == 'Upload' ? 1 : 0.2,
                        }}
                    >
                        <Button name="Upload" color="500" />
                    </label>
                    <input
                        id="file-upload"
                        className={inputStyles}
                        type="file"
                        onChange={readFile}
                    />
                    <div
                        className="mb-5"
                        onClick={handleInspect}
                        style={{
                            pointerEvents: step == 'Inspect' ? '' : 'none',
                            opacity: step == 'Inspect' ? 1 : 0.2,
                        }}
                    >
                        <Button name="Inspect" color="600" />
                    </div>
                    <div
                        onClick={handleSubmit}
                        className="wmb-5"
                        style={{
                            pointerEvents: step == 'Submit' ? '' : 'none',
                            opacity: step == 'Submit' ? 1 : 0.2,
                        }}
                    >
                        <Button name="Submit" color="800" />
                    </div>
                </div>

                <div className="flex justify-center items-center w-full">
                    <Display
                        file={image.selection}
                        url={image.url}
                        width={image.width}
                        height={image.height}
                    />
                    {image.progress && (
                        <span className="absolute flex h-36 w-36">
                            <span className="animate-ping absolute h-full w-full rounded-full bg-gray-400 opacity-75"></span>
                        </span>
                    )}
                </div>
                <div className="flex justify-center items-center text-white">
                    <div className="flex flex-nowrap">
                        <div className="justify-around">
                            <svg
                                viewBox="0 0 36 36"
                                style={{ stroke: 'rgba(156, 163, 175, 1)' }}
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
                                    strokeDasharray={`${acc}, 100`}
                                    d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                                <text
                                    x={acc.toFixed(0) >= 10 ? '13.5' : '15'}
                                    y="20.35"
                                    className={percentage}
                                >
                                    {acc
                                        .toFixed(2)
                                        .slice(0, acc.toFixed(2).indexOf('.'))}
                                </text>
                                <text
                                    x={acc.toFixed(0) >= 10 ? '19' : '17'}
                                    y="20.35"
                                    style={{
                                        stroke: 'none',
                                        fontSize: '0.25rem',
                                        fill: 'rgba(156, 163, 175, 1)',
                                    }}
                                >
                                    {acc
                                        .toFixed(2)
                                        .slice(acc.toFixed(2).indexOf('.'))}
                                    %
                                </text>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-36">
                <h4 className={header}>analysis</h4>
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
