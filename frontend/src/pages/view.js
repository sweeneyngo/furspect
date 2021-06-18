import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/layout';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { headingStyles } from '../components/Layout/layout.module.css';
import Card from '../components/utils/Card/Card';
import Tooltip from '../components/utils/Tooltip/Tooltip';

import axios from 'axios';
// markup

const ViewPage = () => {
    const [files, setFiles] = useState([]);
    const [image, showImage] = useState(false);

    useEffect(() => {
        const config = {
            method: 'get',
            url: 'http://127.0.0.1:5000/files',
            headers: {
                'User-Agent': 'Axios - console app',
                'Access-Control-Allow-Origin': '*',
                'Content-Type': `multipart/form-data`,
            },
        };

        axios(config)
            .then((resp) => {
                console.log(resp);
                console.log(resp.data.contents);
                console.log(resp.data.files);

                if (resp.status == 200) {
                    setFiles([...resp.data.files]);
                }
                // if (resp.status === 200)
                //     setAccuracy(Number(1.0 - resp.data.data[0]) * 100);
                return resp.data;
            })
            .catch((error) => console.log(error));
    }, []);
    return (
        <Layout pageTitle="view">
            <h1 className={headingStyles}>
                A look into other percentages.
                <div className="py-10 grid grid-cols-2 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
                    {files.map((file) => (
                        <div
                            className="flex flex-col shadow-md rounded-b-lg"
                            key={file}
                        >
                            <Card
                                file={file}
                                url={`https://furspect-media.s3.amazonaws.com/${file.hexS3}`}
                                name={file.name}
                                width={file.width}
                                height={file.height}
                            />
                            <Tooltip
                                file={file}
                                name={file.name}
                                icon={faHeart}
                                subcaption={'' + file.favcount}
                                caption="love!"
                            />
                        </div>
                    ))}
                </div>
                <br />
            </h1>
        </Layout>
    );
};

export default ViewPage;
