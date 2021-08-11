import React, { useState, useEffect } from 'react';
import {
    Layout,
    Display,
    Radial,
    Cover,
    Chevron,
    Spinner,
    Bar,
    ColorIcon,
    Button,
} from '../components';
import crossentropy from '../images/crossentropy.png';
import axios from 'axios';
import FormData from 'form-data';
import {
    inputStyles,
    typewriter,
    stepStyles,
    stepCircle,
    type,
} from '../components/Layout/layout.module.css';
import { cardModal } from '../components/utils/Card/card.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUpload,
    faSearch,
    faCloudUploadAlt,
} from '@fortawesome/free-solid-svg-icons';

const IndexPage = () => {
    const [image, setImage] = useState({
        progress: false,
        file: null,
        selection: null,
        url: '',
        width: 0,
        height: 0,
        color: '#555555',
        displayName: '',
    });
    const [acc, setAccuracy] = useState(0.0);
    const [step, setStep] = useState('Upload');
    const [nivo, setNivo] = useState([]);
    const [avatarSeed, setAvatarSeed] = useState('furspect');
    const [avatarName, setAvatarName] = useState('Anonymous');
    const [submitModal, setSubmitModal] = useState(false);
    const [error, setError] = useState('');

    const dictmoji = {
        cane: '🐕',
        cavallo: '🐴',
        elefante: '🐘',
        farfalla: '🦋',
        furry: '🐺',
        gallina: '🐔',
        gatto: '🐈',
        mucca: '🐄',
        pecora: '🐑',
        ragno: '🕷️',
        scoiattolo: '🐿️',
    };

    const colors = ['#D9E4DD', '#FBF7F0', '#CDC9C3', '#555555'];
    const readFile = (input) => {
        if (input.target.files && input.target.files[0]) {
            if (image.selection) URL.revokeObjectURL(image.selection);
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

    const handleDelete = () => {
        if (image.selection) {
            URL.revokeObjectURL(image.selection);
            setImage({
                ...image,
                file: null,
                progress: false,
                selection: null,
                url: '',
                width: 0,
                height: 0,
            });
            setStep('Upload');
        }

        console.log(image);
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
                    setAccuracy(Number(resp.data.data) * 100);
                    console.log(resp.data.nivo);
                    resp.data.nivo = [
                        ...resp.data.nivo.map((item) => {
                            return {
                                ...item,
                                class: dictmoji[item.class],
                            };
                        }),
                    ];
                    setNivo(resp.data.nivo);
                    console.log(resp.data.nivo);
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
        let color = image.color;
        let displayName = image.displayName;
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
        data.append('color', color);
        data.append('displayName', displayName);
        data.append('file', image.selection, image.selection.name);
        console.log(data);
        // console.log(JSON.stringify(info));
        // const config = {
        //     method: 'post',
        //     url: 'http://127.0.0.1:5000/files',
        //     data: data,
        //     headers: {
        //         'User-Agent': 'Axios - console app',
        //         'Access-Control-Allow-Origin': '*',
        //         'Content-Type': `multipart/form-data`,
        //     },
        // };

        // setImage({
        //     ...image,
        //     progress: true,
        // });
        // axios(config)
        //     .then((resp) => {
        //         setImage({
        //             ...image,
        //             progress: false,
        //         });
        //         setStep('Upload');
        //         console.log(resp);
        //         console.log(resp.data);

        //         // if (resp.status === 200)
        //         //     setAccuracy(Number(1.0 - resp.data.data[0]) * 100);
        //         return resp.data;
        //     })
        //     .catch((error) => console.log(error));
    };

    const handleName = (e) => {
        setImage({
            ...image,
            displayName: e.target.value,
        });
        if (e.target.value != '') setError(false);
    };
    const validateName = (e) => {
        if (e.target.value == '') setError(true);
        else setError(false);
    };

    const handleAvatarSeed = () => {
        let seed = [...Array(16)]
            .map(() => Math.floor(Math.random() * 16).toString(16))
            .join('');
        setAvatarSeed(seed);
        fetch('https://random-words-api.vercel.app/word')
            .then((r) => r.json())
            .then((response) => {
                console.log(response[0]['pronunciation']);
                setAvatarName(`${response[0]['pronunciation']}`);
            })
            .catch((err) => console.log(err));
    };
    useEffect(() => {
        console.log(image);
    }, [image]);

    return (
        <Layout pageTitle="home">
            <Cover />
            <Chevron />

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
                        onClick={() => setSubmitModal(true)}
                        className="mb-5"
                        style={{
                            pointerEvents: step == 'Submit' ? '' : 'none',
                            opacity: step == 'Submit' ? 1 : 0.2,
                        }}
                    >
                        <Button name="Submit" color="800" />
                    </div>
                    <div
                        id="myModal"
                        style={{
                            display: submitModal ? 'block' : 'none',
                        }}
                        className={cardModal}
                    >
                        <div className="flex items-center justify-center h-full">
                            <div className="bg-white w-1/2 h-2/3 relative rounded">
                                <span
                                    className="absolute right-0 text-4xl text-gray-400 my-2 mx-4 hover:text-gray-800 cursor-pointer"
                                    onClick={() => setSubmitModal(false)}
                                >
                                    &times;
                                </span>
                                <div className="flex flex-col items-center justify-center h-full">
                                    <div className="mb-4">
                                        <div className="flex items-center py-10">
                                            <img
                                                className="inline object-cover w-28 h-28 mr-2 rounded-full shadow-md p-2"
                                                src={`https://avatars.dicebear.com/api/gridy/${avatarSeed}.svg`}
                                                alt="Profile image"
                                            />
                                            <div className="px-3">
                                                <div className=" flex items-center">
                                                    <p className="text-gray-700 text-sm">
                                                        {avatarName}
                                                    </p>
                                                </div>

                                                <div className="flex">
                                                    <button
                                                        onClick={() =>
                                                            handleAvatarSeed()
                                                        }
                                                        className="w-24 h-12 text-xs shadow-md bg-gray-600 hover:bg-gray-400 transition duration-300 ease-in-out cursor-pointer flex items-center justify-center text-white"
                                                    >
                                                        Login
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleAvatarSeed()
                                                        }
                                                        className="w-24 h-12 text-xs shadow-md bg-gray-500 hover:bg-gray-400 transition duration-300 ease-in-out cursor-pointer flex items-center justify-center text-white"
                                                    >
                                                        Randomize
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <label
                                            className="block text-gray-700 text-sm font-bold mb-2"
                                            htmlFor="username"
                                        >
                                            Got a name?
                                        </label>
                                        <input
                                            onBlur={validateName}
                                            onChange={handleName}
                                            className={`shadow appearance-none border ${
                                                error && `border-red-300`
                                            } rounded w-full py-2 px-3 mb-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-gray-400 focus:border-3`}
                                            id="username"
                                            type="text"
                                            placeholder="Samuel Ayers"
                                        />
                                        {error && (
                                            <p className="text-red-500 text-xs italic">
                                                Please choose a color.
                                            </p>
                                        )}
                                    </div>
                                    <div className="mb-6">
                                        <label
                                            className="block text-gray-700 text-sm font-bold my-2"
                                            htmlFor="password"
                                        >
                                            Any color?
                                        </label>
                                        <div className="flex items-center justify-center my-3 w-full">
                                            {colors.map((color) => (
                                                <ColorIcon
                                                    key={color}
                                                    color={color}
                                                    select={image.color}
                                                    handleClick={() =>
                                                        setImage({
                                                            ...image,
                                                            color: color,
                                                        })
                                                    }
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div onClick={handleSubmit}>
                                            <Button name="Submit" color="500" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-center">
                    <div className="flex w-96 justify-center items-center">
                        <Display
                            file={image.selection}
                            url={image.url}
                            width={image.width}
                            height={image.height}
                            accuracy={acc}
                            handleClick={handleDelete}
                        />
                        {image.progress && (
                            <span className="absolute flex h-36 w-36">
                                <span className="animate-ping absolute h-full w-full rounded-full bg-gray-400 opacity-75"></span>
                            </span>
                        )}
                    </div>
                </div>
                <div className="flex justify-center items-center text-white">
                    <div className="flex flex-nowrap">
                        <div className="justify-around">
                            <Spinner acc={acc} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-gray-200 relative border-b-2" />
            <Chevron />

            <div className="flex items-center justify-center">
                <div className={typewriter}>
                    <h1 className={type}>a deeper analysis.</h1>
                </div>
            </div>

            <div className="flex w-full">
                <div className="p-3 w-full text-xs text-gray-400 shadow-md text-right">
                    <img src={crossentropy} />
                </div>
                <div className="p-3 w-1/6 flex text-center items-end justify-end text-xs text-gray-400 shadow-md">
                    Want to learn more? Visit my about page, for redirects and
                    source code!
                </div>
            </div>
            <div className="p-3 w-full text-xs text-gray-400 shadow-md text-right">
                {nivo.map((className) => (
                    <span key={className}>
                        {JSON.stringify(className, (key, value) =>
                            key !== 'probabilityColor' ? value : undefined
                        )}
                    </span>
                ))}
            </div>

            <div id="nivo-bar" className="flex items-center justify-center">
                {step == 'Submit' && <Bar nivo={nivo} />}
            </div>
        </Layout>
    );
};

export default IndexPage;
